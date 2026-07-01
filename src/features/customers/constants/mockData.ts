import { Customer } from '../types';

export const mockCustomers: Customer[] = [
  {
    id: 'CUST-001',
    name: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    phone: '+1 (555) 123-4567',
    budget: 1200000,
    currency: 'USD',
    preferredArea: 'Beverly Hills, CA',
    status: 'negotiating',
    assignedProperty: {
      id: 'PROP-001',
      title: 'Modern Luxury Villa'
    },
    lastFollowUp: '2023-11-22T10:30:00Z',
    createdAt: '2023-10-15T08:00:00Z'
  },
  {
    id: 'CUST-002',
    name: 'Michael Chen',
    email: 'm.chen@example.com',
    phone: '+1 (555) 987-6543',
    budget: 850000,
    currency: 'USD',
    preferredArea: 'Downtown LA, CA',
    status: 'viewing',
    assignedProperty: {
      id: 'PROP-002',
      title: 'Downtown Penthouse Oasis'
    },
    lastFollowUp: '2023-11-20T14:15:00Z',
    createdAt: '2023-11-01T09:30:00Z'
  },
  {
    id: 'CUST-003',
    name: 'Emma Watson',
    email: 'emma.w@example.com',
    phone: '+1 (555) 456-7890',
    budget: 2500000,
    currency: 'USD',
    preferredArea: 'Santa Monica, CA',
    status: 'new',
    lastFollowUp: '2023-11-24T09:00:00Z',
    createdAt: '2023-11-23T16:45:00Z'
  },
  {
    id: 'CUST-004',
    name: 'David Rodriguez',
    email: 'david.r@example.com',
    phone: '+1 (555) 234-5678',
    budget: 650000,
    currency: 'USD',
    preferredArea: 'Pasadena, CA',
    status: 'closed',
    assignedProperty: {
      id: 'PROP-004',
      title: 'Classic Craftsman Home'
    },
    lastFollowUp: '2023-10-30T11:20:00Z',
    createdAt: '2023-09-10T14:10:00Z'
  },
  {
    id: 'CUST-005',
    name: 'Sophia Patel',
    email: 'spatel@example.com',
    phone: '+1 (555) 345-6789',
    budget: 450000,
    currency: 'USD',
    preferredArea: 'Silver Lake, CA',
    status: 'contacted',
    lastFollowUp: '2023-11-21T15:45:00Z',
    createdAt: '2023-11-18T10:05:00Z'
  },
  {
    id: 'CUST-006',
    name: 'James Wilson',
    email: 'jwilson@example.com',
    phone: '+1 (555) 876-5432',
    budget: 1500000,
    currency: 'USD',
    preferredArea: 'Malibu, CA',
    status: 'lost',
    lastFollowUp: '2023-11-05T09:30:00Z',
    createdAt: '2023-10-01T11:20:00Z'
  }
];
