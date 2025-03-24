'use client';

import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useSupabase } from '@/contexts/SupabaseContext';
import { Loader2 } from 'lucide-react';

export function AuthLayout() {
  const navigate = useNavigate();
  const { user, loading } = useSupabase();

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return <Outlet />;
} 