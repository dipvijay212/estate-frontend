'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Heading, SubHeading, Body } from '@/components/Theme/Typography';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, Clock, CheckCircle2 } from 'lucide-react';

const formSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  company: z.string().min(2, 'Company name is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof formSchema>;

export function ContactFormSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Form data:', data);
    setIsSubmitted(true);
    reset();
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column: Form */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SubHeading className="text-primary mb-2">Get in touch</SubHeading>
              <Heading className="text-3xl md:text-5xl mb-6 font-extrabold tracking-tight">Let&apos;s build together</Heading>
              <Body className="text-muted-foreground text-lg mt-0 mb-10">
                Whether you have a question about features, trials, pricing, or need a demo, our team is ready to answer all your questions.
              </Body>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {isSubmitted ? (
                <div className="bg-primary/10 border border-primary/20 rounded-2xl p-8 text-center flex flex-col items-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground">We&apos;ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-medium text-foreground">First Name</label>
                      <Input id="firstName" {...register('firstName')} placeholder="John" className="h-12" />
                      {errors.firstName && <p className="text-destructive text-sm mt-1">{errors.firstName.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium text-foreground">Last Name</label>
                      <Input id="lastName" {...register('lastName')} placeholder="Doe" className="h-12" />
                      {errors.lastName && <p className="text-destructive text-sm mt-1">{errors.lastName.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">Work Email</label>
                    <Input id="email" type="email" {...register('email')} placeholder="john@agency.com" className="h-12" />
                    {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="company" className="text-sm font-medium text-foreground">Company Name</label>
                    <Input id="company" {...register('company')} placeholder="Acme Real Estate" className="h-12" />
                    {errors.company && <p className="text-destructive text-sm mt-1">{errors.company.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground">How can we help?</label>
                    <Textarea 
                      id="message" 
                      {...register('message')} 
                      placeholder="Tell us about your portfolio and current challenges..." 
                      className="min-h-[150px] resize-y" 
                    />
                    {errors.message && <p className="text-destructive text-sm mt-1">{errors.message.message}</p>}
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full h-12 text-base font-semibold shadow-sm">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </motion.div>
          </div>

          {/* Right Column: Business Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col"
          >
            {/* Map Placeholder */}
            <div className="w-full h-64 md:h-80 bg-muted/30 rounded-3xl border border-border/50 relative overflow-hidden mb-10 flex items-center justify-center">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-background to-background"></div>
              <div className="text-center relative z-10">
                <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-muted-foreground font-medium">Interactive Map Placeholder</p>
                <p className="text-sm text-muted-foreground/70">San Francisco HQ</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Headquarters</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      100 Market Street<br />
                      Suite 300<br />
                      San Francisco, CA 94105
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Business Hours</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Monday - Friday<br />
                      9:00 AM - 6:00 PM PST<br />
                      Weekend Support for Enterprise
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Email Us</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      sales@realtyflow.com<br />
                      support@realtyflow.com
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Call Us</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      +1 (800) 123-4567<br />
                      +1 (415) 987-6543
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
