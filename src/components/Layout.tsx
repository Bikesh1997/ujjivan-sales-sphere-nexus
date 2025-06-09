
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
  Settings,
  HelpCircle,
  MessageSquare
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SupportModal from '@/components/support/SupportModal';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState('savings-account');
  const location = useLocation();
  const { user, logout, switchRole } = useAuth();
  const { getNavigationItems } = useRoleFeatures();

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
    Shield: Shield
  };

  const navigationItems = getNavigationItems().map(item => ({
    ...item,
    icon: iconMap[item.icon as keyof typeof iconMap] || Home
  }));

  // Banking products
  const bankingProducts = [
    { value: 'savings-account', label: 'Savings Account' },
    { value: 'current-account', label: 'Current Account' },
    { value: 'deposits', label: 'Deposits' },
    { value: 'home-loans', label: 'Home Loans' },
    { value: 'two-wheeler-loan', label: 'Two Wheeler Loan' },
    { value: 'msme-loan', label: 'MSME Loan' },
    { value: 'video-banking', label: 'Video Banking' },
    { value: 'gold-loan', label: 'Gold Loan' },
    { value: 'agri-loans', label: 'Agri. Loans' },
    { value: 'micro-loan', label: 'Micro Loan' },
    { value: 'insurance', label: 'Insurance' },
    { value: 'retail-forex', label: 'Retail Forex & Trade' },
    { value: 'sampoorna-family', label: 'Sampoorna Family Banking' },
    { value: 'life-event-banking', label: 'Life Event Based Banking Services' }
  ];

  const regions = [
    { value: 'all', label: 'All Regions' },
    { value: 'north', label: 'North' },
    { value: 'south', label: 'South' },
    { value: 'east', label: 'East' },
    { value: 'west', label: 'West' },
    { value: 'central', label: 'Central' }
  ];

  const isActive = (path: string) => location.pathname === path;

  const getRoleDisplay = (role: string) => {
    switch (role) {
      case 'sales_executive': return 'Sales Executive';
      case 'supervisor': return 'Supervisor';
      case 'inbound_agent': return 'Inbound Contact Center Agent';
      case 'relationship_manager': return 'Relationship Manager';
      default: return role;
    }
  };

  const getDepartmentDisplay = (dept?: string) => {
    switch (dept) {
      case 'outbound': return 'Outbound';
      case 'inbound': return 'Inbound';
      case 'field': return 'Field';
      case 'branch': return 'Branch';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation - Full Width */}
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
                <DropdownMenuContent align="end" className="w-56 bg-white z-50">
                  <div className="px-2 py-2">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings size={16} className="mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSupportModalOpen(true)}>
                    <HelpCircle size={16} className="mr-2" />
                    Support & Helpdesk
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => switchRole(user?.role === 'sales_executive' ? 'supervisor' : 'sales_executive')}
                  >
                    Switch to {user?.role === 'sales_executive' ? 'Supervisor' : 'Sales Executive'}
                  </DropdownMenuItem>
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

      {/* Supervisor Portal Filters Bar */}
      {user?.role === 'supervisor' && (
        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-end py-3">
            <div className="flex gap-3">
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Select Region" />
                </SelectTrigger>
                <SelectContent className="bg-white z-50">
                  {regions.map((region) => (
                    <SelectItem key={region.value} value={region.value}>
                      {region.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Product" />
                </SelectTrigger>
                <SelectContent className="bg-white z-50">
                  {bankingProducts.map((product) => (
                    <SelectItem key={product.value} value={product.value}>
                      {product.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}

      <div className="flex">
        {/* Sidebar */}
        <div className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg border-r border-gray-200 transition-transform duration-300 ease-in-out`}>
          <div className="h-full overflow-y-auto pt-6">
            <div className="px-3 mb-4">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                {user?.role === 'supervisor' ? 'Supervisor Portal' : 
                 user?.role === 'inbound_agent' ? 'Inbound Agent Portal' :
                 user?.role === 'relationship_manager' ? 'Relationship Manager Portal' :
                 'Sales Portal'}
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

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Support Modal */}
      <SupportModal 
        isOpen={supportModalOpen} 
        onClose={() => setSupportModalOpen(false)} 
      />
    </div>
  );
};

export default Layout;
