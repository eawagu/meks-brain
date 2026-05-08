import { randomUUID, createHash } from "crypto";
import { Router, type Request, type Response } from "express";
import { config } from "./config.js";

// ─── Types ────────────────────────────────────────────────────

interface AuthCode {
  code: string;
  tokenLevel: "read" | "write";
  clientId: string;
  redirectUri: string;
  codeChallenge: string;
  expiresAt: number;
}

// ─── State ────────────────────────────────────────────────────

// Auth codes: short-lived, single-use, in-memory
const authCodes = new Map<string, AuthCode>();

// Clean expired codes every 60s
setInterval(() => {
  const now = Date.now();
  for (const [code, entry] of authCodes) {
    if (entry.expiresAt < now) authCodes.delete(code);
  }
}, 60_000);

// ─── Helpers ──────────────────────────────────────────────────

function base64UrlDecode(str: string): string {
  return str.replace(/-/g, "+").replace(/_/g, "/");
}

function verifyPkce(codeVerifier: string, codeChallenge: string): boolean {
  const hash = createHash("sha256")
    .update(codeVerifier)
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  return hash === codeChallenge;
}

function matchToken(passphrase: string): "read" | "write" | null {
  if (passphrase === config.tokenWrite) return "write";
  if (passphrase === config.tokenRead) return "read";
  return null;
}

// ─── Login Page HTML ──────────────────────────────────────────

function loginPageHtml(clientId: string, redirectUri: string, state: string, codeChallenge: string, codeChallengeMethod: string, error?: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Brain — Authenticate</title>
  <style>
    body { font-family: system-ui, sans-serif; background: #0a0a0a; color: #e0e0e0; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; }
    .card { background: #1a1a1a; border: 1px solid #333; border-radius: 8px; padding: 2rem; width: 100%; max-width: 360px; }
    h1 { font-size: 1.2rem; margin: 0 0 1.5rem 0; }
    label { display: block; font-size: 0.85rem; margin-bottom: 0.5rem; color: #999; }
    input[type="password"] { width: 100%; padding: 0.6rem; background: #0a0a0a; border: 1px solid #444; border-radius: 4px; color: #e0e0e0; font-size: 0.95rem; box-sizing: border-box; }
    button { width: 100%; padding: 0.6rem; margin-top: 1rem; background: #2563eb; border: none; border-radius: 4px; color: #fff; font-size: 0.95rem; cursor: pointer; }
    button:hover { background: #1d4ed8; }
    .error { color: #ef4444; font-size: 0.85rem; margin-bottom: 1rem; }
    .hint { color: #666; font-size: 0.75rem; margin-top: 1rem; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Brain MCP</h1>
    ${error ? `<div class="error">${error}</div>` : ""}
    <form method="POST" action="/authorize">
      <input type="hidden" name="client_id" value="${clientId}">
      <input type="hidden" name="redirect_uri" value="${redirectUri}">
      <input type="hidden" name="state" value="${state}">
      <input type="hidden" name="code_challenge" value="${codeChallenge}">
      <input type="hidden" name="code_challenge_method" value="${codeChallengeMethod}">
      <label for="token">Token</label>
      <input type="password" id="token" name="token" autofocus required>
      <button type="submit">Authenticate</button>
      <div class="hint">Paste your read or write token.</div>
    </form>
  </div>
</body>
</html>`;
}

// ─── Router ───────────────────────────────────────────────────

export function createOAuthRouter(publicOrigin: string): Router {
  const router = Router();

  // URL-encoded body parsing for form POSTs
  router.use("/authorize", (req, _res, next) => {
    if (req.method === "POST" && !req.is("application/x-www-form-urlencoded")) {
      next();
      return;
    }
    next();
  });

  // ── Protected Resource Metadata (RFC 9728) ─────────────────

  router.get("/.well-known/oauth-protected-resource", (_req: Request, res: Response) => {
    res.json({
      resource: `${publicOrigin}/mcp`,
      authorization_servers: [publicOrigin],
      bearer_methods_supported: ["header"],
    });
  });

  // ── Authorization Server Metadata (RFC 8414) ─────────────

  router.get("/.well-known/oauth-authorization-server", (_req: Request, res: Response) => {
    res.json({
      issuer: publicOrigin,
      authorization_endpoint: `${publicOrigin}/authorize`,
      token_endpoint: `${publicOrigin}/token`,
      registration_endpoint: `${publicOrigin}/register`,
      response_types_supported: ["code"],
      grant_types_supported: ["authorization_code"],
      code_challenge_methods_supported: ["S256"],
      token_endpoint_auth_methods_supported: ["none"],
    });
  });

  // ── GET /authorize — show login page ──────────────────────

  router.get("/authorize", (req: Request, res: Response) => {
    const { client_id, redirect_uri, state, code_challenge, code_challenge_method } = req.query as Record<string, string>;

    if (!client_id || !redirect_uri || !code_challenge) {
      res.status(400).send("Missing required OAuth parameters (client_id, redirect_uri, code_challenge)");
      return;
    }

    if (code_challenge_method && code_challenge_method !== "S256") {
      res.status(400).send("Only S256 code_challenge_method is supported");
      return;
    }

    res.type("html").send(loginPageHtml(client_id, redirect_uri, state || "", code_challenge, code_challenge_method || "S256"));
  });

  // ── POST /authorize — validate token, issue auth code ─────

  router.post("/authorize", (req: Request, res: Response) => {
    const { client_id, redirect_uri, state, code_challenge, code_challenge_method, token } = req.body as Record<string, string>;

    if (!client_id || !redirect_uri || !code_challenge || !token) {
      res.status(400).send("Missing required fields");
      return;
    }

    // Validate the token (passphrase)
    const level = matchToken(token);
    if (!level) {
      res.type("html").send(loginPageHtml(client_id, redirect_uri, state || "", code_challenge, code_challenge_method || "S256", "Invalid token."));
      return;
    }

    // Issue auth code
    const code = randomUUID();
    authCodes.set(code, {
      code,
      tokenLevel: level,
      clientId: client_id,
      redirectUri: redirect_uri,
      codeChallenge: code_challenge,
      expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
    });

    // Redirect back to Claude's callback with the auth code
    const url = new URL(redirect_uri);
    url.searchParams.set("code", code);
    if (state) url.searchParams.set("state", state);
    res.redirect(url.toString());
  });

  // ── POST /register — Dynamic Client Registration (RFC 7591) ──
  //
  // Required by Claude's MCP client, which has no fallback to a
  // pre-configured client_id when the authorization-server metadata omits
  // `registration_endpoint`. The metadata the client posts is informational
  // — real auth is gated by the password token at POST /authorize, so we
  // accept any submitted metadata, mint a UUID client_id, and echo back. No
  // client_secret is issued (public client + PKCE per OAuth 2.1).

  router.post("/register", (req: Request, res: Response) => {
    const metadata = (req.body || {}) as Record<string, unknown>;
    const clientId = randomUUID();
    res.status(201).json({
      ...metadata,
      client_id: clientId,
      client_id_issued_at: Math.floor(Date.now() / 1000),
      token_endpoint_auth_method: "none",
    });
  });

  // ── POST /token — exchange auth code for access token ─────

  router.post("/token", (req: Request, res: Response) => {
    const { grant_type, code, code_verifier, client_id } = req.body as Record<string, string>;

    if (grant_type !== "authorization_code") {
      res.status(400).json({ error: "unsupported_grant_type" });
      return;
    }

    if (!code || !code_verifier) {
      res.status(400).json({ error: "invalid_request", error_description: "Missing code or code_verifier" });
      return;
    }

    // Look up the auth code
    const entry = authCodes.get(code);
    if (!entry) {
      res.status(400).json({ error: "invalid_grant", error_description: "Unknown or expired authorization code" });
      return;
    }

    // Single use — delete immediately
    authCodes.delete(code);

    // Check expiry
    if (Date.now() > entry.expiresAt) {
      res.status(400).json({ error: "invalid_grant", error_description: "Authorization code expired" });
      return;
    }

    // Verify client_id matches
    if (client_id && client_id !== entry.clientId) {
      res.status(400).json({ error: "invalid_grant", error_description: "client_id mismatch" });
      return;
    }

    // Verify PKCE
    if (!verifyPkce(code_verifier, entry.codeChallenge)) {
      res.status(400).json({ error: "invalid_grant", error_description: "PKCE verification failed" });
      return;
    }

    // Return the actual token — read or write, based on what was authenticated
    const accessToken = entry.tokenLevel === "write" ? config.tokenWrite : config.tokenRead;

    res.json({
      access_token: accessToken,
      token_type: "Bearer",
      // No expiry — tokens are static. Claude will hold them indefinitely.
    });
  });

  return router;
}
