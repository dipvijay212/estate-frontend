export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  companyName?: string;
  role: 'admin' | 'staff' | 'owner' | 'tenant';
  avatarUrl?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
