'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, Building2, User, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '../hooks/useAuth';
import { AuthLayoutUI } from './AuthLayoutUI';

export function WelcomeUI() {
  const { user } = useAuth();

  return (
    <AuthLayoutUI title="" subtitle="">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <div className="text-center mb-8">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 15, delay: 0.2 }}
            className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-500"
          >
            <CheckCircle2 size={40} className="stroke-[2.5]" />
          </motion.div>
          <h3 className="text-3xl font-extrabold tracking-tight text-foreground mb-3">
            Welcome to RealtyFlow!
          </h3>
          <p className="text-muted-foreground text-lg">
            Let&apos;s setup your business.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-card border border-border/50 shadow-sm rounded-2xl p-6 mb-8 space-y-4"
        >
          <div className="flex items-center gap-4 p-3 rounded-xl bg-muted/30">
            <div className="bg-primary/10 p-2.5 rounded-lg text-primary shrink-0">
              <Building2 size={20} />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm text-muted-foreground font-medium">Business Name</p>
              <p className="font-semibold truncate">{user?.companyName || 'Your Business'}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 rounded-xl bg-muted/30">
            <div className="bg-blue-500/10 p-2.5 rounded-lg text-blue-500 shrink-0">
              <User size={20} />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm text-muted-foreground font-medium">Owner Name</p>
              <p className="font-semibold truncate">{user ? `${user.firstName} ${user.lastName}` : 'Owner'}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <div className="bg-emerald-500/20 p-2.5 rounded-lg text-emerald-600 shrink-0">
              <Clock size={20} />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm text-emerald-600/80 font-medium">Trial Information</p>
              <p className="font-semibold text-emerald-700 dark:text-emerald-400 truncate">14-Day Free Trial Activated</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link href="/dashboard" className="block w-full group">
            <Button className="w-full h-14 text-base font-semibold group-hover:gap-3 transition-all duration-300">
              Go To Dashboard
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </AuthLayoutUI>
  );
}
