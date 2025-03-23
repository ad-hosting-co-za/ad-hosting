'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Maximize2, Minimize2, Bug } from 'lucide-react';

interface DevPreviewProps {
  children: React.ReactNode;
}

const DevPreview = ({ children }: DevPreviewProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Override console methods to capture logs
    const originalError = console.error;
    const originalWarn = console.warn;

    console.error = (...args) => {
      setErrors(prev => [...prev, args.join(' ')].slice(-5)); // Keep last 5 errors
      originalError.apply(console, args);
    };

    console.warn = (...args) => {
      setWarnings(prev => [...prev, args.join(' ')].slice(-5)); // Keep last 5 warnings
      originalWarn.apply(console, args);
    };

    return () => {
      console.error = originalError;
      console.warn = originalWarn;
    };
  }, []);

  if (process.env.NODE_ENV !== 'development') {
    return children;
  }

  return (
    <div className="relative">
      {children}
      
      {isVisible && (
        <div 
          className={`fixed ${isExpanded ? 'inset-0' : 'bottom-4 right-4'} 
            z-50 bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg
            ${isExpanded ? 'p-6' : 'p-4'}`}
          style={{ maxHeight: isExpanded ? '100vh' : '400px' }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Bug className="h-5 w-5 text-yellow-500" />
              <h3 className="font-semibold">Dev Preview</h3>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsVisible(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-4 overflow-auto" style={{ maxHeight: isExpanded ? 'calc(100vh - 200px)' : '300px' }}>
            {errors.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-destructive">Errors</h4>
                {errors.map((error, i) => (
                  <pre key={i} className="text-sm bg-destructive/10 text-destructive p-2 rounded">
                    {error}
                  </pre>
                ))}
              </div>
            )}

            {warnings.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-yellow-500">Warnings</h4>
                {warnings.map((warning, i) => (
                  <pre key={i} className="text-sm bg-yellow-500/10 text-yellow-600 p-2 rounded">
                    {warning}
                  </pre>
                ))}
              </div>
            )}

            {errors.length === 0 && warnings.length === 0 && (
              <p className="text-sm text-muted-foreground">No issues detected</p>
            )}
          </div>
        </div>
      )}

      {!isVisible && (
        <Button
          className="fixed bottom-4 right-4 z-50"
          variant="outline"
          size="sm"
          onClick={() => setIsVisible(true)}
        >
          <Bug className="h-4 w-4 mr-2" />
          Show Dev Preview
        </Button>
      )}
    </div>
  );
};

export default DevPreview; 