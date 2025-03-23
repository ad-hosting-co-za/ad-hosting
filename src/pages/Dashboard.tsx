'use client';

import { useEffect } from 'react';
import { useNavigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardWelcome from '@/components/dashboard/DashboardWelcome';
import ProfilePage from '@/pages/dashboard/Profile';
import CampaignsPage from '@/pages/dashboard/Campaigns';
import CreateCampaignPage from '@/pages/dashboard/CreateCampaign';
import EditCampaignPage from '@/pages/dashboard/EditCampaign';
import CampaignDetails from '@/pages/dashboard/CampaignDetails';
import { Loader2 } from 'lucide-react';

const DashboardIndex = () => {
  return <DashboardWelcome />;
};

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
    return null;
  }

  return (
    <DashboardLayout>
      <Routes>
        <Route index element={<DashboardIndex />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="campaigns" element={<CampaignsPage />} />
        <Route path="campaigns/new" element={<CreateCampaignPage />} />
        <Route path="campaigns/:id" element={<CampaignDetails />} />
        <Route path="campaigns/edit/:id" element={<EditCampaignPage />} />
      </Routes>
    </DashboardLayout>
  );
};

export default Dashboard;
