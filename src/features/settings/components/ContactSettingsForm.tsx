'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSettingsSchema, ContactSettingsFormData } from '../validation/contactSchema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { 
  Loader2, Save, MessageCircle, Phone, Mail, Globe, 
  Share2, Camera, Briefcase, Video, MapPin, Contact
} from 'lucide-react';

export function ContactSettingsForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, watch, reset, formState: { errors, isDirty } } = useForm<ContactSettingsFormData>({
    resolver: zodResolver(contactSettingsSchema),
    defaultValues: {
      whatsappNumber: '+1 (555) 123-4567',
      officePhone: '+1 (800) 999-8888',
      email: 'contact@realtyflow.com',
      website: 'https://realtyflow.com',
      facebook: 'https://facebook.com/realtyflow',
      instagram: 'https://instagram.com/realtyflow',
      linkedin: 'https://linkedin.com/company/realtyflow',
      youtube: 'https://youtube.com/c/realtyflow',
      googleMapsUrl: 'https://maps.google.com/?q=realtyflow',
    },
    mode: 'onChange'
  });

  const formValues = watch();

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty && !isSubmitting) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty, isSubmitting]);

  const onSubmit = async (data: ContactSettingsFormData) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      reset(data);
      toast.success('Contact settings updated successfully!');
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      
      {/* Form Column */}
      <div className="xl:col-span-2 space-y-6">
        <div className="bg-card rounded-2xl shadow-sm border overflow-hidden animate-in fade-in duration-500">
          <div className="bg-muted/30 p-6 border-b">
            <h2 className="text-xl font-bold flex items-center gap-2"><Contact className="w-5 h-5 text-primary" /> Contact & Socials</h2>
            <p className="text-muted-foreground text-sm mt-1">Manage public contact details and social media integrations.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8 space-y-8">
            
            {/* Primary Contact */}
            <div className="space-y-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground border-b pb-2">Direct Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-green-500" /> WhatsApp Number
                  </label>
                  <Input placeholder="+1 (555) 000-0000" {...register('whatsappNumber')} />
                  {errors.whatsappNumber && <p className="text-destructive text-sm">{errors.whatsappNumber.message}</p>}
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Phone className="w-4 h-4 text-blue-500" /> Office Phone
                  </label>
                  <Input placeholder="+1 (800) 000-0000" {...register('officePhone')} />
                  {errors.officePhone && <p className="text-destructive text-sm">{errors.officePhone.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Mail className="w-4 h-4 text-red-500" /> Email Address
                  </label>
                  <Input type="email" placeholder="hello@company.com" {...register('email')} />
                  {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Globe className="w-4 h-4 text-indigo-500" /> Website URL
                  </label>
                  <Input type="url" placeholder="https://..." {...register('website')} />
                  {errors.website && <p className="text-destructive text-sm">{errors.website.message}</p>}
                </div>

              </div>
            </div>

            {/* Social Media */}
            <div className="space-y-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground border-b pb-2">Social Profiles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Share2 className="w-4 h-4 text-blue-600" /> Facebook
                  </label>
                  <Input type="url" placeholder="https://facebook.com/..." {...register('facebook')} />
                  {errors.facebook && <p className="text-destructive text-sm">{errors.facebook.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Camera className="w-4 h-4 text-pink-600" /> Instagram
                  </label>
                  <Input type="url" placeholder="https://instagram.com/..." {...register('instagram')} />
                  {errors.instagram && <p className="text-destructive text-sm">{errors.instagram.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-blue-700" /> LinkedIn
                  </label>
                  <Input type="url" placeholder="https://linkedin.com/..." {...register('linkedin')} />
                  {errors.linkedin && <p className="text-destructive text-sm">{errors.linkedin.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Video className="w-4 h-4 text-red-600" /> YouTube
                  </label>
                  <Input type="url" placeholder="https://youtube.com/..." {...register('youtube')} />
                  {errors.youtube && <p className="text-destructive text-sm">{errors.youtube.message}</p>}
                </div>

              </div>
            </div>

            {/* Location */}
            <div className="space-y-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground border-b pb-2">Maps Integration</h3>
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-600" /> Google Maps URL
                </label>
                <Input type="url" placeholder="https://maps.google.com/..." {...register('googleMapsUrl')} />
                {errors.googleMapsUrl && <p className="text-destructive text-sm">{errors.googleMapsUrl.message}</p>}
                <p className="text-xs text-muted-foreground mt-1">Paste the share link from Google Maps to enable location widgets.</p>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex justify-end pt-6 border-t mt-8">
              <Button type="submit" disabled={isSubmitting || !isDirty} className="min-w-[150px]">
                {isSubmitting ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</>
                ) : (
                  <><Save className="w-4 h-4 mr-2" /> Save Changes</>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Live Preview Column */}
      <div className="xl:col-span-1">
        <div className="sticky top-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Website Footer Preview</h3>
          
          <div className="rounded-2xl border shadow-xl overflow-hidden bg-zinc-950 text-zinc-300 p-6 transition-all duration-300 relative">
            
            <div className="mb-8">
              <div className="flex items-center gap-2 text-white mb-4">
                <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-white" />
                </div>
                <span className="font-bold text-lg">RealtyFlow</span>
              </div>
              <p className="text-sm text-zinc-400 mb-6 line-clamp-3">
                Your trusted partner in finding the perfect home. Reach out to us through any of the channels below.
              </p>
            </div>

            {/* Preview Direct Contacts */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 transition-all">
                <div className="p-2 rounded-full bg-zinc-900 border border-zinc-800">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                </div>
                {formValues.googleMapsUrl ? (
                  <span className="text-sm hover:text-white cursor-pointer text-emerald-400 truncate w-[200px]">View on Maps</span>
                ) : (
                  <span className="text-sm text-zinc-600 italic">No Map URL</span>
                )}
              </div>
              
              <div className="flex items-center gap-3 transition-all">
                <div className="p-2 rounded-full bg-zinc-900 border border-zinc-800">
                  <MessageCircle className="w-4 h-4 text-green-400" />
                </div>
                {formValues.whatsappNumber ? (
                  <span className="text-sm font-medium text-white">{formValues.whatsappNumber}</span>
                ) : (
                  <span className="text-sm text-zinc-600 italic">No WhatsApp</span>
                )}
              </div>
              
              <div className="flex items-center gap-3 transition-all">
                <div className="p-2 rounded-full bg-zinc-900 border border-zinc-800">
                  <Phone className="w-4 h-4 text-blue-400" />
                </div>
                {formValues.officePhone ? (
                  <span className="text-sm">{formValues.officePhone}</span>
                ) : (
                  <span className="text-sm text-zinc-600 italic">No Office Phone</span>
                )}
              </div>

              <div className="flex items-center gap-3 transition-all">
                <div className="p-2 rounded-full bg-zinc-900 border border-zinc-800">
                  <Mail className="w-4 h-4 text-red-400" />
                </div>
                {formValues.email ? (
                  <span className="text-sm truncate w-[200px]">{formValues.email}</span>
                ) : (
                  <span className="text-sm text-zinc-600 italic">No Email</span>
                )}
              </div>
            </div>

            {/* Preview Socials */}
            <div className="pt-6 border-t border-zinc-800 flex flex-wrap gap-4">
              <div className={`p-2 rounded-full border transition-all ${formValues.facebook ? 'bg-zinc-900 border-zinc-700 text-blue-400 hover:bg-zinc-800' : 'bg-transparent border-dashed border-zinc-800 text-zinc-700'}`}>
                <Share2 className="w-5 h-5" />
              </div>
              <div className={`p-2 rounded-full border transition-all ${formValues.instagram ? 'bg-zinc-900 border-zinc-700 text-pink-400 hover:bg-zinc-800' : 'bg-transparent border-dashed border-zinc-800 text-zinc-700'}`}>
                <Camera className="w-5 h-5" />
              </div>
              <div className={`p-2 rounded-full border transition-all ${formValues.linkedin ? 'bg-zinc-900 border-zinc-700 text-blue-500 hover:bg-zinc-800' : 'bg-transparent border-dashed border-zinc-800 text-zinc-700'}`}>
                <Briefcase className="w-5 h-5" />
              </div>
              <div className={`p-2 rounded-full border transition-all ${formValues.youtube ? 'bg-zinc-900 border-zinc-700 text-red-500 hover:bg-zinc-800' : 'bg-transparent border-dashed border-zinc-800 text-zinc-700'}`}>
                <Video className="w-5 h-5" />
              </div>
              <div className={`p-2 rounded-full border transition-all ${formValues.website ? 'bg-zinc-900 border-zinc-700 text-indigo-400 hover:bg-zinc-800' : 'bg-transparent border-dashed border-zinc-800 text-zinc-700'}`}>
                <Globe className="w-5 h-5" />
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
