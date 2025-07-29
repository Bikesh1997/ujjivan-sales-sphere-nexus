import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState, LoginCredentials } from '@/types/auth';
import { supabase } from '@/integrations/supabase/client';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: 'sales_executive' | 'supervisor' | 'inbound_agent' | 'relationship_manager' | 'admin') => void;
  updateUserRole: (userId: string, newRole: 'sales_executive' | 'supervisor' | 'inbound_agent' | 'relationship_manager' | 'admin') => void;
  updateProfile: (updates: Partial<User>) => void;
  resetPassword: (email: string) => Promise<boolean>;
  signup: (credentials: LoginCredentials & { name: string }) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [session, setSession] = React.useState<Session | null>(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  // Helper function to get user profile and role
  const getUserProfile = async (supabaseUser: SupabaseUser): Promise<User | null> => {
    try {
      // Get user profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', supabaseUser.id)
        .single();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
        return null;
      }

      // Get user role
      const { data: userRole, error: roleError } = await supabase
        .from('user_roles')
        .select('admin')
        .eq('user_id', supabaseUser.id)
        .eq('is_active', true)
        .single();

      if (roleError) {
        console.error('Error fetching user role:', roleError);
        // Default to sales_executive if no role is found
      }

      return {
        id: supabaseUser.id,
        email: supabaseUser.email || '',
        name: profile.full_name || '',
        role: userRole?.admin || 'sales_executive',
        branch: 'Mumbai Central', // Default branch
        department: 'field',
        avatar_url: profile.avatar_url,
        phone: profile.phone,
        designation: profile.designation,
        employee_id: profile.employee_id
      };
    } catch (error) {
      console.error('Error getting user profile:', error);
      return null;
    }
  };

  React.useEffect(() => {
    console.log('AuthProvider: Initializing Supabase authentication');
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('AuthProvider: Auth state changed:', event, session?.user?.email);
        
        setSession(session);
        
        if (session?.user) {
          const userProfile = await getUserProfile(session.user);
          if (userProfile) {
            setUser(userProfile);
            setIsAuthenticated(true);
          }
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
        
        setIsLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        console.log('AuthProvider: Existing session found');
      } else {
        console.log('AuthProvider: No existing session');
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = React.useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
    console.log('AuthProvider: Login attempt for email:', credentials.email);
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) {
        console.error('Login error:', error);
        setIsLoading(false);
        return false;
      }

      if (data.user) {
        console.log('AuthProvider: Login successful');
        // The auth state change listener will handle setting the user
        return true;
      }

      setIsLoading(false);
      return false;
    } catch (error) {
      console.error('AuthProvider: Login error:', error);
      setIsLoading(false);
      return false;
    }
  }, []);

  const logout = React.useCallback(async () => {
    console.log('AuthProvider: Logging out user');
    
    try {
      await supabase.auth.signOut();
      // The auth state change listener will handle clearing the user
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, []);

  const switchRole = React.useCallback(async (role: 'sales_executive' | 'supervisor' | 'inbound_agent' | 'relationship_manager' | 'admin') => {
    if (user && session) {
      try {
        // Update user role in database
        const { error } = await supabase
          .from('user_roles')
          .update({ admin: role, is_active: true })
          .eq('user_id', user.id);

        if (!error) {
          const updatedUser = { ...user, role };
          setUser(updatedUser);
        }
      } catch (error) {
        console.error('Error switching role:', error);
      }
    }
  }, [user, session]);

  const updateUserRole = React.useCallback(async (userId: string, newRole: 'sales_executive' | 'supervisor' | 'inbound_agent' | 'relationship_manager' | 'admin') => {
    if (user?.role === 'admin' || user?.role === 'supervisor') {
      try {
        const { error } = await supabase
          .from('user_roles')
          .update({ admin: newRole })
          .eq('user_id', userId);

        if (error) {
          console.error('Error updating user role:', error);
        }
      } catch (error) {
        console.error('Error updating user role:', error);
      }
    }
  }, [user]);

  const updateProfile = React.useCallback(async (updates: Partial<User>) => {
    if (user && session) {
      try {
        const { error } = await supabase
          .from('profiles')
          .update({
            full_name: updates.name,
            phone: updates.phone,
            designation: updates.designation,
            employee_id: updates.employee_id,
            avatar_url: updates.avatar_url
          })
          .eq('user_id', user.id);

        if (!error) {
          const updatedUser = { ...user, ...updates };
          setUser(updatedUser);
        }
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
  }, [user, session]);

  const resetPassword = React.useCallback(async (email: string): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      return !error;
    } catch (error) {
      console.error('Error resetting password:', error);
      return false;
    }
  }, []);

  const signup = React.useCallback(async (credentials: LoginCredentials & { name: string }): Promise<boolean> => {
    console.log('AuthProvider: Signup attempt for email:', credentials.email);
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: credentials.name,
          },
        },
      });

      if (error) {
        console.error('Signup error:', error);
        setIsLoading(false);
        return false;
      }

      if (data.user) {
        console.log('AuthProvider: Signup successful');
        // The auth state change listener will handle setting the user
        return true;
      }

      setIsLoading(false);
      return false;
    } catch (error) {
      console.error('AuthProvider: Signup error:', error);
      setIsLoading(false);
      return false;
    }
  }, []);

  const contextValue = React.useMemo(() => {
    console.log('AuthProvider: Context value updated - isAuthenticated:', isAuthenticated, 'user:', user?.email);
    return {
      user,
      isAuthenticated,
      isLoading,
      login,
      logout,
      switchRole,
      updateUserRole,
      updateProfile,
      resetPassword,
      signup
    };
  }, [user, isAuthenticated, isLoading, login, logout, switchRole, updateUserRole, updateProfile, resetPassword, signup]);

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
