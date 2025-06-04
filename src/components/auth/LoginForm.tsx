
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const success = await login({ email, password });
    
    if (!success) {
      setError('Invalid email or password');
    }
    
    setIsLoading(false);
  };

  const fillSalesCredentials = () => {
    setEmail('sales@bank.com');
    setPassword('password123');
  };

  const fillSales2Credentials = () => {
    setEmail('sales2@bank.com');
    setPassword('password123');
  };

  const fillSupervisorCredentials = () => {
    setEmail('supervisor@bank.com');
    setPassword('password123');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to Banking CRM
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sales Force Automation Platform
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full bg-teal-600 hover:bg-teal-700"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 space-y-3">
              <div className="text-center text-sm text-gray-600 mb-3">
                Demo Accounts:
              </div>
              <Button 
                variant="outline" 
                onClick={fillSalesCredentials}
                className="w-full"
              >
                Sales Executive Demo (Rahul)
              </Button>
              <Button 
                variant="outline" 
                onClick={fillSales2Credentials}
                className="w-full"
              >
                Sales Executive Demo (Anjali)
              </Button>
              <Button 
                variant="outline" 
                onClick={fillSupervisorCredentials}
                className="w-full"
              >
                Supervisor Demo
              </Button>
              <div className="text-center text-xs text-gray-500 mt-2">
                Password: password123
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
