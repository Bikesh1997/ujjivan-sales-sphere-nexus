
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Target,
  Download,
  Filter,
  Calendar,
  FileText,
  Plus
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Reports = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [scheduledReports, setScheduledReports] = useState([
    {
      id: '1',
      name: 'Weekly Sales Summary',
      frequency: 'Weekly',
      nextRun: '2024-01-22',
      status: 'Active'
    },
    {
      id: '2',
      name: 'Monthly Team Performance',
      frequency: 'Monthly',
      nextRun: '2024-02-01',
      status: 'Active'
    }
  ]);

  const handleGenerateReport = (reportType: string) => {
    toast({
      title: "Report Generated",
      description: `${reportType} report has been generated and is ready for download.`,
    });
    
    // Simulate report generation
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = '#';
      link.download = `${reportType.replace(/\s+/g, '_').toLowerCase()}_${new Date().toISOString().split('T')[0]}.pdf`;
      link.click();
      
      toast({
        title: "Download Ready",
        description: `${reportType} report is now available for download.`,
      });
    }, 2000);
  };

  const handleScheduleReport = (reportName?: string) => {
    const newReport = {
      id: Date.now().toString(),
      name: reportName || 'Custom Report',
      frequency: 'Weekly',
      nextRun: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'Active'
    };
    
    setScheduledReports(prev => [...prev, newReport]);
    
    toast({
      title: "Report Scheduled",
      description: `${newReport.name} has been scheduled for weekly delivery.`,
    });
  };

  const handleExportData = (format: string) => {
    toast({
      title: "Export Started",
      description: `Data export in ${format} format has been initiated.`,
    });
    
    // Simulate export
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: `Data has been exported successfully in ${format} format.`,
      });
    }, 3000);
  };

  const handleCreateCustomReport = () => {
    toast({
      title: "Custom Report Builder",
      description: "Opening custom report builder interface...",
    });
    
    // Simulate opening a modal or new interface
    setTimeout(() => {
      toast({
        title: "Report Builder Ready",
        description: "You can now configure your custom report parameters.",
      });
    }, 1000);
  };

  const handleDeleteScheduledReport = (reportId: string) => {
    setScheduledReports(prev => prev.filter(report => report.id !== reportId));
    toast({
      title: "Report Deleted",
      description: "Scheduled report has been removed.",
    });
  };

  const handleApplyFilters = () => {
    toast({
      title: "Filters Applied",
      description: `Showing data for ${selectedPeriod === 'month' ? 'this month' : selectedPeriod} and ${selectedTeam === 'all' ? 'all teams' : selectedTeam}.`,
    });
  };

  const reportTemplates = [
    {
      id: '1',
      name: 'Sales Performance Report',
      description: 'Comprehensive sales metrics and KPIs',
      category: 'Sales',
      frequency: 'Weekly',
      lastGenerated: '2024-01-15'
    },
    {
      id: '2',
      name: 'Team Productivity Report',
      description: 'Team member performance and productivity metrics',
      category: 'Team',
      frequency: 'Monthly',
      lastGenerated: '2024-01-10'
    },
    {
      id: '3',
      name: 'Lead Conversion Analysis',
      description: 'Lead source analysis and conversion rates',
      category: 'Leads',
      frequency: 'Bi-weekly',
      lastGenerated: '2024-01-12'
    },
    {
      id: '4',
      name: 'Territory Performance',
      description: 'Geographic performance and territory analysis',
      category: 'Territory',
      frequency: 'Monthly',
      lastGenerated: '2024-01-08'
    }
  ];

  const summaryCards = [
    {
      title: 'Total Reports Generated',
      value: '247',
      change: '+12%',
      changeType: 'positive' as const,
      icon: FileText
    },
    {
      title: 'Active Scheduled Reports',
      value: scheduledReports.length.toString(),
      change: '+3',
      changeType: 'positive' as const,
      icon: Calendar
    },
    {
      title: 'Data Points Analyzed',
      value: '1.2M',
      change: '+8%',
      changeType: 'positive' as const,
      icon: BarChart3
    },
    {
      title: 'Average Generation Time',
      value: '2.3s',
      change: '-0.5s',
      changeType: 'positive' as const,
      icon: TrendingUp
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Generate and manage team performance reports</p>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="outline"
            onClick={() => handleExportData('CSV')}
          >
            <Download size={16} className="mr-2" />
            Export Data
          </Button>
          <Button 
            className="bg-teal-600 hover:bg-teal-700"
            onClick={handleCreateCustomReport}
          >
            <Plus size={16} className="mr-2" />
            Custom Report
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex space-x-4">
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="quarter">This Quarter</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedTeam} onValueChange={setSelectedTeam}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select team" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Teams</SelectItem>
            <SelectItem value="sales">Sales Team</SelectItem>
            <SelectItem value="field">Field Team</SelectItem>
            <SelectItem value="inbound">Inbound Team</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" onClick={handleApplyFilters}>
          <Filter size={16} className="mr-2" />
          Apply Filters
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryCards.map((card, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-2xl font-bold">{card.value}</p>
                  <p className={`text-sm ${card.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                    {card.change} from last period
                  </p>
                </div>
                <card.icon className="h-8 w-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Report Templates</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          <TabsTrigger value="analytics">Advanced Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Available Report Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reportTemplates.map((template) => (
                  <div key={template.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{template.name}</h4>
                        <p className="text-sm text-gray-600">{template.description}</p>
                      </div>
                      <Badge variant="secondary">{template.category}</Badge>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>Frequency: {template.frequency}</span>
                      <span>Last: {template.lastGenerated}</span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        onClick={() => handleGenerateReport(template.name)}
                      >
                        Generate Now
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleScheduleReport(template.name)}
                      >
                        Schedule
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Reports</CardTitle>
            </CardHeader>
            <CardContent>
              {scheduledReports.length > 0 ? (
                <div className="space-y-4">
                  {scheduledReports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{report.name}</h4>
                        <p className="text-sm text-gray-600">
                          {report.frequency} • Next run: {report.nextRun}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">{report.status}</Badge>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDeleteScheduledReport(report.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Scheduled Reports</h3>
                  <p className="text-gray-600 mb-4">Set up automated report generation</p>
                  <Button onClick={() => handleScheduleReport()}>
                    <Plus size={16} className="mr-2" />
                    Schedule Report
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BarChart3 size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Advanced Analytics</h3>
                <p className="text-gray-600 mb-4">Deep dive into performance metrics and trends</p>
                <Button onClick={() => handleGenerateReport('Advanced Analytics')}>
                  <TrendingUp size={16} className="mr-2" />
                  Generate Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
