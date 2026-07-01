'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heading, SubHeading, Body } from '@/components/Theme/Typography';
import { Building, Users, Magnet, Globe, BarChart3, Cloud, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const modules = [
  {
    id: 'property-management',
    title: 'Property Management',
    tagline: 'Complete portfolio oversight',
    description: 'Centralize your entire property portfolio in one intuitive dashboard. Instantly view unit statuses, track ongoing maintenance requests, and automate lease renewals. Say goodbye to fragmented spreadsheets.',
    icon: Building,
    features: ['Automated Rent Collection', 'Maintenance Ticketing', 'Lease Document Generation'],
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
  },
  {
    id: 'crm',
    title: 'Customer CRM',
    tagline: 'Build stronger relationships',
    description: 'Maintain detailed, rich profiles of every tenant, owner, and vendor you interact with. Track communication histories, log important notes, and utilize integrated messaging to keep everyone in the loop.',
    icon: Users,
    features: ['Unified Inbox', 'Tenant Portals', 'Owner Financial Statements'],
    color: 'text-violet-500',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
  },
  {
    id: 'lead-tracking',
    title: 'Lead Tracking',
    tagline: 'Never lose a prospective deal',
    description: 'Capture leads directly from your website or property listings. Our intelligent routing system assigns them to the right agent, while automated drip campaigns nurture them until they are ready to sign.',
    icon: Magnet,
    features: ['Automated Routing', 'Drip Campaigns', 'Conversion Analytics'],
    color: 'text-indigo-500',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
  },
  {
    id: 'website',
    title: 'Professional Website',
    tagline: 'Your digital storefront',
    description: 'Launch a stunning, high-converting agency website in minutes. Fully SEO-optimized, mobile-responsive, and seamlessly synced with your RealtyFlow property database to display real-time listings.',
    icon: Globe,
    features: ['No-Code Builder', 'SEO Optimization', 'Custom Domains'],
    color: 'text-pink-500',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20',
  },
  {
    id: 'analytics',
    title: 'Analytics & Reporting',
    tagline: 'Data-driven decision making',
    description: 'Stop guessing and start knowing. Access real-time financial reports, occupancy metrics, and team performance dashboards. Export everything with a single click for your accounting software.',
    icon: BarChart3,
    features: ['Custom Dashboards', 'One-Click Export', 'Occupancy Forecasting'],
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
  },
  {
    id: 'cloud',
    title: 'Cloud Infrastructure',
    tagline: 'Enterprise-grade reliability',
    description: 'Access your business from any device, anywhere in the world. Built on a secure, globally distributed AWS architecture ensuring 99.99% uptime, automatic backups, and bank-level encryption.',
    icon: Cloud,
    features: ['Bank-Level Security', 'Automated Backups', '99.99% SLA'],
    color: 'text-cyan-500',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
  },
];

export function FeaturesContent() {
  return (
    <div className="flex flex-col">
      
      {/* Hero Section */}
      <section className="pt-32 pb-24 relative overflow-hidden bg-muted/20 border-b border-border/50">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SubHeading className="text-primary mb-4">Platform Overview</SubHeading>
            <Heading className="text-4xl md:text-6xl mb-8 font-extrabold tracking-tight">
              Everything you need in one powerful suite
            </Heading>
            <Body className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-0 max-w-2xl mx-auto">
              Explore the core modules that make RealtyFlow the ultimate operating system for modern real estate professionals.
            </Body>
          </motion.div>
        </div>
      </section>

      {/* Modules (Zig-Zag Layout) */}
      <section className="py-16 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6 space-y-32">
          {modules.map((module, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={module.id} 
                id={module.id}
                className={cn(
                  "flex flex-col lg:flex-row items-center gap-12 lg:gap-24",
                  !isEven && "lg:flex-row-reverse"
                )}
              >
                
                {/* Content Side */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="flex-1 space-y-6"
                >
                  <div className="flex items-center gap-4 mb-2">
                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center border", module.bg, module.color, module.border)}>
                      <module.icon className="w-6 h-6" />
                    </div>
                    <span className={cn("font-bold tracking-wide uppercase text-sm", module.color)}>
                      {module.title}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
                    {module.tagline}
                  </h3>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {module.description}
                  </p>
                  
                  <ul className="pt-4 space-y-3">
                    {module.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                        <span className="text-foreground font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
                
                {/* Image Placeholder Side */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex-1 w-full"
                >
                  <div className="relative aspect-[4/3] rounded-2xl border border-border/50 bg-card overflow-hidden shadow-2xl shadow-primary/5 group">
                    
                    {/* Simulated Browser Bar */}
                    <div className="absolute top-0 left-0 right-0 h-10 bg-muted border-b border-border/50 flex items-center px-4 gap-2 z-20">
                      <div className="w-3 h-3 rounded-full bg-destructive/60"></div>
                      <div className="w-3 h-3 rounded-full bg-orange-400/60"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald-400/60"></div>
                    </div>
                    
                    {/* Placeholder Content Area */}
                    <div className="absolute inset-0 pt-10 p-6 flex flex-col items-center justify-center bg-muted/20 relative z-10 overflow-hidden">
                      {/* Decorative elements representing dashboard UI */}
                      <div className="w-full h-full border-2 border-dashed border-border/60 rounded-xl flex items-center justify-center bg-background/50 group-hover:bg-background/80 transition-colors duration-500">
                        <div className="text-center">
                          <module.icon className={cn("w-16 h-16 mx-auto mb-4 opacity-20", module.color)} />
                          <p className="text-muted-foreground font-medium opacity-60">Interactive Dashboard UI Placeholder</p>
                          <p className="text-sm text-muted-foreground/40">{module.title} Module</p>
                        </div>
                      </div>
                      
                      {/* Decorative Background Blob inside the mockup */}
                      <div className={cn("absolute bottom-0 right-0 w-64 h-64 rounded-full blur-[80px] -z-10 opacity-30", module.bg)}></div>
                    </div>
                  </div>
                </motion.div>
                
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
