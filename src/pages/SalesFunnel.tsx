
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { 
  Users, 
  TrendingUp, 
  IndianRupee, 
  Filter,
  Search,
  Plus,
  Eye,
  Edit,
  ArrowRight
} from 'lucide-react';

const SalesFunnel = () => {
  const [selectedStage, setSelectedStage] = useState('all');

  const funnelData = [
    { stage: 'Leads', count: 120, value: '₹48L', conversion: 100 },
    { stage: 'Qualified', count: 85, value: '₹38L', conversion: 71 },
    { stage: 'Proposal', count: 45, value: '₹28L', conversion: 38 },
    { stage: 'Negotiation', count: 32, value: '₹22L', conversion: 27 },
    { stage: 'Closed Won', count: 25, value: '₹18L', conversion: 21 },
  ];

  const projectionData = [
    { month: 'Jul', projected: 25, actual: 22 },
    { month: 'Aug', projected: 30, actual: 28 },
    { month: 'Sep', projected: 35, actual: null },
    { month: 'Oct', projected: 32, actual: null },
    { month: 'Nov', projected: 38, actual: null },
    { month: 'Dec', projected: 40, actual: null },
  ];

  const prospects = [
    { id: 1, name: 'Priya Sharma', company: 'Tech Solutions Ltd', stage: 'Qualified', value: '₹5.5L', probability: 75, lastContact: '2 days ago', nextAction: 'Proposal presentation' },
    { id: 2, name: 'Rajesh Kumar', company: 'Manufacturing Co', stage: 'Negotiation', value: '₹12L', probability: 85, lastContact: '1 day ago', nextAction: 'Contract review' },
    { id: 3, name: 'Anita Patel', company: 'Retail Chain', stage: 'Proposal', value: '₹8.2L', probability: 60, lastContact: '3 days ago', nextAction: 'Follow-up call' },
    { id: 4, name: 'Vijay Menon', company: 'Export House', stage: 'Qualified', value: '₹15L', probability: 65, lastContact: '1 day ago', nextAction: 'Site visit' },
    { id: 5, name: 'Sunita Roy', company: 'Consulting Firm', stage: 'Leads', value: '₹3.8L', probability: 45, lastContact: '5 days ago', nextAction: 'Qualification call' },
  ];

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Leads': return 'bg-gray-100 text-gray-800';
      case 'Qualified': return 'bg-blue-100 text-blue-800';
      case 'Proposal': return 'bg-yellow-100 text-yellow-800';
      case 'Negotiation': return 'bg-orange-100 text-orange-800';
      case 'Closed Won': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return 'text-green-600 bg-green-50';
    if (probability >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sales Funnel</h1>
          <p className="text-gray-600">Track your sales pipeline and revenue projections</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700">
          <Plus size={16} className="mr-2" />
          Add Prospect
        </Button>
      </div>

      {/* Funnel Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {funnelData.map((stage, index) => (
          <Card key={stage.stage} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-700">{stage.stage}</h3>
                <Badge variant="secondary" className="text-xs">
                  {stage.conversion}%
                </Badge>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stage.count}</div>
              <div className="text-sm text-teal-600 font-medium">{stage.value}</div>
              {index < funnelData.length - 1 && (
                <div className="flex justify-center mt-3">
                  <ArrowRight size={16} className="text-gray-400" />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Funnel Visualization */}
        <Card>
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={funnelData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="stage" type="category" width={80} />
                <Tooltip />
                <Bar dataKey="count" fill="#14b8a6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Projection */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Projection</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={projectionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="projected" stroke="#14b8a6" strokeDasharray="5 5" name="Projected" />
                <Line type="monotone" dataKey="actual" stroke="#06b6d4" name="Actual" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Prospects Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Active Prospects</CardTitle>
            <div className="flex space-x-2">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search prospects..."
                  className="pl-10 w-64"
                />
              </div>
              <Select value={selectedStage} onValueChange={setSelectedStage}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stages</SelectItem>
                  <SelectItem value="leads">Leads</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="proposal">Proposal</SelectItem>
                  <SelectItem value="negotiation">Negotiation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Prospect</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Stage</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Value</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Probability</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Last Contact</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Next Action</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {prospects.map((prospect) => (
                  <tr key={prospect.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-gray-900">{prospect.name}</div>
                        <div className="text-sm text-gray-500">{prospect.company}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getStageColor(prospect.stage)}>
                        {prospect.stage}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-900">{prospect.value}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getProbabilityColor(prospect.probability)}`}>
                        {prospect.probability}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{prospect.lastContact}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{prospect.nextAction}</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost">
                          <Eye size={14} />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit size={14} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesFunnel;
