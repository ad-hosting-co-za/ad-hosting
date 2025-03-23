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
import { OptimizedImage } from '@/components/ui/optimized-image';
import { Link } from 'react-router-dom';

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

const AdHostingPage = () => {
  return (
    <div className="relative">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Ad Hosting Services
          </h1>
          <p className="text-xl text-white/80 mb-8">
            Professional ad hosting solutions for publishers and advertisers
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#1A1F2E] rounded-lg p-6"
          >
            <h2 className="text-2xl font-semibold mb-4">Publisher Solutions</h2>
            <p className="text-white/70 mb-4">
              Maximize your ad revenue with our advanced hosting platform.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <span className="text-blue-400 mr-2">✓</span>
                Ad optimization
              </li>
              <li className="flex items-center">
                <span className="text-blue-400 mr-2">✓</span>
                Real-time analytics
              </li>
              <li className="flex items-center">
                <span className="text-blue-400 mr-2">✓</span>
                Multiple ad formats
              </li>
            </ul>
            <Button className="w-full bg-blue-500 hover:bg-blue-600">
              Get Started
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-[#1A1F2E] rounded-lg p-6"
          >
            <h2 className="text-2xl font-semibold mb-4">Advertiser Solutions</h2>
            <p className="text-white/70 mb-4">
              Reach your target audience with precision and efficiency.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <span className="text-blue-400 mr-2">✓</span>
                Targeted delivery
              </li>
              <li className="flex items-center">
                <span className="text-blue-400 mr-2">✓</span>
                Performance tracking
              </li>
              <li className="flex items-center">
                <span className="text-blue-400 mr-2">✓</span>
                A/B testing
              </li>
            </ul>
            <Button className="w-full bg-blue-500 hover:bg-blue-600">
              Get Started
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <h2 className="text-3xl font-semibold mb-6">Why Choose Our Ad Hosting?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#1A1F2E] p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">High Performance</h3>
              <p className="text-white/70">
                Fast loading times and optimal ad delivery
              </p>
            </div>
            <div className="bg-[#1A1F2E] p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Advanced Analytics</h3>
              <p className="text-white/70">
                Detailed insights and reporting tools
              </p>
            </div>
            <div className="bg-[#1A1F2E] p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Compliance</h3>
              <p className="text-white/70">
                Adherence to industry standards and regulations
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdHostingPage; 