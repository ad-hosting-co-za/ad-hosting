// Simple script to test Supabase connection
import { createClient } from '@supabase/supabase-js';

// Constants
const SUPABASE_URL = "https://kgdthezjfdnoedvwryus.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtnZHRoZXpqZmRub2VkdndyeXVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4NDAwNTYsImV4cCI6MjA1NjQxNjA1Nn0.xnpSODqcG-n0F90_8e1bQkatGUqrI6BlpPGRLxtkGF4";

// Create Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function checkConnection() {
  console.log('Testing Supabase connection...');
  
  try {
    // Simple query to test connection
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('Error connecting to Supabase:', error);
    } else {
      console.log('✅ Connected to Supabase successfully!');
      console.log('Data:', data);
    }
  } catch (err) {
    console.error('Failed to connect to Supabase:', err);
  }
}

// Run the check
checkConnection(); 