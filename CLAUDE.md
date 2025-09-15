# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CardPass is a Solana-based professional networking platform built with SolidStart. The application features:
- Contact Gate: Spam-resistant contact requests with deposit/refund mechanism
- Intro Rewards: Automated referral bounties through escrow distribution
- cNFT Business Cards: Compressed NFT-based digital business cards
- Internationalization: Full Korean and English language support

## Development Commands

### Core Commands
- `pnpm run dev` - Start development server (uses Vinxi)
- `pnpm run build` - Build for production
- `pnpm start` - Start production server

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

### Internationalization (i18n)
- **Library**: `@solid-primitives/i18n` for translations
- **Languages**: Korean (ko) and English (en)
- **Translation files**: Located in `src/constants/i18n/`
- **Context Provider**: `I18nProvider` wraps the app for global language state

### Styling
- **TailwindCSS v4**: Configured via `@tailwindcss/vite` plugin
- **CSS**: Global styles in `src/styles/app.css`
- **Font**: Pretendard font family for better Korean/English typography

### Deployment
- **Target**: Cloudflare Workers (cloudflare_module preset)
- **Config**: Defined in `app.config.ts` with Cloudflare-specific settings

### Project Structure
```
src/
├── app/                    # Application configuration (reserved for future use)
├── components/
│   ├── ui/                # UI components (LanguageSwitcher.tsx)
│   ├── layout/            # Layout components (Nav.tsx)
│   └── shared/            # Shared/common components
├── features/
│   ├── auth/              # Authentication features
│   └── dashboard/         # Dashboard features
├── constants/
│   └── i18n/             # Translation dictionaries (en.ts, ko.ts)
├── contexts/             # React contexts (i18n.tsx)
├── hooks/                # Custom hooks
├── lib/                  # Third-party library wrappers
├── routes/               # Page routes (index.tsx, jobs.tsx, about.tsx, [...404].tsx)
├── store/                # Global state management
├── styles/               # CSS and style files (app.css)
├── types/                # TypeScript type definitions
├── utils/                # Utility functions
├── app.tsx              # Root App component with Router setup
├── entry-client.tsx     # Client-side entry point
└── entry-server.tsx     # Server-side entry point
```

### Key Patterns
- **Path aliases**: `~/*` maps to `./src/*` for clean imports
- **JSX**: SolidJS JSX with preserve mode, no React imports needed
- **TypeScript**: Strict mode enabled with ESNext target
- **Components**: Functional components using SolidJS primitives
- **Reactive patterns**: Functions for reactive data (e.g., `const items = () => [...]`)

## Development Notes

### SolidJS Specifics
- Use `createSignal`, `createEffect`, `createMemo` for reactivity
- No virtual DOM - direct DOM manipulation
- `<A>` component for client-side navigation instead of `<a>`
- `useLocation()` hook for accessing current route
- Arrays and objects should be wrapped in functions for reactivity

### Internationalization Best Practices
- Always use the `t()` function for text content
- Make data reactive by using `createMemo` or functions
- Avoid hardcoding language-specific content
- Use flattened dictionaries for better performance

### Styling Conventions
- Utility-first approach with TailwindCSS
- Responsive prefixes (sm:, md:, lg:)
- Component-scoped classes using `class` attribute (not `className`)
- Dark theme with gradient accents (violet/cyan)
- Consistent spacing and rounded corners (rounded-xl, rounded-2xl)