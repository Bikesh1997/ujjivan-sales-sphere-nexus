
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Phone, Mail, MapPin, Calendar } from 'lucide-react';

interface CustomerSummaryCardProps {
  customer: {
    name: string;
    id: string;
    segment: string;
    phone: string;
    email: string;
    address: string;
    joinDate: string;
  };
}

const CustomerSummaryCard = ({ customer }: CustomerSummaryCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="text-center">
          <Avatar className="h-20 w-20 mx-auto mb-4">
            <AvatarFallback className="text-xl bg-teal-100 text-teal-700">
              {customer.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <h3 className="font-semibold text-lg text-gray-900">{customer.name}</h3>
          <p className="text-sm text-gray-500 mb-3">{customer.id}</p>
          <Badge className="bg-purple-100 text-purple-800 mb-4">{customer.segment}</Badge>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center text-gray-600">
              <Phone size={14} className="mr-2" />
              {customer.phone}
            </div>
            <div className="flex items-center text-gray-600">
              <Mail size={14} className="mr-2" />
              {customer.email}
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin size={14} className="mr-2" />
              {customer.address}
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar size={14} className="mr-2" />
              Customer since {customer.joinDate}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerSummaryCard;
