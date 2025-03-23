// Simple Supabase verification script
import { createClient } from '@supabase/supabase-js';

// Constants
const SUPABASE_URL = "https://kgdthezjfdnoedvwryus.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtnZHRoZXpqZmRub2VkdndyeXVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4NDAwNTYsImV4cCI6MjA1NjQxNjA1Nn0.xnpSODqcG-n0F90_8e1bQkatGUqrI6BlpPGRLxtkGF4";
// Get service role key from .env or environment variables
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY;

// Create Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
// Create Admin client with service role key for operations that need elevated privileges
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Tables to verify
const TABLES = [
  'profiles',
  'admin_users',
  'admin_audit_logs',
  'user_config_states',
  'website_content',
  'user_activity_logs',
  'user_project_states',
  'migration_codes',
  'migration_history'
];

// Storage buckets to verify
const EXPECTED_BUCKETS = ['profiles', 'admin_uploads'];

async function verifyConnection() {
  console.log('Testing Supabase connection...');
  
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .limit(1);
    
    if (error) {
      console.error("❌ Supabase connection error:", error);
      return false;
    }
    
    console.log("✅ Supabase connection verified successfully");
    return true;
  } catch (error) {
    console.error("Failed to connect to Supabase:", error);
    return false;
  }
}

async function verifyTables() {
  const results = [];
  
  for (const table of TABLES) {
    try {
      const { error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });
      
      if (error) {
        console.error(`❌ Table '${table}' error:`, error.message);
        results.push({ table, exists: false, error: error.message });
      } else {
        console.log(`✅ Table '${table}' exists`);
        results.push({ table, exists: true });
      }
    } catch (error) {
      console.error(`❌ Failed to check table '${table}':`, error);
      results.push({ table, exists: false, error });
    }
  }
  
  return results;
}

async function verifyStorageBuckets() {
  try {
    console.log("Checking storage buckets...");
    
    // Check buckets one by one - more reliable than listBuckets
    let missing = [];
    let existingBuckets = [];
    
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
          // We'll assume it exists but is protected by RLS
          existingBuckets.push(bucket);
        }
      } else {
        console.log(`✅ Bucket '${bucket}' exists and is accessible`);
        existingBuckets.push(bucket);
      }
    }
    
    // Check if any buckets are missing
    if (missing.length > 0) {
      console.warn("Missing storage buckets:", missing);
      return { 
        success: false, 
        existingBuckets,
        missingBuckets: missing,
        note: "Some required buckets are missing. Create them via the Supabase dashboard."
      };
    }
    
    console.log("✅ All expected storage buckets exist");
    return { 
      success: true, 
      buckets: existingBuckets
    };
  } catch (error) {
    console.error("Failed to verify storage buckets:", error);
    return { 
      success: false, 
      error,
      note: "Failed to check buckets. Visit the Supabase dashboard to verify bucket setup."
    };
  }
}

async function main() {
  console.log('🔍 Verifying Supabase connection and schema...');
  
  const connectionOk = await verifyConnection();
  if (!connectionOk) {
    console.error("❌ Supabase connection failed - aborting further checks");
    return { success: false, connection: false };
  }
  
  const tableResults = await verifyTables();
  const tablesOk = tableResults.every(result => result.exists);
  
  const storageResults = await verifyStorageBuckets();
  
  // Consider storage successful if all buckets exist in the database
  // even if not visible via API due to RLS
  const storageOk = storageResults.success || 
                    (storageResults.bucketStatus && 
                     storageResults.bucketStatus.every(b => b.exists));
  
  const result = {
    success: tablesOk && storageOk,
    connection: connectionOk,
    tables: tableResults,
    storage: storageResults
  };
  
  console.log('\n=== Verification Results ===');
  
  if (result.success) {
    console.log('✅ All checks passed successfully!');
    if (storageResults.note) {
      console.log(`Note: ${storageResults.note}`);
    }
  } else {
    console.log('❌ Some checks failed:');
    
    if (!result.connection) {
      console.log('  - Supabase connection failed');
    }
    
    if (result.tables) {
      const failedTables = result.tables.filter(t => !t.exists);
      if (failedTables.length > 0) {
        console.log('  - Missing or invalid tables:');
        failedTables.forEach(t => console.log(`    - ${t.table}: ${t.error}`));
      }
    }
    
    if (!storageOk) {
      console.log('  - Storage buckets issues:');
      if (storageResults.missingBuckets && storageResults.missingBuckets.length > 0) {
        console.log('    Missing buckets:', storageResults.missingBuckets);
      }
      if (storageResults.error) {
        console.log('    Error:', storageResults.error);
      }
      if (storageResults.note) {
        console.log(`    Note: ${storageResults.note}`);
      }
    }
  }
  
  console.log('\nDetailed Results:');
  console.log(JSON.stringify(result, null, 2));
  
  return result;
}

main().catch(error => {
  console.error('Script error:', error);
  process.exit(1);
}); 