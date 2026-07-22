# Quick Guide: Add PDF Links to Database

## **What We Did:**
✅ Added all 59 PDF links to the seed file  
✅ Pushed to GitHub (commit 920f428)  
✅ Railway is auto-deploying now

---

## **Next Step: Run the Seed**

### **Method 1: Railway Dashboard (RECOMMENDED)**

1. Open https://railway.app in your browser
2. Login and go to your project
3. Click on the **`api`** service
4. Go to the **Settings** tab
5. Scroll down to **"Service"** section
6. Click **"Deploy"** → **"Redeploy"**

Once deployed (~2-3 minutes), Railway will automatically run migrations but NOT the seed by default.

To run the seed:
1. Go to the **Deployments** tab
2. Click on the latest deployment
3. Click the **three dots (...)** menu
4. Select **"New Template"**
5. Or, use the **"Run a Command"** feature if available

**OR manually SSH into Railway (if Railway CLI is installed later):**
```bash
railway run npm run db:seed
```

---

### **Method 2: Run Locally (Pointing to Railway Database)**

This is the FASTEST way right now:

1. Get your `DATABASE_URL` from Railway:
   - Go to Railway → api service → **Variables** tab
   - Copy the `DATABASE_URL` value

2. Create `.env` file in `C:\Projects\website iit\inext\api\`:
   ```
   DATABASE_URL="postgresql://your-connection-string-here"
   ADMIN_PASSWORD="your-password"
   ```

3. Run the seed:
   ```powershell
   cd "C:\Projects\website iit\inext\api"
   npm run db:seed
   ```

---

## **After Seed Completes:**

1. **Refresh your local test:**
   - http://192.173.0.64:8000/publications/
   - You should see **PDF** buttons!

2. **Deploy to IIT Server:**
   ```powershell
   cd "C:\Projects\website iit\inext-website"
   .\deploy.ps1
   ```

---

## **Troubleshooting:**

**If PDF buttons don't show:**
- Check browser console (F12) for errors
- Verify the API response has `pdfPath` fields:
  ```
  https://inext-production.up.railway.app/api/publications
  ```
- Clear browser cache and refresh
