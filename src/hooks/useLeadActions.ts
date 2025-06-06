
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

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

export const useLeadActions = (
  leads: Lead[], 
  setLeads: React.Dispatch<React.SetStateAction<Lead[]>>, 
  setSelectedLead?: React.Dispatch<React.SetStateAction<any>>, 
  setIsCallModalOpen?: React.Dispatch<React.SetStateAction<boolean>>, 
  setIsViewModalOpen?: React.Dispatch<React.SetStateAction<boolean>>, 
  setIsEditModalOpen?: React.Dispatch<React.SetStateAction<boolean>>, 
  setIsNotesModalOpen?: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { toast } = useToast();
  const { user } = useAuth();

  const handleEmail = (lead: Lead) => {
    console.log('Emailing lead:', lead.email);
    toast({
      title: "Composing Email",
      description: `Opening email composer for ${lead.email}`,
    });
    window.open(`mailto:${lead.email}?subject=Follow-up for ${lead.name}`);
  };

  const canEdit = (lead: Lead) => {
    return user?.role === 'supervisor' || lead.assignedToId === user?.id;
  };

  const handleEditAttempt = (lead: Lead) => {
    if (!canEdit(lead)) {
      toast({
        title: "Access Denied",
        description: "You can only edit leads assigned to you.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  // Add lead management functions
  const handleAddLead = (leadData: any) => {
    const newLead = {
      id: `LEAD${leads.length + 1}`.padStart(7, '0'),
      name: leadData.companyName,
      contact: leadData.contactName,
      phone: leadData.phone,
      email: leadData.email,
      status: 'new',
      source: leadData.source,
      value: leadData.value,
      assignedTo: user?.name || 'Unassigned',
      assignedToId: user?.id || 'none',
      lastContact: 'Just now',
      priority: leadData.priority
    };
    
    setLeads((prev: Lead[]) => [newLead, ...prev]);
    toast({
      title: "Lead Added",
      description: `${leadData.companyName} has been added as a new lead`
    });
  };

  const handleUpdateLead = (updatedLead: Lead) => {
    setLeads((prev: Lead[]) => 
      prev.map(lead => lead.id === updatedLead.id ? updatedLead : lead)
    );
    toast({
      title: "Lead Updated",
      description: `${updatedLead.name} has been updated`
    });
  };

  const handleCallClick = (lead: Lead) => {
    if (setSelectedLead && setIsCallModalOpen) {
      setSelectedLead(lead);
      setIsCallModalOpen(true);
    }
  };

  const handleViewLead = (lead: Lead) => {
    if (setSelectedLead && setIsViewModalOpen) {
      setSelectedLead(lead);
      setIsViewModalOpen(true);
    }
  };

  const handleEditLead = (lead: Lead) => {
    if (handleEditAttempt(lead) && setSelectedLead && setIsEditModalOpen) {
      setSelectedLead(lead);
      setIsEditModalOpen(true);
    }
  };

  const handleNotesClick = (lead: Lead) => {
    if (setSelectedLead && setIsNotesModalOpen) {
      setSelectedLead(lead);
      setIsNotesModalOpen(true);
    }
  };

  return {
    handleEmail,
    canEdit,
    handleEditAttempt,
    handleAddLead,
    handleUpdateLead,
    handleCallClick,
    handleViewLead,
    handleEditLead,
    handleNotesClick,
  };
};
