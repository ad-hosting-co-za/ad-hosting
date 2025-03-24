import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { useToastQueue } from '@/hooks/useToastQueue';
import { ToastContainer } from '@/components/ui/ToastContainer';

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: 'default' | 'destructive' | 'success' | 'info' | 'warning';
  duration?: number;
  priority?: number;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => string;
  removeToast: (id: string) => void;
  updateToast: (id: string, toast: Partial<Toast>) => void;
  clearToasts: () => void;
  pauseToasts: () => void;
  resumeToasts: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: React.ReactNode;
  maxVisible?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  groupSimilar?: boolean;
}

export function ToastProvider({ 
  children,
  maxVisible = 5,
  position = 'top-right',
  groupSimilar = true
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isPaused, setIsPaused] = useState(false);

  // Memoized toast state management
  const toastState = useMemo(() => ({
    add: (toast: Toast) => {
      setToasts(current => [...current, toast]);
    },
    remove: (id: string) => {
      setToasts(current => current.filter(t => t.id !== id));
    },
    update: (id: string, update: Partial<Toast>) => {
      setToasts(current =>
        current.map(t => (t.id === id ? { ...t, ...update } : t))
      );
    },
    clear: () => {
      setToasts([]);
    }
  }), []);

  const queue = useToastQueue({
    maxVisible,
    groupSimilar,
    onProcess: (toast) => {
      if (!isPaused) {
        toastState.add(toast);
      }
    },
    onRemove: (id) => {
      toastState.remove(id);
    }
  });

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    if (isPaused) return '';

    const id = queue.addToQueue(toast);

    if (toast.duration !== Infinity) {
      const duration = toast.duration || 5000;
      setTimeout(() => {
        queue.removeFromVisible(id);
      }, duration);
    }

    return id;
  }, [queue, isPaused]);

  const removeToast = useCallback((id: string) => {
    queue.removeFromVisible(id);
  }, [queue]);

  const updateToast = useCallback((id: string, update: Partial<Toast>) => {
    toastState.update(id, update);
  }, [toastState]);

  const clearToasts = useCallback(() => {
    queue.clearQueue();
    toastState.clear();
  }, [queue, toastState]);

  const pauseToasts = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resumeToasts = useCallback(() => {
    setIsPaused(false);
  }, []);

  const value = {
    toasts,
    addToast,
    removeToast,
    updateToast,
    clearToasts,
    pauseToasts,
    resumeToasts
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer
        position={position}
        limit={maxVisible}
        isPaused={isPaused}
      />
    </ToastContext.Provider>
  );
}

export function useToastContext() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}

// Utility hooks for common toast types
export function useToast() {
  const { addToast, removeToast, updateToast } = useToastContext();

  return {
    success: useCallback(
      (message: string, options?: Partial<Omit<Toast, 'id' | 'variant'>>) => {
        return addToast({
          description: message,
          variant: 'success',
          duration: 5000,
          ...options
        });
      },
      [addToast]
    ),

    error: useCallback(
      (message: string, options?: Partial<Omit<Toast, 'id' | 'variant'>>) => {
        return addToast({
          description: message,
          variant: 'destructive',
          duration: 7000,
          priority: 1, // Higher priority for errors
          ...options
        });
      },
      [addToast]
    ),

    warning: useCallback(
      (message: string, options?: Partial<Omit<Toast, 'id' | 'variant'>>) => {
        return addToast({
          description: message,
          variant: 'warning',
          duration: 6000,
          ...options
        });
      },
      [addToast]
    ),

    info: useCallback(
      (message: string, options?: Partial<Omit<Toast, 'id' | 'variant'>>) => {
        return addToast({
          description: message,
          variant: 'info',
          duration: 5000,
          ...options
        });
      },
      [addToast]
    ),

    promise: useCallback(
      async <T,>(
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
        options?: Partial<Omit<Toast, 'id' | 'description' | 'variant'>>
      ) => {
        const toastId = addToast({
          description: loading,
          variant: 'info',
          duration: Infinity,
          ...options
        });

        try {
          const data = await promise;
          
          updateToast(toastId, {
            description: typeof success === 'function' ? success(data) : success,
            variant: 'success',
            duration: 5000
          });
          
          return data;
        } catch (err) {
          const errorMessage = 
            typeof error === 'function' 
              ? error(err instanceof Error ? err : new Error('Unknown error'))
              : error;
          
          updateToast(toastId, {
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