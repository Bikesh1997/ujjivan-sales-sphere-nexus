

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import AddLeadModal from '@/components/leads/AddLeadModal';
import LeadViewModal from '@/components/leads/LeadViewModal';
import LeadActionsMenu from '@/components/leads/LeadActionsMenu';
import { useAuth } from '@/contexts/AuthContext';
import { allLeads } from '@/data/leadsData';
import PermissionGate from '@/components/rbac/PermissionGate';

const LeadManagement = () => {
  const { user } = useAuth();
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [viewingLead, setViewingLead] = useState<any>(null);
  const [leadViewOpen, setLeadViewOpen] = useState(false);

  // Filter leads based on user role
  const userLeads = user?.role === 'supervisor' ? allLeads : allLeads.filter(lead => lead.assignedToId === user?.id);

  const filteredLeads = selectedStatus === 'all' ? userLeads : userLeads.filter(lead => lead.status === selectedStatus);

  const handleViewLead = (lead: any) => {
    console.log('Viewing lead:', lead);
    setViewingLead(lead);
    setLeadViewOpen(true);
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
                      <LeadActionsMenu lead={lead} />
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
