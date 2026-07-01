const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: 'website' | 'referral' | 'portal' | 'other';
  status: 'new' | 'contacted' | 'qualified' | 'lost' | 'won';
  priority: 'low' | 'medium' | 'high';
  notes?: string;
  assignedPropertyId?: string;
  createdAt: string;
  updatedAt: string;
}

let mockLeads: Lead[] = [
  {
    id: 'LEAD-001',
    name: 'Michael Scott',
    email: 'michael@dundermifflin.com',
    phone: '+1 (555) 987-6543',
    source: 'website',
    status: 'new',
    priority: 'high',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

export const leadService = {
  async getLeads(): Promise<Lead[]> {
    await delay(600);
    return [...mockLeads];
  },

  async getLead(id: string): Promise<Lead | null> {
    await delay(400);
    const lead = mockLeads.find(l => l.id === id);
    return lead || null;
  },

  async createLead(data: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>): Promise<Lead> {
    await delay(800);
    const newLead: Lead = {
      ...data,
      id: `LEAD-${Math.floor(Math.random() * 10000)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockLeads.push(newLead);
    return newLead;
  },

  async updateLead(id: string, data: Partial<Lead>): Promise<Lead> {
    await delay(800);
    const index = mockLeads.findIndex(l => l.id === id);
    if (index === -1) throw new Error('Lead not found');
    
    const updatedLead = {
      ...mockLeads[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    mockLeads[index] = updatedLead;
    return updatedLead;
  },

  async deleteLead(id: string): Promise<void> {
    await delay(600);
    const index = mockLeads.findIndex(l => l.id === id);
    if (index === -1) throw new Error('Lead not found');
    mockLeads.splice(index, 1);
  }
};
