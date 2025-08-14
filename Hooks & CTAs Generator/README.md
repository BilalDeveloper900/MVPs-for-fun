# My MVPs Monorepo

A monorepo built with pnpm workspaces containing a Next.js frontend and Node.js + Express backend.

## Project Structure

```
my-mvps-monorepo/
├── apps/
│   └── web/          # Next.js frontend application
├── packages/
│   └── api/          # Node.js + Express backend API
├── package.json       # Root package.json with workspace scripts
└── pnpm-workspace.yaml # Workspace configuration
```

## Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

## Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start development servers:
   ```bash
   pnpm dev
   ```

3. Build all packages:
   ```bash
   pnpm build
   ```

## Available Scripts

- `pnpm dev` - Start all development servers in parallel
- `pnpm build` - Build all packages
- `pnpm lint` - Run linting across all packages
- `pnpm test` - Run tests across all packages
- `pnpm clean` - Clean build artifacts

## Development

- **Frontend**: http://localhost:3000 (Next.js)
- **Backend**: http://localhost:4000 (Express API)

## Technologies

- **Frontend**: Next.js 14, React 18, TypeScript
- **Backend**: Node.js, Express, TypeScript
- **Package Manager**: pnpm
- **Monorepo**: pnpm workspaces
