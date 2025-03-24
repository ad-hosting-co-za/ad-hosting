'use client';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabase } from '@/contexts/SupabaseContext';
import { Loader2 } from 'lucide-react';
import { hasRole } from '@/lib/supabase/client';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: string[];
  fallbackPath?: string;
}

export function RoleGuard({ children, allowedRoles, fallbackPath = '/auth/signin' }: RoleGuardProps) {
  const navigate = useNavigate();
  const { session } = useSupabase();
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    const checkPermission = async () => {
      try {
        if (!session) {
          navigate(fallbackPath);
          return;
        }

        const permitted = await hasRole(allowedRoles);
        setHasPermission(permitted);

        if (!permitted) {
          navigate(fallbackPath);
        }
      } catch (error) {
        console.error('Error checking permissions:', error);
        navigate(fallbackPath);
      } finally {
        setLoading(false);
      }
    };

    checkPermission();
  }, [session, allowedRoles, fallbackPath, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return hasPermission ? children : null;
} 