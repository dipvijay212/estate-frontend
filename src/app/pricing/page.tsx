import React from 'react';
import { Metadata } from 'next';
import { Navbar } from '@/components/Navbar/Navbar';
import { Footer } from '@/components/Footer/Footer';
import { PricingPreviewSection } from '@/features/landing/components/PricingPreviewSection';
import { PricingTable } from '@/features/pricing/components/PricingTable';
import { FaqSection } from '@/features/landing/components/FaqSection';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pricing | RealtyFlow',
  description: 'Simple, transparent pricing for real estate agencies of all sizes.',
};

export default function PricingPage() {
  return (
    <main id="main-content" className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Spacer for fixed navbar */}
      <div className="h-[80px]"></div>

      {/* Hero / Pricing Cards Section */}
      <div className="pt-8">
        <PricingPreviewSection />
      </div>

      {/* Detailed Feature Comparison */}
      <PricingTable />
      
      {/* FAQ Section */}
      <FaqSection />

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-white/10 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">Start your 14-day free trial</h2>
          <p className="text-primary-foreground/90 text-lg mb-10 max-w-xl mx-auto font-medium">
            No credit card required. Setup takes less than 5 minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto h-14 px-8 text-base font-bold shadow-xl hover:scale-105 transition-transform">
              Get Started for Free
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-base font-bold border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 transition-colors">
              <Link href="/contact" className="flex items-center">
                Contact Sales <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
