import React, { createContext, useContext, useEffect, useState } from 'react';
import { generateColorPalette, generateDarkColorPalette } from '@/utils/colorUtils';

interface ThemeColorContextType {
  currentColor: string;
  changeThemeColor: (color: string) => void;
  resetToDefault: () => void;
}

const ThemeColorContext = createContext<ThemeColorContextType | undefined>(undefined);

const DEFAULT_COLOR = '#0f172a'; // Default dark blue

export function ThemeColorProvider({ children }: { children: React.ReactNode }) {
  const [currentColor, setCurrentColor] = useState(DEFAULT_COLOR);

  const applyColorToCSS = (color: string) => {
    const lightPalette = generateColorPalette(color);
    const darkPalette = generateDarkColorPalette(color);
    
    // Apply light mode colors
    const root = document.documentElement;
    root.style.setProperty('--primary', lightPalette.primary);
    root.style.setProperty('--primary-foreground', lightPalette.primaryForeground);
    root.style.setProperty('--secondary', lightPalette.secondary);
    root.style.setProperty('--secondary-foreground', lightPalette.secondaryForeground);
    root.style.setProperty('--accent', lightPalette.accent);
    root.style.setProperty('--accent-foreground', lightPalette.accentForeground);
    root.style.setProperty('--muted', lightPalette.muted);
    root.style.setProperty('--muted-foreground', lightPalette.mutedForeground);
    root.style.setProperty('--border', lightPalette.border);
    root.style.setProperty('--input', lightPalette.input);
    root.style.setProperty('--ring', lightPalette.ring);
    root.style.setProperty('--sidebar-background', lightPalette.sidebarBackground);
    root.style.setProperty('--sidebar-foreground', lightPalette.sidebarForeground);
    root.style.setProperty('--sidebar-primary', lightPalette.sidebarPrimary);
    root.style.setProperty('--sidebar-primary-foreground', lightPalette.sidebarPrimaryForeground);
    root.style.setProperty('--sidebar-accent', lightPalette.sidebarAccent);
    root.style.setProperty('--sidebar-accent-foreground', lightPalette.sidebarAccentForeground);
    root.style.setProperty('--sidebar-border', lightPalette.sidebarBorder);
    root.style.setProperty('--sidebar-ring', lightPalette.sidebarRing);

    // Create or update style element for dark mode
    let darkStyleElement = document.getElementById('dynamic-dark-theme');
    if (!darkStyleElement) {
      darkStyleElement = document.createElement('style');
      darkStyleElement.id = 'dynamic-dark-theme';
      document.head.appendChild(darkStyleElement);
    }

    darkStyleElement.textContent = `
      .dark {
        --primary: ${darkPalette.primary};
        --primary-foreground: ${darkPalette.primaryForeground};
        --secondary: ${darkPalette.secondary};
        --secondary-foreground: ${darkPalette.secondaryForeground};
        --accent: ${darkPalette.accent};
        --accent-foreground: ${darkPalette.accentForeground};
        --muted: ${darkPalette.muted};
        --muted-foreground: ${darkPalette.mutedForeground};
        --border: ${darkPalette.border};
        --input: ${darkPalette.input};
        --ring: ${darkPalette.ring};
        --sidebar-background: ${darkPalette.sidebarBackground};
        --sidebar-foreground: ${darkPalette.sidebarForeground};
        --sidebar-primary: ${darkPalette.sidebarPrimary};
        --sidebar-primary-foreground: ${darkPalette.sidebarPrimaryForeground};
        --sidebar-accent: ${darkPalette.sidebarAccent};
        --sidebar-accent-foreground: ${darkPalette.sidebarAccentForeground};
        --sidebar-border: ${darkPalette.sidebarBorder};
        --sidebar-ring: ${darkPalette.sidebarRing};
      }
    `;
  };

  const changeThemeColor = (color: string) => {
    setCurrentColor(color);
    applyColorToCSS(color);
    // Save to localStorage for persistence
    localStorage.setItem('theme-color', color);
  };

  const resetToDefault = () => {
    changeThemeColor(DEFAULT_COLOR);
    localStorage.removeItem('theme-color');
  };

  useEffect(() => {
    // Load saved color from localStorage on mount
    const savedColor = localStorage.getItem('theme-color');
    if (savedColor) {
      setCurrentColor(savedColor);
      applyColorToCSS(savedColor);
    }
  }, []);

  const value = {
    currentColor,
    changeThemeColor,
    resetToDefault,
  };

  return (
    <ThemeColorContext.Provider value={value}>
      {children}
    </ThemeColorContext.Provider>
  );
}

export function useThemeColor() {
  const context = useContext(ThemeColorContext);
  if (context === undefined) {
    throw new Error('useThemeColor must be used within a ThemeColorProvider');
  }
  return context;
}