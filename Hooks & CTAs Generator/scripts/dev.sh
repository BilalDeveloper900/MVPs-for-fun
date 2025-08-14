#!/bin/bash

echo "🚀 Starting My MVPs Monorepo Development Environment..."

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm is not installed. Please install it first:"
    echo "   npm install -g pnpm"
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    pnpm install
fi

# Start development servers
echo "🔥 Starting development servers..."
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:4000"
echo ""
echo "Press Ctrl+C to stop all services"

pnpm dev
