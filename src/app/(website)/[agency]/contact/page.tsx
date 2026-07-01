import React from 'react';
import { Metadata } from 'next';
import { mockThemes } from '@/features/website/constants/mockTheme';
import { StructuredData } from '@/features/website/components/StructuredData';
import AgencyContactClient from './ContactClient';

export async function generateMetadata({ params }: { params: { agency: string } }): Promise<Metadata> {
  const theme = mockThemes[params.agency] || mockThemes['royal'];
  return {
    title: `Contact Us | ${theme.businessName}`,
    description: `Get in touch with ${theme.businessName}. ${theme.contact.address}. Call us at ${theme.contact.phone}`,
    openGraph: {
      title: `Contact Us | ${theme.businessName}`,
      description: `Get in touch with ${theme.businessName}.`,
      url: `https://${params.agency}.realtyflow.app/contact`,
    }
  };
}

export default function AgencyContactPage({ params }: { params: { agency: string } }) {
  const theme = mockThemes[params.agency] || mockThemes['royal'];

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
        "name": "Contact",
        "item": `https://${params.agency}.realtyflow.app/contact`
      }
    ]
  };

  return (
    <>
      <StructuredData data={jsonLd} />
      <AgencyContactClient params={params} />
    </>
  );
}
