# My MVPs API

A Node.js + Express backend API for the My MVPs monorepo, featuring AI-powered content generation using OpenAI.

## Features

- **Express.js Server**: Fast, unopinionated web framework
- **TypeScript**: Full type safety and modern JavaScript features
- **OpenAI Integration**: GPT-4-turbo powered content generation
- **RESTful API**: Clean, predictable API endpoints
- **Security**: Helmet.js for security headers, CORS protection
- **Logging**: Morgan for HTTP request logging
- **Error Handling**: Comprehensive error handling and validation

## API Endpoints

### Health Check
- `GET /health` - Server health status

### Content Generation
- `POST /api/generateContent` - Generate hooks and CTAs for a topic

### General
- `GET /api/hello` - Simple hello message
- `GET /api/mvps` - List of MVP projects

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment Configuration**:
   Copy `env.example` to `.env` and configure:
   ```bash
   # OpenAI Configuration
   OPENAI_API_KEY=your_openai_api_key_here
   
   # Server Configuration
   PORT=4000
   NODE_ENV=development
   
   # CORS Configuration
   CORS_ORIGIN=http://localhost:3000
   ```

3. **Get OpenAI API Key**:
   - Visit [OpenAI Platform](https://platform.openai.com/)
   - Create an account and get your API key
   - Add it to your `.env` file

## Development

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Clean build artifacts
npm run clean
```

## Content Generation

The `/api/generateContent` endpoint generates compelling hooks and call-to-actions for social media posts.

### Request
```json
POST /api/generateContent
Content-Type: application/json

{
  "topic": "email marketing"
}
```

### Response
```json
{
  "success": true,
  "data": {
    "hooks": [
      "Discover the email marketing secret that 95% of people don't know about",
      "How I used email marketing to increase my results by 300% in just 30 days"
    ],
    "ctas": [
      "Get your free email marketing guide now",
      "Start your email marketing journey today"
    ]
  },
  "topic": "email marketing",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Error Handling

The API includes comprehensive error handling:

- **400 Bad Request**: Invalid input validation
- **500 Internal Server Error**: Server or OpenAI API errors
- **404 Not Found**: Route not found

## Fallback Content

If the OpenAI API is unavailable or fails, the service provides fallback content to ensure the application continues to work.

## Security Features

- **Helmet.js**: Security headers
- **CORS**: Cross-origin resource sharing protection
- **Input Validation**: Request body validation and sanitization
- **Rate Limiting**: Built-in Express.js protection

## Dependencies

- **express**: Web framework
- **openai**: OpenAI API client
- **cors**: CORS middleware
- **helmet**: Security middleware
- **morgan**: HTTP request logger
- **dotenv**: Environment variable management

## Development Dependencies

- **typescript**: TypeScript compiler
- **tsx**: TypeScript execution for development
- **@types/express**: Express type definitions
- **@types/cors**: CORS type definitions
- **@types/morgan**: Morgan type definitions
- **@types/node**: Node.js type definitions
