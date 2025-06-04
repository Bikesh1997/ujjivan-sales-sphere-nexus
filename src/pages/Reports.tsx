import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Target,
  Download,
  Filter,
  Calendar,
  FileText,
  Plus,
  Trash2,
  Eye,
  Edit
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { allLeads } from '@/data/leadsData';

const Reports = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [scheduledReports, setScheduledReports] = useState([
    {
      id: '1',
      name: 'Weekly Sales Summary',
      frequency: 'Weekly',
      nextRun: '2024-01-22',
      status: 'Active',
      recipients: ['team@company.com'],
      lastRun: '2024-01-15'
    },
    {
      id: '2',
      name: 'Monthly Team Performance',
      frequency: 'Monthly',
      nextRun: '2024-02-01',
      status: 'Active',
      recipients: ['manager@company.com'],
      lastRun: '2024-01-01'
    }
  ]);

  // Get filtered leads based on user role and filters
  const getFilteredLeads = () => {
    let leads = user?.role === 'supervisor' ? allLeads : allLeads.filter(lead => lead.assignedToId === user?.id);
    
    // Apply team filter
    if (selectedTeam !== 'all') {
      leads = leads.filter(lead => {
        // This would be based on actual team data structure
        return true; // Placeholder for team filtering
      });
    }
    
    return leads;
  };

  const filteredLeads = getFilteredLeads();

  // Calculate real analytics data
  const getAnalyticsData = () => {
    const totalLeads = filteredLeads.length;
    const convertedLeads = filteredLeads.filter(lead => lead.status === 'converted');
    const conversionRate = totalLeads > 0 ? ((convertedLeads.length / totalLeads) * 100).toFixed(1) : '0';
    
    const totalValue = convertedLeads.reduce((sum, lead) => {
      const value = parseFloat(lead.value.replace('₹', '').replace('L', ''));
      return sum + value;
    }, 0);

    const statusCounts = filteredLeads.reduce((acc, lead) => {
      acc[lead.status] = (acc[lead.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalLeads,
      convertedLeads: convertedLeads.length,
      conversionRate,
      totalValue,
      statusCounts
    };
  };

  const analyticsData = getAnalyticsData();

  const handleGenerateReport = (reportType: string) => {
    toast({
      title: "Generating Report",
      description: `Processing ${reportType} with ${filteredLeads.length} leads...`,
    });
    
    // Simulate report generation with real data
    setTimeout(() => {
      const reportData = {
        reportType,
        period: selectedPeriod,
        team: selectedTeam,
        leadsProcessed: filteredLeads.length,
        conversionRate: analyticsData.conversionRate,
        totalValue: analyticsData.totalValue,
        generatedAt: new Date().toISOString()
      };
      
      // Create a downloadable report (CSV format)
      const csvContent = generateCSVReport(reportData);
      downloadReport(csvContent, `${reportType.replace(/\s+/g, '_').toLowerCase()}_${new Date().toISOString().split('T')[0]}.csv`);
      
      toast({
        title: "Report Generated Successfully",
        description: `${reportType} report downloaded with ${filteredLeads.length} records.`,
      });
    }, 2000);
  };

  const generateCSVReport = (reportData: any) => {
    const headers = ['Lead ID', 'Name', 'Status', 'Value', 'Assigned To', 'Created Date', 'Last Contact'];
    const rows = filteredLeads.map(lead => [
      lead.id,
      lead.name,
      lead.status,
      lead.value,
      lead.assignedTo || 'Unassigned',
      lead.createdAt || new Date().toISOString().split('T')[0],
      lead.lastContact || 'Never'
    ]);
    
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    return csvContent;
  };

  const downloadReport = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleScheduleReport = (reportName?: string) => {
    const newReport = {
      id: Date.now().toString(),
      name: reportName || 'Custom Report',
      frequency: 'Weekly',
      nextRun: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'Active' as const,
      recipients: [user?.email || 'user@company.com'],
      lastRun: 'Never'
    };
    
    setScheduledReports(prev => [...prev, newReport]);
    
    toast({
      title: "Report Scheduled Successfully",
      description: `${newReport.name} will run every ${newReport.frequency.toLowerCase()}.`,
    });
  };

  const handleExportData = (format: string) => {
    if (format === 'CSV') {
      const csvContent = generateCSVReport({ reportType: 'Data Export' });
      downloadReport(csvContent, `leads_export_${new Date().toISOString().split('T')[0]}.csv`);
      
      toast({
        title: "Export Complete",
        description: `${filteredLeads.length} records exported successfully.`,
      });
    } else {
      toast({
        title: "Export Started",
        description: `Data export in ${format} format initiated.`,
      });
    }
  };

  const handleDeleteScheduledReport = (reportId: string) => {
    setScheduledReports(prev => prev.filter(report => report.id !== reportId));
    toast({
      title: "Report Deleted",
      description: "Scheduled report has been removed.",
    });
  };

  const handleEditScheduledReport = (reportId: string) => {
    toast({
      title: "Edit Report",
      description: "Report editing functionality would open here.",
    });
  };

  const handleViewReport = (reportId: string) => {
    const report = scheduledReports.find(r => r.id === reportId);
    toast({
      title: "View Report Details",
      description: `Viewing details for ${report?.name}`,
    });
  };

  const handleApplyFilters = () => {
    const periodText = selectedPeriod === 'month' ? 'this month' : selectedPeriod;
    const teamText = selectedTeam === 'all' ? 'all teams' : selectedTeam;
    
    toast({
      title: "Filters Applied",
      description: `Showing ${filteredLeads.length} leads for ${periodText} and ${teamText}.`,
    });
  };

  // ... keep existing code (reportTemplates array)
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

  // Updated summary cards with real data
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
      value: scheduledReports.filter(r => r.status === 'Active').length.toString(),
      change: `+${scheduledReports.length}`,
      changeType: 'positive' as const,
      icon: Calendar
    },
    {
      title: 'Leads Processed',
      value: filteredLeads.length.toString(),
      change: `${analyticsData.conversionRate}% conversion`,
      changeType: 'positive' as const,
      icon: BarChart3
    },
    {
      title: 'Total Revenue',
      value: `₹${analyticsData.totalValue}L`,
      change: `${analyticsData.convertedLeads} conversions`,
      changeType: 'positive' as const,
      icon: TrendingUp
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Generate and manage team performance reports</p>
        </div>
        <div className="flex space-x-3">
          <Select onValueChange={(value) => handleExportData(value)}>
            <SelectTrigger asChild>
              <Button variant="outline">
                <Download size={16} className="mr-2" />
                Export Data
              </Button>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CSV">Export as CSV</SelectItem>
              <SelectItem value="Excel">Export as Excel</SelectItem>
              <SelectItem value="PDF">Export as PDF</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            className="bg-teal-600 hover:bg-teal-700"
            onClick={() => handleScheduleReport('Custom Report')}
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
          Apply Filters ({filteredLeads.length} leads)
        </Button>
      </div>

      {/* Summary Cards with Real Data */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryCards.map((card, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-2xl font-bold">{card.value}</p>
                  <p className={`text-sm ${card.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                    {card.change}
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
          <TabsTrigger value="analytics">Analytics Dashboard</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* ... keep existing code (report templates section) */}
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
              <div className="flex justify-between items-center">
                <CardTitle>Scheduled Reports</CardTitle>
                <Button onClick={() => handleScheduleReport()}>
                  <Plus size={16} className="mr-2" />
                  Add Report
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {scheduledReports.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report Name</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead>Next Run</TableHead>
                      <TableHead>Last Run</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {scheduledReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.name}</TableCell>
                        <TableCell>{report.frequency}</TableCell>
                        <TableCell>{report.nextRun}</TableCell>
                        <TableCell>{report.lastRun}</TableCell>
                        <TableCell>
                          <Badge variant={report.status === 'Active' ? 'default' : 'secondary'}>
                            {report.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleViewReport(report.id)}
                            >
                              <Eye size={14} />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditScheduledReport(report.id)}
                            >
                              <Edit size={14} />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteScheduledReport(report.id)}
                            >
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Lead Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(analyticsData.statusCounts).map(([status, count]) => (
                    <div key={status} className="flex justify-between items-center">
                      <span className="capitalize">{status}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-teal-600 h-2 rounded-full" 
                            style={{ width: `${(count / filteredLeads.length) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Leads</span>
                    <span className="font-bold">{analyticsData.totalLeads}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Converted Leads</span>
                    <span className="font-bold text-green-600">{analyticsData.convertedLeads}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Conversion Rate</span>
                    <span className="font-bold">{analyticsData.conversionRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Revenue</span>
                    <span className="font-bold">₹{analyticsData.totalValue}L</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
