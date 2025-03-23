import { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

// Define the A&D Hosting color scheme
const adHostingColors = {
  light: {
    primary: "215 100% 50%", // Bright blue
    accent: "215 100% 60%", // Lighter blue
    background: "210 40% 98%",
    foreground: "222.2 84% 4.9%",
    card: "0 0% 100%",
    "card-foreground": "222.2 84% 4.9%",
    popover: "0 0% 100%",
    "popover-foreground": "222.2 84% 4.9%",
    muted: "210 40% 96.1%",
    "muted-foreground": "215.4 16.3% 46.9%",
    border: "214.3 31.8% 91.4%",
    input: "214.3 31.8% 91.4%",
    secondary: "210 40% 96.1%",
    "secondary-foreground": "222.2 47.4% 11.2%",
    destructive: "0 84.2% 60.2%",
    "destructive-foreground": "210 40% 98%",
    ring: "215 100% 50%",
  },
  dark: {
    primary: "215 100% 50%", // Bright blue
    accent: "215 100% 60%", // Lighter blue
    background: "222.2 84% 4.9%",
    foreground: "210 40% 98%",
    card: "222.2 84% 4.9%",
    "card-foreground": "210 40% 98%",
    popover: "222.2 84% 4.9%",
    "popover-foreground": "210 40% 98%",
    muted: "217.2 32.6% 17.5%",
    "muted-foreground": "215 20.2% 65.1%",
    border: "217.2 32.6% 17.5%",
    input: "217.2 32.6% 17.5%",
    secondary: "217.2 32.6% 17.5%",
    "secondary-foreground": "210 40% 98%",
    destructive: "0 62.8% 30.6%",
    "destructive-foreground": "210 40% 98%",
    ring: "215 100% 50%",
  },
};

type ThemeContextType = {
  theme: string;
  setTheme: (theme: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Apply the A&D Hosting color scheme
  useEffect(() => {
    const root = document.documentElement;
    
    // Apply the color scheme based on the current theme
    const applyColorScheme = (theme: string) => {
      const colors = theme === "dark" ? adHostingColors.dark : adHostingColors.light;
      
      // Set CSS variables
      Object.entries(colors).forEach(([key, value]) => {
        root.style.setProperty(`--${key}`, value);
      });
    };
    
    // Initial application
    const currentTheme = localStorage.getItem("theme") || "system";
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    applyColorScheme(currentTheme === "system" ? systemTheme : currentTheme);
    
    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.attributeName === "class" &&
          (root.classList.contains("dark") || !root.classList.contains("dark"))
        ) {
          applyColorScheme(root.classList.contains("dark") ? "dark" : "light");
        }
      });
    });
    
    observer.observe(root, { attributes: true });
    
    return () => observer.disconnect();
  }, []);
  
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    return {
      theme: "system",
      setTheme: () => null,
    };
  }
  return context;
}; 