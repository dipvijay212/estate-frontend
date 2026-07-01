import { z } from 'zod';

export const brandingSettingsSchema = z.object({
  primaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Must be a valid hex color'),
  secondaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Must be a valid hex color'),
  theme: z.enum(['modern', 'classic', 'minimalist'], {
    required_error: 'Please select a website theme'
  }),
});

export type BrandingSettingsFormData = z.infer<typeof brandingSettingsSchema>;
