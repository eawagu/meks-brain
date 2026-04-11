import type { IncomingMessage } from "http";
import { config } from "./config.js";
import type { AccessLevel } from "./tools/types.js";

export type TokenLevel = "read" | "write" | null;

/**
 * Extract and validate the bearer token from a request.
 * Returns the access level granted by the token, or null if invalid/missing.
 */
export function authenticateRequest(req: IncomingMessage): TokenLevel {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) return null;

  const token = authHeader.slice(7);

  // Write token grants both read and write access
  if (token === config.tokenWrite) return "write";
  if (token === config.tokenRead) return "read";

  return null;
}

/**
 * Check whether a token level can invoke a tool with the given access level.
 */
export function canAccess(tokenLevel: TokenLevel, toolAccess: AccessLevel): boolean {
  if (tokenLevel === null) return false;
  if (tokenLevel === "write") return true; // write token can do everything
  return toolAccess === "read"; // read token can only do read operations
}

/**
 * Return the token identifier for audit logging (never logs the actual token).
 */
export function tokenId(req: IncomingMessage): string {
  const level = authenticateRequest(req);
  if (level === "write") return "read-write";
  if (level === "read") return "read-only";
  return "unauthenticated";
}
