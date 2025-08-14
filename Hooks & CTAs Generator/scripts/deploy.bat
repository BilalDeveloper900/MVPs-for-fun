@echo off
echo 🚀 Starting deployment process...

REM Navigate to project root
cd /d "%~dp0\.."

echo 📦 Building frontend...
cd apps\web
call npm run build:prod
cd ..\..

echo 🔧 Building backend...
cd packages\api
call npm run build:prod
cd ..\..

echo ✅ Build completed!
echo.
echo 📋 Next steps for VPS deployment:
echo 1. Upload the entire project to your VPS
echo 2. On your VPS, run: npm install (in both packages/api and apps/web)
echo 3. Copy env.production.example to .env and configure your API keys
echo 4. Run: cd packages/api ^&^& npm run start:prod
echo.
echo 🌐 Your app will be available at: http://your-vps-ip:4000
echo 🔒 For production, set up nginx reverse proxy and SSL certificate

pause
