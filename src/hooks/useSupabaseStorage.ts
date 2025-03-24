import { useState, useCallback } from 'react';
import { supabase } from '@/supabase/client';

interface UploadProgress {
  bytesUploaded: number;
  totalBytes: number;
  percent: number;
}

interface StorageOptions {
  bucket: string;
  maxSizeMB?: number;
  allowedMimeTypes?: string[];
  upsert?: boolean;
}

export function useSupabaseStorage(options: StorageOptions) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<UploadProgress | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const validateFile = useCallback((file: File) => {
    // Check file size
    if (options.maxSizeMB) {
      const maxBytes = options.maxSizeMB * 1024 * 1024;
      if (file.size > maxBytes) {
        throw new Error(`File size must be less than ${options.maxSizeMB}MB`);
      }
    }

    // Check file type
    if (options.allowedMimeTypes?.length) {
      if (!options.allowedMimeTypes.includes(file.type)) {
        throw new Error(
          `File type must be one of: ${options.allowedMimeTypes.join(', ')}`
        );
      }
    }
  }, [options.maxSizeMB, options.allowedMimeTypes]);

  const upload = useCallback(async (
    file: File,
    path: string,
    onProgress?: (progress: UploadProgress) => void
  ) => {
    try {
      setError(null);
      setUploading(true);
      setProgress(null);

      // Validate file
      validateFile(file);

      // Upload file
      const { error: uploadError } = await supabase.storage
        .from(options.bucket)
        .upload(path, file, {
          upsert: options.upsert ?? false,
          onUploadProgress: (event) => {
            const progress = {
              bytesUploaded: event.loaded,
              totalBytes: event.total,
              percent: (event.loaded / event.total) * 100
            };
            setProgress(progress);
            onProgress?.(progress);
          }
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(options.bucket)
        .getPublicUrl(path);

      return publicUrl;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Upload failed');
      setError(error);
      throw error;
    } finally {
      setUploading(false);
      setProgress(null);
    }
  }, [options.bucket, options.upsert, validateFile]);

  const remove = useCallback(async (path: string) => {
    try {
      setError(null);
      const { error: removeError } = await supabase.storage
        .from(options.bucket)
        .remove([path]);

      if (removeError) throw removeError;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Remove failed');
      setError(error);
      throw error;
    }
  }, [options.bucket]);

  const list = useCallback(async (
    prefix?: string,
    options?: { limit?: number; offset?: number; sortBy?: { column: string; order?: string } }
  ) => {
    try {
      setError(null);
      const { data, error } = await supabase.storage
        .from(options?.bucket)
        .list(prefix || '', {
          limit: options?.limit,
          offset: options?.offset,
          sortBy: options?.sortBy
        });

      if (error) throw error;
      return data;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('List failed');
      setError(error);
      throw error;
    }
  }, [options.bucket]);

  const getPublicUrl = useCallback((path: string) => {
    const { data: { publicUrl } } = supabase.storage
      .from(options.bucket)
      .getPublicUrl(path);
    return publicUrl;
  }, [options.bucket]);

  return {
    upload,
    remove,
    list,
    getPublicUrl,
    uploading,
    progress,
    error
  };
}

// Example usage:
/*
const storage = useSupabaseStorage({
  bucket: 'profiles',
  maxSizeMB: 2,
  allowedMimeTypes: ['image/jpeg', 'image/png'],
  upsert: true
});

try {
  const publicUrl = await storage.upload(
    file,
    `users/${userId}/avatar.png`,
    (progress) => {
      console.log(`Upload progress: ${progress.percent}%`);
    }
  );
  console.log('File uploaded:', publicUrl);
} catch (error) {
  console.error('Upload failed:', error);
}
*/ 