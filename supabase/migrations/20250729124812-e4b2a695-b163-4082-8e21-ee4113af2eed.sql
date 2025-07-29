-- Create metrics table for InsightDash
CREATE TABLE public.metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  metric_name TEXT NOT NULL,
  value NUMERIC NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  status TEXT NOT NULL CHECK (status IN ('active', 'warning', 'critical')),
  user_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.metrics ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own metrics" 
ON public.metrics 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own metrics" 
ON public.metrics 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own metrics" 
ON public.metrics 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own metrics" 
ON public.metrics 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_metrics_updated_at
BEFORE UPDATE ON public.metrics
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data (will be associated with the first user who logs in)
INSERT INTO public.metrics (metric_name, value, date, status, user_id) VALUES
('Revenue Growth', 15.7, '2024-01-15', 'active', '00000000-0000-0000-0000-000000000000'),
('Customer Satisfaction', 4.2, '2024-01-14', 'warning', '00000000-0000-0000-0000-000000000000'),
('Server Uptime', 99.9, '2024-01-13', 'active', '00000000-0000-0000-0000-000000000000'),
('Conversion Rate', 2.1, '2024-01-12', 'critical', '00000000-0000-0000-0000-000000000000'),
('Daily Active Users', 1250, '2024-01-11', 'active', '00000000-0000-0000-0000-000000000000');