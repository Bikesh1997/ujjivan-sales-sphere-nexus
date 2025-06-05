
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

  const directLogin = (userType: 'fso' | 'inbound' | 'rm' | 'supervisor') => {
    const credentials = {
      fso: { email: 'fso@bank.com', password: 'password123' },
      inbound: { email: 'inbound@bank.com', password: 'password123' },
      rm: { email: 'rm@bank.com', password: 'password123' },
      supervisor: { email: 'supervisor@bank.com', password: 'password123' }
    };
    
    setEmail(credentials[userType].email);
    setPassword(credentials[userType].password);
    setError('');
    
    // Auto-login for the selected user type
    login(credentials[userType]);
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
            <CardTitle>Select Your Role</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 mb-6">
              <Button 
                variant="outline" 
                onClick={() => directLogin('fso')}
                className="w-full text-left justify-start"
                disabled={isLoading}
              >
                <div>
                  <div className="font-medium">Field Sales Officer</div>
                  <div className="text-xs text-gray-500">Beat planning & customer visits</div>
                </div>
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => directLogin('inbound')}
                className="w-full text-left justify-start"
                disabled={isLoading}
              >
                <div>
                  <div className="font-medium">Inbound Contact Agent</div>
                  <div className="text-xs text-gray-500">Lead management & customer support</div>
                </div>
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => directLogin('rm')}
                className="w-full text-left justify-start"
                disabled={isLoading}
              >
                <div>
                  <div className="font-medium">Relationship Manager</div>
                  <div className="text-xs text-gray-500">Portfolio & client management</div>
                </div>
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => directLogin('supervisor')}
                className="w-full text-left justify-start"
                disabled={isLoading}
              >
                <div>
                  <div className="font-medium">Supervisor</div>
                  <div className="text-xs text-gray-500">Team management & monitoring</div>
                </div>
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">Or login manually</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
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

            <div className="text-center text-xs text-gray-500 mt-4">
              Default password for all demo accounts: password123
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
