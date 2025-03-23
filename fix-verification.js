// Updated Supabase verification script with admin permissions
import { createClient } from '@supabase/supabase-js';

// Constants
const SUPABASE_URL = "https://kgdthezjfdnoedvwryus.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtnZHRoZXpqZmRub2VkdndyeXVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4NDAwNTYsImV4cCI6MjA1NjQxNjA1Nn0.xnpSODqcG-n0F90_8e1bQkatGUqrI6BlpPGRLxtkGF4";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_SERVICE_ROLE_KEY) {
  console.error("❌ SUPABASE_SERVICE_ROLE_KEY environment variable is not set");
  console.log("Please set it before running this script:");
  console.log("$env:SUPABASE_SERVICE_ROLE_KEY = 'your-service-role-key'");
  process.exit(1);
}

// Create regular and admin Supabase clients
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
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
  console.log('Checking storage buckets with admin privileges...');
  
  try {
    // Use the admin client with service role key to bypass RLS
    const { data: buckets, error } = await supabaseAdmin.storage.listBuckets();
    
    if (error) {
      console.error("Error listing storage buckets:", error);
      return { success: false, error };
    }
    
    if (!buckets || buckets.length === 0) {
      console.log("No buckets found with admin client");
      
      // Alternative method: query the buckets table directly
      const { data: sqlBuckets, error: sqlError } = await supabaseAdmin
        .from('storage.buckets')
        .select('*');
      
      if (sqlError) {
        console.error("Error querying buckets table:", sqlError);
        return { success: false, error: sqlError };
      }
      
      console.log("Buckets found via direct SQL:", sqlBuckets?.length || 0);
      
      const missingBuckets = EXPECTED_BUCKETS.filter(
        bucket => !sqlBuckets?.some(b => b.id === bucket || b.name === bucket)
      );
      
      if (missingBuckets.length > 0) {
        console.warn("Missing storage buckets (SQL check):", missingBuckets);
        return { 
          success: false, 
          method: "sql",
          existingBuckets: sqlBuckets?.map(b => b.id) || [],
          missingBuckets 
        };
      }
      
      console.log("✅ All expected storage buckets exist (SQL check)");
      return { 
        success: true, 
        method: "sql",
        buckets: sqlBuckets?.map(b => b.id) || [] 
      };
    }
    
    console.log(`Found ${buckets.length} buckets with admin client:`, buckets.map(b => b.name));
    
    const missingBuckets = EXPECTED_BUCKETS.filter(
      bucket => !buckets?.some(b => b.name === bucket || b.id === bucket)
    );
    
    if (missingBuckets.length > 0) {
      console.warn("Missing storage buckets:", missingBuckets);
      return { 
        success: false, 
        method: "api",
        existingBuckets: buckets?.map(b => b.name) || [],
        missingBuckets 
      };
    }
    
    console.log("✅ All expected storage buckets exist");
    return { 
      success: true, 
      method: "api",
      buckets: buckets?.map(b => b.name) || [] 
    };
  } catch (error) {
    console.error("Failed to verify storage buckets:", error);
    return { success: false, error };
  }
}

async function main() {
  console.log('🔍 Verifying Supabase connection and schema with admin privileges...');
  
  const connectionOk = await verifyConnection();
  if (!connectionOk) {
    console.error("❌ Supabase connection failed - aborting further checks");
    return { success: false, connection: false };
  }
  
  const tableResults = await verifyTables();
  const tablesOk = tableResults.every(result => result.exists);
  
  const storageResults = await verifyStorageBuckets();
  
  const result = {
    success: tablesOk && storageResults.success,
    connection: connectionOk,
    tables: tableResults,
    storage: storageResults
  };
  
  console.log('\n=== Verification Results ===');
  
  if (result.success) {
    console.log('✅ All checks passed successfully!');
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
    
    if (result.storage && !result.storage.success) {
      console.log('  - Storage buckets issues:');
      if (result.storage.missingBuckets) {
        console.log('    Missing buckets:', result.storage.missingBuckets);
      }
      if (result.storage.error) {
        console.log('    Error:', result.storage.error);
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