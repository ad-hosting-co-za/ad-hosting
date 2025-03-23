import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import AdCampaignsPanel from '@/components/dashboard/AdCampaignsPanel';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

const CampaignsPage = () => {
  useDocumentTitle('Ad Campaigns - A&D Studios');

  return (
    <DashboardLayout title="Ad Campaigns">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Ad Campaigns</h1>
        <AdCampaignsPanel />
      </div>
    </DashboardLayout>
  );
};

export default CampaignsPage; 