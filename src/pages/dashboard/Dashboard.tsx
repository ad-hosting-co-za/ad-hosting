import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  Target, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  Plus,
  Clock
} from 'lucide-react';

const DashboardPage = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Total Revenue',
      value: '$12,345',
      change: '+12.3%',
      trend: 'up',
      icon: DollarSign,
    },
    {
      title: 'Active Campaigns',
      value: '8',
      change: '+2',
      trend: 'up',
      icon: Target,
    },
    {
      title: 'Total Views',
      value: '45.2K',
      change: '-3.2%',
      trend: 'down',
      icon: BarChart3,
    },
    {
      title: 'Active Users',
      value: '2.3K',
      change: '+8.1%',
      trend: 'up',
      icon: Users,
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'campaign',
      title: 'New Campaign Created',
      description: 'Summer Sale Campaign',
      time: '2 hours ago',
    },
    {
      id: 2,
      type: 'user',
      title: 'New User Registration',
      description: 'John Doe joined the platform',
      time: '4 hours ago',
    },
    {
      id: 3,
      type: 'payment',
      title: 'Payment Received',
      description: '$500 from Acme Corp',
      time: '6 hours ago',
    },
    {
      id: 4,
      type: 'update',
      title: 'Campaign Updated',
      description: 'Winter Promotion details updated',
      time: '8 hours ago',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {profile?.username || user?.email}</h1>
          <p className="text-muted-foreground">Here's what's happening with your campaigns today.</p>
        </div>
        <Button onClick={() => navigate('/dashboard/campaigns/new')}>
          <Plus className="mr-2 h-4 w-4" />
          New Campaign
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs">
                {stat.trend === 'up' ? (
                  <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
                )}
                <span className={stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                  {stat.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Campaign Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium">Summer Sale Campaign</div>
                <div className="text-sm text-muted-foreground">75%</div>
              </div>
              <Progress value={75} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium">Winter Promotion</div>
                <div className="text-sm text-muted-foreground">45%</div>
              </div>
              <Progress value={45} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium">Holiday Special</div>
                <div className="text-sm text-muted-foreground">90%</div>
              </div>
              <Progress value={90} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4">
                <div className="mt-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                </div>
                <div className="text-sm text-muted-foreground">{activity.time}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage; 