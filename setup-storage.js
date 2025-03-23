// Script to set up Supabase storage buckets
import { createClient } from '@supabase/supabase-js';

// Constants
const SUPABASE_URL = "https://kgdthezjfdnoedvwryus.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtnZHRoZXpqZmRub2VkdndyeXVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4NDAwNTYsImV4cCI6MjA1NjQxNjA1Nn0.xnpSODqcG-n0F90_8e1bQkatGUqrI6BlpPGRLxtkGF4";

// Create Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function setupStorage() {
  console.log('Setting up Supabase storage buckets...');
  
  try {
    // List existing buckets
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error('Error listing buckets:', listError);
      return;
    }
    
    console.log('Existing buckets:', buckets?.map(b => b.name) || []);
    
    // Create profiles bucket if it doesn't exist
    if (!buckets?.find(bucket => bucket.name === 'profiles')) {
      console.log('Creating profiles bucket...');
      const { error } = await supabase.storage.createBucket('profiles', {
        public: true,
        fileSizeLimit: 2 * 1024 * 1024, // 2MB
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif']
      });
      
      if (error) {
        console.error('Error creating profiles bucket:', error);
      } else {
        console.log('✅ Profiles bucket created successfully');
      }
    } else {
      console.log('✅ Profiles bucket already exists');
    }
    
    // Create admin_uploads bucket if it doesn't exist
    if (!buckets?.find(bucket => bucket.name === 'admin_uploads')) {
      console.log('Creating admin_uploads bucket...');
      const { error } = await supabase.storage.createBucket('admin_uploads', {
        public: false,
        fileSizeLimit: 10 * 1024 * 1024, // 10MB
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'application/pdf', 'text/plain']
      });
      
      if (error) {
        console.error('Error creating admin_uploads bucket:', error);
      } else {
        console.log('✅ Admin_uploads bucket created successfully');
      }
    } else {
      console.log('✅ Admin_uploads bucket already exists');
    }
    
    // List buckets again to confirm
    const { data: updatedBuckets } = await supabase.storage.listBuckets();
    console.log('Updated buckets:', updatedBuckets?.map(b => b.name) || []);
    
  } catch (error) {
    console.error('Setup storage error:', error);
  }
}

setupStorage(); 