import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Users, Target, DollarSign, CheckCircle } from 'lucide-react';
import { Role } from '@/types/rbac';
import { generateKPIData } from '@/utils/reportDataGenerator';

interface ReportKPIsProps {
  filters: any;
  userRole: Role | null;
}

export const ReportKPIs = ({ filters, userRole }: ReportKPIsProps) => {
  const kpiData = generateKPIData(filters, userRole);

  const iconMap = {
    'Team Performance': Users,
    'Total Conversions': Target,
    'Revenue Generated': DollarSign,
    'Active Team Members': CheckCircle,
    'My Performance': Target,
    'My Conversions': CheckCircle,
    'My Revenue': DollarSign,
    'Active Leads': Users,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpiData.map((kpi, index) => {
        const Icon = iconMap[kpi.title as keyof typeof iconMap] || Target;
        return (
          <Card key={index} className="border-primary/10 hover:border-primary/30 transition-colors">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                  <div className="flex items-baseline gap-2 mt-2">
                    <h3 className="text-2xl font-bold text-foreground">{kpi.value}</h3>
                    <span className={`text-sm font-medium flex items-center ${
                      kpi.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {kpi.trend === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                      {kpi.change}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{kpi.description}</p>
                </div>
                <div className={`p-3 rounded-full ${
                  kpi.trend === 'up' 
                    ? 'bg-green-100 dark:bg-green-950/30' 
                    : 'bg-red-100 dark:bg-red-950/30'
                }`}>
                  <Icon className={`w-5 h-5 ${
                    kpi.trend === 'up' 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
