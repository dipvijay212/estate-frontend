import { Lead } from '../types';

export const mockLeads: Lead[] = [
  {
    id: 'LEAD-001',
    customerName: 'Robert Fox',
    email: 'robert.fox@example.com',
    phone: '+1 (555) 111-2222',
    interestedProperty: {
      id: 'PROP-001',
      title: 'Luxury Villa in Beverly Hills'
    },
    source: 'website',
    status: 'new',
    priority: 'hot',
    expectedBudget: 1200000,
    nextFollowUp: '2023-11-25T10:00:00Z',
    assignedTo: {
      id: 'USR-01',
      name: 'Agent Sarah'
    },
    createdAt: '2023-11-24T08:00:00Z'
  },
  {
    id: 'LEAD-002',
    customerName: 'Esther Howard',
    email: 'esther.h@example.com',
    phone: '+1 (555) 333-4444',
    interestedProperty: {
      id: 'PROP-002',
      title: 'Downtown LA Penthouse'
    },
    source: 'instagram',
    status: 'interested',
    priority: 'medium',
    expectedBudget: 950000,
    nextFollowUp: '2023-11-26T14:30:00Z',
    assignedTo: {
      id: 'USR-02',
      name: 'Agent Mike'
    },
    createdAt: '2023-11-22T09:15:00Z'
  },
  {
    id: 'LEAD-003',
    customerName: 'Jenny Wilson',
    email: 'j.wilson@example.com',
    phone: '+1 (555) 555-6666',
    source: 'referral',
    status: 'site_visit',
    priority: 'high',
    expectedBudget: 1500000,
    nextFollowUp: '2023-11-24T16:00:00Z',
    assignedTo: {
      id: 'USR-01',
      name: 'Agent Sarah'
    },
    createdAt: '2023-11-20T11:45:00Z'
  },
  {
    id: 'LEAD-004',
    customerName: 'Guy Hawkins',
    email: 'guy.h@example.com',
    phone: '+1 (555) 777-8888',
    interestedProperty: {
      id: 'PROP-003',
      title: 'Modern Waterfront Home'
    },
    source: 'walk_in',
    status: 'negotiation',
    priority: 'high',
    nextFollowUp: '2023-11-28T09:30:00Z',
    assignedTo: {
      id: 'USR-03',
      name: 'Agent David'
    },
    createdAt: '2023-11-15T14:20:00Z'
  },
  {
    id: 'LEAD-005',
    customerName: 'Bessie Cooper',
    email: 'bessie.c@example.com',
    phone: '+1 (555) 999-0000',
    source: 'website',
    status: 'lost',
    priority: 'low',
    nextFollowUp: '2023-12-01T10:00:00Z',
    assignedTo: {
      id: 'USR-02',
      name: 'Agent Mike'
    },
    createdAt: '2023-10-10T08:30:00Z'
  }
];
