
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LoadingPage } from '@/components/ui/loading';

const Index = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Index: Auth state changed - isLoading:', isLoading, 'isAuthenticated:', isAuthenticated);
    console.log('Index: Current location:', window.location.pathname);
    
    if (!isLoading) {
      if (isAuthenticated) {
        console.log('Index: User authenticated, navigating to dashboard');
        navigate('/dashboard', { replace: true });
      } else {
        console.log('Index: User not authenticated, navigating to login');
        navigate('/login', { replace: true });
      }
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Show loading while authentication is being determined
  if (isLoading) {
    console.log('Index: Still loading, showing loading page');
    return <LoadingPage text="Loading..." />;
  }

  // Fallback: Direct redirect based on auth state
  if (!isAuthenticated) {
    console.log('Index: Fallback redirect to login');
    return <Navigate to="/login" replace />;
  }

  console.log('Index: Fallback redirect to dashboard');
  return <Navigate to="/dashboard" replace />;
};

export default Index;
