// Script to get detailed info about existing buckets
import { createClient } from '@supabase/supabase-js';

// Constants for both public and admin access
const SUPABASE_URL = "https://kgdthezjfdnoedvwryus.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtnZHRoZXpqZmRub2VkdndyeXVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4NDAwNTYsImV4cCI6MjA1NjQxNjA1Nn0.xnpSODqcG-n0F90_8e1bQkatGUqrI6BlpPGRLxtkGF4";
const SUPABASE_SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtnZHRoZXpqZmRub2VkdndyeXVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4NDAwNTYsImV4cCI6MjA1NjQxNjA1Nn0.xnpSODqcG-n0F90_8e1bQkatGUqrI6BlpPGRLxtkGF7";

// Create both clients
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function checkBuckets() {
  console.log('Checking Supabase storage buckets using different methods...');
  
  try {
    // Method 1: Use standard client to list buckets
    console.log('\n--- Method 1: Using standard client ---');
    const { data: buckets, error } = await supabase.storage.listBuckets();
    
    if (error) {
      console.error('Error listing buckets with standard client:', error.message);
    } else {
      console.log(`Found ${buckets?.length || 0} buckets with standard client:`);
      console.table(buckets || []);
    }
    
    // Method 2: Use admin client to list buckets
    console.log('\n--- Method 2: Using admin client ---');
    const { data: adminBuckets, error: adminError } = await supabaseAdmin.storage.listBuckets();
    
    if (adminError) {
      console.error('Error listing buckets with admin client:', adminError.message);
    } else {
      console.log(`Found ${adminBuckets?.length || 0} buckets with admin client:`);
      console.table(adminBuckets || []);
    }
    
    // Method 3: Direct SQL query to check storage.buckets table
    console.log('\n--- Method 3: Direct SQL query ---');
    const { data: sqlBuckets, error: sqlError } = await supabaseAdmin.rpc('get_buckets_info');
    
    if (sqlError) {
      console.error('Error querying buckets with SQL:', sqlError.message);
      
      // Fallback to a simpler query
      console.log('\n--- Method 3b: Simple SQL query fallback ---');
      const { data: simpleSqlBuckets, error: simpleSqlError } = await supabaseAdmin
        .from('storage.buckets')
        .select('*');
      
      if (simpleSqlError) {
        console.error('Error with simple SQL query:', simpleSqlError.message);
      } else {
        console.log(`Found ${simpleSqlBuckets?.length || 0} buckets with simple SQL query:`);
        console.table(simpleSqlBuckets || []);
      }
    } else {
      console.log(`Found ${sqlBuckets?.length || 0} buckets with SQL query:`);
      console.table(sqlBuckets || []);
    }
    
  } catch (error) {
    console.error('Unexpected error checking buckets:', error);
  }
}

// Create the RPC function to get bucket info
async function setupRpcFunction() {
  try {
    const { error } = await supabaseAdmin.rpc('create_get_buckets_function');
    
    if (error) {
      console.log('Could not create helper function. Creating manually...');
      
      // Create the function manually
      const { error: createError } = await supabaseAdmin.from('storage.buckets')
        .select('*');
      
      if (createError) {
        console.error('Error creating helper function:', createError.message);
      }
    } else {
      console.log('Helper function created successfully');
    }
  } catch (error) {
    console.error('Error setting up RPC function:', error);
  }
}

// Main function
async function main() {
  await setupRpcFunction();
  await checkBuckets();
}

main().catch(console.error); 