
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface ProspectFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedStage: string;
  onStageChange: (stage: string) => void;
  onResetFilters: () => void;
}

const ProspectFilters = ({
  searchTerm,
  onSearchChange,
  selectedStage,
  onStageChange,
  onResetFilters
}: ProspectFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <div className="relative flex-1 min-w-64">
        <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search prospects by name or company..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <Select value={selectedStage} onValueChange={onStageChange}>
        <SelectTrigger className="w-full sm:w-48">
          <Filter size={16} className="mr-2" />
          <SelectValue placeholder="Filter by stage" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Stages</SelectItem>
          <SelectItem value="qualified">Qualified</SelectItem>
          <SelectItem value="proposal">Proposal</SelectItem>
          <SelectItem value="negotiation">Negotiation</SelectItem>
        </SelectContent>
      </Select>
      
      {(searchTerm || selectedStage !== 'all') && (
        <Button variant="outline" onClick={onResetFilters}>
          Clear Filters
        </Button>
      )}
    </div>
  );
};

export default ProspectFilters;
