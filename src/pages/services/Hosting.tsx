'use client';

import { motion } from 'framer-motion';
import { Server, Cloud, Shield, Zap, Clock, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: Server,
    title: 'High-Performance Servers',
    description: 'Lightning-fast SSD storage and optimized server configurations for maximum performance.'
  },
  {
    icon: Shield,
    title: 'Advanced Security',
    description: 'DDoS protection, SSL certificates, and regular security updates to keep your site safe.'
  },
  {
    icon: Cloud,
    title: 'Cloud Infrastructure',
    description: 'Reliable cloud hosting with 99.9% uptime guarantee and automatic scaling.'
  },
  {
    icon: Zap,
    title: 'Instant Setup',
    description: 'Get your website up and running in minutes with our one-click installation tools.'
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Round-the-clock technical support from our experienced team.'
  },
  {
    icon: Database,
    title: 'Daily Backups',
    description: 'Automated daily backups with easy restore options to keep your data safe.'
  }
];

const plans = [
  {
    name: 'Starter',
    price: '$9.99',
    description: 'Perfect for personal websites and blogs',
    features: [
      '1 Website',
      '10 GB SSD Storage',
      'Unmetered Bandwidth',
      'Free SSL Certificate',
      'Daily Backups',
      '24/7 Support'
    ]
  },
  {
    name: 'Professional',
    price: '$24.99',
    description: 'Ideal for small businesses and growing websites',
    features: [
      'Unlimited Websites',
      '50 GB SSD Storage',
      'Unmetered Bandwidth',
      'Free SSL Certificate',
      'Daily Backups',
      'Priority Support',
      'Free Domain for 1 Year',
      'Advanced Security Features'
    ],
    popular: true
  },
  {
    name: 'Enterprise',
    price: '$49.99',
    description: 'For large businesses and high-traffic websites',
    features: [
      'Unlimited Websites',
      '100 GB SSD Storage',
      'Unmetered Bandwidth',
      'Wildcard SSL Certificate',
      'Hourly Backups',
      'Premium Support',
      'Free Domain Forever',
      'Advanced Security Suite',
      'Dedicated IP Address',
      'Resource Monitoring'
    ]
  }
];

const HostingPage = () => {
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
            Web Hosting Solutions
          </h1>
          <p className="text-xl text-white/80 mb-8">
            Reliable, secure, and high-performance hosting services for your website
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#1A1F2E] rounded-lg p-6"
          >
            <h2 className="text-2xl font-semibold mb-4">Shared Hosting</h2>
            <p className="text-white/70 mb-4">
              Perfect for small to medium websites with our optimized shared hosting environment.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <span className="text-blue-400 mr-2">✓</span>
                Unlimited bandwidth
              </li>
              <li className="flex items-center">
                <span className="text-blue-400 mr-2">✓</span>
                Free SSL certificates
              </li>
              <li className="flex items-center">
                <span className="text-blue-400 mr-2">✓</span>
                99.9% uptime guarantee
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
            <h2 className="text-2xl font-semibold mb-4">VPS Hosting</h2>
            <p className="text-white/70 mb-4">
              Dedicated resources and full control with our Virtual Private Servers.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <span className="text-blue-400 mr-2">✓</span>
                Dedicated resources
              </li>
              <li className="flex items-center">
                <span className="text-blue-400 mr-2">✓</span>
                Root access
              </li>
              <li className="flex items-center">
                <span className="text-blue-400 mr-2">✓</span>
                Scalable resources
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
          <h2 className="text-3xl font-semibold mb-6">Why Choose Our Hosting?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#1A1F2E] p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">High Performance</h3>
              <p className="text-white/70">
                Optimized servers and caching for lightning-fast load times
              </p>
            </div>
            <div className="bg-[#1A1F2E] p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">24/7 Support</h3>
              <p className="text-white/70">
                Expert technical support available around the clock
              </p>
            </div>
            <div className="bg-[#1A1F2E] p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Security</h3>
              <p className="text-white/70">
                Advanced security measures to protect your website
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HostingPage; 