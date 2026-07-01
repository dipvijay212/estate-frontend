import { Navbar } from '@/components/Navbar/Navbar';
import { Footer } from '@/components/Footer/Footer';
import { HeroSection } from '@/features/landing/components/HeroSection';
import { TrustedCompaniesSection } from '@/features/landing/components/TrustedCompaniesSection';
import { FeaturesSection } from '@/features/landing/components/FeaturesSection';
import { WhyChooseSection } from '@/features/landing/components/WhyChooseSection';
import { BenefitsSection } from '@/features/landing/components/BenefitsSection';
import { HowItWorksSection } from '@/features/landing/components/HowItWorksSection';
import { PricingPreviewSection } from '@/features/landing/components/PricingPreviewSection';
import { TestimonialsSection } from '@/features/landing/components/TestimonialsSection';
import { FaqSection } from '@/features/landing/components/FaqSection';
import { CtaSection } from '@/features/landing/components/CtaSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home | RealtyFlow',
  description: 'The premier Real Estate Business Management Platform.',
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main id="main-content" className="flex-1">
        <HeroSection />
        <TrustedCompaniesSection />
        <FeaturesSection />
        <WhyChooseSection />
        <BenefitsSection />
        <HowItWorksSection />
        <PricingPreviewSection />
        <TestimonialsSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
