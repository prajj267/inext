# 🚀 Deploy i-NEXT Frontend to IIT Patna Server

## ✅ Build Status
- **Build completed**: Success ✓
- **API URL**: `https://inext-production.up.railway.app` ✓
- **Output folder**: `C:\Projects\website iit\inext-website\out\` ✓
- **Files ready**: 307 files (55.22 MB) ✓

---

## 📤 Deployment Methods

### Method 1: Using WinSCP (Recommended - Easy GUI)

1. **Download WinSCP**: https://winscp.net/eng/download.php

2. **Connect to IIT Patna Server**:
   - Protocol: SFTP
   - Host: Your IIT server hostname (e.g., `inext.iitp.ac.in` or server IP)
   - Username: Your SSH username
   - Password: Your SSH password

3. **Upload Files**:
   - Navigate to `/home/yourusername/public_html/` on the server
   - **BACKUP first**: Rename existing files to `backup_old/`
   - Drag the entire contents of `C:\Projects\website iit\inext-website\out\` folder
   - Upload to `public_html/`

4. **Verify**:
   - Open https://inext.iitp.ac.in in browser
   - Should now show data from Railway API!

---

### Method 2: Using SCP Command (If you have Git Bash or WSL)

```bash
# From Git Bash or WSL
cd "C:\Projects\website iit\inext-website"

# Upload all files (replace with your actual server details)
scp -r out/* username@servername:~/public_html/

# Example:
# scp -r out/* arijitroy@inext.iitp.ac.in:~/public_html/
```

---

### Method 3: Using FileZilla (Alternative GUI)

1. **Download FileZilla**: https://filezilla-project.org/

2. **Connect**:
   - Host: `sftp://your-server-hostname`
   - Username: Your SSH username
   - Password: Your SSH password
   - Port: 22

3. **Upload**:
   - Left pane: Navigate to `C:\Projects\website iit\inext-website\out\`
   - Right pane: Navigate to `/home/yourusername/public_html/`
   - Select all files in `out/` folder
   - Right-click → Upload

---

## 🔍 After Deployment - Verify

1. **Open**: https://inext.iitp.ac.in/members/
2. **Press F12** → Network tab
3. **Refresh page**
4. **Check**: Should see successful requests to `https://inext-production.up.railway.app/api/members`
5. **Verify**: Page shows **41 members** with photos and details

---

## ⚠️ Important Notes

### Before Uploading:
- **BACKUP existing files** on the server first!
- You can download them or just rename the folder

### File Permissions:
If files don't display after upload, run on server:
```bash
chmod -R 755 ~/public_html
chmod -R 644 ~/public_html/**/*.html
chmod -R 644 ~/public_html/**/*.css
chmod -R 644 ~/public_html/**/*.js
```

### .htaccess (if needed):
If URLs don't work, create `.htaccess` in `public_html/`:
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /$1/ [L,R=301]
```

---

## 🎯 Deployment Checklist

- [ ] Backup existing site on server
- [ ] Upload `out/` contents to `~/public_html/`
- [ ] Verify file permissions (755 for folders, 644 for files)
- [ ] Test https://inext.iitp.ac.in in browser
- [ ] Check Network tab shows Railway API calls
- [ ] Verify data loads (members, publications, news, etc.)
- [ ] Test on mobile device
- [ ] Check all pages: /, /members/, /publications/, /projects/, /news/, /achievements/, /contact/

---

## 🔧 Troubleshooting

### Problem: Pages show "Loading..." forever
**Solution**: Check browser console (F12). If you see CORS errors, the API needs to allow `inext.iitp.ac.in` origin.

### Problem: 404 errors on page refresh
**Solution**: Add `.htaccess` file (see above) or configure Apache for SPA routing.

### Problem: Images don't load
**Solution**: Check file paths and permissions. Images should be in `public_html/images/` with 644 permissions.

### Problem: Styles not loading
**Solution**: Clear browser cache (Ctrl+Shift+R) and verify CSS files uploaded correctly.

---

## 📊 Current Status Summary

**Backend (Railway API):**
- ✅ Live: https://inext-production.up.railway.app
- ✅ Database: Connected (Neon PostgreSQL)
- ✅ Data: Seeded (41 members, 55 publications, 4 projects, 8 news, 6 achievements)
- ✅ All endpoints working

**Frontend (Static Build):**
- ✅ Built with correct API URL
- ✅ 307 files ready in `out/` folder
- ⏳ Needs deployment to IIT server

**Once Deployed:**
- Website will pull live data from Railway API
- Admin can login at https://inext.iitp.ac.in/login/
- Real-time updates via API (no rebuild needed for content changes)

---

## 🎉 You're Almost Done!

Just upload the `out/` folder contents and your site will be live with all the data!

Need help? Check the troubleshooting section or verify each step of the deployment checklist.
