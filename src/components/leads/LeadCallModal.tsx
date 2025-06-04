
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

interface LeadCallModalProps {
  lead: Lead;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const LeadCallModal = ({ lead, isOpen, onOpenChange }: LeadCallModalProps) => {
  const { toast } = useToast();

  const makeCall = () => {
    toast({
      title: "Call Initiated",
      description: `Calling ${lead.contact} at ${lead.phone}`,
    });
    window.open(`tel:${lead.phone}`);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-green-700">📞 Make a Call</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone size={32} className="text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{lead.contact}</h3>
            <p className="text-gray-600">{lead.name}</p>
            <p className="text-xl font-mono text-green-700 mt-2">{lead.phone}</p>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-medium text-yellow-800 mb-2">Call Notes:</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Lead Status: {lead.status}</li>
              <li>• Priority: {lead.priority}</li>
              <li>• Last Contact: {lead.lastContact}</li>
              <li>• Estimated Value: {lead.value}</li>
            </ul>
          </div>

          <div className="flex space-x-3">
            <Button 
              onClick={makeCall}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3"
            >
              <Phone size={16} className="mr-2" />
              Start Call
            </Button>
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeadCallModal;
