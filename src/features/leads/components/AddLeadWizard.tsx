'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { leadSchema, LeadFormData } from '../validation/leadSchema';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Loader2, ChevronRight, ChevronLeft, Check } from 'lucide-react';

const STEPS = [
  { id: 'lead_info', title: 'Lead Info' },
  { id: 'source_status', title: 'Source & Status' },
  { id: 'planning', title: 'Planning' },
  { id: 'details', title: 'Details' }
];

interface AddLeadWizardProps {
  initialData?: Partial<LeadFormData>;
  mode?: 'create' | 'edit';
}

export function AddLeadWizard({ initialData, mode = 'create' }: AddLeadWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, trigger, setValue, watch, formState: { errors, isDirty } } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: initialData || {
      source: 'website',
      priority: 'medium',
      status: 'new'
    },
    mode: 'onChange'
  });

  const source = watch('source');
  const priority = watch('priority');
  const status = watch('status');

  // Unsaved changes alert
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty && !isSubmitting) {
        e.preventDefault();
        e.returnValue = ''; // Required for Chrome
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty, isSubmitting]);

  const validateStep = async (stepIndex: number) => {
    let fieldsToValidate: (keyof LeadFormData)[] = [];
    
    if (stepIndex === 0) fieldsToValidate = ['customerName', 'phone', 'email'];
    if (stepIndex === 1) fieldsToValidate = ['source', 'priority', 'status'];
    if (stepIndex === 2) fieldsToValidate = ['interestedPropertyId', 'expectedBudget', 'expectedClosingDate', 'nextFollowUp'];
    if (stepIndex === 3) fieldsToValidate = ['notes'];

    const isValid = await trigger(fieldsToValidate);
    return isValid;
  };

  const nextStep = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid) setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
  };

  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const onSubmit = async (data: LeadFormData) => {
    const isValid = await validateStep(currentStep);
    if (!isValid) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(mode === 'edit' ? 'Lead updated successfully!' : 'Lead created successfully!');
      router.push('/dashboard/leads');
    }, 1500);
  };

  return (
    <div className="bg-card rounded-2xl shadow-sm border overflow-hidden animate-in fade-in duration-500 max-w-4xl mx-auto">
      
      {/* Progress Bar Header */}
      <div className="bg-muted/30 border-b">
        <div className="flex justify-between p-6 overflow-x-auto gap-4">
          {STEPS.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            return (
              <div key={step.id} className={`flex items-center gap-3 shrink-0 ${isActive || isCompleted ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-semibold transition-colors
                  ${isActive ? 'border-primary bg-primary text-primary-foreground' : 
                    isCompleted ? 'border-primary bg-primary/10 text-primary' : 'border-muted-foreground/30'}`}>
                  {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
                </div>
                <span className={`text-sm font-medium ${isActive ? 'text-foreground' : ''}`}>{step.title}</span>
                {index < STEPS.length - 1 && <ChevronRight className="w-4 h-4 text-muted-foreground/30 ml-2" />}
              </div>
            );
          })}
        </div>
        <div className="w-full bg-muted h-1">
          <div 
            className="bg-primary h-1 transition-all duration-300 ease-in-out" 
            style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
        
        {/* Step 1: Lead Info */}
        {currentStep === 0 && (
          <div className="space-y-6 animate-in slide-in-from-right-4">
            <h3 className="text-xl font-bold">Lead Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Customer Name <span className="text-destructive">*</span></label>
                <Input placeholder="John Doe" {...register('customerName')} />
                {errors.customerName && <p className="text-destructive text-sm">{errors.customerName.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number <span className="text-destructive">*</span></label>
                <Input placeholder="+1 (555) 000-0000" {...register('phone')} />
                {errors.phone && <p className="text-destructive text-sm">{errors.phone.message}</p>}
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input type="email" placeholder="john@example.com" {...register('email')} />
                {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Source & Status */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in slide-in-from-right-4">
            <h3 className="text-xl font-bold">Source & Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Lead Source <span className="text-destructive">*</span></label>
                <Select value={source} onValueChange={(val: any) => setValue('source', val, { shouldValidate: true })}>
                  <SelectTrigger><SelectValue placeholder="Select Source" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="website">Website</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    <SelectItem value="phone">Phone</SelectItem>
                    <SelectItem value="walk_in">Walk-in</SelectItem>
                    <SelectItem value="referral">Referral</SelectItem>
                  </SelectContent>
                </Select>
                {errors.source && <p className="text-destructive text-sm">{errors.source.message}</p>}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Priority <span className="text-destructive">*</span></label>
                <Select value={priority} onValueChange={(val: any) => setValue('priority', val, { shouldValidate: true })}>
                  <SelectTrigger><SelectValue placeholder="Select Priority" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="hot">Hot 🔥</SelectItem>
                  </SelectContent>
                </Select>
                {errors.priority && <p className="text-destructive text-sm">{errors.priority.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Status <span className="text-destructive">*</span></label>
                <Select value={status} onValueChange={(val: any) => setValue('status', val, { shouldValidate: true })}>
                  <SelectTrigger><SelectValue placeholder="Select Status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="interested">Interested</SelectItem>
                    <SelectItem value="site_visit">Site Visit</SelectItem>
                    <SelectItem value="negotiation">Negotiation</SelectItem>
                    <SelectItem value="booked">Booked</SelectItem>
                    <SelectItem value="closed">Closed (Won)</SelectItem>
                    <SelectItem value="lost">Lost</SelectItem>
                  </SelectContent>
                </Select>
                {errors.status && <p className="text-destructive text-sm">{errors.status.message}</p>}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Planning */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in slide-in-from-right-4">
            <h3 className="text-xl font-bold">Property & Planning</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Interested Property (ID/Name)</label>
                <Input placeholder="Leave blank if general inquiry" {...register('interestedPropertyId')} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Expected Budget ($)</label>
                <Input type="number" placeholder="0" {...register('expectedBudget', { valueAsNumber: true })} />
                {errors.expectedBudget && <p className="text-destructive text-sm">{errors.expectedBudget.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Expected Closing Date</label>
                <Input type="date" {...register('expectedClosingDate')} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Next Follow-up Date <span className="text-destructive">*</span></label>
                <Input type="datetime-local" {...register('nextFollowUp')} />
                {errors.nextFollowUp && <p className="text-destructive text-sm">{errors.nextFollowUp.message}</p>}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Details */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in slide-in-from-right-4">
            <h3 className="text-xl font-bold">Additional Notes</h3>
            <div className="space-y-2">
              <label className="text-sm font-medium">Internal Notes & Requirements</label>
              <Textarea 
                placeholder="Log initial conversation details, specific needs, or red flags..." 
                className="min-h-[150px]"
                {...register('notes')} 
              />
            </div>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="flex items-center justify-between pt-8 mt-8 border-t">
          <Button 
            type="button" 
            variant="outline" 
            onClick={currentStep === 0 ? () => router.back() : prevStep}
            disabled={isSubmitting}
          >
            {currentStep === 0 ? 'Cancel' : (
              <><ChevronLeft className="w-4 h-4 mr-2" /> Back</>
            )}
          </Button>

          {currentStep < STEPS.length - 1 ? (
            <Button type="button" onClick={nextStep}>
              Next Step <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting || (mode === 'edit' && !isDirty)}>
              {isSubmitting ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</>
              ) : (
                <><Check className="w-4 h-4 mr-2" /> {mode === 'edit' ? 'Update Lead' : 'Save Lead'}</>
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
