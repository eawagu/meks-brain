import type { ZodObject, ZodRawShape } from "zod";

export type AccessLevel = "read" | "write";

export interface ToolDef {
  name: string;
  description: string;
  schema: ZodObject<ZodRawShape>;
  accessLevel: AccessLevel;
  handler: (params: any) => Promise<any>;
}
