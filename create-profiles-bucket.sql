-- Create the profiles bucket only
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'profiles',
  'profiles',
  true,                          -- Public bucket for profile images
  2097152,                       -- 2MB file size limit (in bytes)
  '{image/png,image/jpeg,image/gif}'::text[]
);

-- Set up RLS (Row Level Security) for the profiles bucket
CREATE POLICY "Public profiles access"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'profiles');

CREATE POLICY "Users can upload their own profile pictures"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'profiles' AND
    auth.uid() = SUBSTRING(name, 0, POSITION('/' IN name))::uuid
  );

CREATE POLICY "Users can update their own profile pictures"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'profiles' AND
    auth.uid() = SUBSTRING(name, 0, POSITION('/' IN name))::uuid
  ); 