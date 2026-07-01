import { z } from 'zod';

export const websiteBuilderSchema = z.object({
  businessName: z.string().min(2, 'Business name must be at least 2 characters'),
  primaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Must be a valid hex color'),
  secondaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Must be a valid hex color'),
  heroTitle: z.string().min(1, 'Hero title is required'),
  heroSubtitle: z.string().min(1, 'Hero subtitle is required'),
  aboutText: z.string().min(10, 'About text must be at least 10 characters'),
  phone: z.string().min(5, 'Phone number is required'),
  email: z.string().email('Must be a valid email'),
  address: z.string().min(5, 'Address is required'),
  facebook: z.string().url('Must be a valid URL').or(z.literal('')),
  instagram: z.string().url('Must be a valid URL').or(z.literal('')),
  youtube: z.string().url('Must be a valid URL').or(z.literal('')),
  linkedin: z.string().url('Must be a valid URL').or(z.literal('')),
  footerText: z.string().min(1, 'Footer text is required'),
});

export type WebsiteBuilderFormData = z.infer<typeof websiteBuilderSchema>;
