
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState, LoginCredentials } from '@/types/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: 'sales_executive' | 'supervisor') => void;
  updateUserRole: (userId: string, newRole: 'sales_executive' | 'supervisor') => void;
  updateProfile: (updates: Partial<User>) => void;
  resetPassword: (email: string) => Promise<boolean>;
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
    department: 'inbound',
    branch: 'Mumbai Central'
  }
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
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
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('sessionExpiry');
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

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    // Simulate API call
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
      updateUserRole,
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
