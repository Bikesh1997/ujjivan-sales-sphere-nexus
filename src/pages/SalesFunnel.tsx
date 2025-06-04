
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Users, Target, DollarSign, Plus, Filter, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SalesFunnel = () => {
  const { toast } = useToast();
  const [selectedStage, setSelectedStage] = useState('all');

  const funnelData = [
    { stage: 'Leads', count: 1250, value: '₹125L', color: '#3B82F6' },
    { stage: 'Qualified', count: 890, value: '₹98L', color: '#10B981' },
    { stage: 'Proposal', count: 420, value: '₹67L', color: '#F59E0B' },
    { stage: 'Negotiation', count: 180, value: '₹45L', color: '#EF4444' },
    { stage: 'Closed Won', count: 85, value: '₹23L', color: '#8B5CF6' }
  ];

  const handleAddProspect = () => {
    toast({
      title: "Add Prospect",
      description: "Prospect creation form will be implemented",
    });
  };

  const handleFilterStage = (stage: string) => {
    setSelectedStage(stage);
    toast({
      title: "Filter Applied",
      description: `Showing prospects in ${stage} stage`,
    });
  };

  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "Funnel data is being exported to CSV",
    });
  };

  const handleStageClick = (stage: string) => {
    setSelectedStage(stage);
    toast({
      title: "Stage Selected",
      description: `Viewing details for ${stage} stage`,
    });
  };

  const handleOptimizeStage = (stage: string) => {
    toast({
      title: "Optimization Suggestions",
      description: `Showing recommendations for ${stage} stage`,
    });
  };

  const handleBulkAction = (action: string) => {
    toast({
      title: "Bulk Action",
      description: `${action} will be applied to selected prospects`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sales Funnel</h1>
          <p className="text-gray-600">Track your sales pipeline and conversion rates</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleExportData}>
            <Download size={16} className="mr-2" />
            Export Data
          </Button>
          <Button variant="outline" onClick={() => handleFilterStage('all')}>
            <Filter size={16} className="mr-2" />
            Filter
          </Button>
          <Button onClick={handleAddProspect} className="bg-blue-600 hover:bg-blue-700">
            <Plus size={16} className="mr-2" />
            Add Prospect
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleStageClick('Leads')}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Prospects</p>
                <p className="text-2xl font-bold text-gray-900">1,250</p>
                <p className="text-xs text-green-600 mt-1">+12% from last month</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleStageClick('Closed Won')}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-gray-900">6.8%</p>
                <p className="text-xs text-green-600 mt-1">+0.5% from last month</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pipeline Value</p>
                <p className="text-2xl font-bold text-gray-900">₹358L</p>
                <p className="text-xs text-green-600 mt-1">+8% from last month</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Deal Size</p>
                <p className="text-2xl font-bold text-gray-900">₹2.7L</p>
                <p className="text-xs text-red-600 mt-1">-2% from last month</p>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Funnel Visualization */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Sales Funnel Visualization</CardTitle>
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" onClick={() => handleOptimizeStage('all')}>
              Optimize Funnel
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleBulkAction('move-stage')}>
              Bulk Actions
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {funnelData.map((stage, index) => (
              <div 
                key={stage.stage} 
                className="cursor-pointer hover:bg-gray-50 p-4 rounded-lg transition-colors"
                onClick={() => handleStageClick(stage.stage)}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">{stage.stage}</h3>
                  <div className="text-right">
                    <p className="font-semibold">{stage.count} prospects</p>
                    <p className="text-sm text-gray-600">{stage.value}</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="h-3 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${(stage.count / funnelData[0].count) * 100}%`,
                      backgroundColor: stage.color
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>Conversion: {index === 0 ? '100%' : `${((stage.count / funnelData[index-1].count) * 100).toFixed(1)}%`}</span>
                  <span className={selectedStage === stage.stage ? 'font-medium text-blue-600' : ''}>
                    {selectedStage === stage.stage ? 'Selected' : 'Click to view'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stage Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Stage Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {funnelData.map((stage, index) => (
                <div key={stage.stage} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{stage.stage}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">{stage.count} prospects</span>
                      <Button size="sm" variant="ghost" onClick={() => handleOptimizeStage(stage.stage)}>
                        Optimize
                      </Button>
                    </div>
                  </div>
                  <Progress 
                    value={index === 0 ? 100 : (stage.count / funnelData[0].count) * 100} 
                    className="h-2"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Conversion: {index === 0 ? '100%' : `${((stage.count / funnelData[index-1].count) * 100).toFixed(1)}%`}</span>
                    <span>Value: {stage.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full justify-start" variant="outline" onClick={() => handleBulkAction('follow-up')}>
                <Users size={16} className="mr-2" />
                Schedule Follow-ups
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={() => handleBulkAction('send-proposal')}>
                <Target size={16} className="mr-2" />
                Send Proposals
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={() => handleBulkAction('update-status')}>
                <TrendingUp size={16} className="mr-2" />
                Update Status
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={() => handleBulkAction('assign-leads')}>
                <Users size={16} className="mr-2" />
                Assign Leads
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalesFunnel;
