// Utility functions for color manipulation and conversion

/**
 * Convert hex color to HSL values
 */
export function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

/**
 * Adjust the lightness of a color
 */
export function adjustLightness(hsl: { h: number; s: number; l: number }, adjustment: number): string {
  const newL = Math.max(0, Math.min(100, hsl.l + adjustment));
  return `${hsl.h} ${hsl.s}% ${newL}%`;
}

/**
 * Adjust the saturation of a color
 */
export function adjustSaturation(hsl: { h: number; s: number; l: number }, adjustment: number): string {
  const newS = Math.max(0, Math.min(100, hsl.s + adjustment));
  return `${hsl.h} ${newS}% ${hsl.l}%`;
}

/**
 * Generate color palette based on a base color
 */
export function generateColorPalette(baseHex: string) {
  const baseHsl = hexToHsl(baseHex);
  
  return {
    // Primary colors
    primary: `${baseHsl.h} ${baseHsl.s}% ${Math.max(10, baseHsl.l - 40)}%`,
    primaryForeground: `${baseHsl.h} ${Math.max(10, baseHsl.s - 30)}% 98%`,
    
    // Secondary colors
    secondary: `${baseHsl.h} ${Math.max(10, baseHsl.s - 20)}% ${Math.min(96, baseHsl.l + 40)}%`,
    secondaryForeground: `${baseHsl.h} ${baseHsl.s}% ${Math.max(10, baseHsl.l - 40)}%`,
    
    // Accent colors
    accent: `${baseHsl.h} ${Math.max(10, baseHsl.s - 20)}% ${Math.min(96, baseHsl.l + 40)}%`,
    accentForeground: `${baseHsl.h} ${baseHsl.s}% ${Math.max(10, baseHsl.l - 40)}%`,
    
    // Muted colors
    muted: `${baseHsl.h} ${Math.max(5, baseHsl.s - 30)}% ${Math.min(96, baseHsl.l + 45)}%`,
    mutedForeground: `${baseHsl.h} ${Math.max(10, baseHsl.s - 35)}% 46%`,
    
    // Border and input
    border: `${baseHsl.h} ${Math.max(10, baseHsl.s - 15)}% 91%`,
    input: `${baseHsl.h} ${Math.max(10, baseHsl.s - 15)}% 91%`,
    ring: `${baseHsl.h} ${baseHsl.s}% ${Math.max(10, baseHsl.l - 35)}%`,
    
    // Sidebar colors
    sidebarBackground: `${baseHsl.h} ${Math.max(5, baseHsl.s - 40)}% 98%`,
    sidebarForeground: `${baseHsl.h} ${Math.max(5, baseHsl.s - 35)}% 26%`,
    sidebarPrimary: `${baseHsl.h} ${Math.max(10, baseHsl.s - 30)}% 10%`,
    sidebarPrimaryForeground: `${baseHsl.h} ${Math.max(5, baseHsl.s - 40)}% 98%`,
    sidebarAccent: `${baseHsl.h} ${Math.max(5, baseHsl.s - 35)}% 95%`,
    sidebarAccentForeground: `${baseHsl.h} ${Math.max(10, baseHsl.s - 30)}% 10%`,
    sidebarBorder: `${baseHsl.h} ${Math.max(10, baseHsl.s - 25)}% 91%`,
    sidebarRing: `${baseHsl.h} ${Math.min(90, baseHsl.s + 30)}% 60%`
  };
}

/**
 * Generate dark mode color palette
 */
export function generateDarkColorPalette(baseHex: string) {
  const baseHsl = hexToHsl(baseHex);
  
  return {
    // Primary colors for dark mode
    primary: `${baseHsl.h} ${Math.max(10, baseHsl.s - 20)}% 98%`,
    primaryForeground: `${baseHsl.h} ${baseHsl.s}% ${Math.max(10, baseHsl.l - 40)}%`,
    
    // Secondary colors for dark mode
    secondary: `${baseHsl.h} ${Math.max(10, baseHsl.s - 15)}% 17%`,
    secondaryForeground: `${baseHsl.h} ${Math.max(10, baseHsl.s - 20)}% 98%`,
    
    // Accent colors for dark mode
    accent: `${baseHsl.h} ${Math.max(10, baseHsl.s - 15)}% 17%`,
    accentForeground: `${baseHsl.h} ${Math.max(10, baseHsl.s - 20)}% 98%`,
    
    // Muted colors for dark mode
    muted: `${baseHsl.h} ${Math.max(10, baseHsl.s - 15)}% 17%`,
    mutedForeground: `${baseHsl.h} ${Math.max(10, baseHsl.s - 25)}% 65%`,
    
    // Border and input for dark mode
    border: `${baseHsl.h} ${Math.max(10, baseHsl.s - 15)}% 17%`,
    input: `${baseHsl.h} ${Math.max(10, baseHsl.s - 15)}% 17%`,
    ring: `${baseHsl.h} ${Math.max(15, baseHsl.s - 10)}% 83%`,
    
    // Sidebar colors for dark mode
    sidebarBackground: `${baseHsl.h} ${Math.max(10, baseHsl.s - 30)}% 10%`,
    sidebarForeground: `${baseHsl.h} ${Math.max(5, baseHsl.s - 35)}% 95%`,
    sidebarPrimary: `${baseHsl.h} ${Math.min(76, baseHsl.s + 20)}% 48%`,
    sidebarPrimaryForeground: `0 0% 100%`,
    sidebarAccent: `${baseHsl.h} ${Math.max(5, baseHsl.s - 35)}% 15%`,
    sidebarAccentForeground: `${baseHsl.h} ${Math.max(5, baseHsl.s - 35)}% 95%`,
    sidebarBorder: `${baseHsl.h} ${Math.max(5, baseHsl.s - 35)}% 15%`,
    sidebarRing: `${baseHsl.h} ${Math.min(90, baseHsl.s + 30)}% 60%`
  };
}