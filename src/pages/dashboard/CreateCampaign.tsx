'use client';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import CampaignForm from '@/components/dashboard/CampaignForm';
import { useToast } from '@/components/ui/use-toast';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

const CreateCampaignPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useDocumentTitle('Create Campaign - A&D Studios');

  const handleFormSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, this would save to an API/database
      console.log('Creating campaign with data:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Campaign created",
        description: `Campaign "${data.name}" has been created successfully.`,
      });
      
      // Redirect to campaigns list
      navigate('/dashboard/campaigns');
    } catch (error) {
      console.error('Error creating campaign:', error);
      toast({
        title: "Error",
        description: "Failed to create campaign. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout title="Create Campaign">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Create New Ad Campaign</h1>
        <CampaignForm 
          onSubmit={handleFormSubmit}
          isLoading={isSubmitting}
        />
      </div>
    </DashboardLayout>
  );
};

export default CreateCampaignPage; 