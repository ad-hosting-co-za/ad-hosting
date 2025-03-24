'use client';

import { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  FileText,
  ImagePlus,
  Settings,
  Menu,
  X,
  LogOut,
  PlusCircle
} from 'lucide-react';
import { useSupabase } from '@/contexts/SupabaseContext';
import { cn } from '@/lib/utils';

const sidebarItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/editor'
  },
  {
    title: 'Content',
    icon: FileText,
    href: '/editor/content'
  },
  {
    title: 'Media',
    icon: ImagePlus,
    href: '/editor/media'
  },
  {
    title: 'Settings',
    icon: Settings,
    href: '/editor/settings'
  }
];

export function EditorLayout() {
  const navigate = useNavigate();
  const { signOut } = useSupabase();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/auth/signin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-screen w-64 transform bg-white shadow-lg transition-transform duration-200 ease-in-out',
          !isSidebarOpen && '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar Header */}
          <div className="flex h-16 items-center justify-between border-b px-4">
            <h2 className="text-xl font-bold">Editor Panel</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="border-b p-4">
            <Button
              className="w-full justify-start"
              onClick={() => navigate('/editor/content/new')}
            >
              <PlusCircle className="mr-2 h-5 w-5" />
              New Content
            </Button>
          </div>

          {/* Sidebar Navigation */}
          <nav className="flex-1 space-y-1 px-2 py-4">
            {sidebarItems.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                className="w-full justify-start"
                onClick={() => navigate(item.href)}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.title}
              </Button>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="border-t p-4">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handleSignOut}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={cn(
          'min-h-screen transition-all duration-200 ease-in-out',
          isSidebarOpen ? 'lg:ml-64' : ''
        )}
      >
        {/* Top Bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(true)}
              className={cn('lg:hidden', isSidebarOpen && 'hidden')}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/editor/content/new')}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              New Content
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="container mx-auto p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
} 