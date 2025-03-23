-- Script to fix bucket visibility and RLS issues

-- 1. Enable RLS for storage.buckets (in case it's disabled)
ALTER TABLE storage.buckets ENABLE ROW LEVEL SECURITY;

-- 2. Create/Update policies for storage.buckets
-- This makes buckets visible to all authenticated users
CREATE POLICY IF NOT EXISTS "Buckets are viewable by everyone"
  ON storage.buckets FOR SELECT
  USING (true);
  
-- 3. Update existing buckets to ensure they're visible
-- Check if profiles bucket exists and update it
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'profiles') THEN
    UPDATE storage.buckets
    SET public = true,
        file_size_limit = 2097152,
        allowed_mime_types = ARRAY['image/png', 'image/jpeg', 'image/gif']::text[]
    WHERE id = 'profiles';
    RAISE NOTICE 'Profiles bucket updated';
  ELSE
    RAISE NOTICE 'Profiles bucket does not exist';
  END IF;
  
  IF EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'admin_uploads') THEN
    UPDATE storage.buckets
    SET public = false,
        file_size_limit = 10485760,
        allowed_mime_types = ARRAY['image/png', 'image/jpeg', 'image/gif', 'application/pdf', 'text/plain']::text[]
    WHERE id = 'admin_uploads';
    RAISE NOTICE 'Admin_uploads bucket updated';
  ELSE
    RAISE NOTICE 'Admin_uploads bucket does not exist';
  END IF;
END $$;

-- 4. Create a view to make it easier to check bucket status
CREATE OR REPLACE VIEW storage.bucket_status AS
SELECT 
  id, 
  name, 
  public, 
  file_size_limit,
  allowed_mime_types,
  created_at,
  updated_at,
  (SELECT COUNT(*) FROM storage.objects WHERE bucket_id = buckets.id) as object_count
FROM 
  storage.buckets; 