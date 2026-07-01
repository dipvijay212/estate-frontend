'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Heading, Body } from '@/components/Theme/Typography';

interface AuthLayoutUIProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  showBackButton?: boolean;
}

export function AuthLayoutUI({ children, title, subtitle, showBackButton = false }: AuthLayoutUIProps) {
  return (
    <div className="min-h-screen flex w-full bg-background relative overflow-hidden">
      {/* Decorative gradient for the whole screen */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
      
      {/* Left Column - Form Area */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-24 xl:px-32 relative z-10 py-12 lg:py-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm mx-auto"
        >
          {showBackButton && (
            <Link href="/login" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Login
            </Link>
          )}

          <div className="mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-8 group">
              <div className="bg-primary text-primary-foreground p-1.5 rounded-lg group-hover:scale-105 transition-transform">
                <Building2 size={24} />
              </div>
              <span className="text-xl font-bold tracking-tight">RealtyFlow</span>
            </Link>
            
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground mb-2">{title}</h1>
            <p className="text-muted-foreground">{subtitle}</p>
          </div>

          {children}

        </motion.div>
      </div>

      {/* Right Column - Marketing Area (Hidden on mobile) */}
      <div className="hidden lg:flex flex-1 relative bg-muted/30 border-l border-border/50 items-center justify-center p-12">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-500/5"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        
        <div className="relative z-10 max-w-lg text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card border border-border/60 rounded-3xl p-8 shadow-2xl shadow-primary/5 backdrop-blur-sm"
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-tr from-primary to-blue-500 rounded-2xl flex items-center justify-center text-primary-foreground shadow-inner">
                <Building2 size={32} />
              </div>
            </div>
            <Heading className="text-2xl mb-4 font-bold">The Operating System for Modern Real Estate</Heading>
            <Body className="text-muted-foreground mt-0">
              Join thousands of agencies closing deals faster and managing properties effortlessly with RealtyFlow.
            </Body>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
