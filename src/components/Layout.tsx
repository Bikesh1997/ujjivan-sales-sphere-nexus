
import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Menu, 
  Home, 
  Users, 
  ClipboardList, 
  BarChart3, 
  MapPin, 
  UserPlus,
  PieChart,
  TrendingUp,
  Activity,
  Target,
  Shield
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRoleFeatures } from '@/hooks/useRoleFeatures';
import LogoutButton from './LogoutButton';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  const { getNavigationItems } = useRoleFeatures();
  const location = useLocation();

  const navigationItems = getNavigationItems();

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: React.ComponentType<any> } = {
      Home,
      Users,
      ClipboardList,
      BarChart3,
      MapPin,
      UserPlus,
      PieChart,
      TrendingUp,
      Activity,
      Target,
      Shield
    };
    return icons[iconName] || Home;
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-500';
      case 'supervisor': return 'bg-blue-500';
      case 'sales_executive': return 'bg-green-500';
      case 'inbound_agent': return 'bg-orange-500';
      case 'relationship_manager': return 'bg-teal-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SheetHeader className="p-4 border-b">
              <SheetTitle className="text-left">Navigation</SheetTitle>
            </SheetHeader>
            <ScrollArea className="h-full">
              <nav className="p-4 space-y-2">
                {navigationItems.map((item) => {
                  const Icon = getIcon(item.icon);
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive 
                          ? 'bg-teal-50 text-teal-700' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </ScrollArea>
          </SheetContent>
        </Sheet>
        
        <div className="flex items-center gap-3">
          <div className="text-sm">
            <div className="font-medium">{user?.name}</div>
            <Badge variant="secondary" className={`text-xs ${getRoleBadgeColor(user?.role || '')}`}>
              {user?.role?.replace('_', ' ')}
            </Badge>
          </div>
          <LogoutButton />
        </div>
      </div>

      <div className="lg:flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white border-r border-gray-200">
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex items-center h-16 px-4 border-b border-gray-200">
              <h1 className="text-xl font-bold text-gray-900">Banking CRM</h1>
            </div>
            
            <div className="flex-1 flex flex-col overflow-y-auto">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback>
                      {user?.name?.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {user?.name}
                    </p>
                    <Badge variant="secondary" className={`text-xs mt-1 ${getRoleBadgeColor(user?.role || '')}`}>
                      {user?.role?.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>
                <div className="mt-3">
                  <LogoutButton />
                </div>
              </div>
              
              <nav className="flex-1 px-4 py-4 space-y-1">
                {navigationItems.map((item) => {
                  const Icon = getIcon(item.icon);
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                        isActive 
                          ? 'bg-teal-50 text-teal-700' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:pl-64 flex flex-col flex-1">
          <main className="flex-1 pb-8">
            <div className="py-6 px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
