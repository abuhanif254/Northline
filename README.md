# Northline Job Board

A curated career marketplace listing quality roles from companies that take craft, pay, and management seriously.

## Tech Stack

- **Framework**: React 19 + TanStack Start (full-stack React)
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI
- **State Management**: Zustand + TanStack Query
- **Database**: PGLite (embedded Postgres) + Kysely
- **Authentication**: Better Auth (optional)
- **Build Tool**: Vite 8
- **Deployment**: Vercel

## Prerequisites

- Node.js 18+ (Node 22 recommended)
- npm or pnpm

## Local Development Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

The project uses a `.env` file for configuration. A default one has been created with:

```
VITE_AUTH_ENABLED=false
NODE_ENV=development
```

For production or to enable authentication, copy `.env.example` and configure:

```bash
cp .env.example .env
```

Then update the values as needed.

### 3. Start Development Server

```bash
npm run dev
```

The app will be available at: **http://localhost:5173**

### 4. Build for Production

```bash
npm run build
```

This will:
- Build the app with Vite
- Run database migrations automatically

### 5. Preview Production Build

```bash
npm run preview
```

Preview server runs at: **http://localhost:4173**

## Available Scripts

- `npm run dev` - Start development server (port 5173)
- `npm run build` - Build for production + run migrations
- `npm run preview` - Preview production build
- `npm run typecheck` - Run TypeScript type checking
- `npm run lint` - Lint code with ESLint
- `npm run format` - Format code with Prettier
- `npm run test` - Run tests
- `npm run db:migrate` - Run database migrations manually

## Project Structure

```
northline/
├── public/              # Static assets
│   ├── favicon.svg
│   ├── og.jpg          # Open Graph image
│   └── manifest.json   # PWA manifest
├── src/
│   ├── components/     # React components
│   │   ├── ui/        # Reusable UI components
│   │   ├── jobs/      # Job-related components
│   │   ├── companies/ # Company components
│   │   └── layout/    # Layout components
│   ├── data/          # Static data
│   │   ├── jobs.ts    # Job listings
│   │   └── companies.ts # Company data
│   ├── lib/           # Utilities and helpers
│   │   ├── auth/      # Authentication (Better Auth)
│   │   ├── jobs/      # Job filtering/querying
│   │   ├── seo/       # SEO utilities
│   │   └── storage/   # Local storage utilities
│   ├── routes/        # File-based routing
│   │   ├── __root.tsx # Root layout
│   │   ├── index.tsx  # Home page
│   │   ├── jobs/      # Job routes
│   │   └── companies/ # Company routes
│   ├── router.tsx     # Router configuration
│   └── styles.css     # Global styles
├── migrations/        # Database migrations
├── scripts/           # Build and utility scripts
├── .env              # Environment variables (local)
├── .env.example      # Environment template
├── vite.config.ts    # Vite configuration
├── tsconfig.json     # TypeScript configuration
└── package.json      # Dependencies and scripts
```

## Features

### Job Listings
- 8 focused categories (Engineering, Design, Product, etc.)
- Advanced filtering by category, workplace, experience level
- Salary transparency on all listings
- Search functionality

### Company Profiles
- Detailed company information
- Industry, size, location
- Company mission and values

### User Features (with auth disabled)
- Save jobs to local storage
- Browse and filter jobs
- View job and company details

### SEO Optimized
- JSON-LD structured data
- Dynamic meta tags
- Sitemap and robots.txt
- Open Graph images

## Database

The app uses PGLite (embedded Postgres) for local development. No external database setup required.

### Migrations

Migrations run automatically during build, or manually:

```bash
npm run db:migrate
```

Migration files are in `migrations/` directory.

## Authentication (Optional)

Authentication is **disabled by default**. To enable:

1. Set `VITE_AUTH_ENABLED=true` in `.env`
2. Configure Better Auth credentials (see `.env.example`)
3. Restart the dev server

Better Auth supports:
- Google OAuth
- GitHub OAuth  
- Microsoft OAuth
- Email/Password

## Deployment

### Vercel (Recommended)

The project is pre-configured for Vercel deployment:

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

Or connect your GitHub repo to Vercel for automatic deployments.

### Environment Variables for Production

Set these in your Vercel project settings:

```
VITE_AUTH_ENABLED=false
NODE_ENV=production
```

Add authentication credentials if enabling auth.

## Development Notes

### Port Configuration
- Dev server: `localhost:5173` (Vite default)
- Preview server: `localhost:4173`

### No Authentication Required
The app works perfectly without authentication. Jobs are stored in local browser storage.

### Data Management
Job and company data are in `src/data/`. Edit these files to add/update listings.

## Troubleshooting

### Dev server won't start
```bash
# Clear cache and reinstall
rm -rf node_modules .tanstack .vercel
npm install
npm run dev
```

### TypeScript errors
```bash
npm run typecheck
```

### Build errors
Check that all dependencies are installed:
```bash
npm install
npm run build
```

## License

MIT

## Support

For issues or questions, please check the project documentation or create an issue.
