'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Users, ThumbsUp, Zap } from 'lucide-react';

export function WhyChooseUs() {
  const reasons = [
    {
      icon: Users,
      title: "Professional Agents",
      description: "Our licensed agents have years of experience and deep knowledge of the local real estate market.",
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      icon: ShieldCheck,
      title: "Verified Properties",
      description: "Every property listed on our platform undergoes a strict verification process to ensure authenticity.",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    },
    {
      icon: ThumbsUp,
      title: "Trusted Service",
      description: "We are committed to transparency and maintaining a 5-star rating among our satisfied clientele.",
      color: "text-amber-500",
      bg: "bg-amber-500/10"
    },
    {
      icon: Zap,
      title: "Easy Process",
      description: "From viewing to closing, we streamline the entire purchasing or renting process to save you time.",
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-2">Why Choose Us</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">The Best Real Estate Experience</h3>
          </motion.div>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {reasons.map((reason, idx) => {
            const Icon = reason.icon;
            return (
              <motion.div 
                key={idx}
                variants={item}
                className="bg-card border rounded-2xl p-8 text-center shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className={`w-16 h-16 mx-auto rounded-2xl ${reason.bg} ${reason.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-foreground mb-3">{reason.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
