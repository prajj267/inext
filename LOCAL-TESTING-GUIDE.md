# Local Testing Guide ✅

## Migration Successful!

✅ Database migration completed
✅ Build successful
✅ Local server running at http://localhost:3000

---

## What to Test

### 1. View Members Page
Visit: http://localhost:3000/members

**Check:**
- ✅ Lead section shows horizontal card (faculty)
- ✅ Current Scholars section has Ph.D. and Master's subsections
- ✅ Alumni section has Ph.D. and Master's subsections
- ✅ Members are sorted by order field

### 2. Test Admin - Add New PhD Student

Visit: http://localhost:3000/admin/members/new

**Steps:**
1. Login if needed (arijitroy@iitp.ac.in / changeme123)
2. Fill in member details:
   - Name: Test PhD Student
   - Member Type: **Ph.D. - Current**
   - Order: 10
   - Research Focus: (leave empty or fill)
3. **Check:** Two new fields appear:
   - Supervisor: (fill with "Dr. Arijit Roy")
   - Co-Supervisor: (fill with "Dr. Jane Smith")
4. Add photo (optional)
5. Add links (optional)
6. Click "Save"

### 3. Verify New Member Shows Up

Visit: http://localhost:3000/members

**Check:**
- New member appears in "Current Scholars → Ph.D." section
- Shows supervisor info:
  ```
  Supervisor: Dr. Arijit Roy
  Co-Supervisor: Dr. Jane Smith
  ```

### 4. Test Edit Existing Member

Visit: http://localhost:3000/admin/members

**Steps:**
1. Click "Edit" on any PhD student
2. **Check:** Supervisor fields are visible (only for PhD)
3. Fill in supervisor info
4. Save
5. View on members page

### 5. Test Non-PhD Members

Visit: http://localhost:3000/admin/members/new

**Steps:**
1. Select Member Type: **Master's - Current**
2. **Check:** Supervisor fields should NOT appear
3. Try other types (Undergrad, Intern)
4. **Check:** No supervisor fields for these either

---

## Expected Behavior

### PhD Students (Current & Alumni):
- ✅ Supervisor field visible
- ✅ Co-Supervisor field visible
- ✅ Both fields optional
- ✅ Shows on member card under research focus

### Master's Students:
- ❌ No supervisor fields in form
- ❌ No supervisor display on card

### Faculty (Lead):
- ❌ No supervisor fields in form
- ❌ No supervisor display on lead card
- ✅ Shows horizontal layout

---

## Common Issues & Fixes

### Issue: "Column does not exist" error
**Fix:** Run migration again:
```bash
cd "C:\Projects\website iit\inext-api"
npx ts-node run-migration.ts
```

### Issue: Can't add new member
**Fix:** Make sure API server is running:
```bash
cd "C:\Projects\website iit\inext-api"
npm run dev
```

### Issue: Changes not showing
**Fix:** Hard refresh browser (Ctrl+Shift+R) or clear cache

---

## Screenshot Checklist

Take screenshots of:
1. ✅ Lead section (horizontal card)
2. ✅ PhD Current section (with supervisor info)
3. ✅ PhD Alumni section (with supervisor info)
4. ✅ Admin form showing supervisor fields (PhD selected)
5. ✅ Admin form WITHOUT supervisor fields (Masters selected)

---

## Stop Testing

When done testing:
```bash
# Stop the frontend server
Ctrl+C in the terminal

# Or use this if needed
npm run build  # to rebuild for production
```

---

## Ready to Deploy?

Once local testing is complete:
1. Commit the TypeScript fix
2. Push to GitHub
3. Railway will auto-deploy
4. Test on live site: Check Railway URL

---

## API Server Info

If you need to test API locally:
```bash
cd "C:\Projects\website iit\inext-api"
npm run dev
# API runs at http://localhost:4000
```

Frontend will use Railway API by default (check .env for NEXT_PUBLIC_API_URL)
