
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
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Plus, Edit, Trash2, CalendarIcon, Target } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

interface Offer {
  id: string;
  name: string;
  type: string;
  product: string;
  value: string;
  startDate: string;
  endDate: string;
  eligibleCustomers: number;
  isActive: boolean;
  campaign?: string;
}

const OfferManagement = () => {
  const [offers, setOffers] = useState<Offer[]>([
    {
      id: '1',
      name: 'FD Bonus Interest',
      type: 'Extra Interest',
      product: 'Fixed Deposit',
      value: '0.5% additional',
      startDate: '2024-06-01',
      endDate: '2024-12-31',
      eligibleCustomers: 1250,
      isActive: true,
      campaign: 'Summer Savings'
    },
    {
      id: '2',
      name: 'Home Loan Cashback',
      type: 'Cashback',
      product: 'Home Loan',
      value: '₹50,000',
      startDate: '2024-06-01',
      endDate: '2024-09-30',
      eligibleCustomers: 89,
      isActive: true
    }
  ]);

  const [isAddOfferOpen, setIsAddOfferOpen] = useState(false);
  const { toast } = useToast();

  const products = ['Savings Account', 'Current Account', 'Fixed Deposit', 'Home Loan', 'Two Wheeler Loan', 'Insurance'];
  const offerTypes = ['Discount', 'Cashback', 'Extra Interest', 'Fee Waiver', 'Gift Voucher'];

  const handleToggleOffer = (offerId: string) => {
    setOffers(offers.map(offer => 
      offer.id === offerId ? { ...offer, isActive: !offer.isActive } : offer
    ));
    toast({
      title: "Offer Updated",
      description: "Offer status has been changed.",
    });
  };

  const handleDeleteOffer = (offerId: string) => {
    setOffers(offers.filter(offer => offer.id !== offerId));
    toast({
      title: "Offer Deleted",
      description: "Offer has been removed.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Offer Management</h1>
          <p className="text-gray-600">Create and manage customer offers and promotions</p>
        </div>
        <Dialog open={isAddOfferOpen} onOpenChange={setIsAddOfferOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Offer
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Offer</DialogTitle>
            </DialogHeader>
            <AddOfferForm products={products} offerTypes={offerTypes} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{offers.length}</div>
            <div className="text-sm text-gray-600">Total Offers</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{offers.filter(o => o.isActive).length}</div>
            <div className="text-sm text-gray-600">Active Offers</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{offers.reduce((sum, o) => sum + o.eligibleCustomers, 0)}</div>
            <div className="text-sm text-gray-600">Eligible Customers</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{Math.round(offers.reduce((sum, o) => sum + o.eligibleCustomers, 0) * 0.12)}</div>
            <div className="text-sm text-gray-600">Est. Redemptions</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Active Offers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Offer Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Valid Until</TableHead>
                <TableHead>Eligible Customers</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {offers.map((offer) => (
                <TableRow key={offer.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div>{offer.name}</div>
                      {offer.campaign && <div className="text-xs text-gray-500">{offer.campaign}</div>}
                    </div>
                  </TableCell>
                  <TableCell>{offer.type}</TableCell>
                  <TableCell>{offer.product}</TableCell>
                  <TableCell>{offer.value}</TableCell>
                  <TableCell>{format(new Date(offer.endDate), 'MMM dd, yyyy')}</TableCell>
                  <TableCell>{offer.eligibleCustomers.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={offer.isActive}
                        onCheckedChange={() => handleToggleOffer(offer.id)}
                      />
                      <Badge variant={offer.isActive ? 'default' : 'secondary'}>
                        {offer.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteOffer(offer.id)}>
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

const AddOfferForm = ({ products, offerTypes }: any) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    product: '',
    value: '',
    campaign: '',
    customerType: 'all'
  });
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Offer Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., FD Bonus Interest"
          />
        </div>
        <div>
          <Label>Offer Type</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {offerTypes.map((type: string) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Product</Label>
          <Select value={formData.product} onValueChange={(value) => setFormData({ ...formData, product: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select product" />
            </SelectTrigger>
            <SelectContent>
              {products.map((product: string) => (
                <SelectItem key={product} value={product}>{product}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="value">Offer Value</Label>
          <Input
            id="value"
            value={formData.value}
            onChange={(e) => setFormData({ ...formData, value: e.target.value })}
            placeholder="e.g., 0.5% or ₹5000"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={startDate} onSelect={setStartDate} />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label>End Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={endDate} onSelect={setEndDate} />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div>
        <Label htmlFor="campaign">Campaign (Optional)</Label>
        <Input
          id="campaign"
          value={formData.campaign}
          onChange={(e) => setFormData({ ...formData, campaign: e.target.value })}
          placeholder="e.g., Summer Savings Campaign"
        />
      </div>

      <Button className="w-full">Create Offer</Button>
    </div>
  );
};

export default OfferManagement;
