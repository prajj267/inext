# iNEXT Website Deployment Guide

## ✅ Changes in This Build

1. **All "i-NEXT" → "iNEXT"** across the site
2. **Removed phone number** from hero, contact page, and PI profile
3. **Larger hero slideshow** images (420×280 → 480×320)
4. **Deleted batch 2021-2025 students** (6 students removed)
5. **Updated "About the Lab" text** with new mission statement
6. **Hero slideshow management** via admin dashboard

## 📦 Deployment Package

- **File**: `inext-frontend-deploy.zip`
- **Size**: 25.29 MB
- **Location**: `C:\Projects\website iit\inext-website\inext-frontend-deploy.zip`
- **Pages**: 85 static pages

---

## 🚀 Deployment Steps

### Option 1: Using WinSCP (Recommended for Windows)

1. **Open WinSCP** and create new session:
   - **Host**: `172.16.1.251`
   - **User**: `inext`
   - **Password**: (your SSH password)
   - **Port**: 22

2. **Upload the ZIP**:
   - Navigate to home directory on server
   - Upload `inext-frontend-deploy.zip`

3. **Connect via PuTTY** and run:
   ```bash
   cd ~/public_html
   rm -rf *
   unzip ~/inext-frontend-deploy.zip
   find . -type d -exec chmod 755 {} \;
   find . -type f -exec chmod 644 {} \;
   chmod -R 755 _next/
   rm ~/inext-frontend-deploy.zip
   ```

### Option 2: Using Command Line (SCP)

Open PowerShell or Command Prompt:

```powershell
# 1. Upload ZIP to server
scp "C:\Projects\website iit\inext-website\inext-frontend-deploy.zip" inext@172.16.1.251:~/

# 2. SSH into server and deploy
ssh inext@172.16.1.251
```

Then on the server:

```bash
cd ~/public_html
rm -rf *
unzip ~/inext-frontend-deploy.zip
find . -type d -exec chmod 755 {} \;
find . -type f -exec chmod 644 {} \;
chmod -R 755 _next/
rm ~/inext-frontend-deploy.zip
exit
```

---

## ⚙️ Post-Deployment Tasks

### 1. Test the Website
Visit: **https://inext.iitp.ac.in**

Check:
- ✅ Homepage shows "iNEXT Research Lab" (not "i-NEXT")
- ✅ Hero slideshow is larger
- ✅ No phone number visible
- ✅ About section has new text
- ✅ Members page shows 36 students (batch 2021 removed)
- ✅ Admin login works at `/login`

### 2. Test Admin Features
Login at: **https://inext.iitp.ac.in/login**
- Email: `arijitroy@iitp.ac.in`
- Password: `abhi@12A`

Test:
- ✅ Photo upload for members works
- ✅ Hero slideshow management at `/admin/slides`
- ✅ All edit pages load correctly

### 3. Set Project Order (IMPORTANT)

The Railway API should have finished deploying by now. Run this command:

```bash
cd "C:\Projects\website iit\inext\api"
node set-project-order.mjs
```

This will set:
- **SportMitra** → order 0 (appears first)
- **Air-Ground Data Acquisition** → order 1 (appears second)  
- Other projects → order 2-5

Then rebuild and redeploy the frontend to show projects in correct order.

---

## 🔄 If You Need to Rebuild

If project order or other API data changes:

```bash
cd "C:\Projects\website iit\inext-website"
npm run build
```

Then create new ZIP and redeploy.

---

## 📝 Notes

- **API URL**: `https://inext-production.up.railway.app`
- **Database**: Neon PostgreSQL (already updated)
- **Server**: IIT Patna (172.16.1.251)
- **Domain**: https://inext.iitp.ac.in

## 🆘 Troubleshooting

### Site not loading?
Check Apache is running and configured for `public_html`

### Images not showing?
Check file permissions: `chmod -R 755 _next/`

### Admin not working?
Verify Railway API is accessible: https://inext-production.up.railway.app/api/members

### Projects in wrong order?
Run `set-project-order.mjs` script, then rebuild frontend

---

## ✨ What's New for Users

Users can now:
1. **Manage hero slideshow** - Add/edit/delete slideshow images via admin dashboard
2. **Upload photos directly** - No need for SSH access, photos stored in database
3. **Better project ordering** - Important projects appear first
4. **Cleaner contact info** - Removed phone number, kept email addresses

---

**Deployment ready! Follow the steps above to deploy to https://inext.iitp.ac.in**
