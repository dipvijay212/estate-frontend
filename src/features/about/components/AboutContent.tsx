'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heading, SubHeading, Body } from '@/components/Theme/Typography';
import { Target, Lightbulb, Rocket, Building2 } from 'lucide-react';

const stats = [
  { value: '$50B+', label: 'Assets Managed' },
  { value: '10,000+', label: 'Agencies Powered' },
  { value: '2.5M+', label: 'Leases Processed' },
  { value: '99.99%', label: 'Platform Uptime' },
];

const timeline = [
  {
    year: '2020',
    title: 'The Inception',
    description: 'RealtyFlow was founded after our founders struggled with legacy property management software that felt stuck in the 90s.',
  },
  {
    year: '2021',
    title: 'Seed Funding',
    description: 'Raised $5M in seed funding led by top-tier SaaS investors to build our core engineering team.',
  },
  {
    year: '2022',
    title: 'Product Launch',
    description: 'Officially launched v1.0 of RealtyFlow. Onboarded our first 100 beta agencies who helped shape the platform.',
  },
  {
    year: '2024',
    title: 'Series A & Global Expansion',
    description: 'Raised $25M Series A. Expanded our operations globally to support multi-region compliance and international brokerages.',
  },
];

export function AboutContent() {
  return (
    <div className="flex flex-col">
      
      {/* Hero & Stats Section */}
      <section className="pt-32 pb-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SubHeading className="text-primary mb-4">About RealtyFlow</SubHeading>
            <Heading className="text-4xl md:text-6xl mb-8 font-extrabold tracking-tight">
              Rewriting the rules of real estate operations
            </Heading>
            <Body className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-16 max-w-2xl mx-auto">
              We are a team of software engineers, real estate operators, and designers on a mission to bring modern, lightning-fast software to an industry that has been overlooked for too long.
            </Body>
          </motion.div>

          {/* Stats Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-border/50"
          >
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-4xl md:text-5xl font-black text-foreground mb-2">{stat.value}</span>
                <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Story, Mission, Vision Grid */}
      <section className="py-16 md:py-24 lg:py-32 bg-muted/20 border-y border-border/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            
            {/* Story */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-xl text-primary">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-bold text-foreground">Why we started</h3>
              </div>
              <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
                <p>
                  Before RealtyFlow, managing a property portfolio meant wrestling with five different tools. You had one software for accounting, another for CRM, a third for maintenance requests, and spreadsheets filling in the gaps.
                </p>
                <p>
                  The industry was stuck using legacy platforms built in the early 2000s. They were slow, clunky, and incredibly expensive to maintain.
                </p>
                <p>
                  We realized that real estate agencies didn&apos;t need another point solution—they needed an operating system. A beautifully designed, seamlessly integrated platform that actually makes property managers faster and happier. So, we built it.
                </p>
              </div>
            </motion.div>

            {/* Mission & Vision Cards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col gap-8"
            >
              <div className="bg-card border border-border/60 rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500">
                    <Target className="w-6 h-6" />
                  </div>
                  <h4 className="text-2xl font-bold text-foreground">Our Mission</h4>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  To empower real estate professionals with automation and insights so they can focus on what truly matters: building relationships and closing deals.
                </p>
              </div>

              <div className="bg-card border border-border/60 rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center text-purple-500">
                    <Lightbulb className="w-6 h-6" />
                  </div>
                  <h4 className="text-2xl font-bold text-foreground">Our Vision</h4>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  To become the global infrastructure for real estate transactions, making property management as seamless as sending an email.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <SubHeading className="text-primary mb-2">Our Journey</SubHeading>
            <Heading className="text-3xl md:text-5xl font-extrabold tracking-tight">How we got here</Heading>
          </div>

          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            {timeline.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
              >
                {/* Timeline dot */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary text-primary-foreground shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <Rocket className="w-4 h-4" />
                </div>
                
                {/* Timeline content */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-card border border-border/50 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-foreground text-xl">{item.title}</h4>
                    <span className="font-semibold text-primary">{item.year}</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
