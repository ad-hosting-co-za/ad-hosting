import { supabase } from '@/lib/supabase/client';

export type Role = 'admin' | 'editor' | 'user';

export async function getUserRole(): Promise<Role | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  
  const { data, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (error || !data) return null;
  return data.role as Role;
}

export async function setUserRole(userId: string, role: Role) {
  const { error } = await supabase
    .from('profiles')
    .update({ role })
    .eq('id', userId);

  if (error) throw error;
}

export async function hasRole(role: Role): Promise<boolean> {
  const userRole = await getUserRole();
  return userRole === role;
}

export async function hasAnyRole(roles: Role[]): Promise<boolean> {
  const userRole = await getUserRole();
  return userRole ? roles.includes(userRole) : false;
}

export const RolePolicies = {
  admin: {
    can_manage_users: true,
    can_manage_content: true,
    can_manage_settings: true,
    can_view_analytics: true,
    can_manage_roles: true,
    can_manage_files: true,
    can_manage_billing: true,
    can_access_api: true,
  },
  editor: {
    can_manage_content: true,
    can_manage_files: true,
    can_view_analytics: true,
    can_access_api: true,
  },
  user: {
    can_manage_own_content: true,
    can_view_own_analytics: true,
    can_manage_profile: true,
  },
} as const;

export type Permission = keyof typeof RolePolicies.admin;

export function getRolePermissions(role: Role): Partial<typeof RolePolicies.admin> {
  return RolePolicies[role] || {};
}

export async function hasPermission(permission: Permission): Promise<boolean> {
  const userRole = await getUserRole();
  if (!userRole) return false;
  
  const permissions = getRolePermissions(userRole);
  return !!permissions[permission];
} 