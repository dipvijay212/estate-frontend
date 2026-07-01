'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, PlayCircle, Home, Users, TrendingUp, DollarSign, BarChart3, ChevronRight } from 'lucide-react';
import { Heading, Body } from '@/components/Theme/Typography';
import Link from 'next/link';

export function HeroSection() {
  const floatTransition = {
    repeat: Infinity,
    repeatType: "reverse" as const,
    ease: "easeInOut" as const,
    duration: 4,
  };

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 lg:pb-32 overflow-hidden bg-background">
      {/* Premium Gradient Backgrounds */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] opacity-30 pointer-events-none -z-10 flex justify-center">
        <div className="absolute top-[-200px] w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen"></div>
        <div className="absolute top-[100px] right-[10%] w-[600px] h-[600px] bg-blue-400/20 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center rounded-full border border-border bg-muted/50 px-3 py-1 text-sm font-medium mb-8 backdrop-blur-sm transition-colors hover:bg-muted"
            >
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
              Introducing RealtyFlow Intelligence <ChevronRight className="ml-1 h-3 w-3" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Heading className="text-5xl lg:text-6xl xl:text-[5rem] mb-6 tracking-tighter font-black leading-[1.1]">
                The Operating System for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Real Estate.</span>
              </Heading>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Body className="text-xl text-muted-foreground mb-10 max-w-xl mt-0 leading-relaxed">
                Empower your agency to close deals faster, manage properties effortlessly, and deliver unparalleled experiences to your clients—all from one unified platform.
              </Body>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <Button size="lg" className="h-14 px-8 text-base shadow-xl shadow-primary/20 transition-all hover:scale-[1.02]" asChild>
                <Link href="/register">Start Free Trial <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-base bg-background/50 backdrop-blur-md border-border hover:bg-muted transition-all" asChild>
                <Link href="/contact"><PlayCircle className="mr-2 h-5 w-5" /> Book Demo</Link>
              </Button>
            </motion.div>
          </div>

          {/* Right Column: Premium Mockup & Floating Cards */}
          <div className="relative w-full max-w-lg mx-auto lg:max-w-none lg:h-[600px] flex items-center justify-center z-10 mt-10 lg:mt-0">
            
            {/* Main Dashboard Mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ duration: 0.8, delay: 0.4, type: "spring", bounce: 0.4 }}
              className="relative w-full aspect-[4/3] rounded-2xl border border-border/50 bg-card/60 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col"
              style={{ perspective: 1000 }}
            >
              {/* Fake Browser Header */}
              <div className="h-10 border-b border-border/50 bg-muted/50 flex items-center px-4 gap-2 shrink-0">
                <div className="w-3 h-3 rounded-full bg-destructive/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              {/* Dashboard Content Fake UI */}
              <div className="flex-1 p-6 flex flex-col gap-6">
                <div className="flex justify-between items-center">
                  <div className="w-32 h-6 rounded-md bg-muted animate-pulse"></div>
                  <div className="w-10 h-10 rounded-full bg-muted animate-pulse"></div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1 h-32 rounded-xl bg-primary/5 border border-primary/10 p-4 flex flex-col justify-between">
                    <div className="w-8 h-8 rounded-lg bg-primary/20"></div>
                    <div className="w-20 h-4 rounded bg-primary/20"></div>
                  </div>
                  <div className="flex-1 h-32 rounded-xl bg-muted p-4 flex flex-col justify-between">
                    <div className="w-8 h-8 rounded-lg bg-border"></div>
                    <div className="w-20 h-4 rounded bg-border"></div>
                  </div>
                </div>
                <div className="flex-1 rounded-xl bg-muted border border-border/50 p-4">
                   <div className="w-full h-full rounded bg-border/50"></div>
                </div>
              </div>
            </motion.div>

            {/* Floating Card: Properties */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0, y: [-10, 10, -10] }}
              transition={{ 
                opacity: { duration: 0.5, delay: 0.7 },
                x: { duration: 0.5, delay: 0.7 },
                y: { ...floatTransition, delay: 0 } 
              }}
              className="absolute -left-6 lg:-left-12 top-20 bg-card border border-border/60 shadow-xl rounded-xl p-4 flex items-center gap-4 backdrop-blur-md"
            >
              <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500">
                <Home size={24} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Active Properties</p>
                <p className="text-lg font-bold text-foreground">1,204</p>
              </div>
            </motion.div>

            {/* Floating Card: Revenue */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0, y: [10, -10, 10] }}
              transition={{ 
                opacity: { duration: 0.5, delay: 0.9 },
                x: { duration: 0.5, delay: 0.9 },
                y: { ...floatTransition, delay: 1 } 
              }}
              className="absolute -right-4 lg:-right-10 top-40 bg-card border border-border/60 shadow-xl rounded-xl p-4 flex items-center gap-4 backdrop-blur-md"
            >
              <div className="p-3 bg-green-500/10 rounded-lg text-green-500">
                <DollarSign size={24} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Monthly MRR</p>
                <p className="text-lg font-bold text-foreground">$1.2M</p>
              </div>
            </motion.div>

            {/* Floating Card: Leads */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: [5, -15, 5] }}
              transition={{ 
                opacity: { duration: 0.5, delay: 1.1 },
                y: { ...floatTransition, delay: 2 } 
              }}
              className="absolute left-10 lg:left-12 -bottom-6 lg:-bottom-4 bg-card border border-border/60 shadow-xl rounded-xl p-4 flex items-center gap-4 backdrop-blur-md"
            >
              <div className="p-3 bg-orange-500/10 rounded-lg text-orange-500">
                <TrendingUp size={24} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">New Leads</p>
                <p className="text-lg font-bold text-foreground flex items-center gap-1">
                  +42% <BarChart3 size={14} className="text-orange-500" />
                </p>
              </div>
            </motion.div>

            {/* Floating Card: Customers */}
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: [-15, 5, -15] }}
              transition={{ 
                opacity: { duration: 0.5, delay: 1.3 },
                y: { ...floatTransition, delay: 1.5 } 
              }}
              className="absolute right-10 lg:right-20 -top-10 lg:-top-12 bg-card border border-border/60 shadow-xl rounded-xl p-4 flex items-center gap-4 backdrop-blur-md"
            >
              <div className="p-3 bg-purple-500/10 rounded-lg text-purple-500">
                <Users size={24} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Happy Tenants</p>
                <p className="text-lg font-bold text-foreground">8,430</p>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
