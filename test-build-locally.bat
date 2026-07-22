@echo off
echo ============================================
echo Testing i-NEXT Build Locally
echo ============================================
echo.

cd /d "%~dp0"

if not exist "out" (
    echo ERROR: out folder not found!
    echo Please run: npm run build
    pause
    exit /b 1
)

echo Starting local web server...
echo.
echo Your site will be available at:
echo   http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
echo.
echo ============================================
echo.

cd out
python -m http.server 8000 2>nul

if %errorlevel% neq 0 (
    echo Python not found, trying Node.js server...
    cd..
    npx http-server out -p 8000 -o
)
