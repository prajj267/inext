# Railway Deployment Guide — i-NEXT Website

**Deploy your Express API to Railway in ~10 minutes**

Railway is a modern deployment platform that's easier than Render and offers:
- ✅ No spin-down on free tier (stays awake)
- ✅ Better build times
- ✅ Automatic HTTPS
- ✅ $5 free credit/month (plenty for this project)

---

## Prerequisites

- [ ] GitHub account with `prajj267/inext` repository
- [ ] Railway account (sign up at https://railway.app)
- [ ] Database ready (Neon PostgreSQL connection string)

---

## Part 1: Deploy API to Railway

### Step 1.1: Sign Up for Railway

1. **Go to**: https://railway.app
2. **Click**: "Login" (top right)
3. **Sign in with GitHub**
4. **Authorize Railway** to access your GitHub repositories

**✅ Checkpoint**: You're logged into Railway dashboard

---

### Step 1.2: Create New Project

1. **Click**: "New Project" (big button in the center or top right)
2. **Select**: "Deploy from GitHub repo"
3. **Choose**: `prajj267/inext` repository
4. **Click**: "Deploy Now"

Railway will:
- Detect it's a Node.js project
- Auto-configure build settings
- Start the first deployment

**⚠️ This first deployment will FAIL** — that's expected! We need to add environment variables first.

**✅ Checkpoint**: Project created, first build running/failed

---

### Step 1.3: Configure Root Directory

The repository has both `api/` and `frontend/` folders. We need to tell Railway to only deploy the `api/` folder.

1. **In your project**, click on the service (should say "inext" or "api")
2. **Go to**: **Settings** tab (left sidebar)
3. **Scroll to**: "Service Settings" section
4. **Find**: "Root Directory"
5. **Set to**: `api`
6. **Click**: "Update" or it auto-saves

**✅ Checkpoint**: Root directory set to `api`

---

### Step 1.4: Add Environment Variables

1. **Click**: **Variables** tab (left sidebar)
2. **Click**: "Add Variable" or "+ New Variable"
3. **Add these variables one by one**:

| Variable Name | Value | Notes |
|---------------|-------|-------|
| `DATABASE_URL` | `postgresql://neondb_owner:npg_TshiBXBvLQWW@ep-weathered-star-a1xbgzhe-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require` | Your Neon PostgreSQL connection string |
| `JWT_SECRET` | Generate below ⬇️ | |
| `ADMIN_EMAIL` | `arijitroy@iitp.ac.in` | |
| `ADMIN_PASSWORD` | `changeme123` | Change this later! |
| `FRONTEND_URL` | `https://inext.iitp.ac.in` | Your frontend domain |
| `NODE_ENV` | `production` | |

**To generate JWT_SECRET**:
- **Windows (PowerShell)**:
  ```powershell
  -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})
  ```
- **Git Bash / Linux / Mac**:
  ```bash
  openssl rand -base64 32
  ```

Copy the output and paste it as the `JWT_SECRET` value.

**✅ Checkpoint**: All 6 environment variables added

---

### Step 1.5: Deploy

Railway auto-deploys when you add variables. If not:

1. **Go to**: **Deployments** tab
2. **Click**: "Deploy" (top right)
3. **Wait**: 2-3 minutes for build to complete

**Watch the build logs**:
- Installing dependencies...
- Generating Prisma client...
- Building TypeScript...
- ✅ Deploy successful!

**✅ Checkpoint**: Deployment shows "Success" with green checkmark

---

### Step 1.6: Get Your API URL

1. **Go to**: **Settings** tab
2. **Scroll to**: "Domains" section
3. **Click**: "Generate Domain"
4. Railway will create a domain like: `inext-api-production-abcd.up.railway.app`
5. **Copy this URL** — you'll need it for the frontend

**Test the API**:
- Open in browser: `https://YOUR_RAILWAY_DOMAIN.railway.app/health`
- Should show: `{"status":"ok","timestamp":"..."}`

**✅ Checkpoint**: API is live and responding!

---

## Part 2: Update and Build Frontend

### Step 2.1: Update API URL in Frontend

1. **Open**: `C:\Projects\website iit\inext-website\.env`
2. **Update** the `NEXT_PUBLIC_API_URL` line:
   ```
   NEXT_PUBLIC_API_URL="https://YOUR_RAILWAY_DOMAIN.railway.app"
   ```
   Example:
   ```
   NEXT_PUBLIC_API_URL="https://inext-api-production-abc123.up.railway.app"
   ```
3. **Save** the file

---

### Step 2.2: Build Static Export

```bash
cd "C:\Projects\website iit\inext-website"
npm run build
```

Wait 2-3 minutes. When complete, the `out/` folder contains your static website.

**✅ Checkpoint**: Build successful, `out/` folder exists

---

## Part 3: Deploy Frontend to IIT Server

### Option A: Using the Deploy Script

**Git Bash or WSL**:
```bash
cd "C:\Projects\website iit\inext-website"
bash scripts/deploy-to-server.sh
```

**✅ Done!** The script handles everything automatically.

---

### Option B: Manual Upload

#### Step 3.1: Package the Build

**PowerShell**:
```powershell
cd "C:\Projects\website iit\inext-website\out"
Compress-Archive -Path * -DestinationPath ..\inext-static.zip
```

**Git Bash / Linux / Mac**:
```bash
cd "C:/Projects/website iit/inext-website/out"
tar -czf ../inext-static.tar.gz *
```

---

#### Step 3.2: Upload to Server

**Using SCP**:
```bash
scp inext-static.tar.gz inext@172.16.1.251:~/
# OR for .zip:
scp inext-static.zip inext@172.16.1.251:~/
```

**Using WinSCP** (Windows GUI):
1. Download from: https://winscp.net
2. Connect to `172.16.1.251` with username `inext`
3. Upload `inext-static.zip` or `inext-static.tar.gz` to home directory

---

#### Step 3.3: Extract on Server

**SSH into server**:
```bash
ssh inext@172.16.1.251
```

**Once logged in**:
```bash
# Backup old content (optional)
cd ~/public_html
mkdir -p ~/backups/$(date +%Y%m%d)
mv * ~/backups/$(date +%Y%m%d)/ 2>/dev/null || true

# Extract new site
# For .tar.gz:
tar -xzf ~/inext-static.tar.gz -C ~/public_html
# For .zip:
unzip ~/inext-static.zip -d ~/public_html

# Clean up
rm ~/inext-static.tar.gz  # or rm ~/inext-static.zip

# Verify
ls -la ~/public_html
```

**✅ Checkpoint**: Files extracted to `~/public_html`

---

## Part 4: Testing

### Test Public Pages

Open these URLs:

1. ✅ **Home**: https://inext.iitp.ac.in
2. ✅ **Members**: https://inext.iitp.ac.in/members
3. ✅ **Publications**: https://inext.iitp.ac.in/publications
4. ✅ **Projects**: https://inext.iitp.ac.in/projects
5. ✅ **News**: https://inext.iitp.ac.in/news
6. ✅ **Contact**: https://inext.iitp.ac.in/contact

---

### Test Admin Dashboard

1. **Go to**: https://inext.iitp.ac.in/login
2. **Login**:
   - Email: `arijitroy@iitp.ac.in`
   - Password: `changeme123`
3. **Test CRUD**:
   - Add a news item
   - Edit it
   - Delete it
4. **Verify**: Changes appear on public site

**✅ Checkpoint**: Everything works!

---

## Part 5: Post-Deployment

### Change Admin Password

1. **Go to**: Railway dashboard → your project
2. **Click**: **Variables** tab
3. **Find**: `ADMIN_PASSWORD`
4. **Update**: to a strong password
5. Railway auto-redeploys (~2 minutes)

---

### Monitor Your API

**Railway Dashboard**:
- **Metrics**: CPU, Memory, Network usage
- **Logs**: Real-time application logs
- **Deployments**: History of all deployments

**Check logs**:
1. Go to your project in Railway
2. Click **Deployments** tab
3. Click on any deployment
4. View **Build Logs** and **Deploy Logs**

---

### Optional: Custom Domain for API

Want `api.inext.iitp.ac.in` instead of the Railway domain?

1. **Contact IIT IT** (`aksharma@iitp.ac.in`) to add DNS record:
   - Type: `CNAME`
   - Name: `api.inext`
   - Value: `YOUR_RAILWAY_DOMAIN.railway.app`

2. **In Railway**:
   - Go to **Settings** → **Domains**
   - Click "Custom Domain"
   - Enter: `api.inext.iitp.ac.in`
   - Follow verification instructions

3. **Update frontend** `.env`:
   ```
   NEXT_PUBLIC_API_URL="https://api.inext.iitp.ac.in"
   ```
   Rebuild and redeploy frontend.

---

## 🎯 Railway vs Render: Why Railway is Better

| Feature | Railway | Render (Free Tier) |
|---------|---------|-------------------|
| **Spin-down** | ❌ No (stays awake) | ✅ Yes (15 min idle) |
| **Build time** | ~2 minutes | ~3-5 minutes |
| **First request** | Fast (always on) | Slow (~30s wake-up) |
| **Free credit** | $5/month | 750 hours/month |
| **Dashboard** | Modern, intuitive | Older UI |
| **Auto HTTPS** | ✅ Instant | ✅ Instant |
| **Custom domains** | ✅ Free | ✅ Free |
| **Build logs** | ✅ Excellent | ✅ Good |
| **Pricing** | ~$5/month after free credit | $0 (with limitations) |

**For this project**: Railway is better because your API stays awake, making admin dashboard much faster.

---

## 💰 Cost Estimate

**Railway Free Tier**:
- $5 free credit/month
- This project uses ~$3-4/month
- **Result**: Essentially free for the first month

After free credit:
- **$5/month** for hobby plan
- **Worth it** for no spin-down and better performance

**Alternative**: Stay on free Render if budget is $0, accept the 30-second wake-up time.

---

## 🐛 Troubleshooting

### Build Fails with "Prisma Client not generated"

**Solution**:
```bash
# In Railway dashboard → Settings
# Make sure build command includes:
npm run db:generate
```

Already configured in `package.json` scripts.

---

### API returns 500 errors

**Check**:
1. Railway → Deployments → View Logs
2. Look for database connection errors
3. Verify `DATABASE_URL` is correct in Variables

---

### CORS errors in browser console

**Solution**:
1. Check `FRONTEND_URL` in Railway variables
2. Should be: `https://inext.iitp.ac.in` (no trailing slash)
3. Update and redeploy

---

### "Cannot find module '@prisma/client'"

**Solution**:
Railway needs to install dependencies correctly. Check:
1. `package.json` has `@prisma/client` in dependencies (not devDependencies)
2. Build logs show "Generating Prisma Client..."
3. If not, manually trigger a redeploy

---

## 📞 Support

- **Railway Status**: https://railway.app/status
- **Railway Discord**: https://discord.gg/railway
- **Railway Docs**: https://docs.railway.app
- **Your API Logs**: Railway Dashboard → Deployments → View Logs

---

## ✅ Final Checklist

- [ ] Railway account created
- [ ] API deployed successfully
- [ ] Environment variables configured
- [ ] Custom domain generated
- [ ] API responds at `/health` endpoint
- [ ] Frontend `.env` updated with Railway URL
- [ ] Frontend rebuilt (`npm run build`)
- [ ] `out/` folder uploaded to IIT server
- [ ] Public site works at https://inext.iitp.ac.in
- [ ] Admin login works
- [ ] Admin can create/edit/delete content
- [ ] Changes appear on public site
- [ ] Admin password changed from default

---

## 🚀 Quick Commands Reference

### Rebuild Frontend
```bash
cd "C:\Projects\website iit\inext-website"
npm run build
```

### Deploy to Server (Git Bash)
```bash
bash scripts/deploy-to-server.sh
```

### Check API Health
```bash
curl https://YOUR_RAILWAY_DOMAIN.railway.app/health
```

### SSH to Server
```bash
ssh inext@172.16.1.251
```

### View Server Files
```bash
ssh inext@172.16.1.251 'ls -la ~/public_html'
```

---

**Deployment Time**: ~15 minutes from start to live  
**Monthly Cost**: $0 (first month with free credit)  
**Performance**: Excellent (no spin-down)  
**Status**: ✅ Production ready

---

## 🔗 Important Links

- **Railway Dashboard**: https://railway.app/dashboard
- **GitHub Repo**: https://github.com/prajj267/inext
- **Live Site**: https://inext.iitp.ac.in
- **Admin Login**: https://inext.iitp.ac.in/login
- **Database (Neon)**: https://console.neon.tech

---

**Ready to deploy?** Start with Part 1, Step 1.1 above! 🚀
