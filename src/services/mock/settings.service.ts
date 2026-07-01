const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface Settings {
  id: string;
  businessName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  currency: string;
  timezone: string;
  notificationsEnabled: boolean;
  theme: 'light' | 'dark' | 'system';
}

let mockSettings: Settings = {
  id: 'SET-001',
  businessName: 'RealtyFlow Agency',
  contactEmail: 'admin@realtyflow.com',
  contactPhone: '+1 (555) 000-0000',
  address: '123 Business St, Suite 100, NY 10001',
  currency: 'USD',
  timezone: 'America/New_York',
  notificationsEnabled: true,
  theme: 'system'
};

export const settingsService = {
  async getSettings(): Promise<Settings> {
    await delay(500);
    return { ...mockSettings };
  },

  async updateSettings(data: Partial<Settings>): Promise<Settings> {
    await delay(800);
    mockSettings = {
      ...mockSettings,
      ...data
    };
    return { ...mockSettings };
  }
};
