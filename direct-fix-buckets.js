// Direct bucket verification and fix script that uses SQL queries
// bypassing the Storage API entirely
import { createClient } from '@supabase/supabase-js';

// Constants
const SUPABASE_URL = "https://kgdthezjfdnoedvwryus.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtnZHRoZXpqZmRub2VkdndyeXVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4NDAwNTYsImV4cCI6MjA1NjQxNjA1Nn0.xnpSODqcG-n0F90_8e1bQkatGUqrI6BlpPGRLxtkGF4";
// Hardcoded service role key - ONLY FOR DEMONSTRATION
// In production, use environment variables or .env file
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "your-service-role-key";

// Create admin client with service role key for bypassing RLS
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Expected buckets configuration
const EXPECTED_BUCKETS = [
  {
    id: 'profiles',
    name: 'profiles',
    public: true,
    file_size_limit: 2097152, // 2MB
    allowed_mime_types: ['image/png', 'image/jpeg', 'image/gif']
  },
  {
    id: 'admin_uploads',
    name: 'admin_uploads',
    public: false,
    file_size_limit: 10485760, // 10MB
    allowed_mime_types: ['image/png', 'image/jpeg', 'image/gif', 'application/pdf', 'text/plain']
  }
];

// Check if a bucket exists using direct SQL query
async function checkBucketExists(bucketId) {
  try {
    const { data, error } = await supabase.rpc('check_bucket_exists', { bucket_id: bucketId });
    
    if (error) {
      console.error(`Error checking if bucket '${bucketId}' exists:`, error);
      // Fallback to direct query if RPC fails
      const { data: directData, error: directError } = await supabase
        .from('storage.buckets')
        .select('id')
        .eq('id', bucketId)
        .single();
      
      if (directError && directError.code !== 'PGRST116') { // Not found is okay
        console.error(`Direct query error for bucket '${bucketId}':`, directError);
        return false;
      }
      
      return !!directData;
    }
    
    return data;
  } catch (error) {
    console.error(`Unexpected error checking bucket '${bucketId}':`, error);
    return false;
  }
}

// Create or update a bucket
async function createOrUpdateBucket(bucket) {
  try {
    const exists = await checkBucketExists(bucket.id);
    
    if (exists) {
      console.log(`Bucket '${bucket.id}' exists. Updating...`);
      const { error } = await supabase
        .from('storage.buckets')
        .update({
          name: bucket.name,
          public: bucket.public,
          file_size_limit: bucket.file_size_limit,
          allowed_mime_types: bucket.allowed_mime_types,
          updated_at: new Date().toISOString()
        })
        .eq('id', bucket.id);
      
      if (error) {
        console.error(`Error updating bucket '${bucket.id}':`, error);
        return false;
      }
      
      console.log(`✅ Bucket '${bucket.id}' updated successfully`);
      return true;
    } else {
      console.log(`Bucket '${bucket.id}' does not exist. Creating...`);
      const { error } = await supabase
        .from('storage.buckets')
        .insert({
          id: bucket.id,
          name: bucket.name,
          public: bucket.public,
          file_size_limit: bucket.file_size_limit,
          allowed_mime_types: bucket.allowed_mime_types
        });
      
      if (error) {
        console.error(`Error creating bucket '${bucket.id}':`, error);
        return false;
      }
      
      console.log(`✅ Bucket '${bucket.id}' created successfully`);
      return true;
    }
  } catch (error) {
    console.error(`Unexpected error with bucket '${bucket.id}':`, error);
    return false;
  }
}

// Setup RPC function for checking buckets
async function setupRpcFunction() {
  try {
    // Create a reusable function to check if a bucket exists
    const { error } = await supabase.rpc('create_check_bucket_function');
    
    if (error) {
      console.log('Creating check_bucket_exists function...');
      
      // Create the function directly
      const { error: createError } = await supabase.sql(`
        CREATE OR REPLACE FUNCTION check_bucket_exists(bucket_id TEXT)
        RETURNS BOOLEAN AS $$
        BEGIN
          RETURN EXISTS(SELECT 1 FROM storage.buckets WHERE id = bucket_id);
        END;
        $$ LANGUAGE plpgsql;
      `);
      
      if (createError) {
        console.error('Error creating helper function:', createError);
      } else {
        console.log('✅ Helper function created successfully');
      }
    } else {
      console.log('✅ Helper function already exists');
    }
  } catch (error) {
    console.error('Error setting up RPC function:', error);
  }
}

// Create RLS policies for the buckets
async function createPolicies() {
  try {
    console.log('Setting up RLS policies...');
    
    // Enable RLS on storage.objects if not already enabled
    const { error: rlsError } = await supabase.sql(`
      ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
    `);
    
    if (rlsError) {
      console.error('Error enabling RLS:', rlsError);
    }
    
    // Create policies for profiles bucket
    const profilesPolicies = [
      {
        name: 'Public profiles access',
        operation: 'SELECT',
        definition: "bucket_id = 'profiles'"
      },
      {
        name: 'Users can upload their own profile pictures',
        operation: 'INSERT',
        definition: "bucket_id = 'profiles' AND auth.uid() = SUBSTRING(name, 0, POSITION('/' IN name))::uuid"
      },
      {
        name: 'Users can update their own profile pictures',
        operation: 'UPDATE',
        definition: "bucket_id = 'profiles' AND auth.uid() = SUBSTRING(name, 0, POSITION('/' IN name))::uuid"
      }
    ];
    
    // Create policies for admin_uploads bucket
    const adminPolicies = [
      {
        name: 'Only admins can access admin_uploads',
        operation: 'SELECT',
        definition: "bucket_id = 'admin_uploads' AND EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid())"
      },
      {
        name: 'Only admins can upload to admin_uploads',
        operation: 'INSERT',
        definition: "bucket_id = 'admin_uploads' AND EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid())"
      },
      {
        name: 'Only admins can update in admin_uploads',
        operation: 'UPDATE',
        definition: "bucket_id = 'admin_uploads' AND EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid())"
      },
      {
        name: 'Only admins can delete from admin_uploads',
        operation: 'DELETE',
        definition: "bucket_id = 'admin_uploads' AND EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid())"
      }
    ];
    
    // Create all policies
    const allPolicies = [...profilesPolicies, ...adminPolicies];
    
    for (const policy of allPolicies) {
      // Check if policy already exists
      const { data: existingPolicies, error: checkError } = await supabase.sql(`
        SELECT 1 FROM pg_policies WHERE policyname = '${policy.name}'
      `);
      
      if (checkError) {
        console.error(`Error checking policy '${policy.name}':`, checkError);
        continue;
      }
      
      if (existingPolicies?.length > 0) {
        console.log(`Policy '${policy.name}' already exists`);
        continue;
      }
      
      // Create the policy
      const using = policy.operation === 'INSERT' ? 'WITH CHECK' : 'USING';
      const { error: policyError } = await supabase.sql(`
        CREATE POLICY "${policy.name}"
        ON storage.objects
        FOR ${policy.operation}
        ${using} (${policy.definition});
      `);
      
      if (policyError) {
        console.error(`Error creating policy '${policy.name}':`, policyError);
      } else {
        console.log(`✅ Created policy '${policy.name}'`);
      }
    }
  } catch (error) {
    console.error('Error setting up policies:', error);
  }
}

// Main function
async function main() {
  console.log('Starting direct bucket verification and fix...');
  
  // Set up RPC function first
  await setupRpcFunction();
  
  // Process each bucket
  const results = [];
  for (const bucket of EXPECTED_BUCKETS) {
    const success = await createOrUpdateBucket(bucket);
    results.push({ bucket: bucket.id, success });
  }
  
  // Create policies
  await createPolicies();
  
  // Check all buckets at the end
  console.log('\nVerifying final bucket status...');
  const { data: buckets, error } = await supabase
    .from('storage.buckets')
    .select('*')
    .in('id', EXPECTED_BUCKETS.map(b => b.id));
  
  if (error) {
    console.error('Error verifying buckets:', error);
  } else {
    console.log(`Found ${buckets?.length || 0} buckets:`);
    console.table(buckets || []);
  }
  
  console.log('\nBucket setup summary:');
  console.table(results);
}

// Run main function
main().catch(console.error).finally(() => {
  console.log('Script completed');
}); 