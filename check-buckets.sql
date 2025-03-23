-- SQL script to check storage buckets
-- Run this in the Supabase SQL Editor

-- List all buckets
SELECT id, name, public, file_size_limit, allowed_mime_types, created_at, updated_at
FROM storage.buckets
ORDER BY created_at;

-- Count objects in each bucket
SELECT 
  b.id as bucket_id, 
  b.name as bucket_name,
  COUNT(o.id) as object_count
FROM 
  storage.buckets b
LEFT JOIN 
  storage.objects o ON b.id = o.bucket_id
GROUP BY 
  b.id, b.name
ORDER BY 
  b.name;

-- Check if profiles bucket exists
SELECT EXISTS(SELECT 1 FROM storage.buckets WHERE id = 'profiles') as profiles_bucket_exists;

-- Check if admin_uploads bucket exists
SELECT EXISTS(SELECT 1 FROM storage.buckets WHERE id = 'admin_uploads') as admin_uploads_bucket_exists; 