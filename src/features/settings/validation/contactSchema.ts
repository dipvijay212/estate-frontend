import { z } from 'zod';

export const contactSettingsSchema = z.object({
  whatsappNumber: z.string().optional(),
  officePhone: z.string().optional(),
  email: z.string().email('Valid email is required').optional().or(z.literal('')),
  website: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  facebook: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  instagram: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  linkedin: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  youtube: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  googleMapsUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

export type ContactSettingsFormData = z.infer<typeof contactSettingsSchema>;
