@echo off
title ARMOR TV Server
cls

echo Starting ARMOR TV Server...
echo =====================================
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: Node.js is not installed!
    echo Please run install.bat first.
    echo.
    pause
    exit /b 1
)

:: Check if dependencies are installed
if not exist "node_modules" (
    echo Error: Dependencies are not installed!
    echo Please run install.bat first.
    echo.
    pause
    exit /b 1
)

:: Start the server
node server.js
pause 