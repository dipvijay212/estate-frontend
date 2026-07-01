export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  budget: number;
  currency: string;
  preferredArea: string;
  status: 'new' | 'contacted' | 'viewing' | 'negotiating' | 'closed' | 'lost';
  assignedProperty?: {
    id: string;
    title: string;
  };
  lastFollowUp: string;
  createdAt: string;
}
