# i-NEXT API

Express.js backend for the i-NEXT Research Lab website.

## Quick Start

```bash
# Install dependencies
npm install

# Copy .env.example and fill in values
cp .env.example .env

# Generate Prisma client
npm run db:generate

# Run development server
npm run dev
```

## Deploy to Railway (Recommended)

1. Push this folder to a Git repository (see parent README)
2. Create a new project on Railway.app
3. Connect your repository
4. Set **Root Directory** to `api`
5. Add environment variables in the Railway dashboard:
   - `DATABASE_URL` — your Neon PostgreSQL connection string
   - `JWT_SECRET` — generate with `openssl rand -base64 32`
   - `FRONTEND_URL` — `https://inext.iitp.ac.in`
   - `ADMIN_EMAIL` — `arijitroy@iitp.ac.in`
   - `ADMIN_PASSWORD` — secure password
   - `NODE_ENV` — `production`
6. Deploy

Your API will be live at `https://your-project.railway.app`.

**Advantages over Render**:
- No spin-down (stays awake)
- Faster cold starts
- Better build times
- $5 free credit/month

## Deploy to Render

1. Push this folder to a Git repository
2. Create a new **Web Service** on Render.com
3. Connect your repository
4. Render will auto-detect `render.yaml` and configure everything
5. Add environment variables in the Render dashboard:
   - `DATABASE_URL` — your Neon PostgreSQL connection string
   - `JWT_SECRET` — generate with `openssl rand -base64 32`
   - `FRONTEND_URL` — `https://inext.iitp.ac.in`
6. Deploy

Your API will be live at `https://inext-api.onrender.com` (or your custom domain).

## Update Frontend

After deploying the API, update the frontend `.env`:

```
NEXT_PUBLIC_API_URL="https://inext-api.onrender.com"
```

Then rebuild and redeploy the frontend.

## API Routes

### Public
- `GET /api/members` — all lab members
- `GET /api/publications` — all publications
- `GET /api/projects` — all projects
- `GET /api/news` — all news items
- `GET /api/achievements` — all achievements

### Admin (requires JWT)
- `POST /api/auth/login` — login (returns JWT token)
- `GET /api/auth/me` — verify token
- `POST /api/members` — create member
- `PUT /api/members/:id` — update member
- `DELETE /api/members/:id` — delete member
- (same CRUD for publications, projects, news, achievements)

## Local Development

```bash
npm run dev  # runs on port 4000
```

Frontend should point to `http://localhost:4000` in `.env.local`.
