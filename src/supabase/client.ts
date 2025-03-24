import { createClient } from '@supabase/supabase-js';
import { Database } from './types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'x-application-name': 'ad-hosting'
    }
  }
});

// Helper to check if error is a Supabase error
export const isSupabaseError = (error: unknown): error is { 
  message: string; 
  status?: number 
} => {
  return typeof error === 'object' && error !== null && 'message' in error;
};

// Error handler helper
export const handleSupabaseError = (error: unknown): string => {
  if (isSupabaseError(error)) {
    return error.message;
  }
  return 'An unexpected error occurred';
}; 