'use client';

import { motion } from 'framer-motion';
import { Cloud, Code, Database, Globe, Server, Shield, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SEO } from '@/components/shared/SEO';

const services = [
  {
    title: 'Web Hosting',
    description: 'High-performance hosting solutions with 99.9% uptime guarantee.',
    icon: Server,
    features: ['SSD Storage', 'Free SSL', 'Daily Backups', '24/7 Support'],
    color: 'from-blue-500/20 to-blue-600/20',
  },
  {
    title: 'Cloud Services',
    description: 'Scalable cloud infrastructure for growing businesses.',
    icon: Cloud,
    features: ['Auto-scaling', 'Load Balancing', 'Container Support', 'Cloud Storage'],
    color: 'from-purple-500/20 to-purple-600/20',
  },
  {
    title: 'Website Migration',
    description: 'Seamless website migration with zero downtime.',
    icon: Database,
    features: ['Data Transfer', 'DNS Management', 'SSL Migration', 'Testing'],
    color: 'from-green-500/20 to-green-600/20',
  },
  {
    title: 'Development',
    description: 'Custom web development solutions for your business.',
    icon: Code,
    features: ['React/Next.js', 'Node.js', 'Database Design', 'API Integration'],
    color: 'from-yellow-500/20 to-yellow-600/20',
  },
  {
    title: 'Domain Management',
    description: 'Complete domain registration and management services.',
    icon: Globe,
    features: ['Domain Registration', 'DNS Management', 'Email Hosting', 'Domain Transfer'],
  },
  {
    title: 'Security',
    description: 'Advanced security solutions to protect your website.',
    icon: Shield,
    features: ['DDoS Protection', 'Malware Scanning', 'Firewall', 'SSL Certificates'],
  },
];

const Services = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <SEO 
        title="Services - A&D Studios"
        description="Explore our comprehensive web hosting and development services. From cloud solutions to website migration, we've got you covered."
      />

      <div className="container mx-auto px-6 py-16 md:py-24">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Our Services
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive web hosting and development solutions to help your business thrive in the digital world.
            </p>
          </motion.div>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="group"
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 overflow-hidden relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative z-10">
                  <CardHeader className="space-y-4">
                    <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center">
                      <service.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <CardTitle className="text-2xl">{service.title}</CardTitle>
                      <CardDescription className="text-base">
                        {service.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center text-base">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to transform your digital presence?
            </h2>
            <p className="text-lg text-muted-foreground">
              Get started with our professional hosting services today and experience the difference.
            </p>
            <Button size="lg" className="h-14 px-8 text-lg group">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Services; 