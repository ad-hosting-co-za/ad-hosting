'use client';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Skeleton } from '@/components/ui/skeleton';

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function WithAuthComponent(props: P) {
    const { user, isLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
      if (!isLoading && !user) {
        navigate('/auth');
      }
    }, [isLoading, user, navigate]);

    if (isLoading) {
      return (
        <div className="w-full h-screen flex items-center justify-center bg-background">
          <div className="space-y-4 w-full max-w-3xl px-4">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <Skeleton className="h-32" />
              <Skeleton className="h-32" />
            </div>
          </div>
        </div>
      );
    }

    if (!user) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
} 