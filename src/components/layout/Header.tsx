'use client';

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';
import { Menu, X, Sun, Moon, Monitor, ChevronDown } from 'lucide-react';
import { OptimizedImage } from '@/components/ui/optimized-image';

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { 
      name: 'Services',
      href: '/services',
      dropdown: [
        { name: 'Web Hosting', href: '/services/hosting' },
        { name: 'Cloud Services', href: '/services/cloud' },
        { name: 'Ad Hosting', href: '/services/adhosting' },
        { name: 'Website Migration', href: '/services/migration' },
        { name: 'Development', href: '/services/development' },
      ]
    },
    { 
      name: 'About',
      href: '/about',
      dropdown: [
        { name: 'Our Story', href: '/about' },
        { name: 'Team', href: '/about/team' },
        { name: 'Careers', href: '/about/careers' },
      ]
    },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      'bg-[#0B1120]/80 backdrop-blur-md border-b border-white/5',
      className
    )}>
      <div className="container h-20 mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center relative w-[200px] h-[70px]"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            <OptimizedImage
              src="/A&D-Studios33.png"
              alt="A&D Studios Logo"
              className="w-full h-full object-contain filter brightness-110"
              priority
              aspectRatio="3/1"
            />
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navigation.map((item) => (
            item.dropdown ? (
              <DropdownMenu key={item.name}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      'text-base font-medium transition-colors hover:text-blue-400',
                      'text-white/80 hover:bg-white/5',
                      isActive(item.href) && 'text-blue-400'
                    )}
                  >
                    {item.name}
                    <ChevronDown className="ml-1 h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="w-48 bg-[#0B1120] border border-white/5"
                >
                  {item.dropdown.map((subItem) => (
                    <DropdownMenuItem
                      key={subItem.name}
                      className="text-white/80 hover:text-blue-400 hover:bg-white/5 focus:bg-white/5"
                      asChild
                    >
                      <Link to={subItem.href}>
                        {subItem.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'text-base font-medium transition-colors',
                  'text-white/80 hover:text-blue-400',
                  isActive(item.href) && 'text-blue-400'
                )}
              >
                {item.name}
              </Link>
            )
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-6">
          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              className="text-white/80 hover:text-blue-400 hover:bg-white/5"
            >
              <Link to="/auth?mode=sign-in">Sign In</Link>
            </Button>
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Link to="/auth?mode=sign-up">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white/80"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[400px] bg-[#0B1120] border-l border-white/5"
            >
              <nav className="flex flex-col gap-4">
                {navigation.map((item) => (
                  <div key={item.name}>
                    {item.dropdown ? (
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium text-white/80">
                          {item.name}
                        </h3>
                        <div className="pl-4 space-y-2">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.href}
                              onClick={() => setIsOpen(false)}
                              className={cn(
                                'block text-base transition-colors',
                                'text-white/60 hover:text-blue-400',
                                isActive(subItem.href) && 'text-blue-400'
                              )}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          'text-lg font-medium transition-colors',
                          'text-white/80 hover:text-blue-400',
                          isActive(item.href) && 'text-blue-400'
                        )}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
                <hr className="my-4 border-white/5" />
                <Button
                  variant="ghost"
                  className="w-full text-white/80 hover:text-blue-400 hover:bg-white/5"
                  asChild
                >
                  <Link to="/auth?mode=sign-in" onClick={() => setIsOpen(false)}>
                    Sign In
                  </Link>
                </Button>
                <Button
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                  asChild
                >
                  <Link to="/auth?mode=sign-up" onClick={() => setIsOpen(false)}>
                    Get Started
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
