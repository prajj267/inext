@echo off
echo Attempting to rebuild frontend with correct API URL...
echo.

REM Kill any processes that might lock the out folder
taskkill /F /IM node.exe /T >nul 2>&1
taskkill /F /IM Code.exe /T >nul 2>&1
timeout /t 3 >nul

REM Try to remove out folder multiple times
for /L %%i in (1,1,5) do (
    if exist out (
        echo Attempt %%i: Removing out folder...
        rmdir /s /q out 2>nul
        timeout /t 1 >nul
    )
)

REM If still exists, rename it
if exist out (
    echo Renaming old out folder...
    move out out.old_%RANDOM% >nul 2>&1
)

echo Building frontend...
call npm run build

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ============================================
    echo BUILD SUCCESSFUL!
    echo ============================================
    echo.
    echo Frontend built with API URL: https://inext-production.up.railway.app
    echo Output directory: out\
    echo.
    echo Next step: Upload to IIT Patna server
    echo.
) else (
    echo.
    echo BUILD FAILED - Check errors above
    echo.
)

pause
