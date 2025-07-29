import { supabase } from '@/integrations/supabase/client';

export interface Metric {
  id: string;
  metric_name: string;
  value: number;
  date: string;
  status: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export class MetricsService {
  static async getMetrics(): Promise<Metric[]> {
    const { data, error } = await supabase
      .from('metrics')
      .select('*')
      .order('date', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  static async createMetric(metric: Omit<Metric, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<Metric> {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('metrics')
      .insert([{ ...metric, user_id: user.id }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateMetric(id: string, updates: Partial<Metric>): Promise<Metric> {
    const { data, error } = await supabase
      .from('metrics')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async deleteMetric(id: string): Promise<void> {
    const { error } = await supabase
      .from('metrics')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  static async seedUserMetrics(): Promise<void> {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) throw new Error('User not authenticated');

    const sampleMetrics = [
      {
        metric_name: 'Revenue Growth',
        value: 15.7,
        date: '2024-01-15',
        status: 'active' as const
      },
      {
        metric_name: 'Customer Satisfaction',
        value: 4.2,
        date: '2024-01-14',
        status: 'warning' as const
      },
      {
        metric_name: 'Server Uptime',
        value: 99.9,
        date: '2024-01-13',
        status: 'active' as const
      },
      {
        metric_name: 'Conversion Rate',
        value: 2.1,
        date: '2024-01-12',
        status: 'critical' as const
      },
      {
        metric_name: 'Daily Active Users',
        value: 1250,
        date: '2024-01-11',
        status: 'active' as const
      }
    ];

    const { error } = await supabase
      .from('metrics')
      .insert(sampleMetrics.map(metric => ({ ...metric, user_id: user.id })));

    if (error) throw error;
  }
}