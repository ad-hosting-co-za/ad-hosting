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

const Migration = () => {
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
            Website Migration Services
          </h1>
          <p className="text-lg text-white/60 mb-8">
            Seamless website migration with zero downtime and guaranteed data integrity.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
              Start Migration
            </Button>
            <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5">
              Learn More
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

      {/* Process Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Migration Process</h2>
        <div className="max-w-4xl mx-auto">
          {process.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative mb-8 last:mb-0"
            >
              <Card className="border-white/10">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <CardTitle className="text-xl text-white/90">{step.title}</CardTitle>
                  </div>
                  <CardDescription className="text-white/60 mt-2">
                    {step.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {step.steps.map((item, i) => (
                      <li key={i} className="flex items-center text-white/80">
                        <ArrowRight className="h-4 w-4 text-blue-500 mr-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-white/10">
                <AccordionTrigger className="text-white/90 hover:text-blue-400">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-white/60">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="border-white/10 bg-gradient-to-r from-blue-500/10 to-blue-600/10">
          <CardContent className="p-12">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Migrate Your Website?
              </h3>
              <p className="text-white/60 mb-8">
                Get in touch with our migration experts and start your seamless transition today.
              </p>
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
                Schedule Consultation
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Migration; 