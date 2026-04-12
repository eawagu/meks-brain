import { randomUUID } from "crypto";
import https from "https";
import fs from "fs";
import express from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { config } from "./config.js";
import { query, shutdown as shutdownDb } from "./db.js";
import { allTools, toolMap } from "./tools/index.js";
import { authenticateRequest, canAccess, tokenId } from "./auth.js";
import { createOAuthRouter } from "./oauth.js";

// ─── MCP Server Factory ───────────────────────────────────────

function createMcpServer(): McpServer {
  const server = new McpServer({
    name: "brain",
    version: "1.0.0",
  });

  for (const tool of allTools) {
    server.tool(
      tool.name,
      tool.description,
      tool.schema.shape,
      async (params) => {
        const result = await tool.handler(params);
        // If the handler returns a _content array, pass it through directly
        // (used by read_ingress for image files — returns image + metadata content blocks)
        if (result?._content) {
          return { content: result._content };
        }
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }
    );
  }

  return server;
}

// ─── Transport + Session Management ────────────────────────────

// Map of session ID -> transport instance (for stateful sessions)
const sessions = new Map<string, StreamableHTTPServerTransport>();

// ─── Express App ───────────────────────────────────────────────

const app = express();
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: false })); // for OAuth form POST

// Request logger
app.use((req, _res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url} ${req.headers["user-agent"] || ""}`);
  next();
});

// ─── OAuth Endpoints (no bearer auth — these ARE the auth flow) ──
app.use(createOAuthRouter(config.publicOrigin));

// Health check (no auth required)
app.get("/health", (_req, res) => {
  res.json({ status: "ok", server: "brain-mcp", version: "1.0.0" });
});

// MCP endpoint — POST (JSON-RPC requests)
app.post("/mcp", async (req, res) => {
  // Authenticate
  const level = authenticateRequest(req);
  if (!level) {
    res.setHeader("WWW-Authenticate", `Bearer realm="MCP", resource_metadata="${config.publicOrigin}/.well-known/oauth-protected-resource"`);
    res.status(401).json({ error: "Unauthorized — valid Bearer token required" });
    return;
  }

  // Check if this is a tool call and enforce access level
  const body = req.body;
  if (body?.method === "tools/call") {
    const toolName = body.params?.name;
    const tool = toolMap.get(toolName);
    if (tool && !canAccess(level, tool.accessLevel)) {
      // Audit the failed attempt
      await auditLog(tokenId(req), toolName, body.params?.arguments, "Access denied — read-only token", false);
      res.status(403).json({
        error: `Forbidden — tool "${toolName}" requires write access`,
      });
      return;
    }
  }

  // Session handling
  const sessionId = req.headers["mcp-session-id"] as string | undefined;
  let transport: StreamableHTTPServerTransport;

  if (sessionId && sessions.has(sessionId)) {
    // Existing session
    transport = sessions.get(sessionId)!;
  } else if (!sessionId && isInitializeRequest(body)) {
    // New session — create transport and a dedicated MCP server instance
    transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: () => randomUUID(),
      onsessioninitialized: (sid) => {
        sessions.set(sid, transport);
      },
    });

    transport.onclose = () => {
      const sid = transport.sessionId;
      if (sid) sessions.delete(sid);
    };

    const mcpServer = createMcpServer();
    await mcpServer.connect(transport);
  } else if (!sessionId) {
    // Non-initialize request without session
    res.status(400).json({ error: "Missing mcp-session-id header" });
    return;
  } else {
    // Unknown session ID
    res.status(404).json({ error: "Session not found" });
    return;
  }

  // Audit logging for tool calls
  if (body?.method === "tools/call") {
    const toolName = body.params?.name;
    try {
      await transport.handleRequest(req, res, body);
      await auditLog(tokenId(req), toolName, body.params?.arguments, "ok", true);
    } catch (err: any) {
      await auditLog(tokenId(req), toolName, body.params?.arguments, err.message, false);
      throw err;
    }
    return;
  }

  // All other MCP methods
  await transport.handleRequest(req, res, body);
});

// MCP endpoint — GET (SSE stream for server-initiated messages)
app.get("/mcp", async (req, res) => {
  const level = authenticateRequest(req);
  if (!level) {
    res.setHeader("WWW-Authenticate", `Bearer realm="MCP", resource_metadata="${config.publicOrigin}/.well-known/oauth-protected-resource"`);
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const sessionId = req.headers["mcp-session-id"] as string | undefined;
  if (!sessionId || !sessions.has(sessionId)) {
    res.status(404).json({ error: "Session not found" });
    return;
  }

  const transport = sessions.get(sessionId)!;
  await transport.handleRequest(req, res);
});

// MCP endpoint — DELETE (close session)
app.delete("/mcp", async (req, res) => {
  const sessionId = req.headers["mcp-session-id"] as string | undefined;
  if (sessionId && sessions.has(sessionId)) {
    const transport = sessions.get(sessionId)!;
    await transport.close();
    sessions.delete(sessionId);
  }
  res.status(200).json({ message: "Session closed" });
});

// ─── Helpers ───────────────────────────────────────────────────

function isInitializeRequest(body: any): boolean {
  return body?.method === "initialize" || body?.jsonrpc === "2.0" && body?.method === "initialize";
}

async function auditLog(
  token: string,
  operation: string,
  params: any,
  resultSummary: string,
  success: boolean
): Promise<void> {
  try {
    await query(
      `INSERT INTO audit_log (token_id, operation, params, result_summary, success)
       VALUES ($1, $2, $3, $4, $5)`,
      [token, operation, params ? JSON.stringify(params) : null, resultSummary, success]
    );
  } catch (err) {
    console.error("Failed to write audit log:", err);
  }
}

// ─── Start ─────────────────────────────────────────────────────

// HTTP — local access (port 3100)
const httpServer = app.listen(config.port, "0.0.0.0", () => {
  console.log(`Brain MCP server (HTTP) on port ${config.port}`);
  console.log(`Health: http://localhost:${config.port}/health`);
  console.log(`MCP:    http://localhost:${config.port}/mcp`);
});

// HTTPS — public access (port 443)
let httpsServer: https.Server | null = null;

if (config.tlsCert && config.tlsKey) {
  const tlsOptions = {
    cert: fs.readFileSync(config.tlsCert),
    key: fs.readFileSync(config.tlsKey),
  };
  httpsServer = https.createServer(tlsOptions, app).listen(config.publicPort, "0.0.0.0", () => {
    console.log(`Brain MCP server (HTTPS) on port ${config.publicPort}`);
    console.log(`Public: ${config.publicOrigin}/mcp`);
  });
} else {
  console.log(`No TLS_CERT/TLS_KEY configured — HTTPS listener disabled`);
  console.log(`Public origin: ${config.publicOrigin} (ensure TLS is terminated upstream)`);
}

// Graceful shutdown
async function shutdown() {
  console.log("\nShutting down...");
  for (const [, transport] of sessions) {
    await transport.close();
  }
  httpServer.close();
  httpsServer?.close();
  await shutdownDb();
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
