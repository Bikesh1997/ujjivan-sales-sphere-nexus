
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Prospect {
  id: string;
  name: string;
  company: string;
  stage: string;
  value: string;
  probability: number;
  lastContact: string;
  nextAction: string;
}

interface ProspectViewModalProps {
  prospect: Prospect | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProspectViewModal = ({ prospect, isOpen, onOpenChange }: ProspectViewModalProps) => {
  if (!prospect) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Prospect Details - {prospect.company}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Contact Name</label>
              <p className="text-sm text-gray-900">{prospect.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Company</label>
              <p className="text-sm text-gray-900">{prospect.company}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Stage</label>
              <p className="text-sm text-gray-900">{prospect.stage}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Value</label>
              <p className="text-sm text-gray-900">{prospect.value}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Probability</label>
              <p className="text-sm text-gray-900">{prospect.probability}%</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Last Contact</label>
              <p className="text-sm text-gray-900">{prospect.lastContact}</p>
            </div>
            <div className="col-span-2">
              <label className="text-sm font-medium text-gray-700">Next Action</label>
              <p className="text-sm text-gray-900">{prospect.nextAction}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProspectViewModal;
