/**
 * Supabase Sync Utility
 * 
 * This file contains utility functions to help with Supabase schema synchronization.
 * Run these functions from a script or manually if needed.
 */

import { supabase } from "@/integrations/supabase/client";

/**
 * Verifies the connection to Supabase
 */
export async function verifySupabaseConnection() {
  try {
    // Test a simple query to verify connection
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .limit(1);
    
    if (error) {
      console.error("Supabase connection error:", error);
      return false;
    }
    
    console.log("✅ Supabase connection verified successfully");
    return true;
  } catch (error) {
    console.error("Failed to connect to Supabase:", error);
    return false;
  }
}

/**
 * Tests all the tables defined in the schema to ensure they exist
 */
export async function verifyTables() {
  const tables = [
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
  
  const results = [];
  
  for (const table of tables) {
    try {
      // Test a simple query to verify the table exists
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

/**
 * Verifies storage buckets
 */
export async function verifyStorageBuckets() {
  try {
    const { data: buckets, error } = await supabase.storage.listBuckets();
    
    if (error) {
      console.error("Error listing storage buckets:", error);
      return { success: false, error };
    }
    
    const expectedBuckets = ['profiles', 'admin_uploads'];
    const missingBuckets = expectedBuckets.filter(
      bucket => !buckets?.some(b => b.name === bucket)
    );
    
    if (missingBuckets.length > 0) {
      console.warn("Missing storage buckets:", missingBuckets);
      return { 
        success: false, 
        existingBuckets: buckets?.map(b => b.name) || [],
        missingBuckets 
      };
    }
    
    console.log("✅ All expected storage buckets exist");
    return { 
      success: true, 
      buckets: buckets?.map(b => b.name) || [] 
    };
  } catch (error) {
    console.error("Failed to verify storage buckets:", error);
    return { success: false, error };
  }
}

/**
 * Run a complete verification of the Supabase setup
 */
export async function runFullVerification() {
  console.log("Starting Supabase verification...");
  
  const connectionOk = await verifySupabaseConnection();
  if (!connectionOk) {
    console.error("❌ Supabase connection failed - aborting further checks");
    return { success: false, connection: false };
  }
  
  const tableResults = await verifyTables();
  const tablesOk = tableResults.every(result => result.exists);
  
  const storageResults = await verifyStorageBuckets();
  
  return {
    success: tablesOk && storageResults.success,
    connection: connectionOk,
    tables: tableResults,
    storage: storageResults
  };
} 