
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'field_sales_officer' | 'inbound_contact_agent' | 'relationship_manager' | 'supervisor';
  department?: 'field' | 'inbound' | 'relationship';
  branch: string;
  avatar?: string;
  beatPlan?: string;
  territory?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
