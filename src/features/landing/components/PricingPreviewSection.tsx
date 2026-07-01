'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heading, SubHeading, Body } from '@/components/Theme/Typography';
import { Button } from '@/components/ui/button';
import { Check, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const plans = [
  {
    name: 'Starter',
    price: '$49',
    description: 'Perfect for small agencies just getting started.',
    features: [
      'Up to 50 active properties',
      'Basic CRM and Lead Management',
      'Standard reporting',
      'Email support',
    ],
    isPopular: false,
    buttonVariant: 'outline' as const,
  },
  {
    name: 'Growth',
    price: '$129',
    description: 'For growing teams that need automation and power.',
    features: [
      'Up to 250 active properties',
      'Advanced Automated Workflows',
      'Custom Client Portals',
      'Financial Analytics Dashboard',
      'Priority 24/7 Support',
    ],
    isPopular: true,
    buttonVariant: 'default' as const,
  },
  {
    name: 'Professional',
    price: '$299',
    description: 'Enterprise features for high-volume brokerages.',
    features: [
      'Unlimited properties',
      'Custom API access & Integrations',
      'White-label mobile app',
      'Multi-region compliance',
      'Dedicated success manager',
    ],
    isPopular: false,
    buttonVariant: 'outline' as const,
  },
];

export function PricingPreviewSection() {
  return (
    <section id="pricing" className="py-16 md:py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-30 pointer-events-none -z-10">
        <div className="absolute top-[20%] left-[20%] w-72 h-72 bg-primary/20 blur-[100px] rounded-full"></div>
        <div className="absolute top-[40%] right-[20%] w-72 h-72 bg-blue-500/10 blur-[100px] rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <SubHeading className="text-primary mb-2">Simple Pricing</SubHeading>
            <Heading className="text-3xl md:text-5xl mb-6 font-extrabold tracking-tight">Scale without surprises</Heading>
            <Body className="text-muted-foreground text-lg mt-0">
              Choose the plan that fits your agency&apos;s size and needs. Upgrade or downgrade at any time as your portfolio grows.
            </Body>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto lg:items-center">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={cn(
                'relative flex flex-col bg-card border rounded-3xl p-8 backdrop-blur-sm transition-all duration-300',
                plan.isPopular 
                  ? 'border-primary shadow-2xl shadow-primary/10 lg:scale-105 bg-card/80 z-10 py-12' 
                  : 'border-border/50 shadow-sm hover:border-border hover:shadow-md'
              )}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-blue-500 text-primary-foreground text-sm font-bold tracking-wide py-1.5 px-4 rounded-full flex items-center shadow-lg">
                  <Sparkles className="w-4 h-4 mr-1.5" /> Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2 text-foreground">{plan.name}</h3>
                <p className="text-muted-foreground text-sm h-10">{plan.description}</p>
              </div>

              <div className="mb-8 pb-8 border-b border-border/50">
                <div className="flex items-baseline text-foreground">
                  <span className="text-5xl font-extrabold tracking-tight">{plan.price}</span>
                  <span className="text-muted-foreground ml-2 font-medium">/month</span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                variant={plan.buttonVariant} 
                className={cn(
                  'w-full h-12 text-base font-semibold shadow-sm transition-transform hover:scale-[1.02]',
                  plan.isPopular && 'shadow-lg shadow-primary/20'
                )}
              >
                Get Started
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
