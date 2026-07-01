'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, MessageCircle, Share2, Mail, ArrowRight } from 'lucide-react';
import { Body, Caption } from '@/components/Theme/Typography';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '#' },
      { label: 'Partners', href: '#' },
      { label: 'News', href: '#' },
      { label: 'Contact', href: '/contact' },
    ],
    product: [
      { label: 'Features', href: '/features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Integrations', href: '#' },
      { label: 'Changelog', href: '#' },
      { label: 'API Docs', href: '#' },
    ],
    resources: [
      { label: 'Blog', href: '#' },
      { label: 'Case Studies', href: '#' },
      { label: 'Webinars', href: '#' },
      { label: 'Help Center', href: '#' },
      { label: 'Community', href: '#' },
    ],
    support: [
      { label: 'Contact Support', href: '/contact' },
      { label: 'Status', href: '#' },
      { label: 'Report a Bug', href: '#' },
      { label: 'Feature Request', href: '#' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'Security', href: '#' },
    ],
  };

  return (
    <footer className="bg-muted/20 border-t border-border pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-12 mb-16">
          
          {/* Brand & Newsletter Section */}
          <div className="lg:w-1/3 flex flex-col">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="bg-primary text-primary-foreground p-2 rounded-xl shadow-sm">
                <Building2 size={24} />
              </div>
              <span className="text-2xl font-bold tracking-tight">RealtyFlow</span>
            </Link>
            <Body className="text-muted-foreground mb-8 mt-0 leading-relaxed max-w-sm">
              The premium SaaS platform for modern real estate operations. Automate your workflows and scale your business effortlessly.
            </Body>

            <div className="mt-auto">
              <h4 className="font-semibold text-foreground mb-4">Subscribe to our newsletter</h4>
              <div className="flex items-center gap-2 max-w-sm">
                <Input 
                  type="email" 
                  placeholder="Enter your email..." 
                  className="bg-background border-border/60 focus-visible:ring-primary/50"
                />
                <Button size="icon" className="shrink-0 group" aria-label="Subscribe to newsletter">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>

          {/* Links Section */}
          <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6">
            
            <div>
              <h3 className="font-semibold text-foreground mb-5 text-sm uppercase tracking-wider">Company</h3>
              <ul className="space-y-3.5">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors block">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-5 text-sm uppercase tracking-wider">Product</h3>
              <ul className="space-y-3.5">
                {footerLinks.product.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors block">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-5 text-sm uppercase tracking-wider">Resources</h3>
              <ul className="space-y-3.5">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors block">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-5 text-sm uppercase tracking-wider">Support</h3>
              <ul className="space-y-3.5">
                {footerLinks.support.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors block">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-5 text-sm uppercase tracking-wider">Legal</h3>
              <ul className="space-y-3.5">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors block">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-border/60 flex flex-col md:flex-row items-center justify-between gap-6">
          <Caption className="text-muted-foreground">
            © {currentYear} RealtyFlow Inc. All rights reserved.
          </Caption>
          
          <div className="flex items-center gap-5 text-muted-foreground">
            <Link href="#" className="hover:text-primary transition-colors p-2 hover:bg-primary/5 rounded-full" aria-label="Twitter">
              <MessageCircle size={20} />
            </Link>
            <Link href="#" className="hover:text-primary transition-colors p-2 hover:bg-primary/5 rounded-full" aria-label="Facebook">
              <Share2 size={20} />
            </Link>
            <Link href="#" className="hover:text-primary transition-colors p-2 hover:bg-primary/5 rounded-full" aria-label="Email">
              <Mail size={20} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
