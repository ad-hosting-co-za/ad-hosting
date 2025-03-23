import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Files, Users, Server, Settings, Activity, BarChart3, Target, TrendingUp } from 'lucide-react';
import AdCampaignsPanel from './AdCampaignsPanel';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, description }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};

const DashboardWelcome: React.FC = () => {
  const { user, profile } = useAuth();
  const currentTime = new Date();
  const hour = currentTime.getHours();
  
  let greeting = "Good evening";
  if (hour < 12) {
    greeting = "Good morning";
  } else if (hour < 18) {
    greeting = "Good afternoon";
  }
  
  const displayName = profile?.username || user?.email?.split('@')[0] || "User";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{greeting}, {displayName}!</h2>
        <p className="text-muted-foreground">
          Here's an overview of your hosting account, advertising campaigns, and recent activity.
        </p>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="adcampaigns">Ad Campaigns</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard 
              title="Active Projects" 
              value="3" 
              icon={<Files className="h-4 w-4 text-muted-foreground" />} 
            />
            <StatCard 
              title="Active Campaigns" 
              value="2" 
              icon={<Target className="h-4 w-4 text-purple-500" />} 
            />
            <StatCard 
              title="Hosting Usage" 
              value="24%" 
              icon={<Server className="h-4 w-4 text-muted-foreground" />} 
              description="0.24 GB of 1 GB used"
            />
            <StatCard 
              title="Ad Performance" 
              value="+12%" 
              icon={<TrendingUp className="h-4 w-4 text-green-500" />} 
              description="CTR vs last month"
            />
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Button variant="outline" className="justify-start">
                    <Files className="mr-2 h-4 w-4" />
                    Create New Project
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Target className="mr-2 h-4 w-4" />
                    New Ad Campaign
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Server className="mr-2 h-4 w-4" />
                    Manage Hosting
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    View Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Subscription</CardTitle>
                <CardDescription>Your current plan details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Business Plan</p>
                  <p className="text-xs text-muted-foreground">Renews on Aug 1, 2025</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Storage</span>
                    <span className="font-medium">10 GB</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Bandwidth</span>
                    <span className="font-medium">100 GB/month</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Ad Impressions</span>
                    <span className="font-medium">50,000/month</span>
                  </div>
                </div>
                <Button size="sm" className="w-full">Upgrade Plan</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="adcampaigns">
          <AdCampaignsPanel />
        </TabsContent>
        
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Dashboard</CardTitle>
              <CardDescription>Traffic and conversion statistics for your projects and campaigns</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Analytics data will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recent actions and events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 rounded-md border p-4">
                  <Activity className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Logged in successfully</p>
                    <p className="text-xs text-muted-foreground">Just now</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-md border p-4">
                  <Target className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">New ad campaign created</p>
                    <p className="text-xs text-muted-foreground">Yesterday</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-md border p-4">
                  <Settings className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Profile settings updated</p>
                    <p className="text-xs text-muted-foreground">2 days ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-md border p-4">
                  <Files className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Project "E-commerce Site" created</p>
                    <p className="text-xs text-muted-foreground">4 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardWelcome;
