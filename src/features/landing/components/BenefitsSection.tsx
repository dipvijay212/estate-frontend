'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heading, SubHeading, Body } from '@/components/Theme/Typography';
import { TrendingUp, Clock, Wallet } from 'lucide-react';

const benefits = [
  {
    icon: TrendingUp,
    title: 'Scale Faster',
    value: '+40%',
    description: 'Average increase in portfolio size without adding headcount.',
  },
  {
    icon: Clock,
    title: 'Save Time',
    value: '15hrs',
    description: 'Saved per week on administrative and manual tasks.',
  },
  {
    icon: Wallet,
    title: 'Increase Revenue',
    value: '12%',
    description: 'Average boost in net operating income in the first year.',
  },
];

export function BenefitsSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SubHeading className="text-primary mb-2">Quantifiable Results</SubHeading>
            <Heading className="text-3xl md:text-5xl mb-6">Real impact on your bottom line</Heading>
            <Body className="text-muted-foreground text-lg mt-0">
              Our customers see immediate return on investment. The numbers speak for themselves.
            </Body>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card border border-border rounded-2xl p-8 text-center flex flex-col items-center shadow-sm"
            >
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <benefit.icon className="text-primary w-8 h-8" />
              </div>
              <h4 className="text-5xl font-extrabold text-foreground mb-2">{benefit.value}</h4>
              <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
