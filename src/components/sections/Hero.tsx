'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { ArrowRight, Code2, Cloud, Workflow } from 'lucide-react';
import { cn } from '@/lib/utils';
import { event } from '@/lib/analytics';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleGetStarted = () => {
    event({
      action: 'click',
      category: 'CTA',
      label: 'Hero - Get Started'
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const features = [
    { icon: Code2, text: 'Modern Development' },
    { icon: Cloud, text: 'Cloud Hosting' },
    { icon: Workflow, text: 'Seamless Migration' }
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background with parallax effect */}
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          src="/bACKGROUND WEB.jpg"
          alt="A&D Studios Background"
          priority
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background/80 backdrop-blur-sm" />
      </div>

      <motion.div
        className="container relative z-10 px-4 py-32 mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
          <motion.div
            className="inline-block mb-4 px-6 py-2 rounded-full bg-accent/10 text-accent"
            variants={itemVariants}
          >
            Professional Web Hosting Services
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent"
            variants={itemVariants}
          >
            Transform Your Web Presence with A&D Studios
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground mb-8"
            variants={itemVariants}
          >
            Experience seamless hosting and expert migration services tailored for modern web applications
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            variants={itemVariants}
          >
            <Button
              size="lg"
              className="group"
              onClick={handleGetStarted}
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="group"
            >
              Learn More
            </Button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={cn(
                  'glass-effect p-4 rounded-xl',
                  'transform transition-transform hover:scale-105'
                )}
                whileHover={{ y: -5 }}
                variants={itemVariants}
              >
                <feature.icon className="h-6 w-6 mb-2 mx-auto text-accent" />
                <p className="text-sm font-medium">{feature.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
