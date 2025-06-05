
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState, LoginCredentials } from '@/types/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: 'field_sales_officer' | 'inbound_agent' | 'relationship_manager' | 'branch_supervisor') => void;
  updateProfile: (updates: Partial<User>) => void;
  resetPassword: (email: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for the 4 roles
const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'fso@ujjivan.com',
    name: 'Rahul Sharma',
    role: 'field_sales_officer',
    department: 'Field Sales',
    branch: 'Mumbai Central'
  },
  {
    id: '2',
    email: 'agent@ujjivan.com',
    name: 'Priya Patel',
    role: 'inbound_agent',
    department: 'Contact Center',
    branch: 'Mumbai Central'
  },
  {
    id: '3',
    email: 'rm@ujjivan.com',
    name: 'Amit Kumar',
    role: 'relationship_manager',
    department: 'Relationship Management',
    branch: 'Mumbai Central'
  },
  {
    id: '4',
    email: 'supervisor@ujjivan.com',
    name: 'Sunita Manager',
    role: 'branch_supervisor',
    department: 'Management',
    branch: 'Mumbai Central'
  }
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const foundUser = MOCK_USERS.find(u => u.email === credentials.email);
      
      if (foundUser && credentials.password === 'ujjivan123') {
        setUser(foundUser);
        setIsAuthenticated(true);
        
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
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('sessionExpiry');
  };

  const switchRole = (role: 'field_sales_officer' | 'inbound_agent' | 'relationship_manager' | 'branch_supervisor') => {
    if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const userExists = MOCK_USERS.some(u => u.email === email);
    return userExists;
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoading,
      login,
      logout,
      switchRole,
      updateProfile,
      resetPassword
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
