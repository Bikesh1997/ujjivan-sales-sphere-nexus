
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, Play, Pause, Calendar, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AutomationRule {
  id: string;
  name: string;
  trigger: string;
  action: string;
  frequency: string;
  isActive: boolean;
  executionCount: number;
  lastExecuted?: string;
}

const EventManagement = () => {
  const [rules, setRules] = useState<AutomationRule[]>([
    {
      id: '1',
      name: 'Birthday Wishes',
      trigger: 'Customer Birthday',
      action: 'Send WhatsApp Message',
      frequency: 'Once per year',
      isActive: true,
      executionCount: 1245,
      lastExecuted: '2024-06-10'
    },
    {
      id: '2',
      name: 'FD Maturity Alert',
      trigger: 'FD Maturity - 7 days',
      action: 'Send SMS + Create Task',
      frequency: 'Once',
      isActive: true,
      executionCount: 89,
      lastExecuted: '2024-06-09'
    },
    {
      id: '3',
      name: 'Inactive Customer',
      trigger: 'No transaction - 90 days',
      action: 'Show Nudge to FSO',
      frequency: 'Every 30 days',
      isActive: false,
      executionCount: 156
    }
  ]);

  const [isAddRuleOpen, setIsAddRuleOpen] = useState(false);
  const { toast } = useToast();

  const triggers = [
    'Customer Birthday',
    'FD Maturity',
    'EMI Due Date',
    'Account Inactivity',
    'Large Transaction',
    'Loan Application',
    'Customer Visit',
    'Campaign Response'
  ];

  const actions = [
    'Send SMS',
    'Send WhatsApp',
    'Send Email',
    'Create Task',
    'Show Nudge',
    'Schedule Call',
    'Generate Lead',
    'Update Customer Score'
  ];

  const handleToggleRule = (ruleId: string) => {
    setRules(rules.map(rule => 
      rule.id === ruleId ? { ...rule, isActive: !rule.isActive } : rule
    ));
    toast({
      title: "Rule Updated",
      description: "Automation rule status has been changed.",
    });
  };

  const handleDeleteRule = (ruleId: string) => {
    setRules(rules.filter(rule => rule.id !== ruleId));
    toast({
      title: "Rule Deleted",
      description: "Automation rule has been removed.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Event Management</h1>
          <p className="text-gray-600">Configure automated events and customer triggers</p>
        </div>
        <Dialog open={isAddRuleOpen} onOpenChange={setIsAddRuleOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Automation
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Automation Rule</DialogTitle>
            </DialogHeader>
            <AddRuleForm triggers={triggers} actions={actions} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{rules.length}</div>
            <div className="text-sm text-gray-600">Total Rules</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{rules.filter(r => r.isActive).length}</div>
            <div className="text-sm text-gray-600">Active Rules</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{rules.reduce((sum, r) => sum + r.executionCount, 0)}</div>
            <div className="text-sm text-gray-600">Total Executions</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{rules.filter(r => r.lastExecuted === '2024-06-10').length}</div>
            <div className="text-sm text-gray-600">Executed Today</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="rules" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="rules">Automation Rules</TabsTrigger>
          <TabsTrigger value="logs">Execution Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="rules">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5" />
                Automation Rules
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rule Name</TableHead>
                    <TableHead>Trigger</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Executions</TableHead>
                    <TableHead>Last Run</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rules.map((rule) => (
                    <TableRow key={rule.id}>
                      <TableCell className="font-medium">{rule.name}</TableCell>
                      <TableCell>{rule.trigger}</TableCell>
                      <TableCell>{rule.action}</TableCell>
                      <TableCell>{rule.frequency}</TableCell>
                      <TableCell>{rule.executionCount}</TableCell>
                      <TableCell>{rule.lastExecuted || 'Never'}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={rule.isActive}
                            onCheckedChange={() => handleToggleRule(rule.id)}
                          />
                          <Badge variant={rule.isActive ? 'default' : 'secondary'}>
                            {rule.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteRule(rule.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Execution Logs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Birthday Wishes - Sent to 45 customers</div>
                    <div className="text-sm text-gray-500">Today at 09:00 AM</div>
                  </div>
                  <Badge variant="default">Success</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">FD Maturity Alert - Created 12 tasks</div>
                    <div className="text-sm text-gray-500">Yesterday at 08:30 AM</div>
                  </div>
                  <Badge variant="default">Success</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">EMI Due Reminder - Failed to send SMS</div>
                    <div className="text-sm text-gray-500">2 days ago at 10:00 AM</div>
                  </div>
                  <Badge variant="destructive">Failed</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const AddRuleForm = ({ triggers, actions }: any) => {
  const [formData, setFormData] = useState({
    name: '',
    trigger: '',
    action: '',
    frequency: 'once',
    conditions: ''
  });

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Rule Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g., Birthday Wishes"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Trigger Event</Label>
          <Select value={formData.trigger} onValueChange={(value) => setFormData({ ...formData, trigger: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select trigger" />
            </SelectTrigger>
            <SelectContent>
              {triggers.map((trigger: string) => (
                <SelectItem key={trigger} value={trigger}>{trigger}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Action</Label>
          <Select value={formData.action} onValueChange={(value) => setFormData({ ...formData, action: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select action" />
            </SelectTrigger>
            <SelectContent>
              {actions.map((action: string) => (
                <SelectItem key={action} value={action}>{action}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label>Frequency</Label>
        <Select value={formData.frequency} onValueChange={(value) => setFormData({ ...formData, frequency: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="once">Once</SelectItem>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="conditions">Additional Conditions (Optional)</Label>
        <Input
          id="conditions"
          value={formData.conditions}
          onChange={(e) => setFormData({ ...formData, conditions: e.target.value })}
          placeholder="e.g., Age > 18, Balance > 10000"
        />
      </div>

      <Button className="w-full">Create Automation Rule</Button>
    </div>
  );
};

export default EventManagement;
