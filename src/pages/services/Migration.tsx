'use client';

import { motion } from 'framer-motion';
import { ArrowRight, MoveRight, Clock, CheckCircle, Shield, HeartHandshake } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: MoveRight,
    title: 'Seamless Migration',
    description: 'Zero downtime migration with complete data integrity and security.'
  },
  {
    icon: Clock,
    title: 'Quick Turnaround',
    description: 'Fast and efficient migration process with minimal disruption.'
  },
  {
    icon: CheckCircle,
    title: 'Quality Assurance',
    description: 'Thorough testing and verification of all migrated content and functionality.'
  },
  {
    icon: Shield,
    title: 'Data Security',
    description: 'Enterprise-grade security measures to protect your data during migration.'
  },
  {
    icon: HeartHandshake,
    title: 'Expert Support',
    description: '24/7 support from our experienced migration specialists.'
  }
];

const process = [
  {
    title: 'Initial Assessment',
    description: 'We analyze your current hosting setup, database structure, and website requirements.',
    steps: [
      'Website architecture review',
      'Performance analysis',
      'Security assessment',
      'Content inventory',
      'Technical requirements gathering'
    ]
  },
  {
    title: 'Planning & Strategy',
    description: 'Developing a comprehensive migration strategy tailored to your needs.',
    steps: [
      'Migration timeline creation',
      'Risk assessment',
      'Backup strategy',
      'Resource allocation',
      'Communication plan'
    ]
  },
  {
    title: 'Migration Execution',
    description: 'Carefully executing the migration process with continuous monitoring.',
    steps: [
      'Data transfer initiation',
      'Database migration',
      'File system transfer',
      'DNS configuration',
      'SSL certificate setup'
    ]
  },
  {
    title: 'Testing & Verification',
    description: 'Comprehensive testing to ensure everything works as expected.',
    steps: [
      'Functionality testing',
      'Performance testing',
      'Security verification',
      'Content verification',
      'User acceptance testing'
    ]
  },
  {
    title: 'Launch & Support',
    description: 'Final deployment and ongoing support to ensure smooth operation.',
    steps: [
      'DNS propagation',
      'Final checks',
      'Performance monitoring',
      'Issue resolution',
      'Post-migration support'
    ]
  }
];

const faqs = [
  {
    question: 'How long does the migration process take?',
    answer: 'The duration varies depending on the size and complexity of your website. Typically, migrations can take anywhere from a few hours to several days. We\'ll provide you with a detailed timeline during the initial assessment.'
  },
  {
    question: 'Will my website experience any downtime?',
    answer: 'We use advanced migration techniques to ensure zero or minimal downtime. In most cases, your website remains fully operational throughout the migration process.'
  },
  {
    question: 'What happens to my existing content and data?',
    answer: 'All your content, databases, and files are carefully preserved during migration. We create multiple backups before starting the process to ensure data safety.'
  },
  {
    question: 'Do you handle custom applications and databases?',
    answer: 'Yes, we have extensive experience migrating custom applications, databases, and complex website configurations. Our team will assess your specific requirements and develop a tailored migration plan.'
  },
  {
    question: 'What support do you provide after migration?',
    answer: 'We offer comprehensive post-migration support, including monitoring, troubleshooting, and optimization. Our team remains available to address any concerns or issues that may arise.'
  }
];

const MigrationPage = () => {
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
            Website Migration Services
          </h1>
          <p className="text-xl text-white/80 mb-8">
            Seamless website migration with zero downtime
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#1A1F2E] rounded-lg p-6"
          >
            <h2 className="text-2xl font-semibold mb-4">Full Website Migration</h2>
            <p className="text-white/70 mb-4">
              Complete website transfer with all content and functionality preserved.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <span className="text-blue-400 mr-2">✓</span>
                Content transfer
              </li>
              <li className="flex items-center">
                <span className="text-blue-400 mr-2">✓</span>
                Database migration
              </li>
              <li className="flex items-center">
                <span className="text-blue-400 mr-2">✓</span>
                DNS configuration
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
            <h2 className="text-2xl font-semibold mb-4">Platform Migration</h2>
            <p className="text-white/70 mb-4">
              Transfer your website to a new platform or CMS.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <span className="text-blue-400 mr-2">✓</span>
                CMS migration
              </li>
              <li className="flex items-center">
                <span className="text-blue-400 mr-2">✓</span>
                Theme conversion
              </li>
              <li className="flex items-center">
                <span className="text-blue-400 mr-2">✓</span>
                Plugin compatibility
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
          <h2 className="text-3xl font-semibold mb-6">Migration Process</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#1A1F2E] p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Assessment</h3>
              <p className="text-white/70">
                Detailed analysis of your current website structure
              </p>
            </div>
            <div className="bg-[#1A1F2E] p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Planning</h3>
              <p className="text-white/70">
                Custom migration strategy and timeline
              </p>
            </div>
            <div className="bg-[#1A1F2E] p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Execution</h3>
              <p className="text-white/70">
                Seamless transfer with zero downtime
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MigrationPage; 