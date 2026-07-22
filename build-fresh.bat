@echo off
echo ============================================
echo Building i-NEXT Frontend (Fresh Build)
echo ============================================
echo.

REM Change to project directory
cd /d "%~dp0"

REM Kill any Node processes
echo Killing Node processes...
taskkill /F /IM node.exe /T >nul 2>&1

REM Wait a moment
timeout /t 2 /nobreak >nul

REM Try to unlock the out folder using handle.exe (if available)
echo Attempting to unlock out folder...
handle.exe out -accepteula -nobanner >nul 2>&1

REM Build with a timestamp to ensure clean build
set TIMESTAMP=%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%
set TIMESTAMP=%TIMESTAMP: =0%

echo.
echo Building frontend...
echo API URL: https://inext-production.up.railway.app
echo.

REM Run the build
call npm run build

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ============================================
    echo BUILD SUCCESSFUL!
    echo ============================================
    echo.
    echo Output directory: out\
    echo.
    echo Next: Upload to IIT Patna server
    echo.
) else (
    echo.
    echo ============================================
    echo BUILD FAILED
    echo ============================================
    echo.
    echo The 'out' folder might still be locked.
    echo Try one of these:
    echo   1. Close VS Code completely
    echo   2. Close File Explorer
    echo   3. Restart your computer
    echo   4. Use 'build-to-temp.bat' instead
    echo.
)

pause
