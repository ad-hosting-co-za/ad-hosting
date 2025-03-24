import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { HelmetProvider } from 'react-helmet-async';
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Migration from "./pages/services/Migration";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import Content from "./pages/admin/Content";
import Files from "./pages/admin/Files";
import Settings from "./pages/admin/Settings";
import SupabaseStatus from "./pages/admin/SupabaseStatus";
import { AuthProvider } from "./contexts/AuthContext";
import { useEffect } from "react";
import { configService } from "./services/ConfigService";
import { memoryService } from "./services/MemoryService";
import { setupStorage } from "./supabase/storage-setup";
import { Analytics } from '@vercel/analytics/react';
import { ErrorBoundary } from "@/components/ErrorBoundary";
import DevPreview from "@/components/DevPreview";
import Layout from "@/components/layout/Layout";
import Services from "./pages/Services";
import About from "./pages/About";
import WebHosting from "./pages/services/Hosting";
import CloudServices from "./pages/services/Cloud";
import Development from "./pages/services/Development";
import AdHosting from "./pages/services/AdHosting";
import Team from "./pages/Team";
import Careers from "./pages/Careers";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import { SupabaseProvider } from "@/contexts/SupabaseContext";
import { router } from '@/routes';
import { Toaster } from '@/components/ui/toaster';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

const App = () => {
  useEffect(() => {
    const initializeApp = async () => {
      try {
        console.log('App initializing...');
        
        const loaded = await configService.loadConfigState();
        console.log(`Configuration ${loaded ? 'loaded' : 'initialized with defaults'}`);
        
        await memoryService.trackActivity('app_started', {
          env: configService.getConfig().environment,
          platform: configService.getConfig().platformInfo.type
        });

        await setupStorage();
      } catch (error) {
        console.error('Failed to initialize app:', error);
      }
    };

    initializeApp();

    return () => {
      memoryService.trackActivity('app_closed');
    };
  }, []);

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <SupabaseProvider>
              <RouterProvider router={router} />
              <DevPreview />
              <Analytics />
              <Toaster />
            </SupabaseProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default App;
