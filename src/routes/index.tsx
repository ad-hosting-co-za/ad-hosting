import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { SignIn } from '@/components/auth/SignIn';
import { SignUp } from '@/components/auth/SignUp';
import { VerifyEmail } from '@/components/auth/VerifyEmail';
import { ResetPassword } from '@/components/auth/ResetPassword';
import { UpdatePassword } from '@/components/auth/UpdatePassword';
import { UserDashboard } from '@/components/layout/UserDashboard';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { EditorLayout } from '@/components/layout/EditorLayout';
import { RoleGuard } from '@/components/auth/RoleGuard';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'signin',
        element: <SignIn />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: 'verify-email',
        element: <VerifyEmail />,
      },
      {
        path: 'reset-password',
        element: <ResetPassword />,
      },
      {
        path: 'update-password',
        element: <UpdatePassword />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <UserDashboard />,
  },
  {
    path: '/admin',
    element: (
      <RoleGuard allowedRoles={['admin']}>
        <AdminLayout />
      </RoleGuard>
    ),
  },
  {
    path: '/editor',
    element: (
      <RoleGuard allowedRoles={['editor', 'admin']}>
        <EditorLayout />
      </RoleGuard>
    ),
  },
]); 