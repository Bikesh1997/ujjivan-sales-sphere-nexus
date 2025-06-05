
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Rule {
  id: string;
  name: string;
  description: string;
  channel: string;
  value: string;
  priority: string;
  team: string;
  meetingType: string;
  productType: string;
  status: string;
  dueDate: string;
}

const RuleManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newRule, setNewRule] = useState({
    name: '',
    description: '',
    channel: '',
    value: '',
    priority: '',
    team: '',
    meetingType: '',
    productType: ''
  });

  const [rules, setRules] = useState<Rule[]>([
    {
      id: '1',
      name: 'High-Value Urgent Renewal',
      description: 'Highest priority customers with imminent renewal dates and high customer value',
      channel: 'Website Form',
      value: '50L+',
      priority: 'P1',
      team: 'Sales Executive',
      meetingType: 'In Person',
      productType: 'MSME Loan',
      status: 'Active',
      dueDate: '<30 days'
    },
    {
      id: '2',
      name: 'Medium-Value Urgent Renewal',
      description: 'High priority customers with imminent renewal dates and medium customer value',
      channel: 'WhatsApp Business',
      value: '25L-50L',
      priority: 'P1',
      team: 'Sales Executive',
      meetingType: 'Virtual',
      productType: 'Personal Loan',
      status: 'Active',
      dueDate: '<30 days'
    },
    {
      id: '3',
      name: 'Low-Value Urgent Renewal',
      description: 'High priority customers with imminent renewal dates but low customer value',
      channel: 'Mobile App',
      value: '10L-25L',
      priority: 'P1',
      team: 'Sales Executive',
      meetingType: 'Phone Call',
      productType: 'Home Loan',
      status: 'Active',
      dueDate: '<30 days'
    },
    {
      id: '4',
      name: 'High-Value Near-Term Renewal',
      description: 'High-value customers with approaching renewal dates',
      channel: 'Call Center',
      value: '50L+',
      priority: 'P2',
      team: 'Sales Executive',
      meetingType: 'In Person',
      productType: 'Business Loan',
      status: 'Active',
      dueDate: '30-60 days'
    },
    {
      id: '5',
      name: 'Medium-Value Near-Term Renewal',
      description: 'Medium-value customers with approaching renewal dates',
      channel: 'Email',
      value: '25L-50L',
      priority: 'P2',
      team: 'Sales Executive',
      meetingType: 'Virtual',
      productType: 'Car Loan',
      status: 'Active',
      dueDate: '30-60 days'
    }
  ]);

  const channels = [
    'Website Form', 'WhatsApp Business', 'Mobile App', 'Call Center', 
    'Email', 'SMS Campaign', 'Google Ads', 'Facebook Ads', 'Marketplace'
  ];

  const priorities = ['P1', 'P2', 'P3'];
  const teams = ['Sales Executive', 'Supervisor', 'Manager'];
  const meetingTypes = ['In Person', 'Virtual', 'Phone Call'];
  const productTypes = ['MSME Loan', 'Personal Loan', 'Home Loan', 'Business Loan', 'Car Loan', 'Savings Account'];

  const filteredRules = rules.filter(rule =>
    rule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rule.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rule.channel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddRule = () => {
    if (!newRule.name || !newRule.channel || !newRule.priority) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const rule: Rule = {
      id: (rules.length + 1).toString(),
      ...newRule,
      status: 'Active',
      dueDate: '<30 days'
    };

    setRules([...rules, rule]);
    setNewRule({
      name: '',
      description: '',
      channel: '',
      value: '',
      priority: '',
      team: '',
      meetingType: '',
      productType: ''
    });
    setIsAddModalOpen(false);

    toast({
      title: "Rule Added",
      description: `${rule.name} has been successfully created`,
    });
  };

  const handleDeleteRule = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id));
    toast({
      title: "Rule Deleted",
      description: "Rule has been successfully removed",
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'P1': return 'bg-red-100 text-red-800';
      case 'P2': return 'bg-yellow-100 text-yellow-800';
      case 'P3': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getValueColor = (value: string) => {
    if (value.includes('50L+') || value.includes('High')) return 'bg-purple-100 text-purple-800';
    if (value.includes('25L-50L') || value.includes('Medium')) return 'bg-blue-100 text-blue-800';
    return 'bg-green-100 text-green-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Rule Management</h1>
          <p className="text-gray-600">Manage lead assignment and prioritization rules</p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus size={16} className="mr-2" />
              Add Rule
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Rule</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-2">Rule Name *</label>
                <Input
                  value={newRule.name}
                  onChange={(e) => setNewRule({...newRule, name: e.target.value})}
                  placeholder="Enter rule name"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-2">Description</label>
                <Input
                  value={newRule.description}
                  onChange={(e) => setNewRule({...newRule, description: e.target.value})}
                  placeholder="Enter rule description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Channel *</label>
                <Select value={newRule.channel} onValueChange={(value) => setNewRule({...newRule, channel: value})}>
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
                <label className="block text-sm font-medium mb-2">Value</label>
                <Input
                  value={newRule.value}
                  onChange={(e) => setNewRule({...newRule, value: e.target.value})}
                  placeholder="e.g., 50L+"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Priority *</label>
                <Select value={newRule.priority} onValueChange={(value) => setNewRule({...newRule, priority: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {priorities.map(priority => (
                      <SelectItem key={priority} value={priority}>{priority}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Team</label>
                <Select value={newRule.team} onValueChange={(value) => setNewRule({...newRule, team: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select team" />
                  </SelectTrigger>
                  <SelectContent>
                    {teams.map(team => (
                      <SelectItem key={team} value={team}>{team}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Meeting Type</label>
                <Select value={newRule.meetingType} onValueChange={(value) => setNewRule({...newRule, meetingType: value})}>
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
                <label className="block text-sm font-medium mb-2">Product Type</label>
                <Select value={newRule.productType} onValueChange={(value) => setNewRule({...newRule, productType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select product type" />
                  </SelectTrigger>
                  <SelectContent>
                    {productTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddRule} className="bg-blue-600 hover:bg-blue-700">
                Add Rule
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Search rules by name, description or channel..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Rules Table */}
      <Card>
        <CardHeader>
          <CardTitle>Rules ({filteredRules.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rule Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Channel</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>Meeting Type</TableHead>
                <TableHead>Product Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRules.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell className="font-medium">{rule.name}</TableCell>
                  <TableCell className="max-w-xs text-sm text-gray-600">{rule.description}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      {rule.channel}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(rule.priority)}>
                      {rule.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getValueColor(rule.value)}>
                      {rule.value}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-teal-50 text-teal-700">
                      {rule.team}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-purple-50 text-purple-700">
                      {rule.meetingType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      {rule.productType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-800">
                      {rule.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeleteRule(rule.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={16} />
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
