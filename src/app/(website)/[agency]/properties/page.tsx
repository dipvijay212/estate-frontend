import React from 'react';
import { Metadata } from 'next';
import { mockThemes } from '@/features/website/constants/mockTheme';
import { StructuredData } from '@/features/website/components/StructuredData';
import AgencyPropertiesClient from './PropertiesClient';

export async function generateMetadata({ params }: { params: { agency: string } }): Promise<Metadata> {
  const theme = mockThemes[params.agency] || mockThemes['royal'];
  return {
    title: `Properties for Sale & Rent | ${theme.businessName}`,
    description: `Browse luxury properties, apartments, and commercial spaces listed by ${theme.businessName}.`,
    openGraph: {
      title: `Properties | ${theme.businessName}`,
      description: `Browse properties listed by ${theme.businessName}.`,
      url: `https://${params.agency}.realtyflow.app/properties`,
    }
  };
}

export default function AgencyPropertiesPage({ params }: { params: { agency: string } }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `https://${params.agency}.realtyflow.app`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Properties",
        "item": `https://${params.agency}.realtyflow.app/properties`
      }
    ]
  };

  return (
    <>
      <StructuredData data={jsonLd} />
      <AgencyPropertiesClient params={params} />
    </>
  );
}
