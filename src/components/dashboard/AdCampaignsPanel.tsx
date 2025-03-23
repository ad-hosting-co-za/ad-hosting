'use client';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  ChevronRight, 
  Edit, 
  Eye, 
  MoreHorizontal, 
  PieChart, 
  Plus, 
  Search, 
  Trash2, 
  TrendingUp 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// Sample data
const campaigns = [
  {
    id: '1',
    name: 'Summer Sale Promotion',
    status: 'active',
    type: 'display',
    impressions: 12345,
    clicks: 423,
    ctr: 3.43,
    spend: 642.50,
    startDate: '2025-06-01',
    endDate: '2025-07-15',
  },
  {
    id: '2',
    name: 'Product Launch Video',
    status: 'active',
    type: 'video',
    impressions: 8721,
    clicks: 562,
    ctr: 6.44,
    spend: 895.20,
    startDate: '2025-05-15',
    endDate: '2025-06-30',
  },
  {
    id: '3',
    name: 'Blog Content Promotion',
    status: 'paused',
    type: 'native',
    impressions: 5432,
    clicks: 187,
    ctr: 3.44,
    spend: 321.75,
    startDate: '2025-04-20',
    endDate: '2025-05-20',
  },
  {
    id: '4',
    name: 'Social Media Engagement',
    status: 'scheduled',
    type: 'social',
    impressions: 0,
    clicks: 0,
    ctr: 0,
    spend: 0,
    startDate: '2025-07-01',
    endDate: '2025-08-15',
  },
  {
    id: '5',
    name: 'Holiday Special Offer',
    status: 'draft',
    type: 'display',
    impressions: 0,
    clicks: 0,
    ctr: 0,
    spend: 0,
    startDate: '',
    endDate: '',
  },
];

const AdCampaignsPanel = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const navigate = useNavigate();
  
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Ad Campaigns</h2>
        <Button 
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          onClick={() => navigate('/dashboard/campaigns/new')}
        >
          <Plus className="mr-2 h-4 w-4" /> New Campaign
        </Button>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Campaigns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="mr-4 rounded-full bg-purple-500/10 p-2">
                <Calendar className="h-4 w-4 text-purple-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {campaigns.filter(c => c.status === 'active').length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Running right now
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Impressions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="mr-4 rounded-full bg-pink-500/10 p-2">
                <Eye className="h-4 w-4 text-pink-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {campaigns.reduce((sum, c) => sum + c.impressions, 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Across all campaigns
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average CTR
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="mr-4 rounded-full bg-blue-500/10 p-2">
                <TrendingUp className="h-4 w-4 text-blue-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {(campaigns
                    .filter(c => c.ctr > 0)
                    .reduce((sum, c) => sum + c.ctr, 0) / 
                    campaigns.filter(c => c.ctr > 0).length
                  ).toFixed(2)}%
                </div>
                <p className="text-xs text-muted-foreground">
                  Click-through rate
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search campaigns..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Campaigns Table */}
      <Card>
        <CardHeader>
          <CardTitle>Your Campaigns</CardTitle>
          <CardDescription>
            Manage and monitor all your advertising campaigns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Impressions</TableHead>
                <TableHead className="text-right">Clicks</TableHead>
                <TableHead className="text-right">CTR</TableHead>
                <TableHead className="text-right">Spend</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCampaigns.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                    No campaigns found
                  </TableCell>
                </TableRow>
              ) : (
                filteredCampaigns.map(campaign => (
                  <TableRow key={campaign.id}>
                    <TableCell className="font-medium">
                      <div>
                        {campaign.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {campaign.startDate && campaign.endDate 
                          ? `${new Date(campaign.startDate).toLocaleDateString()} - ${new Date(campaign.endDate).toLocaleDateString()}`
                          : 'No dates set'
                        }
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                    <TableCell>{getTypeBadge(campaign.type)}</TableCell>
                    <TableCell className="text-right">{campaign.impressions.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{campaign.clicks.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{campaign.ctr.toFixed(2)}%</TableCell>
                    <TableCell className="text-right">${campaign.spend.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => navigate(`/dashboard/campaigns/${campaign.id}`)}>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View Details</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => navigate(`/dashboard/campaigns/edit/${campaign.id}`)}>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit Campaign</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <PieChart className="mr-2 h-4 w-4" />
                            <span>View Analytics</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* View More Link */}
      <div className="text-center">
        <Button 
          variant="link" 
          className="gap-1 text-muted-foreground hover:text-primary"
          onClick={() => navigate('/dashboard/campaigns')}
        >
          View All Campaigns
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default AdCampaignsPanel; 