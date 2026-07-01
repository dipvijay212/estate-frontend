import React from 'react';
import { Metadata } from 'next';
import { mockThemes } from '@/features/website/constants/mockTheme';
import { StructuredData } from '@/features/website/components/StructuredData';
import { HeroSection } from '@/features/website/components/HeroSection';
import { PropertySearch } from '@/features/website/components/PropertySearch';
import { FeaturedProperties } from '@/features/website/components/FeaturedProperties';
import { CompanyAbout } from '@/features/website/components/CompanyAbout';
import { WhyChooseUs } from '@/features/website/components/WhyChooseUs';
import { Testimonials } from '@/features/website/components/Testimonials';
import { CallToAction } from '@/features/website/components/CallToAction';

export async function generateMetadata({ params }: { params: { agency: string } }): Promise<Metadata> {
  const theme = mockThemes[params.agency] || mockThemes['royal'];
  
  return {
    title: `${theme.businessName} - ${theme.tagline}`,
    description: theme.content.aboutText.substring(0, 160),
    openGraph: {
      title: `${theme.businessName} - Real Estate`,
      description: theme.content.aboutText.substring(0, 160),
      url: `https://${params.agency}.realtyflow.app`,
      siteName: theme.businessName,
      images: [
        {
          url: theme.assets.heroBanner,
          width: 1200,
          height: 630,
        }
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: theme.businessName,
      description: theme.content.aboutText.substring(0, 160),
      images: [theme.assets.heroBanner],
    }
  };
}

export default function AgencyHomePage({ params }: { params: { agency: string } }) {
  const theme = mockThemes[params.agency] || mockThemes['royal'];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": theme.businessName,
    "image": theme.logo,
    "@id": `https://${params.agency}.realtyflow.app`,
    "url": `https://${params.agency}.realtyflow.app`,
    "telephone": theme.contact.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": theme.contact.address
    }
  };

  return (
    <div className="flex flex-col">
      <StructuredData data={jsonLd} />
      {/* 1. Hero Banner */}
      <HeroSection agencyName={params.agency} />
      
      {/* 2. Property Search (Overlaps Hero) */}
      <PropertySearch />

      {/* 3. Featured Properties */}
      <FeaturedProperties agencyName={params.agency} />

      {/* 4. About Company */}
      <CompanyAbout agencyName={params.agency} />

      {/* 5. Why Choose Us */}
      <WhyChooseUs />

      {/* 6. Testimonials */}
      <Testimonials />

      {/* 7. Call To Action */}
      <CallToAction agencyName={params.agency} />
    </div>
  );
}
