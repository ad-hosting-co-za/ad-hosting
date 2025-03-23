'use client';

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Calendar, 
  Clock, 
  DollarSign, 
  Edit, 
  Eye, 
  LineChart, 
  Target, 
  Tag,
  Trash
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Sample data - would come from an API in a real app
const sampleCampaigns = [
  {
    id: '1',
    name: 'Summer Sale Promotion',
    type: 'display',
    status: 'active',
    startDate: new Date('2025-06-01'),
    endDate: new Date('2025-07-15'),
    budget: 650,
    spent: 423.45,
    impressions: 12345,
    clicks: 423,
    ctr: 3.43,
    conversions: 85,
    conversionRate: 0.69,
    targetAudience: 'Adults 25-54, interest in fashion and accessories',
    description: 'Summer sale promotion highlighting new arrivals and discounted items',
    goals: 'Increase website traffic and drive sales during summer season',
    dailyStats: [
      { date: '2025-06-01', impressions: 1250, clicks: 43, spend: 65.30 },
      { date: '2025-06-02', impressions: 1320, clicks: 51, spend: 72.40 },
      { date: '2025-06-03', impressions: 1180, clicks: 39, spend: 61.25 },
      { date: '2025-06-04', impressions: 1420, clicks: 62, spend: 78.50 },
      { date: '2025-06-05', impressions: 1510, clicks: 58, spend: 75.20 },
    ]
  },
  {
    id: '2',
    name: 'Product Launch Video',
    type: 'video',
    status: 'active',
    startDate: new Date('2025-05-15'),
    endDate: new Date('2025-06-30'),
    budget: 900,
    spent: 612.80,
    impressions: 8721,
    clicks: 562,
    ctr: 6.44,
    conversions: 124,
    conversionRate: 1.42,
    targetAudience: 'Tech enthusiasts, early adopters, professionals 30-45',
    description: 'Product launch campaign for our new wireless earbuds',
    goals: 'Build product awareness and generate pre-orders',
    dailyStats: [
      { date: '2025-05-15', impressions: 950, clicks: 61, spend: 73.40 },
      { date: '2025-05-16', impressions: 1020, clicks: 69, spend: 82.30 },
      { date: '2025-05-17', impressions: 880, clicks: 52, spend: 65.75 },
      { date: '2025-05-18', impressions: 1120, clicks: 74, spend: 88.20 },
      { date: '2025-05-19', impressions: 1210, clicks: 81, spend: 95.60 },
    ]
  },
  {
    id: '3',
    name: 'Blog Content Promotion',
    type: 'native',
    status: 'paused',
    startDate: new Date('2025-04-20'),
    endDate: new Date('2025-05-20'),
    budget: 325,
    spent: 264.35,
    impressions: 5432,
    clicks: 187,
    ctr: 3.44,
    conversions: 42,
    conversionRate: 0.77,
    targetAudience: 'Content readers, blog visitors, industry professionals',
    description: 'Promote recent blog articles on content distribution networks',
    goals: 'Increase blog readership and newsletter signups',
    dailyStats: [
      { date: '2025-04-20', impressions: 520, clicks: 18, spend: 24.35 },
      { date: '2025-04-21', impressions: 580, clicks: 21, spend: 27.90 },
      { date: '2025-04-22', impressions: 490, clicks: 16, spend: 22.15 },
      { date: '2025-04-23', impressions: 610, clicks: 24, spend: 29.80 },
      { date: '2025-04-24', impressions: 650, clicks: 27, spend: 32.60 },
    ]
  },
];

const CampaignDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [campaign, setCampaign] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  useDocumentTitle(campaign ? `${campaign.name} - Campaign Details` : 'Campaign Details');

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

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      active: "bg-green-500/10 text-green-500 border-green-500/20",
      paused: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      scheduled: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      draft: "bg-slate-500/10 text-slate-500 border-slate-500/20",
      ended: "bg-red-500/10 text-red-500 border-red-500/20",
    };
    
    return (
      <Badge variant="outline" className={cn("capitalize", statusStyles[status as keyof typeof statusStyles])}>
        {status}
      </Badge>
    );
  };

  const getTypeBadge = (type: string) => {
    const typeStyles = {
      display: "bg-purple-500/10 text-purple-500 border-purple-500/20",
      video: "bg-pink-500/10 text-pink-500 border-pink-500/20",
      native: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
      social: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
    };
    
    return (
      <Badge variant="outline" className={cn("capitalize", typeStyles[type as keyof typeof typeStyles])}>
        {type}
      </Badge>
    );
  };

  if (error) {
    return (
      <DashboardLayout title="Campaign Details">
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

  if (isLoading) {
    return (
      <DashboardLayout title="Campaign Details">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-10 w-24" />
          </div>
          <Skeleton className="h-60 w-full mb-6" />
          <Skeleton className="h-96 w-full" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title={`Campaign: ${campaign.name}`}>
      <div className="max-w-6xl mx-auto">
        {/* Header with campaign name and actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">{campaign.name}</h1>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              {getStatusBadge(campaign.status)}
              {getTypeBadge(campaign.type)}
              <div className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                <span>
                  {campaign.startDate.toLocaleDateString()} - {campaign.endDate.toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate(`/dashboard/campaigns/edit/${campaign.id}`)}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button variant="destructive" size="sm">
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>

        {/* Campaign metrics cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {/* Budget card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Budget
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-blue-500/10 p-2">
                  <DollarSign className="h-4 w-4 text-blue-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    ${campaign.budget.toFixed(2)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    ${campaign.spent.toFixed(2)} spent ({Math.round((campaign.spent / campaign.budget) * 100)}%)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Impressions card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Impressions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-purple-500/10 p-2">
                  <Eye className="h-4 w-4 text-purple-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {campaign.impressions.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Total views
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Clicks card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Clicks & CTR
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-green-500/10 p-2">
                  <Target className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {campaign.clicks.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    CTR: {campaign.ctr.toFixed(2)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Conversions card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Conversions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-pink-500/10 p-2">
                  <Tag className="h-4 w-4 text-pink-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {campaign.conversions}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Rate: {campaign.conversionRate.toFixed(2)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different views */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Details</CardTitle>
                <CardDescription>
                  Overview of campaign information and targeting
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold">Description</h3>
                    <p className="mt-2 text-muted-foreground">{campaign.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold">Goals</h3>
                      <p className="mt-2 text-muted-foreground">{campaign.goals}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold">Target Audience</h3>
                      <p className="mt-2 text-muted-foreground">{campaign.targetAudience}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold">Campaign Type</h3>
                      <p className="mt-2 flex items-center">
                        {getTypeBadge(campaign.type)}
                        <span className="ml-2 text-muted-foreground">
                          {campaign.type === 'display' && 'Banner advertisements'}
                          {campaign.type === 'video' && 'Video advertisements'}
                          {campaign.type === 'native' && 'Native content integration'}
                          {campaign.type === 'social' && 'Social media promotion'}
                        </span>
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold">Timeline</h3>
                      <p className="mt-2 flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Start: {campaign.startDate.toLocaleDateString()}</span>
                      </p>
                      <p className="mt-1 flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>End: {campaign.endDate.toLocaleDateString()}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Campaign Performance Summary</CardTitle>
                <CardDescription>
                  Key metrics and recent activity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 border rounded-lg">
                  <div className="text-center mb-4">
                    <p className="text-muted-foreground text-sm">Performance Chart</p>
                    <div className="h-60 flex items-center justify-center border border-dashed rounded-md">
                      <div className="text-center">
                        <LineChart className="h-10 w-10 mx-auto text-muted-foreground opacity-50" />
                        <p className="text-muted-foreground mt-2">Campaign performance visualization would display here</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Analytics</CardTitle>
                <CardDescription>
                  Performance metrics and trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 border rounded-lg">
                  <div className="text-center mb-4">
                    <p className="text-muted-foreground text-sm">Performance Chart</p>
                    <div className="h-60 flex items-center justify-center border border-dashed rounded-md">
                      <div className="text-center">
                        <BarChart className="h-10 w-10 mx-auto text-muted-foreground opacity-50" />
                        <p className="text-muted-foreground mt-2">Detailed analytics would display here</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Daily Performance</CardTitle>
                <CardDescription>
                  Day-by-day breakdown of campaign metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="overflow-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="text-left p-3 font-medium">Date</th>
                          <th className="text-right p-3 font-medium">Impressions</th>
                          <th className="text-right p-3 font-medium">Clicks</th>
                          <th className="text-right p-3 font-medium">CTR</th>
                          <th className="text-right p-3 font-medium">Spend</th>
                        </tr>
                      </thead>
                      <tbody>
                        {campaign.dailyStats.map((day: any, index: number) => (
                          <tr key={index} className="border-t hover:bg-muted/30">
                            <td className="p-3">{day.date}</td>
                            <td className="p-3 text-right">{day.impressions.toLocaleString()}</td>
                            <td className="p-3 text-right">{day.clicks.toLocaleString()}</td>
                            <td className="p-3 text-right">
                              {((day.clicks / day.impressions) * 100).toFixed(2)}%
                            </td>
                            <td className="p-3 text-right">${day.spend.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Settings</CardTitle>
                <CardDescription>
                  View and manage your campaign configuration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end mb-4">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate(`/dashboard/campaigns/edit/${campaign.id}`)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Campaign
                  </Button>
                </div>
                
                <div className="space-y-6">
                  <div className="rounded-md border p-4">
                    <h3 className="font-medium mb-2">Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Campaign Name</p>
                        <p>{campaign.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Status</p>
                        <p>{getStatusBadge(campaign.status)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Type</p>
                        <p>{getTypeBadge(campaign.type)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Budget</p>
                        <p>${campaign.budget.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-md border p-4">
                    <h3 className="font-medium mb-2">Timeline</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Start Date</p>
                        <p>{campaign.startDate.toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">End Date</p>
                        <p>{campaign.endDate.toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-md border p-4">
                    <h3 className="font-medium mb-2">Advanced Settings</h3>
                    <p className="text-sm text-muted-foreground">
                      Additional settings would appear here in a full implementation.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default CampaignDetails; 