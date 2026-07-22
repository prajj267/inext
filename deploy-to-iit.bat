@echo off
echo ============================================
echo i-NEXT Deployment Helper
echo ============================================
echo.

REM Check if out folder exists
if not exist "out" (
    echo ERROR: out folder not found!
    echo Please run: npm run build
    echo.
    pause
    exit /b 1
)

echo Frontend build folder found: out\
echo Total files: 307
echo Size: 55.22 MB
echo API URL: https://inext-production.up.railway.app
echo.
echo ============================================
echo Deployment Options
echo ============================================
echo.
echo 1. Open deployment instructions (README)
echo 2. Open out\ folder in Explorer (for manual upload)
echo 3. Generate SCP command (for Git Bash/WSL)
echo 4. Exit
echo.

set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" (
    echo.
    echo Opening deployment instructions...
    start DEPLOY-INSTRUCTIONS.md
    echo.
    pause
    exit /b 0
)

if "%choice%"=="2" (
    echo.
    echo Opening out\ folder...
    explorer out
    echo.
    echo Next steps:
    echo 1. Download WinSCP: https://winscp.net/eng/download.php
    echo 2. Connect to IIT Patna server
    echo 3. Navigate to ~/public_html/
    echo 4. Upload all files from out\ folder
    echo.
    pause
    exit /b 0
)

if "%choice%"=="3" (
    echo.
    echo ============================================
    echo SCP Deployment Command
    echo ============================================
    echo.
    echo Copy this command and run in Git Bash or WSL:
    echo.
    echo scp -r out/* YOUR_USERNAME@YOUR_SERVER:~/public_html/
    echo.
    echo Replace:
    echo   YOUR_USERNAME = your SSH username
    echo   YOUR_SERVER   = server hostname (e.g., inext.iitp.ac.in)
    echo.
    echo Example:
    echo   scp -r out/* arijitroy@inext.iitp.ac.in:~/public_html/
    echo.
    
    REM Copy command to clipboard if clip is available
    echo scp -r out/* YOUR_USERNAME@YOUR_SERVER:~/public_html/ | clip 2>nul
    if %errorlevel% equ 0 (
        echo [Copied to clipboard]
    )
    echo.
    pause
    exit /b 0
)

if "%choice%"=="4" (
    exit /b 0
)

echo Invalid choice. Please try again.
pause
