
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
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
  selectedLeads?: string[];
  onSelectLead?: (leadId: string, selected: boolean) => void;
  onSelectAll?: (selected: boolean) => void;
  onEditLead?: (leadId: string, updatedData: Partial<Lead>) => void;
}

const LeadsTable = ({ 
  leads, 
  userRole, 
  selectedLeads = [], 
  onSelectLead, 
  onSelectAll, 
  onEditLead 
}: LeadsTableProps) => {
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

  const isAllSelected = leads.length > 0 && selectedLeads.length === leads.length;
  const isIndeterminate = selectedLeads.length > 0 && selectedLeads.length < leads.length;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {onSelectLead && (
            <TableHead className="w-12">
              <Checkbox
                checked={isAllSelected}
                onCheckedChange={(checked) => onSelectAll?.(!!checked)}
                aria-label="Select all leads"
              />
            </TableHead>
          )}
          <TableHead>Company</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Value</TableHead>
          <TableHead>Priority</TableHead>
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
            {onSelectLead && (
              <TableCell>
                <Checkbox
                  checked={selectedLeads.includes(lead.id)}
                  onCheckedChange={(checked) => onSelectLead(lead.id, !!checked)}
                  aria-label={`Select lead ${lead.name}`}
                />
              </TableCell>
            )}
            <TableCell>
              <div>
                <div className="font-medium text-gray-900">{lead.name}</div>
                <div className="text-sm text-gray-500">{lead.source}</div>
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
            {userRole === 'supervisor' && (
              <TableCell className="text-sm text-gray-900">{lead.assignedTo}</TableCell>
            )}
            <TableCell className="text-sm text-gray-600">{lead.lastContact}</TableCell>
            <TableCell>
              <LeadActionsMenu lead={lead} onEditLead={onEditLead} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LeadsTable;
