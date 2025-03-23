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

const WebHosting = () => {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Professional Web Hosting Solutions
          </h1>
          <p className="text-lg text-white/60 mb-8">
            Experience lightning-fast hosting with 99.9% uptime guarantee and world-class support.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5">
              View Plans
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
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
                <Card className="feature-card h-full">
                  <CardHeader>
                    <div className="card-icon">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl text-white/90">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/60">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Choose Your Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              <Card className={cn(
                'h-full border border-white/10 hover:border-blue-500/20 transition-all duration-300',
                plan.popular && 'border-blue-500/50'
              )}>
                {plan.popular && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center">
                    <span className="bg-blue-500 text-white text-sm px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl text-white/90">{plan.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold text-white">{plan.price}</span>
                    <span className="text-white/60">/month</span>
                  </div>
                  <CardDescription className="mt-2 text-white/60">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-white/80">
                        <Check className="h-5 w-5 text-blue-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6 bg-blue-500 hover:bg-blue-600">
                    Choose {plan.name}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default WebHosting; 