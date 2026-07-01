'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X, Home, Building2, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAgencyTheme } from './ThemeProvider';

export function WebsiteNavbar() {
  const theme = useAgencyTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: `/${theme.slug}` },
    { name: 'Properties', href: `/${theme.slug}/properties` },
    { name: 'About Us', href: `/${theme.slug}/about` },
    { name: 'Contact', href: `/${theme.slug}/contact` },
  ];

  // Map string to icon
  const IconComponent = theme.logo === 'Building2' ? Building2 : Home;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link href={`/${theme.slug}`} className="flex items-center gap-2 group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
              isScrolled ? 'bg-primary text-primary-foreground' : 'bg-white text-primary'
            }`}>
              <IconComponent className="w-6 h-6" />
            </div>
            <span className={`text-xl font-bold tracking-tight transition-colors ${
              isScrolled ? 'text-foreground' : 'text-white drop-shadow-md'
            }`}>
              {theme.businessName}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isScrolled ? 'text-muted-foreground' : 'text-white/90 hover:text-white drop-shadow-sm'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Button className={isScrolled ? '' : 'bg-white text-black hover:bg-white/90'} asChild>
              <Link href={`/${theme.slug}/contact`}>Book Consultation</Link>
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className={`md:hidden p-2 rounded-md ${isScrolled ? 'text-foreground' : 'text-white'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className="text-lg font-medium text-foreground py-2 border-b border-border/50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Button className="w-full mt-4" asChild onClick={() => setMobileMenuOpen(false)}>
                <Link href={`/${theme.slug}/contact`}>Book Consultation</Link>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
