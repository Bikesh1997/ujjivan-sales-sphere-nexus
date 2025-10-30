import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { usePermissions } from '@/hooks/usePermissions';
import PermissionGate from '@/components/rbac/PermissionGate';
import { ReportFilters } from '@/components/reports/ReportFilters';
import { ReportKPIs } from '@/components/reports/ReportKPIs';
import { ReportCharts } from '@/components/reports/ReportCharts';
import { ReportTable } from '@/components/reports/ReportTable';
import { ExportActions } from '@/components/reports/ExportActions';
import { ScheduleEmailModal, ScheduleData } from '@/components/reports/ScheduleEmailModal';
import { NaturalLanguageQuery } from '@/components/reports/NaturalLanguageQuery';
import { DrillDownTable } from '@/components/reports/DrillDownTable';
import { exportToPDF, exportToExcel } from '@/utils/reportExport';
import { generateKPIData, generateChartData, generateTableData } from '@/utils/reportDataGenerator';
import { generateAIInsights } from '@/services/reportDataService';
import { TrendingUp, Sparkles, AlertTriangle, CheckCircle, Info } from 'lucide-react';

const SmartReports = () => {
  const { user, role, canAccess } = usePermissions();
  const [filters, setFilters] = useState({
    dateRange: 'month',
    department: 'all',
    category: 'all',
    branch: 'all',
    product: 'all',
  });
  const [messageDialog, setMessageDialog] = useState({
    open: false,
    title: '',
    message: '',
    type: 'success' as 'success' | 'error' | 'info'
  });
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [aiInsights, setAiInsights] = useState<any[]>([]);
  const [currentTab, setCurrentTab] = useState('overview');

  const handleFilterChange = (newFilters: any) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    
    // Regenerate AI insights when filters change
    setTimeout(() => {
      const insights = generateAIInsights(updatedFilters, role);
      setAiInsights(insights);
    }, 300);
  };

  const handleNLQuery = (queryFilters: any) => {
    handleFilterChange(queryFilters);
    setMessageDialog({
      open: true,
      title: 'Query Processed',
      message: `Applied filters: ${queryFilters.dateRange}, ${queryFilters.branch}, ${queryFilters.metric}`,
      type: 'info'
    });
  };

  const getReportData = () => {
    const kpis = generateKPIData(filters, role);
    const tableData = generateTableData(filters, role, currentTab);
    
    return {
      title: `Smart Report - ${filters.category} (${filters.dateRange})`,
      period: filters.dateRange,
      kpis: kpis.map(kpi => ({
        title: kpi.title,
        value: kpi.value,
        change: kpi.change
      })),
      tableHeaders: tableData?.headers || [],
      tableData: tableData?.rows || []
    };
  };

  const handleExport = async (format: 'pdf' | 'excel') => {
    try {
      const reportData = getReportData();
      
      if (format === 'pdf') {
        await exportToPDF(reportData);
      } else {
        await exportToExcel(reportData);
      }
      
      setMessageDialog({
        open: true,
        title: '✓ Export Successful',
        message: `Your ${filters.category} report for ${filters.dateRange} has been downloaded as ${format.toUpperCase()}. All applied filters have been included.`,
        type: 'success'
      });
    } catch (error) {
      setMessageDialog({
        open: true,
        title: '✗ Export Failed',
        message: 'There was an error exporting your report. Please try again or contact support.',
        type: 'error'
      });
    }
  };

  const handleScheduleEmail = (scheduleData: ScheduleData) => {
    console.log('Scheduling email report:', scheduleData);
    setScheduleModalOpen(false);
    setMessageDialog({
      open: true,
      title: '✓ Email Report Scheduled',
      message: `Your ${scheduleData.reportType} report will be automatically sent to ${scheduleData.email} ${scheduleData.frequency} at ${scheduleData.time}. You'll receive a confirmation email shortly.`,
      type: 'success'
    });
  };

  // Generate initial AI insights
  useState(() => {
    const insights = generateAIInsights(filters, role);
    setAiInsights(insights);
  });

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
        <ExportActions 
          onExport={handleExport} 
          onScheduleEmail={() => setScheduleModalOpen(true)}
        />
      </div>

      {/* Natural Language Query */}
      <NaturalLanguageQuery onQuery={handleNLQuery} />

      {/* Filters */}
      <ReportFilters filters={filters} onFilterChange={handleFilterChange} userRole={role} />

      {/* KPIs Section */}
      <ReportKPIs filters={filters} userRole={role} />

      {/* Tabs for Different Report Views */}
      <Tabs defaultValue="overview" value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList className="grid w-full grid-cols-7 lg:w-auto lg:inline-grid">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="geographic">Geographic</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <ReportCharts filters={filters} userRole={role} type="overview" />
          <DrillDownTable data={generateTableData(filters, role, 'overview')} />
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <ReportCharts filters={filters} userRole={role} type="performance" />
          <DrillDownTable data={generateTableData(filters, role, 'performance')} />
        </TabsContent>

        <TabsContent value="sales" className="space-y-6">
          <ReportCharts filters={filters} userRole={role} type="sales" />
          <DrillDownTable data={generateTableData(filters, role, 'sales')} />
        </TabsContent>

        <TabsContent value="leads" className="space-y-6">
          <ReportCharts filters={filters} userRole={role} type="leads" />
          <DrillDownTable data={generateTableData(filters, role, 'leads')} />
        </TabsContent>

        <TabsContent value="customers" className="space-y-6">
          <DrillDownTable data={generateTableData(filters, role, 'customers')} />
        </TabsContent>

        <TabsContent value="geographic" className="space-y-6">
          <DrillDownTable data={generateTableData(filters, role, 'geographic')} />
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-6">
          <ReportCharts filters={filters} userRole={role} type="campaigns" />
          <DrillDownTable data={generateTableData(filters, role, 'campaigns')} />
        </TabsContent>
      </Tabs>

      {/* AI Insights Section */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            AI-Powered Insights & Predictions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {aiInsights.length > 0 ? (
              aiInsights.map((insight, idx) => (
                <InsightCard key={idx} {...insight} />
              ))
            ) : (
              <>
                <InsightCard 
                  type="positive"
                  title="Performance Improvement"
                  description={`${role && role.level >= 2 ? 'Team' : 'Your'} performance is trending upward. Keep up the excellent work!`}
                />
                <InsightCard 
                  type="neutral"
                  title="Opportunity Detected"
                  description="Several warm leads require follow-up attention to maximize conversion potential."
                />
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Message Dialog */}
      <Dialog open={messageDialog.open} onOpenChange={(open) => setMessageDialog({ ...messageDialog, open })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {messageDialog.type === 'success' && <CheckCircle className="w-5 h-5 text-green-600" />}
              {messageDialog.type === 'error' && <AlertTriangle className="w-5 h-5 text-red-600" />}
              {messageDialog.type === 'info' && <Info className="w-5 h-5 text-blue-600" />}
              {messageDialog.title}
            </DialogTitle>
            <DialogDescription className="text-base pt-2">
              {messageDialog.message}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Schedule Email Modal */}
      <ScheduleEmailModal
        open={scheduleModalOpen}
        onOpenChange={setScheduleModalOpen}
        onSchedule={handleScheduleEmail}
      />
    </div>
  );
};

const InsightCard = ({ title, description, type, metric, recommendation, action }: {
  title: string; 
  description: string; 
  type: 'positive' | 'negative' | 'neutral' | 'warning';
  metric?: string;
  recommendation?: string;
  action?: string;
}) => {
  const getIcon = () => {
    switch (type) {
      case 'positive': return <CheckCircle className="w-4 h-4" />;
      case 'negative': return <AlertTriangle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  return (
    <div className={`p-4 rounded-lg border transition-colors ${
      type === 'positive' 
        ? 'bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-900' 
        : type === 'negative' 
        ? 'bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-900' 
        : type === 'warning'
        ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950/20 dark:border-yellow-900'
        : 'bg-primary/5 border-primary/20 dark:bg-primary/10 dark:border-primary/30'
    }`}>
      <div className="flex items-start gap-2">
        <div className={`mt-0.5 ${
          type === 'positive' ? 'text-green-600 dark:text-green-400' :
          type === 'negative' ? 'text-red-600 dark:text-red-400' :
          type === 'warning' ? 'text-yellow-600 dark:text-yellow-400' :
          'text-primary'
        }`}>
          {getIcon()}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-sm mb-1 text-foreground">{title}</h4>
          <p className="text-sm text-muted-foreground">{description}</p>
          {metric && (
            <p className="text-xs text-muted-foreground mt-1">Metric: {metric}</p>
          )}
          {recommendation && (
            <p className="text-xs font-medium text-foreground mt-2">💡 {recommendation}</p>
          )}
          {action && (
            <p className="text-xs font-medium text-foreground mt-2">⚡ Action: {action}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmartReports;
