import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState, LoginCredentials } from '@/types/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: 'sales_executive' | 'supervisor' | 'inbound_agent' | 'relationship_manager') => void;
  updateUserRole: (userId: string, newRole: 'sales_executive' | 'supervisor' | 'inbound_agent' | 'relationship_manager') => void;
  updateProfile: (updates: Partial<User>) => void;
  resetPassword: (email: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Enhanced user data with more details including new roles - Removed Rahul's account
const MOCK_USERS: User[] = [
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
    department: 'inbound',
    branch: 'Mumbai Central'
  },
  {
    id: '4',
    email: 'inbound@bank.com',
    name: 'Vikram Singh',
    role: 'inbound_agent',
    department: 'inbound',
    branch: 'Mumbai Central'
  },
  {
    id: '5',
    email: 'relationship@bank.com',
    name: 'Neha Gupta',
    role: 'relationship_manager',
    department: 'branch',
    branch: 'Mumbai Central'
  }
];

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Check for existing session with timeout
    const initAuth = async () => {
      try {
        const savedUser = localStorage.getItem('user');
        const sessionExpiry = localStorage.getItem('sessionExpiry');
        
        if (savedUser && sessionExpiry) {
          const now = new Date().getTime();
          if (now < parseInt(sessionExpiry)) {
            setUser(JSON.parse(savedUser));
            setIsAuthenticated(true);
          } else {
            // Session expired
            localStorage.removeItem('user');
            localStorage.removeItem('sessionExpiry');
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('sessionExpiry');
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = React.useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const foundUser = MOCK_USERS.find(u => u.email === credentials.email);
      
      if (foundUser && credentials.password === 'password123') {
        setUser(foundUser);
        setIsAuthenticated(true);
        
        // Set session expiry (24 hours)
        const expiry = new Date().getTime() + (24 * 60 * 60 * 1000);
        localStorage.setItem('user', JSON.stringify(foundUser));
        localStorage.setItem('sessionExpiry', expiry.toString());
        
        setIsLoading(false);
        return true;
      }
      
      setIsLoading(false);
      return false;
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      return false;
    }
  }, []);

  const logout = React.useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('sessionExpiry');
  }, []);

  const switchRole = React.useCallback((role: 'sales_executive' | 'supervisor' | 'inbound_agent' | 'relationship_manager') => {
    if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  }, [user]);

  const updateUserRole = React.useCallback((userId: string, newRole: 'sales_executive' | 'supervisor' | 'inbound_agent' | 'relationship_manager') => {
    if (user?.role === 'supervisor') {
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
  }, [user]);

  const updateProfile = React.useCallback((updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  }, [user]);

  const resetPassword = React.useCallback(async (email: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    const userExists = MOCK_USERS.some(u => u.email === email);
    return userExists;
  }, []);

  const contextValue = React.useMemo(() => ({
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    switchRole,
    updateUserRole,
    updateProfile,
    resetPassword
  }), [user, isAuthenticated, isLoading, login, logout, switchRole, updateUserRole, updateProfile, resetPassword]);

  return (
    <AuthContext.Provider value={contextValue}>
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
