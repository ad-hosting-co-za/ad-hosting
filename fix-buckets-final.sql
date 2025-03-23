-- Final fix for storage buckets with proper error handling
-- Run this in the Supabase SQL Editor

-- First, check if the buckets exist
DO $$
DECLARE
  profiles_exists BOOLEAN;
  admin_uploads_exists BOOLEAN;
BEGIN
  -- Check if each bucket exists
  SELECT EXISTS(SELECT 1 FROM storage.buckets WHERE id = 'profiles') INTO profiles_exists;
  SELECT EXISTS(SELECT 1 FROM storage.buckets WHERE id = 'admin_uploads') INTO admin_uploads_exists;
  
  RAISE NOTICE 'Current bucket status: profiles (%) / admin_uploads (%)', 
    CASE WHEN profiles_exists THEN 'exists' ELSE 'missing' END,
    CASE WHEN admin_uploads_exists THEN 'exists' ELSE 'missing' END;
  
  -- Fix the profiles bucket if needed
  IF NOT profiles_exists THEN
    RAISE NOTICE 'Creating profiles bucket...';
    INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
    VALUES (
      'profiles',
      'profiles',
      true,
      2097152,
      ARRAY['image/png', 'image/jpeg', 'image/gif']::text[]
    );
  ELSE
    RAISE NOTICE 'Updating profiles bucket settings...';
    UPDATE storage.buckets
    SET 
      name = 'profiles',
      public = true,
      file_size_limit = 2097152,
      allowed_mime_types = ARRAY['image/png', 'image/jpeg', 'image/gif']::text[]
    WHERE id = 'profiles';
  END IF;
  
  -- Fix the admin_uploads bucket if needed
  IF NOT admin_uploads_exists THEN
    RAISE NOTICE 'Creating admin_uploads bucket...';
    INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
    VALUES (
      'admin_uploads',
      'admin_uploads',
      false,
      10485760,
      ARRAY['image/png', 'image/jpeg', 'image/gif', 'application/pdf', 'text/plain']::text[]
    );
  ELSE
    RAISE NOTICE 'Updating admin_uploads bucket settings...';
    UPDATE storage.buckets
    SET 
      name = 'admin_uploads',
      public = false,
      file_size_limit = 10485760,
      allowed_mime_types = ARRAY['image/png', 'image/jpeg', 'image/gif', 'application/pdf', 'text/plain']::text[]
    WHERE id = 'admin_uploads';
  END IF;
END $$;

-- Set up RLS policies if they don't exist
DO $$
BEGIN
  -- Enable RLS on objects table if not already enabled
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables
    WHERE tablename = 'objects' 
    AND schemaname = 'storage' 
    AND rowsecurity = true
  ) THEN
    ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
    RAISE NOTICE 'Enabled RLS on storage.objects';
  END IF;

  -- Create policies for profiles bucket
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public profiles access') THEN
    CREATE POLICY "Public profiles access"
      ON storage.objects FOR SELECT
      USING (bucket_id = 'profiles');
    RAISE NOTICE 'Created Public profiles access policy';
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can upload their own profile pictures') THEN
    CREATE POLICY "Users can upload their own profile pictures"
      ON storage.objects FOR INSERT
      WITH CHECK (
        bucket_id = 'profiles' AND
        auth.uid() = SUBSTRING(name, 0, POSITION('/' IN name))::uuid
      );
    RAISE NOTICE 'Created Users can upload their own profile pictures policy';
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can update their own profile pictures') THEN
    CREATE POLICY "Users can update their own profile pictures"
      ON storage.objects FOR UPDATE
      USING (
        bucket_id = 'profiles' AND
        auth.uid() = SUBSTRING(name, 0, POSITION('/' IN name))::uuid
      );
    RAISE NOTICE 'Created Users can update their own profile pictures policy';
  END IF;
  
  -- Create policies for admin_uploads bucket
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Only admins can access admin_uploads') THEN
    CREATE POLICY "Only admins can access admin_uploads"
      ON storage.objects FOR SELECT
      USING (
        bucket_id = 'admin_uploads' AND
        EXISTS (
          SELECT 1 FROM public.admin_users 
          WHERE admin_users.id = auth.uid()
        )
      );
    RAISE NOTICE 'Created Only admins can access admin_uploads policy';
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Only admins can upload to admin_uploads') THEN
    CREATE POLICY "Only admins can upload to admin_uploads"
      ON storage.objects FOR INSERT
      WITH CHECK (
        bucket_id = 'admin_uploads' AND
        EXISTS (
          SELECT 1 FROM public.admin_users 
          WHERE admin_users.id = auth.uid()
        )
      );
    RAISE NOTICE 'Created Only admins can upload to admin_uploads policy';
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Only admins can update in admin_uploads') THEN
    CREATE POLICY "Only admins can update in admin_uploads"
      ON storage.objects FOR UPDATE
      USING (
        bucket_id = 'admin_uploads' AND
        EXISTS (
          SELECT 1 FROM public.admin_users 
          WHERE admin_users.id = auth.uid()
        )
      );
    RAISE NOTICE 'Created Only admins can update in admin_uploads policy';
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Only admins can delete from admin_uploads') THEN
    CREATE POLICY "Only admins can delete from admin_uploads"
      ON storage.objects FOR DELETE
      USING (
        bucket_id = 'admin_uploads' AND
        EXISTS (
          SELECT 1 FROM public.admin_users 
          WHERE admin_users.id = auth.uid()
        )
      );
    RAISE NOTICE 'Created Only admins can delete from admin_uploads policy';
  END IF;
END $$;

-- Check the final status of buckets
SELECT id, name, public, file_size_limit, allowed_mime_types 
FROM storage.buckets
WHERE id IN ('profiles', 'admin_uploads')
ORDER BY name; 