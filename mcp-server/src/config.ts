import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

function required(name: string): string {
  const val = process.env[name];
  if (!val) throw new Error(`Missing required env var: ${name}`);
  return val;
}

export const config = {
  // Postgres
  pgHost: required("PGHOST"),
  pgPort: parseInt(process.env.PGPORT || "5432", 10),
  pgDatabase: required("PGDATABASE"),
  pgUser: required("PGUSER"),
  pgPassword: required("PGPASSWORD"),
  pgSslMode: process.env.PGSSLMODE || "require",

  // Vault
  vaultPath: required("VAULT_PATH"),
  memoryPath: path.join(required("VAULT_PATH"), "memory"),
  inboxPath: path.join(required("VAULT_PATH"), "inbox.md"),

  // Ingress (OneDrive-synced folder for raw sources)
  ingressPath: required("INGRESS_PATH"),
  ingressReviewPath: path.join(required("INGRESS_PATH"), "review"),

  // Python executable (full path if not on system PATH)
  pythonCmd: process.env.PYTHON_CMD || (process.platform === "win32" ? "python" : "python3"),

  // Tesseract executable (full path if not on system PATH)
  tesseractCmd: process.env.TESSERACT_CMD || "tesseract",

  // Pandoc executable (full path if not on system PATH)
  pandocCmd: process.env.PANDOC_CMD || "pandoc",

  // LibreOffice executable (for legacy .doc/.ppt/.xls conversion)
  libreofficeCmd: process.env.LIBREOFFICE_CMD || "libreoffice",

  // Whisper executable (for audio/video transcription — disabled, uncomment when needed)
  // whisperCmd: process.env.WHISPER_CMD || "whisper",

  // 7-Zip executable (for .rar/.7z archives)
  sevenzCmd: process.env.SEVENZ_CMD || "7z",

  // FFmpeg executable (required by whisper — disabled, uncomment when needed)
  // ffmpegCmd: process.env.FFMPEG_CMD || "ffmpeg",

  // Server
  port: parseInt(process.env.PORT || "3100", 10),
  publicPort: parseInt(process.env.PUBLIC_PORT || "443", 10),
  publicOrigin: required("PUBLIC_ORIGIN"), // e.g. https://mek-brain.westeurope.cloudapp.azure.com

  // TLS (optional — omit if TLS is terminated upstream)
  tlsCert: process.env.TLS_CERT || null,
  tlsKey: process.env.TLS_KEY || null,

  // Auth tokens
  tokenRead: required("TOKEN_READ"),
  tokenWrite: required("TOKEN_WRITE"),

  // Azure OpenAI (for embeddings)
  azureOpenaiEndpoint: required("AZURE_OPENAI_ENDPOINT"),
  azureOpenaiApiKey: required("AZURE_OPENAI_API_KEY"),
  azureOpenaiDeployment: process.env.AZURE_OPENAI_DEPLOYMENT || "text-embedding-3-small",
  azureOpenaiApiVersion: process.env.AZURE_OPENAI_API_VERSION || "2024-06-01",
} as const;
