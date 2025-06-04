
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

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

interface LeadViewModalProps {
  lead: Lead;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const LeadViewModal = ({ lead, isOpen, onOpenChange }: LeadViewModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Lead Details - {lead.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Company</label>
              <p className="text-sm text-gray-900">{lead.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Contact</label>
              <p className="text-sm text-gray-900">{lead.contact}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Phone</label>
              <p className="text-sm text-gray-900">{lead.phone}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <p className="text-sm text-gray-900">{lead.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Status</label>
              <p className="text-sm text-gray-900 capitalize">{lead.status}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Source</label>
              <p className="text-sm text-gray-900">{lead.source}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Value</label>
              <p className="text-sm text-gray-900">{lead.value}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Priority</label>
              <p className="text-sm text-gray-900">{lead.priority}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeadViewModal;
