import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

export type Task = Database['public']['Tables']['tasks']['Row'];
export type CreateTaskData = Database['public']['Tables']['tasks']['Insert'];
export type UpdateTaskData = Database['public']['Tables']['tasks']['Update'] & { id: string };

export class TasksService {
  // Get all tasks for the current user
  static async getTasks(userId?: string) {
    try {
      let query = supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });

      // If userId provided, filter by assigned_to
      if (userId) {
        query = query.eq('assigned_to', userId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching tasks:', error);
        throw error;
      }

      return data as Task[];
    } catch (error) {
      console.error('Error in getTasks:', error);
      throw error;
    }
  }

  // Get a single task by ID
  static async getTask(id: string) {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching task:', error);
        throw error;
      }

      return data as Task;
    } catch (error) {
      console.error('Error in getTask:', error);
      throw error;
    }
  }

  // Create a new task
  static async createTask(taskData: CreateTaskData) {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert([taskData])
        .select()
        .single();

      if (error) {
        console.error('Error creating task:', error);
        throw error;
      }

      return data as Task;
    } catch (error) {
      console.error('Error in createTask:', error);
      throw error;
    }
  }

  // Update a task
  static async updateTask(updateData: UpdateTaskData) {
    try {
      const { id, ...data } = updateData;
      
      const { data: updatedData, error } = await supabase
        .from('tasks')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating task:', error);
        throw error;
      }

      return updatedData as Task;
    } catch (error) {
      console.error('Error in updateTask:', error);
      throw error;
    }
  }

  // Complete a task
  static async completeTask(id: string) {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .update({ 
          status: 'completed',
          completed_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error completing task:', error);
        throw error;
      }

      return data as Task;
    } catch (error) {
      console.error('Error in completeTask:', error);
      throw error;
    }
  }

  // Get tasks by status
  static async getTasksByStatus(status: Database['public']['Enums']['task_status'], userId?: string) {
    try {
      let query = supabase
        .from('tasks')
        .select('*')
        .eq('status', status)
        .order('created_at', { ascending: false });

      if (userId) {
        query = query.eq('assigned_to', userId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching tasks by status:', error);
        throw error;
      }

      return data as Task[];
    } catch (error) {
      console.error('Error in getTasksByStatus:', error);
      throw error;
    }
  }

  // Get pending tasks for today
  static async getTodaysTasks(userId: string) {
    try {
      const today = new Date();
      const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString();
      const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).toISOString();

      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('assigned_to', userId)
        .gte('due_date', startOfDay)
        .lt('due_date', endOfDay)
        .in('status', ['pending', 'in_progress'])
        .order('due_date', { ascending: true });

      if (error) {
        console.error('Error fetching today\'s tasks:', error);
        throw error;
      }

      return data as Task[];
    } catch (error) {
      console.error('Error in getTodaysTasks:', error);
      throw error;
    }
  }

  // Get overdue tasks
  static async getOverdueTasks(userId: string) {
    try {
      const now = new Date().toISOString();

      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('assigned_to', userId)
        .lt('due_date', now)
        .in('status', ['pending', 'in_progress'])
        .order('due_date', { ascending: true });

      if (error) {
        console.error('Error fetching overdue tasks:', error);
        throw error;
      }

      return data as Task[];
    } catch (error) {
      console.error('Error in getOverdueTasks:', error);
      throw error;
    }
  }
}