'use client';

import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Target, 
  TrendingUp, 
  Globe, 
  Users, 
  ShieldCheck, 
  CheckCircle2, 
  Layers 
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: Target,
    title: 'Targeted Audience Reach',
    description: 'Reach your perfect audience with precision targeting based on demographics, interests, and behavior patterns.'
  },
  {
    icon: BarChart3,
    title: 'Real-time Analytics',
    description: 'Track performance metrics, engagement rates, and conversion data with our comprehensive analytics dashboard.'
  },
  {
    icon: TrendingUp,
    title: 'Optimized ROI',
    description: 'Maximize your return on investment with AI-driven ad placements and automatic performance optimization.'
  },
  {
    icon: Globe,
    title: 'Global Network',
    description: 'Access our worldwide advertising network spanning thousands of premium websites and platforms.'
  },
  {
    icon: Users,
    title: 'Audience Insights',
    description: 'Gain valuable insights into your audience behavior, preferences, and engagement patterns.'
  },
  {
    icon: ShieldCheck,
    title: 'Brand Safety',
    description: 'Ensure your ads only appear alongside appropriate content with our advanced brand safety measures.'
  }
];

const plans = [
  {
    name: 'Starter',
    price: '$199',
    description: 'Essential ad hosting for small businesses',
    features: [
      '10,000 Monthly Ad Impressions',
      'Basic Targeting Options',
      'Standard Analytics Dashboard',
      'Email Support',
      '3 Ad Campaigns',
      'Weekly Performance Reports'
    ]
  },
  {
    name: 'Business',
    price: '$499',
    description: 'Professional solutions for growing companies',
    features: [
      '50,000 Monthly Ad Impressions',
      'Advanced Audience Targeting',
      'Real-time Analytics Dashboard',
      'Priority Support',
      '10 Ad Campaigns',
      'Daily Performance Reports',
      'A/B Testing Tools',
      'Remarketing Capabilities'
    ],
    popular: true
  },
  {
    name: 'Enterprise',
    price: '$999',
    description: 'Custom solutions for large organizations',
    features: [
      'Unlimited Ad Impressions',
      'Premium Targeting & Optimization',
      'Advanced Analytics with API Access',
      'Dedicated Account Manager',
      'Unlimited Ad Campaigns',
      'Custom Reporting',
      'Multi-platform Integration',
      'AI-powered Optimization',
      'Custom Audience Segments',
      'White-label Options'
    ]
  }
];

type AdFormatTab = 'display' | 'video' | 'native' | 'social';

const formatInfo = {
  display: {
    title: 'Display Advertising',
    description: 'Traditional banner ads in various sizes and formats that appear on websites, mobile apps, and other digital platforms.',
    features: [
      'Standard IAB ad sizes available',
      'Responsive design for all devices',
      'Static, animated, and interactive formats',
      'Retargeting capabilities',
      'Cross-platform compatibility'
    ],
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop'
  },
  video: {
    title: 'Video Advertising',
    description: 'Engaging video content that plays before, during, or after streaming content across various platforms and devices.',
    features: [
      'Pre-roll, mid-roll, and post-roll options',
      'Skippable and non-skippable formats',
      'Targeted placement on relevant content',
      'Interactive elements and CTAs',
      'Performance tracking and viewability metrics'
    ],
    image: 'https://images.unsplash.com/photo-1578366930553-13947a0e15e8?q=80&w=800&auto=format&fit=crop'
  },
  native: {
    title: 'Native Advertising',
    description: 'Seamlessly integrated ads that match the look, feel, and function of the platform they appear on for a non-disruptive experience.',
    features: [
      'Content recommendations',
      'Sponsored content',
      'In-feed placements',
      'Higher engagement rates',
      'Brand storytelling opportunities'
    ],
    image: 'https://images.unsplash.com/photo-1599423423923-669517b5f406?q=80&w=800&auto=format&fit=crop'
  },
  social: {
    title: 'Social Media Advertising',
    description: 'Strategic ad placements across major social media platforms to reach audiences where they are most engaged.',
    features: [
      'Platform-specific ad formats',
      'Audience targeting based on interests',
      'Retargeting website visitors',
      'Community engagement options',
      'Integrated with our main analytics dashboard'
    ],
    image: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?q=80&w=800&auto=format&fit=crop'
  }
};

const AdHosting = () => {
  const [activeTab, setActiveTab] = useState<AdFormatTab>('display');

  return (
    <div className="min-h-screen py-20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Powerful Ad Hosting Solutions
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Drive conversions, increase brand awareness, and grow your business with our professional ad hosting platform.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              Start Your Campaign
            </Button>
            <Button size="lg" variant="outline" className="border-muted hover:bg-accent/10">
              View Demo
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Ad Formats Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Ad Formats That Drive Results</h2>
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as AdFormatTab)} className="w-full max-w-5xl mx-auto">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="display">Display Ads</TabsTrigger>
            <TabsTrigger value="video">Video Ads</TabsTrigger>
            <TabsTrigger value="native">Native Ads</TabsTrigger>
            <TabsTrigger value="social">Social Ads</TabsTrigger>
          </TabsList>
          
          {Object.entries(formatInfo).map(([key, format]) => (
            <TabsContent key={key} value={key} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  <h3 className="text-2xl font-semibold">{format.title}</h3>
                  <p className="text-muted-foreground">{format.description}</p>
                  <ul className="space-y-2 mt-4">
                    {format.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-6">Learn More</Button>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="rounded-lg overflow-hidden border border-border relative h-[300px]">
                    <img 
                      src={format.image} 
                      alt={format.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                  </div>
                </motion.div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16 bg-muted/10 rounded-xl">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Ad Platform</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full border-border hover:border-primary/50 transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-blue-500">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Create Your Campaign</h3>
            <p className="text-muted-foreground">Define your goals, target audience, and select your ad formats.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-purple-500">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Upload & Optimize</h3>
            <p className="text-muted-foreground">Upload your creative assets and let our system optimize them for performance.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-pink-500/10 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-pink-500">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Track & Scale</h3>
            <p className="text-muted-foreground">Monitor performance in real-time and scale your successful campaigns.</p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Pricing Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              <Card className={cn(
                'h-full border-border hover:border-primary/50 transition-all duration-300',
                plan.popular && 'border-primary/50 shadow-lg shadow-primary/10'
              )}>
                {plan.popular && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm px-4 py-1 rounded-full font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className={cn(
                  plan.popular && 'pt-8'
                )}>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <CardDescription className="mt-2">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={cn(
                      "w-full mt-6",
                      plan.popular 
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600" 
                        : ""
                    )}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto border border-purple-500/20"
        >
          <Layers className="h-16 w-16 mx-auto mb-6 text-purple-400" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Supercharge Your Advertising?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that are growing their audience and increasing conversions with our ad hosting platform.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="border-muted">
              Schedule Demo
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default AdHosting; 