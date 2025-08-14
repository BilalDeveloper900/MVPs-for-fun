# 🚀 VPS Deployment Guide for DigitalOcean

This guide will help you deploy your Hooks & CTAs Generator web app to a DigitalOcean VPS.

## 📋 Prerequisites

- DigitalOcean account
- A VPS droplet (Ubuntu 22.04 LTS recommended)
- Domain name (optional but recommended)
- OpenAI API key

## 🏗️ VPS Setup

### 1. Create a DigitalOcean Droplet

1. Log into DigitalOcean
2. Click "Create" → "Droplets"
3. Choose Ubuntu 22.04 LTS
4. Select Basic plan (1GB RAM, 1 CPU minimum)
5. Choose a datacenter region close to your users
6. Add your SSH key or create a password
7. Click "Create Droplet"

### 2. Initial Server Setup

```bash
# SSH into your server
ssh root@your-server-ip

# Update system
apt update && apt upgrade -y

# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# Install PM2 for process management
npm install -g pm2

# Install nginx for reverse proxy
apt install nginx -y

# Install certbot for SSL
apt install certbot python3-certbot-nginx -y

# Create a non-root user
adduser deploy
usermod -aG sudo deploy
```

## 📦 Application Deployment

### 1. Upload Your Code

```bash
# On your local machine, build the app
./scripts/deploy.sh  # Linux/Mac
# OR
scripts\deploy.bat   # Windows

# Upload to VPS (using scp or git)
scp -r . deploy@your-server-ip:/home/deploy/hooks-ctas-generator
```

### 2. Install Dependencies

```bash
# SSH into your server as deploy user
ssh deploy@your-server-ip

# Navigate to project
cd hooks-ctas-generator

# Install dependencies
cd packages/api && npm install --production
cd ../../apps/web && npm install --production
cd ../..
```

### 3. Configure Environment

```bash
# Copy production environment file
cd packages/api
cp env.production.example .env

# Edit .env with your actual values
nano .env
```

Example `.env` content:
```env
NODE_ENV=production
OPENAI_API_KEY=sk-your-actual-openai-api-key
PORT=4000
CORS_ORIGIN=https://yourdomain.com
```

## 🌐 Nginx Configuration

### 1. Create Nginx Site Configuration

```bash
sudo nano /etc/nginx/sites-available/hooks-ctas-generator
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 2. Enable the Site

```bash
# Create symlink
sudo ln -s /etc/nginx/sites-available/hooks-ctas-generator /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

## 🔒 SSL Certificate (Optional but Recommended)

```bash
# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal
sudo crontab -e
# Add this line: 0 12 * * * /usr/bin/certbot renew --quiet
```

## 🚀 Start the Application

### 1. Build and Start

```bash
# Build the application
cd packages/api
npm run build:prod

# Start with PM2
pm2 start dist/index.js --name "hooks-ctas-generator"

# Save PM2 configuration
pm2 save
pm2 startup
```

### 2. Verify Deployment

```bash
# Check PM2 status
pm2 status

# Check logs
pm2 logs hooks-ctas-generator

# Test the application
curl http://localhost:4000/health
```

## 📊 Monitoring and Maintenance

### 1. PM2 Commands

```bash
# View logs
pm2 logs hooks-ctas-generator

# Restart application
pm2 restart hooks-ctas-generator

# Stop application
pm2 stop hooks-ctas-generator

# Monitor resources
pm2 monit
```

### 2. Nginx Commands

```bash
# Check status
sudo systemctl status nginx

# Reload configuration
sudo systemctl reload nginx

# Restart nginx
sudo systemctl restart nginx
```

## 🔧 Troubleshooting

### Common Issues

1. **Port already in use**: Check if another service is using port 4000
2. **Permission denied**: Ensure proper file permissions
3. **Build fails**: Check Node.js version and dependencies
4. **Nginx errors**: Check `/var/log/nginx/error.log`

### Useful Commands

```bash
# Check what's using a port
sudo netstat -tulpn | grep :4000

# Check application logs
pm2 logs hooks-ctas-generator --lines 100

# Check nginx logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

## 🎯 Next Steps

1. Set up monitoring (UptimeRobot, Pingdom)
2. Configure backups
3. Set up CI/CD pipeline
4. Add rate limiting
5. Implement caching strategies

## 📞 Support

If you encounter issues:
1. Check the logs first
2. Verify environment variables
3. Ensure all dependencies are installed
4. Check firewall settings
5. Verify nginx configuration

Your app should now be accessible at `https://yourdomain.com` or `http://your-server-ip:4000`!
