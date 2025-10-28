import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar, Filter } from 'lucide-react';
import { Role } from '@/types/rbac';

interface ReportFiltersProps {
  filters: {
    dateRange: string;
    department: string;
    category: string;
  };
  onFilterChange: (filters: any) => void;
  userRole: Role | null;
}

export const ReportFilters = ({ filters, onFilterChange, userRole }: ReportFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-4 p-4 bg-card border rounded-lg">
      <div className="flex items-center gap-2 flex-1 min-w-[200px]">
        <Calendar className="w-4 h-4 text-muted-foreground" />
        <Select 
          value={filters.dateRange} 
          onValueChange={(value) => onFilterChange({ dateRange: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="quarter">This Quarter</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
            <SelectItem value="custom">Custom Range</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {userRole && userRole.level >= 2 && (
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Select 
            value={filters.department} 
            onValueChange={(value) => onFilterChange({ department: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="support">Support</SelectItem>
              <SelectItem value="operations">Operations</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="flex items-center gap-2 flex-1 min-w-[200px]">
        <Select 
          value={filters.category} 
          onValueChange={(value) => onFilterChange({ category: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="leads">Leads</SelectItem>
            <SelectItem value="tasks">Tasks</SelectItem>
            <SelectItem value="performance">Performance</SelectItem>
            <SelectItem value="revenue">Revenue</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button variant="outline" onClick={() => onFilterChange({ dateRange: 'month', department: 'all', category: 'all' })}>
        Reset Filters
      </Button>
    </div>
  );
};
