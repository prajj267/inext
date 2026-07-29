# Alumni Categorization Changes

## Overview
Alumni section is now divided into **Ph.D.** and **Master's** subsections. When adding or editing members in the admin panel, you can now select:

- Ph.D. - Current
- Ph.D. - Alumni
- Master's - Current
- Master's - Alumni

## What Changed

### 1. Database Schema (`prisma/schema.prisma`)
- Added `status` field to `Member` model (CURRENT or ALUMNI)
- Created `MemberStatus` enum

### 2. Admin Forms
- **Edit Member** (`app/admin/_forms/EditMemberForm.tsx`)
- **New Member** (`app/admin/members/new/page.tsx`)

Both forms now have a single "Member Type" dropdown with these options:
- Lead
- Ph.D. - Current
- Ph.D. - Alumni
- Master's - Current
- Master's - Alumni
- Undergrad
- Intern

### 3. Members Page (`app/members/page.tsx`)
The alumni section now displays:
- **Ph.D. Alumni** (separate subsection)
- **Master's Alumni** (separate subsection)
- Legacy alumni (for backwards compatibility with old data)

### 4. Types (`lib/types.ts`)
- Added `MemberStatus` type
- Updated `Member` interface to include `status` field

## Database Migration Required

**IMPORTANT:** You need to run the database migration on Railway/Neon:

1. Connect to your database
2. Run the SQL from `migration-add-member-status.sql`

Or use the Railway CLI to apply migrations from the API project.

## Testing Steps

1. **Build and test locally:**
   ```bash
   npm run build
   npx serve out -p 3001
   ```
   Visit http://localhost:3001

2. **Check the admin panel:**
   - Go to `/admin/members`
   - Click "Edit" on any member
   - Verify the "Member Type" dropdown shows all options
   - Try changing a current PhD to alumni
   - Save and check the members page

3. **Verify frontend:**
   - Visit `/members`
   - Check that "Alumni" section is divided into "Ph.D." and "Master's"
   - Verify all current scholars still appear in "Current Scholars"

## Deployment Checklist

- [ ] Run database migration on production database
- [ ] Deploy updated API code to Railway (if API changes needed)
- [ ] Build and deploy frontend to IIT server
- [ ] Update existing alumni members through admin panel to set correct status
- [ ] Verify alumni appear in correct subsections

## Notes

- Existing members with `category: ALUMNI` will be migrated to `status: ALUMNI` automatically
- New members default to `status: CURRENT`
- The old ALUMNI category is kept for backwards compatibility
- You can bulk-update alumni through the admin panel after deployment
