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

const Development = () => {
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
            Custom Development Services
          </h1>
          <p className="text-lg text-white/60 mb-8">
            Transform your ideas into reality with our expert development team.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
              Start Project
            </Button>
            <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5">
              View Portfolio
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="feature-card h-full">
                  <CardHeader>
                    <div className="card-icon">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl text-white/90">{service.title}</CardTitle>
                    <CardDescription className="text-white/60">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-white/80">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Technologies Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Technologies We Use</h2>
        <Tabs defaultValue="Frontend" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 bg-white/5 border border-white/10">
            {technologies.map((tech) => (
              <TabsTrigger
                key={tech.category}
                value={tech.category}
                className="data-[state=active]:bg-blue-500"
              >
                {tech.category}
              </TabsTrigger>
            ))}
          </TabsList>
          {technologies.map((tech) => (
            <TabsContent key={tech.category} value={tech.category}>
              <Card className="border-white/10">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tech.items.map((item, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-blue-500/20 transition-colors"
                      >
                        <h3 className="text-lg font-semibold text-white/90 mb-1">{item.name}</h3>
                        <p className="text-white/60">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
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

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="border-white/10 bg-gradient-to-r from-blue-500/10 to-blue-600/10">
          <CardContent className="p-12">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Start Your Project?
              </h3>
              <p className="text-white/60 mb-8">
                Let's discuss your requirements and create something amazing together.
              </p>
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
                Get Free Consultation
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Development; 