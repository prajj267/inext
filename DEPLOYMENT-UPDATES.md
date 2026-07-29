# Deployment Updates - Dynamic Rendering

## Changes Made

### 1. Fixed URL Not Found for New Members ✅
- **Problem**: After adding a new member, clicking edit showed "URL not found"
- **Solution**: Removed static export (`output: 'export'`) from `next.config.ts`
- **Result**: Admin pages now render dynamically on-demand, no rebuild needed

### 2. Proper Member Ordering ✅
- **Problem**: No way to control the order of members in each section
- **Solution**: Added sorting by `order` field (lower numbers appear first)
- **Usage**: Set order in admin dashboard (0, 1, 2, etc.)

### 3. Made Research Focus Optional ✅
- **Problem**: Research focus was required but not always applicable
- **Solution**: 
  - Updated Prisma schema: `focus String?`
  - Updated TypeScript types
  - Updated admin forms to remove `required` attribute
  - Updated MemberCard to only show focus if it exists

### 4. Horizontal Lead Card ✅
- **Problem**: Single faculty card looked empty with lots of wasted space
- **Solution**: 
  - Created new `LeadCard` component with horizontal layout
  - Lead section now displays as a beautiful wide card (photo on left, info on right)
  - Auto-detects when section has single faculty member
  - Responsive: stacks vertically on mobile

## Database Migration Required

Run this SQL on your Supabase database:

```sql
-- Make role and focus optional
ALTER TABLE "Member" 
  ALTER COLUMN "role" DROP NOT NULL,
  ALTER COLUMN "focus" DROP NOT NULL;

-- Ensure optional fields exist
ALTER TABLE "Member" 
  ADD COLUMN IF NOT EXISTS "organization" TEXT,
  ADD COLUMN IF NOT EXISTS "thesisTitle" TEXT,
  ADD COLUMN IF NOT EXISTS "batch" TEXT;
```

**File**: `migration-optional-fields.sql`

## Deployment Steps

### Step 1: Run Database Migration

1. Go to Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Go to SQL Editor
4. Paste the migration SQL above
5. Click "Run"

### Step 2: Push Code to Railway

```bash
git push origin master
```

Railway will automatically:
- Detect the changes
- Run `npm run build`
- Start with `npm run start`
- Deploy the dynamic Next.js app

### Step 3: Update Environment Variables (if needed)

Make sure Railway has:
```
DATABASE_URL=postgresql://postgres.slgojafhbrebhosunxra:%23Brooklyn99123456789@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true
NEXT_PUBLIC_API_URL=https://inext-production.up.railway.app
```

## What Changed in the Code

### Files Modified:
- `next.config.ts` - Removed static export, enabled dynamic rendering
- `prisma/schema.prisma` - Made `role` and `focus` optional
- `lib/types.ts` - Updated Member interface
- `app/admin/_forms/EditMemberForm.tsx` - Made focus optional in form
- `app/admin/members/new/page.tsx` - Made focus optional in form
- `app/admin/*/[id]/edit/page.tsx` - Removed `generateStaticParams`, added `export const dynamic = 'force-dynamic'`
- `components/MemberCard.tsx` - Only show focus if it exists
- `app/members/page.tsx` - Added LeadCard support, sorting by order field
- `app/globals.css` - Added lead card styling

### Files Created:
- `components/LeadCard.tsx` - Horizontal card for faculty
- `migration-optional-fields.sql` - Database migration script
- `railway.toml` - Railway deployment configuration

## Testing Locally

After running the migration:

```bash
cd "C:\Projects\website iit\inext-website"
npm run build
npm run start
```

Visit http://localhost:3000/members to see the new horizontal lead card!

## Benefits

1. **No more 404 errors** - Add/edit members without rebuilding
2. **Better control** - Order members as you want (0, 1, 2, ...)
3. **More flexible** - Research focus is optional now
4. **Better design** - Lead card uses full width beautifully
5. **Faster workflow** - No need to rebuild/redeploy after every change

## Notes

- Railway deployment will take 3-5 minutes
- The site will now run as a Node.js server (not static files)
- Admin features work instantly without rebuilds
- Public pages are still optimized with Next.js caching
