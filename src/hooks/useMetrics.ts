import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { MetricsService, Metric } from '@/services/metricsService';
import { useToast } from '@/hooks/use-toast';

export const useMetrics = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: metrics,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['metrics'],
    queryFn: MetricsService.getMetrics,
  });

  const createMetricMutation = useMutation({
    mutationFn: MetricsService.createMetric,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['metrics'] });
      toast({
        title: "Success",
        description: "Metric created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create metric",
        variant: "destructive",
      });
    },
  });

  const updateMetricMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Metric> }) =>
      MetricsService.updateMetric(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['metrics'] });
      toast({
        title: "Success",
        description: "Metric updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update metric",
        variant: "destructive",
      });
    },
  });

  const deleteMetricMutation = useMutation({
    mutationFn: MetricsService.deleteMetric,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['metrics'] });
      toast({
        title: "Success",
        description: "Metric deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete metric",
        variant: "destructive",
      });
    },
  });

  const seedMetricsMutation = useMutation({
    mutationFn: MetricsService.seedUserMetrics,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['metrics'] });
      toast({
        title: "Success",
        description: "Sample metrics added successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add sample metrics",
        variant: "destructive",
      });
    },
  });

  return {
    metrics: metrics || [],
    isLoading,
    error,
    refetch,
    createMetric: createMetricMutation.mutate,
    updateMetric: updateMetricMutation.mutate,
    deleteMetric: deleteMetricMutation.mutate,
    seedMetrics: seedMetricsMutation.mutate,
    isCreating: createMetricMutation.isPending,
    isUpdating: updateMetricMutation.isPending,
    isDeleting: deleteMetricMutation.isPending,
    isSeeding: seedMetricsMutation.isPending,
  };
};