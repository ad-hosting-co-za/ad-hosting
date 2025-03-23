/**
 * Supabase Admin Client
 * 
 * This client has elevated privileges and should only be used server-side or in admin-only functions.
 * NEVER expose this client to the client side.
 */

import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Use environment variables with fallback to hardcoded values (unsafe, only for demo/development)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://kgdthezjfdnoedvwryus.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY || "";

if (!SUPABASE_SERVICE_ROLE_KEY) {
  console.warn('WARNING: VITE_SUPABASE_SERVICE_ROLE_KEY is not set. Admin client will not work properly.');
}

// Create and export the admin Supabase client
export const supabaseAdmin = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY
); 