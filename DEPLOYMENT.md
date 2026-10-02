# Northline - Deployment Guide

This guide covers deploying Northline to Vercel and other platforms.

## Vercel Deployment (Recommended)

Northline is optimized for Vercel deployment with TanStack Start and Nitro.

### Prerequisites

- GitHub/GitLab/Bitbucket account
- Vercel account (free tier works)

### Method 1: Deploy via Vercel Dashboard (Easiest)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Northline job board"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect the framework settings

3. **Configure Environment Variables** (Optional)
   - In project settings, add:
     ```
     VITE_AUTH_ENABLED=false
     NODE_ENV=production
     ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy automatically

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **For Production**
   ```bash
   vercel --prod
   ```

### Vercel Configuration

The `vercel.json` file is pre-configured with:

```json
{
  "framework": "vite",
  "installCommand": "npm install",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "outputDirectory": ".output/public",
  "env": {
    "VITE_AUTH_ENABLED": "false",
    "NODE_ENV": "production"
  }
}
```

### Environment Variables for Vercel

Set these in your Vercel project dashboard:

**Required:**
- `VITE_AUTH_ENABLED` - Set to `"false"` (or `"true"` if using auth)
- `NODE_ENV` - Set to `"production"`

**Optional (if auth enabled):**
- `BETTER_AUTH_SECRET` - Random secret key for Better Auth
- `BETTER_AUTH_URL` - Your production URL (e.g., `https://northline.vercel.app`)
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `GITHUB_CLIENT_ID` - GitHub OAuth client ID
- `GITHUB_CLIENT_SECRET` - GitHub OAuth client secret

### Custom Domain

1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed by Vercel

### Automatic Deployments

Once connected to Git:
- **Push to main branch** → Production deployment
- **Push to other branches** → Preview deployment
- Pull requests get automatic preview URLs

## Alternative Platforms

### Netlify

1. **netlify.toml** (create this file):
   ```toml
   [build]
     command = "npm run build"
     publish = ".output/public"
   
   [build.environment]
     NODE_VERSION = "20"
     VITE_AUTH_ENABLED = "false"
   
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. Connect your Git repo to Netlify
3. Deploy

### Cloudflare Pages

1. Connect your Git repository
2. Set build command: `npm run build`
3. Set output directory: `.output/public`
4. Add environment variables
5. Deploy

### Railway

1. Create new project from GitHub repo
2. Add environment variables:
   ```
   VITE_AUTH_ENABLED=false
   NODE_ENV=production
   ```
3. Railway auto-deploys on push

### Self-Hosted (VPS/Docker)

#### Using Node.js directly

```bash
# Install dependencies
npm install

# Build
npm run build

# Serve (requires a process manager like PM2)
npm install -g pm2
pm2 start "npm run preview" --name northline
```

#### Using Docker

Create `Dockerfile`:

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 4173

CMD ["npm", "run", "preview"]
```

Build and run:

```bash
docker build -t northline .
docker run -p 4173:4173 northline
```

## Database Considerations

### PGLite (Default - Development)

The app uses PGLite (embedded Postgres) by default. This works locally but **data is not persisted** between deployments on serverless platforms.

For **production with data persistence**, consider:

### Option 1: Keep Current Setup (Stateless)

Since job data is in `src/data/`, you don't need a persistent database. PGLite works fine.

### Option 2: Use External Database

If you add user accounts or dynamic data:

1. **Get a Postgres database:**
   - [Vercel Postgres](https://vercel.com/storage/postgres)
   - [Neon](https://neon.tech) (generous free tier)
   - [Supabase](https://supabase.com)
   - [Railway Postgres](https://railway.app)

2. **Add DATABASE_URL to environment variables:**
   ```
   DATABASE_URL=postgresql://user:password@host:5432/database
   ```

3. **Update `src/lib/db.ts`** to use external Postgres instead of PGLite

## Performance Tips

### 1. Enable Vercel Analytics

In your Vercel project:
- Go to Analytics tab
- Enable Web Analytics
- Add `@vercel/analytics` package

### 2. Enable Edge Functions (Optional)

For faster global response times, consider deploying to Vercel Edge:
- Update `vite.config.ts` nitro preset to `"vercel-edge"`

### 3. Add Caching Headers

Create `public/_headers`:

```
/assets/*
  Cache-Control: public, max-age=31536000, immutable

/og.jpg
  Cache-Control: public, max-age=86400

/favicon.svg
  Cache-Control: public, max-age=86400
```

## Monitoring & Analytics

### Recommended Tools

1. **Vercel Analytics** - Built-in, free tier available
2. **Google Analytics** - Add to `__root.tsx`
3. **Sentry** - Error tracking
4. **Plausible/Fathom** - Privacy-friendly analytics

## Troubleshooting

### Build Fails on Vercel

**Issue:** Build fails with module errors

**Solution:**
```bash
# Locally test the build
npm run build

# Check for TypeScript errors
npm run typecheck
```

### 404 on Refresh

**Issue:** Page refresh returns 404

**Solution:** The `vercel.json` rewrites handle this, ensure it's committed to git

### Environment Variables Not Working

**Issue:** `VITE_AUTH_ENABLED` not taking effect

**Solution:**
1. Ensure variable starts with `VITE_` prefix
2. Redeploy after adding env vars
3. Check Vercel dashboard > Settings > Environment Variables

### Slow Build Times

**Solution:**
1. Enable Vercel build cache
2. Remove unused dependencies
3. Consider upgrading Vercel plan for faster builds

## Post-Deployment Checklist

- [ ] Site loads correctly
- [ ] All routes work (jobs, companies, categories)
- [ ] Search functionality works
- [ ] Saved jobs persist (localStorage)
- [ ] Meta tags and SEO correct
- [ ] Mobile responsive
- [ ] Custom domain configured (if applicable)
- [ ] Analytics enabled
- [ ] SSL/HTTPS working
- [ ] Performance acceptable (Lighthouse score)

## Support

For deployment issues:
- Check [Vercel Documentation](https://vercel.com/docs)
- Review build logs in Vercel dashboard
- Test locally with `npm run build && npm run preview`

## Costs

### Vercel Free Tier Includes:
- 100 GB bandwidth/month
- Unlimited sites
- Automatic HTTPS
- Preview deployments
- Serverless functions

This is sufficient for most job boards. Upgrade only if you exceed limits.
