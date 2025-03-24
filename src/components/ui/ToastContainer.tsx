import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useToastContext } from '@/contexts/ToastContext';
import { ToastAnimation } from './ToastAnimation';

interface ToastContainerProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  limit?: number;
  gap?: number;
}

const TOAST_LIMIT = 5;
const TOAST_REMOVE_DELAY = 300;

export function ToastContainer({ 
  position = 'top-right',
  limit = TOAST_LIMIT,
  gap = 12
}: ToastContainerProps) {
  const { toasts, removeToast } = useToastContext();
  const [heights, setHeights] = React.useState<Record<string, number>>({});

  // Calculate offset for each toast based on heights of previous toasts
  const getOffset = (index: number) => {
    const toastIds = Object.keys(heights).slice(0, index);
    return toastIds.reduce((total, id) => total + (heights[id] || 0) + gap, 0);
  };

  // Handle toast removal with animation
  const handleRemove = (id: string) => {
    setTimeout(() => removeToast(id), TOAST_REMOVE_DELAY);
  };

  // Update height when toast is measured
  const updateHeight = (id: string, height: number) => {
    setHeights((prev) => ({
      ...prev,
      [id]: height,
    }));
  };

  // Get visible toasts
  const visibleToasts = toasts.slice(0, limit);

  return (
    <div
      className="fixed z-50 flex flex-col"
      style={{
        ...{
          'top-right': { top: 20, right: 20 },
          'top-left': { top: 20, left: 20 },
          'bottom-right': { bottom: 20, right: 20 },
          'bottom-left': { bottom: 20, left: 20 }
        }[position]
      }}
    >
      <AnimatePresence mode="sync">
        {visibleToasts.map((toast, index) => (
          <motion.div
            key={toast.id}
            layout
            style={{
              position: 'absolute',
              width: '100%',
              transform: `translateY(${getOffset(index)}px)`,
              transition: 'transform 200ms ease-out'
            }}
            onLayoutMeasure={(measured) => {
              updateHeight(toast.id, measured.height);
            }}
          >
            <ToastAnimation
              toast={toast}
              onClose={() => handleRemove(toast.id)}
              position={position}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// Example usage:
/*
<ToastContainer
  position="top-right"
  limit={3}
  gap={8}
/>
*/ 