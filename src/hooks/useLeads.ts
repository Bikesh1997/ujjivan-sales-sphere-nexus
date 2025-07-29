import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { LeadsService, type Lead, type CreateLeadData, type UpdateLeadData } from '@/services/leadsService';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export const useLeads = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Query to get all leads for the current user
  const leadsQuery = useQuery({
    queryKey: ['leads', user?.id],
    queryFn: () => LeadsService.getLeads(user?.id),
    enabled: !!user?.id,
  });

  // Mutation to create a new lead
  const createLeadMutation = useMutation({
    mutationFn: (leadData: CreateLeadData) => LeadsService.createLead({
      ...leadData,
      assigned_to: user?.id,
      assigned_by: user?.id,
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast.success('Lead created successfully!');
    },
    onError: (error) => {
      console.error('Error creating lead:', error);
      toast.error('Failed to create lead. Please try again.');
    },
  });

  // Mutation to update a lead
  const updateLeadMutation = useMutation({
    mutationFn: (updateData: UpdateLeadData) => LeadsService.updateLead(updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast.success('Lead updated successfully!');
    },
    onError: (error) => {
      console.error('Error updating lead:', error);
      toast.error('Failed to update lead. Please try again.');
    },
  });

  // Mutation to delete a lead
  const deleteLeadMutation = useMutation({
    mutationFn: (leadId: string) => LeadsService.deleteLead(leadId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast.success('Lead deleted successfully!');
    },
    onError: (error) => {
      console.error('Error deleting lead:', error);
      toast.error('Failed to delete lead. Please try again.');
    },
  });

  return {
    leads: leadsQuery.data || [],
    isLoading: leadsQuery.isLoading,
    error: leadsQuery.error,
    createLead: createLeadMutation.mutate,
    updateLead: updateLeadMutation.mutate,
    deleteLead: deleteLeadMutation.mutate,
    isCreating: createLeadMutation.isPending,
    isUpdating: updateLeadMutation.isPending,
    isDeleting: deleteLeadMutation.isPending,
  };
};

// Hook for getting leads by status
export const useLeadsByStatus = (status: Lead['status']) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['leads', 'status', status, user?.id],
    queryFn: () => LeadsService.getLeadsByStatus(status!, user?.id),
    enabled: !!user?.id && !!status,
  });
};

// Hook for searching leads
export const useSearchLeads = (searchTerm: string) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['leads', 'search', searchTerm, user?.id],
    queryFn: () => LeadsService.searchLeads(searchTerm, user?.id),
    enabled: !!user?.id && searchTerm.length > 2,
  });
};