'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { websiteMockData } from '@/features/website/constants/mockData';
import { ContactForm } from '@/features/website/components/ContactForm';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, Clock, MessageCircle, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { useAgencyTheme } from '@/features/website/components/ThemeProvider';

export default function AgencyContactClient({ params }: { params: { agency: string } }) {
  const theme = useAgencyTheme();

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
            Get in <span className="text-primary">Touch</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Whether you're looking to buy, sell, or rent, our team of experts at {theme.businessName} is here to help you every step of the way.
          </motion.p>
        </div>
      </div>

      <section className="py-24 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-10"
          >
            <div>
              <h2 className="text-3xl font-extrabold text-foreground tracking-tight mb-8">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-lg">Office Address</h4>
                    <p className="text-muted-foreground mt-1">{theme.contact.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-lg">Phone Number</h4>
                    <p className="text-muted-foreground mt-1">{theme.contact.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-lg">Email Address</h4>
                    <p className="text-muted-foreground mt-1">{theme.contact.email}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t">
              <h4 className="font-bold text-foreground text-lg mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" /> Office Hours
              </h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex justify-between"><span>Monday - Friday:</span> <span className="font-medium text-foreground">9:00 AM - 6:00 PM</span></li>
                <li className="flex justify-between"><span>Saturday:</span> <span className="font-medium text-foreground">10:00 AM - 4:00 PM</span></li>
                <li className="flex justify-between"><span>Sunday:</span> <span className="font-medium text-foreground">Closed</span></li>
              </ul>
            </div>

            <div className="pt-8 border-t">
              <h4 className="font-bold text-foreground text-lg mb-4">Quick Connect</h4>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="flex-1 h-12 bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Phone className="w-5 h-5 mr-2" /> Call Now
                </Button>
                <Button className="flex-1 h-12 bg-[#25D366] hover:bg-[#128C7E] text-white">
                  <MessageCircle className="w-5 h-5 mr-2" /> WhatsApp
                </Button>
              </div>
            </div>

            <div className="pt-8 border-t">
              <h4 className="font-bold text-foreground text-lg mb-4">Follow Us</h4>
              <div className="flex gap-4">
                {theme.socialLinks.facebook && (
                  <a href={theme.socialLinks.facebook} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                )}
                {theme.socialLinks.instagram && (
                  <a href={theme.socialLinks.instagram} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                )}
                {theme.socialLinks.linkedin && (
                  <a href={theme.socialLinks.linkedin} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {theme.socialLinks.twitter && (
                  <a href={theme.socialLinks.twitter} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>

          </motion.div>

          {/* Right Column: Form & Map */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-8"
          >
            <ContactForm />

            {/* Google Map Placeholder */}
            <div className="bg-card rounded-3xl shadow-sm border p-4">
              <div className="w-full h-[300px] bg-muted rounded-2xl flex items-center justify-center border shadow-inner overflow-hidden relative">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cartographer.png")' }} />
                <div className="text-center z-10">
                  <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <MapPin className="w-7 h-7 text-primary" />
                  </div>
                  <p className="font-bold text-lg text-foreground">Our Headquarters</p>
                  <p className="text-sm text-muted-foreground">{theme.contact.address}</p>
                </div>
              </div>
            </div>

          </motion.div>

        </div>
      </section>

    </div>
  );
}
