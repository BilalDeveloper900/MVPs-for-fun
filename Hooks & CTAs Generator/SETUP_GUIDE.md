# My MVPs Monorepo - Complete Setup Guide

This guide will help you set up the complete monorepo with Next.js frontend, Express.js backend, and OpenAI integration.

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.0.0
- npm (or pnpm if you prefer)
- OpenAI API key

### 1. Install Dependencies

```bash
# Install frontend dependencies
cd apps/web
npm install

# Install backend dependencies
cd ../../packages/api
npm install

# Return to root
cd ../..
```

### 2. Environment Configuration

#### Backend (.env file in packages/api/)
```bash
# Copy the example file
cp packages/api/env.example packages/api/.env

# Edit packages/api/.env and add your OpenAI API key:
OPENAI_API_KEY=your_actual_openai_api_key_here
PORT=4000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

#### Frontend (.env.local file in apps/web/)
```bash
# Copy the example file
cp apps/web/env.local.example apps/web/.env.local

# Edit apps/web/.env.local:
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### 3. Get OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Go to API Keys section
4. Create a new API key
5. Copy the key and paste it in `packages/api/.env`

### 4. Start Development Servers

#### Terminal 1 - Backend API
```bash
cd packages/api
npm run dev
```

#### Terminal 2 - Frontend
```bash
cd apps/web
npm run dev
```

## 🌐 Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **API Health Check**: http://localhost:4000/health
- **Content Generation**: http://localhost:4000/api/generateContent

## 🧪 Testing the Setup

### 1. Test Backend Health
```bash
curl http://localhost:4000/health
```

Expected response:
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "service": "My MVPs API",
  "version": "1.0.0"
}
```

### 2. Test Content Generation
```bash
curl -X POST http://localhost:4000/api/generateContent \
  -H "Content-Type: application/json" \
  -d '{"topic": "email marketing"}'
```

Expected response:
```json
{
  "success": true,
  "data": {
    "hooks": ["hook1", "hook2", "hook3", "hook4", "hook5"],
    "ctas": ["cta1", "cta2", "cta3", "cta4", "cta5"]
  },
  "topic": "email marketing",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 3. Test Frontend
1. Open http://localhost:3000 in your browser
2. Enter a topic (e.g., "productivity")
3. Click "Generate Hooks & CTAs"
4. Verify that AI-generated content appears

## 🔧 Troubleshooting

### Common Issues

#### 1. OpenAI API Errors
- **Error**: "OpenAI API key not configured"
- **Solution**: Check that your `.env` file exists and contains the correct API key

- **Error**: "Rate limit exceeded"
- **Solution**: Wait a few minutes or check your OpenAI usage limits

#### 2. CORS Errors
- **Error**: "CORS policy blocked"
- **Solution**: Ensure the backend is running and CORS_ORIGIN is set correctly

#### 3. Build Errors
- **Error**: "Module not found"
- **Solution**: Run `npm install` in both packages

#### 4. Port Already in Use
- **Error**: "EADDRINUSE"
- **Solution**: Change the PORT in your .env file or kill the process using that port

### Debug Mode

#### Backend Debug
```bash
cd packages/api
NODE_ENV=development DEBUG=* npm run dev
```

#### Frontend Debug
```bash
cd apps/web
npm run dev
# Check browser console for errors
```

## 📁 Project Structure

```
my-mvps-monorepo/
├── apps/
│   └── web/                    # Next.js frontend
│       ├── src/
│       │   ├── app/           # Next.js app directory
│       │   ├── components/    # React components
│       │   └── services/      # API service layer
│       ├── package.json
│       └── .env.local         # Frontend environment
├── packages/
│   └── api/                   # Express.js backend
│       ├── src/
│       │   ├── controllers/   # Request handlers
│       │   ├── services/      # Business logic (OpenAI)
│       │   ├── routes/        # API routes
│       │   └── types/         # TypeScript interfaces
│       ├── package.json
│       └── .env               # Backend environment
├── package.json               # Root workspace config
└── README.md
```

## 🚀 Production Deployment

### Backend
```bash
cd packages/api
npm run build
npm start
```

### Frontend
```bash
cd apps/web
npm run build
npm start
```

## 🔒 Security Notes

- Never commit your `.env` files
- Keep your OpenAI API key secure
- Consider implementing rate limiting for production
- Use HTTPS in production

## 📚 API Documentation

### POST /api/generateContent

Generates AI-powered hooks and call-to-actions for a given topic.

**Request:**
```json
{
  "topic": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "hooks": ["string[]"],
    "ctas": ["string[]"]
  },
  "topic": "string",
  "timestamp": "string"
}
```

**Error Response:**
```json
{
  "error": "string",
  "message": "string"
}
```

## 🎯 Next Steps

1. **Customize Prompts**: Modify the OpenAI prompt in `packages/api/src/services/openai.ts`
2. **Add More Endpoints**: Create additional API endpoints for different content types
3. **Implement Caching**: Add Redis or in-memory caching for generated content
4. **Add Authentication**: Implement user authentication and content history
5. **Deploy**: Deploy to your preferred hosting platform

## 📞 Support

If you encounter issues:
1. Check the console logs in both frontend and backend
2. Verify all environment variables are set correctly
3. Ensure all dependencies are installed
4. Check that both servers are running on the correct ports

Happy coding! 🎉
