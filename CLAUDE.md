# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CardPass is a Solana-based professional networking platform built with SolidStart. The application features:
- Contact Gate: Spam-resistant contact requests with deposit/refund mechanism
- Intro Rewards: Automated referral bounties through escrow distribution  
- cNFT Business Cards: Compressed NFT-based digital business cards

## Development Commands

### Core Commands
- `npm run dev` - Start development server (uses Vinxi)
- `npm run build` - Build for production
- `npm start` - Start production server

### Package Management
This project uses pnpm (version 10.16.1+). Use `pnpm install` for dependency management.

### Node Version
Requires Node.js >= 22

## Architecture

### Framework & Routing
- **SolidStart**: Meta-framework built on SolidJS
- **File-based routing**: Routes defined in `src/routes/` directory
- **Router**: Uses `@solidjs/router` with FileRoutes for automatic route discovery
- **App structure**: Main App component in `src/app.tsx` with global Nav and Suspense wrapper

### Styling
- **TailwindCSS v4**: Configured via `@tailwindcss/vite` plugin
- **CSS**: Global styles in `src/app.css`

### Deployment
- **Target**: Cloudflare Workers (cloudflare_module preset)
- **Config**: Defined in `app.config.ts` with Cloudflare-specific settings

### Project Structure
```
src/
├── routes/           # File-based routing (index.tsx, about.tsx, [...404].tsx)
├── components/       # Reusable UI components (Nav.tsx, Counter.tsx)
├── app.tsx          # Root App component with Router setup
├── app.css          # Global styles
├── entry-client.tsx # Client-side entry point
└── entry-server.tsx # Server-side entry point
```

### Key Patterns
- **Path aliases**: `~/*` maps to `./src/*` for clean imports
- **JSX**: SolidJS JSX with preserve mode, no React imports needed
- **TypeScript**: Strict mode enabled with ESNext target
- **Components**: Functional components using SolidJS primitives

## Development Notes

### SolidJS Specifics
- Use `createSignal`, `createEffect`, `createMemo` for reactivity
- No virtual DOM - direct DOM manipulation
- `<A>` component for client-side navigation instead of `<a>`
- `useLocation()` hook for accessing current route

### Styling Conventions
- Utility-first approach with TailwindCSS
- Responsive prefixes (sm:, md:, lg:)
- Component-scoped classes using `class` attribute (not `className`)