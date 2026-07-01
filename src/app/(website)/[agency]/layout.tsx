import React from 'react';
import { WebsiteNavbar } from '@/features/website/components/WebsiteNavbar';
import { WebsiteFooter } from '@/features/website/components/WebsiteFooter';
import { ThemeProvider } from '@/features/website/components/ThemeProvider';

export default function AgencyLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { agency: string };
}) {
  return (
    <ThemeProvider agency={params.agency}>
      <WebsiteNavbar />
      <main className="flex-1">
        {children}
      </main>
      <WebsiteFooter />
    </ThemeProvider>
  );
}
