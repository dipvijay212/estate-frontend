import React from 'react';
import { Metadata } from 'next';
import { mockThemes } from '@/features/website/constants/mockTheme';
import { StructuredData } from '@/features/website/components/StructuredData';
import AgencyAboutClient from './AboutClient'; // Notice we might need to change export in AboutClient to default if it's not

export async function generateMetadata({ params }: { params: { agency: string } }): Promise<Metadata> {
  const theme = mockThemes[params.agency] || mockThemes['royal'];
  return {
    title: `About Us | ${theme.businessName}`,
    description: `Learn more about ${theme.businessName}. ${theme.content.aboutText.substring(0, 100)}`,
    openGraph: {
      title: `About Us | ${theme.businessName}`,
      description: theme.content.aboutText.substring(0, 160),
      url: `https://${params.agency}.realtyflow.app/about`,
      siteName: theme.businessName,
    }
  };
}

export default function AgencyAboutPage({ params }: { params: { agency: string } }) {
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
        "name": "About Us",
        "item": `https://${params.agency}.realtyflow.app/about`
      }
    ]
  };

  return (
    <>
      <StructuredData data={jsonLd} />
      {/* Dynamic import hack or just import directly if it's a default export */}
      {/* Since I renamed page.tsx which had "export default function AgencyAboutPage", it is still a default export. */}
      {/* Wait, I can't have both exporting default. Let me rename the import. */}
      {/* The component was exported as default in AboutClient.tsx, so I can import it like this: */}
      <AgencyAboutClient params={params} />
    </>
  );
}
