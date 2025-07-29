import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

export type Lead = Database['public']['Tables']['leads']['Row'];
export type CreateLeadData = Database['public']['Tables']['leads']['Insert'];
export type UpdateLeadData = Database['public']['Tables']['leads']['Update'] & { id: string };

export class LeadsService {
  // Get all leads for the current user
  static async getLeads(userId?: string) {
    try {
      let query = supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      // If userId provided, filter by assigned_to
      if (userId) {
        query = query.eq('assigned_to', userId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching leads:', error);
        throw error;
      }

      return data as Lead[];
    } catch (error) {
      console.error('Error in getLeads:', error);
      throw error;
    }
  }

  // Get a single lead by ID
  static async getLead(id: string) {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching lead:', error);
        throw error;
      }

      return data as Lead;
    } catch (error) {
      console.error('Error in getLead:', error);
      throw error;
    }
  }

  // Create a new lead
  static async createLead(leadData: CreateLeadData) {
    try {
      const { data, error } = await supabase
        .from('leads')
        .insert([leadData])
        .select()
        .single();

      if (error) {
        console.error('Error creating lead:', error);
        throw error;
      }

      return data as Lead;
    } catch (error) {
      console.error('Error in createLead:', error);
      throw error;
    }
  }

  // Update a lead
  static async updateLead(updateData: UpdateLeadData) {
    try {
      const { id, ...data } = updateData;
      
      const { data: updatedData, error } = await supabase
        .from('leads')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating lead:', error);
        throw error;
      }

      return updatedData as Lead;
    } catch (error) {
      console.error('Error in updateLead:', error);
      throw error;
    }
  }

  // Delete a lead
  static async deleteLead(id: string) {
    try {
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting lead:', error);
        throw error;
      }

      return true;
    } catch (error) {
      console.error('Error in deleteLead:', error);
      throw error;
    }
  }

  // Get leads by status
  static async getLeadsByStatus(status: Database['public']['Enums']['lead_status'], userId?: string) {
    try {
      let query = supabase
        .from('leads')
        .select('*')
        .eq('status', status)
        .order('created_at', { ascending: false });

      if (userId) {
        query = query.eq('assigned_to', userId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching leads by status:', error);
        throw error;
      }

      return data as Lead[];
    } catch (error) {
      console.error('Error in getLeadsByStatus:', error);
      throw error;
    }
  }

  // Get leads by priority
  static async getLeadsByPriority(priority: Database['public']['Enums']['priority_level'], userId?: string) {
    try {
      let query = supabase
        .from('leads')
        .select('*')
        .eq('priority', priority)
        .order('created_at', { ascending: false });

      if (userId) {
        query = query.eq('assigned_to', userId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching leads by priority:', error);
        throw error;
      }

      return data as Lead[];
    } catch (error) {
      console.error('Error in getLeadsByPriority:', error);
      throw error;
    }
  }

  // Search leads
  static async searchLeads(searchTerm: string, userId?: string) {
    try {
      let query = supabase
        .from('leads')
        .select('*')
        .or(`customer_name.ilike.%${searchTerm}%,phone.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%,lead_code.ilike.%${searchTerm}%`)
        .order('created_at', { ascending: false });

      if (userId) {
        query = query.eq('assigned_to', userId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error searching leads:', error);
        throw error;
      }

      return data as Lead[];
    } catch (error) {
      console.error('Error in searchLeads:', error);
      throw error;
    }
  }
}