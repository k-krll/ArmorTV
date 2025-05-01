@echo off
title ARMOR TV Installer
cls

echo ARMOR TV Installer
echo =====================================
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Node.js is not installed. Installing Node.js...
    echo.
    
    :: Check system architecture
    reg Query "HKLM\Hardware\Description\System\CentralProcessor\0" | find /i "x86" > NUL && set OS=32BIT || set OS=64BIT
    
    :: Set download URL based on architecture
    if %OS%==32BIT (
        set "NODEJS_URL=https://nodejs.org/dist/v20.11.1/node-v20.11.1-x86.msi"
    ) else (
        set "NODEJS_URL=https://nodejs.org/dist/v20.11.1/node-v20.11.1-x64.msi"
    )
    
    :: Download Node.js installer
    echo Downloading Node.js installer...
    powershell -Command "(New-Object Net.WebClient).DownloadFile('%NODEJS_URL%', 'nodejs_installer.msi')"
    
    :: Install Node.js
    echo Installing Node.js...
    start /wait msiexec /i nodejs_installer.msi /qn
    
    :: Clean up installer
    del nodejs_installer.msi
    
    :: Verify installation
    where node >nul 2>nul
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo Error: Node.js installation failed!
        echo Please install Node.js manually from https://nodejs.org/
        echo.
        pause
        exit /b 1
    )
    
    echo Node.js installed successfully!
    echo.
)

:: Display Node.js version
echo Node.js version:
node --version
echo.

:: Check if npm packages are installed
if not exist "node_modules" (
    echo Installing project dependencies...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo Error: Failed to install dependencies!
        echo.
        pause
        exit /b 1
    )
    echo Dependencies installed successfully!
) else (
    echo Dependencies are already installed.
)

echo.
echo Installation completed successfully!
echo You can now run start.bat to launch the ARMOR TV server.
echo.
pause 