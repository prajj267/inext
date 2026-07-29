# Testing Alumni Changes Locally

## Current Status
✅ Build completed successfully (92 pages)
✅ Local production server running at http://localhost:3001

## What to Test

### 1. Frontend Members Page
Visit: **http://localhost:3001/members**

Check:
- [ ] "Current Scholars" section shows:
  - Ph.D. subsection with current PhD students
  - Master's subsection with current Masters students
- [ ] "Alumni" section shows:
  - Ph.D. subsection (will be empty until you migrate alumni members)
  - Master's subsection (will be empty until you migrate alumni members)
  - Legacy alumni still appear (for backwards compatibility)

### 2. Admin Panel (requires login)
Visit: **http://localhost:3001/admin/members**

**Note:** The admin panel connects to the live Railway API, so changes made here will affect the production database!

#### Test New Member Form
1. Click "Add New Member"
2. Check that "Member Type" dropdown shows:
   - Lead
   - Ph.D. - Current
   - Ph.D. - Alumni
   - Master's - Current  
   - Master's - Alumni
   - Undergrad
   - Intern
3. Try creating a test member as "Ph.D. - Alumni"
4. Save and verify it appears in the Alumni > Ph.D. section on /members

#### Test Edit Member Form
1. Click "Edit" on any existing member
2. Verify the "Member Type" dropdown shows the same options
3. Try changing an existing alumni to "Ph.D. - Alumni" or "Master's - Alumni"
4. Save and check the members page

## Known Behavior

### Before Migration
- **Current PhD/Masters students** → Will appear in "Current Scholars" (correct)
- **Old ALUMNI category members** → Will appear in "Alumni" section without subsections (legacy behavior)

### After You Update Members via Admin
- **Members set to "Ph.D. - Alumni"** → Will appear under "Alumni > Ph.D."
- **Members set to "Master's - Alumni"** → Will appear under "Alumni > Master's"
- **Members set to "Ph.D. - Current"** → Will appear under "Current Scholars > Ph.D."
- **Members set to "Master's - Current"** → Will appear under "Current Scholars > Master's"

## Migration Strategy

### Option 1: Manual (Recommended for Testing)
1. Login to admin panel
2. For each alumni member:
   - Click Edit
   - Change "Member Type" from "Alumni" to either:
     - "Ph.D. - Alumni" (if they have a PhD)
     - "Master's - Alumni" (if they have a Masters)
   - Save
3. Refresh /members page to see them in the correct subsections

### Option 2: Database Migration (For Production)
Run the SQL migration on Railway/Neon:
```sql
-- See migration-add-member-status.sql for full script
ALTER TABLE "Member" ADD COLUMN "status" TEXT NOT NULL DEFAULT 'CURRENT';
-- ... (rest of migration)
```

Then bulk-update through admin panel or via API.

## What's Different from Before

### Before
- Alumni were just one big list under "Alumni"
- No distinction between PhD and Masters alumni

### After
- Alumni divided into "Ph.D." and "Master's" subsections
- When adding/editing members, you explicitly choose:
  - Current vs Alumni status
  - PhD vs Masters degree type
- Frontend automatically organizes them into the right sections

## Next Steps After Testing

If everything looks good:

1. **Stop test server** (close terminal with Ctrl+C)
2. **Run database migration** on production database
3. **Update API** (if needed) and deploy to Railway
4. **Deploy frontend** to IIT server
5. **Bulk-update alumni** through admin panel to categorize them properly
6. **Verify** deployed site shows correct structure

---

**Questions or Issues?**
- Check `ALUMNI-CHANGES.md` for technical details
- Check `DEPLOY-INSTRUCTIONS.md` for deployment steps
