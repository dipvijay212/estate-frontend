'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heading, SubHeading, Body } from '@/components/Theme/Typography';
import { Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const faqs = [
  {
    question: 'How long does it take to migrate our existing property data?',
    answer: 'Most agencies complete migration within 48 hours. Our onboarding team provides a white-glove service to import your properties, leases, and tenant data from any CSV or existing legacy software at no extra cost.',
  },
  {
    question: 'Can I customize the tenant portal with our agency’s branding?',
    answer: 'Yes. The Growth and Professional plans allow you to fully white-label the tenant portal. You can add your agency logo, brand colors, and use a custom domain so your clients experience a seamless brand interaction.',
  },
  {
    question: 'Does RealtyFlow integrate with our existing accounting software?',
    answer: 'Absolutely. We offer native, real-time two-way sync with QuickBooks Online, Xero, and Sage. Your property ledgers and rent rolls automatically reconcile without any manual data entry.',
  },
  {
    question: 'How does the automated rent collection handle late fees?',
    answer: 'You can configure custom late fee policies globally or on a per-lease basis. RealtyFlow will automatically calculate grace periods, apply flat or percentage-based late fees, and notify the tenant automatically.',
  },
  {
    question: 'Is there a limit on the number of team members I can add?',
    answer: 'No. We believe in collaborative property management. All of our plans include unlimited admin and staff seats. You only pay based on the number of active properties in your portfolio.',
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-background border-t border-border/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Left Column: Heading & CTA */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
            >
              <SubHeading className="text-primary mb-2">Support & Details</SubHeading>
              <Heading className="text-3xl md:text-5xl mb-6 font-extrabold tracking-tight">Got questions?</Heading>
              <Body className="text-muted-foreground text-lg mt-0 mb-8 max-w-md">
                We&apos;ve compiled everything you need to know about migrating your agency to RealtyFlow.
              </Body>
              
              <div className="p-6 bg-muted/50 rounded-2xl border border-border/50 max-w-sm">
                <h4 className="font-semibold text-foreground mb-2">Still need help?</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Our real estate operations experts are standing by to help you.
                </p>
                <Button variant="outline" className="w-full">
                  Contact Support
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Accordion */}
          <div className="lg:col-span-7">
            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className={cn(
                      'border rounded-2xl overflow-hidden transition-colors duration-300',
                      isOpen ? 'border-primary/50 bg-primary/5' : 'border-border/60 bg-card hover:border-border'
                    )}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                    >
                      <span className={cn(
                        'text-lg font-semibold pr-8 transition-colors duration-300',
                        isOpen ? 'text-primary' : 'text-foreground'
                      )}>
                        {faq.question}
                      </span>
                      <div className={cn(
                        'shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300',
                        isOpen ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                      )}>
                        {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                      </div>
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                          <div className="p-6 pt-0 text-muted-foreground leading-relaxed text-[1.05rem]">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
