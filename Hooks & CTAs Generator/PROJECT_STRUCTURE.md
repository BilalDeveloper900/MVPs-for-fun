# Project Structure

This document provides a detailed overview of the monorepo structure and organization.

## Directory Layout

```
my-mvps-monorepo/
├── apps/                          # Application packages
│   └── web/                      # Next.js frontend application
│       ├── src/
│       │   └── app/              # Next.js 13+ app directory
│       │       ├── layout.tsx    # Root layout component
│       │       ├── page.tsx      # Home page component
│       │       └── globals.css   # Global styles with Tailwind
│       ├── package.json          # Frontend dependencies
│       ├── next.config.js        # Next.js configuration
│       ├── tsconfig.json         # TypeScript configuration
│       ├── tailwind.config.js    # Tailwind CSS configuration
│       └── postcss.config.js     # PostCSS configuration
├── packages/                      # Shared packages
│   └── api/                      # Node.js + Express backend
│       ├── src/
│       │   ├── index.ts          # Main server entry point
│       │   └── types/            # TypeScript type definitions
│       │       └── index.ts      # API types and interfaces
│       ├── package.json          # Backend dependencies
│       └── tsconfig.json         # TypeScript configuration
├── scripts/                       # Development and utility scripts
│   ├── dev.sh                    # Unix/Linux development script
│   └── dev.bat                   # Windows development script
├── package.json                   # Root package.json with workspace config
├── pnpm-workspace.yaml           # pnpm workspace configuration
├── .gitignore                     # Git ignore patterns
├── README.md                      # Project overview and setup
└── PROJECT_STRUCTURE.md           # This file
```

## Package Dependencies

### Root Dependencies
- `typescript`: TypeScript compiler
- `@types/node`: Node.js type definitions

### Frontend (apps/web)
- `next`: Next.js framework
- `react`: React library
- `react-dom`: React DOM rendering
- `tailwindcss`: Utility-first CSS framework
- `autoprefixer`: CSS vendor prefixing
- `postcss`: CSS processing

### Backend (packages/api)
- `express`: Web framework
- `cors`: Cross-origin resource sharing
- `helmet`: Security middleware
- `morgan`: HTTP request logger

## Development Workflow

1. **Install Dependencies**: `pnpm install`
2. **Start Development**: `pnpm dev` (starts both frontend and backend)
3. **Build**: `pnpm build` (builds all packages)
4. **Lint**: `pnpm lint` (runs linting across all packages)

## Port Configuration

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:4000

## Key Features

- **Monorepo Management**: pnpm workspaces for efficient dependency management
- **TypeScript**: Full TypeScript support across frontend and backend
- **Modern Frontend**: Next.js 14 with app directory and Tailwind CSS
- **RESTful API**: Express.js backend with proper middleware and error handling
- **Development Scripts**: Cross-platform scripts for easy development setup
- **Shared Types**: TypeScript types can be shared between packages

## Adding New Packages

To add a new package:

1. Create a new directory in `apps/` or `packages/`
2. Add a `package.json` with the package name prefixed with `@my-mvps/`
3. Update the root `package.json` scripts if needed
4. Run `pnpm install` to update the workspace

## Best Practices

- Use TypeScript for all new code
- Follow the established naming conventions
- Keep packages focused and single-purpose
- Use workspace dependencies when packages need to reference each other
- Maintain consistent code formatting and linting rules
