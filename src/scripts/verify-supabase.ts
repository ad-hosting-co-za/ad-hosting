/**
 * Verify Supabase Connection Script
 * 
 * Run this script to verify your Supabase connection and schema:
 * $ npx ts-node src/scripts/verify-supabase.ts
 */

import { runFullVerification } from '../supabase/sync';

async function main() {
  console.log('🔍 Verifying Supabase connection and schema...');
  
  const result = await runFullVerification();
  
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
}

main().catch(error => {
  console.error('Script error:', error);
  process.exit(1);
}); 