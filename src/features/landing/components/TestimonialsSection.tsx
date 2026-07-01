'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heading, SubHeading } from '@/components/Theme/Typography';
import { Star, Quote, Building2, Hexagon, Triangle } from 'lucide-react';

const testimonials = [
  {
    quote: "RealtyFlow completely transformed how we manage our 2,000+ units. The automated workflows saved us from hiring three additional property managers this year.",
    author: 'Sarah Jenkins',
    role: 'Operations Director',
    company: 'Nexus Properties',
    companyIcon: Hexagon,
    stat: '+40%',
    statLabel: 'Operational Efficiency',
  },
  {
    quote: "The financial reporting is unparalleled. What used to take our accounting team a week now takes literally three clicks. The ROI was immediate.",
    author: 'David Chen',
    role: 'Chief Financial Officer',
    company: 'Apex Real Estate',
    companyIcon: Triangle,
    stat: '15 hrs',
    statLabel: 'Saved weekly per user',
  },
  {
    quote: "We scaled from 50 to 500 units in two years. The tenant portal and automated lead management are the best in the industry. Highly recommended.",
    author: 'Michael Torres',
    role: 'Managing Partner',
    company: 'Lumina Group',
    companyIcon: Building2,
    stat: '10x',
    statLabel: 'Portfolio Growth',
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 md:py-24 lg:py-32 bg-muted/30 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none -z-10"></div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <SubHeading className="text-primary mb-2">Proven Success</SubHeading>
            <Heading className="text-3xl md:text-5xl mb-6 font-extrabold tracking-tight">Trusted by industry leaders</Heading>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-card border border-border/60 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group relative overflow-hidden"
            >
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

              {/* Header: Stars & Quote Icon */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-muted/50 group-hover:text-primary/20 transition-colors" />
              </div>

              {/* Review Text */}
              <p className="text-lg text-foreground font-medium leading-relaxed mb-8 flex-grow">
                &quot;{testimonial.quote}&quot;
              </p>

              {/* Statistics Block */}
              <div className="bg-primary/5 rounded-2xl p-4 mb-8 border border-primary/10">
                <div className="text-2xl font-black text-primary mb-1">{testimonial.stat}</div>
                <div className="text-sm text-muted-foreground font-medium">{testimonial.statLabel}</div>
              </div>

              {/* Author & Company Info */}
              <div className="flex items-center justify-between pt-6 border-t border-border/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-blue-400 flex items-center justify-center text-primary-foreground font-bold text-lg shadow-inner">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm">{testimonial.author}</h4>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                
                {/* Mock Company Logo */}
                <div className="flex items-center gap-2 text-muted-foreground opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
                  <testimonial.companyIcon className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-wider hidden sm:block lg:hidden xl:block">{testimonial.company}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
