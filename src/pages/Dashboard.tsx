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

const DashboardIndex = () => {
  // Show nothing while checking authentication
  return (
    <DashboardLayout title="Dashboard">
      <DashboardWelcome />
    </DashboardLayout>
  );
};

const Dashboard = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if not authenticated and not loading
    if (!isLoading && !user) {
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  // Show nothing while checking authentication
  if (isLoading) {
    return null;
  }

  // Protected content only shown to authenticated users
  return (
    <Routes>
      <Route index element={<DashboardIndex />} />
      <Route path="profile" element={<ProfilePage />} />
      <Route path="campaigns" element={<CampaignsPage />} />
      <Route path="campaigns/new" element={<CreateCampaignPage />} />
      <Route path="campaigns/:id" element={<CampaignDetails />} />
      <Route path="campaigns/edit/:id" element={<EditCampaignPage />} />
    </Routes>
  );
};

export default Dashboard;
