import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { DateRange } from "react-day-picker";
import { format } from 'date-fns';
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  TrendingUp, 
  IndianRupee, 
  Filter,
  Search,
  Plus,
  Eye,
  Edit,
  Download,
  ChevronsUpDown
} from 'lucide-react';
import LeadActionsMenu from '@/components/leads/LeadActionsMenu';
import PermissionGate from '@/components/rbac/PermissionGate';
import { useAuth } from '@/contexts/AuthContext';
import { allLeads } from '@/data/leadsData';

const LeadManagement = () => {
  const { user } = useAuth();
  const [leadsData, setLeadsData] = useState(allLeads);
  const [filters, setFilters] = useState({
    status: 'all',
    assignee: 'all',
    priority: 'all',
    dateRange: 'all',
    showAdvancedFilters: false
  });
  const [date, setDate] = useState<DateRange | undefined>(undefined);

  // Filter leads based on user role
  const userLeads = user?.role === 'supervisor' ? leadsData : leadsData.filter(lead => lead.assignedToId === user?.id);

  const filteredLeads = userLeads.filter(lead => {
    if (filters.status !== 'all' && lead.status !== filters.status) {
      return false;
    }
    if (filters.assignee !== 'all' && lead.assignedToId !== filters.assignee) {
      return false;
    }
    if (filters.priority !== 'all' && lead.priority !== filters.priority) {
      return false;
    }
    if (date?.from && date?.to) {
      const leadDate = new Date(lead.createdAt);
      if (leadDate < date.from || leadDate > date.to) {
        return false;
      }
    }
    return true;
  });

  const handleEditLead = (leadId: string, updatedData: Partial<typeof allLeads[0]>) => {
    setLeadsData(prevLeads => 
      prevLeads.map(lead => 
        lead.id === leadId 
          ? { ...lead, ...updatedData, lastContact: 'Just updated' }
          : lead
      )
    );
  };

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lead Management</h1>
          <p className="text-gray-600">Manage and track your leads effectively</p>
        </div>
        <PermissionGate permission="lead_create">
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Plus size={16} className="mr-2" />
            Add Lead
          </Button>
        </PermissionGate>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="qualified">Qualified</SelectItem>
              <SelectItem value="proposal">Proposal</SelectItem>
              <SelectItem value="negotiation">Negotiation</SelectItem>
              <SelectItem value="converted">Converted</SelectItem>
              <SelectItem value="lost">Lost</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.assignee} onValueChange={(value) => setFilters(prev => ({ ...prev, assignee: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select Assignee" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Assignees</SelectItem>
              {/* Assuming you have a way to get all assignees */}
              {allLeads.map(lead => (
                <SelectItem key={lead.assignedToId} value={lead.assignedToId}>{lead.assignedTo}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.priority} onValueChange={(value) => setFilters(prev => ({ ...prev, priority: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>

          {/* Date Range Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    `${format(date.from, "LLL dd, y")} - ${format(date.to, "LLL dd, y")}`
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center" side="bottom">
              <Calendar
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
                pagedNavigation
              />
            </PopoverContent>
          </Popover>
        </CardContent>
      </Card>

      {/* Lead Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Leads</CardTitle>
            <div className="flex space-x-2">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search leads..."
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Download size={16} className="mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Lead</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Priority</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Value</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Assignee</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Created At</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map(lead => (
                  <tr key={lead.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-gray-900">{lead.contact}</div>
                        <div className="text-sm text-gray-500">{lead.name}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(lead.status)}>
                        {lead.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getPriorityColor(lead.priority)}>
                        {lead.priority}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-900">₹{lead.value}</td>
                    <td className="py-3 px-4 text-gray-600">{lead.assignedTo}</td>
                    <td className="py-3 px-4 text-gray-600">{lead.createdAt}</td>
                    <td className="py-3 px-4">
                      <LeadActionsMenu lead={lead} onEditLead={handleEditLead} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadManagement;
