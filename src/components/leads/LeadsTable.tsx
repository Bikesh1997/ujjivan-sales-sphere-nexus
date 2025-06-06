
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Phone, Eye, Edit, MessageSquare } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export interface LeadsTableProps {
  leads: any[];
  onSelectLead: (leadId: string) => void;
  onSelectAll: () => void;
  onCallClick: (lead: any) => void;
  onViewClick: (lead: any) => void;
  onEditClick: (lead: any) => void;
  onNotesClick: (lead: any) => void;
  selectedLeads: string[];
}

const LeadsTable = ({
  leads,
  onSelectLead,
  onSelectAll,
  onCallClick,
  onViewClick,
  onEditClick,
  onNotesClick,
  selectedLeads
}: LeadsTableProps) => {
  const { user } = useAuth();
  const allSelected = leads.length > 0 && selectedLeads.length === leads.length;

  const canEdit = (lead: any) => {
    return user?.role === 'supervisor' || lead.assignedToId === user?.id;
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">
              <Checkbox 
                checked={allSelected} 
                onCheckedChange={onSelectAll}
                aria-label="Select all"
              />
            </TableHead>
            <TableHead>Lead</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead>Last Contact</TableHead>
            <TableHead className="w-24">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center">
                No leads found.
              </TableCell>
            </TableRow>
          ) : (
            leads.map((lead) => (
              <TableRow key={lead.id} className={selectedLeads.includes(lead.id) ? "bg-gray-50" : ""}>
                <TableCell>
                  <Checkbox 
                    checked={selectedLeads.includes(lead.id)} 
                    onCheckedChange={() => onSelectLead(lead.id)}
                    aria-label={`Select ${lead.name}`}
                  />
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{lead.name}</div>
                    <div className="text-sm text-gray-500">{lead.contact}</div>
                    <div className="text-xs text-gray-400">{lead.email}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className={`inline-flex px-2 py-1 rounded-full text-xs ${
                    lead.status.toLowerCase() === 'new' ? 'bg-blue-100 text-blue-800' :
                    lead.status.toLowerCase() === 'qualified' ? 'bg-yellow-100 text-yellow-800' :
                    lead.status.toLowerCase() === 'proposal' ? 'bg-purple-100 text-purple-800' :
                    lead.status.toLowerCase() === 'negotiation' ? 'bg-orange-100 text-orange-800' :
                    lead.status.toLowerCase() === 'converted' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {lead.status}
                  </div>
                </TableCell>
                <TableCell>{lead.value}</TableCell>
                <TableCell>{lead.source}</TableCell>
                <TableCell>{lead.assignedTo}</TableCell>
                <TableCell>{lead.lastContact}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onCallClick(lead)}
                      title="Call Lead"
                    >
                      <Phone size={16} />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onViewClick(lead)}
                      title="View Details"
                    >
                      <Eye size={16} />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onEditClick(lead)}
                      title="Edit Lead"
                      disabled={!canEdit(lead)}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onNotesClick(lead)}
                      title="Lead Notes"
                    >
                      <MessageSquare size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeadsTable;
