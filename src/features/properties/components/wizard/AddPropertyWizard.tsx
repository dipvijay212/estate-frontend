'use client';

import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { propertySchema, PropertyFormData, stepFields } from '../../validation/propertySchema';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, Check, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { propertyService } from '@/services/mock/property.service';

import { Step1Basic } from './Step1Basic';
import { Step2Location } from './Step2Location';
import { Step3Pricing } from './Step3Pricing';
import { Step4Details } from './Step4Details';
import { Step5Amenities } from './Step5Amenities';
import { Step6Images } from './Step6Images';
import { Step7Preview } from './Step7Preview';

const steps = [
  { id: 0, title: 'Basic Info' },
  { id: 1, title: 'Location' },
  { id: 2, title: 'Pricing' },
  { id: 3, title: 'Details' },
  { id: 4, title: 'Amenities' },
  { id: 5, title: 'Images' },
  { id: 6, title: 'Preview' }
];

interface AddPropertyWizardProps {
  initialData?: Partial<PropertyFormData>;
  mode?: 'create' | 'edit';
  propertyId?: string;
}

export function AddPropertyWizard({ initialData, mode = 'create', propertyId }: AddPropertyWizardProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  
  const methods = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: initialData || {
      category: 'house',
      status: 'available',
      amenities: [],
      images: []
    },
    mode: 'onChange'
  });

  const { trigger, handleSubmit, formState: { isDirty } } = methods;

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

  const handleNext = async () => {
    const fieldsToValidate = stepFields[activeStep];
    const isStepValid = await trigger(fieldsToValidate as any);
    
    if (isStepValid) {
      setActiveStep(prev => Math.min(prev + 1, steps.length - 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      toast.error('Please fix the errors before proceeding.');
    }
  };

  const handleBack = () => {
    setActiveStep(prev => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveDraft = () => {
    if (!isDirty) {
      toast.info('No changes to save.');
      return;
    }
    toast.success('Draft saved successfully!');
    // Ideally we would reset isDirty here, but we'll leave it simple for mock
  };

  const onSubmit = async (data: PropertyFormData) => {
    setIsSubmitting(true);
    
    try {
      // Map PropertyFormData to Property structure for mock service
      const propertyPayload: any = {
        title: data.title,
        description: data.description,
        price: data.salePrice || data.rentPrice || 0,
        currency: 'USD',
        address: data.address,
        city: data.city,
        state: data.state,
        zipCode: data.area || '00000',
        country: 'USA',
        type: data.category === 'apartment' || data.category === 'house' || data.category === 'commercial' || data.category === 'land' ? data.category : 'house',
        status: data.status,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        squareFeet: data.squareFeet,
        yearBuilt: data.age ? parseInt(data.age) || 2020 : 2020,
        images: data.images,
        features: data.amenities
      };

      if (mode === 'edit' && propertyId) {
        await propertyService.updateProperty(propertyId, propertyPayload);
        toast.success('Property updated successfully!');
      } else {
        await propertyService.createProperty(propertyPayload);
        toast.success('Property published successfully!');
      }
      
      router.push('/dashboard/properties');
    } catch (error) {
      toast.error('Failed to save property. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0: return <Step1Basic />;
      case 1: return <Step2Location />;
      case 2: return <Step3Pricing />;
      case 3: return <Step4Details />;
      case 4: return <Step5Amenities />;
      case 5: return <Step6Images />;
      case 6: return <Step7Preview />;
      default: return <Step1Basic />;
    }
  };

  const progressPercentage = ((activeStep + 1) / steps.length) * 100;

  return (
    <div className="bg-card rounded-2xl shadow-sm border overflow-hidden">
      {/* Wizard Header & Progress */}
      <div className="bg-muted/30 p-6 border-b">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold">{mode === 'edit' ? 'Edit Property' : 'Add New Property'}</h2>
            <p className="text-muted-foreground text-sm mt-1">Step {activeStep + 1} of {steps.length}: {steps[activeStep].title}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleSaveDraft} disabled={isSubmitting}>
              <Save className="w-4 h-4 mr-2" /> Save Draft
            </Button>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="relative h-2 w-full bg-muted rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-primary transition-all duration-500 ease-in-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Step Indicators (Desktop) */}
        <div className="hidden md:flex justify-between mt-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors duration-300 ${
                activeStep === index 
                  ? 'bg-primary text-primary-foreground ring-4 ring-primary/20' 
                  : activeStep > index 
                    ? 'bg-primary/20 text-primary' 
                    : 'bg-muted text-muted-foreground'
              }`}>
                {activeStep > index ? <Check className="w-4 h-4" /> : index + 1}
              </div>
              <span className={`text-xs font-medium ${activeStep >= index ? 'text-foreground' : 'text-muted-foreground'}`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6 md:p-8 min-h-[400px]">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {renderStep()}
          </form>
        </FormProvider>
      </div>

      {/* Wizard Footer / Navigation */}
      <div className="p-6 border-t bg-muted/10 flex justify-between items-center">
        <Button 
          type="button" 
          variant="outline" 
          onClick={handleBack} 
          disabled={activeStep === 0 || isSubmitting}
        >
          <ChevronLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        
        {activeStep < steps.length - 1 ? (
          <Button type="button" onClick={handleNext}>
            Next Step <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button 
            type="button" 
            onClick={handleSubmit(onSubmit)} 
            disabled={isSubmitting || (mode === 'edit' && !isDirty)}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {isSubmitting 
              ? (mode === 'edit' ? 'Updating...' : 'Publishing...') 
              : (mode === 'edit' ? 'Update Property' : 'Publish Property')} 
            <Check className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}
