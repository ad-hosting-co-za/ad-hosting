'use client';

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout = ({ children, className }: LayoutProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col min-h-screen text-white">
        <Header 
          className={cn(
            'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
            isScrolled 
              ? 'bg-[#0B1120]/80 backdrop-blur-lg border-b border-white/5'
              : 'bg-transparent'
          )}
        />
        
        <main className={cn(
          'flex-1 pt-32',
          className
        )}>
          <ScrollArea className="h-full">
            {children}
          </ScrollArea>
        </main>

        <Footer className="border-t border-white/5 bg-[#0B1120]/80 backdrop-blur-lg" />
      </div>
      
      {/* Global Notifications */}
      <Toaster />
      <Sonner />
    </div>
  );
};

export default Layout; 