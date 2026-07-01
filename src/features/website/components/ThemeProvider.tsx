'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { AgencyThemeConfig } from '../types/theme';
import { mockThemes } from '../constants/mockTheme';

// Helper to convert hex to HSL for Tailwind CSS variable compatibility
function hexToHSL(hex: string): string {
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }
  
  let rNormalized = r / 255;
  let gNormalized = g / 255;
  let bNormalized = b / 255;
  
  let cmin = Math.min(rNormalized, gNormalized, bNormalized),
      cmax = Math.max(rNormalized, gNormalized, bNormalized),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

  if (delta == 0) h = 0;
  else if (cmax == rNormalized) h = ((gNormalized - bNormalized) / delta) % 6;
  else if (cmax == gNormalized) h = (bNormalized - rNormalized) / delta + 2;
  else h = (rNormalized - gNormalized) / delta + 4;

  h = Math.round(h * 60);
  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return `${h} ${s}% ${l}%`;
}

const AgencyThemeContext = createContext<AgencyThemeConfig | null>(null);

export function useAgencyTheme() {
  const context = useContext(AgencyThemeContext);
  if (!context) {
    throw new Error('useAgencyTheme must be used within a ThemeProvider');
  }
  return context;
}

export function ThemeProvider({ agency, children }: { agency: string, children: React.ReactNode }) {
  // In a real app, this would be fetched from an API using react-query or SWR
  // For now, we fall back to 'royal' if the slug isn't found in our mock data
  const themeConfig = mockThemes[agency] || mockThemes['royal'];

  const cssVariables = useMemo(() => {
    return {
      '--primary': hexToHSL(themeConfig.colors.primary),
      // We can also override secondary, radius, or custom fonts here
      // For this system, overriding primary drives the entire Tailwind theme!
    } as React.CSSProperties;
  }, [themeConfig.colors.primary]);

  return (
    <AgencyThemeContext.Provider value={themeConfig}>
      {/* 
        By injecting the CSS variables here, every child component using Tailwind's 
        bg-primary or text-primary will instantly adapt to the agency's brand color!
      */}
      <div style={cssVariables} className="min-h-screen flex flex-col font-sans text-foreground">
        {children}
      </div>
    </AgencyThemeContext.Provider>
  );
}
