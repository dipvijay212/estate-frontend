'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAgencyTheme } from './ThemeProvider';

export function HeroSection() {
  const theme = useAgencyTheme();

  return (
    <div className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-zinc-900">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url("${theme.assets.heroBanner}")`,
          backgroundAttachment: 'fixed' // Parallax effect
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <motion.div 
          className="max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-md mb-6"
          >
            <span className="text-primary-foreground font-medium text-sm tracking-wide uppercase">
              Welcome to {theme.businessName}
            </span>
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {theme.tagline}
          </motion.h1>

          <motion.p 
            className="text-lg md:text-xl text-zinc-300 mb-10 max-w-2xl leading-relaxed drop-shadow"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {theme.content.aboutText}
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg hover:shadow-primary/25 transition-all" asChild>
              <Link href={`/${theme.slug}/properties`}>View Properties</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm transition-all" asChild>
              <Link href={`/${theme.slug}/contact`}>Contact Us</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
