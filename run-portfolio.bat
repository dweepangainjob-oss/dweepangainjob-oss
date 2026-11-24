@echo off
setlocal
cd /d "%~dp0"

echo Starting Dweepan's CLI portfolio...
echo.

where node >nul 2>nul
if errorlevel 1 goto missing_node
where corepack >nul 2>nul
if errorlevel 1 goto missing_corepack

if not exist "node_modules\next\dist\bin\next" (
    echo Dependencies not found. Installing with pnpm...
    call corepack pnpm install --frozen-lockfile
    if errorlevel 1 goto install_failed
)

echo.
echo Portfolio is starting. Open http://localhost:3001 in your browser.
echo Press Ctrl+C to stop the development server.
echo.
call corepack pnpm dev
if errorlevel 1 goto dev_failed
goto done

:missing_node
echo Error: Node.js was not found. Install Node.js, then run this file again.
goto failed

:missing_corepack
echo Error: Corepack was not found. Install a current Node.js release with Corepack, then try again.
goto failed

:install_failed
echo Error: Dependency installation failed.
goto failed

:dev_failed
echo The development server stopped with an error.
goto failed

:failed
echo.
pause
endlocal
exit /b 1

:done
endlocal
