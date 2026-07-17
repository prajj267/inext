# Deployment Checklist — i-NEXT Website

**Follow this checklist to deploy your complete website**

---

## Phase 1: Deploy API to Railway ⚙️

### Railway Setup (10 minutes)

- [ ] **Sign up** at https://railway.app
- [ ] **Login** with GitHub
- [ ] **Create new project** → Deploy from GitHub
- [ ] **Select** repository: `prajj267/inext`

### Configure Railway

- [ ] **Set root directory** to `api` (in Settings)
- [ ] **Add environment variables** (in Variables tab):
  - [ ] `DATABASE_URL` (Neon PostgreSQL string)
  - [ ] `JWT_SECRET` (generate: `openssl rand -base64 32`)
  - [ ] `ADMIN_EMAIL` = `arijitroy@iitp.ac.in`
  - [ ] `ADMIN_PASSWORD` = `changeme123`
  - [ ] `FRONTEND_URL` = `https://inext.iitp.ac.in`
  - [ ] `NODE_ENV` = `production`

### Verify API Deployment

- [ ] **Wait** for deployment to complete (~3 minutes)
- [ ] **Generate domain** (Settings → Networking)
- [ ] **Copy** your Railway URL (e.g., `inext-api-xyz.up.railway.app`)
- [ ] **Test** by visiting: `https://YOUR_URL.railway.app/health`
- [ ] **Should see**: `{"status":"ok","timestamp":"..."}`

**✅ API is live!** Continue to Phase 2.

---

## Phase 2: Build Frontend 🏗️

### Update Configuration (2 minutes)

- [ ] **Open**: `C:\Projects\website iit\inext-website\.env`
- [ ] **Update** `NEXT_PUBLIC_API_URL` with your Railway URL:
  ```
  NEXT_PUBLIC_API_URL="https://YOUR_RAILWAY_URL.railway.app"
  ```
- [ ] **Save** the file

### Build Static Export (3 minutes)

- [ ] **Open** Command Prompt or PowerShell
- [ ] **Navigate** to frontend:
  ```powershell
  cd "C:\Projects\website iit\inext-website"
  ```
- [ ] **Install** dependencies (if needed):
  ```powershell
  npm install
  ```
- [ ] **Build** the site:
  ```powershell
  npm run build
  ```
- [ ] **Wait** for build to complete (~2-3 minutes)
- [ ] **Verify** `out/` folder was created:
  ```powershell
  dir out
  ```

**✅ Build complete!** Continue to Phase 3.

---

## Phase 3: Deploy to IIT Server 🚀

**Choose ONE deployment method:**

### Option A: Script Method (Easiest - Git Bash)

- [ ] **Open** Git Bash
- [ ] **Navigate** to project:
  ```bash
  cd "/c/Projects/website iit/inext-website"
  ```
- [ ] **Run** deploy script:
  ```bash
  bash scripts/deploy-to-server.sh
  ```
- [ ] **Wait** for script to complete
- [ ] **Script will**:
  - Build the site
  - Package files
  - Upload to server
  - Extract to `public_html`

**Skip to Phase 4 if this works!**

---

### Option B: SCP Method (Command Line)

#### Package the Build

**Windows PowerShell**:
```powershell
cd "C:\Projects\website iit\inext-website\out"
Compress-Archive -Path * -DestinationPath ..\inext-static.zip -Force
cd ..
```

**Git Bash / Mac / Linux**:
```bash
cd "C:/Projects/website iit/inext-website/out"
tar -czf ../inext-static.tar.gz *
cd ..
```

- [ ] **Package created**: `inext-static.zip` or `inext-static.tar.gz`

#### Upload to Server

- [ ] **Upload** via SCP:
  ```bash
  scp inext-static.tar.gz inext@172.16.1.251:~/
  # OR for .zip:
  scp inext-static.zip inext@172.16.1.251:~/
  ```
- [ ] **Enter** password when prompted
- [ ] **Wait** for upload (~2-5 minutes)

#### Extract on Server

- [ ] **SSH** into server:
  ```bash
  ssh inext@172.16.1.251
  ```

- [ ] **Run** these commands:
  ```bash
  cd ~/public_html
  mkdir -p ~/backups/$(date +%Y%m%d)
  mv * ~/backups/$(date +%Y%m%d)/ 2>/dev/null
  
  # For .tar.gz:
  tar -xzf ~/inext-static.tar.gz
  # For .zip:
  # unzip ~/inext-static.zip
  
  rm ~/inext-static.tar.gz
  ls -la
  ```

- [ ] **Verify** you see: `index.html`, `members.html`, etc.
- [ ] **Exit** SSH:
  ```bash
  exit
  ```

---

### Option C: WinSCP Method (Windows GUI)

- [ ] **Download** WinSCP from https://winscp.net
- [ ] **Install** WinSCP

#### Package

- [ ] **PowerShell**:
  ```powershell
  cd "C:\Projects\website iit\inext-website\out"
  Compress-Archive -Path * -DestinationPath ..\inext-static.zip -Force
  ```

#### Connect & Upload

- [ ] **Open** WinSCP
- [ ] **Enter** connection:
  - Host: `172.16.1.251`
  - User: `inext`
  - Password: (your SSH password)
- [ ] **Click** Login
- [ ] **Upload** `inext-static.zip` to home directory

#### Extract

- [ ] **Click** "Open Terminal" in WinSCP
- [ ] **Run**:
  ```bash
  cd ~/public_html
  mkdir -p ~/backups/$(date +%Y%m%d)
  mv * ~/backups/$(date +%Y%m%d)/ 2>/dev/null
  unzip ~/inext-static.zip
  rm ~/inext-static.zip
  ```
- [ ] **Verify** files extracted

**✅ Files deployed!** Continue to Phase 4.

---

## Phase 4: Testing 🧪

### Test Public Pages

Visit each page and verify it loads correctly:

- [ ] **Home**: https://inext.iitp.ac.in
- [ ] **Members**: https://inext.iitp.ac.in/members
- [ ] **Publications**: https://inext.iitp.ac.in/publications
- [ ] **Projects**: https://inext.iitp.ac.in/projects
- [ ] **News**: https://inext.iitp.ac.in/news
- [ ] **Achievements**: https://inext.iitp.ac.in/achievements
- [ ] **Contact**: https://inext.iitp.ac.in/contact
- [ ] **Students**: https://inext.iitp.ac.in/students
- [ ] **Interns**: https://inext.iitp.ac.in/interns

### Test Admin Dashboard

- [ ] **Visit**: https://inext.iitp.ac.in/login
- [ ] **Login** with:
  - Email: `arijitroy@iitp.ac.in`
  - Password: `changeme123` (or your Railway password)
- [ ] **Verify** admin dashboard loads

### Test CRUD Operations

- [ ] **Go to** News section
- [ ] **Click** "+ Add News"
- [ ] **Fill in** test data:
  - Date: Today's date
  - Tag: MISC
  - Body: "Test news item"
- [ ] **Click** Save
- [ ] **Verify** item appears in list
- [ ] **Open** https://inext.iitp.ac.in/news in incognito
- [ ] **Verify** test item appears on public site
- [ ] **Go back** to admin
- [ ] **Delete** test item
- [ ] **Verify** it's gone from public site

### Test Mobile View

- [ ] **Resize** browser to mobile width (or use phone)
- [ ] **Check** navigation menu works
- [ ] **Check** all pages are readable
- [ ] **Check** images load correctly

**✅ All tests passed!** Continue to Phase 5.

---

## Phase 5: Security & Cleanup 🔒

### Change Admin Password

- [ ] **Go to** Railway dashboard
- [ ] **Click** your project → Variables
- [ ] **Find** `ADMIN_PASSWORD`
- [ ] **Update** to a strong password
- [ ] **Wait** for Railway to redeploy (~2 minutes)
- [ ] **Test** login with new password

### Verify Security

- [ ] **Railway**:
  - [ ] Environment variables are set
  - [ ] JWT_SECRET is secure (not "secret" or "test")
  - [ ] FRONTEND_URL matches your domain
  
- [ ] **GitHub**:
  - [ ] `.env` files are in `.gitignore`
  - [ ] No credentials committed to repo
  
- [ ] **Server**:
  - [ ] Only `public_html` is publicly accessible
  - [ ] Backup directory (`~/backups`) is private

### Create Documentation

- [ ] **Document** your Railway URL
- [ ] **Save** admin credentials securely
- [ ] **Note** deployment date
- [ ] **Keep** database credentials safe

**✅ Security complete!** You're done!

---

## ✅ Final Verification

### Complete Checklist

- [ ] Railway API is deployed and responding
- [ ] Railway URL documented
- [ ] Frontend built successfully
- [ ] Frontend deployed to IIT server
- [ ] All public pages load
- [ ] Admin login works
- [ ] Can add/edit/delete content
- [ ] Changes appear on public site
- [ ] Mobile view works
- [ ] Images load correctly
- [ ] Admin password changed
- [ ] Credentials documented
- [ ] Old site backed up
- [ ] Team notified

---

## 🎉 Success!

**Your website is LIVE!**

- **Public Site**: https://inext.iitp.ac.in
- **Admin Dashboard**: https://inext.iitp.ac.in/login
- **API**: Your Railway domain
- **Database**: Neon PostgreSQL

---

## 📚 Next Steps

### Ongoing Content Management
- Use admin dashboard at https://inext.iitp.ac.in/login
- Add/edit/delete content as needed
- No redeployment required for content changes

### Code Updates
- Make changes in `inext-website/` or `inext-api/`
- Commit to GitHub
- Railway auto-deploys API changes
- Manually redeploy frontend (run build + upload)

### Monitoring
- Check Railway dashboard for API logs
- Monitor website uptime
- Review Apache logs on server (if needed)

---

## 📖 Helpful Guides

- **Railway Guide**: `RAILWAY-DEPLOYMENT-GUIDE.md`
- **Quick Start**: `QUICK-START-RAILWAY.md`
- **Server Deploy**: `DEPLOY-TO-IIT-SERVER.md`
- **Full Guide**: `COMPLETE-DEPLOYMENT-GUIDE.md`

---

## 📞 Support

| Issue | Resource |
|-------|----------|
| Railway problems | Railway dashboard → Logs |
| Server access | IT: aksharma@iitp.ac.in |
| Database issues | Neon console |
| Code questions | GitHub repo + docs |

---

**Total Deployment Time**: ~20-30 minutes  
**Status**: ✅ Complete  
**Deployed**: [Add date here]

**Congratulations! 🚀**
