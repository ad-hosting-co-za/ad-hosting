-- Fix existing buckets and create missing ones

-- Function to safely create or update a bucket
CREATE OR REPLACE FUNCTION create_or_update_bucket(
  p_id text,
  p_name text,
  p_public boolean,
  p_file_size_limit bigint,
  p_allowed_mime_types text[]
) RETURNS void AS $$
BEGIN
  -- Check if bucket exists
  IF EXISTS (SELECT 1 FROM storage.buckets WHERE id = p_id) THEN
    -- Update existing bucket
    UPDATE storage.buckets
    SET 
      name = p_name,
      public = p_public,
      file_size_limit = p_file_size_limit,
      allowed_mime_types = p_allowed_mime_types,
      updated_at = NOW()
    WHERE id = p_id;
  ELSE
    -- Create new bucket
    INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
    VALUES (p_id, p_name, p_public, p_file_size_limit, p_allowed_mime_types);
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Update or create profiles bucket
SELECT create_or_update_bucket(
  'profiles',
  'profiles',
  true,
  2097152,  -- 2MB
  ARRAY['image/png', 'image/jpeg', 'image/gif']::text[]
);

-- Update or create admin_uploads bucket
SELECT create_or_update_bucket(
  'admin_uploads',
  'admin_uploads',
  false,
  10485760,  -- 10MB
  ARRAY['image/png', 'image/jpeg', 'image/gif', 'application/pdf', 'text/plain']::text[]
);

-- Drop the helper function
DROP FUNCTION create_or_update_bucket;

-- Fix RLS policies

-- Profiles bucket policies
-- Check if policy exists before creating
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public profiles access') THEN
    CREATE POLICY "Public profiles access"
      ON storage.objects FOR SELECT
      USING (bucket_id = 'profiles');
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can upload their own profile pictures') THEN
    CREATE POLICY "Users can upload their own profile pictures"
      ON storage.objects FOR INSERT
      WITH CHECK (
        bucket_id = 'profiles' AND
        auth.uid() = SUBSTRING(name, 0, POSITION('/' IN name))::uuid
      );
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can update their own profile pictures') THEN
    CREATE POLICY "Users can update their own profile pictures"
      ON storage.objects FOR UPDATE
      USING (
        bucket_id = 'profiles' AND
        auth.uid() = SUBSTRING(name, 0, POSITION('/' IN name))::uuid
      );
  END IF;
END $$;

-- Admin_uploads bucket policies
DO $$
BEGIN
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
  END IF;
END $$; 