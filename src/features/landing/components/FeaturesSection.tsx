'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heading, SubHeading, Body } from '@/components/Theme/Typography';
import { Building, Magnet, Users, Globe, BarChart3, Cloud } from 'lucide-react';

const features = [
  {
    icon: Building,
    title: 'Property Management',
    description: 'Centralize your entire property portfolio. Track leases, maintenance requests, and unit status from a single dashboard.',
    gradient: 'from-blue-500/20 to-blue-500/5',
    iconColor: 'text-blue-500',
  },
  {
    icon: Magnet,
    title: 'Lead Management',
    description: 'Capture, route, and nurture leads automatically. Never let a prospective tenant or buyer slip through the cracks again.',
    gradient: 'from-indigo-500/20 to-indigo-500/5',
    iconColor: 'text-indigo-500',
  },
  {
    icon: Users,
    title: 'Customer CRM',
    description: 'Maintain detailed profiles of all your tenants, owners, and vendors. Streamline communication with integrated messaging.',
    gradient: 'from-violet-500/20 to-violet-500/5',
    iconColor: 'text-violet-500',
  },
  {
    icon: Globe,
    title: 'Professional Website',
    description: 'Launch a stunning, SEO-optimized agency website in minutes. Beautifully showcase your listings and capture inbound traffic.',
    gradient: 'from-pink-500/20 to-pink-500/5',
    iconColor: 'text-pink-500',
  },
  {
    icon: BarChart3,
    title: 'Analytics',
    description: 'Make data-driven decisions with real-time financial reporting, occupancy metrics, and team performance dashboards.',
    gradient: 'from-emerald-500/20 to-emerald-500/5',
    iconColor: 'text-emerald-500',
  },
  {
    icon: Cloud,
    title: 'Cloud Platform',
    description: 'Access your business from anywhere. Built on a secure, globally distributed architecture ensuring 99.99% uptime.',
    gradient: 'from-cyan-500/20 to-cyan-500/5',
    iconColor: 'text-cyan-500',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 md:py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] translate-x-1/3 pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 z-10 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <SubHeading className="text-primary mb-2">Powerful Capabilities</SubHeading>
            <Heading className="text-3xl md:text-5xl mb-6 font-extrabold tracking-tight">Everything you need to grow</Heading>
            <Body className="text-muted-foreground text-lg mt-0">
              RealtyFlow replaces a dozen fragmented tools with a single, unified platform designed specifically for ambitious real estate operators.
            </Body>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-card border border-border/50 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5"
            >
              {/* Subtle hover gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl -z-10 bg-primary/5"></div>
              
              <div className={`w-14 h-14 rounded-xl mb-6 flex items-center justify-center bg-gradient-to-br ${feature.gradient} border border-background shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
