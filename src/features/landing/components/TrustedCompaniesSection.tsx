'use client';

import React from 'react';
import { motion } from 'framer-motion';

const companies = [
  { name: 'Acme Corp', logo: 'ACME' },
  { name: 'Global Estate', logo: 'GlobalEstate' },
  { name: 'Nexus Properties', logo: 'NEXUS' },
  { name: 'Zenith Holdings', logo: 'ZENITH' },
  { name: 'Apex Real Estate', logo: 'APEX' },
  { name: 'Lumina Group', logo: 'LUMINA' },
];

export function TrustedCompaniesSection() {
  return (
    <section className="py-12 border-y border-border/50 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <p className="text-center text-sm font-medium text-muted-foreground mb-8">
          TRUSTED BY INNOVATIVE REAL ESTATE TEAMS WORLDWIDE
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
          {companies.map((company, index) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="text-xl md:text-2xl font-bold tracking-tighter text-foreground/80 hover:text-foreground transition-colors"
            >
              {company.logo}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
