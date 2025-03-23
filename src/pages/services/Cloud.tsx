'use client';

import { motion } from 'framer-motion';
import { Cloud, Server, Shield, Cpu, BarChart, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { OptimizedImage } from '@/components/ui/optimized-image';

const features = [
  {
    icon: Cloud,
    title: 'Cloud Storage',
    description: 'Secure and scalable cloud storage solutions with instant access from anywhere.'
  },
  {
    icon: Server,
    title: 'Virtual Servers',
    description: 'High-performance virtual servers with dedicated resources and full root access.'
  },
  {
    icon: Shield,
    title: 'Security',
    description: 'Enterprise-grade security with encryption, firewalls, and regular security audits.'
  },
  {
    icon: Cpu,
    title: 'Auto Scaling',
    description: 'Automatic resource scaling based on your application\'s demands.'
  },
  {
    icon: BarChart,
    title: 'Analytics',
    description: 'Real-time monitoring and analytics for all your cloud resources.'
  },
  {
    icon: Settings,
    title: 'Management Tools',
    description: 'Comprehensive management tools for complete control over your cloud infrastructure.'
  }
];

const solutions = [
  {
    id: 'storage',
    title: 'Cloud Storage',
    description: 'Secure and scalable storage solutions',
    features: [
      'Unlimited storage capacity',
      'Automatic backup and sync',
      'File versioning',
      'End-to-end encryption',
      'Team collaboration tools',
      'API access'
    ]
  },
  {
    id: 'compute',
    title: 'Cloud Compute',
    description: 'High-performance computing resources',
    features: [
      'Dedicated vCPUs',
      'Flexible RAM allocation',
      'SSD storage',
      'Load balancing',
      'Auto-scaling',
      'Container support'
    ]
  },
  {
    id: 'database',
    title: 'Cloud Database',
    description: 'Managed database services',
    features: [
      'Multiple database engines',
      'Automatic backups',
      'High availability',
      'Scaling options',
      'Performance monitoring',
      'Security compliance'
    ]
  }
];

const CloudPage = () => {
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
            Cloud Services
          </h1>
          <p className="text-xl text-white/80 mb-8">
            Scalable cloud solutions to power your business growth
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#1A1F2E] rounded-lg p-6"
          >
            <h2 className="text-2xl font-semibold mb-4">Cloud Storage</h2>
            <p className="text-white/70 mb-4">
              Secure and scalable storage solutions for your data needs.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <span className="text-blue-400 mr-2">✓</span>
                Unlimited storage
              </li>
              <li className="flex items-center">
                <span className="text-blue-400 mr-2">✓</span>
                Data encryption
              </li>
              <li className="flex items-center">
                <span className="text-blue-400 mr-2">✓</span>
                Global CDN
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
            <h2 className="text-2xl font-semibold mb-4">Cloud Computing</h2>
            <p className="text-white/70 mb-4">
              High-performance computing resources on demand.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <span className="text-blue-400 mr-2">✓</span>
                Pay-as-you-go
              </li>
              <li className="flex items-center">
                <span className="text-blue-400 mr-2">✓</span>
                Auto-scaling
              </li>
              <li className="flex items-center">
                <span className="text-blue-400 mr-2">✓</span>
                Load balancing
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
          <h2 className="text-3xl font-semibold mb-6">Cloud Benefits</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#1A1F2E] p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Scalability</h3>
              <p className="text-white/70">
                Scale your resources up or down based on demand
              </p>
            </div>
            <div className="bg-[#1A1F2E] p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Cost Efficiency</h3>
              <p className="text-white/70">
                Pay only for the resources you use
              </p>
            </div>
            <div className="bg-[#1A1F2E] p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Reliability</h3>
              <p className="text-white/70">
                Built-in redundancy and failover protection
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CloudPage; 