import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import contentRoutes from './routes/contentRoutes';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'My MVPs API',
    version: '1.0.0'
  });
});

// API routes
app.get('/api/hello', (req, res) => {
  res.json({ 
    message: 'Hello from My MVPs API!',
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

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 My MVPs API server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`📍 API docs: http://localhost:${PORT}/api/hello`);
  console.log(`📍 Content generation: http://localhost:${PORT}/api/generateContent`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  
  // Check if OpenAI is configured
  if (process.env.OPENAI_API_KEY) {
    console.log('✅ OpenAI API key configured');
  } else {
    console.log('⚠️  OpenAI API key not configured - using fallback content');
  }
});
