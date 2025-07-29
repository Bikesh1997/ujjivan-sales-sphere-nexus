import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

export type Customer = Database['public']['Tables']['customers']['Row'];
export type CreateCustomerData = Database['public']['Tables']['customers']['Insert'];
export type UpdateCustomerData = Database['public']['Tables']['customers']['Update'] & { id: string };

export class CustomersService {
  // Get all customers
  static async getCustomers() {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching customers:', error);
        throw error;
      }

      return data as Customer[];
    } catch (error) {
      console.error('Error in getCustomers:', error);
      throw error;
    }
  }

  // Get a single customer by ID
  static async getCustomer(id: string) {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching customer:', error);
        throw error;
      }

      return data as Customer;
    } catch (error) {
      console.error('Error in getCustomer:', error);
      throw error;
    }
  }

  // Create a new customer
  static async createCustomer(customerData: CreateCustomerData) {
    try {
      const { data, error } = await supabase
        .from('customers')
        .insert([customerData])
        .select()
        .single();

      if (error) {
        console.error('Error creating customer:', error);
        throw error;
      }

      return data as Customer;
    } catch (error) {
      console.error('Error in createCustomer:', error);
      throw error;
    }
  }

  // Update a customer
  static async updateCustomer(updateData: UpdateCustomerData) {
    try {
      const { id, ...data } = updateData;
      
      const { data: updatedData, error } = await supabase
        .from('customers')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating customer:', error);
        throw error;
      }

      return updatedData as Customer;
    } catch (error) {
      console.error('Error in updateCustomer:', error);
      throw error;
    }
  }

  // Search customers
  static async searchCustomers(searchTerm: string) {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .or(`full_name.ilike.%${searchTerm}%,phone.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%,customer_code.ilike.%${searchTerm}%`)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error searching customers:', error);
        throw error;
      }

      return data as Customer[];
    } catch (error) {
      console.error('Error in searchCustomers:', error);
      throw error;
    }
  }

  // Get customers by relationship manager
  static async getCustomersByRM(managerId: string) {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('relationship_manager_id', managerId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching customers by RM:', error);
        throw error;
      }

      return data as Customer[];
    } catch (error) {
      console.error('Error in getCustomersByRM:', error);
      throw error;
    }
  }
}