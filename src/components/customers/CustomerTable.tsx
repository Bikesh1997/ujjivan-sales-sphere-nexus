
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Phone, Mail, MapPin, TrendingUp, Eye } from 'lucide-react';

interface Customer {
  key: string;
  name: string;
  id: string;
  segment: string;
  relationshipValue: string;
  totalRelationship: string;
  phone: string;
  email: string;
  address: string;
  joinDate: string;
  lastInteraction: string;
  riskScore: string;
}

interface CustomerTableProps {
  customers: Customer[];
  selectedCustomer: string | null;
  onCustomerSelect: (customerKey: string) => void;
}

const CustomerTable = ({ customers, selectedCustomer, onCustomerSelect }: CustomerTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSegmentColor = (segment: string) => {
    switch (segment) {
      case 'Premium': return 'bg-purple-100 text-purple-800';
      case 'Gold': return 'bg-yellow-100 text-yellow-800';
      case 'Silver': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Customer Directory</CardTitle>
          <div className="relative w-80">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Segment</TableHead>
              <TableHead>Relationship Value</TableHead>
              <TableHead>Risk Score</TableHead>
              <TableHead>Last Interaction</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow 
                key={customer.key}
                className={`cursor-pointer hover:bg-gray-50 ${
                  selectedCustomer === customer.key ? 'bg-teal-50 border-l-4 border-teal-500' : ''
                }`}
                onClick={() => onCustomerSelect(customer.key)}
              >
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-teal-100 text-teal-700">
                        {customer.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-sm text-gray-500">{customer.id}</div>
                      <div className="text-xs text-gray-400">{customer.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getSegmentColor(customer.segment)}>
                    {customer.segment}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <TrendingUp size={14} className="mr-1 text-teal-600" />
                    <span className="font-medium">{customer.totalRelationship}</span>
                  </div>
                  <div className="text-xs text-gray-500">{customer.relationshipValue} Value</div>
                </TableCell>
                <TableCell>
                  <Badge className={getRiskColor(customer.riskScore)}>
                    {customer.riskScore}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-gray-600">
                  {customer.lastInteraction}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCustomerSelect(customer.key);
                      }}
                    >
                      <Eye size={14} className="mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Phone size={14} />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Mail size={14} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CustomerTable;
