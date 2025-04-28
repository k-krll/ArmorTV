@echo off
title ARMOR TV Server
cls

echo Starting ARMOR TV Server...
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

:: Check if npm packages are installed
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo Error: Failed to install dependencies!
        echo.
        pause
        exit /b 1
    )
)

:: Kill any existing Node.js processes
taskkill /F /IM node.exe >nul 2>nul

:: Start the server
echo Starting server...
echo Press Ctrl+C to stop the server
echo.
node server.js

:: If server crashes
echo.
echo Server stopped unexpectedly!
pause 