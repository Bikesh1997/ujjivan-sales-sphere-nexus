
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'field_sales_officer' | 'inbound_contact_agent' | 'relationship_manager' | 'supervisor' | 'admin_mis_officer';
  department?: 'inbound' | 'field' | 'relationship' | 'admin';
  branch: string;
  avatar?: string;
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
