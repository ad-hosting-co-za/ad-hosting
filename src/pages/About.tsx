'use client';

import { motion } from 'framer-motion';
import { Award, Users, Clock, Target } from 'lucide-react';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { SEO } from '@/components/shared/SEO';

const stats = [
  { label: 'Years Experience', value: '10+' },
  { label: 'Clients Worldwide', value: '500+' },
  { label: 'Team Members', value: '50+' },
  { label: 'Uptime', value: '99.9%' },
];

const values = [
  {
    icon: Award,
    title: 'Excellence',
    description: 'We strive for excellence in everything we do, from code quality to customer service.',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'Working together with our clients to achieve the best possible outcomes.',
  },
  {
    icon: Clock,
    title: 'Reliability',
    description: 'Dependable service and support you can count on, 24/7.',
  },
  {
    icon: Target,
    title: 'Innovation',
    description: 'Staying ahead of the curve with cutting-edge technology and solutions.',
  },
];

const About = () => {
  return (
    <>
      <SEO 
        title="About Us - A&D Studios"
        description="Learn about A&D Studios, our mission, values, and the team behind our success."
      />

      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Transforming Digital Presence Since 2014
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              A&D Studios is a leading provider of web hosting and development solutions. 
              We help businesses establish and grow their online presence with cutting-edge 
              technology and exceptional support.
            </p>
            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-square rounded-2xl overflow-hidden"
          >
            <OptimizedImage
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"
              alt="A&D Studios Team"
              className="object-cover"
              priority
            />
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Our Values</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            These core values guide everything we do and help us deliver exceptional 
            service to our clients.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-lg bg-card"
                >
                  <Icon className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-muted-foreground">
            To empower businesses with reliable, scalable, and innovative web solutions 
            that drive growth and success in the digital age. We're committed to providing 
            exceptional service and support while staying at the forefront of technology.
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default About; 