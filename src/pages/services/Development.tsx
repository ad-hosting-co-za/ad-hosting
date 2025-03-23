'use client';

import { motion } from 'framer-motion';
import { Code, Laptop, Rocket, Users, Sparkles, Zap, MessageSquare, Gauge } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: Code,
    title: 'Custom Web Development',
    description: 'Tailored web solutions built with cutting-edge technologies.',
    features: [
      'Responsive Design',
      'Progressive Web Apps',
      'E-commerce Solutions',
      'Content Management Systems',
      'API Integration',
      'Performance Optimization'
    ]
  },
  {
    icon: Laptop,
    title: 'Application Development',
    description: 'Robust and scalable applications for your business needs.',
    features: [
      'Cross-platform Apps',
      'Native Applications',
      'Enterprise Solutions',
      'Cloud Integration',
      'Real-time Features',
      'Offline Capabilities'
    ]
  },
  {
    icon: Rocket,
    title: 'UI/UX Design',
    description: 'Beautiful and intuitive interfaces that users love.',
    features: [
      'User Research',
      'Wireframing',
      'Prototyping',
      'Visual Design',
      'Interaction Design',
      'Usability Testing'
    ]
  }
];

const technologies = [
  {
    category: 'Frontend',
    items: [
      { name: 'React', description: 'Modern UI development' },
      { name: 'Next.js', description: 'Server-side rendering' },
      { name: 'TypeScript', description: 'Type-safe development' },
      { name: 'Tailwind CSS', description: 'Utility-first styling' }
    ]
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js', description: 'Server runtime' },
      { name: 'Python', description: 'Application logic' },
      { name: 'PostgreSQL', description: 'Data storage' },
      { name: 'GraphQL', description: 'API development' }
    ]
  },
  {
    category: 'DevOps',
    items: [
      { name: 'Docker', description: 'Containerization' },
      { name: 'Kubernetes', description: 'Container orchestration' },
      { name: 'CI/CD', description: 'Automated deployment' },
      { name: 'AWS', description: 'Cloud infrastructure' }
    ]
  }
];

const features = [
  {
    icon: Users,
    title: 'Dedicated Team',
    description: 'Expert developers, designers, and project managers at your service.'
  },
  {
    icon: Sparkles,
    title: 'Quality Code',
    description: 'Clean, maintainable, and well-documented code following best practices.'
  },
  {
    icon: Zap,
    title: 'Fast Delivery',
    description: 'Agile development methodology for quick and efficient delivery.'
  },
  {
    icon: MessageSquare,
    title: 'Clear Communication',
    description: 'Regular updates and transparent communication throughout the project.'
  },
  {
    icon: Gauge,
    title: 'Performance Focus',
    description: 'Optimized applications for maximum speed and efficiency.'
  }
];

const DevelopmentPage = () => {
  return (
    <div className="min-h-screen pt-20 bg-[#0B1120] text-white">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Web Development Services
          </h1>
          <p className="text-xl text-white/80 mb-8">
            Custom web solutions built with cutting-edge technology
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#1A1F2E] rounded-lg p-6"
          >
            <h2 className="text-2xl font-semibold mb-4">Custom Web Development</h2>
            <p className="text-white/70 mb-4">
              Tailored web applications built to your specific requirements.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <span className="text-blue-400 mr-2">✓</span>
                Responsive design
              </li>
              <li className="flex items-center">
                <span className="text-blue-400 mr-2">✓</span>
                Modern frameworks
              </li>
              <li className="flex items-center">
                <span className="text-blue-400 mr-2">✓</span>
                SEO optimization
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
            <h2 className="text-2xl font-semibold mb-4">E-commerce Solutions</h2>
            <p className="text-white/70 mb-4">
              Powerful online stores that drive sales and growth.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <span className="text-blue-400 mr-2">✓</span>
                Payment integration
              </li>
              <li className="flex items-center">
                <span className="text-blue-400 mr-2">✓</span>
                Inventory management
              </li>
              <li className="flex items-center">
                <span className="text-blue-400 mr-2">✓</span>
                Order tracking
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
          <h2 className="text-3xl font-semibold mb-6">Our Development Process</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#1A1F2E] p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Planning</h3>
              <p className="text-white/70">
                Detailed requirements analysis and project planning
              </p>
            </div>
            <div className="bg-[#1A1F2E] p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Development</h3>
              <p className="text-white/70">
                Agile development with regular updates
              </p>
            </div>
            <div className="bg-[#1A1F2E] p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Launch</h3>
              <p className="text-white/70">
                Thorough testing and smooth deployment
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DevelopmentPage; 