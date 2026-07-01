export interface AgencyThemeConfig {
  slug: string;
  businessName: string;
  tagline: string;
  logo: string;
  colors: {
    primary: string; // Hex format e.g. "#3b82f6"
    secondary: string; 
  };
  assets: {
    heroBanner: string;
  };
  content: {
    aboutText: string;
    footerText: string;
  };
  contact: {
    address: string;
    phone: string;
    email: string;
  };
  socialLinks: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
}
