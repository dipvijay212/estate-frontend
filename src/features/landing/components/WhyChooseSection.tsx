'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heading, SubHeading, Body } from '@/components/Theme/Typography';
import { XCircle, CheckCircle2, ArrowRight } from 'lucide-react';

export function WhyChooseSection() {
  const painPoints = [
    'Managing properties on fragmented Excel sheets',
    'Unprofessional WhatsApp communication',
    'Missed follow-ups due to no automated reminders',
    'Losing customers to faster, modern competitors',
    'Manual tracking of payments and receipts',
  ];

  const solutions = [
    'Centralized dashboard for your entire portfolio',
    'Integrated CRM with professional client portals',
    'Automated reminders and intelligent lead nurturing',
    'Deliver exceptional, lightning-fast service',
    'One-click financial reporting & automated rent',
  ];

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-muted/30 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <SubHeading className="text-primary mb-2">Why RealtyFlow</SubHeading>
            <Heading className="text-3xl md:text-5xl mb-6 font-extrabold tracking-tight">Stop working in the past</Heading>
            <Body className="text-muted-foreground text-lg mt-0">
              The real estate industry has evolved. Relying on outdated manual processes is costing you time, money, and valuable client relationships.
            </Body>
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-8 max-w-5xl mx-auto">
          
          {/* The Old Way Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20, rotateY: -10 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="flex-1 rounded-2xl bg-card border border-border/50 p-8 shadow-sm opacity-90 relative overflow-hidden"
            style={{ perspective: 1000 }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-destructive/5 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="mb-8">
              <span className="inline-block px-3 py-1 rounded-full bg-destructive/10 text-destructive text-sm font-semibold mb-4 border border-destructive/20">
                The Traditional Way
              </span>
              <h3 className="text-2xl font-bold text-foreground">Fragmented & Slow</h3>
            </div>
            
            <ul className="space-y-5">
              {painPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-4">
                  <XCircle className="w-6 h-6 text-destructive/70 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* VS Divider (Desktop) */}
          <div className="hidden lg:flex flex-col justify-center items-center -mx-4 z-10">
            <div className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center shadow-sm">
              <span className="font-bold text-muted-foreground text-sm">VS</span>
            </div>
          </div>

          {/* The RealtyFlow Way Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20, rotateY: 10 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex-1 rounded-2xl bg-card border-2 border-primary/20 p-8 shadow-xl shadow-primary/5 relative overflow-hidden"
            style={{ perspective: 1000 }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/4"></div>
            
            <div className="mb-8 relative z-10">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4 border border-primary/20">
                With RealtyFlow
              </span>
              <h3 className="text-2xl font-bold text-foreground">Integrated & Automated</h3>
            </div>
            
            <ul className="space-y-5 relative z-10">
              {solutions.map((solution, index) => (
                <li key={index} className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground font-medium">{solution}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-8 border-t border-border/50 relative z-10">
              <div className="flex items-center text-primary font-semibold group cursor-pointer hover:text-primary/80 transition-colors">
                See the platform in action <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
