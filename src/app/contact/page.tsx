import React from 'react';
import { Metadata } from 'next';
import { Navbar } from '@/components/Navbar/Navbar';
import { Footer } from '@/components/Footer/Footer';
import { ContactFormSection } from '@/features/contact/components/ContactFormSection';
import { FaqSection } from '@/features/landing/components/FaqSection';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Us | RealtyFlow',
  description: 'Get in touch with the RealtyFlow team for support, sales, or partnerships.',
};

export default function ContactPage() {
  return (
    <main id="main-content" className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Spacer for fixed navbar */}
      <div className="h-[80px]"></div>

      <ContactFormSection />
      
      <FaqSection />

      {/* Simple Call to Action Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">Ready to transform your operations?</h2>
          <p className="text-primary-foreground/80 text-lg mb-10 max-w-xl mx-auto">
            Join thousands of real estate professionals who trust RealtyFlow to manage their entire portfolio seamlessly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto h-14 px-8 text-base font-bold shadow-xl">
              Start Your Free Trial
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-base font-bold border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              <Link href="/pricing" className="flex items-center">
                View Pricing <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
