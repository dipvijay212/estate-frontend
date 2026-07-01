import { AgencyThemeConfig } from '../types/theme';

export const mockThemes: Record<string, AgencyThemeConfig> = {
  royal: {
    slug: 'royal',
    businessName: 'Royal Realty',
    tagline: 'Find Your Dream Home with the Best in Town',
    logo: 'Home', // Mocking an icon name
    colors: {
      primary: '#2563eb', // Blue-600
      secondary: '#1e40af', // Blue-800
    },
    assets: {
      heroBanner: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80',
    },
    content: {
      aboutText: 'We are a premier real estate agency specializing in luxury homes, commercial spaces, and premium apartments. With over 15 years of experience, we make finding your perfect property effortless.',
      footerText: 'Your trusted partner in finding the perfect home. Reach out to us through any of the channels below.',
    },
    contact: {
      address: '123 Beverly Hills, CA 90210',
      phone: '+1 (555) 123-4567',
      email: 'contact@royalrealty.com',
    },
    socialLinks: {
      facebook: 'https://facebook.com/royalrealty',
      instagram: 'https://instagram.com/royalrealty',
    }
  },
  shreeram: {
    slug: 'shreeram',
    businessName: 'Shree Ram Properties',
    tagline: 'Your Trusted Real Estate Partner in India',
    logo: 'Building2',
    colors: {
      primary: '#ea580c', // Orange-600 (distinctly different from royal)
      secondary: '#9a3412', // Orange-800
    },
    assets: {
      heroBanner: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=80',
    },
    content: {
      aboutText: 'Dedicated to providing the best residential and commercial spaces across the country. Integrity and trust are our foundation.',
      footerText: 'Building dreams, one property at a time.',
    },
    contact: {
      address: '45 Connaught Place, New Delhi',
      phone: '+91 98765 43210',
      email: 'hello@shreeramproperties.in',
    },
    socialLinks: {
      facebook: 'https://facebook.com/shreeramproperties',
      twitter: 'https://twitter.com/shreeramproperties',
    }
  }
};
