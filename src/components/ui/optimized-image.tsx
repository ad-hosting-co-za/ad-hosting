'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  aspectRatio?: string;
}

export function OptimizedImage({
  src,
  alt,
  className,
  priority = false,
  aspectRatio = 'auto',
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!priority) return;

    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoading(false);
    img.onerror = () => setError('Failed to load image');
  }, [src, priority]);

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        aspectRatio !== 'auto' && `aspect-[${aspectRatio}]`,
        className
      )}
    >
      {isLoading && !error && (
        <div className="absolute inset-0 bg-white/5 animate-pulse" />
      )}
      
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center bg-white/5 text-white/60">
          Failed to load image
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={cn(
            'w-full h-full object-cover transition-opacity duration-300',
            isLoading ? 'opacity-0' : 'opacity-100'
          )}
          onLoad={() => setIsLoading(false)}
          onError={() => setError('Failed to load image')}
          loading={priority ? 'eager' : 'lazy'}
          {...props}
        />
      )}
    </div>
  );
} 