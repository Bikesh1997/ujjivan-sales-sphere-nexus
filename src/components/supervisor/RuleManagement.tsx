
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface Rule {
  id: string;
  channel: string;
  value: string;
  priority: 'P1' | 'P2' | 'P3';
  region: string;
  agentName: string;
  meetingType: string;
  productType: string;
  isActive: boolean;
  createdDate: string;
}

const RuleManagement = () => {
  const { toast } = useToast();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<Rule | null>(null);
  const [rules, setRules] = useState<Rule[]>([
    {
      id: '1',
      channel: 'Website Forms',
      value: '50L',
      priority: 'P1',
      region: 'Mumbai',
      agentName: 'Vikram',
      meetingType: 'In Person',
      productType: 'MSME Loan',
      isActive: true,
      createdDate: '2024-01-15'
    },
    {
      id: '2',
      channel: 'WhatsApp Business',
      value: '25L',
      priority: 'P2',
      region: 'Pune',
      agentName: 'Rahul',
      meetingType: 'Virtual',
      productType: 'Personal Loan',
      isActive: true,
      createdDate: '2024-01-20'
    },
    {
      id: '3',
      channel: 'Call Center',
      value: '100L',
      priority: 'P1',
      region: 'Delhi',
      agentName: 'Anjali',
      meetingType: 'In Person',
      productType: 'Business Loan',
      isActive: false,
      createdDate: '2024-01-25'
    }
  ]);

  const [formData, setFormData] = useState({
    channel: '',
    value: '',
    priority: 'P1' as 'P1' | 'P2' | 'P3',
    region: '',
    agentName: '',
    meetingType: '',
    productType: ''
  });

  const channels = [
    'Website Forms',
    'Missed Call Numbers / IVR',
    'Mobile App',
    'WhatsApp Business',
    'SMS Campaign Responses',
    'Email',
    'Google/Facebook Ads',
    'Call Center / Inbound Telephony',
    'Marketplace Integrations'
  ];

  const productTypes = [
    'Personal Loan',
    'MSME Loan',
    'Business Loan',
    'Home Loan',
    'Car Loan',
    'Savings Account',
    'Current Account',
    'Fixed Deposit',
    'Recurring Deposit',
    'Credit Card',
    'Insurance Products'
  ];

  const regions = [
    'Mumbai',
    'Pune',
    'Delhi',
    'Bangalore',
    'Chennai',
    'Hyderabad',
    'Kolkata',
    'Ahmedabad'
  ];

  const agentNames = [
    'Vikram',
    'Rahul',
    'Anjali',
    'Priya',
    'Suresh',
    'Kavita'
  ];

  const meetingTypes = [
    'In Person',
    'Virtual',
    'Phone Call',
    'Email Follow-up'
  ];

  const resetForm = () => {
    setFormData({
      channel: '',
      value: '',
      priority: 'P1',
      region: '',
      agentName: '',
      meetingType: '',
      productType: ''
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.channel || !formData.value || !formData.region || !formData.agentName || !formData.meetingType || !formData.productType) {
      toast({
        title: "Validation Error",
        description: "All fields are required",
        variant: "destructive"
      });
      return;
    }

    if (editingRule) {
      // Update existing rule
      setRules(prev => prev.map(rule => 
        rule.id === editingRule.id 
          ? { ...rule, ...formData }
          : rule
      ));
      toast({
        title: "Rule Updated",
        description: "Lead routing rule has been updated successfully",
      });
      setEditingRule(null);
    } else {
      // Create new rule
      const newRule: Rule = {
        id: Date.now().toString(),
        ...formData,
        isActive: true,
        createdDate: new Date().toISOString().split('T')[0]
      };
      setRules(prev => [...prev, newRule]);
      toast({
        title: "Rule Created",
        description: "New lead routing rule has been created successfully",
      });
    }

    resetForm();
    setIsAddModalOpen(false);
  };

  const handleEdit = (rule: Rule) => {
    setEditingRule(rule);
    setFormData({
      channel: rule.channel,
      value: rule.value,
      priority: rule.priority,
      region: rule.region,
      agentName: rule.agentName,
      meetingType: rule.meetingType,
      productType: rule.productType
    });
    setIsAddModalOpen(true);
  };

  const handleDelete = (ruleId: string) => {
    setRules(prev => prev.filter(rule => rule.id !== ruleId));
    toast({
      title: "Rule Deleted",
      description: "Lead routing rule has been deleted successfully",
    });
  };

  const toggleRuleStatus = (ruleId: string) => {
    setRules(prev => prev.map(rule => 
      rule.id === ruleId 
        ? { ...rule, isActive: !rule.isActive }
        : rule
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'P1': return 'bg-red-100 text-red-800';
      case 'P2': return 'bg-yellow-100 text-yellow-800';
      case 'P3': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Lead Routing Rules</h2>
          <p className="text-gray-600">Manage automatic lead assignment rules based on various conditions</p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Plus size={16} className="mr-2" />
              Add Rule
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingRule ? 'Edit Rule' : 'Create New Rule'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="channel">Channel</Label>
                <Select value={formData.channel} onValueChange={(value) => setFormData({...formData, channel: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select channel" />
                  </SelectTrigger>
                  <SelectContent>
                    {channels.map(channel => (
                      <SelectItem key={channel} value={channel}>{channel}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="value">Value</Label>
                <Input
                  id="value"
                  value={formData.value}
                  onChange={(e) => setFormData({...formData, value: e.target.value})}
                  placeholder="e.g., 50L, 25L"
                />
              </div>

              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select value={formData.priority} onValueChange={(value: 'P1' | 'P2' | 'P3') => setFormData({...formData, priority: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="P1">P1 (High)</SelectItem>
                    <SelectItem value="P2">P2 (Medium)</SelectItem>
                    <SelectItem value="P3">P3 (Low)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="region">Region</Label>
                <Select value={formData.region} onValueChange={(value) => setFormData({...formData, region: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map(region => (
                      <SelectItem key={region} value={region}>{region}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="agentName">Agent Name</Label>
                <Select value={formData.agentName} onValueChange={(value) => setFormData({...formData, agentName: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select agent" />
                  </SelectTrigger>
                  <SelectContent>
                    {agentNames.map(agent => (
                      <SelectItem key={agent} value={agent}>{agent}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="meetingType">Meeting Type</Label>
                <Select value={formData.meetingType} onValueChange={(value) => setFormData({...formData, meetingType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select meeting type" />
                  </SelectTrigger>
                  <SelectContent>
                    {meetingTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="productType">Product Type</Label>
                <Select value={formData.productType} onValueChange={(value) => setFormData({...formData, productType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select product type" />
                  </SelectTrigger>
                  <SelectContent>
                    {productTypes.map(product => (
                      <SelectItem key={product} value={product}>{product}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button type="submit" className="flex-1 bg-teal-600 hover:bg-teal-700">
                  {editingRule ? 'Update Rule' : 'Create Rule'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingRule(null);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Rules ({rules.filter(r => r.isActive).length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Channel</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Agent Name</TableHead>
                <TableHead>Meeting Type</TableHead>
                <TableHead>Product Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rules.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell className="font-medium">{rule.channel}</TableCell>
                  <TableCell>{rule.value}</TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(rule.priority)}>
                      {rule.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{rule.region}</TableCell>
                  <TableCell>{rule.agentName}</TableCell>
                  <TableCell>{rule.meetingType}</TableCell>
                  <TableCell>{rule.productType}</TableCell>
                  <TableCell>
                    <Badge 
                      className={`cursor-pointer ${rule.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                      onClick={() => toggleRuleStatus(rule.id)}
                    >
                      {rule.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(rule)}
                      >
                        <Edit size={14} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(rule.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default RuleManagement;
