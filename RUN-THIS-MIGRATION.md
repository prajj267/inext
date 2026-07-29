# 🚀 IMPORTANT: Run This Database Migration

## Before the new deployment works, run this SQL on Supabase:

### Step 1: Open Supabase SQL Editor

1. Go to https://supabase.com/dashboard
2. Click on your project
3. Click "SQL Editor" in the left sidebar
4. Click "New query"

### Step 2: Copy and Paste This SQL

```sql
-- Make role and focus optional in Member table
ALTER TABLE "Member" 
  ALTER COLUMN "role" DROP NOT NULL,
  ALTER COLUMN "focus" DROP NOT NULL;

-- Add PhD-specific fields (supervisor and co-supervisor)
ALTER TABLE "Member" 
  ADD COLUMN IF NOT EXISTS "supervisor" TEXT,
  ADD COLUMN IF NOT EXISTS "coSupervisor" TEXT;

-- Ensure optional fields exist (if you haven't run migration-add-member-status.sql yet)
ALTER TABLE "Member" 
  ADD COLUMN IF NOT EXISTS "organization" TEXT,
  ADD COLUMN IF NOT EXISTS "thesisTitle" TEXT,
  ADD COLUMN IF NOT EXISTS "batch" TEXT;
```

### Step 3: Click "Run" (or press Ctrl+Enter)

You should see:
```
Success. No rows returned
```

## That's it!

Your Railway deployment will automatically detect the push and deploy in 3-5 minutes.

Once deployed, you can:
- ✅ Add new members and edit them immediately (no rebuild needed)
- ✅ Control member order using the "Order" field (0, 1, 2, ...)
- ✅ Leave research focus empty if not applicable
- ✅ See the beautiful horizontal lead card for faculty

## Check Deployment Status

Visit your Railway dashboard:
https://railway.app/dashboard

Or check the live site once deployed:
- Frontend: Check Railway deployment URL
- Admin: https://your-railway-url/admin

## Still seeing errors?

If you see database errors like "column does not exist" or "null value violates not-null constraint":

1. Double-check the migration ran successfully in Supabase
2. Restart the Railway service (Settings → Restart)
3. Check Railway logs for specific error messages
