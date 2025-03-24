import { useCallback, useRef, useEffect, useMemo } from 'react';
import type { Toast } from '@/contexts/ToastContext';

interface QueuedToast extends Omit<Toast, 'id'> {
  id?: string;
  priority?: number;
  createdAt: number;
  groupId?: string;
  count?: number;
}

interface UseToastQueueOptions {
  maxVisible?: number;
  processInterval?: number;
  groupSimilar?: boolean;
  onProcess?: (toast: Toast) => void;
  onRemove?: (id: string) => void;
}

export function useToastQueue({
  maxVisible = 5,
  processInterval = 250,
  groupSimilar = true,
  onProcess,
  onRemove
}: UseToastQueueOptions = {}) {
  const queueRef = useRef<QueuedToast[]>([]);
  const visibleCountRef = useRef(0);
  const processingRef = useRef(false);
  const timeoutRef = useRef<number>();
  const debounceTimerRef = useRef<number>();

  // Memoized grouping function
  const groupToasts = useMemo(() => {
    return (toasts: QueuedToast[]): QueuedToast[] => {
      if (!groupSimilar) return toasts;
      
      const groups = new Map<string, QueuedToast>();
      
      toasts.forEach(toast => {
        const groupKey = `${toast.variant}-${toast.description}`;
        const existing = groups.get(groupKey);
        
        if (existing) {
          existing.count = (existing.count || 1) + 1;
          if (toast.priority > (existing.priority || 0)) {
            existing.priority = toast.priority;
          }
        } else {
          groups.set(groupKey, { ...toast, count: 1, groupId: groupKey });
        }
      });
      
      return Array.from(groups.values());
    };
  }, [groupSimilar]);

  // Enhanced queue processing with debouncing
  const processQueue = useCallback(() => {
    if (debounceTimerRef.current) {
      window.clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = window.setTimeout(() => {
      if (processingRef.current || visibleCountRef.current >= maxVisible) {
        return;
      }

      processingRef.current = true;

      try {
        const available = maxVisible - visibleCountRef.current;
        if (available <= 0 || queueRef.current.length === 0) return;

        // Group and sort toasts
        const groupedToasts = groupToasts(queueRef.current);
        const toProcess = groupedToasts
          .sort((a, b) => {
            const priorityDiff = (b.priority || 0) - (a.priority || 0);
            return priorityDiff !== 0 ? priorityDiff : a.createdAt - b.createdAt;
          })
          .slice(0, available);

        // Process toasts with optimized batching
        toProcess.forEach(toast => {
          const id = toast.id || Math.random().toString(36).slice(2);
          const description = toast.count && toast.count > 1
            ? `${toast.description} (${toast.count})`
            : toast.description;

          onProcess?.({
            ...toast,
            id,
            description
          });
          visibleCountRef.current++;
        });

        // Remove processed toasts efficiently
        const processedGroupIds = new Set(toProcess.map(t => t.groupId));
        queueRef.current = queueRef.current.filter(t => 
          !processedGroupIds.has(t.groupId)
        );

        // Schedule next processing if needed
        if (queueRef.current.length > 0) {
          timeoutRef.current = window.setTimeout(processQueue, processInterval);
        }
      } finally {
        processingRef.current = false;
      }
    }, 50); // Debounce delay
  }, [maxVisible, processInterval, groupToasts, onProcess]);

  // Memory-optimized cleanup
  useEffect(() => {
    return () => {
      [timeoutRef.current, debounceTimerRef.current].forEach(timer => {
        if (timer) window.clearTimeout(timer);
      });
      queueRef.current = [];
      visibleCountRef.current = 0;
    };
  }, []);

  const addToQueue = useCallback((toast: Omit<QueuedToast, 'createdAt'>) => {
    const queuedToast = {
      ...toast,
      createdAt: Date.now()
    };

    queueRef.current.push(queuedToast);
    processQueue();

    return queuedToast.id;
  }, [processQueue]);

  const removeFromVisible = useCallback((id: string) => {
    visibleCountRef.current = Math.max(0, visibleCountRef.current - 1);
    onRemove?.(id);
    processQueue();
  }, [onRemove, processQueue]);

  const clearQueue = useCallback(() => {
    queueRef.current = [];
    visibleCountRef.current = 0;
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
  }, []);

  return {
    addToQueue,
    removeFromVisible,
    clearQueue,
    getQueueLength: () => queueRef.current.length,
    getVisibleCount: () => visibleCountRef.current
  };
}

// Example usage:
/*
const queue = useToastQueue({
  maxVisible: 3,
  processInterval: 200,
  onProcess: (toast) => {
    // Add toast to visible list
    setToasts(current => [...current, toast]);
  },
  onRemove: (id) => {
    // Remove toast from visible list
    setToasts(current => current.filter(t => t.id !== id));
  }
});

// Add toast to queue
queue.addToQueue({
  title: 'Success',
  description: 'Operation completed',
  priority: 1
});

// Remove toast from visible list
queue.removeFromVisible('toast-id');

// Clear all queued and visible toasts
queue.clearQueue();
*/ 