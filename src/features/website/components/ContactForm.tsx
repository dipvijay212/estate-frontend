'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Loader2, Send } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  subject: z.string().min(5, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters')
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur'
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    // Mock API call
    setTimeout(() => {
      setIsSubmitting(false);
      reset();
      toast.success("Message sent successfully! We'll get back to you soon.");
    }, 1500);
  };

  return (
    <div className="bg-card rounded-3xl shadow-xl shadow-black/5 border p-8 md:p-10">
      <h3 className="text-2xl font-bold text-foreground mb-2">Send us a Message</h3>
      <p className="text-muted-foreground mb-8">Fill out the form below and our team will get back to you within 24 hours.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Your Name <span className="text-destructive">*</span></label>
            <Input placeholder="John Doe" className="h-12 bg-muted/50" {...register('name')} />
            {errors.name && <p className="text-destructive text-sm">{errors.name.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email Address <span className="text-destructive">*</span></label>
            <Input type="email" placeholder="john@example.com" className="h-12 bg-muted/50" {...register('email')} />
            {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Phone Number <span className="text-destructive">*</span></label>
            <Input type="tel" placeholder="+1 (555) 000-0000" className="h-12 bg-muted/50" {...register('phone')} />
            {errors.phone && <p className="text-destructive text-sm">{errors.phone.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Subject <span className="text-destructive">*</span></label>
            <Input placeholder="Property Inquiry" className="h-12 bg-muted/50" {...register('subject')} />
            {errors.subject && <p className="text-destructive text-sm">{errors.subject.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Message <span className="text-destructive">*</span></label>
          <Textarea 
            placeholder="I'm interested in..." 
            className="min-h-[150px] bg-muted/50 resize-y" 
            {...register('message')} 
          />
          {errors.message && <p className="text-destructive text-sm">{errors.message.message}</p>}
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full h-14 text-lg rounded-xl mt-4">
          {isSubmitting ? (
            <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Sending Message...</>
          ) : (
            <><Send className="w-5 h-5 mr-2" /> Send Message</>
          )}
        </Button>
      </form>
    </div>
  );
}
