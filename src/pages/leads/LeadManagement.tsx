

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Eye,
  Edit,
  Phone,
  MoreVertical,
  Trash2
} from 'lucide-react';
import AddLeadModal from '@/components/leads/AddLeadModal';
import LeadViewModal from '@/components/leads/LeadViewModal';
import { useAuth } from '@/contexts/AuthContext';
import { allLeads } from '@/data/leadsData';
import PermissionGate from '@/components/rbac/PermissionGate';

const LeadManagement = () => {
  const { user } = useAuth();
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [viewingLead, setViewingLead] = useState<any>(null);
  const [editingLead, setEditingLead] = useState<any>(null);
  const [callingLead, setCallingLead] = useState<any>(null);
  const [leadViewOpen, setLeadViewOpen] = useState(false);

  // Filter leads based on user role
  const userLeads = user?.role === 'supervisor' ? allLeads : allLeads.filter(lead => lead.assignedToId === user?.id);

  const filteredLeads = selectedStatus === 'all' ? userLeads : userLeads.filter(lead => lead.status === selectedStatus);

  const handleEditLead = (lead: any) => {
    console.log('Edit lead functionality will be implemented:', lead);
    setEditingLead(lead);
  };

  const handleViewLead = (lead: any) => {
    console.log('Viewing lead:', lead);
    setViewingLead(lead);
    setLeadViewOpen(true);
  };

  const LeadActionsMenu = ({ lead, onEdit, onView, onCall, canEdit }: { lead: any, onEdit: () => void, onView: () => void, onCall: () => void, canEdit: boolean }) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={onView}>
            <Eye className="mr-2 h-4 w-4" />
            View
          </DropdownMenuItem>
          {canEdit && (
            <DropdownMenuItem onClick={onEdit}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={onCall}>
            <Phone className="mr-2 h-4 w-4" />
            Call
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <PermissionGate permission="lead_delete">
            <DropdownMenuItem className="text-red-600 focus:text-red-600">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" className="h-8 w-full p-0 justify-start text-red-600 focus:text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the lead from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuItem>
          </PermissionGate>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lead Management</h1>
          <p className="text-gray-600">Manage leads, track progress, and assign tasks</p>
        </div>
        <PermissionGate permission="lead_create">
          <AddLeadModal />
        </PermissionGate>
      </div>

      {/* Lead Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Lead List</CardTitle>
            <div className="flex space-x-2">
              <div className="relative">
                <Input
                  placeholder="Search leads..."
                  className="pl-10 w-64"
                />
              </div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="proposal">Proposal</SelectItem>
                  <SelectItem value="negotiation">Negotiation</SelectItem>
                  <SelectItem value="converted">Converted</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lead</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Avatar>
                          <AvatarImage src={`https://avatar.vercel.sh/${lead.contact}.png`} alt={lead.contact} />
                          <AvatarFallback>{lead.contact.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span>{lead.contact}</span>
                      </div>
                    </TableCell>
                    <TableCell>{lead.name}</TableCell>
                    <TableCell>{lead.status}</TableCell>
                    <TableCell>{lead.value}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Avatar>
                          <AvatarImage src={`https://avatar.vercel.sh/${lead.assignedTo}.png`} alt={lead.assignedTo} />
                          <AvatarFallback>{lead.assignedTo?.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span>{lead.assignedTo}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <LeadActionsMenu 
                        lead={lead}
                        onEdit={() => handleEditLead(lead)}
                        onView={() => handleViewLead(lead)}
                        onCall={() => setCallingLead(lead)}
                        canEdit={user?.role === 'supervisor' || lead.assignedToId === user?.id}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <LeadViewModal
        lead={viewingLead}
        isOpen={leadViewOpen}
        onOpenChange={setLeadViewOpen}
      />
    </div>
  );
};

export default LeadManagement;
