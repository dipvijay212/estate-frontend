export interface Lead {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  interestedProperty?: {
    id: string;
    title: string;
  };
  source: 'website' | 'instagram' | 'facebook' | 'whatsapp' | 'phone' | 'walk_in' | 'referral';
  status: 'new' | 'contacted' | 'interested' | 'site_visit' | 'negotiation' | 'booked' | 'closed' | 'lost';
  priority: 'low' | 'medium' | 'high' | 'hot';
  expectedBudget?: number;
  expectedClosingDate?: string;
  nextFollowUp: string;
  notes?: string;
  assignedTo: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
}
