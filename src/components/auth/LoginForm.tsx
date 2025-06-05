
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Eye, 
  EyeOff, 
  Loader2, 
  KeyRound, 
  MapPin, 
  Phone, 
  Users, 
  Shield
} from 'lucide-react';

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

  const handleRoleLogin = async (roleEmail: string) => {
    setIsLoading(true);
    setError('');
    
    const success = await login({ email: roleEmail, password: 'password123' });
    
    if (!success) {
      setError('Login failed. Please try again.');
    }
    
    setIsLoading(false);
  };

  const userRoles = [
    {
      email: 'fso@bank.com',
      name: 'Field Sales Officer',
      description: 'Beat planning and customer visits',
      icon: MapPin,
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      email: 'inbound@bank.com',
      name: 'Inbound Contact Agent',
      description: 'Customer inquiries and lead verification',
      icon: Phone,
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      email: 'rm@bank.com',
      name: 'Relationship Manager',
      description: 'Portfolio and relationship management',
      icon: Users,
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      email: 'supervisor@bank.com',
      name: 'Supervisor',
      description: 'Team management and monitoring',
      icon: Shield,
      color: 'bg-orange-500 hover:bg-orange-600'
    }
  ];

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
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center">
          <img 
            src="/lovable-uploads/a55745b5-41db-412f-a400-41d9f5de5277.png" 
            alt="Ujjivan Small Finance Bank" 
            className="h-16 w-auto mx-auto mb-4"
          />
          <h2 className="text-3xl font-extrabold text-gray-900">
            Banking CRM Portal
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Select your role to access the Sales Force Automation Platform
          </p>
        </div>

        {/* Role-based Login Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-8">
          {userRoles.map((role) => {
            const Icon = role.icon;
            return (
              <Card 
                key={role.email} 
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleRoleLogin(role.email)}
              >
                <CardContent className="p-4">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className={`p-3 rounded-full ${role.color} text-white`}>
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{role.name}</h3>
                      <p className="text-xs text-gray-600 mt-1">{role.description}</p>
                    </div>
                    <Button 
                      className={`w-full text-white ${role.color}`}
                      disabled={isLoading}
                      size="sm"
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        'Login'
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Manual Login Form */}
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-center">Manual Login</CardTitle>
            <p className="text-sm text-gray-600 text-center">
              Or enter your credentials manually
            </p>
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

            <div className="mt-4 text-center">
              <div className="text-xs text-gray-500">
                Demo Password: password123
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
