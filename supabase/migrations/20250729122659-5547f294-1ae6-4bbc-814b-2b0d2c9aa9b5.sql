-- Create custom types for enums (skip app_role as it exists)
CREATE TYPE IF NOT EXISTS public.lead_status AS ENUM ('new', 'contacted', 'qualified', 'proposal', 'negotiation', 'closed_won', 'closed_lost');
CREATE TYPE IF NOT EXISTS public.priority_level AS ENUM ('low', 'medium', 'high', 'urgent');
CREATE TYPE IF NOT EXISTS public.task_status AS ENUM ('pending', 'in_progress', 'completed', 'cancelled');

-- Skip creating tables that might already exist
DO $$
BEGIN
  -- Create teams table if it doesn't exist
  IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'teams') THEN
    CREATE TABLE public.teams (
      id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      supervisor_id UUID,
      territory_codes TEXT[],
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );
  END IF;

  -- Create team_members table if it doesn't exist
  IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'team_members') THEN
    CREATE TABLE public.team_members (
      id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
      team_id UUID,
      member_id UUID,
      joined_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
      is_active BOOLEAN DEFAULT true
    );
  END IF;

  -- Create customers table if it doesn't exist
  IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'customers') THEN
    CREATE TABLE public.customers (
      id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
      customer_code TEXT NOT NULL,
      full_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      address TEXT,
      date_of_birth DATE,
      occupation TEXT,
      annual_income NUMERIC,
      relationship_manager_id UUID,
      family_head_id UUID,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );
  END IF;

  -- Create leads table if it doesn't exist
  IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'leads') THEN
    CREATE TABLE public.leads (
      id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
      lead_code TEXT NOT NULL,
      customer_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      address TEXT,
      product_interest TEXT,
      lead_source TEXT,
      estimated_value NUMERIC,
      status lead_status DEFAULT 'new',
      priority priority_level DEFAULT 'medium',
      assigned_to UUID,
      assigned_by UUID,
      last_contact_date DATE,
      follow_up_date DATE,
      notes TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );
  END IF;

  -- Create tasks table if it doesn't exist
  IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'tasks') THEN
    CREATE TABLE public.tasks (
      id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      task_type TEXT,
      status task_status DEFAULT 'pending',
      priority priority_level DEFAULT 'medium',
      assigned_to UUID NOT NULL,
      assigned_by UUID,
      related_lead_id UUID,
      related_customer_id UUID,
      due_date TIMESTAMP WITH TIME ZONE,
      estimated_duration INTEGER, -- in minutes
      actual_duration INTEGER, -- in minutes
      xp_reward INTEGER DEFAULT 0,
      completed_at TIMESTAMP WITH TIME ZONE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );
  END IF;

  -- Create call_logs table if it doesn't exist
  IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'call_logs') THEN
    CREATE TABLE public.call_logs (
      id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
      caller_id UUID NOT NULL,
      lead_id UUID,
      customer_id UUID,
      call_type TEXT,
      call_duration INTEGER, -- in seconds
      call_outcome TEXT,
      notes TEXT,
      follow_up_required BOOLEAN DEFAULT false,
      next_follow_up_date TIMESTAMP WITH TIME ZONE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );
  END IF;

  -- Create gamification_badges table if it doesn't exist
  IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'gamification_badges') THEN
    CREATE TABLE public.gamification_badges (
      id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      icon_name TEXT,
      badge_color TEXT,
      xp_requirement INTEGER,
      criteria JSONB,
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );
  END IF;

  -- Create user_badges table if it doesn't exist
  IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'user_badges') THEN
    CREATE TABLE public.user_badges (
      id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
      user_id UUID,
      badge_id UUID,
      earned_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );
  END IF;
END
$$;

-- Enable Row Level Security on existing tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.call_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gamification_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;

-- Add triggers for updated_at columns
DO $$
BEGIN
  -- Create triggers only if they don't exist
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_teams_updated_at') THEN
    CREATE TRIGGER update_teams_updated_at
      BEFORE UPDATE ON public.teams
      FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_customers_updated_at') THEN
    CREATE TRIGGER update_customers_updated_at
      BEFORE UPDATE ON public.customers
      FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_leads_updated_at') THEN
    CREATE TRIGGER update_leads_updated_at
      BEFORE UPDATE ON public.leads
      FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_tasks_updated_at') THEN
    CREATE TRIGGER update_tasks_updated_at
      BEFORE UPDATE ON public.tasks
      FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
END
$$;

-- Insert initial gamification badges
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