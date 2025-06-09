
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
  ArrowDownRight
} from 'lucide-react';
import SmartNudges from '@/components/dashboard/SmartNudges';
import { allLeads } from '@/data/leadsData';

const Dashboard = () => {
  const { user } = useAuth();

  // Calculate metrics based on user role
  const userLeads = user?.role === 'supervisor' ? allLeads : allLeads.filter(lead => lead.assignedToId === user?.id);
  const totalLeads = userLeads.length;
  const convertedLeads = userLeads.filter(lead => lead.status === 'converted').length;
  const openLeads = userLeads.filter(lead => lead.status !== 'converted').length;
  const totalRevenue = userLeads.reduce((sum, lead) => {
    const value = parseFloat(lead.value.replace('₹', '').replace('L', ''));
    return sum + value;
  }, 0);

  // Monthly target for salesperson
  const monthlyTarget = 25; // Target number of conversions per month

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.name.split(' ')[0]}!
          </h1>
          <p className="text-gray-600">Here's your sales performance overview</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <Calendar size={16} className="mr-2" />
            Today's Plan
          </Button>
          <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
            <Phone size={16} className="mr-2" />
            Start Calling
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
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
                <p className="text-sm text-gray-600">Monthly Target</p>
                <p className="text-2xl font-bold text-gray-900">{monthlyTarget}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {convertedLeads >= monthlyTarget ? (
                    <>
                      <ArrowUpRight size={14} className="inline-block mr-1" />
                      Target achieved!
                    </>
                  ) : (
                    <>
                      <Clock size={14} className="inline-block mr-1" />
                      {monthlyTarget - convertedLeads} more needed
                    </>
                  )}
                </p>
              </div>
              <Target size={48} className="text-purple-500 opacity-50" />
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

      {/* Smart Nudges */}
      <SmartNudges />
    </div>
  );
};

export default Dashboard;
