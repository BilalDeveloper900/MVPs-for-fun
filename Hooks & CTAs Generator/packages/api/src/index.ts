import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import contentRoutes from './routes/contentRoutes';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const isProduction = process.env.NODE_ENV === 'production';

// Middleware
app.use(helmet({
  contentSecurityPolicy: isProduction ? {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  } : false,
}));

app.use(cors({
  origin: isProduction 
    ? [process.env.CORS_ORIGIN || 'http://localhost:3000'] 
    : true,
  credentials: true
}));

app.use(morgan(isProduction ? 'combined' : 'dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Hooks & CTAs Generator API',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

// API routes
app.get('/api/hello', (req, res) => {
  res.json({ 
    message: 'Hello from Hooks & CTAs Generator API!',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/mvps', (req, res) => {
  res.json({
    mvps: [
      {
        id: 1,
        name: 'Web Frontend',
        description: 'Next.js frontend application',
        status: 'active',
        technologies: ['Next.js', 'React', 'TypeScript']
      },
      {
        id: 2,
        name: 'API Backend',
        description: 'Express.js backend API',
        status: 'active',
        technologies: ['Node.js', 'Express', 'TypeScript']
      }
    ]
  });
});

// Content generation routes
app.use('/api', contentRoutes);

// Serve static files from the React app build
let frontendBuildPath: string;
if (isProduction) {
  // Serve static files from the frontend build
  frontendBuildPath = path.join(__dirname, '../../web/build');
  app.use(express.static(frontendBuildPath));
  
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    // Skip API routes
    if (req.path.startsWith('/api/') || req.path === '/health') {
      return res.status(404).json({ 
        error: 'Route not found',
        path: req.originalUrl 
      });
    }
    
    res.sendFile(path.join(frontendBuildPath, 'index.html'));
  });
}

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

// 404 handler (only for API routes in production)
if (!isProduction) {
  app.use('*', (req, res) => {
    res.status(404).json({ 
      error: 'Route not found',
      path: req.originalUrl 
    });
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Hooks & CTAs Generator API server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`📍 API docs: http://localhost:${PORT}/api/hello`);
  console.log(`📍 Content generation: http://localhost:${PORT}/api/generateContent`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  
  if (isProduction) {
    console.log(`📍 Frontend served from: ${frontendBuildPath}`);
  }
  
  // Check if OpenAI is configured
  if (process.env.OPENAI_API_KEY) {
    console.log('✅ OpenAI API key configured');
  } else {
    console.log('⚠️  OpenAI API key not configured - using fallback content');
  }
});
