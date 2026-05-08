/**
 * Tests for src/oauth.ts — OAuth 2.0 endpoints exposed by the brain MCP server.
 *
 * Coverage focus: Dynamic Client Registration (RFC 7591) added 2026-05-08.
 * Claude's MCP client has no fallback to a pre-configured client_id and will
 * abort the auth flow before opening the browser if the authorization-server
 * metadata omits `registration_endpoint` or the endpoint is missing.
 *
 * Tests spin up the OAuth router on an ephemeral port and exercise it via
 * fetch — this validates real Express routing behavior rather than calling
 * handler functions in isolation.
 */
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import express from "express";
import http from "http";
import type { AddressInfo } from "net";
import { createOAuthRouter } from "../src/oauth.js";

const PUBLIC_ORIGIN = "https://test.example.com";

let server: http.Server;
let baseUrl: string;

beforeEach(async () => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(createOAuthRouter(PUBLIC_ORIGIN));
  server = http.createServer(app);
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const addr = server.address() as AddressInfo;
  baseUrl = `http://127.0.0.1:${addr.port}`;
});

afterEach(async () => {
  await new Promise<void>((resolve) => server.close(() => resolve()));
});

// ─── Authorization Server Metadata ────────────────────────────

describe("GET /.well-known/oauth-authorization-server", () => {
  it("advertises registration_endpoint pointing at /register", async () => {
    const res = await fetch(`${baseUrl}/.well-known/oauth-authorization-server`);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.registration_endpoint).toBe(`${PUBLIC_ORIGIN}/register`);
  });

  it("returns the full metadata document with all required fields", async () => {
    const res = await fetch(`${baseUrl}/.well-known/oauth-authorization-server`);
    const body = await res.json();
    expect(body).toMatchObject({
      issuer: PUBLIC_ORIGIN,
      authorization_endpoint: `${PUBLIC_ORIGIN}/authorize`,
      token_endpoint: `${PUBLIC_ORIGIN}/token`,
      registration_endpoint: `${PUBLIC_ORIGIN}/register`,
      response_types_supported: ["code"],
      grant_types_supported: ["authorization_code"],
      code_challenge_methods_supported: ["S256"],
      token_endpoint_auth_methods_supported: ["none"],
    });
  });
});

// ─── Protected Resource Metadata ──────────────────────────────

describe("GET /.well-known/oauth-protected-resource", () => {
  it("returns resource metadata pointing at the MCP endpoint", async () => {
    const res = await fetch(`${baseUrl}/.well-known/oauth-protected-resource`);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toMatchObject({
      resource: `${PUBLIC_ORIGIN}/mcp`,
      authorization_servers: [PUBLIC_ORIGIN],
      bearer_methods_supported: ["header"],
    });
  });
});

// ─── Dynamic Client Registration (RFC 7591) ───────────────────

describe("POST /register", () => {
  it("returns 201 with a generated client_id", async () => {
    const res = await fetch(`${baseUrl}/register`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        client_name: "Claude",
        redirect_uris: ["https://claude.ai/oauth/callback"],
        token_endpoint_auth_method: "none",
      }),
    });
    expect(res.status).toBe(201);
    const body = await res.json();
    expect(typeof body.client_id).toBe("string");
    expect(body.client_id.length).toBeGreaterThan(0);
    expect(typeof body.client_id_issued_at).toBe("number");
  });

  it("does not issue a client_secret (public client per OAuth 2.1 + PKCE)", async () => {
    const res = await fetch(`${baseUrl}/register`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "{}",
    });
    const body = await res.json();
    expect(body.client_secret).toBeUndefined();
    expect(body.token_endpoint_auth_method).toBe("none");
  });

  it("echoes submitted client metadata in the response", async () => {
    const submitted = {
      client_name: "Claude",
      redirect_uris: ["https://claude.ai/oauth/callback"],
      grant_types: ["authorization_code"],
      response_types: ["code"],
    };
    const res = await fetch(`${baseUrl}/register`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(submitted),
    });
    const body = await res.json();
    expect(body.client_name).toBe("Claude");
    expect(body.redirect_uris).toEqual(["https://claude.ai/oauth/callback"]);
    expect(body.grant_types).toEqual(["authorization_code"]);
    expect(body.response_types).toEqual(["code"]);
  });

  it("issues unique client_ids on repeated registrations", async () => {
    const a = await (
      await fetch(`${baseUrl}/register`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: "{}",
      })
    ).json();
    const b = await (
      await fetch(`${baseUrl}/register`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: "{}",
      })
    ).json();
    expect(a.client_id).not.toBe(b.client_id);
  });

  it("accepts an empty body without crashing", async () => {
    const res = await fetch(`${baseUrl}/register`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "{}",
    });
    expect(res.status).toBe(201);
  });

  it("issued client_id is usable in the authorize flow", async () => {
    // Smoke test: register, then GET /authorize with the issued client_id.
    // Asserts the login HTML renders — closing the loop on the bug this fix
    // addresses (login page never rendered because Claude couldn't register).
    const reg = await (
      await fetch(`${baseUrl}/register`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ redirect_uris: ["https://example.com/cb"] }),
      })
    ).json();

    const params = new URLSearchParams({
      client_id: reg.client_id,
      redirect_uri: "https://example.com/cb",
      code_challenge: "dummy-challenge",
      code_challenge_method: "S256",
    });
    const res = await fetch(`${baseUrl}/authorize?${params.toString()}`);
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toMatch(/html/);
    const html = await res.text();
    expect(html).toContain("Brain MCP");
    expect(html).toContain(`value="${reg.client_id}"`);
  });
});
