import { User } from '../types/auth.types';
import { LoginPayload, RegisterPayload, ForgotPasswordPayload, ResetPasswordPayload } from '../validation/authSchema';

// Mock delay to simulate network latency
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const MOCK_TOKEN_KEY = 'realtyflow_mock_token';
const MOCK_USER_KEY = 'realtyflow_mock_user';

const mockUser: User = {
  id: 'usr_123456789',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  companyName: 'Acme Real Estate',
  role: 'admin',
  createdAt: new Date().toISOString(),
};

export const authService = {
  async login(data: LoginPayload): Promise<User> {
    await delay(800);
    
    // Exact match for Demo Login
    if (data.email === 'admin@realtyflow.com' && data.password === '123456') {
      const mockSessionToken = 'mock-jwt-token-12345';
      const user = { ...mockUser, email: data.email };
      
      if (data.rememberMe) {
        localStorage.setItem(MOCK_TOKEN_KEY, mockSessionToken);
        localStorage.setItem(MOCK_USER_KEY, JSON.stringify(user));
      } else {
        sessionStorage.setItem(MOCK_TOKEN_KEY, mockSessionToken);
        sessionStorage.setItem(MOCK_USER_KEY, JSON.stringify(user));
      }
      return user;
    }
    
    throw new Error('Invalid email or password');
  },

  async register(data: RegisterPayload): Promise<User> {
    await delay(800);
    
    // Simulate successful registration
    if (data.email === 'admin@realtyflow.com') {
      throw new Error('Email is already registered');
    }
    
    const user = {
      ...mockUser,
      firstName: data.ownerName.split(' ')[0] || '',
      lastName: data.ownerName.split(' ')[1] || '',
      email: data.email,
      companyName: data.businessName,
    };

    const mockSessionToken = 'mock-jwt-token-new-user';
    localStorage.setItem(MOCK_TOKEN_KEY, mockSessionToken);
    localStorage.setItem(MOCK_USER_KEY, JSON.stringify(user));

    return user;
  },

  async forgotPassword(data: ForgotPasswordPayload): Promise<void> {
    await delay(1000);
    if (!data.email) {
      throw new Error('Email is required');
    }
    // Simulate sending an email
  },

  async resetPassword(data: ResetPasswordPayload): Promise<void> {
    await delay(1000);
    if (!data.password) {
      throw new Error('Password is required');
    }
    // Simulate resetting the password
  },

  async logout(): Promise<void> {
    await delay(500);
    // Simulate clearing session tokens
    localStorage.removeItem(MOCK_TOKEN_KEY);
    localStorage.removeItem(MOCK_USER_KEY);
    sessionStorage.removeItem(MOCK_TOKEN_KEY);
    sessionStorage.removeItem(MOCK_USER_KEY);
  },

  async getSession(): Promise<User | null> {
    await delay(300);
    const token = localStorage.getItem(MOCK_TOKEN_KEY) || sessionStorage.getItem(MOCK_TOKEN_KEY);
    const userJson = localStorage.getItem(MOCK_USER_KEY) || sessionStorage.getItem(MOCK_USER_KEY);
    
    if (token && userJson) {
      try {
        return JSON.parse(userJson) as User;
      } catch {
        return null;
      }
    }
    return null;
  }
};
