import { useState, useEffect, useCallback } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  MoreVertical, 
  Phone, 
  Mail, 
  MapPin, 
  Edit, 
  ArrowRight,
  IndianRupee,
  MessageSquare,
  PhoneCall
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from '@/contexts/AuthContext';
import CallInProgressModal from '@/components/leads/CallInProgressModal';

// Mock components for Cross-Sell Suggestions and Goal-Based Nudges
const CrossSellSuggestions = () => (
  <Card>
    <CardHeader>
      <CardTitle>Cross-Sell Suggestions</CardTitle>
      <CardDescription>Opportunities to expand customer relationships</CardDescription>
    </CardHeader>
    <CardContent>
      {/* Mock data */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span>Loan Refinance</span>
          <Badge className="bg-green-100 text-green-800">High Potential</Badge>
        </div>
        <div className="flex items-center justify-between">
          <span>Insurance Products</span>
          <Badge className="bg-yellow-100 text-yellow-800">Medium Potential</Badge>
        </div>
      </div>
    </CardContent>
  </Card>
);

const GoalBasedNudges = () => (
  <Card>
    <CardHeader>
      <CardTitle>Goal-Based Nudges</CardTitle>
      <CardDescription>AI-driven insights to achieve targets</CardDescription>
    </CardHeader>
    <CardContent>
      {/* Mock data */}
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Monthly Target</span>
            <span className="text-sm text-gray-600">₹45K/₹50K</span>
          </div>
          <Progress value={90} className="h-2" />
          <p className="text-xs text-gray-600 mt-1">₹5K remaining for monthly bonus</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  accountType: string;
  relationshipValue: number;
  lastActivity: string;
  status: 'active' | 'inactive' | 'dormant';
  avatar?: string;
}

const CustomerTable = ({ 
  customers, 
  onViewDetails,
  onCallCustomer,
  onCreateOffer
}: {
  customers: Customer[];
  onViewDetails: (customer: Customer) => void;
  onCallCustomer: (customer: Customer) => void;
  onCreateOffer: (customer: Customer) => void;
}) => {
  return (
    <Table>
      <TableCaption>A list of your customers.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Account Type</TableHead>
          <TableHead>Relationship Value</TableHead>
          <TableHead>Last Activity</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers.map((customer) => (
          <TableRow key={customer.id}>
            <TableCell className="font-medium">
              <div className="flex items-center space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{customer.name}</span>
              </div>
            </TableCell>
            <TableCell>{customer.accountType}</TableCell>
            <TableCell><IndianRupee size={14} className="mr-1 inline-block" />{customer.relationshipValue.toLocaleString()}</TableCell>
            <TableCell>{customer.lastActivity}</TableCell>
            <TableCell>
              <Badge 
                variant="secondary"
                className={customer.status === 'active' ? 'bg-green-100 text-green-800' : customer.status === 'inactive' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}
              >
                {customer.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onViewDetails(customer)}>
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onCallCustomer(customer)}>
                    Call Customer
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onCreateOffer(customer)}>
                    Create Offer
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    Edit
                    <Edit className="ml-2 h-4 w-4" />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const Customer360 = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [callModalOpen, setCallModalOpen] = useState(false);
  const [callPopupOpen, setCallPopupOpen] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    // Mock customer data
    const mockCustomers: Customer[] = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+91 9876543210',
        address: '123 Main St, Mumbai',
        accountType: 'Savings',
        relationshipValue: 50000,
        lastActivity: '2 days ago',
        status: 'active',
        avatar: 'https://avatar.vercel.sh/u/4'
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        phone: '+91 8765432109',
        address: '456 Park Ave, Delhi',
        accountType: 'Current',
        relationshipValue: 75000,
        lastActivity: '1 week ago',
        status: 'active',
        avatar: 'https://avatar.vercel.sh/u/5'
      },
      {
        id: 3,
        name: 'David Lee',
        email: 'david.lee@example.com',
        phone: '+91 7654321098',
        address: '789 Church Rd, Kolkata',
        accountType: 'Savings',
        relationshipValue: 30000,
        lastActivity: '3 weeks ago',
        status: 'inactive',
        avatar: 'https://avatar.vercel.sh/u/6'
      },
      {
        id: 4,
        name: 'Priya Sharma',
        email: 'priya.sharma@example.com',
        phone: '+91 6543210987',
        address: '101 MG Road, Bangalore',
        accountType: 'Fixed Deposit',
        relationshipValue: 120000,
        lastActivity: '1 month ago',
        status: 'dormant',
        avatar: 'https://avatar.vercel.sh/u/7'
      },
    ];
    setCustomers(mockCustomers);
  }, []);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const handleViewDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
  };

  const handleCallCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setCallPopupOpen(true);
  };

  const handleStartCall = () => {
    setCallPopupOpen(false);
    setCallModalOpen(true);
  };

  const handleCreateOffer = (customer: Customer) => {
    toast({
      title: "Offer Created!",
      description: `A new offer has been created for ${customer.name}.`,
    })
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Customer 360</h1>
        <p className="text-gray-600">Comprehensive view of your customer relationships</p>
      </div>

      <div className="flex items-center space-x-4">
        <Input
          type="text"
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button>
          Add Customer
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Customer Table */}
        <div className="lg:col-span-3">
          <CustomerTable 
            customers={filteredCustomers}
            onViewDetails={handleViewDetails}
            onCallCustomer={handleCallCustomer}
            onCreateOffer={handleCreateOffer}
          />
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Cross-Sell Suggestions */}
          <CrossSellSuggestions />

          {/* Goal-Based Nudges */}
          <GoalBasedNudges />
        </div>
      </div>

      {/* Customer Details Modal */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-4">
              <div className="text-center">
                <Avatar className="h-16 w-16 mx-auto">
                  <AvatarFallback>{selectedCustomer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold">{selectedCustomer.name}</h3>
                <p className="text-gray-600">{selectedCustomer.email}</p>
                <p className="text-gray-600">{selectedCustomer.phone}</p>
                <p className="text-gray-600">{selectedCustomer.address}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Account Type</Label>
                  <p className="font-medium">{selectedCustomer.accountType}</p>
                </div>
                <div>
                  <Label>Relationship Value</Label>
                  <p className="font-medium"><IndianRupee size={14} className="mr-1 inline-block" />{selectedCustomer.relationshipValue.toLocaleString()}</p>
                </div>
                <div>
                  <Label>Last Activity</Label>
                  <p className="font-medium">{selectedCustomer.lastActivity}</p>
                </div>
                <div>
                  <Label>Status</Label>
                  <Badge 
                    variant="secondary"
                    className={selectedCustomer.status === 'active' ? 'bg-green-100 text-green-800' : selectedCustomer.status === 'inactive' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}
                  >
                    {selectedCustomer.status}
                  </Badge>
                </div>
              </div>
              <Button className="w-full" onClick={handleCloseDetails}>Close</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Call Popup Modal */}
      <Dialog open={callPopupOpen} onOpenChange={setCallPopupOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Initiate Call</DialogTitle>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold">{selectedCustomer.name}</h3>
                <p className="text-gray-600">{selectedCustomer.email}</p>
                <p className="text-gray-600 font-mono">{selectedCustomer.phone}</p>
              </div>
              <div className="flex space-x-2">
                <Button 
                  onClick={handleStartCall}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <PhoneCall size={16} className="mr-2" />
                  Start Call
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setCallPopupOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Call In Progress Modal */}
      {selectedCustomer && (
        <CallInProgressModal
          isOpen={callModalOpen}
          onOpenChange={setCallModalOpen}
          prospectName={selectedCustomer.name}
          businessName={selectedCustomer.email}
          phoneNumber={selectedCustomer.phone}
        />
      )}
    </div>
  );
};

export default Customer360;
