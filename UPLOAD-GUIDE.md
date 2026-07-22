# 🚀 Quick Upload Guide - WinSCP Method

## Step 1: Download WinSCP (if not installed)
1. Go to: https://winscp.net/eng/download.php
2. Download and install WinSCP
3. Open WinSCP

## Step 2: Connect to IIT Server
1. Click **"New Session"**
2. Fill in:
   - **File protocol**: SFTP
   - **Host name**: `inext.iitp.ac.in` (or your server IP)
   - **Port number**: 22
   - **User name**: [Your SSH username]
   - **Password**: [Your SSH password]
3. Click **"Login"**
4. If prompted about host key, click **"Yes"**

## Step 3: Backup Existing Site (Important!)
1. On the right side (server), navigate to: `/home/yourusername/public_html/`
2. Select all files/folders
3. Right-click → **Rename** → Change to `backup_old`
4. Create a new empty `public_html` folder (or it might already exist)

## Step 4: Upload New Files
1. On the **left side** (your computer), navigate to:
   ```
   C:\Projects\website iit\inext-website\out\
   ```
2. Select **ALL files and folders** inside the `out` directory
3. Drag them to the **right side** (server) into `public_html/`
4. Wait for upload to complete (307 files, ~55MB, takes 2-5 minutes)

## Step 5: Set Permissions (if needed)
If files don't display after upload:
1. In WinSCP, select all uploaded files on server
2. Right-click → **Properties**
3. Set permissions:
   - **Folders**: 0755 (rwxr-xr-x)
   - **Files**: 0644 (rw-r--r--)
4. Check **"Set recursively"**
5. Click **OK**

## Step 6: Test Website
1. Open browser: `https://inext.iitp.ac.in`
2. Should load homepage
3. Go to: `https://inext.iitp.ac.in/members/`
4. Press **F12** → **Network** tab
5. Refresh page
6. Should see data loading from Railway API!

---

## 🎯 Visual Guide

```
Your Computer                       IIT Server
─────────────────                   ─────────────────
C:\Projects\                        /home/username/
  website iit\                        public_html/
    inext-website\
      out\                              👈 Upload here!
        ├── index.html              →   ├── index.html
        ├── members/                →   ├── members/
        ├── publications/           →   ├── publications/
        ├── _next/                  →   ├── _next/
        ├── images/                 →   ├── images/
        └── ...                     →   └── ...
```

---

## ⚠️ Troubleshooting

**Problem**: Can't connect to server
- Check username/password
- Make sure you're on correct network (VPN if needed)
- Try with IP address instead of hostname

**Problem**: Permission denied
- Ask server admin for write permissions to `public_html/`
- Make sure you're uploading to the correct directory

**Problem**: Files uploaded but site shows old content
- Clear browser cache (Ctrl+Shift+R)
- Check if files actually uploaded (refresh right side in WinSCP)
- Verify you're in the correct directory on server

---

## 📞 Need Server Details?

If you don't know your server credentials, contact:
- Your IIT Patna server administrator
- Or check your server access documentation
- Or check previous deployment scripts/configs

Common IIT server paths:
- `~/public_html/` (most common)
- `/var/www/html/`
- `/home/username/www/`
- `/var/www/inext/`
