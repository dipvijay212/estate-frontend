'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Calendar, Phone } from 'lucide-react';

export function CallToAction({ agencyName }: { agencyName: string }) {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=80")',
          backgroundAttachment: 'fixed'
        }}
      />
      <div className="absolute inset-0 bg-primary/90 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
            Ready to Find Your Dream Property?
          </h2>
          <p className="text-xl text-white/80 mb-10 leading-relaxed max-w-2xl mx-auto">
            Our expert agents are ready to help you navigate the market. Book a site visit or contact us today to get started.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-white text-primary hover:bg-white/90 shadow-xl transition-all" asChild>
              <Link href={`/${agencyName}/contact`}>
                <Calendar className="w-5 h-5 mr-2" /> Book Site Visit
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-white/30 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm transition-all" asChild>
              <Link href={`/${agencyName}/contact`}>
                <Phone className="w-5 h-5 mr-2" /> Contact Now
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
