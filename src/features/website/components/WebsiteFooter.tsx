'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Building2 } from 'lucide-react';
import { useAgencyTheme } from './ThemeProvider';

export function WebsiteFooter() {
  const theme = useAgencyTheme();
  const IconComponent = theme.logo === 'Building2' ? Building2 : Home;

  return (
    <footer className="bg-zinc-950 text-zinc-300 pt-16 pb-8 border-t border-zinc-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <Link href={`/${theme.slug}`} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
                <IconComponent className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">{theme.businessName}</span>
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed">
              {theme.content.footerText}
            </p>
            <div className="flex items-center gap-4 pt-2">
              {theme.socialLinks.facebook && (
                <a href={theme.socialLinks.facebook} className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {theme.socialLinks.instagram && (
                <a href={theme.socialLinks.instagram} className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {theme.socialLinks.linkedin && (
                <a href={theme.socialLinks.linkedin} className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {theme.socialLinks.twitter && (
                <a href={theme.socialLinks.twitter} className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href={`/${theme.slug}`} className="text-zinc-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href={`/${theme.slug}/properties`} className="text-zinc-400 hover:text-white transition-colors">Properties</Link></li>
              <li><Link href={`/${theme.slug}/about`} className="text-zinc-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href={`/${theme.slug}/contact`} className="text-zinc-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="text-white font-semibold mb-6">Property Types</h3>
            <ul className="space-y-3">
              <li><Link href={`/${theme.slug}/properties?type=luxury`} className="text-zinc-400 hover:text-white transition-colors">Luxury Villas</Link></li>
              <li><Link href={`/${theme.slug}/properties?type=apartment`} className="text-zinc-400 hover:text-white transition-colors">Modern Apartments</Link></li>
              <li><Link href={`/${theme.slug}/properties?type=commercial`} className="text-zinc-400 hover:text-white transition-colors">Commercial Spaces</Link></li>
              <li><Link href={`/${theme.slug}/properties?type=penthouse`} className="text-zinc-400 hover:text-white transition-colors">Penthouses</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-zinc-400">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm">{theme.contact.address}</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-400">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm">{theme.contact.phone}</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-400">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm">{theme.contact.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
          <p>© {new Date().getFullYear()} {theme.businessName}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
