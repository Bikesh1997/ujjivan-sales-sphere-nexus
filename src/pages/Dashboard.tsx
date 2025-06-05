
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Users, 
  Target, 
  IndianRupee,
  Calendar,
  Phone,
  Clock,
  CheckCircle,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  MapPin,
  BarChart3
} from 'lucide-react';
import SmartNudges from '@/components/dashboard/SmartNudges';
import EnhancedFunnelChart from '@/components/funnel/EnhancedFunnelChart';
import { allLeads } from '@/data/leadsData';

const Dashboard = () => {
  const { user } = useAuth();

  // Calculate metrics based on user role
  const userLeads = user?.role === 'supervisor' || user?.role === 'admin_mis_officer' 
    ? allLeads 
    : allLeads.filter(lead => lead.assignedToId === user?.id);
  const totalLeads = userLeads.length;
  const convertedLeads = userLeads.filter(lead => lead.status === 'converted').length;
  const openLeads = userLeads.filter(lead => lead.status !== 'converted').length;
  const totalRevenue = userLeads.reduce((sum, lead) => {
    const value = parseFloat(lead.value.replace('₹', '').replace('L', ''));
    return sum + value;
  }, 0);

  const getRoleSpecificGreeting = () => {
    switch (user?.role) {
      case 'field_sales_officer':
        return {
          title: `Welcome back, ${user?.name.split(' ')[0]}!`,
          subtitle: "Ready for today's field visits and customer meetings",
          primaryAction: "Start Beat Plan",
          secondaryAction: "Check Route"
        };
      case 'inbound_contact_agent':
        return {
          title: `Hello, ${user?.name.split(' ')[0]}!`,
          subtitle: "Handle incoming leads and customer inquiries efficiently",
          primaryAction: "View Queue",
          secondaryAction: "Log Call"
        };
      case 'relationship_manager':
        return {
          title: `Good day, ${user?.name.split(' ')[0]}!`,
          subtitle: "Manage your portfolio and strengthen customer relationships",
          primaryAction: "Portfolio Review",
          secondaryAction: "Schedule Meeting"
        };
      case 'supervisor':
        return {
          title: `Welcome, ${user?.name.split(' ')[0]}!`,
          subtitle: "Monitor team performance and drive branch success",
          primaryAction: "Team Monitor",
          secondaryAction: "View Reports"
        };
      case 'admin_mis_officer':
        return {
          title: `Hello, ${user?.name.split(' ')[0]}!`,
          subtitle: "System administration and comprehensive reporting",
          primaryAction: "System Health",
          secondaryAction: "Generate Report"
        };
      default:
        return {
          title: `Welcome back, ${user?.name.split(' ')[0]}!`,
          subtitle: "Here's your performance overview",
          primaryAction: "Get Started",
          secondaryAction: "View Details"
        };
    }
  };

  const greeting = getRoleSpecificGreeting();

  const getRoleSpecificActions = () => {
    switch (user?.role) {
      case 'field_sales_officer':
        return [
          { icon: MapPin, label: "Plan Beat Route", color: "bg-blue-600 hover:bg-blue-700" },
          { icon: Users, label: "Visit Customers", color: "bg-green-600 hover:bg-green-700" },
          { icon: Target, label: "Log Attendance", color: "bg-orange-600 hover:bg-orange-700" },
          { icon: Phone, label: "Update Outcomes", color: "bg-purple-600 hover:bg-purple-700" }
        ];
      case 'inbound_contact_agent':
        return [
          { icon: Phone, label: "Answer Calls", color: "bg-blue-600 hover:bg-blue-700" },
          { icon: Users, label: "Process Leads", color: "bg-green-600 hover:bg-green-700" },
          { icon: CheckCircle, label: "Verify KYC", color: "bg-orange-600 hover:bg-orange-700" },
          { icon: Target, label: "Assign to FSO", color: "bg-purple-600 hover:bg-purple-700" }
        ];
      case 'relationship_manager':
        return [
          { icon: TrendingUp, label: "Review Portfolio", color: "bg-blue-600 hover:bg-blue-700" },
          { icon: Users, label: "Cross-Sell Check", color: "bg-green-600 hover:bg-green-700" },
          { icon: Calendar, label: "Family Mapping", color: "bg-orange-600 hover:bg-orange-700" },
          { icon: Award, label: "Goal Tracking", color: "bg-purple-600 hover:bg-purple-700" }
        ];
      case 'supervisor':
        return [
          { icon: BarChart3, label: "Team Performance", color: "bg-blue-600 hover:bg-blue-700" },
          { icon: MapPin, label: "Track Field Team", color: "bg-green-600 hover:bg-green-700" },
          { icon: Users, label: "Coaching Sessions", color: "bg-orange-600 hover:bg-orange-700" },
          { icon: Target, label: "KRA Monitoring", color: "bg-purple-600 hover:bg-purple-700" }
        ];
      case 'admin_mis_officer':
        return [
          { icon: BarChart3, label: "System Reports", color: "bg-blue-600 hover:bg-blue-700" },
          { icon: Target, label: "Configure KRAs", color: "bg-green-600 hover:bg-green-700" },
          { icon: Users, label: "User Management", color: "bg-orange-600 hover:bg-orange-700" },
          { icon: CheckCircle, label: "Data Audit", color: "bg-purple-600 hover:bg-purple-700" }
        ];
      default:
        return [
          { icon: Users, label: "Manage Leads", color: "bg-blue-600 hover:bg-blue-700" },
          { icon: TrendingUp, label: "View Analytics", color: "bg-green-600 hover:bg-green-700" },
          { icon: Calendar, label: "Plan Activities", color: "bg-orange-600 hover:bg-orange-700" },
          { icon: Award, label: "Track Goals", color: "bg-purple-600 hover:bg-purple-700" }
        ];
    }
  };

  const quickActions = getRoleSpecificActions();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {greeting.title}
          </h1>
          <p className="text-gray-600">{greeting.subtitle}</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <Calendar size={16} className="mr-2" />
            {greeting.secondaryAction}
          </Button>
          <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
            <Phone size={16} className="mr-2" />
            {greeting.primaryAction}
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Leads</p>
                <p className="text-2xl font-bold text-gray-900">{totalLeads}</p>
                <p className="text-xs text-gray-500 mt-1">
                  <ArrowUpRight size={14} className="inline-block mr-1" />
                  +12% from last month
                </p>
              </div>
              <Users size={48} className="text-blue-500 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Converted Leads</p>
                <p className="text-2xl font-bold text-gray-900">{convertedLeads}</p>
                <p className="text-xs text-gray-500 mt-1">
                  <ArrowUpRight size={14} className="inline-block mr-1" />
                  +8% from last month
                </p>
              </div>
              <CheckCircle size={48} className="text-green-500 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Open Leads</p>
                <p className="text-2xl font-bold text-gray-900">{openLeads}</p>
                <p className="text-xs text-gray-500 mt-1">
                  <ArrowDownRight size={14} className="inline-block mr-1" />
                  -3% from last month
                </p>
              </div>
              <Clock size={48} className="text-orange-500 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₹{Math.round(totalRevenue)}L</p>
                <p className="text-xs text-gray-500 mt-1">
                  <ArrowUpRight size={14} className="inline-block mr-1" />
                  +15% from last month
                </p>
              </div>
              <IndianRupee size={48} className="text-teal-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Funnel Chart */}
      <EnhancedFunnelChart />

      {/* Smart Nudges */}
      <SmartNudges />

      {/* Role-Specific Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target size={18} className="mr-2" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <Button key={index} className={action.color}>
                <IconComponent size={16} className="mr-2" />
                {action.label}
              </Button>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
