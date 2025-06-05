
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff, Loader2, Building2, User, Phone, Users, Shield } from 'lucide-react';

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

  const userTypes = [
    {
      id: 'fso',
      title: 'Field Sales Officer (FSO)',
      subtitle: 'Relationship Officer',
      email: 'fso@ujjivan.com',
      icon: User,
      description: 'Field sales and customer acquisition'
    },
    {
      id: 'agent',
      title: 'Inbound Contact Center Agent',
      subtitle: 'Customer Service',
      email: 'agent@ujjivan.com',
      icon: Phone,
      description: 'Inbound customer support and service'
    },
    {
      id: 'rm',
      title: 'Relationship Manager (RM)',
      subtitle: 'Client Relations',
      email: 'rm@ujjivan.com',
      icon: Users,
      description: 'Customer relationship management'
    },
    {
      id: 'supervisor',
      title: 'Branch Supervisor',
      subtitle: 'Area Manager',
      email: 'supervisor@ujjivan.com',
      icon: Shield,
      description: 'Branch operations and team management'
    }
  ];

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

  const fillUserCredentials = (userEmail: string) => {
    setEmail(userEmail);
    setPassword('ujjivan123');
    setError('');
  };

  if (showForgotPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <img 
              src="/lovable-uploads/a55745b5-41db-412f-a400-41d9f5de5277.png" 
              alt="Ujjivan Small Finance Bank" 
              className="h-16 w-auto mx-auto mb-6"
            />
            <h2 className="text-2xl font-bold text-slate-800">Reset Password</h2>
            <p className="mt-2 text-sm text-slate-600">
              Enter your email to receive reset instructions
            </p>
          </div>
          
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div>
                  <Label htmlFor="resetEmail" className="text-slate-700">Email Address</Label>
                  <Input
                    id="resetEmail"
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="mt-1"
                    required
                  />
                </div>

                {resetMessage && (
                  <Alert>
                    <AlertDescription>{resetMessage}</AlertDescription>
                  </Alert>
                )}

                <div className="flex gap-3">
                  <Button 
                    type="submit" 
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
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
                    className="border-slate-300"
                  >
                    Back
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-4xl w-full space-y-8">
        {/* Header with Logo */}
        <div className="text-center">
          <img 
            src="/lovable-uploads/a55745b5-41db-412f-a400-41d9f5de5277.png" 
            alt="Ujjivan Small Finance Bank" 
            className="h-20 w-auto mx-auto mb-6"
          />
          <h1 className="text-3xl font-bold text-slate-800">Banking CRM Portal</h1>
          <p className="mt-2 text-slate-600">
            Ujjivan Small Finance Bank Ltd.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Login Form */}
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-slate-800 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Building2 size={20} />
                Employee Login
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-slate-700">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your official email"
                    className="mt-1"
                    required
                    disabled={isLoading}
                  />
                </div>
                
                <div>
                  <Label htmlFor="password" className="text-slate-700">Password</Label>
                  <div className="relative mt-1">
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
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
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
                  className="w-full bg-blue-600 hover:bg-blue-700"
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
                  className="w-full text-sm text-slate-600"
                  onClick={() => setShowForgotPassword(true)}
                >
                  Forgot your password?
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* User Types */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Quick Access - Demo Accounts</h3>
            <div className="space-y-3">
              {userTypes.map((userType) => {
                const IconComponent = userType.icon;
                return (
                  <Card 
                    key={userType.id}
                    className="cursor-pointer hover:shadow-md transition-shadow border border-slate-200 hover:border-blue-300"
                    onClick={() => fillUserCredentials(userType.email)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <IconComponent size={20} className="text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-slate-800">{userType.title}</h4>
                          <p className="text-sm text-blue-600 font-medium">{userType.subtitle}</p>
                          <p className="text-xs text-slate-500 mt-1">{userType.description}</p>
                          <p className="text-xs text-slate-400 mt-1">{userType.email}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-500">
                Demo Password: <span className="font-mono bg-slate-100 px-1 rounded">ujjivan123</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
