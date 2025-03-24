import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toast } from '@/contexts/ToastContext';
import { CheckCircle, XCircle, Info, AlertTriangle } from 'lucide-react';

interface ToastAnimationProps {
  toast: Toast;
  onClose: () => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

const variants = {
  initial: { opacity: 0, y: -20, scale: 0.9 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 30
    }
  },
  exit: { 
    opacity: 0, 
    y: -20, 
    scale: 0.9,
    transition: {
      duration: 0.2
    }
  }
};

const icons = {
  success: <CheckCircle className="w-5 h-5 text-green-500" />,
  error: <XCircle className="w-5 h-5 text-red-500" />,
  info: <Info className="w-5 h-5 text-blue-500" />,
  warning: <AlertTriangle className="w-5 h-5 text-yellow-500" />
};

export function ToastAnimation({ 
  toast, 
  onClose, 
  position = 'top-right' 
}: ToastAnimationProps) {
  // Handle keyboard interactions
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence mode="sync">
      <motion.div
        key={toast.id}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        role="alert"
        aria-live={toast.variant === 'destructive' ? 'assertive' : 'polite'}
        style={{
          position: 'fixed',
          ...{
            'top-right': { top: 20, right: 20 },
            'top-left': { top: 20, left: 20 },
            'bottom-right': { bottom: 20, right: 20 },
            'bottom-left': { bottom: 20, left: 20 }
          }[position],
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          minWidth: '300px',
          maxWidth: '500px'
        }}
        className={`
          rounded-lg shadow-lg 
          ${toast.variant === 'destructive' ? 'bg-destructive text-destructive-foreground' : 'bg-background'}
          p-4 border
        `}
      >
        {/* Icon */}
        <div className="mr-3 flex-shrink-0">
          {icons[toast.variant || 'info']}
        </div>

        {/* Content */}
        <div className="flex-1 mr-2">
          {toast.title && (
            <h3 className="font-semibold mb-1" id={`toast-${toast.id}-title`}>
              {toast.title}
            </h3>
          )}
          {toast.description && (
            <p 
              className="text-sm opacity-90"
              id={`toast-${toast.id}-description`}
            >
              {toast.description}
            </p>
          )}
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-2 ml-4">
          {toast.action && (
            <div className="flex-shrink-0">
              {toast.action}
            </div>
          )}
          <button
            onClick={onClose}
            className="p-1 hover:bg-secondary rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            aria-label="Close notification"
          >
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 16 16" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M4 4l8 8m0-8l-8 8" />
            </svg>
          </button>
        </div>

        {/* Progress bar */}
        {toast.duration && toast.duration !== Infinity && (
          <motion.div
            initial={{ scaleX: 1 }}
            animate={{ 
              scaleX: 0,
              transition: {
                duration: toast.duration / 1000,
                ease: 'linear'
              }
            }}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: 'currentColor',
              originX: 0,
              opacity: 0.2
            }}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={0}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
} 