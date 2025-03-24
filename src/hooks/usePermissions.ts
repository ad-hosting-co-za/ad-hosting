import { useSupabase } from '@/contexts/SupabaseContext';
import { RolePolicies, Role } from '@/integrations/supabase/roles';

type Permission = keyof typeof RolePolicies.admin;

export function usePermissions() {
  const { user } = useSupabase();
  const userRole = user?.user_metadata?.role as Role;

  const hasPermission = (permission: Permission): boolean => {
    if (!userRole) return false;
    return RolePolicies[userRole][permission];
  };

  const hasRole = (role: Role): boolean => {
    return userRole === role;
  };

  const hasAnyRole = (roles: Role[]): boolean => {
    if (!userRole) return false;
    return roles.includes(userRole);
  };

  return {
    hasPermission,
    hasRole,
    hasAnyRole,
    userRole,
  };
} 