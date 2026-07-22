@echo off
echo ========================================
echo Running Database Seed on Railway
echo ========================================
echo.
echo This will update the database with PDF links
echo.

cd /d "%~dp0"
railway run npm run db:seed

echo.
echo ========================================
echo Seed Complete!
echo ========================================
echo.
echo Now refresh your local test to see PDF buttons!
echo http://192.173.0.64:8000/publications/
pause
