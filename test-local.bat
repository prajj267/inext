@echo off
echo ========================================
echo Testing Built Frontend Locally
echo ========================================
echo.
echo Starting local server on port 3000...
echo.
echo Open your browser to: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

cd out
python -m http.server 3000
