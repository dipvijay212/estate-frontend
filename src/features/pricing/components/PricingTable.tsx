'use client';

import React from 'react';
import { Heading, SubHeading } from '@/components/Theme/Typography';
import { Check, Minus } from 'lucide-react';

const features = [
  {
    category: 'Core Features',
    items: [
      { name: 'Active Properties', starter: 'Up to 50', growth: 'Up to 250', professional: 'Unlimited' },
      { name: 'Admin Users', starter: '3 Users', growth: 'Unlimited', professional: 'Unlimited' },
      { name: 'Document Storage', starter: '10 GB', growth: '100 GB', professional: 'Unlimited' },
      { name: 'Data Export', starter: true, growth: true, professional: true },
    ],
  },
  {
    category: 'Property Management',
    items: [
      { name: 'Automated Rent Collection', starter: true, growth: true, professional: true },
      { name: 'Maintenance Ticketing', starter: true, growth: true, professional: true },
      { name: 'Lease Generation', starter: false, growth: true, professional: true },
      { name: 'Vendor Portal', starter: false, growth: true, professional: true },
      { name: 'Multi-Currency Support', starter: false, growth: false, professional: true },
    ],
  },
  {
    category: 'CRM & Marketing',
    items: [
      { name: 'Tenant Portal', starter: true, growth: true, professional: true },
      { name: 'Lead Routing', starter: false, growth: true, professional: true },
      { name: 'Drip Campaigns', starter: false, growth: true, professional: true },
      { name: 'Custom Domain Website', starter: false, growth: true, professional: true },
      { name: 'White-Label Branding', starter: false, growth: false, professional: true },
    ],
  },
  {
    category: 'Analytics & Support',
    items: [
      { name: 'Standard Reporting', starter: true, growth: true, professional: true },
      { name: 'Custom Dashboards', starter: false, growth: true, professional: true },
      { name: 'API Access', starter: false, growth: false, professional: true },
      { name: 'Support Level', starter: 'Email', growth: 'Priority 24/7', professional: 'Dedicated Manager' },
    ],
  },
];

export function PricingTable() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <SubHeading className="text-primary mb-2">Compare Plans</SubHeading>
          <Heading className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Find the perfect fit
          </Heading>
        </div>

        <div className="max-w-5xl mx-auto -mx-4 px-4 md:mx-auto md:px-0 overflow-x-auto pb-8">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr>
                <th className="w-1/4 p-4 border-b border-border/50 text-muted-foreground font-semibold uppercase tracking-wider text-sm">Feature</th>
                <th className="w-1/4 p-4 border-b border-border/50 text-foreground font-bold text-xl text-center">Starter</th>
                <th className="w-1/4 p-4 border-b-2 border-primary text-primary font-bold text-xl text-center bg-primary/5 rounded-t-xl">Growth</th>
                <th className="w-1/4 p-4 border-b border-border/50 text-foreground font-bold text-xl text-center">Professional</th>
              </tr>
            </thead>
            <tbody>
              {features.map((category) => (
                <React.Fragment key={category.category}>
                  {/* Category Header */}
                  <tr>
                    <td 
                      colSpan={4} 
                      className="bg-muted/30 p-4 font-bold text-foreground border-b border-border/50 pt-8"
                    >
                      {category.category}
                    </td>
                  </tr>
                  
                  {/* Feature Rows */}
                  {category.items.map((item) => (
                    <tr key={item.name} className="group hover:bg-muted/10 transition-colors">
                      <td className="p-4 border-b border-border/30 text-muted-foreground font-medium">
                        {item.name}
                      </td>
                      
                      {/* Starter Col */}
                      <td className="p-4 border-b border-border/30 text-center">
                        {typeof item.starter === 'boolean' ? (
                          item.starter ? <Check className="w-5 h-5 text-primary mx-auto" /> : <Minus className="w-5 h-5 text-muted-foreground/30 mx-auto" />
                        ) : (
                          <span className="text-foreground font-medium text-sm">{item.starter}</span>
                        )}
                      </td>
                      
                      {/* Growth Col (Highlighted) */}
                      <td className="p-4 border-b border-border/30 text-center bg-primary/5 group-hover:bg-primary/10 transition-colors">
                        {typeof item.growth === 'boolean' ? (
                          item.growth ? <Check className="w-5 h-5 text-primary mx-auto" /> : <Minus className="w-5 h-5 text-muted-foreground/30 mx-auto" />
                        ) : (
                          <span className="text-foreground font-bold text-sm">{item.growth}</span>
                        )}
                      </td>
                      
                      {/* Professional Col */}
                      <td className="p-4 border-b border-border/30 text-center">
                        {typeof item.professional === 'boolean' ? (
                          item.professional ? <Check className="w-5 h-5 text-primary mx-auto" /> : <Minus className="w-5 h-5 text-muted-foreground/30 mx-auto" />
                        ) : (
                          <span className="text-foreground font-medium text-sm">{item.professional}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
