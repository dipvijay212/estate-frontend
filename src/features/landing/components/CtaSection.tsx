'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heading, Body } from '@/components/Theme/Typography';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function CtaSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary -z-20"></div>
      
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white opacity-[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-black opacity-[0.05] rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 -z-10"></div>

      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center flex flex-col items-center"
        >
          <Heading className="text-4xl md:text-6xl text-primary-foreground mb-6">
            Ready to upgrade your property management?
          </Heading>
          <Body className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mt-0">
            Join thousands of real estate professionals who are saving time, increasing revenue, and scaling faster with RealtyFlow.
          </Body>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" variant="secondary" className="h-14 px-10 text-lg shadow-xl text-primary" asChild>
              <Link href="/register">Start Free Trial <ArrowRight className="ml-2 w-5 h-5" /></Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-10 text-lg border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent" asChild>
              <Link href="/contact">Talk to Sales</Link>
            </Button>
          </div>
          <p className="mt-6 text-sm text-primary-foreground/60">
            14-day free trial. No credit card required. Cancel anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
