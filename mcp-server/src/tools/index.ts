import { readTools } from "./read.js";
import { writeTools } from "./write.js";
import { configTools } from "./config.js";
import { ingressTools } from "./ingress.js";
import type { ToolDef } from "./types.js";

export const allTools: ToolDef[] = [...readTools, ...writeTools, ...configTools, ...ingressTools];

export const toolMap = new Map<string, ToolDef>(
  allTools.map((t) => [t.name, t])
);

export type { ToolDef, AccessLevel } from "./types.js";
