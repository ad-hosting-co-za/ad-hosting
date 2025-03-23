import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Files, Users, Server, Settings, Activity, BarChart3, Target, TrendingUp, AlertCircle, CheckCircle2, Clock, Zap } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import AdCampaignsPanel from './AdCampaignsPanel';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, description, trend }) => {
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-primary">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {trend && (
          <div className="flex items-center gap-1 mt-2">
            <Badge variant={trend.isPositive ? "success" : "destructive"} className="text-xs">
              {trend.isPositive ? "+" : ""}{trend.value}%
            </Badge>
            <span className="text-xs text-muted-foreground">vs last month</span>
          </div>
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
      {/* Welcome section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{greeting}, {displayName}!</h2>
          <p className="text-muted-foreground">
            Here's an overview of your hosting account, advertising campaigns, and recent activity.
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Zap className="h-4 w-4" />
          <span>Quick Actions</span>
        </Button>
      </div>
      
      {/* Main content tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="adcampaigns">Ad Campaigns</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          {/* Stats grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard 
              title="Active Projects" 
              value="3" 
              icon={<Files className="h-4 w-4" />}
              trend={{ value: 12, isPositive: true }}
            />
            <StatCard 
              title="Active Campaigns" 
              value="2" 
              icon={<Target className="h-4 w-4" />}
              trend={{ value: 8, isPositive: true }}
            />
            <StatCard 
              title="Hosting Usage" 
              value="24%" 
              icon={<Server className="h-4 w-4" />}
              description="0.24 GB of 1 GB used"
              trend={{ value: 5, isPositive: false }}
            />
            <StatCard 
              title="Ad Performance" 
              value="+12%" 
              icon={<TrendingUp className="h-4 w-4" />}
              description="CTR vs last month"
              trend={{ value: 12, isPositive: true }}
            />
          </div>

          {/* Quick actions and subscription */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Button variant="outline" className="justify-start h-auto py-3">
                    <Files className="mr-2 h-4 w-4" />
                    <div className="flex flex-col items-start">
                      <span>Create New Project</span>
                      <span className="text-xs text-muted-foreground">Set up a new website</span>
                    </div>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto py-3">
                    <Target className="mr-2 h-4 w-4" />
                    <div className="flex flex-col items-start">
                      <span>New Ad Campaign</span>
                      <span className="text-xs text-muted-foreground">Launch a campaign</span>
                    </div>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto py-3">
                    <Server className="mr-2 h-4 w-4" />
                    <div className="flex flex-col items-start">
                      <span>Manage Hosting</span>
                      <span className="text-xs text-muted-foreground">View hosting details</span>
                    </div>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto py-3">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    <div className="flex flex-col items-start">
                      <span>View Analytics</span>
                      <span className="text-xs text-muted-foreground">Check performance</span>
                    </div>
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
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Business Plan</p>
                    <Badge variant="outline">Active</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Renews on Aug 1, 2025</p>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Storage</span>
                    <span className="font-medium">10 GB</span>
                  </div>
                  <Progress value={24} className="h-1" />
                  <div className="flex items-center justify-between text-sm">
                    <span>Bandwidth</span>
                    <span className="font-medium">100 GB/month</span>
                  </div>
                  <Progress value={45} className="h-1" />
                  <div className="flex items-center justify-between text-sm">
                    <span>Ad Impressions</span>
                    <span className="font-medium">50,000/month</span>
                  </div>
                  <Progress value={60} className="h-1" />
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
                  <div className="rounded-full bg-primary/10 p-2">
                    <Activity className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Logged in successfully</p>
                    <p className="text-xs text-muted-foreground">Just now</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-md border p-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">New ad campaign created</p>
                    <p className="text-xs text-muted-foreground">Yesterday</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-md border p-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Settings className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Profile settings updated</p>
                    <p className="text-xs text-muted-foreground">2 days ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-md border p-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Files className="h-5 w-5 text-primary" />
                  </div>
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
