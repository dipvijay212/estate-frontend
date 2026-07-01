const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface WebsiteTheme {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  logoUrl: string;
  heroText: string;
  heroSubtext: string;
  aboutText: string;
}

let mockTheme: WebsiteTheme = {
  primaryColor: '#0f172a',
  secondaryColor: '#3b82f6',
  fontFamily: 'Inter',
  logoUrl: '/logo.png',
  heroText: 'Find Your Dream Home',
  heroSubtext: 'We help you find the best properties in the city.',
  aboutText: 'With over 10 years of experience in the real estate market...'
};

export const websiteService = {
  async getTheme(): Promise<WebsiteTheme> {
    await delay(500);
    return { ...mockTheme };
  },

  async updateTheme(data: Partial<WebsiteTheme>): Promise<WebsiteTheme> {
    await delay(800);
    mockTheme = {
      ...mockTheme,
      ...data
    };
    return { ...mockTheme };
  }
};
