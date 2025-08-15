"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cors_1 = require("cors");
var helmet_1 = require("helmet");
var morgan_1 = require("morgan");
var dotenv_1 = require("dotenv");
var contentRoutes_1 = require("./routes/contentRoutes");
// Load environment variables
dotenv_1.default.config();
var app = (0, express_1.default)();
var PORT = process.env.PORT || 4000;
var isProduction = process.env.NODE_ENV === 'production';
// Middleware
app.use((0, helmet_1.default)({
    contentSecurityPolicy: isProduction ? {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    } : false,
}));
app.use((0, cors_1.default)({
    origin: isProduction
        ? [process.env.CORS_ORIGIN || 'http://localhost:3000']
        : true,
    credentials: true
}));
app.use((0, morgan_1.default)(isProduction ? 'combined' : 'dev'));
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
// Health check endpoint
app.get('/health', function (req, res) {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        service: 'Hooks & CTAs Generator API',
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'development'
    });
});
// API routes
app.get('/api/hello', function (req, res) {
    res.json({
        message: 'Hello from Hooks & CTAs Generator API!',
        timestamp: new Date().toISOString()
    });
});
app.get('/api/mvps', function (req, res) {
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
app.use('/api', contentRoutes_1.default);
// For development, redirect frontend requests to Next.js dev server
if (!isProduction) {
    app.get('*', function (req, res) {
        // Skip API routes
        if (req.path.startsWith('/api/') || req.path === '/health') {
            return res.status(404).json({
                error: 'Route not found',
                path: req.originalUrl
            });
        }
        // Redirect to Next.js dev server
        res.redirect("http://localhost:3000".concat(req.path));
    });
}
// Error handling middleware
app.use(function (err, req, res, next) {
    console.error('Unhandled error:', err.stack);
    res.status(500).json({
        error: 'Something went wrong!',
        message: err.message
    });
});
// 404 handler (only for API routes in production)
if (!isProduction) {
    app.use('*', function (req, res) {
        res.status(404).json({
            error: 'Route not found',
            path: req.originalUrl
        });
    });
}
app.listen(PORT, function () {
    console.log("\uD83D\uDE80 Hooks & CTAs Generator API server running on port ".concat(PORT));
    console.log("\uD83D\uDCCD Health check: http://localhost:".concat(PORT, "/health"));
    console.log("\uD83D\uDCCD API docs: http://localhost:".concat(PORT, "/api/hello"));
    console.log("\uD83D\uDCCD Content generation: http://localhost:".concat(PORT, "/api/generateContent"));
    console.log("\uD83D\uDCCD Environment: ".concat(process.env.NODE_ENV || 'development'));
    if (isProduction) {
        console.log("\uD83D\uDCCD Frontend served from production build");
    }
    // Check if OpenAI is configured
    if (process.env.OPENAI_API_KEY) {
        console.log('✅ OpenAI API key configured');
    }
    else {
        console.log('⚠️  OpenAI API key not configured - using fallback content');
    }
});
