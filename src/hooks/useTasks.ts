import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { TasksService, type Task, type CreateTaskData, type UpdateTaskData } from '@/services/tasksService';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export const useTasks = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Query to get all tasks for the current user
  const tasksQuery = useQuery({
    queryKey: ['tasks', user?.id],
    queryFn: () => TasksService.getTasks(user?.id),
    enabled: !!user?.id,
  });

  // Mutation to create a new task
  const createTaskMutation = useMutation({
    mutationFn: (taskData: CreateTaskData) => TasksService.createTask({
      ...taskData,
      assigned_to: taskData.assigned_to || user?.id!,
      assigned_by: user?.id,
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Task created successfully!');
    },
    onError: (error) => {
      console.error('Error creating task:', error);
      toast.error('Failed to create task. Please try again.');
    },
  });

  // Mutation to update a task
  const updateTaskMutation = useMutation({
    mutationFn: (updateData: UpdateTaskData) => TasksService.updateTask(updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Task updated successfully!');
    },
    onError: (error) => {
      console.error('Error updating task:', error);
      toast.error('Failed to update task. Please try again.');
    },
  });

  // Mutation to complete a task
  const completeTaskMutation = useMutation({
    mutationFn: (taskId: string) => TasksService.completeTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Task completed successfully!');
    },
    onError: (error) => {
      console.error('Error completing task:', error);
      toast.error('Failed to complete task. Please try again.');
    },
  });

  return {
    tasks: tasksQuery.data || [],
    isLoading: tasksQuery.isLoading,
    error: tasksQuery.error,
    createTask: createTaskMutation.mutate,
    updateTask: updateTaskMutation.mutate,
    completeTask: completeTaskMutation.mutate,
    isCreating: createTaskMutation.isPending,
    isUpdating: updateTaskMutation.isPending,
    isCompleting: completeTaskMutation.isPending,
  };
};

// Hook for getting today's tasks
export const useTodaysTasks = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['tasks', 'today', user?.id],
    queryFn: () => TasksService.getTodaysTasks(user?.id!),
    enabled: !!user?.id,
  });
};

// Hook for getting overdue tasks
export const useOverdueTasks = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['tasks', 'overdue', user?.id],
    queryFn: () => TasksService.getOverdueTasks(user?.id!),
    enabled: !!user?.id,
  });
};

// Hook for getting tasks by status
export const useTasksByStatus = (status: Task['status']) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['tasks', 'status', status, user?.id],
    queryFn: () => TasksService.getTasksByStatus(status!, user?.id),
    enabled: !!user?.id && !!status,
  });
};