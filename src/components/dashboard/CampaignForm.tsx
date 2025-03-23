'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { CalendarIcon, Target, Layers, Image, Video, PenLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Campaign name must be at least 2 characters.',
  }),
  type: z.enum(['display', 'video', 'native', 'social']),
  status: z.enum(['draft', 'scheduled', 'active', 'paused']),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  budget: z.string().min(1, { message: 'Please enter a budget amount' }),
  targetAudience: z.string().optional(),
  description: z.string().optional(),
  goals: z.string().min(1, { message: 'Please specify campaign goals' }),
});

type FormValues = z.infer<typeof formSchema>;

interface CampaignFormProps {
  initialData?: Partial<FormValues>;
  onSubmit: (data: FormValues) => void;
  isLoading?: boolean;
}

const CampaignForm = ({ 
  initialData,
  onSubmit,
  isLoading = false 
}: CampaignFormProps) => {
  const [activeTab, setActiveTab] = useState('basics');
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      type: initialData?.type || 'display',
      status: initialData?.status || 'draft',
      startDate: initialData?.startDate,
      endDate: initialData?.endDate,
      budget: initialData?.budget || '',
      targetAudience: initialData?.targetAudience || '',
      description: initialData?.description || '',
      goals: initialData?.goals || '',
    },
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  };

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>{initialData ? 'Edit Campaign' : 'Create New Campaign'}</CardTitle>
        <CardDescription>
          {initialData 
            ? 'Update your existing ad campaign details' 
            : 'Define your campaign goals, audience, and creative assets'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="basics">Basics</TabsTrigger>
            <TabsTrigger value="targeting">Targeting</TabsTrigger>
            <TabsTrigger value="creative">Creative</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
          </TabsList>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <TabsContent value="basics" className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Campaign Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Summer Sale 2025" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Campaign Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select campaign type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="display">Display</SelectItem>
                            <SelectItem value="video">Video</SelectItem>
                            <SelectItem value="native">Native</SelectItem>
                            <SelectItem value="social">Social</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="scheduled">Scheduled</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="paused">Paused</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Start Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>End Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Campaign Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your campaign's purpose and messaging..."
                          className="resize-none min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              
              <TabsContent value="targeting" className="space-y-6">
                <FormField
                  control={form.control}
                  name="targetAudience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Audience</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Define your target audience (demographics, interests, behavior)..."
                          className="resize-none min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="goals"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Campaign Goals</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="What are the primary objectives of this campaign? (e.g., brand awareness, lead generation, sales)"
                          className="resize-none min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Additional targeting fields would go here in a real implementation */}
                <div className="rounded-md border border-dashed border-muted p-6 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-3 text-lg font-medium">Advanced Targeting Options</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    In a production environment, this section would contain additional targeting
                    options like geographic regions, device types, and behavioral targeting.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="creative" className="space-y-6">
                {/* Creative assets would be handled here in a real implementation */}
                <div className="space-y-4">
                  <div className="rounded-md border border-dashed border-muted p-6 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      {form.watch('type') === 'display' && <Image className="h-6 w-6 text-primary" />}
                      {form.watch('type') === 'video' && <Video className="h-6 w-6 text-primary" />}
                      {form.watch('type') === 'native' && <PenLine className="h-6 w-6 text-primary" />}
                      {form.watch('type') === 'social' && <Layers className="h-6 w-6 text-primary" />}
                    </div>
                    <h3 className="mt-3 text-lg font-medium">Upload Creative Assets</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      In a production environment, this section would contain file upload
                      functionality for ad creatives based on the selected campaign type.
                    </p>
                    <Button variant="outline" className="mt-4">
                      Upload Files
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="budget" className="space-y-6">
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Budget</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">$</span>
                          <Input 
                            type="number" 
                            placeholder="1000" 
                            className="pl-7"
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Additional budget options would go here in a real implementation */}
                <div className="rounded-md border border-dashed border-muted p-6 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Layers className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-3 text-lg font-medium">Advanced Budget Settings</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    In a production environment, this section would contain additional budget
                    options like daily spend limits, bid strategies, and performance targets.
                  </p>
                </div>
              </TabsContent>
              
              <div className="flex justify-end space-x-4 pt-4">
                <Button 
                  variant="outline" 
                  type="button"
                  onClick={() => window.history.back()}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  {isLoading ? 'Saving...' : initialData ? 'Update Campaign' : 'Create Campaign'}
                </Button>
              </div>
            </form>
          </Form>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CampaignForm; 