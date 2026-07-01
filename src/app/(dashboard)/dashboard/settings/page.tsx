import React from 'react';
import Link from 'next/link';
import { Building2, Paintbrush, Contact, ShieldCheck, ChevronRight } from 'lucide-react';

const SETTINGS_PAGES = [
  {
    title: 'Business Information',
    description: 'Manage core company details, address, and legal identifiers.',
    href: '/dashboard/settings/business',
    icon: Building2,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10'
  },
  {
    title: 'Website & Branding',
    description: 'Configure your brand identity, colors, and visual assets.',
    href: '/dashboard/settings/website',
    icon: Paintbrush,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10'
  },
  {
    title: 'Contact & Socials',
    description: 'Manage public contact details and social media integrations.',
    href: '/dashboard/settings/account',
    icon: Contact,
    color: 'text-indigo-500',
    bg: 'bg-indigo-500/10'
  },
  {
    title: 'Account & Security',
    description: 'Manage your personal profile, passwords, and security.',
    href: '/dashboard/settings/security',
    icon: ShieldCheck,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10'
  }
];

export default function SettingsPage() {
  return (
    <div className="flex flex-col space-y-8 p-4 sm:p-8 max-w-[1200px] mx-auto w-full animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Global Settings</h1>
        <p className="text-muted-foreground mt-2 text-sm max-w-2xl">
          Manage your overall workspace configuration. Select a category below to update your business profile, branding, or security preferences.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {SETTINGS_PAGES.map((page) => {
          const Icon = page.icon;
          return (
            <Link 
              key={page.href} 
              href={page.href}
              className="group relative flex items-start gap-4 p-6 bg-card border rounded-2xl shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300"
            >
              <div className={`p-3 rounded-xl ${page.bg} ${page.color} shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex-1 pr-6">
                <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">{page.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {page.description}
                </p>
              </div>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                <ChevronRight className="w-5 h-5 text-primary" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
