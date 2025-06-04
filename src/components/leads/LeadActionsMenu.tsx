
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Phone, Mail } from 'lucide-react';
import LeadEditModal from './LeadEditModal';
import LeadViewModal from './LeadViewModal';
import LeadCallModal from './LeadCallModal';
import { useLeadActions } from '@/hooks/useLeadActions';

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

interface LeadActionsMenuProps {
  lead: Lead;
}

const LeadActionsMenu = ({ lead }: LeadActionsMenuProps) => {
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [callModalOpen, setCallModalOpen] = useState(false);
  
  const { handleEmail, canEdit, handleEditAttempt } = useLeadActions(lead);

  const handleView = () => {
    console.log('Viewing lead:', lead);
    setViewModalOpen(true);
  };

  const handleEdit = () => {
    console.log('Editing lead:', lead);
    if (handleEditAttempt()) {
      setEditModalOpen(true);
    }
  };

  const handleCall = () => {
    console.log('Calling lead:', lead.phone);
    setCallModalOpen(true);
  };

  return (
    <>
      <div className="flex space-x-1">
        <Button size="sm" variant="ghost" onClick={handleView}>
          <Eye size={14} />
        </Button>
        <Button 
          size="sm" 
          variant="ghost" 
          onClick={handleEdit}
          disabled={!canEdit}
          className={!canEdit ? 'opacity-50 cursor-not-allowed' : ''}
        >
          <Edit size={14} />
        </Button>
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

      <LeadViewModal 
        lead={lead}
        isOpen={viewModalOpen}
        onOpenChange={setViewModalOpen}
      />

      <LeadEditModal 
        lead={lead}
        isOpen={editModalOpen}
        onOpenChange={setEditModalOpen}
      />

      <LeadCallModal 
        lead={lead}
        isOpen={callModalOpen}
        onOpenChange={setCallModalOpen}
      />
    </>
  );
};

export default LeadActionsMenu;
