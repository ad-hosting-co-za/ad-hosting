'use client';

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Twitter, Instagram, Linkedin, Github, Send } from 'lucide-react';

const Footer = () => {
  const navigation = {
    solutions: [
      { name: 'Web Hosting', href: '/services/hosting' },
      { name: 'Migration', href: '/services/migration' },
      { name: 'Cloud Services', href: '/services/cloud' },
      { name: 'Development', href: '/services/development' },
    ],
    support: [
      { name: 'Documentation', href: '/docs' },
      { name: 'Guides', href: '/guides' },
      { name: 'API Status', href: '/status' },
      { name: 'Contact', href: '/contact' },
    ],
    company: [
      { name: 'About', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
    ],
    social: [
      { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
      { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
      { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
      { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
      { name: 'GitHub', icon: Github, href: 'https://github.com' },
    ],
  };

  return (
    <footer className="bg-[#0B1120] border-t border-white/5">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <Link to="/" className="text-3xl font-bold text-white hover:text-blue-400 transition-colors">
                A&D Studios
              </Link>
            </motion.div>
            
            <p className="text-white/60 text-sm max-w-md mb-8">
              Professional web hosting and migration services. Transform your digital presence with our expert solutions.
            </p>
            
            {/* Newsletter */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-white/80">Subscribe to our newsletter</h3>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="h-10 bg-white/5 border-white/10 text-white/80 placeholder:text-white/40"
                />
                <Button size="icon" className="h-10 w-10 bg-blue-500 hover:bg-blue-600">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Navigation Columns */}
          <div>
            <h3 className="text-sm font-semibold text-white/80 mb-4">Solutions</h3>
            <ul className="space-y-3">
              {navigation.solutions.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-sm text-white/60 hover:text-blue-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white/80 mb-4">Support</h3>
            <ul className="space-y-3">
              {navigation.support.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-sm text-white/60 hover:text-blue-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white/80 mb-4">Company</h3>
            <ul className="space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-sm text-white/60 hover:text-blue-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-white/40">
              &copy; {new Date().getFullYear()} A&D Studios. All rights reserved.
            </p>

            <div className="flex gap-6">
              {navigation.social.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 hover:text-blue-400 transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{item.name}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
