
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useRoleFeatures } from '@/hooks/useRoleFeatures';
import { 
  Menu,
  X,
  ChevronDown,
  LogOut,
  Home,
  UserPlus,
  ClipboardList,
  Users,
  MapPin,
  BarChart3,
  TrendingUp,
  Activity,
  Target,
  PieChart,
  Shield,
  Phone,
  PhoneCall,
  UserCheck,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import AIAssistantWidget from '@/components/ai/AIAssistantWidget';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { user, logout, switchRole, canSwitchRoles } = useAuth();
  const { getNavigationItems, canAccessFeature } = useRoleFeatures();

  // Icon mapping
  const iconMap = {
    Home: Home,
    UserPlus: UserPlus,
    ClipboardList: ClipboardList,
    Users: Users,
    MapPin: MapPin,
    BarChart3: BarChart3,
    TrendingUp: TrendingUp,
    Activity: Activity,
    Target: Target,
    PieChart: PieChart,
    Shield: Shield,
    Phone: Phone,
    PhoneCall: PhoneCall,
    UserCheck: UserCheck,
    Settings: Settings
  };

  // Filter navigation items based on permissions
  const navigationItems = getNavigationItems()
    .filter(item => {
      // Extract feature ID from path
      const featureMap: { [key: string]: string } = {
        '/': 'dashboard',
        '/funnel': 'sales_funnel',
        '/leads': 'my_leads',
        '/tasks': 'my_tasks',
        '/customers': 'customer_360',
        '/geo-location': 'geo_location',
        '/executive-dashboard': 'executive_dashboard',
        '/customer-analytics': 'customer_analytics',
        '/kpa-management': 'kpa_management',
        '/risk-management': 'risk_management',
        '/portfolio': 'portfolio_management',
        '/team-management': 'team_management',
        '/lead-allocation': 'lead_allocation',
        '/team-tasks': 'team_tasks',
        '/team-performance': 'team_performance',
        '/territory-management': 'territory_management',
        '/reports': 'reports'
      };
      
      const featureId = featureMap[item.href];
      return featureId ? canAccessFeature(featureId) : true;
    })
    .map(item => ({
      ...item,
      icon: iconMap[item.icon as keyof typeof iconMap] || Home
    }));

  const isActive = (path: string) => location.pathname === path;

  const getRoleDisplay = (role: string) => {
    switch (role) {
      case 'field_sales_officer': return 'Field Sales Officer';
      case 'inbound_contact_agent': return 'Inbound Contact Agent';
      case 'relationship_manager': return 'Relationship Manager';
      case 'supervisor': return 'Supervisor';
      case 'admin_mis_officer': return 'Admin/MIS Officer';
      default: return role;
    }
  };

  const getDepartmentDisplay = (dept?: string) => {
    switch (dept) {
      case 'field': return 'Field';
      case 'inbound': return 'Inbound';
      case 'relationship': return 'Relationship';
      case 'admin': return 'Admin';
      default: return '';
    }
  };

  const getRoleOptions = () => {
    const roles = [
      { value: 'field_sales_officer', label: 'Field Sales Officer' },
      { value: 'inbound_contact_agent', label: 'Inbound Contact Agent' },
      { value: 'relationship_manager', label: 'Relationship Manager' },
      { value: 'supervisor', label: 'Supervisor' },
      { value: 'admin_mis_officer', label: 'Admin/MIS Officer' }
    ];
    return roles.filter(role => role.value !== user?.role);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden mr-2"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
              <div className="flex items-start">
                <img 
                  src="/lovable-uploads/a55745b5-41db-412f-a400-41d9f5de5277.png" 
                  alt="Ujjivan Small Finance Bank" 
                  className="h-10 w-auto object-contain"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Branch: {user?.branch}
              </div>
              
              {/* Role Badge */}
              <Badge variant="secondary" className="bg-teal-100 text-teal-800">
                {getRoleDisplay(user?.role || '')}
                {user?.department && ` - ${getDepartmentDisplay(user.department)}`}
              </Badge>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-teal-100 text-teal-700">
                        {user?.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:block">{user?.name}</span>
                    <ChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-2">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  
                  {/* Role switching only for supervisors */}
                  {canSwitchRoles && (
                    <>
                      <DropdownMenuSeparator />
                      {getRoleOptions().map(role => (
                        <DropdownMenuItem 
                          key={role.value}
                          onClick={() => switchRole(role.value as any)}
                        >
                          Switch to {role.label}
                        </DropdownMenuItem>
                      ))}
                    </>
                  )}
                  
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-600">
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg border-r border-gray-200 transition-transform duration-300 ease-in-out`}>
          <div className="h-full overflow-y-auto pt-6">
            <div className="px-3 mb-4">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                {getRoleDisplay(user?.role || '')} Portal
              </div>
            </div>
            <nav className="px-3 space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`${
                      isActive(item.href)
                        ? 'bg-teal-50 text-teal-700 border-r-2 border-teal-500'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    } group flex items-center px-3 py-2 text-sm font-medium rounded-l-md transition-colors`}
                  >
                    <Icon size={18} className="mr-3" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>

      {/* AI Assistant Widget */}
      <AIAssistantWidget />

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;
