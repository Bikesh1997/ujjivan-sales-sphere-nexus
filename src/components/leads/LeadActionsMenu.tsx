
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LeadViewModal from './LeadViewModal';
import CallInProgressModal from './CallInProgressModal';

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
  const navigate = useNavigate();
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [callInProgressOpen, setCallInProgressOpen] = useState(false);

  // Random business names for the call modal
  const businessNames = ['TechCorp Solutions', 'Innovative Enterprises', 'Global Dynamics', 'Smart Systems', 'Digital Ventures', 'Future Industries'];
  const randomBusinessName = businessNames[Math.floor(Math.random() * businessNames.length)];

  const handleCall = () => {
    console.log('Calling lead:', lead.phone);
    setCallInProgressOpen(true);
  };

  return (
    <>
      <div className="flex space-x-1">
        <Button 
          size="sm" 
          variant="default" 
          onClick={handleCall}
          className="bg-green-600 hover:bg-green-700 text-white shadow-lg"
        >
          <Phone size={14} className="mr-1" />
          Call
        </Button>
      </div>

      <LeadViewModal 
        lead={lead}
        isOpen={viewModalOpen}
        onOpenChange={setViewModalOpen}
      />

      <CallInProgressModal 
        prospectName={lead.contact}
        businessName={randomBusinessName}
        phoneNumber={lead.phone}
        isOpen={callInProgressOpen}
        onOpenChange={setCallInProgressOpen}
      />
    </>
  );
};

export default LeadActionsMenu;
