
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Phone, Mail, MapPin, Eye, User } from 'lucide-react';
import LeadActionsMenu from './LeadActionsMenu';
import BulkLeadActions from './BulkLeadActions';
import LeadViewModal from './LeadViewModal';
import { useNavigate } from 'react-router-dom';

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
  selectedLeads: string[];
  onLeadSelect: (leadId: string) => void;
  onSelectAll: (checked: boolean) => void;
  onLeadUpdate: (leadId: string, updates: Partial<Lead>) => void;
  onLeadDelete: (leadId: string) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const LeadsTable = ({ 
  leads, 
  selectedLeads, 
  onLeadSelect, 
  onSelectAll, 
  onLeadUpdate, 
  onLeadDelete,
  searchTerm,
  onSearchChange
}: LeadsTableProps) => {
  const navigate = useNavigate();
  const [viewModalLead, setViewModalLead] = useState<Lead | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const filteredLeads = leads.filter(lead =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.phone.includes(searchTerm)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'qualified': return 'bg-green-100 text-green-800';
      case 'proposal': return 'bg-yellow-100 text-yellow-800';
      case 'converted': return 'bg-purple-100 text-purple-800';
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

  const handleViewLead = (lead: Lead, e: React.MouseEvent) => {
    e.stopPropagation();
    setViewModalLead(lead);
    setIsViewModalOpen(true);
  };

  const handleRowClick = (leadId: string) => {
    navigate(`/leads/${leadId}`);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Leads ({filteredLeads.length})</CardTitle>
          <div className="flex items-center space-x-4">
            {selectedLeads.length > 0 && (
              <BulkLeadActions 
                selectedLeads={selectedLeads}
                onLeadUpdate={onLeadUpdate}
              />
            )}
            <div className="relative w-80">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedLeads.length === filteredLeads.length && filteredLeads.length > 0}
                  onCheckedChange={onSelectAll}
                />
              </TableHead>
              <TableHead>Lead</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Last Contact</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.map((lead) => (
              <TableRow 
                key={lead.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleRowClick(lead.id)}
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={selectedLeads.includes(lead.id)}
                    onCheckedChange={() => onLeadSelect(lead.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {lead.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{lead.name}</div>
                      <div className="text-sm text-gray-500">{lead.contact}</div>
                      <div className="text-xs text-gray-400">{lead.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(lead.status)}>
                    {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-gray-600">{lead.source}</TableCell>
                <TableCell className="font-medium text-teal-600">{lead.value}</TableCell>
                <TableCell>
                  <Badge className={getPriorityColor(lead.priority)}>
                    {lead.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <User size={14} className="text-gray-400" />
                    <span className="text-sm">{lead.assignedTo}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-gray-600">{lead.lastContact}</TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={(e) => handleViewLead(lead, e)}
                    >
                      <Eye size={14} className="mr-1" />
                      View
                    </Button>
                    <LeadActionsMenu 
                      lead={lead}
                      onUpdate={onLeadUpdate}
                      onDelete={onLeadDelete}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <LeadViewModal
          lead={viewModalLead}
          isOpen={isViewModalOpen}
          onOpenChange={setIsViewModalOpen}
        />
      </CardContent>
    </Card>
  );
};

export default LeadsTable;
