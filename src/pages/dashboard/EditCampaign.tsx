'use client';

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import CampaignForm from '@/components/dashboard/CampaignForm';
import { useToast } from '@/components/ui/use-toast';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

// Sample data - would come from an API in a real app
const sampleCampaigns = [
  {
    id: '1',
    name: 'Summer Sale Promotion',
    type: 'display',
    status: 'active',
    startDate: new Date('2025-06-01'),
    endDate: new Date('2025-07-15'),
    budget: '650',
    targetAudience: 'Adults 25-54, interest in fashion and accessories',
    description: 'Summer sale promotion highlighting new arrivals and discounted items',
    goals: 'Increase website traffic and drive sales during summer season',
  },
  {
    id: '2',
    name: 'Product Launch Video',
    type: 'video',
    status: 'active',
    startDate: new Date('2025-05-15'),
    endDate: new Date('2025-06-30'),
    budget: '900',
    targetAudience: 'Tech enthusiasts, early adopters, professionals 30-45',
    description: 'Product launch campaign for our new wireless earbuds',
    goals: 'Build product awareness and generate pre-orders',
  },
  {
    id: '3',
    name: 'Blog Content Promotion',
    type: 'native',
    status: 'paused',
    startDate: new Date('2025-04-20'),
    endDate: new Date('2025-05-20'),
    budget: '325',
    targetAudience: 'Content readers, blog visitors, industry professionals',
    description: 'Promote recent blog articles on content distribution networks',
    goals: 'Increase blog readership and newsletter signups',
  },
];

const EditCampaignPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [campaign, setCampaign] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams<{ id: string }>();
  
  useDocumentTitle('Edit Campaign - A&D Studios');

  useEffect(() => {
    const fetchCampaign = async () => {
      setIsLoading(true);
      
      try {
        // In a real app, this would be an API call
        // Simulate API latency
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const foundCampaign = sampleCampaigns.find(c => c.id === id);
        
        if (!foundCampaign) {
          setError('Campaign not found');
          return;
        }
        
        setCampaign(foundCampaign);
      } catch (error) {
        console.error('Error fetching campaign:', error);
        setError('Failed to load campaign data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCampaign();
  }, [id]);

  const handleFormSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, this would save to an API/database
      console.log('Updating campaign with data:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Campaign updated",
        description: `Campaign "${data.name}" has been updated successfully.`,
      });
      
      // Redirect to campaigns list
      navigate('/dashboard/campaigns');
    } catch (error) {
      console.error('Error updating campaign:', error);
      toast({
        title: "Error",
        description: "Failed to update campaign. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (error) {
    return (
      <DashboardLayout title="Edit Campaign">
        <div className="max-w-5xl mx-auto text-center py-10">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Button onClick={() => navigate('/dashboard/campaigns')}>
            Return to Campaigns
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Edit Campaign">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Edit Ad Campaign</h1>
        
        {isLoading ? (
          <div className="space-y-6">
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-72 w-full" />
            <Skeleton className="h-72 w-full" />
          </div>
        ) : (
          <CampaignForm 
            initialData={campaign}
            onSubmit={handleFormSubmit}
            isLoading={isSubmitting}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default EditCampaignPage; 