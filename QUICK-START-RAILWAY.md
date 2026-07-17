# Quick Start — Deploy to Railway

**Get your i-NEXT website live in 15 minutes**

---

## Step 1: Deploy API to Railway (5 minutes)

1. **Go to**: https://railway.app
2. **Click**: "Login" → Sign in with GitHub
3. **Click**: "New Project"
4. **Select**: "Deploy from GitHub repo"
5. **Choose**: `prajj267/inext`
6. **Click**: Deploy Now

### Configure Settings:

1. **Click** on the service → **Settings** tab
2. **Set Root Directory**: `api`
3. **Click** **Variables** tab
4. **Add these variables**:

```
DATABASE_URL=postgresql://neondb_owner:npg_TshiBXBvLQWW@ep-weathered-star-a1xbgzhe-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
JWT_SECRET=<generate with: openssl rand -base64 32>
ADMIN_EMAIL=arijitroy@iitp.ac.in
ADMIN_PASSWORD=changeme123
FRONTEND_URL=https://inext.iitp.ac.in
NODE_ENV=production
```

5. **Go to Settings** → **Networking**
6. **Click**: "Generate Domain"
7. **Copy** your Railway URL (e.g., `inext-api-production.up.railway.app`)

---

## Step 2: Build Frontend (3 minutes)

1. **Open**: `C:\Projects\website iit\inext-website\.env`
2. **Update**:
   ```
   NEXT_PUBLIC_API_URL="https://YOUR_RAILWAY_URL.railway.app"
   ```
3. **Build**:
   ```bash
   cd "C:\Projects\website iit\inext-website"
   npm run build
   ```

---

## Step 3: Deploy to IIT Server (5 minutes)

### Option A: Script (Git Bash)
```bash
cd "C:\Projects\website iit\inext-website"
bash scripts/deploy-to-server.sh
```

### Option B: Manual

1. **Package**:
   ```powershell
   cd "C:\Projects\website iit\inext-website\out"
   Compress-Archive -Path * -DestinationPath ..\site.zip
   ```

2. **Upload**:
   ```bash
   scp site.zip inext@172.16.1.251:~/
   ```

3. **Extract**:
   ```bash
   ssh inext@172.16.1.251
   cd ~/public_html
   rm -rf *
   unzip ~/site.zip
   rm ~/site.zip
   ```

---

## Step 4: Test (2 minutes)

1. **Visit**: https://inext.iitp.ac.in
2. **Login**: https://inext.iitp.ac.in/login
   - Email: arijitroy@iitp.ac.in
   - Password: changeme123
3. **Test**: Add a news item, verify it appears

---

## ✅ Done!

Your site is live at **https://inext.iitp.ac.in**

### Important Next Steps:

1. **Change admin password** in Railway dashboard
2. **Test all pages** work correctly
3. **Monitor** Railway dashboard for any errors

---

## Need Help?

- **Full guide**: See [RAILWAY-DEPLOYMENT-GUIDE.md](./RAILWAY-DEPLOYMENT-GUIDE.md)
- **Railway docs**: https://docs.railway.app
- **Check API logs**: Railway Dashboard → Deployments → View Logs

---

**Total Time**: ~15 minutes  
**Cost**: Free (first month with $5 credit)  
**Performance**: Excellent (no spin-down!)
