
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, Mail, UserPlus, Download, X } from "lucide-react";

export interface BulkLeadActionsProps {
  selectedLeads: string[];
  onClearSelection: () => void;
  onBulkAction: (action: string) => void;
}

const BulkLeadActions = ({
  selectedLeads,
  onClearSelection,
  onBulkAction
}: BulkLeadActionsProps) => {
  return (
    <Card className="p-3 bg-gray-50 border-dashed">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">{selectedLeads.length} leads selected</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSelection}
          >
            <X size={14} className="mr-1" /> Clear selection
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onBulkAction('email')}
          >
            <Mail size={14} className="mr-1" /> Email
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onBulkAction('assign')}
          >
            <UserPlus size={14} className="mr-1" /> Assign
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onBulkAction('export')}
          >
            <Download size={14} className="mr-1" /> Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-red-600 hover:text-red-700"
            onClick={() => onBulkAction('delete')}
          >
            <Trash2 size={14} className="mr-1" /> Delete
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default BulkLeadActions;
