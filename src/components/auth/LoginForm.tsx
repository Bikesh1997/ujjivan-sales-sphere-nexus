
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff, Loader2, KeyRound } from 'lucide-react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const { login, resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    const success = await login({ email, password });
    
    if (!success) {
      setError('Invalid email or password. Please try again.');
    }
    
    setIsLoading(false);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetMessage('');
    setIsLoading(true);

    if (!resetEmail) {
      setResetMessage('Please enter your email address');
      setIsLoading(false);
      return;
    }

    const success = await resetPassword(resetEmail);
    
    if (success) {
      setResetMessage('Password reset instructions sent to your email');
    } else {
      setResetMessage('Email not found in our records');
    }
    
    setIsLoading(false);
  };

  const fillDemoCredentials = (userType: 'sales' | 'sales2' | 'supervisor') => {
    const credentials = {
      sales: { email: 'sales@bank.com', password: 'password123' },
      sales2: { email: 'sales2@bank.com', password: 'password123' },
      supervisor: { email: 'supervisor@bank.com', password: 'password123' }
    };
    
    setEmail(credentials[userType].email);
    setPassword(credentials[userType].password);
    setError('');
  };

  if (showForgotPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Reset Password
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter your email to receive reset instructions
            </p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <KeyRound size={20} />
                Password Reset
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div>
                  <Label htmlFor="resetEmail">Email Address</Label>
                  <Input
                    id="resetEmail"
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                {resetMessage && (
                  <Alert>
                    <AlertDescription>{resetMessage}</AlertDescription>
                  </Alert>
                )}

                <div className="flex gap-2">
                  <Button 
                    type="submit" 
                    className="flex-1 bg-teal-600 hover:bg-teal-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Send Reset Link'
                    )}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setShowForgotPassword(false)}
                  >
                    Back to Login
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
                  disabled={isLoading}
                />
              </div>
              
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                </div>
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
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>

              <Button 
                type="button" 
                variant="link"
                className="w-full text-sm"
                onClick={() => setShowForgotPassword(true)}
              >
                Forgot your password?
              </Button>
            </form>

            <div className="mt-6 space-y-3">
              <div className="text-center text-sm text-gray-600 mb-3">
                Demo Accounts:
              </div>
              <Button 
                variant="outline" 
                onClick={() => fillDemoCredentials('sales')}
                className="w-full"
                disabled={isLoading}
              >
                Sales Executive Demo (Rahul)
              </Button>
              <Button 
                variant="outline" 
                onClick={() => fillDemoCredentials('sales2')}
                className="w-full"
                disabled={isLoading}
              >
                Sales Executive Demo (Anjali)
              </Button>
              <Button 
                variant="outline" 
                onClick={() => fillDemoCredentials('supervisor')}
                className="w-full"
                disabled={isLoading}
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
