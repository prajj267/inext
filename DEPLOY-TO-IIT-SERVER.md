# Deploy Frontend to IIT Patna Server

**Complete guide to deploy your Next.js static site to IIT Patna Apache server**

---

## Prerequisites

Before starting, make sure:
- ✅ API is deployed on Railway and you have the URL
- ✅ You have SSH access to `inext@172.16.1.251`
- ✅ Node.js is installed on your local machine
- ✅ You've cloned/have the project at `C:\Projects\website iit\inext-website`

---

## Part 1: Update Frontend Configuration

### Step 1.1: Update API URL

1. **Open** your Railway dashboard: https://railway.app/dashboard
2. **Click** on your `inext` project
3. **Go to** Settings → Networking
4. **Copy** your Railway domain (e.g., `inext-api-production-abc123.up.railway.app`)

5. **Open** the file: `C:\Projects\website iit\inext-website\.env`
6. **Update** the API URL:
   ```env
   NEXT_PUBLIC_API_URL="https://YOUR_RAILWAY_DOMAIN.railway.app"
   ```
   
   **Example**:
   ```env
   NEXT_PUBLIC_API_URL="https://inext-api-production-xyz789.up.railway.app"
   ```

7. **Save** the file

**✅ Checkpoint**: `.env` file updated with Railway URL

---

### Step 1.2: Verify Configuration

**Open**: `C:\Projects\website iit\inext-website\next.config.ts`

Make sure it has these settings:
```typescript
const nextConfig: NextConfig = {
  output: 'export',          // Static export
  images: { unoptimized: true },  // Required for static export
  trailingSlash: true,       // URLs end with /
};
```

**✅ Checkpoint**: Configuration verified

---

## Part 2: Build the Static Site

### Step 2.1: Install Dependencies (if needed)

**Open Command Prompt or PowerShell**:
```powershell
cd "C:\Projects\website iit\inext-website"
npm install
```

Wait for installation to complete (~2-3 minutes).

---

### Step 2.2: Build the Static Export

```powershell
npm run build
```

You'll see:
- ✓ Compiled successfully
- ✓ Collecting page data
- ✓ Generating static pages
- ✓ Finalizing page optimization

**Build time**: ~2-3 minutes

**✅ Checkpoint**: Build completed, `out/` folder created

---

### Step 2.3: Verify the Build Output

```powershell
# Check the out folder exists
dir out

# You should see:
# - index.html
# - members.html
# - publications.html
# - projects.html
# - news.html
# - achievements.html
# - contact.html
# - _next/ folder
# - images/ folder
```

**✅ Checkpoint**: All HTML files present in `out/` folder

---

## Part 3: Deploy to IIT Server

You have **3 options** for deployment. Choose the one that works best for you.

---

### Option A: Automated Script (Recommended - Git Bash/WSL)

**If you have Git Bash or WSL on Windows**:

1. **Open Git Bash**
2. **Navigate to project**:
   ```bash
   cd "/c/Projects/website iit/inext-website"
   ```

3. **Run deploy script**:
   ```bash
   bash scripts/deploy-to-server.sh
   ```

The script will:
- ✅ Build the site (npm run build)
- ✅ Package as .tar.gz
- ✅ Upload to server
- ✅ Extract to `~/public_html`
- ✅ Clean up

**Time**: ~5 minutes (including upload)

**✅ Done!** Skip to Part 4.

---

### Option B: Manual via SCP (Command Line)

**Step B.1: Package the Build**

**Windows PowerShell**:
```powershell
cd "C:\Projects\website iit\inext-website\out"
Compress-Archive -Path * -DestinationPath ..\inext-static.zip -Force
cd ..
```

**Git Bash / Linux / Mac**:
```bash
cd "C:/Projects/website iit/inext-website/out"
tar -czf ../inext-static.tar.gz *
cd ..
```

---

**Step B.2: Upload to Server**

```bash
# For .tar.gz:
scp inext-static.tar.gz inext@172.16.1.251:~/

# For .zip:
scp inext-static.zip inext@172.16.1.251:~/
```

**Enter your password** when prompted.

**Upload time**: 2-5 minutes (depending on connection speed)

---

**Step B.3: SSH and Extract**

```bash
# SSH into the server
ssh inext@172.16.1.251
```

**Once logged in, run**:

```bash
# Backup old content (optional but recommended)
cd ~/public_html
mkdir -p ~/backups/backup-$(date +%Y%m%d-%H%M%S)
mv * ~/backups/backup-$(date +%Y%m%d-%H%M%S)/ 2>/dev/null || true

# Extract new site
cd ~/public_html

# For .tar.gz:
tar -xzf ~/inext-static.tar.gz

# For .zip:
unzip ~/inext-static.zip

# Clean up the archive
rm ~/inext-static.tar.gz  # or rm ~/inext-static.zip

# Verify extraction
ls -la

# You should see index.html, members.html, etc.
```

**Exit SSH**:
```bash
exit
```

**✅ Done!** Continue to Part 4.

---

### Option C: WinSCP (Windows GUI Tool)

**Step C.1: Download WinSCP**
- Download from: https://winscp.net/eng/download.php
- Install the program

---

**Step C.2: Package the Build**

**PowerShell**:
```powershell
cd "C:\Projects\website iit\inext-website\out"
Compress-Archive -Path * -DestinationPath ..\inext-static.zip -Force
```

---

**Step C.3: Connect to Server**

1. **Open WinSCP**
2. **Enter connection details**:
   - **Host name**: `172.16.1.251`
   - **User name**: `inext`
   - **Password**: (your SSH password)
   - **Port**: `22`
3. **Click**: "Login"

---

**Step C.4: Upload Files**

1. **Navigate** to `/home/inext/` on the server (right panel)
2. **Navigate** to `C:\Projects\website iit\inext-website\` on your PC (left panel)
3. **Upload** `inext-static.zip` to the server
4. **Wait** for upload to complete

---

**Step C.5: Extract via Terminal**

1. **In WinSCP**, click **"Open Terminal"** (or press Ctrl+T)
2. **Run these commands**:
   ```bash
   cd ~/public_html
   mkdir -p ~/backups/backup-$(date +%Y%m%d)
   mv * ~/backups/backup-$(date +%Y%m%d)/ 2>/dev/null
   unzip ~/inext-static.zip
   rm ~/inext-static.zip
   ls -la
   ```

3. **Verify** you see index.html, members.html, etc.

**✅ Done!** Continue to Part 4.

---

## Part 4: Verify Deployment

### Step 4.1: Check Server Files

**SSH into server**:
```bash
ssh inext@172.16.1.251
cd ~/public_html
ls -la
```

**You should see**:
```
index.html
members.html
publications.html
projects.html
news.html
achievements.html
contact.html
students.html
interns.html
login.html
_next/
images/
favicon.ico
...
```

**Exit**:
```bash
exit
```

**✅ Checkpoint**: All files present on server

---

### Step 4.2: Test the Live Site

**Open these URLs in your browser**:

1. **Home**: https://inext.iitp.ac.in
   - Should show lab name, PI info, slideshow
   
2. **Members**: https://inext.iitp.ac.in/members
   - Should show team members with photos
   
3. **Publications**: https://inext.iitp.ac.in/publications
   - Should show publications grouped by year
   
4. **Projects**: https://inext.iitp.ac.in/projects
   - Should show funded and consultancy projects
   
5. **News**: https://inext.iitp.ac.in/news
   - Should show news items
   
6. **Achievements**: https://inext.iitp.ac.in/achievements
   - Should show achievements by category
   
7. **Contact**: https://inext.iitp.ac.in/contact
   - Should show contact info and map

**✅ Checkpoint**: All pages load correctly

---

### Step 4.3: Test Admin Dashboard

1. **Go to**: https://inext.iitp.ac.in/login

2. **Login with**:
   - Email: `arijitroy@iitp.ac.in`
   - Password: `changeme123` (or what you set in Railway)

3. **You should see**: Admin dashboard with links to manage content

4. **Test adding content**:
   - Click **News** → **+ Add News**
   - Fill in:
     - Date: `2026-07-17`
     - Tag: `MISC`
     - Body: `Test news item from admin`
   - Click **Save**

5. **Verify on public site**:
   - Open https://inext.iitp.ac.in/news in a new incognito window
   - Your test news item should appear

6. **Clean up**:
   - Go back to admin → News
   - Delete the test item

**✅ Checkpoint**: Admin dashboard works!

---

### Step 4.4: Test Mobile View

**On your phone or resize browser**:
1. Visit https://inext.iitp.ac.in
2. Check navigation menu (hamburger icon)
3. Check all pages are readable
4. Check images load

**✅ Checkpoint**: Mobile view works

---

## Part 5: Troubleshooting

### Problem: Site shows "404 Not Found"

**Cause**: Files not in the correct directory

**Solution**:
```bash
ssh inext@172.16.1.251
ls ~/public_html
# Should show index.html and other files
# If empty, re-extract the archive
```

---

### Problem: Pages load but show old content

**Cause**: Browser cache

**Solution**:
- Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
- Or open in incognito/private mode

---

### Problem: Admin login fails with "Network Error"

**Causes & Solutions**:

1. **API URL wrong in `.env`**:
   - Check `NEXT_PUBLIC_API_URL` in `.env`
   - Should match your Railway domain exactly
   - Rebuild: `npm run build`
   - Redeploy

2. **Railway API not running**:
   - Check Railway dashboard
   - Go to your project → Deployments
   - Should show "Active" status
   - Check logs for errors

3. **CORS issue**:
   - In Railway dashboard → Variables
   - Check `FRONTEND_URL` = `https://inext.iitp.ac.in` (no trailing slash)
   - Redeploy if changed

---

### Problem: Images not loading

**Cause**: Image paths incorrect

**Solution**:
```bash
ssh inext@172.16.1.251
ls ~/public_html/images
# Should show folders: members/, gallery/, slide/
```

If missing:
- Rebuild locally: `npm run build`
- Check `out/images` folder exists
- Redeploy

---

### Problem: Styles look broken

**Cause**: `_next/` folder missing or incomplete

**Solution**:
```bash
ssh inext@172.16.1.251
ls ~/public_html/_next
# Should show static/ folder with CSS and JS
```

If missing:
- Clean build: `rm -rf .next out`
- Rebuild: `npm run build`
- Redeploy

---

### Problem: Can't SSH to server

**Symptoms**:
- "Connection refused"
- "Permission denied"
- Timeout

**Solutions**:

1. **Check you're on campus network or VPN**
   - Server `172.16.1.251` is internal
   - Must be on IIT network

2. **Verify credentials**:
   ```bash
   ssh -v inext@172.16.1.251
   ```
   Check the verbose output for errors

3. **Contact IT**:
   - Email: `aksharma@iitp.ac.in`
   - Subject: "SSH access issue for inext@172.16.1.251"

---

## Part 6: Ongoing Maintenance

### How to Update Content

**All content updates go through the admin dashboard**:
1. Go to https://inext.iitp.ac.in/login
2. Login
3. Navigate to the section (News, Members, etc.)
4. Add/Edit/Delete items
5. Changes appear immediately (no rebuild needed)

**No code changes or redeployment needed for content!**

---

### How to Update Code

**If you make code changes** (styling, layout, new features):

1. **Make changes** in `inext-website/` folder
2. **Test locally**:
   ```bash
   npm run dev
   # Visit http://localhost:3000
   ```
3. **Build**:
   ```bash
   npm run build
   ```
4. **Deploy** using Option A, B, or C above

---

### How to Update API

**If you need to update the API code**:

1. **Make changes** in `inext-api/` folder
2. **Commit and push** to GitHub:
   ```bash
   cd "C:\Projects\website iit\inext"
   git add .
   git commit -m "Update API"
   git push
   ```
3. **Railway auto-deploys** (takes ~2-3 minutes)
4. **Check Railway dashboard** → Deployments to verify

---

## Part 7: Quick Reference

### Rebuild and Redeploy (Full Process)

```bash
# 1. Update .env if needed
# Edit C:\Projects\website iit\inext-website\.env

# 2. Build
cd "C:\Projects\website iit\inext-website"
npm run build

# 3. Deploy (choose one method):

# Method A - Script (Git Bash):
bash scripts/deploy-to-server.sh

# Method B - SCP:
cd out
tar -czf ../site.tar.gz *
cd ..
scp site.tar.gz inext@172.16.1.251:~/
ssh inext@172.16.1.251 "cd ~/public_html && rm -rf * && tar -xzf ~/site.tar.gz && rm ~/site.tar.gz"

# Method C - WinSCP:
# Use GUI as described in Option C
```

---

### Essential Commands

```bash
# SSH to server
ssh inext@172.16.1.251

# Check files on server
ssh inext@172.16.1.251 'ls -la ~/public_html'

# View last 20 lines of Apache error log
ssh inext@172.16.1.251 'tail -20 /var/log/apache2/error.log'

# Check disk space
ssh inext@172.16.1.251 'df -h'

# Create backup before deploying
ssh inext@172.16.1.251 'cd ~/public_html && tar -czf ~/backups/backup-$(date +%Y%m%d).tar.gz *'
```

---

### File Paths

| Location | Path |
|----------|------|
| **Local project** | `C:\Projects\website iit\inext-website` |
| **Build output** | `C:\Projects\website iit\inext-website\out` |
| **Server home** | `/home/inext` |
| **Server public_html** | `/home/inext/public_html` |
| **Server backups** | `/home/inext/backups` |
| **Apache config** | `/etc/apache2/sites-available/` |
| **Apache logs** | `/var/log/apache2/` |

---

## Part 8: Apache Configuration (Reference)

Your site should already be configured by IT, but for reference:

**Virtual Host Configuration** (`/etc/apache2/sites-available/inext.conf`):
```apache
<VirtualHost *:80>
    ServerName inext.iitp.ac.in
    DocumentRoot /home/inext/public_html
    
    <Directory /home/inext/public_html>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    
    ErrorLog ${APACHE_LOG_DIR}/inext-error.log
    CustomLog ${APACHE_LOG_DIR}/inext-access.log combined
</VirtualHost>
```

**HTTPS (if configured)**:
```apache
<VirtualHost *:443>
    ServerName inext.iitp.ac.in
    DocumentRoot /home/inext/public_html
    
    SSLEngine on
    SSLCertificateFile /path/to/cert.pem
    SSLCertificateKeyFile /path/to/key.pem
    
    <Directory /home/inext/public_html>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

**You don't need to modify these** — IT handles server configuration.

---

## ✅ Deployment Checklist

Before marking deployment as complete:

- [ ] Railway API is deployed and responding
- [ ] Frontend `.env` has correct Railway URL
- [ ] `npm run build` completed successfully
- [ ] `out/` folder contains all HTML files
- [ ] Files uploaded to server `~/public_html`
- [ ] https://inext.iitp.ac.in loads
- [ ] All 7+ pages load correctly
- [ ] Admin login works
- [ ] Can add/edit/delete content via admin
- [ ] Changes appear on public site
- [ ] Mobile view works
- [ ] Images load correctly
- [ ] Admin password changed from default
- [ ] Backup of old site created
- [ ] IT notified (if needed)

---

## 📞 Contact Information

| Issue | Contact |
|-------|---------|
| **Server access** | IT Help Desk: `aksharma@iitp.ac.in` |
| **Domain issues** | IT Help Desk |
| **Railway API** | Railway support: support@railway.app |
| **Database** | Neon: https://console.neon.tech |
| **Code issues** | Your development team |

---

## 🎯 Success Metrics

After deployment:
- ✅ Public site loads in <2 seconds
- ✅ Admin dashboard responsive
- ✅ Content updates appear immediately
- ✅ No 404 errors on any page
- ✅ All images load
- ✅ Mobile view works perfectly
- ✅ No console errors in browser

---

**Congratulations! Your site is now live! 🎉**

**Live URL**: https://inext.iitp.ac.in  
**Admin URL**: https://inext.iitp.ac.in/login  
**API URL**: Your Railway domain  

For ongoing updates, use the admin dashboard — no need to redeploy! 🚀
