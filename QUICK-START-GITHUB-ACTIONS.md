# Quick Start: GitHub Actions Deployment

Your code is now on GitHub with automated workflows! Here's how to enable them:

## Step 1: Add GitHub Secret (Required)

1. Go to: https://github.com/prajj267/inext/settings/secrets/actions
2. Click **"New repository secret"**
3. Add this secret:
   - **Name**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://inext-production.up.railway.app`
4. Click **"Add secret"**

## Step 2: Test the Workflow

### Option A: Manual Trigger (Recommended for First Test)

1. Go to: https://github.com/prajj267/inext/actions
2. Click on **"Build Frontend (Manual Deploy)"** workflow
3. Click **"Run workflow"** button
4. Select branch: `master`
5. Click green **"Run workflow"** button
6. Wait 5-10 minutes for build to complete

### Option B: Automatic (Push Code)

Just push any code change to trigger the build:
```bash
cd "C:\Projects\website iit\inext-website"
git add .
git commit -m "Your changes"
git push
```

## Step 3: Download and Deploy

After the workflow completes:

1. Go to the workflow run page
2. Scroll down to **"Artifacts"** section
3. Download **"inext-frontend-deploy"** ZIP file
4. Extract the ZIP
5. Use WinSCP or SCP to upload to IIT server:

### Using SCP (from campus network):
```bash
scp inext-frontend-deploy.zip inext@172.16.1.251:~/
ssh inext@172.16.1.251
cd ~/public_html
rm -rf *
unzip ~/inext-frontend-deploy.zip
find . -type d -exec chmod 755 {} \;
find . -type f -exec chmod 644 {} \;
chmod -R 755 _next/
rm ~/inext-frontend-deploy.zip
```

## For Your Friend/Collaborators

Share these instructions:

### Make Changes and Deploy

1. **Clone the repository** (first time only):
   ```bash
   git clone https://github.com/prajj267/inext.git
   cd inext/inext-website
   npm install
   ```

2. **Make your changes** to the code

3. **Commit and push**:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```

4. **Wait for build** (5-10 minutes)
   - Check progress at: https://github.com/prajj267/inext/actions

5. **Download artifact**:
   - Go to completed workflow run
   - Download "inext-frontend-deploy" ZIP from Artifacts section

6. **Deploy to IIT server** (need to be on campus network or VPN):
   - Use WinSCP GUI, OR
   - Use SCP commands above

## Repository Structure

- **Branch**: `master` (main production branch)
- **Workflows**: `.github/workflows/`
  - `build-only.yml` - Builds on push to master
  - `deploy.yml` - Auto-deploy (requires SSH setup)

## Auto-Deploy Setup (Optional)

If you want automatic deployment without downloading, see the full guide:
- Read: `GITHUB-DEPLOYMENT-SETUP.md`
- Requires: SSH key setup on IIT server
- Note: May not work if server is on private network

## Troubleshooting

### Build Fails
- Make sure `NEXT_PUBLIC_API_URL` secret is set correctly
- Check the Actions logs for error details

### Can't Access IIT Server
- You need to be on IIT Patna campus network
- Or use VPN if available
- The server `172.16.1.251` is on a private network

### Artifact Expired
- Artifacts expire after 30 days
- Just re-run the workflow to generate a fresh build

## Need Help?

- View workflow runs: https://github.com/prajj267/inext/actions
- Read full documentation: `GITHUB-DEPLOYMENT-SETUP.md`
- Check build logs for errors in the Actions tab
