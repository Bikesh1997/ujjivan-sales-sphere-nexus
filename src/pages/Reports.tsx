
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Download, 
  Calendar, 
  Users,
  Target,
  TrendingUp,
  BarChart3,
  PieChart,
  Clock,
  Share2
} from 'lucide-react';

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedFormat, setSelectedFormat] = useState('pdf');

  const reportTemplates = [
    {
      id: '1',
      name: 'Team Performance Summary',
      description: 'Comprehensive team performance metrics and KPIs',
      category: 'Performance',
      frequency: 'Monthly',
      lastGenerated: '2024-06-01',
      size: '2.5 MB',
      icon: <Users size={20} />
    },
    {
      id: '2',
      name: 'Sales Pipeline Analysis',
      description: 'Detailed analysis of sales pipeline and conversion rates',
      category: 'Sales',
      frequency: 'Weekly',
      lastGenerated: '2024-06-03',
      size: '1.8 MB',
      icon: <TrendingUp size={20} />
    },
    {
      id: '3',
      name: 'Territory Performance Report',
      description: 'Territory-wise performance and optimization insights',
      category: 'Territory',
      frequency: 'Monthly',
      lastGenerated: '2024-06-01',
      size: '3.2 MB',
      icon: <Target size={20} />
    },
    {
      id: '4',
      name: 'Lead Conversion Analytics',
      description: 'Lead source analysis and conversion metrics',
      category: 'Leads',
      frequency: 'Bi-weekly',
      lastGenerated: '2024-06-02',
      size: '1.5 MB',
      icon: <BarChart3 size={20} />
    },
    {
      id: '5',
      name: 'Customer Portfolio Overview',
      description: 'Customer segmentation and portfolio analysis',
      category: 'Customer',
      frequency: 'Monthly',
      lastGenerated: '2024-06-01',
      size: '2.8 MB',
      icon: <PieChart size={20} />
    }
  ];

  const recentReports = [
    {
      id: '1',
      name: 'May 2024 Team Performance',
      type: 'Team Performance Summary',
      generatedOn: '2024-06-01',
      generatedBy: 'System Auto',
      status: 'Ready',
      downloads: 5
    },
    {
      id: '2',
      name: 'Week 22 Sales Pipeline',
      type: 'Sales Pipeline Analysis',
      generatedOn: '2024-06-03',
      generatedBy: 'System Auto',
      status: 'Ready',
      downloads: 3
    },
    {
      id: '3',
      name: 'Q2 Territory Analysis',
      type: 'Territory Performance Report',
      generatedOn: '2024-06-01',
      generatedBy: 'Manual Request',
      status: 'Processing',
      downloads: 0
    }
  ];

  const scheduledReports = [
    {
      id: '1',
      name: 'Weekly Sales Summary',
      schedule: 'Every Monday 9:00 AM',
      recipients: ['supervisor@bank.com', 'manager@bank.com'],
      nextRun: '2024-06-10 09:00',
      status: 'Active'
    },
    {
      id: '2',
      name: 'Monthly Performance Review',
      schedule: '1st of every month 10:00 AM',
      recipients: ['supervisor@bank.com', 'regional@bank.com'],
      nextRun: '2024-07-01 10:00',
      status: 'Active'
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Performance': return 'bg-blue-100 text-blue-800';
      case 'Sales': return 'bg-green-100 text-green-800';
      case 'Territory': return 'bg-purple-100 text-purple-800';
      case 'Leads': return 'bg-orange-100 text-orange-800';
      case 'Customer': return 'bg-teal-100 text-teal-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ready': return 'bg-green-100 text-green-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      case 'Active': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Generate comprehensive team reports</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700">
          <FileText size={16} className="mr-2" />
          Create Custom Report
        </Button>
      </div>

      <Tabs defaultValue="templates" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="templates">Report Templates</TabsTrigger>
          <TabsTrigger value="recent">Recent Reports</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          <TabsTrigger value="analytics">Quick Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reportTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2 bg-teal-100 rounded-lg">
                      {template.icon}
                    </div>
                    <Badge className={getCategoryColor(template.category)}>
                      {template.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                  <div className="space-y-2 text-xs text-gray-500 mb-4">
                    <div className="flex justify-between">
                      <span>Frequency:</span>
                      <span>{template.frequency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Generated:</span>
                      <span>{template.lastGenerated}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Size:</span>
                      <span>{template.size}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1">
                      <Download size={14} className="mr-1" />
                      Generate
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Calendar size={14} className="mr-1" />
                      Schedule
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recently Generated Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <FileText size={16} className="text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{report.name}</h4>
                        <p className="text-sm text-gray-600">{report.type}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                          <span>Generated: {report.generatedOn}</span>
                          <span>By: {report.generatedBy}</span>
                          <span>Downloads: {report.downloads}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className={getStatusColor(report.status)}>
                        {report.status}
                      </Badge>
                      {report.status === 'Ready' && (
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Download size={14} className="mr-1" />
                            Download
                          </Button>
                          <Button size="sm" variant="outline">
                            <Share2 size={14} className="mr-1" />
                            Share
                          </Button>
                        </div>
                      )}
                      {report.status === 'Processing' && (
                        <div className="flex items-center space-x-2">
                          <Clock size={14} className="text-yellow-600" />
                          <span className="text-sm text-yellow-600">Processing...</span>
                        </div>
                      )}
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
                <Button variant="outline" size="sm">
                  <Plus size={16} className="mr-2" />
                  Add Schedule
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledReports.map((schedule) => (
                  <div key={schedule.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium">{schedule.name}</h4>
                        <p className="text-sm text-gray-600">{schedule.schedule}</p>
                      </div>
                      <Badge className={getStatusColor(schedule.status)}>
                        {schedule.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600 mb-1">Recipients:</p>
                        <div className="space-y-1">
                          {schedule.recipients.map((recipient, index) => (
                            <div key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {recipient}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-600 mb-1">Next Run:</p>
                        <p className="text-sm font-medium">{schedule.nextRun}</p>
                      </div>
                    </div>

                    <div className="flex space-x-2 mt-4">
                      <Button size="sm" variant="outline">Edit</Button>
                      <Button size="sm" variant="outline">Pause</Button>
                      <Button size="sm" variant="outline" className="text-red-600">Delete</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Report Generator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Time Period</label>
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                      <SelectItem value="quarter">This Quarter</SelectItem>
                      <SelectItem value="year">This Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Report Format</label>
                  <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full">
                  <Download size={16} className="mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Report Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 bg-blue-50 p-3 rounded-r-lg">
                    <p className="text-sm font-medium text-blue-800">Most Generated Report</p>
                    <p className="text-xs text-blue-600">Team Performance Summary (15 times this month)</p>
                  </div>
                  
                  <div className="border-l-4 border-green-500 bg-green-50 p-3 rounded-r-lg">
                    <p className="text-sm font-medium text-green-800">Peak Generation Time</p>
                    <p className="text-xs text-green-600">Monday mornings (9 AM - 11 AM)</p>
                  </div>
                  
                  <div className="border-l-4 border-purple-500 bg-purple-50 p-3 rounded-r-lg">
                    <p className="text-sm font-medium text-purple-800">Average Report Size</p>
                    <p className="text-xs text-purple-600">2.4 MB (reduced by 18% this month)</p>
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
