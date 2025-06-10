
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
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CrossSellRule {
  id: string;
  name: string;
  condition: string;
  offer: string;
  priority: number;
  isActive: boolean;
  matchedCustomers: number;
}

const CrossSellRules = () => {
  const [rules, setRules] = useState<CrossSellRule[]>([
    {
      id: '1',
      name: 'Savings to FD',
      condition: 'Savings Account + 6 months tenure',
      offer: 'Fixed Deposit with 0.5% extra interest',
      priority: 1,
      isActive: true,
      matchedCustomers: 245
    },
    {
      id: '2',
      name: 'Home Loan to Insurance',
      condition: 'Home Loan + Age < 45',
      offer: 'Term Life Insurance with 20% discount',
      priority: 2,
      isActive: true,
      matchedCustomers: 89
    }
  ]);

  const [isAddRuleOpen, setIsAddRuleOpen] = useState(false);
  const { toast } = useToast();

  const products = ['Savings Account', 'Current Account', 'Fixed Deposit', 'Home Loan', 'Two Wheeler Loan', 'Insurance'];
  const conditions = ['Tenure', 'Age', 'Relationship Value', 'Geography', 'Product Usage'];
  const operators = ['>', '<', '=', '>=', '<=', 'Contains'];

  const handleToggleRule = (ruleId: string) => {
    setRules(rules.map(rule => 
      rule.id === ruleId ? { ...rule, isActive: !rule.isActive } : rule
    ));
    toast({
      title: "Rule Updated",
      description: "Cross-sell rule status has been changed.",
    });
  };

  const handleDeleteRule = (ruleId: string) => {
    setRules(rules.filter(rule => rule.id !== ruleId));
    toast({
      title: "Rule Deleted",
      description: "Cross-sell rule has been removed.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cross-Sell Rules</h1>
          <p className="text-gray-600">Configure automated cross-selling rules and conditions</p>
        </div>
        <Dialog open={isAddRuleOpen} onOpenChange={setIsAddRuleOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Rule
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Cross-Sell Rule</DialogTitle>
            </DialogHeader>
            <AddRuleForm products={products} conditions={conditions} operators={operators} />
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
            <div className="text-2xl font-bold">{rules.reduce((sum, r) => sum + r.matchedCustomers, 0)}</div>
            <div className="text-sm text-gray-600">Matched Customers</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{Math.round(rules.reduce((sum, r) => sum + r.matchedCustomers, 0) * 0.15)}</div>
            <div className="text-sm text-gray-600">Est. Conversions</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cross-Sell Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rule Name</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Offer</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Matched Customers</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rules.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell className="font-medium">{rule.name}</TableCell>
                  <TableCell>{rule.condition}</TableCell>
                  <TableCell>{rule.offer}</TableCell>
                  <TableCell>{rule.priority}</TableCell>
                  <TableCell>{rule.matchedCustomers}</TableCell>
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
                        <Eye className="h-4 w-4" />
                      </Button>
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
    </div>
  );
};

const AddRuleForm = ({ products, conditions, operators }: any) => {
  const [formData, setFormData] = useState({
    name: '',
    sourceProduct: '',
    condition: '',
    operator: '',
    value: '',
    targetProduct: '',
    offerType: '',
    priority: 1
  });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Rule Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Savings to FD"
          />
        </div>
        <div>
          <Label>Priority</Label>
          <Input
            type="number"
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) })}
            min="1"
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-medium">Rule Conditions</Label>
        <div className="grid grid-cols-4 gap-2">
          <Select value={formData.sourceProduct} onValueChange={(value) => setFormData({ ...formData, sourceProduct: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Source Product" />
            </SelectTrigger>
            <SelectContent>
              {products.map((product: string) => (
                <SelectItem key={product} value={product}>{product}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={formData.condition} onValueChange={(value) => setFormData({ ...formData, condition: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Condition" />
            </SelectTrigger>
            <SelectContent>
              {conditions.map((condition: string) => (
                <SelectItem key={condition} value={condition}>{condition}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={formData.operator} onValueChange={(value) => setFormData({ ...formData, operator: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Operator" />
            </SelectTrigger>
            <SelectContent>
              {operators.map((operator: string) => (
                <SelectItem key={operator} value={operator}>{operator}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="Value"
            value={formData.value}
            onChange={(e) => setFormData({ ...formData, value: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Target Product</Label>
          <Select value={formData.targetProduct} onValueChange={(value) => setFormData({ ...formData, targetProduct: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select target product" />
            </SelectTrigger>
            <SelectContent>
              {products.map((product: string) => (
                <SelectItem key={product} value={product}>{product}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Offer Type</Label>
          <Select value={formData.offerType} onValueChange={(value) => setFormData({ ...formData, offerType: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select offer type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="discount">Discount</SelectItem>
              <SelectItem value="cashback">Cashback</SelectItem>
              <SelectItem value="extra_interest">Extra Interest</SelectItem>
              <SelectItem value="waiver">Fee Waiver</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button className="w-full">Create Rule</Button>
    </div>
  );
};

export default CrossSellRules;
