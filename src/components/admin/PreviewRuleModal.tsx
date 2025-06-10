
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, Target, TrendingUp } from 'lucide-react';

interface CrossSellRule {
  id: string;
  name: string;
  condition: string;
  offer: string;
  status: 'active' | 'inactive';
  priority: number;
  createdDate: string;
  matchedCustomers: number;
}

interface PreviewRuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  rule: CrossSellRule;
}

const mockMatchedCustomers = [
  { id: 1, name: 'Rajesh Kumar', account: 'SAV001234', balance: '₹75,000', tenure: '8 months', score: 85 },
  { id: 2, name: 'Priya Sharma', account: 'SAV001235', balance: '₹1,20,000', tenure: '12 months', score: 92 },
  { id: 3, name: 'Amit Patel', account: 'SAV001236', balance: '₹65,000', tenure: '6 months', score: 78 },
  { id: 4, name: 'Neha Gupta', account: 'SAV001237', balance: '₹95,000', tenure: '10 months', score: 88 },
  { id: 5, name: 'Vikram Singh', account: 'SAV001238', balance: '₹85,000', tenure: '7 months', score: 82 }
];

const PreviewRuleModal: React.FC<PreviewRuleModalProps> = ({ isOpen, onClose, rule }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle>Rule Preview - {rule.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Rule Details */}
          <Card>
            <CardHeader>
              <CardTitle>Rule Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Condition</div>
                  <div className="font-medium p-2 bg-gray-50 rounded">{rule.condition}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Offer</div>
                  <div className="font-medium p-2 bg-gray-50 rounded">{rule.offer}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Priority</div>
                  <Badge variant="outline">P{rule.priority}</Badge>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Status</div>
                  <Badge variant={rule.status === 'active' ? 'default' : 'secondary'}>
                    {rule.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-teal-600" />
                  <div>
                    <div className="text-2xl font-bold text-teal-600">{rule.matchedCustomers}</div>
                    <div className="text-sm text-gray-600">Customers Matched</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="text-2xl font-bold text-green-600">67%</div>
                    <div className="text-sm text-gray-600">Conversion Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="text-2xl font-bold text-blue-600">₹12.5L</div>
                    <div className="text-sm text-gray-600">Revenue Generated</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Matched Customers */}
          <Card>
            <CardHeader>
              <CardTitle>Customers Matching This Rule</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>Account Number</TableHead>
                    <TableHead>Balance</TableHead>
                    <TableHead>Tenure</TableHead>
                    <TableHead>Propensity Score</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockMatchedCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>{customer.account}</TableCell>
                      <TableCell>{customer.balance}</TableCell>
                      <TableCell>{customer.tenure}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="text-sm font-medium">{customer.score}%</div>
                          <div className={`w-16 h-2 rounded-full ${
                            customer.score >= 90 ? 'bg-green-500' :
                            customer.score >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}>
                            <div 
                              className="h-full bg-gray-200 rounded-full"
                              style={{ width: `${100 - customer.score}%` }}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          Eligible
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Rule Impact Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Rule Performance Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 border rounded">
                  <div>
                    <div className="font-medium">Week 1</div>
                    <div className="text-sm text-gray-600">45 customers matched, 28 offers sent</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-green-600">18 conversions</div>
                    <div className="text-sm text-gray-600">64% conversion rate</div>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 border rounded">
                  <div>
                    <div className="font-medium">Week 2</div>
                    <div className="text-sm text-gray-600">52 customers matched, 35 offers sent</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-green-600">24 conversions</div>
                    <div className="text-sm text-gray-600">69% conversion rate</div>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 border rounded">
                  <div>
                    <div className="font-medium">Week 3</div>
                    <div className="text-sm text-gray-600">38 customers matched, 25 offers sent</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-green-600">16 conversions</div>
                    <div className="text-sm text-gray-600">64% conversion rate</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewRuleModal;
