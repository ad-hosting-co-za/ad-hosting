import { ComponentType } from 'react';
import { Navigate } from 'react-router-dom';
import { useSupabase } from './SupabaseContext';

type Role = 'admin' | 'editor' | 'user';

export function WithRole<P extends object>(
  WrappedComponent: ComponentType<P>,
  allowedRoles: Role[]
) {
  return function WithRoleWrapper(props: P) {
    const { user, loading } = useSupabase();

    if (loading) {
      return null;
    }

    // Get user's role from custom claims
    const userRole = user?.user_metadata?.role as Role;

    if (!user || !userRole || !allowedRoles.includes(userRole)) {
      // Redirect to home page if user doesn't have required role
      return <Navigate to="/" replace />;
    }

    return <WrappedComponent {...props} />;
  };
}

// Helper function to protect routes based on role
export function withRole<P extends object>(
  Component: ComponentType<P>,
  roles: Role[]
) {
  return WithRole(Component, roles);
} 