
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Phone, Clock, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CallCustomerModalProps {
  customer: {
    name: string;
    phone: string;
    lastInteraction: string;
    relationshipValue: string;
  };
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const CallCustomerModal = ({ customer, isOpen, onOpenChange }: CallCustomerModalProps) => {
  const [callPurpose, setCallPurpose] = useState('');
  const { toast } = useToast();

  const callPurposes = [
    'Follow-up on Recent Transaction',
    'Product Cross-sell Discussion',
    'Service Issue Resolution',
    'Relationship Review',
    'Payment Reminder',
    'Document Collection',
    'General Check-in'
  ];

  const makeCall = () => {
    if (!callPurpose) {
      toast({
        title: "Select Call Purpose",
        description: "Please select a purpose for this call.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Call Initiated",
      description: `Calling ${customer.name} for: ${callPurpose}`,
    });
    
    // Simulate making a call
    window.open(`tel:${customer.phone}`);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center text-green-700">
            <Phone size={20} className="mr-2" />
            Call Customer
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <User size={24} className="text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{customer.name}</h3>
            <p className="text-xl font-mono text-green-700 mt-1">{customer.phone}</p>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 mb-2 flex items-center">
              <Clock size={16} className="mr-2" />
              Customer Context
            </h4>
            <div className="text-sm text-blue-700 space-y-1">
              <p>• Relationship Value: {customer.relationshipValue}</p>
              <p>• Last Interaction: {customer.lastInteraction}</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Purpose of Call *
            </label>
            <select 
              value={callPurpose}
              onChange={(e) => setCallPurpose(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="">Select call purpose...</option>
              {callPurposes.map((purpose) => (
                <option key={purpose} value={purpose}>{purpose}</option>
              ))}
            </select>
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

export default CallCustomerModal;
