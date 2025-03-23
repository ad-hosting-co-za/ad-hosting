'use client';

import { useEffect } from 'react';
import { useNavigate, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardWelcome from '@/components/dashboard/DashboardWelcome';
import ProfilePage from '@/pages/dashboard/Profile';
import CampaignsPage from '@/pages/dashboard/Campaigns';
import CreateCampaignPage from '@/pages/dashboard/CreateCampaign';
import EditCampaignPage from '@/pages/dashboard/EditCampaign';
import CampaignDetails from '@/pages/dashboard/CampaignDetails';
import { Loader2 } from 'lucide-react';

const Dashboard = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return (
    <DashboardLayout>
      <Routes>
        <Route index element={<DashboardWelcome />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="campaigns">
          <Route index element={<CampaignsPage />} />
          <Route path="new" element={<CreateCampaignPage />} />
          <Route path=":id" element={<CampaignDetails />} />
          <Route path="edit/:id" element={<EditCampaignPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </DashboardLayout>
  );
};

export default Dashboard;
