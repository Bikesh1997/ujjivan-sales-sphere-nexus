
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

export const useLeadActions = (lead: Lead) => {
  const { toast } = useToast();
  const { user } = useAuth();

  const handleEmail = () => {
    console.log('Emailing lead:', lead.email);
    toast({
      title: "Composing Email",
      description: `Opening email composer for ${lead.email}`,
    });
    window.open(`mailto:${lead.email}?subject=Follow-up for ${lead.name}`);
  };

  const canEdit = user?.role === 'supervisor' || lead.assignedToId === user?.id;

  const handleEditAttempt = () => {
    if (!canEdit) {
      toast({
        title: "Access Denied",
        description: "You can only edit leads assigned to you.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  return {
    handleEmail,
    canEdit,
    handleEditAttempt,
  };
};
