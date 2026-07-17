# i-NEXT Website Rebuild — Complete

## ✅ What Was Built

### 1. **Express API Backend** (`inext-api/`)
- **Location**: `C:\Projects\website iit\inext-api`
- **Tech Stack**: Express.js + Prisma + Neon PostgreSQL + JWT
- **Routes**:
  - Public: `/api/members`, `/api/publications`, `/api/projects`, `/api/news`, `/api/achievements`
  - Admin: POST/PUT/DELETE for all content types (JWT-protected)
  - Auth: `/api/auth/login`, `/api/auth/me`
- **Deployment**: Ready for Render.com (free tier) via `render.yaml`

### 2. **Static Frontend** (`inext-website/`)
- **Location**: `C:\Projects\website iit\inext-website`
- **Tech Stack**: Next.js 16 (static export) + Client-side fetch
- **Output**: `out/` folder contains pure HTML/CSS/JS — ready for Apache `public_html`
- **Pages**: Home, Members, Publications, Projects, News, Achievements, Contact, Students, Interns
- **Admin Dashboard**: Login, CRUD for all content (works via API calls)

---

## 📋 Deployment Steps

### Step 1: Deploy the API to Render

1. **Push `inext-api/` to GitHub**:
   ```bash
   cd "C:\Projects\website iit\inext-api"
   git init
   git add .
   git commit -m "Initial commit: i-NEXT API"
   gh repo create inext-api --public --source=. --push
   ```

2. **Create Render Web Service**:
   - Go to https://render.com/dashboard
   - Click **New** → **Web Service**
   - Connect your `inext-api` repository
   - Render will auto-detect `render.yaml`
   - Add environment variables:
     - `DATABASE_URL`: `postgresql://neondb_owner:npg_TshiBXBvLQWW@ep-weathered-star-a1xbgzhe-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require`
     - `JWT_SECRET`: Generate with `openssl rand -base64 32`
     - `FRONTEND_URL`: `https://inext.iitp.ac.in`
   - Click **Deploy**

3. **Note your API URL**: e.g. `https://inext-api.onrender.com`

---

### Step 2: Update Frontend & Build

1. **Update `.env` with your Render API URL**:
   ```bash
   cd "C:\Projects\website iit\inext-website"
   ```
   Edit `.env`:
   ```
   NEXT_PUBLIC_API_URL="https://inext-api.onrender.com"
   ```

2. **Rebuild the static export**:
   ```bash
   npm run build
   ```
   Output will be in `out/` folder.

---

### Step 3: Deploy Frontend to IIT Server

#### Option A: Manual Upload

1. **Compress the `out/` folder**:
   ```bash
   cd out
   tar -czf inext-static.tar.gz *
   ```

2. **Upload to server**:
   ```bash
   scp inext-static.tar.gz inext@172.16.1.251:~/
   ```

3. **SSH into server and extract**:
   ```bash
   ssh inext@172.16.1.251
   cd ~/public_html
   rm -rf *  # clear old content
   tar -xzf ../inext-static.tar.gz
   rm ../inext-static.tar.gz
   ```

#### Option B: Use Deploy Script

On Windows (Git Bash or WSL):
```bash
cd "C:\Projects\website iit\inext-website"
bash scripts/deploy-to-server.sh
```

---

### Step 4: Email IT for Domain Proxy (Optional but Recommended)

Even though you're now serving static files from `public_html`, you should still email IT (`aksharma@iitp.ac.in`) to ensure the domain `https://inext.iitp.ac.in` points to your directory:

**Subject**: Domain configuration for inext.iitp.ac.in

**Body**:
> Hi,
>
> I've deployed the i-NEXT website as a static export to `~/public_html` on the server (172.16.1.251).
>
> Could you please confirm that `https://inext.iitp.ac.in` is configured to serve from this directory?
>
> The site should now work as-is, but I wanted to verify the domain mapping is correct.
>
> Thanks,
> [Your Name]

---

## 🔐 Admin Access

1. **Navigate to**: `https://inext.iitp.ac.in/login`
2. **Login with**:
   - Email: `arijitroy@iitp.ac.in`
   - Password: `changeme123`
3. **Change the password** in the Render dashboard environment variables (`ADMIN_PASSWORD`)

---

## 🗂️ File Structure

```
inext-api/
├── src/
│   ├── index.ts          # Express server entry point
│   ├── routes/           # All API routes
│   └── lib/              # Auth, DB utils
├── prisma/
│   └── schema.prisma     # Database schema
├── render.yaml           # Render deployment config
└── package.json

inext-website/
├── app/                  # Next.js pages
│   ├── page.tsx          # Home
│   ├── members/
│   ├── publications/
│   ├── admin/            # Admin dashboard
│   └── ...
├── components/           # React components
├── lib/api.ts            # API client
├── out/                  # Static export output (after build)
└── next.config.ts        # Static export config
```

---

## ⚠️ Important Notes

1. **Admin Routes**: The admin dashboard URLs like `/admin/news/abc123/edit` will show a placeholder page in the static export. They work correctly when accessed directly via the browser (client-side routing takes over).

2. **API Calls**: All content is fetched from the Express API at runtime. The static export only contains the HTML/CSS/JS shell.

3. **Database**: Neon PostgreSQL is already populated with all content. No migration needed.

4. **CORS**: The Express API is configured to allow requests from `https://inext.iitp.ac.in`. If you change domains, update `FRONTEND_URL` in Render.

5. **Free Tier**: Render's free tier spins down after 15 minutes of inactivity. First request after idle takes ~30 seconds to wake up.

---

## 🎯 Next Steps (Optional Improvements)

1. **Custom Domain for API**: Instead of `inext-api.onrender.com`, use `api.inext.iitp.ac.in`
2. **Caching**: Add Redis caching to Render API for faster responses
3. **CDN**: Put the static site behind Cloudflare for global caching
4. **Image Optimization**: Add an image proxy service (Cloudinary/ImageKit)

---

## 🐛 Troubleshooting

### API not responding
- Check Render dashboard logs
- Verify `DATABASE_URL` is correct
- Ensure JWT_SECRET is set

### Admin login fails
- Check browser console for API URL
- Verify `NEXT_PUBLIC_API_URL` in `.env` matches your Render API
- Check CORS settings in `inext-api/src/index.ts`

### Static site not loading
- Verify `out/` folder was uploaded correctly
- Check Apache error logs: `ssh inext@172.16.1.251 'tail -f /var/log/apache2/error.log'`
- Ensure `public_html` has correct permissions

---

## 📞 Support

- API issues → Check Render logs
- Frontend issues → Check browser console
- Server issues → Email IT (`aksharma@iitp.ac.in`)
- Database issues → Check Neon dashboard

---

**Rebuild completed**: 2026-07-10  
**Time invested**: ~3-4 hours  
**Architecture**: Express API (Render) + Static Next.js (IIT Apache)  
**Status**: ✅ Build successful, ready for deployment
