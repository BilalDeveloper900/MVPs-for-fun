@echo off
echo 🚀 Starting My MVPs Monorepo Development Environment...

REM Check if pnpm is installed
where pnpm >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ pnpm is not installed. Please install it first:
    echo    npm install -g pnpm
    pause
    exit /b 1
)

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    pnpm install
)

REM Start development servers
echo 🔥 Starting development servers...
echo    Frontend: http://localhost:3000
echo    Backend:  http://localhost:4000
echo.
echo Press Ctrl+C to stop all services

pnpm dev
