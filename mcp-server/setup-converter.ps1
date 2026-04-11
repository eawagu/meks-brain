# setup-converter.ps1 — Install all dependencies for the file-to-markdown converter
# Run on the Azure VM as Administrator

Write-Host "=== Brain MCP: Converter Setup ===" -ForegroundColor Cyan

# ─── 1. Python ───────────────────────────────────────────────

Write-Host "`n[1/5] Checking Python..." -ForegroundColor Yellow
$python = Get-Command python3 -ErrorAction SilentlyContinue
if (-not $python) {
    $python = Get-Command python -ErrorAction SilentlyContinue
}
if (-not $python) {
    Write-Host "  Python not found. Installing via winget..." -ForegroundColor Red
    winget install Python.Python.3.12 --accept-source-agreements --accept-package-agreements
    # Refresh PATH
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path", "User")
}
$pyCmd = if (Get-Command python3 -ErrorAction SilentlyContinue) { "python3" } else { "python" }
& $pyCmd --version

# ─── 2. Python packages ─────────────────────────────────────

Write-Host "`n[2/5] Installing Python packages..." -ForegroundColor Yellow
$packages = @(
    "pymupdf",          # PDF text extraction (import fitz)
    "openpyxl",         # Excel .xlsx reading
    "python-pptx",      # PowerPoint .pptx reading
    "extract-msg",      # Outlook .msg email parsing
    "openai-whisper"    # Audio/video transcription (optional — large install)
)
foreach ($pkg in $packages) {
    Write-Host "  Installing $pkg..."
    & $pyCmd -m pip install $pkg --quiet
}

# ─── 3. Pandoc ───────────────────────────────────────────────

Write-Host "`n[3/5] Checking Pandoc..." -ForegroundColor Yellow
if (-not (Get-Command pandoc -ErrorAction SilentlyContinue)) {
    Write-Host "  Pandoc not found. Installing via winget..." -ForegroundColor Red
    winget install JohnMacFarlane.Pandoc --accept-source-agreements --accept-package-agreements
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path", "User")
}
pandoc --version | Select-Object -First 1

# ─── 4. Tesseract OCR ───────────────────────────────────────

Write-Host "`n[4/5] Checking Tesseract..." -ForegroundColor Yellow
if (-not (Get-Command tesseract -ErrorAction SilentlyContinue)) {
    Write-Host "  Tesseract not found. Installing via winget..." -ForegroundColor Red
    winget install UB-Mannheim.TesseractOCR --accept-source-agreements --accept-package-agreements
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path", "User")
}
tesseract --version 2>&1 | Select-Object -First 1

# ─── 5. LibreOffice (for legacy .doc, .ppt, .xls) ──────────

Write-Host "`n[5/5] Checking LibreOffice..." -ForegroundColor Yellow
$lo = Get-Command libreoffice -ErrorAction SilentlyContinue
if (-not $lo) {
    # Check common install path on Windows
    $loPath = "C:\Program Files\LibreOffice\program\soffice.exe"
    if (Test-Path $loPath) {
        Write-Host "  LibreOffice found at $loPath"
        Write-Host "  Add to PATH: $([System.IO.Path]::GetDirectoryName($loPath))"
    } else {
        Write-Host "  LibreOffice not found. Installing via winget..." -ForegroundColor Red
        winget install TheDocumentFoundation.LibreOffice --accept-source-agreements --accept-package-agreements
    }
}

# ─── 6. Create ingress folder structure ──────────────────────

Write-Host "`n[+] Creating ingress folder..." -ForegroundColor Yellow
$ingressPath = "C:\Users\mek\OneDrive\mek-brain-ingress"
if (-not (Test-Path $ingressPath)) {
    New-Item -ItemType Directory -Path $ingressPath -Force | Out-Null
    Write-Host "  Created $ingressPath"
}
$reviewPath = Join-Path $ingressPath "review"
if (-not (Test-Path $reviewPath)) {
    New-Item -ItemType Directory -Path $reviewPath -Force | Out-Null
    Write-Host "  Created $reviewPath"
}

# ─── 7. Verify converter works ──────────────────────────────

Write-Host "`n[+] Testing converter..." -ForegroundColor Yellow
$converterPath = Join-Path $PSScriptRoot "src\converter.py"
$testFile = Join-Path $env:TEMP "brain-test.txt"
"Hello from the brain converter test." | Out-File -FilePath $testFile -Encoding utf8
$result = & $pyCmd $converterPath $testFile 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "  Converter works! Output: $result" -ForegroundColor Green
} else {
    Write-Host "  Converter test failed: $result" -ForegroundColor Red
}
Remove-Item $testFile -ErrorAction SilentlyContinue

# ─── 8. Remind about .env ───────────────────────────────────

Write-Host "`n=== Setup Complete ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Add to your .env file:" -ForegroundColor Yellow
Write-Host "  INGRESS_PATH=C:\Users\mek\OneDrive\mek-brain-ingress"
Write-Host ""
Write-Host "Then rebuild and restart:" -ForegroundColor Yellow
Write-Host "  npm run build"
Write-Host "  pm2 restart brain-mcp   (or: npm start)"
Write-Host ""
Write-Host "Optional: Whisper requires ffmpeg for audio processing:" -ForegroundColor Yellow
Write-Host "  winget install Gyan.FFmpeg"
