'use client';

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingProps {
  variant?: 'spinner' | 'skeleton';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export const Loading = ({
  variant = 'spinner',
  className,
  size = 'md',
  text
}: LoadingProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  if (variant === 'skeleton') {
    return (
      <div
        className={cn(
          'animate-pulse rounded-md bg-muted',
          className
        )}
        role="status"
        aria-label="Loading"
      />
    );
  }

  return (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
      <Loader2 
        className={cn(
          'animate-spin text-primary',
          sizeClasses[size]
        )} 
      />
      {text && (
        <p className="text-sm text-muted-foreground animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
}; 