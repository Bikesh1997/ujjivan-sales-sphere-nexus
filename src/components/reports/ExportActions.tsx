import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Download, FileText, Table as TableIcon, Mail } from 'lucide-react';

interface ExportActionsProps {
  onExport: (format: 'pdf' | 'excel') => void;
  onScheduleEmail: () => void;
}

export const ExportActions = ({ onExport, onScheduleEmail }: ExportActionsProps) => {
  return (
    <div className="flex gap-2">
      <Button 
        onClick={onScheduleEmail}
        variant="outline" 
        className="gap-2 border-primary/20 hover:bg-primary/5 hover:text-primary"
      >
        <Mail className="w-4 h-4" />
        Schedule Email
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="gap-2 bg-primary hover:bg-primary/90">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => onExport('pdf')} className="gap-2">
            <FileText className="w-4 h-4" />
            Export as PDF
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onExport('excel')} className="gap-2">
            <TableIcon className="w-4 h-4" />
            Export as Excel
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
