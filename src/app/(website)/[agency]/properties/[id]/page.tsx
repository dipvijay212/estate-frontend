import React from 'react';
import { Metadata } from 'next';
import { mockThemes } from '@/features/website/constants/mockTheme';
import { getPropertyDetails } from '@/features/website/constants/mockData';
import { StructuredData } from '@/features/website/components/StructuredData';
import AgencyPropertyDetailsClient from './PropertyDetailsClient';

export async function generateMetadata({ params }: { params: { agency: string, id: string } }): Promise<Metadata> {
  const theme = mockThemes[params.agency] || mockThemes['royal'];
  const property = getPropertyDetails(params.id);

  return {
    title: `${property.title} - ${property.location} | ${theme.businessName}`,
    description: property.description.substring(0, 160),
    openGraph: {
      title: `${property.title} | ${property.price}`,
      description: property.description.substring(0, 160),
      url: `https://${params.agency}.realtyflow.app/properties/${params.id}`,
      images: [
        {
          url: property.gallery[0],
          width: 800,
          height: 600,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: property.title,
      images: [property.gallery[0]],
    }
  };
}

export default function AgencyPropertyDetailsPage({ params }: { params: { agency: string, id: string } }) {
  const property = getPropertyDetails(params.id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SingleFamilyResidence",
    "name": property.title,
    "description": property.description,
    "image": property.gallery,
    "url": `https://${params.agency}.realtyflow.app/properties/${params.id}`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": property.location
    },
    "numberOfRooms": property.beds + property.baths,
    "floorSize": {
      "@type": "QuantitativeValue",
      "value": property.sqft,
      "unitCode": "FTK"
    },
    "offers": {
      "@type": "Offer",
      "price": property.price.replace(/[^0-9.]/g, ''),
      "priceCurrency": "USD"
    }
  };

  return (
    <>
      <StructuredData data={jsonLd} />
      <AgencyPropertyDetailsClient params={params} />
    </>
  );
}
