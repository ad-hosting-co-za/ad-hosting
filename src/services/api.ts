import { supabase, handleSupabaseError } from '@/supabase/client';
import type { Database } from '@/supabase/types';
import { useToastContext } from '@/contexts/ToastContext';

type Profile = Database['public']['Tables']['profiles']['Row'];
type WebsiteContent = Database['public']['Tables']['website_content']['Row'];

export function useApi() {
  const { promise } = useToastContext();

  return {
    profiles: {
      get: async (userId: string) => {
        return promise(
          (async () => {
            const { data, error } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', userId)
              .single();
            
            if (error) throw error;
            return data;
          })(),
          {
            loading: 'Loading profile...',
            success: 'Profile loaded successfully',
            error: (err) => `Failed to load profile: ${handleSupabaseError(err)}`
          }
        );
      },
      
      update: async (userId: string, updates: Partial<Profile>) => {
        return promise(
          (async () => {
            const { data, error } = await supabase
              .from('profiles')
              .update(updates)
              .eq('id', userId)
              .select()
              .single();
            
            if (error) throw error;
            return data;
          })(),
          {
            loading: 'Updating profile...',
            success: 'Profile updated successfully',
            error: (err) => `Failed to update profile: ${handleSupabaseError(err)}`
          }
        );
      },
      
      uploadAvatar: async (userId: string, file: File) => {
        return promise(
          (async () => {
            const fileExt = file.name.split('.').pop();
            const filePath = `${userId}/avatar.${fileExt}`;
            
            const { error: uploadError } = await supabase.storage
              .from('profiles')
              .upload(filePath, file, { upsert: true });
            
            if (uploadError) throw uploadError;
            
            const { data: { publicUrl } } = supabase.storage
              .from('profiles')
              .getPublicUrl(filePath);
              
            await api.profiles.update(userId, { avatar_url: publicUrl });
            
            return publicUrl;
          })(),
          {
            loading: 'Uploading avatar...',
            success: 'Avatar updated successfully',
            error: (err) => `Failed to upload avatar: ${handleSupabaseError(err)}`
          }
        );
      }
    },
    
    content: {
      get: async (slug: string) => {
        return promise(
          (async () => {
            const { data, error } = await supabase
              .from('website_content')
              .select('*')
              .eq('slug', slug)
              .single();
            
            if (error) throw error;
            return data;
          })(),
          {
            loading: 'Loading content...',
            success: 'Content loaded successfully',
            error: (err) => `Failed to load content: ${handleSupabaseError(err)}`
          }
        );
      },
      
      update: async (slug: string, updates: Partial<WebsiteContent>) => {
        return promise(
          (async () => {
            const { data, error } = await supabase
              .from('website_content')
              .update(updates)
              .eq('slug', slug)
              .select()
              .single();
            
            if (error) throw error;
            return data;
          })(),
          {
            loading: 'Updating content...',
            success: 'Content updated successfully',
            error: (err) => `Failed to update content: ${handleSupabaseError(err)}`
          }
        );
      }
    },
    
    storage: {
      upload: async (bucket: string, path: string, file: File) => {
        return promise(
          (async () => {
            const { error } = await supabase.storage
              .from(bucket)
              .upload(path, file);
              
            if (error) throw error;
            
            const { data: { publicUrl } } = supabase.storage
              .from(bucket)
              .getPublicUrl(path);
              
            return publicUrl;
          })(),
          {
            loading: 'Uploading file...',
            success: 'File uploaded successfully',
            error: (err) => `Failed to upload file: ${handleSupabaseError(err)}`
          }
        );
      },
      
      delete: async (bucket: string, path: string) => {
        return promise(
          (async () => {
            const { error } = await supabase.storage
              .from(bucket)
              .remove([path]);
              
            if (error) throw error;
          })(),
          {
            loading: 'Deleting file...',
            success: 'File deleted successfully',
            error: (err) => `Failed to delete file: ${handleSupabaseError(err)}`
          }
        );
      }
    }
  };
}

// Example usage:
/*
const api = useApi();

try {
  const profile = await api.profiles.get(userId);
  console.log('Profile:', profile);
  
  await api.profiles.update(userId, {
    name: 'John Doe',
    bio: 'Hello world!'
  });
  
  const avatarUrl = await api.profiles.uploadAvatar(userId, file);
  console.log('Avatar URL:', avatarUrl);
} catch (error) {
  console.error('API error:', error);
}
*/ 