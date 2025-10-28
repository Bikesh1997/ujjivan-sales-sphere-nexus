import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePermissions } from '@/hooks/usePermissions';
import PermissionGate from '@/components/rbac/PermissionGate';
import { ReportFilters } from '@/components/reports/ReportFilters';
import { ReportKPIs } from '@/components/reports/ReportKPIs';
import { ReportCharts } from '@/components/reports/ReportCharts';
import { ReportTable } from '@/components/reports/ReportTable';
import { ExportActions } from '@/components/reports/ExportActions';
import { FileBarChart, TrendingUp, Users, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SmartReports = () => {
  const { user, role, canAccess } = usePermissions();
  const { toast } = useToast();
  const [filters, setFilters] = useState({
    dateRange: 'month',
    department: 'all',
    category: 'all',
  });

  const handleFilterChange = (newFilters: any) => {
    setFilters({ ...filters, ...newFilters });
    toast({
      title: "Filters Applied",
      description: "Reports updated based on your selection",
    });
  };

  const handleExport = (format: 'pdf' | 'excel') => {
    toast({
      title: `Exporting as ${format.toUpperCase()}`,
      description: "Your report will download shortly",
    });
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Smart Reports & Analysis</h1>
          <p className="text-muted-foreground mt-1">
            Role-based insights and analytics for {role?.name || 'your account'}
          </p>
        </div>
        <ExportActions onExport={handleExport} />
      </div>

      {/* Filters */}
      <ReportFilters filters={filters} onFilterChange={handleFilterChange} userRole={role} />

      {/* KPIs Section */}
      <ReportKPIs filters={filters} userRole={role} />

      {/* Tabs for Different Report Views */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          
          <PermissionGate permission="report_generate">
            <TabsTrigger value="team">Team Analytics</TabsTrigger>
          </PermissionGate>
          
          <PermissionGate resource="users" action="manage">
            <TabsTrigger value="system">System Reports</TabsTrigger>
          </PermissionGate>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <ReportCharts filters={filters} userRole={role} type="overview" />
          <ReportTable filters={filters} userRole={role} type="overview" />
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <ReportCharts filters={filters} userRole={role} type="performance" />
          <ReportTable filters={filters} userRole={role} type="performance" />
        </TabsContent>

        <PermissionGate permission="report_generate">
          <TabsContent value="team" className="space-y-6">
            <ReportCharts filters={filters} userRole={role} type="team" />
            <ReportTable filters={filters} userRole={role} type="team" />
          </TabsContent>
        </PermissionGate>

        <PermissionGate resource="users" action="manage">
          <TabsContent value="system" className="space-y-6">
            <ReportCharts filters={filters} userRole={role} type="system" />
            <ReportTable filters={filters} userRole={role} type="system" />
          </TabsContent>
        </PermissionGate>
      </Tabs>

      {/* Insights Section */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            AI-Powered Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {role && role.level >= 2 ? (
              <>
                <InsightCard 
                  title="Team Performance Trend"
                  description="Your team's conversion rate increased by 15% this month compared to last month."
                  type="positive"
                />
                <InsightCard 
                  title="Top Performer"
                  description="Rahul Sharma leads with 42% conversion rate. Consider sharing best practices."
                  type="neutral"
                />
              </>
            ) : (
              <>
                <InsightCard 
                  title="Personal Achievement"
                  description="You've exceeded your monthly target by 12%. Great work!"
                  type="positive"
                />
                <InsightCard 
                  title="Opportunity"
                  description="Follow up with 5 warm leads from last week to boost conversions."
                  type="neutral"
                />
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const InsightCard = ({ title, description, type }: { 
  title: string; 
  description: string; 
  type: 'positive' | 'negative' | 'neutral' 
}) => (
  <div className={`p-4 rounded-lg border transition-colors ${
    type === 'positive' 
      ? 'bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-900' 
      : type === 'negative' 
      ? 'bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-900' 
      : 'bg-primary/5 border-primary/20 dark:bg-primary/10 dark:border-primary/30'
  }`}>
    <h4 className="font-semibold text-sm mb-1 text-foreground">{title}</h4>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

export default SmartReports;
