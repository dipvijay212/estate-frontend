'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { updateConfig, saveConfig, resetConfig } from '../store/websiteThemeSlice';
import { websiteBuilderSchema, WebsiteBuilderFormData } from '../validation/websiteBuilderSchema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { 
  Loader2, UploadCloud, Image as ImageIcon, CheckCircle2, Save, 
  Paintbrush, Monitor, RotateCcw, AlertCircle
} from 'lucide-react';
import { WebsiteLivePreview } from './WebsiteLivePreview';

export function BrandingSettingsForm() {
  const dispatch = useDispatch();
  const { config, isDirty: isStoreDirty } = useSelector((state: RootState) => state.websiteTheme);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoUploaded, setLogoUploaded] = useState(false);
  const [faviconUploaded, setFaviconUploaded] = useState(false);
  const [bannerUploaded, setBannerUploaded] = useState(false);

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<WebsiteBuilderFormData>({
    resolver: zodResolver(websiteBuilderSchema),
    defaultValues: config,
    mode: 'onChange'
  });

  // Sync form to Redux on every change
  const currentValues = watch();
  useEffect(() => {
    // Dispatch all current values to redux for live preview
    dispatch(updateConfig(currentValues as any));
  }, [JSON.stringify(currentValues), dispatch]);

  // Handle Unsaved Changes warning on unload
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isStoreDirty && !isSubmitting) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isStoreDirty, isSubmitting]);

  const mockUpload = (setter: React.Dispatch<React.SetStateAction<boolean>>, field: keyof WebsiteBuilderFormData) => {
    toast.info('Uploading asset...');
    setTimeout(() => {
      setter(true);
      dispatch(updateConfig({ [field]: 'uploaded_url_mock' }));
      toast.success('Asset uploaded successfully.');
    }, 800);
  };

  const onReset = () => {
    dispatch(resetConfig());
    reset(config); // The config from redux will be reset in the next tick, but we can reset the form to the original state
    setLogoUploaded(false);
    setFaviconUploaded(false);
    setBannerUploaded(false);
    toast.info('Changes discarded.');
  };

  // Sync form reset when store is reset (e.g. via onReset)
  useEffect(() => {
    if (!isStoreDirty) {
      reset(config);
    }
  }, [isStoreDirty, reset, config]);

  const onSubmit = async (data: WebsiteBuilderFormData) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      dispatch(saveConfig());
      toast.success('Website configuration published!');
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Unsaved Changes Bar */}
      {isStoreDirty && (
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-center justify-between animate-in slide-in-from-top-4">
          <div className="flex items-center gap-3 text-amber-800">
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium text-sm">You have unsaved changes. They will not be visible to customers until you save.</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={onReset} disabled={isSubmitting} className="border-amber-200 text-amber-800 hover:bg-amber-100">
              <RotateCcw className="w-4 h-4 mr-2" /> Discard
            </Button>
            <Button size="sm" onClick={handleSubmit(onSubmit)} disabled={isSubmitting} className="bg-amber-600 hover:bg-amber-700 text-white">
              {isSubmitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</> : <><Save className="w-4 h-4 mr-2" /> Publish Changes</>}
            </Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Settings Form */}
        <div className="lg:col-span-1 space-y-6 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
          <div className="bg-card rounded-2xl shadow-sm border overflow-hidden">
            <div className="bg-muted/30 p-5 border-b sticky top-0 z-10 backdrop-blur-md">
              <h2 className="text-lg font-bold flex items-center gap-2"><Paintbrush className="w-5 h-5 text-primary" /> Website Builder</h2>
              <p className="text-muted-foreground text-xs mt-1">Configure your branding and content.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-8">
              
              {/* General Section */}
              <div className="space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b pb-2">General</h3>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Business Name</label>
                  <Input {...register('businessName')} />
                  {errors.businessName && <p className="text-destructive text-xs">{errors.businessName.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">About Text</label>
                  <Textarea rows={4} {...register('aboutText')} />
                  {errors.aboutText && <p className="text-destructive text-xs">{errors.aboutText.message}</p>}
                </div>
              </div>

              {/* Visuals Section */}
              <div className="space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b pb-2">Visuals & Colors</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-medium">Primary Color</label>
                    <div className="flex gap-2">
                      <Input type="color" className="w-10 h-10 p-1 cursor-pointer shrink-0" {...register('primaryColor')} />
                      <Input type="text" className="uppercase font-mono text-xs" {...register('primaryColor')} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium">Secondary Color</label>
                    <div className="flex gap-2">
                      <Input type="color" className="w-10 h-10 p-1 cursor-pointer shrink-0" {...register('secondaryColor')} />
                      <Input type="text" className="uppercase font-mono text-xs" {...register('secondaryColor')} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-dashed rounded-lg p-4 flex flex-col items-center text-center">
                    {logoUploaded ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500 mb-2" />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-muted-foreground mb-2" />
                    )}
                    <p className="text-xs font-medium mb-2">Logo</p>
                    <Button type="button" variant="secondary" size="sm" className="w-full text-xs h-7" onClick={() => mockUpload(setLogoUploaded, 'logo')}>
                      Upload
                    </Button>
                  </div>
                  <div className="border border-dashed rounded-lg p-4 flex flex-col items-center text-center">
                    {faviconUploaded ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500 mb-2" />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-muted-foreground mb-2" />
                    )}
                    <p className="text-xs font-medium mb-2">Favicon</p>
                    <Button type="button" variant="secondary" size="sm" className="w-full text-xs h-7" onClick={() => mockUpload(setFaviconUploaded, 'favicon')}>
                      Upload
                    </Button>
                  </div>
                </div>
              </div>

              {/* Hero Section */}
              <div className="space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b pb-2">Hero Section</h3>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Hero Title</label>
                  <Input {...register('heroTitle')} />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Hero Subtitle</label>
                  <Input {...register('heroSubtitle')} />
                </div>

                <div className="border border-dashed rounded-lg p-4 flex flex-col items-center text-center">
                  {bannerUploaded ? (
                    <CheckCircle2 className="w-6 h-6 text-green-500 mb-2" />
                  ) : (
                    <Monitor className="w-6 h-6 text-muted-foreground mb-2" />
                  )}
                  <p className="text-xs font-medium mb-2">Hero Banner Image (1920x1080)</p>
                  <Button type="button" variant="secondary" size="sm" onClick={() => mockUpload(setBannerUploaded, 'heroBanner')}>
                    <UploadCloud className="w-4 h-4 mr-2" /> Upload Banner
                  </Button>
                </div>
              </div>

              {/* Contact & Footer Section */}
              <div className="space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b pb-2">Contact & Footer</h3>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone</label>
                  <Input {...register('phone')} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" {...register('email')} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Address</label>
                  <Textarea rows={2} {...register('address')} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Footer Text</label>
                  <Input {...register('footerText')} />
                </div>
              </div>

              {/* Socials Section */}
              <div className="space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b pb-2">Social Links</h3>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Facebook</label>
                  <Input type="url" placeholder="https://..." {...register('facebook')} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Instagram</label>
                  <Input type="url" placeholder="https://..." {...register('instagram')} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">LinkedIn</label>
                  <Input type="url" placeholder="https://..." {...register('linkedin')} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">YouTube</label>
                  <Input type="url" placeholder="https://..." {...register('youtube')} />
                </div>
              </div>

            </form>
          </div>
        </div>

        {/* Right Column: Live Preview */}
        <div className="lg:col-span-2 relative h-[800px]">
          <WebsiteLivePreview />
        </div>

      </div>
    </div>
  );
}
