-- Migration: Add status field to Member table
-- Run this on the Railway/Neon database

-- Step 1: Add the status column with default value
ALTER TABLE "Member" ADD COLUMN "status" TEXT NOT NULL DEFAULT 'CURRENT';

-- Step 2: Create enum type if not exists
DO $$ BEGIN
    CREATE TYPE "MemberStatus" AS ENUM ('CURRENT', 'ALUMNI');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Step 3: Convert column to enum type
ALTER TABLE "Member" ALTER COLUMN "status" TYPE "MemberStatus" USING "status"::"MemberStatus";

-- Step 4: Update existing members based on category
-- Members with category 'ALUMNI' should have status 'ALUMNI'
UPDATE "Member" SET "status" = 'ALUMNI' WHERE "category" = 'ALUMNI';

-- Step 5: Keep category as is for now (we'll update this in the admin UI)
-- All other members default to CURRENT which is already set

-- Verification queries (optional):
-- SELECT "name", "category", "status" FROM "Member" ORDER BY "category", "status";
-- SELECT "category", "status", COUNT(*) FROM "Member" GROUP BY "category", "status";
