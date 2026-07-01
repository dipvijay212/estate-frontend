'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heading, SubHeading, Body } from '@/components/Theme/Typography';
import { DownloadCloud, Settings, Rocket } from 'lucide-react';

const steps = [
  {
    icon: DownloadCloud,
    title: '1. Onboard in Minutes',
    description: 'Import your properties and tenant data seamlessly from CSVs or existing integrations.',
  },
  {
    icon: Settings,
    title: '2. Configure Automation',
    description: 'Set up your rent collection rules, maintenance workflows, and notification preferences.',
  },
  {
    icon: Rocket,
    title: '3. Scale Your Portfolio',
    description: 'Let RealtyFlow handle the day-to-day while you focus on acquiring new properties and scaling.',
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SubHeading className="text-primary mb-2">How It Works</SubHeading>
            <Heading className="text-3xl md:text-5xl mb-6">Simple path to operational freedom</Heading>
            <Body className="text-muted-foreground text-lg mt-0">
              We&apos;ve designed the onboarding experience to be as frictionless as possible. You can be up and running in hours, not weeks.
            </Body>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-border -z-10"></div>
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex flex-col items-center text-center bg-card md:bg-transparent p-6 md:p-0 rounded-2xl md:rounded-none border md:border-0 border-border"
            >
              <div className="bg-background border-4 border-muted w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-sm">
                <step.icon className="text-primary w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
