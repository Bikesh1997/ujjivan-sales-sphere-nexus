
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, Calendar, IndianRupee } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  contact: string;
  phone: string;
  email: string;
  status: string;
  source: string;
  value: string;
  assignedTo: string;
  lastContact: string;
  priority: string;
}

interface LeadCardProps {
  lead: Lead;
  onClick?: () => void;
}

const LeadCard = ({ lead, onClick }: LeadCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-gray-100 text-gray-800';
      case 'qualified': return 'bg-blue-100 text-blue-800';
      case 'proposal': return 'bg-yellow-100 text-yellow-800';
      case 'negotiation': return 'bg-orange-100 text-orange-800';
      case 'converted': return 'bg-green-100 text-green-800';
      case 'lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-shadow duration-200 min-h-[200px] max-h-[400px] w-full"
      onClick={onClick}
    >
      <CardContent className="p-4 h-full flex flex-col justify-between">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">{lead.contact}</h3>
              <p className="text-xs text-gray-600">{lead.name}</p>
            </div>
            <div className="flex gap-1">
              <Badge className={`text-xs ${getStatusColor(lead.status)}`}>
                {lead.status}
              </Badge>
            </div>
          </div>
          
          <Badge className={`text-xs ${getPriorityColor(lead.priority)}`}>
            {lead.priority} priority
          </Badge>
        </div>

        {/* Contact Info */}
        <div className="space-y-2 my-3 flex-1">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Phone size={12} />
            <span className="truncate">{lead.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Mail size={12} />
            <span className="truncate">{lead.email}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <IndianRupee size={12} />
            <span className="font-medium">{lead.value}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Calendar size={12} />
            <span>{lead.lastContact}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="space-y-2">
          <div className="text-xs text-gray-500">
            Assigned to: <span className="font-medium">{lead.assignedTo}</span>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="flex-1 text-xs h-7">
              View
            </Button>
            <Button size="sm" className="flex-1 bg-teal-600 hover:bg-teal-700 text-xs h-7">
              Contact
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadCard;
