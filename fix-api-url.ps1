# Fix API URL in already-built frontend
Write-Host "Fixing API URL in existing build..." -ForegroundColor Cyan
Write-Host ""

$oldUrl = "https://inext-production-up.railway.app"
$newUrl = "https://inext-production.up.railway.app"
$outDir = ".\out"

if (-not (Test-Path $outDir)) {
    Write-Host "ERROR: out folder not found!" -ForegroundColor Red
    Write-Host "Please run npm run build first"
    exit 1
}

Write-Host "Searching for files with incorrect API URL..."
$files = Get-ChildItem -Path $outDir -Recurse -Include *.js,*.html | 
    Select-String -Pattern "production-up\.railway" -List | 
    Select-Object -ExpandProperty Path

if ($files.Count -eq 0) {
    Write-Host "No files found with the old URL. Build might already be correct!" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Current .env API URL: $newUrl" -ForegroundColor Green
    exit 0
}

Write-Host "Found $($files.Count) file(s) to update:" -ForegroundColor Yellow
$files | ForEach-Object { Write-Host "  - $_" }
Write-Host ""

$updated = 0
foreach ($file in $files) {
    try {
        $content = Get-Content $file -Raw -Encoding UTF8
        $newContent = $content -replace [regex]::Escape($oldUrl), $newUrl
        
        if ($content -ne $newContent) {
            Set-Content $file -Value $newContent -Encoding UTF8 -NoNewline
            $updated++
            Write-Host "Updated: $file" -ForegroundColor Green
        }
    } catch {
        Write-Host "Failed to update: $file - $_" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "DONE! Updated $updated file(s)" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Your frontend now uses: $newUrl" -ForegroundColor Green
Write-Host ""
Write-Host "Next step: Upload the out folder to IIT Patna server"
Write-Host ""
