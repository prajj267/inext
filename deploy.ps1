# ========================================
# Deploy i-NEXT Frontend to IIT Server
# ========================================

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Deploying i-NEXT Frontend to IIT Server" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Upload ZIP
Write-Host "Step 1: Uploading ZIP file to server..." -ForegroundColor Yellow
Write-Host "Command: scp inext-frontend-deploy.zip inext@172.16.1.251:~/" -ForegroundColor Gray
Write-Host ""
Write-Host "Please enter password when prompted:" -ForegroundColor Green

scp "inext-frontend-deploy.zip" inext@172.16.1.251:~/

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "ERROR: Upload failed!" -ForegroundColor Red
    Write-Host "Make sure you're connected to IIT network/VPN" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "✓ Upload successful!" -ForegroundColor Green
Write-Host ""

# Step 2: Instructions for SSH
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Step 2: Now SSH into the server" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Run this command:" -ForegroundColor Green
Write-Host "  ssh inext@172.16.1.251" -ForegroundColor White
Write-Host ""
Write-Host "Then run these commands on the server:" -ForegroundColor Green
Write-Host ""
Write-Host "  # Verify upload" -ForegroundColor Gray
Write-Host "  cd ~" -ForegroundColor White
Write-Host "  ls -lh inext-frontend-deploy.zip" -ForegroundColor White
Write-Host ""
Write-Host "  # Backup old site" -ForegroundColor Gray
Write-Host "  cd public_html" -ForegroundColor White
Write-Host "  mkdir -p ../backup_`$(date +%Y%m%d)" -ForegroundColor White
Write-Host "  mv * ../backup_`$(date +%Y%m%d)/" -ForegroundColor White
Write-Host ""
Write-Host "  # Extract new site" -ForegroundColor Gray
Write-Host "  unzip ~/inext-frontend-deploy.zip" -ForegroundColor White
Write-Host "  ls -la" -ForegroundColor White
Write-Host ""
Write-Host "  # Cleanup" -ForegroundColor Gray
Write-Host "  rm ~/inext-frontend-deploy.zip" -ForegroundColor White
Write-Host ""
Write-Host "  # Test" -ForegroundColor Gray
Write-Host "  # Open https://inext.iitp.ac.in in browser" -ForegroundColor White
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Deployment script completed!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
