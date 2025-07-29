-- Create custom types for enums
CREATE TYPE public.app_role AS ENUM ('admin', 'supervisor', 'sales_executive');
CREATE TYPE public.lead_status AS ENUM ('new', 'contacted', 'qualified', 'proposal', 'negotiation', 'closed_won', 'closed_lost');
CREATE TYPE public.priority_level AS ENUM ('low', 'medium', 'high', 'urgent');
CREATE TYPE public.task_status AS ENUM ('pending', 'in_progress', 'completed', 'cancelled');

-- Create profiles table for additional user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  phone TEXT,
  designation TEXT,
  employee_id TEXT,
  manager_id UUID,
  territory_id UUID,
  gamification_score INTEGER DEFAULT 0,
  total_xp INTEGER DEFAULT 0,
  level_number INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create user_roles table for role management
CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  role app_role NOT NULL,
  assigned_by UUID,
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  is_active BOOLEAN DEFAULT true,
  UNIQUE(user_id, role)
);

-- Create teams table
CREATE TABLE public.teams (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  supervisor_id UUID,
  territory_codes TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create team_members table
CREATE TABLE public.team_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id UUID,
  member_id UUID,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  is_active BOOLEAN DEFAULT true
);

-- Create customers table
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

-- Create leads table
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

-- Create tasks table
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

-- Create call_logs table
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

-- Create gamification_badges table
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

-- Create user_badges table for tracking earned badges
CREATE TABLE public.user_badges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  badge_id UUID,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security on all tables
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

-- Create security definer function to check user roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
      AND is_active = TRUE
  )
$$;

-- Create function for automatic profile creation on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$;

-- Create trigger for automatic profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at column
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Add triggers for updated_at columns
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_teams_updated_at
  BEFORE UPDATE ON public.teams
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_customers_updated_at
  BEFORE UPDATE ON public.customers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at
  BEFORE UPDATE ON public.tasks
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Supervisors and admins can view all profiles" 
ON public.profiles FOR SELECT 
USING (has_role(auth.uid(), 'supervisor') OR has_role(auth.uid(), 'admin'));

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles" 
ON public.user_roles FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles" 
ON public.user_roles FOR ALL 
USING (has_role(auth.uid(), 'admin'));

-- RLS Policies for leads
CREATE POLICY "Sales executives can view assigned leads" 
ON public.leads FOR SELECT 
USING (auth.uid() = assigned_to OR has_role(auth.uid(), 'supervisor') OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Sales executives can update assigned leads" 
ON public.leads FOR UPDATE 
USING (auth.uid() = assigned_to OR has_role(auth.uid(), 'supervisor') OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Sales executives can create leads" 
ON public.leads FOR INSERT 
WITH CHECK (auth.uid() = assigned_to);

-- RLS Policies for tasks
CREATE POLICY "Users can view assigned tasks" 
ON public.tasks FOR SELECT 
USING (auth.uid() = assigned_to OR auth.uid() = assigned_by OR has_role(auth.uid(), 'supervisor') OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can update assigned tasks" 
ON public.tasks FOR UPDATE 
USING (auth.uid() = assigned_to OR auth.uid() = assigned_by OR has_role(auth.uid(), 'supervisor') OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can create tasks" 
ON public.tasks FOR INSERT 
WITH CHECK (auth.uid() = assigned_by OR has_role(auth.uid(), 'supervisor') OR has_role(auth.uid(), 'admin'));

-- Insert initial gamification badges
INSERT INTO public.gamification_badges (name, description, icon_name, badge_color, xp_requirement) VALUES
('Lead Hunter', 'Generated 10 qualified leads', 'Target', '#FFD700', 100),
('Call Master', 'Made 50 successful calls', 'Phone', '#32CD32', 200),
('Deal Closer', 'Closed 5 deals in a month', 'Trophy', '#FF6347', 500),
('Team Player', 'Helped 3 team members achieve their goals', 'Users', '#4169E1', 300),
('Consistency King', 'Achieved daily targets for 30 days', 'Calendar', '#FF69B4', 1000);

-- Create indexes for better performance
CREATE INDEX idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX idx_leads_assigned_to ON public.leads(assigned_to);
CREATE INDEX idx_leads_status ON public.leads(status);
CREATE INDEX idx_tasks_assigned_to ON public.tasks(assigned_to);
CREATE INDEX idx_tasks_status ON public.tasks(status);
CREATE INDEX idx_call_logs_caller_id ON public.call_logs(caller_id);
CREATE INDEX idx_user_badges_user_id ON public.user_badges(user_id);