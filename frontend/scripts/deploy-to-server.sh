#!/bin/bash
# Deploy static Next.js export to IIT Patna server

set -e

echo "🏗️  Building static export..."
npm run build

echo "📦 Packaging build..."
cd out
tar -czf ../inext-static.tar.gz .
cd ..

echo "📤 Uploading to server..."
scp inext-static.tar.gz inext@172.16.1.251:~/

echo "🚀 Extracting on server..."
ssh inext@172.16.1.251 << 'ENDSSH'
cd ~/public_html
rm -rf *
tar -xzf ../inext-static.tar.gz
rm ../inext-static.tar.gz
echo "✅ Deployed to ~/public_html"
ENDSSH

rm inext-static.tar.gz

echo "✅ Deploy complete!"
echo "📍 Static site is now live at ~/public_html on the server"
echo "⚠️  Note: Admin pages will NOT work until you update NEXT_PUBLIC_API_URL"
echo "    in .env to point to your deployed Render API and rebuild."
