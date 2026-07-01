'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useAgencyTheme } from './ThemeProvider';
import { websiteMockData } from '../constants/mockData';

export function CompanyAbout() {
  const theme = useAgencyTheme();
  const { agencyInfo } = websiteMockData; // Still use this for experience stats placeholder

  const features = [
    "Over 15 years of market experience",
    "Dedicated team of real estate experts",
    "Transparent and hassle-free process",
    "Award-winning customer service"
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80" 
                alt="About our agency" 
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>
            
            {/* Experience Badge */}
            <div className="absolute -bottom-8 -right-8 bg-background p-6 rounded-2xl shadow-xl border border-border flex items-center gap-4">
              <div className="flex-1">
                <p className="text-4xl font-extrabold text-primary">{agencyInfo.experience}</p>
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mt-1">Of Excellence</p>
              </div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-2">About {theme.businessName}</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight mb-6">
              We Help You Find Your Dream Property
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {theme.content.aboutText} We believe that real estate is more than just transactions; it's about building long-lasting relationships and helping you make the best investment for your future.
            </p>

            <ul className="space-y-4 mb-10">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-6">
              <Button size="lg" className="rounded-full px-8 h-14 text-lg" asChild>
                <Link href={`/${theme.slug}/about`}>
                  Discover More <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
