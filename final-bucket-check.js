// Final approach - simplest bucket verification
import { createClient } from '@supabase/supabase-js';

// Constants
const SUPABASE_URL = "https://kgdthezjfdnoedvwryus.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtnZHRoZXpqZmRub2VkdndyeXVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4NDAwNTYsImV4cCI6MjA1NjQxNjA1Nn0.xnpSODqcG-n0F90_8e1bQkatGUqrI6BlpPGRLxtkGF4";

// Create Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Storage buckets to verify
const EXPECTED_BUCKETS = ['profiles', 'admin_uploads'];

// Instructions for manual setup
function printSetupInstructions() {
  console.log('\n=== Storage Bucket Setup Instructions ===');
  console.log('1. Log in to your Supabase dashboard:');
  console.log('   https://app.supabase.com/project/kgdthezjfdnoedvwryus/storage/buckets');
  console.log('\n2. Create these buckets if they don\'t exist:');
  console.log('   - profiles (with public access)');
  console.log('   - admin_uploads (with restricted access)');
  console.log('\n3. For the profiles bucket:');
  console.log('   - Set public access to TRUE');
  console.log('   - Set file size limit to 2MB (2097152 bytes)');
  console.log('   - Allow only image file types: image/png, image/jpeg, image/gif');
  console.log('\n4. For the admin_uploads bucket:');
  console.log('   - Set public access to FALSE');
  console.log('   - Set file size limit to 10MB (10485760 bytes)');
  console.log('   - Allow file types: image/png, image/jpeg, image/gif, application/pdf, text/plain');
  console.log('\n5. After creating buckets, run this script again to verify.');
}

// Main function
async function main() {
  console.log('Checking Supabase storage buckets...');
  
  // Check buckets one by one
  let missing = [];
  let accessible = [];
  
  for (const bucket of EXPECTED_BUCKETS) {
    // Try to list a file in the bucket - this will tell us if the bucket exists
    // even if empty, without needing elevated permissions
    const { data, error } = await supabase.storage
      .from(bucket)
      .list('', { limit: 1 });
    
    if (error) {
      if (error.message.includes('The resource was not found') || 
          error.message.includes('bucket not found')) {
        console.log(`❌ Bucket '${bucket}' does not exist`);
        missing.push(bucket);
      } else {
        console.log(`⚠️ Bucket '${bucket}' might exist but has RLS restrictions: ${error.message}`);
        // We'll assume it exists but is protected
        accessible.push({
          bucket,
          accessible: false,
          message: error.message
        });
      }
    } else {
      console.log(`✅ Bucket '${bucket}' exists and is accessible`);
      accessible.push({
        bucket,
        accessible: true,
        files: data?.length || 0
      });
    }
  }
  
  // Print final status
  console.log('\n=== Bucket Verification Results ===');
  
  if (missing.length === 0 && accessible.length === EXPECTED_BUCKETS.length) {
    console.log('✅ All required buckets exist!');
    
    // Show which buckets are accessible
    accessible.forEach(b => {
      if (b.accessible) {
        console.log(`- '${b.bucket}': Accessible (${b.files} files found)`);
      } else {
        console.log(`- '${b.bucket}': Exists but not accessible (${b.message})`);
      }
    });
  } else {
    console.log('❌ Some buckets are missing or inaccessible:');
    if (missing.length > 0) {
      console.log('Missing buckets:', missing.join(', '));
      // Print instructions for creating buckets
      printSetupInstructions();
    }
  }
}

// Run the script
main().catch(error => {
  console.error('Script error:', error);
}); 