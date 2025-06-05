
import { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/auth/LoginForm';
import { LoadingPage } from '@/components/ui/loading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldX, Home } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'field_sales_officer' | 'inbound_agent' | 'relationship_manager' | 'branch_supervisor';
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingPage text="Authenticating..." />;
  }

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    const getRoleDisplay = (role: string) => {
      switch (role) {
        case 'field_sales_officer': return 'Field Sales Officer';
        case 'inbound_agent': return 'Inbound Contact Center Agent';
        case 'relationship_manager': return 'Relationship Manager';
        case 'branch_supervisor': return 'Branch Supervisor';
        default: return role;
      }
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <Card className="max-w-md w-full shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <ShieldX className="w-6 h-6 text-red-600" />
            </div>
            <CardTitle className="text-xl text-slate-800">Access Denied</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p className="text-slate-600">
              You don't have permission to access this page.
              {requiredRole && (
                <span className="block mt-1 text-sm">
                  Required role: <span className="font-medium">{getRoleDisplay(requiredRole)}</span>
                </span>
              )}
              {user?.role && (
                <span className="block mt-1 text-sm">
                  Your role: <span className="font-medium">{getRoleDisplay(user.role)}</span>
                </span>
              )}
            </p>
            <Button 
              onClick={() => window.location.href = '/'}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Home className="w-4 h-4 mr-2" />
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
