Write-Host "Rebuilding i-NEXT frontend with correct API URL..." -ForegroundColor Cyan
Write-Host ""

# Kill any node processes
Write-Host "Stopping Node processes..." -ForegroundColor Yellow
Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

# Remove build folders
Write-Host "Removing old build folders..." -ForegroundColor Yellow

# Try to remove out folder
if (Test-Path "out") {
    try {
        # Close any handles that might be locking it
        Get-ChildItem -Path "out" -Recurse -Force | Remove-Item -Force -Recurse -ErrorAction SilentlyContinue
        Remove-Item -Path "out" -Recurse -Force -ErrorAction SilentlyContinue
        Write-Host "Removed out folder" -ForegroundColor Green
    } catch {
        # If still locked, rename it
        $newName = "out.backup_$(Get-Date -Format 'yyyyMMdd_HHmmss')"
        Write-Host "Could not delete out folder, renaming to $newName" -ForegroundColor Yellow
        Rename-Item -Path "out" -NewName $newName -ErrorAction SilentlyContinue
    }
}

# Remove .next folder
if (Test-Path ".next") {
    Remove-Item -Path ".next" -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "Removed .next folder" -ForegroundColor Green
}

Start-Sleep -Seconds 1

# Verify .env has correct API URL
Write-Host ""
Write-Host "Checking .env configuration..." -ForegroundColor Yellow
$envContent = Get-Content ".env" -Raw
if ($envContent -match "NEXT_PUBLIC_API_URL=`"([^`"]+)`"") {
    $apiUrl = $matches[1]
    Write-Host "API URL in .env: $apiUrl" -ForegroundColor Cyan
    
    if ($apiUrl -eq "https://inext-production.up.railway.app") {
        Write-Host "✓ Correct API URL!" -ForegroundColor Green
    } else {
        Write-Host "✗ WRONG API URL! Should be: https://inext-production.up.railway.app" -ForegroundColor Red
        Write-Host "Please update .env file first!" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "✗ NEXT_PUBLIC_API_URL not found in .env!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Building frontend..." -ForegroundColor Yellow
Write-Host ""

# Run npm build
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "============================================" -ForegroundColor Green
    Write-Host "BUILD SUCCESSFUL!" -ForegroundColor Green
    Write-Host "============================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Frontend built with API URL: https://inext-production.up.railway.app" -ForegroundColor Cyan
    Write-Host "Output directory: out\" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Next step: Upload to IIT Patna server" -ForegroundColor Yellow
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "============================================" -ForegroundColor Red
    Write-Host "BUILD FAILED" -ForegroundColor Red
    Write-Host "============================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Check errors above for details" -ForegroundColor Yellow
    Write-Host ""
}
