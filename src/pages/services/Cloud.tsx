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

const CloudServices = () => {
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
            Enterprise Cloud Solutions
          </h1>
          <p className="text-lg text-white/60 mb-8">
            Scale your business with our secure and reliable cloud infrastructure.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5">
              Schedule Demo
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

      {/* Solutions Tabs */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Cloud Solutions</h2>
        <Tabs defaultValue="storage" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-3 bg-white/5 border border-white/10">
            {solutions.map((solution) => (
              <TabsTrigger
                key={solution.id}
                value={solution.id}
                className="data-[state=active]:bg-blue-500"
              >
                {solution.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {solutions.map((solution) => (
            <TabsContent key={solution.id} value={solution.id}>
              <Card className="border-white/10">
                <CardHeader>
                  <CardTitle className="text-2xl text-white/90">{solution.title}</CardTitle>
                  <CardDescription className="text-white/60">
                    {solution.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {solution.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-white/80">
                        <Check className="h-5 w-5 text-blue-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-6 bg-blue-500 hover:bg-blue-600">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="border-white/10 bg-gradient-to-r from-blue-500/10 to-blue-600/10">
          <CardContent className="p-12">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Move to the Cloud?
              </h3>
              <p className="text-white/60 mb-8">
                Get started with our cloud solutions today and transform your business.
              </p>
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
                Contact Sales
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default CloudServices; 