'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { websiteMockData } from '@/features/website/constants/mockData';
import { Testimonials } from '@/features/website/components/Testimonials';
import { CallToAction } from '@/features/website/components/CallToAction';
import { Target, Lightbulb, TrendingUp, Users } from 'lucide-react';
import { useAgencyTheme } from '@/features/website/components/ThemeProvider';

export default function AgencyAboutClient({ params }: { params: { agency: string } }) {
  const theme = useAgencyTheme();
  const { agencyInfo } = websiteMockData; // kept for stats

  const stats = [
    { label: "Years Experience", value: agencyInfo.experience, icon: TrendingUp },
    { label: "Happy Clients", value: agencyInfo.happyClients, icon: Users },
    { label: "Properties Sold", value: agencyInfo.completedProjects, icon: Target },
    { label: "Professional Agents", value: "24+", icon: Lightbulb }
  ];

  const team = [
    { name: "Jessica Pearson", role: "Managing Broker", image: "https://i.pravatar.cc/300?u=jessica" },
    { name: "Michael Chang", role: "Luxury Specialist", image: "https://i.pravatar.cc/300?u=michael2" },
    { name: "Sarah Jenkins", role: "Senior Agent", image: "https://i.pravatar.cc/300?u=sarah2" },
    { name: "David Foster", role: "Commercial Lead", image: "https://i.pravatar.cc/300?u=david" }
  ];

  return (
    <div className="min-h-screen bg-background pt-20">
      
      {/* Page Header */}
      <div className="bg-primary/5 py-16 md:py-24 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight mb-6"
          >
            About <span className="text-primary">{theme.businessName}</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            We are redefining the real estate experience by combining industry expertise with a relentless commitment to our clients.
          </motion.p>
        </div>
      </div>

      {/* Story, Mission & Vision */}
      <section className="py-24 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-2">Our Story</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight mb-6">Built on Trust and Integrity</h3>
            <div className="prose prose-zinc max-w-none text-muted-foreground leading-relaxed space-y-4">
              <p>
                Founded over a decade ago, {theme.businessName} began with a simple yet powerful idea: to make buying, selling, and renting properties an enjoyable, transparent, and highly personalized experience.
              </p>
              <p>
                {theme.content.aboutText} Over the years, we have grown from a small boutique agency into one of the most trusted names in the local market, helping thousands of families and businesses find their perfect space.
              </p>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&q=80" alt="House exterior" className="rounded-2xl h-64 object-cover w-full shadow-lg" loading="lazy" decoding="async" />
            <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=500&q=80" alt="Modern interior" className="rounded-2xl h-64 object-cover w-full mt-8 shadow-lg" loading="lazy" decoding="async" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card p-8 rounded-3xl border shadow-sm flex flex-col items-start hover:shadow-md transition-shadow"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-6">
              <Target className="w-7 h-7" />
            </div>
            <h4 className="text-2xl font-bold text-foreground mb-3">Our Mission</h4>
            <p className="text-muted-foreground leading-relaxed">
              To empower our clients with the knowledge, guidance, and resources they need to make the best real estate decisions. We strive to deliver exceptional service that exceeds expectations at every touchpoint.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-card p-8 rounded-3xl border shadow-sm flex flex-col items-start hover:shadow-md transition-shadow"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-6">
              <Lightbulb className="w-7 h-7" />
            </div>
            <h4 className="text-2xl font-bold text-foreground mb-3">Our Vision</h4>
            <p className="text-muted-foreground leading-relaxed">
              To be the most innovative and trusted real estate agency in the region, recognized for our ethical practices, technological advancement, and unwavering dedication to community development.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-zinc-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6"
                >
                  <Icon className="w-10 h-10 mx-auto text-primary mb-4 opacity-80" />
                  <p className="text-4xl md:text-5xl font-extrabold mb-2">{stat.value}</p>
                  <p className="text-zinc-400 font-medium tracking-wide uppercase text-sm">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-24 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-2">Our People</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">Meet The Experts</h3>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <div className="relative rounded-3xl overflow-hidden mb-4 bg-muted aspect-[3/4]">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy" 
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <span className="text-white font-medium text-sm border border-white/50 px-4 py-1.5 rounded-full backdrop-blur-md">View Profile</span>
                </div>
              </div>
              <div className="text-center">
                <h4 className="text-xl font-bold text-foreground">{member.name}</h4>
                <p className="text-primary font-medium">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Call To Action */}
      <CallToAction agencyName={params.agency} />

    </div>
  );
}
