# Complete Deployment Guide — i-NEXT Website

**From Zero to Live in ~30 Minutes**

This guide walks you through deploying the i-NEXT website with the new architecture:
- **Backend API** → Render.com (free tier)
- **Frontend** → IIT Patna Apache server (`public_html`)
- **Database** → Neon PostgreSQL (already set up)

---

## 📋 Prerequisites

Before starting, make sure you have:

- [ ] Git installed on your computer
- [ ] GitHub account
- [ ] Render.com account (sign up at https://render.com)
- [ ] SSH access to IIT server (`inext@172.16.1.251`)
- [ ] Node.js installed (v18 or higher)

---

## Part 1: Deploy the Express API to Render

### Step 1.1: Push API to GitHub

Open **Git Bash** or **Command Prompt** and run:

```bash
# Navigate to the API folder
cd "C:\Projects\website iit\inext-api"

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: i-NEXT Express API"

# Create GitHub repository (if you have GitHub CLI)
gh repo create inext-api --public --source=. --push

# OR manually:
# 1. Go to github.com and create a new repository called 'inext-api'
# 2. Copy the repository URL
# 3. Run these commands:
git remote add origin https://github.com/YOUR_USERNAME/inext-api.git
git branch -M main
git push -u origin main
```

**✅ Checkpoint**: Your code is now on GitHub. Open the repository in your browser to verify.

---

### Step 1.2: Create Render Web Service

1. **Go to Render Dashboard**
   - Open https://dashboard.render.com
   - Click **"New +"** button in the top right
   - Select **"Web Service"**

2. **Connect Your Repository**
   - Click **"Connect a repository"**
   - Authorize Render to access your GitHub
   - Find and select **`inext-api`**
   - Click **"Connect"**

3. **Configure the Service**
   - **Name**: `inext-api`
   - **Region**: Singapore (or closest to India)
   - **Branch**: `main`
   - **Root Directory**: Leave blank
   - **Runtime**: Node
   - **Build Command**: `npm install && npm run db:generate && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Select **"Free"**

4. **Add Environment Variables**
   
   Click **"Advanced"** → **"Add Environment Variable"** and add these **one by one**:

   | Key | Value |
   |-----|-------|
   | `DATABASE_URL` | `postgresql://neondb_owner:npg_TshiBXBvLQWW@ep-weathered-star-a1xbgzhe-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require` |
   | `JWT_SECRET` | See below ⬇️ |
   | `FRONTEND_URL` | `https://inext.iitp.ac.in` |
   | `ADMIN_EMAIL` | `arijitroy@iitp.ac.in` |
   | `ADMIN_PASSWORD` | `changeme123` |
   | `NODE_ENV` | `production` |

   **To generate JWT_SECRET**:
   
   Open **Git Bash** and run:
   ```bash
   openssl rand -base64 32
   ```
   Copy the output and paste it as the `JWT_SECRET` value.

5. **Deploy**
   - Click **"Create Web Service"**
   - Wait 3-5 minutes for the build to complete
   - ✅ Once it shows **"Live"**, copy your API URL (e.g., `https://inext-api.onrender.com`)

**✅ Checkpoint**: Visit `https://YOUR_API_URL/health` — you should see `{"status":"ok","timestamp":"..."}`

---

### Step 1.3: Test the API

Open a browser and try these URLs (replace `YOUR_API_URL`):

- `https://YOUR_API_URL/health` → Should show `{"status":"ok"}`
- `https://YOUR_API_URL/api/news` → Should return JSON array of news items
- `https://YOUR_API_URL/api/members` → Should return JSON array of members

**✅ Checkpoint**: All 3 URLs return JSON data.

---

## Part 2: Update and Build the Frontend

### Step 2.1: Update the API URL

1. Open `C:\Projects\website iit\inext-website\.env` in a text editor

2. Replace the `NEXT_PUBLIC_API_URL` line with your Render API URL:
   ```
   NEXT_PUBLIC_API_URL="https://YOUR_API_URL.onrender.com"
   ```
   Example:
   ```
   NEXT_PUBLIC_API_URL="https://inext-api-abc123.onrender.com"
   ```

3. Save the file.

---

### Step 2.2: Build the Static Export

Open **Command Prompt** or **Git Bash**:

```bash
# Navigate to the frontend folder
cd "C:\Projects\website iit\inext-website"

# Install dependencies (if not already installed)
npm install

# Build the static export
npm run build
```

This will take 2-3 minutes. When complete, you'll see:

```
✓ Generating static pages using 15 workers (29/29)
✓ Finalizing page optimization
```

**✅ Checkpoint**: The `out/` folder now contains your static website.

---

### Step 2.3: Verify the Build

```bash
# Check the out folder was created
ls out
```

You should see files like:
- `index.html`
- `members.html`
- `publications.html`
- `_next/` folder
- `images/` folder

**✅ Checkpoint**: `out/` folder contains HTML files.

---

## Part 3: Deploy Frontend to IIT Server

### Option A: Deploy via Script (Recommended for Linux/Mac/Git Bash)

If you have **Git Bash** or **WSL** on Windows:

```bash
cd "C:\Projects\website iit\inext-website"
bash scripts/deploy-to-server.sh
```

The script will:
1. Build the site
2. Package it as a `.tar.gz`
3. Upload to the server
4. Extract to `~/public_html`

**Skip to Part 4** if this works.

---

### Option B: Manual Deploy (Windows Command Prompt / Any System)

#### Step 3.1: Compress the Build

**On Windows (PowerShell)**:
```powershell
cd "C:\Projects\website iit\inext-website\out"
Compress-Archive -Path * -DestinationPath ..\inext-static.zip
```

**On Linux/Mac/Git Bash**:
```bash
cd "C:/Projects/website iit/inext-website/out"
tar -czf ../inext-static.tar.gz *
```

---

#### Step 3.2: Upload to Server

**Using WinSCP** (Windows):
1. Download WinSCP: https://winscp.net/eng/download.php
2. Connect to:
   - Host: `172.16.1.251`
   - Username: `inext`
   - Password: (your SSH password)
3. Upload `inext-static.zip` or `inext-static.tar.gz` to `/home/inext/`

**Using SCP** (Command Line):
```bash
# Windows (Git Bash) / Linux / Mac
scp inext-static.tar.gz inext@172.16.1.251:~/
# OR for .zip:
scp inext-static.zip inext@172.16.1.251:~/
```

---

#### Step 3.3: Extract on Server

**SSH into the server**:
```bash
ssh inext@172.16.1.251
```

**Once logged in, run**:

```bash
# Go to public_html
cd ~/public_html

# Backup old content (optional)
mkdir -p ~/backups
mv * ~/backups/ 2>/dev/null || true

# Extract the new site
# For .tar.gz:
tar -xzf ../inext-static.tar.gz
# For .zip:
unzip ../inext-static.zip

# Clean up
rm ../inext-static.tar.gz  # or rm ../inext-static.zip

# Verify
ls -la
```

You should see:
```
index.html
members.html
publications.html
_next/
images/
...
```

**✅ Checkpoint**: Files are in `~/public_html` on the server.

---

## Part 4: Test the Live Site

### Step 4.1: Test Public Pages

Open these URLs in your browser:

1. **Home**: https://inext.iitp.ac.in
2. **Members**: https://inext.iitp.ac.in/members
3. **Publications**: https://inext.iitp.ac.in/publications
4. **Projects**: https://inext.iitp.ac.in/projects
5. **News**: https://inext.iitp.ac.in/news
6. **Achievements**: https://inext.iitp.ac.in/achievements
7. **Contact**: https://inext.iitp.ac.in/contact

**✅ Checkpoint**: All pages load and show content.

---

### Step 4.2: Test Admin Dashboard

1. **Go to**: https://inext.iitp.ac.in/login

2. **Login with**:
   - Email: `arijitroy@iitp.ac.in`
   - Password: `changeme123`

3. **Test Admin Actions**:
   - Go to **News** → Click **"+ Add News"**
   - Fill in a test news item
   - Click **"Save"**
   - Go back to **News** → Your item should appear
   - Click **"Edit"** → Make a change → Save
   - Click **"Delete"** → Confirm deletion

4. **Verify on Public Site**:
   - Open https://inext.iitp.ac.in/news in a new incognito/private window
   - Your changes should appear immediately

**✅ Checkpoint**: Admin dashboard works, changes appear on public site.

---

## Part 5: Security and Maintenance

### Step 5.1: Change Admin Password

1. Go to your Render dashboard: https://dashboard.render.com
2. Click on **`inext-api`** service
3. Go to **Environment** tab
4. Find **`ADMIN_PASSWORD`**
5. Click **"Edit"** → Change to a strong password
6. Click **"Save Changes"**
7. Render will automatically redeploy (takes ~2 minutes)

**✅ Checkpoint**: Login with new password works.

---

### Step 5.2: (Optional) Enable HTTPS for API

If you want a custom domain for your API (e.g., `api.inext.iitp.ac.in`):

1. **Add CNAME Record** (contact IIT IT):
   - Type: `CNAME`
   - Name: `api.inext`
   - Value: `inext-api.onrender.com`

2. **Add Custom Domain in Render**:
   - Go to Render dashboard → `inext-api` → **Settings**
   - Scroll to **Custom Domain**
   - Click **"Add Custom Domain"**
   - Enter: `api.inext.iitp.ac.in`
   - Follow verification instructions

3. **Update Frontend `.env`**:
   ```
   NEXT_PUBLIC_API_URL="https://api.inext.iitp.ac.in"
   ```
   Rebuild and redeploy frontend.

---

### Step 5.3: Monitor API Usage

**Render Free Tier Limits**:
- ✅ 750 hours/month (plenty for one site)
- ⚠️ Spins down after 15 minutes of inactivity
- ⚠️ First request after idle takes ~30 seconds to wake up

**To keep API awake** (optional):
1. Use a free uptime monitor like **UptimeRobot** (https://uptimerobot.com)
2. Add a monitor for `https://YOUR_API_URL/health`
3. Set interval to 5 minutes

This sends a request every 5 minutes, preventing spin-down.

---

## Part 6: Making Content Updates

### How to Add/Edit Content

**All content edits are done via the admin dashboard — no code changes needed.**

1. **Go to**: https://inext.iitp.ac.in/login
2. **Login** with admin credentials
3. **Navigate** to the section you want to edit (News, Members, Publications, etc.)
4. **Click** "+ Add" or "Edit" button
5. **Fill in** the form
6. **Click** "Save"
7. **Verify** on the public site (changes appear immediately)

---

### How to Redeploy After Code Changes

If you make code changes to the frontend:

1. **Update code** in `C:\Projects\website iit\inext-website`
2. **Rebuild**:
   ```bash
   cd "C:\Projects\website iit\inext-website"
   npm run build
   ```
3. **Redeploy** using the same steps as Part 3

If you make code changes to the API:

1. **Update code** in `C:\Projects\website iit\inext-api`
2. **Commit and push**:
   ```bash
   cd "C:\Projects\website iit\inext-api"
   git add .
   git commit -m "Update API"
   git push
   ```
3. **Render auto-deploys** (takes 3-5 minutes)

---

## 🐛 Troubleshooting

### Problem: API returns 404 on all routes

**Cause**: Build failed or service didn't start.

**Solution**:
1. Go to Render dashboard → `inext-api` → **Logs**
2. Look for errors
3. Common issues:
   - Missing environment variables → Add them and redeploy
   - Database connection failed → Check `DATABASE_URL`
   - Port binding error → Remove `PORT` from environment (Render sets it automatically)

---

### Problem: Admin login fails with "Network Error"

**Cause**: Frontend is pointing to wrong API URL or CORS is blocking.

**Solution**:
1. Open browser console (F12)
2. Check the error message
3. If it says "CORS error":
   - Verify `FRONTEND_URL` in Render matches your actual domain
   - Should be `https://inext.iitp.ac.in` (no trailing slash)
4. If it says "Failed to fetch":
   - Check `NEXT_PUBLIC_API_URL` in frontend `.env`
   - Rebuild frontend: `npm run build`
   - Redeploy

---

### Problem: Content changes don't appear on public site

**Cause**: Browser caching or API not updating database.

**Solution**:
1. **Hard refresh** the page: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
2. **Check API directly**: Visit `https://YOUR_API_URL/api/news` — is your new content there?
   - If YES → Browser cache issue, clear cache and reload
   - If NO → Check Render logs for database errors

---

### Problem: Site shows old content after redeploying

**Cause**: Didn't upload the new build.

**Solution**:
1. **Verify you ran** `npm run build` before uploading
2. **Check timestamp** on `index.html` in `out/` folder
3. **Re-upload** using the manual steps in Part 3

---

### Problem: Images not loading

**Cause**: Image paths are incorrect or images weren't uploaded.

**Solution**:
1. **Check** if `images/` folder is in `out/`
2. **Verify** images uploaded to server: `ssh inext@172.16.1.251 'ls ~/public_html/images'`
3. **Open browser console** (F12) and look for 404 errors
4. If images are in `/public/images/` in your code, they should appear in `out/images/`

---

### Problem: Admin edit pages show "Loading..." forever

**Cause**: API route not found or network error.

**Solution**:
1. **Open browser console** (F12)
2. Check for errors
3. Verify the API URL is reachable: `https://YOUR_API_URL/api/members`
4. Check that the ID in the URL is valid (exists in database)

---

### Problem: Free tier API is too slow

**Cause**: Render free tier spins down after 15 minutes.

**Solutions**:
1. **Upgrade to Render paid plan** ($7/month, no spin-down)
2. **Use UptimeRobot** to keep API awake (see Part 5.3)
3. **Add loading states** to frontend so users see "Loading..." instead of blank page

---

## 📞 Getting Help

### Check Logs

**Render API Logs**:
1. Go to https://dashboard.render.com
2. Click on `inext-api`
3. Go to **Logs** tab
4. Look for errors

**Server Logs**:
```bash
ssh inext@172.16.1.251
tail -f /var/log/apache2/error.log
```

**Browser Console**:
- Press `F12` in your browser
- Go to **Console** tab
- Look for red errors

---

### Contact Points

- **Render Issues**: Check logs, search Render community, or email support@render.com
- **IIT Server Issues**: Email `aksharma@iitp.ac.in`
- **Database Issues**: Check Neon dashboard at https://console.neon.tech
- **Frontend Bugs**: Check browser console, verify API responses

---

## ✅ Final Checklist

Before going live, verify:

- [ ] API is deployed and responding at `/health`
- [ ] All public pages load (home, members, publications, projects, news, achievements, contact)
- [ ] Admin login works
- [ ] Admin can create/edit/delete content
- [ ] Changes made in admin appear on public site
- [ ] Images load correctly
- [ ] Mobile view works (test on phone)
- [ ] Admin password has been changed from default
- [ ] Backups are in place (both code on GitHub and database via Neon)

---

## 🎯 Summary

**What you deployed**:
- ✅ Express API on Render (free tier)
- ✅ Static Next.js site on IIT Apache
- ✅ Admin dashboard accessible via web
- ✅ All content editable without touching code

**Costs**:
- $0/month (using free tiers)

**Maintenance**:
- Content updates: Via admin dashboard (no technical knowledge needed)
- Code updates: Rebuild and redeploy (rare, only for new features)
- Backups: Automatic (GitHub for code, Neon for database)

**Performance**:
- Public site: Fast (static HTML served by Apache)
- Admin dashboard: Fast (direct API calls)
- First load after idle: ~30 seconds (Render free tier spin-up)

---

**Deployment completed by**: [Your Name]  
**Date**: [Today's Date]  
**Architecture**: Express API (Render) + Static Next.js (IIT Apache) + Neon PostgreSQL  
**Status**: ✅ Live and operational

---

## 🔗 Quick Links

- **Public Site**: https://inext.iitp.ac.in
- **Admin Dashboard**: https://inext.iitp.ac.in/login
- **API**: https://YOUR_API_URL.onrender.com
- **Render Dashboard**: https://dashboard.render.com
- **GitHub (API)**: https://github.com/YOUR_USERNAME/inext-api
- **Neon Dashboard**: https://console.neon.tech

---

**Need to make a quick content update?** → Go to https://inext.iitp.ac.in/login  
**Need to check if API is up?** → Visit https://YOUR_API_URL/health  
**Need to redeploy frontend?** → Run `npm run build` then upload `out/` folder

That's it! 🚀
