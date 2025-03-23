'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

const OptimizedImage = ({
  src,
  alt,
  width = 800,
  height = 600,
  className = '',
  priority = false
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // Generate WebP URL
  const webpSrc = src.replace(/\.[^/.]+$/, '.webp');
  
  // Generate blur placeholder
  const blurDataURL = `data:image/svg+xml;base64,${Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#1A1F2E"/></svg>`
  ).toString('base64')}`;

  useEffect(() => {
    // Check if WebP is supported
    const checkWebP = async () => {
      try {
        const webP = new Image();
        webP.src = 'data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==';
        await new Promise((resolve, reject) => {
          webP.onload = resolve;
          webP.onerror = reject;
        });
        return true;
      } catch (e) {
        return false;
      }
    };

    const loadImage = async () => {
      try {
        const supportsWebP = await checkWebP();
        const img = new Image();
        img.src = supportsWebP ? webpSrc : src;
        
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });
        
        setIsLoading(false);
      } catch (e) {
        setError(true);
        setIsLoading(false);
      }
    };

    if (priority) {
      loadImage();
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              loadImage();
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: '50px' }
      );

      const imgElement = document.getElementById(`img-${src}`);
      if (imgElement) {
        observer.observe(imgElement);
      }

      return () => {
        if (imgElement) {
          observer.unobserve(imgElement);
        }
      };
    }
  }, [src, webpSrc, priority]);

  if (error) {
    return (
      <div className={`bg-white/5 flex items-center justify-center ${className}`}>
        <span className="text-white/40">Failed to load image</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <Skeleton className="w-full h-full" />
      )}
      <motion.img
        id={`img-${src}`}
        src={isLoading ? blurDataURL : src}
        alt={alt}
        width={width}
        height={height}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
};

export default OptimizedImage; 