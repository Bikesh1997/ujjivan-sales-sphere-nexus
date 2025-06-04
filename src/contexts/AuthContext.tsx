import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState, LoginCredentials } from '@/types/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: 'sales_executive' | 'supervisor') => void;
  updateUserRole: (userId: string, newRole: 'sales_executive' | 'supervisor') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Enhanced user data with more details
const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'sales@bank.com',
    name: 'Rahul Sharma',
    role: 'sales_executive',
    department: 'field',
    branch: 'Mumbai Central'
  },
  {
    id: '2',
    email: 'supervisor@bank.com',
    name: 'Priya Manager',
    role: 'supervisor',
    branch: 'Mumbai Central'
  },
  {
    id: '3',
    email: 'sales2@bank.com',
    name: 'Anjali Patel',
    role: 'sales_executive',
    department: 'outbound',
    branch: 'Mumbai Central'
  }
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true);
    
    // Mock authentication - simple email check
    const foundUser = MOCK_USERS.find(u => u.email === credentials.email);
    
    if (foundUser && credentials.password === 'password123') {
      setUser(foundUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const switchRole = (role: 'sales_executive' | 'supervisor') => {
    if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const updateUserRole = (userId: string, newRole: 'sales_executive' | 'supervisor') => {
    if (user?.role === 'supervisor') {
      // Only supervisors can change roles
      const targetUser = MOCK_USERS.find(u => u.id === userId);
      if (targetUser) {
        targetUser.role = newRole;
        if (user.id === userId) {
          const updatedUser = { ...user, role: newRole };
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
      }
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoading,
      login,
      logout,
      switchRole,
      updateUserRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
