# Brain MCP Server — Deployment

## Prerequisites

1. **Node.js 20+** on the Azure VM
2. **pgvector** enabled on Azure Postgres Flexible Server
3. **Azure OpenAI** deployment for text-embedding-3-small

## Step 1: Enable pgvector on Azure Postgres

In the Azure Portal > Postgres Flexible Server > Server parameters:
- Set `azure.extensions` to include `vector` and `pg_trgm`
- Save and wait for the server to apply changes

Then connect via psql and run:
```sql
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS pg_trgm;
```

## Step 2: Run the schema

From the brain vault root:
```powershell
psql "host=brain-index.postgres.database.azure.com port=5432 dbname=mek user=brain sslmode=require" -f schema.sql
```

## Step 3: Set up the MCP server

```powershell
cd C:\Users\mek\mek-brain\mcp-server
npm install
```

Create `.env` from `.env.example`:
```powershell
cp .env.example .env
```

Edit `.env` with actual values. Generate tokens:
```powershell
node -e "console.log(crypto.randomUUID())"   # run twice — one for TOKEN_READ, one for TOKEN_WRITE
```

New required env vars:
```
PUBLIC_ORIGIN=https://mek-brain.westeurope.cloudapp.azure.com
```

Optional (only if terminating TLS at the server — skip if Azure handles TLS):
```
TLS_CERT=/path/to/fullchain.pem
TLS_KEY=/path/to/privkey.pem
PUBLIC_PORT=443
```

## Step 4: Converter dependencies (for file ingress)

Run the setup script as Administrator:
```powershell
cd C:\Users\mek\mek-brain\mcp-server
.\setup-converter.ps1
```

This installs:
- **Python packages:** pymupdf, openpyxl, python-pptx, extract-msg, openai-whisper
- **System tools:** pandoc (DOCX/RTF/EPUB/HTML), tesseract (OCR for images), LibreOffice headless (legacy .doc/.ppt/.xls)
- **Ingress folder:** `C:\Users\mek\OneDrive\mek-brain-ingress` with `review/` subfolder

Optional for audio/video transcription:
```powershell
winget install Gyan.FFmpeg
```

Add to `.env`:
```
INGRESS_PATH=C:\Users\mek\OneDrive\mek-brain-ingress
```

## Step 5: Build and run

```powershell
npm run build
npm start
```

For development (auto-restart on changes):
```powershell
npm run dev
```

## Step 6: Verify locally

```powershell
# Health check
curl http://localhost:3100/health

# Test MCP initialize (with read token)
curl -X POST http://localhost:3100/mcp `
  -H "Content-Type: application/json" `
  -H "Authorization: Bearer YOUR_READ_TOKEN" `
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"test","version":"1.0"}}}'
```

## Step 7: Azure networking

### NSG rules

Allow inbound port 443 from Anthropic's IP ranges only:

1. Azure Portal > VM > Networking > Add inbound port rule
2. Source: IP Addresses
3. Source IP: Anthropic's published IP ranges (see https://docs.anthropic.com/en/api/ip-addresses)
4. Destination port: 443
5. Protocol: TCP
6. Priority: lower number = higher priority
7. Action: Allow

Block all other inbound on 443 (default deny).

### DNS

The Azure VM public IP already has a DNS label (e.g., `mek-brain.westeurope.cloudapp.azure.com`). Verify:
```powershell
nslookup mek-brain.westeurope.cloudapp.azure.com
```

### TLS

Azure handles TLS for `*.cloudapp.azure.com` domains. If the HTTPS listener is needed at the server level (no Azure-managed TLS), set `TLS_CERT` and `TLS_KEY` in `.env`.

## Step 8: Run as a service

Create a Windows service or use PM2:
```powershell
npm install -g pm2
pm2 start dist/server.js --name brain-mcp
pm2 save
pm2 startup
```

## Step 9: Connect clients

### claude.ai and Cowork (via Connectors UI)

1. Open Claude > Customize (or Settings) > Connectors
2. Add connector URL: `https://mek-brain.westeurope.cloudapp.azure.com/mcp`
3. No client ID/secret needed (authless connectors + OAuth login flow)
4. On first use, Claude opens a browser tab to the login page
5. Paste your TOKEN_READ or TOKEN_WRITE to authenticate
6. Claude stores the token — you only do this once per client

Read token grants search and retrieval. Write token grants full access (create, update, delete pages).

### Claude Code (CLI)

```bash
# With bearer token directly (no OAuth flow needed)
claude mcp add brain --transport http \
  https://mek-brain.westeurope.cloudapp.azure.com/mcp \
  --header "Authorization: Bearer YOUR_TOKEN"

# Or without token (triggers OAuth login flow same as Connectors)
claude mcp add brain --transport http \
  https://mek-brain.westeurope.cloudapp.azure.com/mcp
```

## Token security

- **TOKEN_READ**: Grants search, get_page, list_commitments, get_stats, check_ingress, get_config
- **TOKEN_WRITE**: Grants all read tools plus create_page, update_page, delete_page, mark_processed, append_log, update_config
- Rotate tokens by updating `.env` and restarting the server
- OAuth login page accepts either token as the passphrase — the matching access level is returned to Claude
- All operations are logged to the `audit_log` table in Postgres

## OAuth flow summary

```
Claude sends MCP request
  -> Server returns 401 (no bearer token)
  -> Claude discovers /.well-known/oauth-authorization-server
  -> Claude opens browser to /authorize with PKCE challenge
  -> User pastes TOKEN_READ or TOKEN_WRITE
  -> Server issues single-use auth code, redirects to Claude callback
  -> Claude exchanges auth code + PKCE verifier at /token
  -> Server returns the matching token as the OAuth access token
  -> All subsequent requests use Authorization: Bearer <token>
```
