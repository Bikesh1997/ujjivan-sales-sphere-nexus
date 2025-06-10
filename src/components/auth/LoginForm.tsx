
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff, Loader2, KeyRound } from 'lucide-react';
import { Navigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const { login, resetPassword, isAuthenticated, user } = useAuth();

  // Debug logging for authentication state
  React.useEffect(() => {
    console.log('LoginForm: Auth state - isAuthenticated:', isAuthenticated, 'user:', user?.email);
  }, [isAuthenticated, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('LoginForm: Form submitted with email:', email);
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      console.log('LoginForm: Validation failed - missing fields');
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    console.log('LoginForm: Attempting login...');
    const success = await login({ email, password });
    console.log('LoginForm: Login result:', success);
    
    if (!success) {
      console.log('LoginForm: Login failed, showing error');
      setError('Invalid email or password. Please try again.');
    } else {
      console.log('LoginForm: Login successful');
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

  const fillDemoCredentials = (userType: 'admin' | 'sales2' | 'supervisor' | 'inbound' | 'relationship') => {
    console.log('LoginForm: Filling demo credentials for:', userType);
    const credentials = {
      admin: { email: 'admin@bank.com', password: 'password123' },
      sales2: { email: 'sales2@bank.com', password: 'password123' },
      supervisor: { email: 'supervisor@bank.com', password: 'password123' },
      inbound: { email: 'inbound@bank.com', password: 'password123' },
      relationship: { email: 'relationship@bank.com', password: 'password123' }
    };
    
    setEmail(credentials[userType].email);
    setPassword(credentials[userType].password);
    setError('');
  };

  // Redirect if already authenticated
  if (isAuthenticated) {
    console.log('LoginForm: User already authenticated, redirecting to dashboard');
    return <Navigate to="/dashboard" replace />;
  }

  if (showForgotPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <div className="flex justify-center mb-6">
              <img 
                src="https://www.ujjivansfb.in/sites/default/files/styles/wide/public/2024-04/Ujjivan-Logo_0.webp" 
                alt="Ujjivan Small Finance Bank" 
                className="h-16 w-auto object-contain"
              />
            </div>
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
          <div className="flex justify-center mb-6">
            <img 
              src="https://www.ujjivansfb.in/sites/default/files/styles/wide/public/2024-04/Ujjivan-Logo_0.webp" 
              alt="Ujjivan Small Finance Bank" 
              className="h-16 w-auto object-contain"
            />
          </div>
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
                onClick={() => fillDemoCredentials('admin')}
                className="w-full"
                disabled={isLoading}
              >
                Admin Demo
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
                onClick={() => fillDemoCredentials('inbound')}
                className="w-full"
                disabled={isLoading}
              >
                Inbound Contact Center Agent Demo (Vikram)
              </Button>
              <Button 
                variant="outline" 
                onClick={() => fillDemoCredentials('relationship')}
                className="w-full"
                disabled={isLoading}
              >
                Relationship Manager Demo (Neha)
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
