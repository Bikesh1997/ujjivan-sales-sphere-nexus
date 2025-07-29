-- Create custom types for enums
DO $$
BEGIN
  -- Create lead_status enum if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'lead_status') THEN
    CREATE TYPE public.lead_status AS ENUM ('new', 'contacted', 'qualified', 'proposal', 'negotiation', 'closed_won', 'closed_lost');
  END IF;
  
  -- Create priority_level enum if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'priority_level') THEN
    CREATE TYPE public.priority_level AS ENUM ('low', 'medium', 'high', 'urgent');
  END IF;
  
  -- Create task_status enum if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'task_status') THEN
    CREATE TYPE public.task_status AS ENUM ('pending', 'in_progress', 'completed', 'cancelled');
  END IF;
END
$$;

-- Insert initial gamification badges if table exists
INSERT INTO public.gamification_badges (name, description, icon_name, badge_color, xp_requirement) VALUES
('Lead Hunter', 'Generated 10 qualified leads', 'Target', '#FFD700', 100),
('Call Master', 'Made 50 successful calls', 'Phone', '#32CD32', 200),
('Deal Closer', 'Closed 5 deals in a month', 'Trophy', '#FF6347', 500),
('Team Player', 'Helped 3 team members achieve their goals', 'Users', '#4169E1', 300),
('Consistency King', 'Achieved daily targets for 30 days', 'Calendar', '#FF69B4', 1000)
ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_leads_assigned_to ON public.leads(assigned_to);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_tasks_assigned_to ON public.tasks(assigned_to);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON public.tasks(status);
CREATE INDEX IF NOT EXISTS idx_call_logs_caller_id ON public.call_logs(caller_id);
CREATE INDEX IF NOT EXISTS idx_user_badges_user_id ON public.user_badges(user_id);