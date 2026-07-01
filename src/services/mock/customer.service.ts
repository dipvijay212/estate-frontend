const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  type: 'buyer' | 'seller' | 'tenant' | 'landlord';
  status: 'active' | 'inactive' | 'lead';
  assignedPropertyId?: string;
  budget?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

let mockCustomers: Customer[] = [
  {
    id: 'CUST-001',
    firstName: 'Sarah',
    lastName: 'Connor',
    email: 'sarah@example.com',
    phone: '+1 (555) 123-4567',
    type: 'buyer',
    status: 'active',
    budget: 850000,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

export const customerService = {
  async getCustomers(): Promise<Customer[]> {
    await delay(600);
    return [...mockCustomers];
  },

  async getCustomer(id: string): Promise<Customer | null> {
    await delay(400);
    const customer = mockCustomers.find(c => c.id === id);
    return customer || null;
  },

  async createCustomer(data: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>): Promise<Customer> {
    await delay(800);
    const newCustomer: Customer = {
      ...data,
      id: `CUST-${Math.floor(Math.random() * 10000)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockCustomers.push(newCustomer);
    return newCustomer;
  },

  async updateCustomer(id: string, data: Partial<Customer>): Promise<Customer> {
    await delay(800);
    const index = mockCustomers.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Customer not found');
    
    const updatedCustomer = {
      ...mockCustomers[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    mockCustomers[index] = updatedCustomer;
    return updatedCustomer;
  },

  async deleteCustomer(id: string): Promise<void> {
    await delay(600);
    const index = mockCustomers.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Customer not found');
    mockCustomers.splice(index, 1);
  }
};
