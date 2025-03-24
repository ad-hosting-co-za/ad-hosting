import { useState, useCallback, useRef, useEffect } from 'react';
import type { Toast } from '@/contexts/ToastContext';

const TOAST_LIMIT = 5;
const TOAST_REMOVE_DELAY = 300;

interface ToastQueueItem extends Omit<Toast, 'id'> {
  id?: string;
  createdAt: number;
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastQueueRef = useRef<ToastQueueItem[]>([]);
  const timeoutRef = useRef<number>();

  // Process queued toasts
  const processQueue = useCallback(() => {
    const now = Date.now();
    const visibleToasts = toasts.length;
    const queuedToasts = toastQueueRef.current;

    if (queuedToasts.length === 0 || visibleToasts >= TOAST_LIMIT) {
      return;
    }

    // Process toasts in order of creation
    const toastToShow = queuedToasts
      .sort((a, b) => a.createdAt - b.createdAt)
      .slice(0, TOAST_LIMIT - visibleToasts);

    if (toastToShow.length > 0) {
      setToasts(current => [
        ...current,
        ...toastToShow.map(toast => ({
          ...toast,
          id: toast.id || Math.random().toString(36).slice(2)
        }))
      ]);
      toastQueueRef.current = queuedToasts.slice(toastToShow.length);
    }

    // Schedule next queue processing
    if (toastQueueRef.current.length > 0) {
      timeoutRef.current = window.setTimeout(processQueue, 250);
    }
  }, [toasts.length]);

  // Clean up timeouts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).slice(2);
    const newToast = { ...toast, id, createdAt: Date.now() };

    // If we have space, add toast immediately
    if (toasts.length < TOAST_LIMIT) {
      setToasts(current => [...current, newToast]);
    } else {
      // Otherwise, queue the toast
      toastQueueRef.current.push(newToast);
      processQueue();
    }

    // Auto-dismiss toast after duration
    if (toast.duration !== Infinity) {
      const duration = toast.duration || 5000;
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  }, [toasts.length, processQueue]);

  const removeToast = useCallback((id: string) => {
    setToasts(current => {
      const remaining = current.filter(t => t.id !== id);
      // Process queue after removal
      if (remaining.length < TOAST_LIMIT) {
        processQueue();
      }
      return remaining;
    });
  }, [processQueue]);

  const updateToast = useCallback((id: string, toast: Partial<Toast>) => {
    setToasts(current =>
      current.map(t => (t.id === id ? { ...t, ...toast } : t))
    );
  }, []);

  const clearToasts = useCallback(() => {
    setToasts([]);
    toastQueueRef.current = [];
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  return {
    toasts,
    addToast,
    removeToast,
    updateToast,
    clearToasts,
    // Utility methods for common toast types
    success: useCallback(
      (message: string, options?: Partial<Omit<Toast, 'id'>>) => {
        return addToast({
          title: 'Success',
          description: message,
          variant: 'default',
          duration: 5000,
          ...options
        });
      },
      [addToast]
    ),
    error: useCallback(
      (message: string, options?: Partial<Omit<Toast, 'id'>>) => {
        return addToast({
          title: 'Error',
          description: message,
          variant: 'destructive',
          duration: 7000,
          ...options
        });
      },
      [addToast]
    ),
    promise: useCallback(
      async <T>(
        promise: Promise<T>,
        {
          loading = 'Loading...',
          success = 'Completed successfully',
          error = 'Something went wrong'
        }: {
          loading?: string;
          success?: string | ((data: T) => string);
          error?: string | ((error: Error) => string);
        } = {},
        options?: Partial<Omit<Toast, 'id'>>
      ) => {
        const toastId = addToast({
          title: 'Loading',
          description: loading,
          duration: Infinity,
          ...options
        });

        try {
          const data = await promise;
          
          updateToast(toastId, {
            title: 'Success',
            description: typeof success === 'function' ? success(data) : success,
            variant: 'default',
            duration: 5000
          });
          
          return data;
        } catch (err) {
          const errorMessage = 
            typeof error === 'function' 
              ? error(err instanceof Error ? err : new Error('Unknown error'))
              : error;
          
          updateToast(toastId, {
            title: 'Error',
            description: errorMessage,
            variant: 'destructive',
            duration: 7000
          });
          
          throw err;
        }
      },
      [addToast, updateToast]
    )
  };
}

// Example usage:
/*
const { success, error, promise } = useToast();

// Simple success toast
success('Profile updated successfully');

// Error toast with custom options
error('Failed to save changes', {
  duration: 10000,
  action: <Button>Retry</Button>
});

// Promise-based toast
try {
  await promise(
    updateProfile(data),
    {
      loading: 'Updating profile...',
      success: 'Profile updated successfully',
      error: (err) => `Failed to update profile: ${err.message}`
    }
  );
} catch (error) {
  console.error('Profile update failed:', error);
}
*/ 