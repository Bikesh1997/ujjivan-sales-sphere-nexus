import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Users, Target, DollarSign, CheckCircle } from 'lucide-react';
import { Role } from '@/types/rbac';

interface ReportKPIsProps {
  filters: any;
  userRole: Role | null;
}

export const ReportKPIs = ({ filters, userRole }: ReportKPIsProps) => {
  // Role-based KPIs
  const getKPIData = () => {
    if (userRole && userRole.level >= 2) {
      // Supervisor/Admin view
      return [
        {
          title: 'Team Performance',
          value: '87.5%',
          change: '+12.3%',
          trend: 'up',
          icon: Users,
          description: 'Average team completion rate'
        },
        {
          title: 'Total Conversions',
          value: '342',
          change: '+28',
          trend: 'up',
          icon: Target,
          description: 'Team conversions this month'
        },
        {
          title: 'Revenue Generated',
          value: '₹45.2L',
          change: '+18.5%',
          trend: 'up',
          icon: DollarSign,
          description: 'Total team revenue'
        },
        {
          title: 'Active Team Members',
          value: '24',
          change: '+2',
          trend: 'up',
          icon: CheckCircle,
          description: 'Currently active users'
        },
      ];
    } else {
      // Individual contributor view
      return [
        {
          title: 'My Performance',
          value: '92.3%',
          change: '+5.2%',
          trend: 'up',
          icon: Target,
          description: 'Your task completion rate'
        },
        {
          title: 'My Conversions',
          value: '18',
          change: '+3',
          trend: 'up',
          icon: CheckCircle,
          description: 'Conversions this month'
        },
        {
          title: 'My Revenue',
          value: '₹3.8L',
          change: '+22%',
          trend: 'up',
          icon: DollarSign,
          description: 'Your total revenue'
        },
        {
          title: 'Active Leads',
          value: '32',
          change: '-2',
          trend: 'down',
          icon: Users,
          description: 'Leads in pipeline'
        },
      ];
    }
  };

  const kpiData = getKPIData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpiData.map((kpi, index) => (
        <Card key={index} className="border-primary/10 hover:border-primary/30 transition-colors">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <h3 className="text-2xl font-bold text-foreground">{kpi.value}</h3>
                  <span className={`text-sm font-medium flex items-center ${
                    kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {kpi.trend === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                    {kpi.change}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">{kpi.description}</p>
              </div>
              <div className={`p-3 rounded-full ${
                kpi.trend === 'up' ? 'bg-green-100 dark:bg-green-950/30' : 'bg-red-100 dark:bg-red-950/30'
              }`}>
                <kpi.icon className={`w-5 h-5 ${
                  kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
