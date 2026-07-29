-- Make role, focus, organization, thesisTitle, and batch optional in Member table
-- Add supervisor fields for PhD students
-- Run this on your Supabase database

ALTER TABLE "Member" 
  ALTER COLUMN "role" DROP NOT NULL,
  ALTER COLUMN "focus" DROP NOT NULL;

-- Add PhD-specific fields
ALTER TABLE "Member" 
  ADD COLUMN IF NOT EXISTS "supervisor" TEXT,
  ADD COLUMN IF NOT EXISTS "coSupervisor" TEXT;

-- Add missing optional fields if they don't exist
ALTER TABLE "Member" 
  ADD COLUMN IF NOT EXISTS "organization" TEXT,
  ADD COLUMN IF NOT EXISTS "thesisTitle" TEXT,
  ADD COLUMN IF NOT EXISTS "batch" TEXT;
