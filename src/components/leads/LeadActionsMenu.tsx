
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Eye, Edit, Phone, Mail } from 'lucide-react';
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
  lastContact: string;
  priority: string;
}

interface LeadActionsMenuProps {
  lead: Lead;
}

const LeadActionsMenu = ({ lead }: LeadActionsMenuProps) => {
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [callModalOpen, setCallModalOpen] = useState(false);
  const { toast } = useToast();

  const handleView = () => {
    console.log('Viewing lead:', lead);
    setViewModalOpen(true);
  };

  const handleEdit = () => {
    console.log('Editing lead:', lead);
    setEditModalOpen(true);
    toast({
      title: "Edit Lead",
      description: `Opening edit form for ${lead.name}`,
    });
  };

  const handleCall = () => {
    console.log('Calling lead:', lead.phone);
    setCallModalOpen(true);
  };

  const handleEmail = () => {
    console.log('Emailing lead:', lead.email);
    toast({
      title: "Composing Email",
      description: `Opening email composer for ${lead.email}`,
    });
    // In a real app, this would open email client or internal email system
    window.open(`mailto:${lead.email}?subject=Follow-up for ${lead.name}`);
  };

  const makeCall = () => {
    toast({
      title: "Call Initiated",
      description: `Calling ${lead.contact} at ${lead.phone}`,
    });
    // In a real app, this would integrate with a calling system
    window.open(`tel:${lead.phone}`);
    setCallModalOpen(false);
  };

  return (
    <>
      <div className="flex space-x-1">
        <Button size="sm" variant="ghost" onClick={handleView}>
          <Eye size={14} />
        </Button>
        <Button size="sm" variant="ghost" onClick={handleEdit}>
          <Edit size={14} />
        </Button>
        {/* Enhanced Call Button with highlighting */}
        <Button 
          size="sm" 
          variant="default" 
          onClick={handleCall}
          className="bg-green-600 hover:bg-green-700 text-white shadow-lg"
        >
          <Phone size={14} className="mr-1" />
          Call
        </Button>
        <Button size="sm" variant="ghost" onClick={handleEmail}>
          <Mail size={14} />
        </Button>
      </div>

      {/* View Lead Modal */}
      <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
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

      {/* Edit Lead Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Lead - {lead.name}</DialogTitle>
          </DialogHeader>
          <div className="text-center py-8">
            <p className="text-gray-600">Edit functionality would be implemented here with a form similar to the Add Lead modal.</p>
            <Button className="mt-4" onClick={() => setEditModalOpen(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Enhanced Call Modal */}
      <Dialog open={callModalOpen} onOpenChange={setCallModalOpen}>
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
                onClick={() => setCallModalOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LeadActionsMenu;
