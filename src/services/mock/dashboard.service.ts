const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface Activity {
  id: string;
  title: string;
  desc: string;
  time: string;
  type: 'property' | 'lead' | 'task' | 'contract';
}

export interface LeadSummary {
  id: string;
  name: string;
  source: string;
  status: string;
  time: string;
}

export interface ChartData {
  name: string;
  revenue: number;
  growth: number;
}

export interface DashboardMetrics {
  totalProperties: number;
  activeListings: number;
  totalLeads: number;
  newLeads: number;
  totalCustomers: number;
  revenue: number;
  recentActivity: Activity[];
  recentLeads: LeadSummary[];
  chartData: ChartData[];
}

const mockMetrics: DashboardMetrics = {
  totalProperties: 112,
  activeListings: 89,
  totalLeads: 342,
  newLeads: 23,
  totalCustomers: 2405,
  revenue: 2450000,
  recentActivity: [
    { id: '1', title: 'Property Sold', desc: '123 Main St was marked as sold.', time: '2 hours ago', type: 'property' },
    { id: '2', title: 'New Lead', desc: 'Sarah Jenkins registered via Zillow.', time: '3 hours ago', type: 'lead' },
    { id: '3', title: 'Task Completed', desc: 'Follow up with David Smith.', time: '5 hours ago', type: 'task' },
    { id: '4', title: 'Contract Signed', desc: 'Lease agreement for 456 Oak Ave.', time: '1 day ago', type: 'contract' },
  ],
  recentLeads: [
    { id: '1', name: 'Sarah Jenkins', source: 'Zillow', status: 'New', time: '10m ago' },
    { id: '2', name: 'Michael Chen', source: 'Website', status: 'Contacted', time: '1h ago' },
    { id: '3', name: 'Emily Rodriguez', source: 'Referral', status: 'Qualified', time: '3h ago' },
    { id: '4', name: 'David Smith', source: 'Zillow', status: 'New', time: '5h ago' },
  ],
  chartData: [
    { name: 'Jan', revenue: 45000, growth: 12 },
    { name: 'Feb', revenue: 52000, growth: 18 },
    { name: 'Mar', revenue: 48000, growth: 15 },
    { name: 'Apr', revenue: 61000, growth: 22 },
    { name: 'May', revenue: 59000, growth: 19 },
    { name: 'Jun', revenue: 68000, growth: 25 },
  ]
};

export const dashboardService = {
  async getMetrics(): Promise<DashboardMetrics> {
    await delay(800);
    return mockMetrics;
  }
};
