# GitHub Actions Deployment Setup

This guide explains how to set up automated deployment using GitHub Actions so that you and your collaborators can easily deploy the frontend.

## Overview

Two workflows are available:

1. **`deploy.yml`** - Automatically builds AND deploys to IIT server (requires SSH setup)
2. **`build-only.yml`** - Only builds the site, you download and deploy manually (easier setup)

## Quick Setup (Build Only - Recommended)

This is the easiest option and works from anywhere.

### 1. Push Code to GitHub

```bash
cd "C:\Projects\website iit\inext-website"
git add .
git commit -m "Add GitHub Actions workflows"
git push origin main
```

### 2. Add GitHub Secret

Go to your GitHub repository:
- Settings → Secrets and variables → Actions → New repository secret
- Name: `NEXT_PUBLIC_API_URL`
- Value: `https://inext-production.up.railway.app`

### 3. Trigger Build

**Option A: Automatic** - Push to `main` branch triggers deployment, push to `develop` triggers build-only

**Option B: Manual** - Go to Actions tab → Select workflow → Click "Run workflow"

### 4. Download and Deploy

After the workflow completes:
1. Go to the Actions tab in GitHub
2. Click on the completed workflow run
3. Download the `inext-frontend-deploy` artifact
4. Extract the ZIP file
5. Upload to IIT server using WinSCP or SCP commands

## Advanced Setup (Auto-Deploy)

This automatically deploys to the IIT server after building. Requires SSH key setup.

### 1. Generate SSH Key Pair

On your local machine:

```bash
ssh-keygen -t ed25519 -C "github-actions-deploy" -f github_deploy_key
```

This creates two files:
- `github_deploy_key` (private key - keep secret!)
- `github_deploy_key.pub` (public key)

### 2. Add Public Key to IIT Server

```bash
# Copy public key content
cat github_deploy_key.pub

# SSH to server and add it
ssh inext@172.16.1.251
mkdir -p ~/.ssh
echo "YOUR_PUBLIC_KEY_CONTENT" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
exit
```

### 3. Add Secrets to GitHub

Go to: Repository → Settings → Secrets and variables → Actions

Add these secrets:

| Secret Name | Value |
|------------|-------|
| `NEXT_PUBLIC_API_URL` | `https://inext-production.up.railway.app` |
| `SSH_PRIVATE_KEY` | *Content of `github_deploy_key` file* |
| `SSH_HOST` | `172.16.1.251` |
| `SSH_USER` | `inext` |

⚠️ **Important**: Copy the ENTIRE private key including the `-----BEGIN...` and `-----END...` lines.

### 4. Test Deployment

Push to `main` branch or manually trigger the workflow from the Actions tab.

## Workflow Triggers

### deploy.yml (Auto-deploy)
- ✅ Push to `main` branch
- ✅ Manual trigger from Actions tab

### build-only.yml (Manual deploy)
- ✅ Push to `develop` branch
- ✅ Manual trigger from Actions tab

## For Your Friend/Collaborators

### Option 1: Using Build-Only Workflow (Easiest)

1. **Make changes** to the code
2. **Commit and push** to GitHub:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```
3. **Go to GitHub** → Actions tab
4. **Wait for build** to complete (5-10 minutes)
5. **Download** the artifact ZIP
6. **Deploy** using WinSCP or SCP:
   ```bash
   scp inext-frontend-deploy.zip inext@172.16.1.251:~/
   ssh inext@172.16.1.251
   cd ~/public_html && rm -rf * && unzip ~/inext-frontend-deploy.zip
   find . -type d -exec chmod 755 {} \;
   find . -type f -exec chmod 644 {} \;
   chmod -R 755 _next/
   rm ~/inext-frontend-deploy.zip
   ```

### Option 2: Using Auto-Deploy (If SSH Keys Are Set Up)

1. **Make changes** to the code
2. **Commit and push** to `main` branch:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin main
   ```
3. **Done!** The site deploys automatically in 5-10 minutes
4. Check the Actions tab to see deployment progress

## Network Considerations

**Important**: The IIT server (`172.16.1.251`) is on a private network. Auto-deploy will ONLY work if:

1. The server is accessible from the internet (has a public IP or NAT setup), OR
2. You set up a GitHub self-hosted runner on the IIT network

If neither is possible, use the **build-only** workflow and deploy manually from campus.

## Troubleshooting

### Build fails
- Check that `NEXT_PUBLIC_API_URL` secret is set correctly
- Check the Actions logs for specific error messages

### Auto-deploy fails with "Connection refused"
- The IIT server might not be accessible from GitHub's servers
- Use build-only workflow instead and deploy manually from campus

### Permission denied (publickey)
- Check that the SSH private key is copied correctly (including BEGIN/END lines)
- Verify the public key is in `~/.ssh/authorized_keys` on the server
- Make sure `SSH_HOST` and `SSH_USER` secrets are correct

### Artifact not available
- Artifacts expire after 30 days (build-only) or 7 days (deploy)
- Re-run the workflow to generate a fresh build

## Manual Build Commands (Local)

If you want to build locally instead:

```bash
cd "C:\Projects\website iit\inext-website"
npm install
npm run build

# Create ZIP
cd out
tar -czf ../inext-frontend-deploy.zip .
cd ..

# Or use PowerShell
Compress-Archive -Path "out\*" -DestinationPath "inext-frontend-deploy.zip" -Force
```

## Repository Structure

```
.github/
  workflows/
    deploy.yml          # Auto-build and deploy
    build-only.yml      # Build only, manual deploy
DEPLOY-INSTRUCTIONS.md  # Manual deployment guide
GITHUB-DEPLOYMENT-SETUP.md  # This file
```

## Best Practices

1. **Use branches**: 
   - `main` for production deployments
   - `develop` for testing builds
   - Feature branches for development

2. **Pull before push**:
   ```bash
   git pull origin main
   # Make changes
   git push origin main
   ```

3. **Review changes**: Check the Actions tab after pushing to ensure build succeeds

4. **Test locally first**: Use `npm run build` locally before pushing major changes

## Questions?

- Check the Actions tab for build logs
- Review error messages in the workflow run
- Ensure you're connected to IIT network for manual deployments
