import { z } from 'zod';

export const leadSchema = z.object({
  customerName: z.string().min(2, 'Customer name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone number is required'),
  email: z.string().email('Valid email is required').optional().or(z.literal('')),
  interestedPropertyId: z.string().optional(),
  source: z.enum(['website', 'instagram', 'facebook', 'whatsapp', 'phone', 'walk_in', 'referral'], {
    required_error: 'Please select a lead source'
  }),
  priority: z.enum(['low', 'medium', 'high', 'hot'], {
    required_error: 'Please select priority'
  }),
  status: z.enum(['new', 'contacted', 'interested', 'site_visit', 'negotiation', 'booked', 'closed', 'lost'], {
    required_error: 'Please select status'
  }),
  expectedBudget: z.number().min(0, 'Budget must be positive').optional(),
  expectedClosingDate: z.string().optional(),
  nextFollowUp: z.string().min(1, 'Follow-up date is required'),
  notes: z.string().optional(),
});

export type LeadFormData = z.infer<typeof leadSchema>;
