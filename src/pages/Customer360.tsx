
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  CreditCard,
  TrendingUp,
  Calendar,
  Search,
  Filter,
  Plus
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  segment: 'Premium' | 'Gold' | 'Silver' | 'Basic';
  relationship: string;
  totalInvestments: number;
  products: string[];
  lastContact: string;
  status: 'active' | 'inactive' | 'prospect';
}

interface Activity {
  id: string;
  type: 'call' | 'meeting' | 'email' | 'transaction';
  description: string;
  date: string;
  status: 'completed' | 'pending';
}

const Customer360 = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const [customers] = useState<Customer[]>([
    {
      id: '1',
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 98765 43210',
      address: 'Bandra West, Mumbai 400050',
      segment: 'Premium',
      relationship: '3 years',
      totalInvestments: 2500000,
      products: ['Savings Account', 'Home Loan', 'Mutual Funds'],
      lastContact: '2024-01-15',
      status: 'active'
    },
    {
      id: '2',
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@email.com',
      phone: '+91 98765 43211',
      address: 'Andheri East, Mumbai 400069',
      segment: 'Gold',
      relationship: '2 years',
      totalInvestments: 1800000,
      products: ['Current Account', 'Personal Loan', 'Insurance'],
      lastContact: '2024-01-14',
      status: 'active'
    },
    {
      id: '3',
      name: 'Anita Patel',
      email: 'anita.patel@email.com',
      phone: '+91 98765 43212',
      address: 'Powai, Mumbai 400076',
      segment: 'Silver',
      relationship: '1 year',
      totalInvestments: 950000,
      products: ['Savings Account', 'FD'],
      lastContact: '2024-01-10',
      status: 'prospect'
    }
  ]);

  const [activities] = useState<Activity[]>([
    {
      id: '1',
      type: 'call',
      description: 'Discussed home loan options and interest rates',
      date: '2024-01-15',
      status: 'completed'
    },
    {
      id: '2',
      type: 'meeting',
      description: 'Branch visit for account opening documentation',
      date: '2024-01-14',
      status: 'completed'
    },
    {
      id: '3',
      type: 'email',
      description: 'Sent investment portfolio recommendations',
      date: '2024-01-13',
      status: 'pending'
    }
  ]);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const getSegmentColor = (segment: string) => {
    switch (segment) {
      case 'Premium': return 'bg-purple-100 text-purple-800';
      case 'Gold': return 'bg-yellow-100 text-yellow-800';
      case 'Silver': return 'bg-gray-100 text-gray-800';
      case 'Basic': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'prospect': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCustomerAction = (action: string, customerId?: string) => {
    toast({
      title: "Action Initiated",
      description: `${action} has been initiated${customerId ? ` for customer` : ''}`,
    });
  };

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Customer 360
          </h1>
          <p className="text-gray-600 mt-1">
            Complete customer relationship management
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button onClick={() => handleCustomerAction('Add New Customer')} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Customer
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search customers by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Customers ({filteredCustomers.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredCustomers.map((customer) => (
                  <div
                    key={customer.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedCustomer?.id === customer.id ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedCustomer(customer)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">{customer.name}</h4>
                      <Badge className={getSegmentColor(customer.segment)}>
                        {customer.segment}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{customer.email}</p>
                    <p className="text-sm text-gray-600">{customer.phone}</p>
                    <div className="flex justify-between items-center mt-2">
                      <Badge className={getStatusColor(customer.status)}>
                        {customer.status}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        ₹{(customer.totalInvestments / 100000).toFixed(1)}L
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customer Details */}
        <div className="lg:col-span-2">
          {selectedCustomer ? (
            <div className="space-y-6">
              {/* Customer Profile */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      Customer Profile
                    </span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleCustomerAction('Edit Profile', selectedCustomer.id)}>
                        Edit
                      </Button>
                      <Button size="sm" onClick={() => handleCustomerAction('Schedule Call', selectedCustomer.id)}>
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{selectedCustomer.name}</h3>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <Mail className="h-4 w-4 mr-2 text-gray-400" />
                          {selectedCustomer.email}
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone className="h-4 w-4 mr-2 text-gray-400" />
                          {selectedCustomer.phone}
                        </div>
                        <div className="flex items-center text-sm">
                          <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                          {selectedCustomer.address}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-600">Customer Segment</p>
                          <Badge className={getSegmentColor(selectedCustomer.segment)}>
                            {selectedCustomer.segment}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Relationship Duration</p>
                          <p className="font-medium">{selectedCustomer.relationship}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Total Investments</p>
                          <p className="font-medium text-green-600">
                            ₹{(selectedCustomer.totalInvestments / 100000).toFixed(1)} Lakhs
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Products & Services */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Products & Services
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {selectedCustomer.products.map((product, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <h4 className="font-medium">{product}</h4>
                        <p className="text-sm text-gray-600">Active</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" onClick={() => handleCustomerAction('Cross-sell Products', selectedCustomer.id)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Suggest Products
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Recent Activities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {activities.map((activity) => (
                      <div key={activity.id} className="flex items-start justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{activity.description}</h4>
                          <p className="text-xs text-gray-500">{activity.date}</p>
                        </div>
                        <Badge className={activity.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                          {activity.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" onClick={() => handleCustomerAction('Log Activity', selectedCustomer.id)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Log Activity
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">
                  Select a Customer
                </h3>
                <p className="text-sm text-gray-500">
                  Choose a customer from the list to view their complete profile and interaction history.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Customer360;
