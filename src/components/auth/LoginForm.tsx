
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
  TrendingUp, 
  BarChart3, 
  Settings,
  Users
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

  const roleCards = [
    {
      title: 'Field Sales Officer',
      subtitle: 'Beat planning and customer visits',
      email: 'fso@bank.com',
      icon: MapPin,
      color: 'border-blue-200 hover:border-blue-400 bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Inbound Contact Agent',
      subtitle: 'Customer inquiries and lead verification',
      email: 'inbound@bank.com',
      icon: Phone,
      color: 'border-green-200 hover:border-green-400 bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      title: 'Relationship Manager',
      subtitle: 'Portfolio and relationship management',
      email: 'rm@bank.com',
      icon: TrendingUp,
      color: 'border-purple-200 hover:border-purple-400 bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      title: 'Supervisor',
      subtitle: 'Team management and monitoring',
      email: 'supervisor@bank.com',
      icon: BarChart3,
      color: 'border-orange-200 hover:border-orange-400 bg-orange-50',
      iconColor: 'text-orange-600'
    },
    {
      title: 'Admin/MIS Officer',
      subtitle: 'System configuration and reports',
      email: 'admin@bank.com',
      icon: Settings,
      color: 'border-red-200 hover:border-red-400 bg-red-50',
      iconColor: 'text-red-600'
    }
  ];

  const fillCredentials = (roleEmail: string) => {
    setEmail(roleEmail);
    setPassword('password123');
    setError('');
  };

  if (showForgotPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Reset Password
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email to receive reset instructions
            </p>
          </div>
          
          <Card className="shadow-lg">
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <img 
            src="/lovable-uploads/a55745b5-41db-412f-a400-41d9f5de5277.png" 
            alt="Ujjivan Small Finance Bank" 
            className="h-16 w-auto mx-auto mb-6"
          />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Banking CRM Portal
          </h1>
          <p className="text-lg text-gray-600">
            Sales Force Automation Platform
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Role Cards */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Select Your Role
              </h2>
              <div className="grid gap-4">
                {roleCards.map((role, index) => {
                  const IconComponent = role.icon;
                  return (
                    <Card 
                      key={index}
                      className={`cursor-pointer transition-all duration-200 ${role.color}`}
                      onClick={() => fillCredentials(role.email)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <div className={`p-3 rounded-full bg-white shadow-sm ${role.iconColor}`}>
                            <IconComponent size={24} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{role.title}</h3>
                            <p className="text-sm text-gray-600">{role.subtitle}</p>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-xs"
                          >
                            Login
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Login Form */}
          <div className="lg:sticky lg:top-8">
            <Card className="shadow-2xl border-0">
              <CardHeader className="bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-t-lg">
                <CardTitle className="text-center text-xl">Sign In</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="email" className="text-gray-700">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      disabled={isLoading}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="password" className="text-gray-700">Password</Label>
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
                    className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white font-medium py-3"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </Button>

                  <Button 
                    type="button" 
                    variant="link"
                    className="w-full text-sm text-gray-600 hover:text-gray-800"
                    onClick={() => setShowForgotPassword(true)}
                  >
                    Forgot your password?
                  </Button>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="text-center text-sm text-gray-600 mb-4">
                    Demo Credentials
                  </div>
                  <div className="text-center text-xs text-gray-500">
                    Click any role card above or use password: <code className="bg-gray-100 px-1 rounded">password123</code>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
