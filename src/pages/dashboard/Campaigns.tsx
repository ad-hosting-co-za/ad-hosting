import React from 'react';
import AdCampaignsPanel from '@/components/dashboard/AdCampaignsPanel';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

const CampaignsPage = () => {
  useDocumentTitle('Ad Campaigns - A&D Studios');

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Ad Campaigns</h1>
      <AdCampaignsPanel />
    </div>
  );
};

export default CampaignsPage; 