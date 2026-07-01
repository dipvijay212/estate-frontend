import { z } from 'zod';

export const businessSettingsSchema = z.object({
  businessName: z.string().min(2, 'Business Name must be at least 2 characters'),
  ownerName: z.string().min(2, 'Owner Name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  email: z.string().email('Please enter a valid email address'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  pincode: z.string().min(4, 'Pincode must be at least 4 characters'),
  businessDescription: z.string().min(10, 'Description must be at least 10 characters'),
  gstNumber: z.string().optional(),
  reraNumber: z.string().optional(),
  businessHours: z.string().min(2, 'Business hours are required'),
});

export type BusinessSettingsFormData = z.infer<typeof businessSettingsSchema>;
