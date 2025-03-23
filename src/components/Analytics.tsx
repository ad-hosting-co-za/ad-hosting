'use client';

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Replace with your actual GA ID
const GA_TRACKING_ID = import.meta.env.VITE_GA_ID;

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export function Analytics() {
  const location = useLocation();

  useEffect(() => {
    if (!GA_TRACKING_ID) return;

    // Load Google Analytics Script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', GA_TRACKING_ID);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!GA_TRACKING_ID || !window.gtag) return;

    window.gtag('config', GA_TRACKING_ID, {
      page_path: location.pathname + location.search,
    });
  }, [location]);

  return null;
} 