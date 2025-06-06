
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, X } from 'lucide-react';

interface LeadFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filters: {
    status: string;
    source: string;
    priority: string;
    assignedTo: string;
    dateRange: string;
  };
  onFiltersChange: (filters: any) => void;
  onClearFilters?: () => void; // Make this optional
}

const LeadFilters = ({
  searchTerm,
  onSearchChange,
  filters,
  onFiltersChange,
  onClearFilters,
}: LeadFiltersProps) => {
  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search leads, contacts, emails..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 w-80"
          />
        </div>
        <Select value={filters.status} onValueChange={(value) => onFiltersChange({ ...filters, status: value })}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="qualified">Qualified</SelectItem>
            <SelectItem value="proposal">Proposal</SelectItem>
            <SelectItem value="converted">Converted</SelectItem>
            <SelectItem value="lost">Lost</SelectItem>
          </SelectContent>
        </Select>
        
        {/* Clear filters button if provided */}
        {onClearFilters && filters.status !== 'all' && (
          <Button variant="outline" size="icon" onClick={onClearFilters}>
            <X size={16} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default LeadFilters;
