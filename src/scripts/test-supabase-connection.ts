/**
 * Test Supabase Connection
 * 
 * Run with: npx ts-node src/scripts/test-supabase-connection.ts
 */

import { supabase } from '../integrations/supabase/client';

async function main() {
  console.log('Testing Supabase connection...');
  
  try {
    // Test connection with a simple query
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .limit(1);
    
    if (error) {
      console.error('❌ Connection error:', error.message);
      process.exit(1);
    }
    
    console.log('✅ Connected to Supabase successfully!');
    console.log('Project URL:', process.env.NEXT_PUBLIC_SUPABASE_URL || supabase.supabaseUrl);
    
    // Check database schema
    console.log('\nFetching schema information...');
    
    const { data: tables, error: tablesError } = await supabase
      .rpc('get_schema_information');
    
    if (tablesError) {
      console.warn('⚠️ Could not fetch schema information:', tablesError.message);
    } else {
      console.log('Available tables:');
      console.table(tables);
    }
    
    process.exit(0);
  } catch (err) {
    console.error('Failed to connect to Supabase:', err);
    process.exit(1);
  }
}

main(); 