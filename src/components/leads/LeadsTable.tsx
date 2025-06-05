import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { useNavigate } from 'react-router-dom';
import LeadActionsMenu from './LeadActionsMenu';

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
  assignedToId: string;
  lastContact: string;
  priority: string;
}

interface LeadsTableProps {
  leads: Lead[];
  userRole: string;
  onEditLead?: (leadId: string, updatedData: Partial<Lead>) => void;
}

const LeadsTable = ({ leads, userRole, onEditLead }: LeadsTableProps) => {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'qualified': return 'bg-yellow-100 text-yellow-800';
      case 'proposal': return 'bg-orange-100 text-orange-800';
      case 'converted': return 'bg-green-100 text-green-800';
      case 'lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'Website Forms': return 'bg-blue-100 text-blue-800';
      case 'WhatsApp Business': return 'bg-green-100 text-green-800';
      case 'Call Center': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewCustomer = (lead: Lead) => {
    // Create a customer key based on the lead's contact name
    const customerKey = lead.contact.toLowerCase().replace(/\s+/g, '-');
    navigate(`/customer-360?customer=${customerKey}`);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Company</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Value</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Source</TableHead>
          {userRole === 'supervisor' && (
            <TableHead>Assigned To</TableHead>
          )}
          <TableHead>Last Contact</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leads.map((lead) => (
          <TableRow key={lead.id}>
            <TableCell>
              <div>
                <div className="font-medium text-gray-900">{lead.name}</div>
                <div className="text-sm text-gray-500">{lead.id}</div>
              </div>
            </TableCell>
            <TableCell>
              <div>
                <div className="font-medium text-gray-900">{lead.contact}</div>
                <div className="text-sm text-gray-500">{lead.phone}</div>
                <div className="text-sm text-gray-500">{lead.email}</div>
              </div>
            </TableCell>
            <TableCell>
              <Badge className={getStatusColor(lead.status)}>
                {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
              </Badge>
            </TableCell>
            <TableCell className="font-medium text-gray-900">{lead.value}</TableCell>
            <TableCell>
              <Badge className={getPriorityColor(lead.priority)}>
                {lead.priority}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge className={getSourceColor(lead.source)}>
                {lead.source}
              </Badge>
            </TableCell>
            {userRole === 'supervisor' && (
              <TableCell className="text-sm text-gray-900">{lead.assignedTo}</TableCell>
            )}
            <TableCell className="text-sm text-gray-600">{lead.lastContact}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleViewCustomer(lead)}
                >
                  View Customer
                </Button>
                <LeadActionsMenu lead={lead} onEditLead={onEditLead} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LeadsTable;
