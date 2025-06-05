
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'field_sales_officer' | 'inbound_agent' | 'relationship_manager' | 'branch_supervisor';
  department?: string;
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
