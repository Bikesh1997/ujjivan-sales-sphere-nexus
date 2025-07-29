-- Create sample data for testing
-- Note: You'll need to create actual users through the auth signup first

-- Insert sample leads data
INSERT INTO public.leads (
  lead_code, customer_name, phone, email, address, 
  product_interest, lead_source, estimated_value, 
  status, priority, notes
) VALUES
  ('LEAD001', 'Rajesh Kumar', '+91-9876543210', 'rajesh.kumar@email.com', 'Mumbai, Maharashtra', 'Personal Loan', 'Online Campaign', 150000, 'new', 'high', 'Interested in personal loan for home renovation'),
  ('LEAD002', 'Priya Sharma', '+91-9876543211', 'priya.sharma@email.com', 'Delhi, NCR', 'Business Loan', 'Referral', 500000, 'contacted', 'medium', 'Small business owner looking for expansion capital'),
  ('LEAD003', 'Amit Patel', '+91-9876543212', 'amit.patel@email.com', 'Bangalore, Karnataka', 'Home Loan', 'Walk-in', 2500000, 'qualified', 'high', 'First-time home buyer with good credit score'),
  ('LEAD004', 'Sunita Singh', '+91-9876543213', 'sunita.singh@email.com', 'Pune, Maharashtra', 'Fixed Deposit', 'Phone Campaign', 100000, 'new', 'low', 'Looking for safe investment options'),
  ('LEAD005', 'Vikram Gupta', '+91-9876543214', 'vikram.gupta@email.com', 'Chennai, Tamil Nadu', 'Vehicle Loan', 'Social Media', 800000, 'proposal', 'medium', 'Interested in financing new car purchase');

-- Insert sample customers data
INSERT INTO public.customers (
  customer_code, full_name, phone, email, address,
  date_of_birth, occupation, annual_income
) VALUES
  ('CUST001', 'Deepak Mehta', '+91-9876543220', 'deepak.mehta@email.com', 'Andheri, Mumbai, Maharashtra', '1985-03-15', 'Software Engineer', 1200000),
  ('CUST002', 'Kavitha Nair', '+91-9876543221', 'kavitha.nair@email.com', 'Koramangala, Bangalore, Karnataka', '1982-07-22', 'Marketing Manager', 950000),
  ('CUST003', 'Rohit Agarwal', '+91-9876543222', 'rohit.agarwal@email.com', 'Sector 62, Noida, UP', '1988-11-08', 'Business Owner', 1800000),
  ('CUST004', 'Meera Iyer', '+91-9876543223', 'meera.iyer@email.com', 'T. Nagar, Chennai, Tamil Nadu', '1990-05-18', 'Doctor', 1500000),
  ('CUST005', 'Arjun Reddy', '+91-9876543224', 'arjun.reddy@email.com', 'Banjara Hills, Hyderabad, Telangana', '1987-09-12', 'Consultant', 1100000);

-- Insert sample teams
INSERT INTO public.teams (name, description, territory_codes) VALUES
  ('Mumbai Central Team', 'Sales team covering Mumbai Central region', ARRAY['MUM-CENT', 'MUM-WEST', 'MUM-EAST']),
  ('Delhi NCR Team', 'Sales team covering Delhi NCR region', ARRAY['DEL-CENT', 'DEL-SOUTH', 'GURGAON']),
  ('Bangalore Team', 'Sales team covering Bangalore region', ARRAY['BLR-CENT', 'BLR-NORTH', 'BLR-SOUTH']),
  ('Chennai Team', 'Sales team covering Chennai region', ARRAY['CHE-CENT', 'CHE-NORTH', 'CHE-SOUTH']);

-- Function to create sample call logs after users are created
-- This will need to be run after actual users are created through signup