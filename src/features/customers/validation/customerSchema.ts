import { z } from 'zod';

export const customerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  budget: z.number().min(0, 'Budget must be a positive number'),
  preferredPropertyType: z.enum(['house', 'apartment', 'commercial', 'land'], { 
    required_error: 'Please select a property type' 
  }),
  preferredCity: z.string().min(2, 'City is required'),
  preferredArea: z.string().min(2, 'Area is required'),
  requirements: z.string().optional(),
  source: z.enum(['website', 'referral', 'walk_in', 'social_media', 'other'], {
    required_error: 'Please select a lead source'
  }),
  notes: z.string().optional(),
});

export type CustomerFormData = z.infer<typeof customerSchema>;
