@echo off
echo ============================================
echo Uploading i-NEXT Frontend to IIT Server
echo ============================================
echo.

REM Compress the out folder first (makes upload faster)
echo Creating archive...
powershell -Command "Compress-Archive -Path 'out\*' -DestinationPath 'inext-frontend.zip' -Force"

if %errorlevel% neq 0 (
    echo Failed to create archive
    pause
    exit /b 1
)

echo Archive created: inext-frontend.zip
echo.

echo Uploading to server...
echo You will be prompted for password.
echo.

REM Upload the zip file
scp inext-frontend.zip inext@172.16.1.251:~/

if %errorlevel% neq 0 (
    echo Upload failed!
    pause
    exit /b 1
)

echo.
echo ============================================
echo Upload successful!
echo ============================================
echo.
echo Now SSH to the server and run:
echo   ssh inext@172.16.1.251
echo.
echo Then extract the files:
echo   cd ~/public_html
echo   unzip -o ~/inext-frontend.zip
echo   rm ~/inext-frontend.zip
echo.
pause
