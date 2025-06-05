
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
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700'
    },
    {
      email: 'inbound@bank.com',
      name: 'Inbound Contact Agent',
      description: 'Customer inquiries and lead verification',
      icon: Phone,
      color: 'from-green-500 to-green-600',
      hoverColor: 'hover:from-green-600 hover:to-green-700'
    },
    {
      email: 'rm@bank.com',
      name: 'Relationship Manager',
      description: 'Portfolio and relationship management',
      icon: Users,
      color: 'from-purple-500 to-purple-600',
      hoverColor: 'hover:from-purple-600 hover:to-purple-700'
    },
    {
      email: 'supervisor@bank.com',
      name: 'Supervisor',
      description: 'Team management and monitoring',
      icon: Shield,
      color: 'from-orange-500 to-orange-600',
      hoverColor: 'hover:from-orange-600 hover:to-orange-700'
    }
  ];

  if (showForgotPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <img 
              src="/lovable-uploads/a55745b5-41db-412f-a400-41d9f5de5277.png" 
              alt="Ujjivan Small Finance Bank" 
              className="h-16 w-auto mx-auto mb-4"
            />
            <h2 className="text-3xl font-extrabold text-gray-900">
              Reset Password
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email to receive reset instructions
            </p>
          </div>
          
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-teal-700">
                <KeyRound size={20} />
                Password Reset
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div>
                  <Label htmlFor="resetEmail" className="text-gray-700 font-medium">Email Address</Label>
                  <Input
                    id="resetEmail"
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="mt-1 border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                    required
                  />
                </div>

                {resetMessage && (
                  <Alert className="border-teal-200 bg-teal-50">
                    <AlertDescription className="text-teal-700">{resetMessage}</AlertDescription>
                  </Alert>
                )}

                <div className="flex gap-3 pt-2">
                  <Button 
                    type="submit" 
                    className="flex-1 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white shadow-lg"
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
                    className="border-gray-300 hover:bg-gray-50"
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full space-y-8">
        <div className="text-center">
          <img 
            src="/lovable-uploads/a55745b5-41db-412f-a400-41d9f5de5277.png" 
            alt="Ujjivan Small Finance Bank" 
            className="h-16 w-auto mx-auto mb-6"
          />
          <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
            Banking CRM Portal
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select your role to access the Sales Force Automation Platform
          </p>
        </div>

        {/* Role-based Login Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
          {userRoles.map((role) => {
            const Icon = role.icon;
            return (
              <Card 
                key={role.email} 
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-0 overflow-hidden transform hover:-translate-y-1"
                onClick={() => handleRoleLogin(role.email)}
              >
                <div className={`h-2 bg-gradient-to-r ${role.color}`} />
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className={`p-4 rounded-full bg-gradient-to-r ${role.color} text-white shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                      <Icon size={28} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                        {role.name}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {role.description}
                      </p>
                    </div>
                    <Button 
                      className={`w-full text-white bg-gradient-to-r ${role.color} ${role.hoverColor} shadow-lg hover:shadow-xl transition-all duration-300 border-0`}
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
        <div className="max-w-md mx-auto">
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg">
              <CardTitle className="text-center text-gray-800">Manual Login</CardTitle>
              <p className="text-sm text-gray-600 text-center mt-1">
                Or enter your credentials manually
              </p>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="mt-1 border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                    required
                    disabled={isLoading}
                  />
                </div>
                
                <div>
                  <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                  <div className="relative mt-1">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="pr-10 border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                      required
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-gray-400 hover:text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </Button>
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive" className="border-red-200 bg-red-50">
                    <AlertDescription className="text-red-700">{error}</AlertDescription>
                  </Alert>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
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
                  className="w-full text-sm text-teal-600 hover:text-teal-700"
                  onClick={() => setShowForgotPassword(true)}
                >
                  Forgot your password?
                </Button>
              </form>

              <div className="mt-6 pt-4 border-t border-gray-200 text-center">
                <div className="text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-md">
                  Demo Password: <span className="font-mono font-medium">password123</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
