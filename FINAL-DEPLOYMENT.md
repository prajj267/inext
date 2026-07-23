# iNEXT Website - Final Deployment Guide

## ✅ All Changes Included

1. **iNEXT branding** - All "i-NEXT" → "iNEXT"
2. **No phone number** - Removed from all pages
3. **Larger hero slideshow** - 480×320px (was 420×280px)
4. **Batch 2021 deleted** - 6 students removed
5. **Updated About text** - Added "Virtualization" 
6. **No publication counts** - Removed from publications page
7. **Karan Yadav first** - Always first in M.Tech section
8. **Current Scholars section** - PhD and Master's grouped together
9. **Lab social media links** - Instagram, Facebook, LinkedIn, Email added to About section
10. **Hero slideshow management** - Admin can manage via dashboard

---

## 📦 Deployment Package

- **File**: `inext-frontend-deploy.zip`
- **Size**: 27.04 MB
- **Location**: `C:\Projects\website iit\inext-website\inext-frontend-deploy.zip`
- **Pages**: 88 static pages

---

## 🚀 Deploy to IIT Server

### Step 1: Upload ZIP

```powershell
scp "C:\Projects\website iit\inext-website\inext-frontend-deploy.zip" inext@172.16.1.251:~/
```

### Step 2: Deploy

```powershell
ssh inext@172.16.1.251
```

Then run on server:

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

## ✅ Post-Deployment Checklist

Visit **https://inext.iitp.ac.in** and verify:

### Homepage
- [ ] Shows "iNEXT Research Lab" (not "i-NEXT")
- [ ] Hero slideshow is larger (480×320)
- [ ] No phone number in hero section
- [ ] About section includes "Virtualization"
- [ ] About section has social links (Instagram, Facebook, LinkedIn, Email)

### Members Page
- [ ] Faculty section present
- [ ] **Current Scholars** section with PhD and Master's subsections
- [ ] Karan Yadav appears first in Master's subsection
- [ ] Alumni section present
- [ ] Total 39 members shown

### Publications Page
- [ ] No count numbers in banner
- [ ] No count badges on "Journal Papers" / "Conference Papers" headings
- [ ] Shows simple text: "Journal and conference papers by lab members"

### Admin Features
- [ ] Login works at `/login` (arijitroy@iitp.ac.in / abhi@12A)
- [ ] Photo upload works for members
- [ ] Hero slideshow management at `/admin/slides`
- [ ] All edit pages load

---

## 📱 Lab Social Media (Now on Website)

- **Instagram**: https://www.instagram.com/inextiitpatna/
- **Facebook**: https://www.facebook.com/profile.php?id=61592004415909
- **LinkedIn**: https://www.linkedin.com/in/inext-lab-716157422/
- **Email**: inextiitpatna@gmail.com

---

## 🔄 Project Ordering (Optional)

If Railway API has finished deploying, set project order:

```bash
cd "C:\Projects\website iit\inext\api"
node set-project-order.mjs
```

This sets:
- **SportMitra** → position 1
- **Air-Ground Data Acquisition** → position 2
- Other projects → positions 3-6

Then rebuild frontend if needed.

---

## 🎯 Summary

**What's New:**
- Cleaner branding (iNEXT everywhere)
- Better organized members page (Current Scholars section)
- Lab social media links on homepage
- No unnecessary counts on publications
- Larger, more prominent hero slideshow

**For Admin:**
- Photo upload works directly (no SSH needed)
- Hero slideshow fully manageable
- All content editable via admin dashboard

---

**Ready to deploy! Run the commands above to go live at https://inext.iitp.ac.in**
