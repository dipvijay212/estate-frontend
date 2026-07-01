import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface WebsiteConfig {
  businessName: string;
  logo: string | null;
  favicon: string | null;
  primaryColor: string;
  secondaryColor: string;
  heroBanner: string | null;
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  phone: string;
  email: string;
  address: string;
  facebook: string;
  instagram: string;
  youtube: string;
  linkedin: string;
  footerText: string;
}

interface WebsiteThemeState {
  config: WebsiteConfig;
  savedConfig: WebsiteConfig;
  isDirty: boolean;
}

const initialState: WebsiteThemeState = {
  config: {
    businessName: 'RealtyFlow Agency',
    logo: null,
    favicon: null,
    primaryColor: '#0f172a',
    secondaryColor: '#3b82f6',
    heroBanner: null,
    heroTitle: 'Find Your Dream Home Today',
    heroSubtitle: 'The best properties in the most desirable neighborhoods.',
    aboutText: 'We are a premier real estate agency committed to helping you find the perfect property. With over 20 years of experience, our team of dedicated professionals will guide you every step of the way.',
    phone: '+1 (800) 555-0199',
    email: 'contact@realtyflow.com',
    address: '123 Real Estate Blvd, Suite 100, New York, NY 10001',
    facebook: 'https://facebook.com/realtyflow',
    instagram: 'https://instagram.com/realtyflow',
    youtube: 'https://youtube.com/realtyflow',
    linkedin: 'https://linkedin.com/company/realtyflow',
    footerText: '© 2026 RealtyFlow. All rights reserved.',
  },
  savedConfig: {
    businessName: 'RealtyFlow Agency',
    logo: null,
    favicon: null,
    primaryColor: '#0f172a',
    secondaryColor: '#3b82f6',
    heroBanner: null,
    heroTitle: 'Find Your Dream Home Today',
    heroSubtitle: 'The best properties in the most desirable neighborhoods.',
    aboutText: 'We are a premier real estate agency committed to helping you find the perfect property. With over 20 years of experience, our team of dedicated professionals will guide you every step of the way.',
    phone: '+1 (800) 555-0199',
    email: 'contact@realtyflow.com',
    address: '123 Real Estate Blvd, Suite 100, New York, NY 10001',
    facebook: 'https://facebook.com/realtyflow',
    instagram: 'https://instagram.com/realtyflow',
    youtube: 'https://youtube.com/realtyflow',
    linkedin: 'https://linkedin.com/company/realtyflow',
    footerText: '© 2026 RealtyFlow. All rights reserved.',
  },
  isDirty: false,
};

const websiteThemeSlice = createSlice({
  name: 'websiteTheme',
  initialState,
  reducers: {
    updateConfig: (state, action: PayloadAction<Partial<WebsiteConfig>>) => {
      state.config = { ...state.config, ...action.payload };
      state.isDirty = JSON.stringify(state.config) !== JSON.stringify(state.savedConfig);
    },
    resetConfig: (state) => {
      state.config = { ...state.savedConfig };
      state.isDirty = false;
    },
    saveConfig: (state) => {
      state.savedConfig = { ...state.config };
      state.isDirty = false;
    }
  },
});

export const { updateConfig, resetConfig, saveConfig } = websiteThemeSlice.actions;
export default websiteThemeSlice.reducer;
