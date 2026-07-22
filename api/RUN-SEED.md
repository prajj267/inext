# Run Database Seed to Add PDF Links

The PDF links have been added to the seed file. Now we need to run the seed to update the database.

## **Option 1: Via Railway Dashboard (Easiest)**

1. Go to https://railway.app
2. Open your project → `api` service
3. Click on the **"Deployments"** tab
4. Wait for the latest deployment (commit 920f428: "feat: Add PDF links to all publications") to finish deploying
5. Once deployed, click on the **"..."** menu → **"Run Command"**
6. Enter: `npm run db:seed`
7. Click **"Run"**

Wait ~30 seconds for the seed to complete.

## **Option 2: Manually via Railway CLI (If installed)**

```bash
cd "C:\Projects\website iit\inext\api"
railway run npm run db:seed
```

## **Option 3: Connect to Neon directly and run seed locally**

1. Get your DATABASE_URL from Railway dashboard (Variables tab)
2. Create `.env` file in `C:\Projects\website iit\inext\api\` with:
   ```
   DATABASE_URL="your-neon-connection-string-here"
   ADMIN_PASSWORD="your-admin-password"
   ```
3. Run:
   ```bash
   cd "C:\Projects\website iit\inext\api"
   npm run db:seed
   ```

---

## **After Seed Completes**

Refresh your local test: http://192.173.0.64:8000/publications/

You should see **PDF buttons** next to each publication that has a link!

Then you can deploy to the IIT server.
