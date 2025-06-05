
export interface Lead {
  id: string;
  name: string;
  contact: string;
  phone: string;
  email: string;
  value: string;
  status: 'new' | 'qualified' | 'proposal' | 'negotiation' | 'converted';
  priority: 'low' | 'medium' | 'high';
  source: 'Website' | 'Referral' | 'Cold Call' | 'Social Media';
  assignedTo: string;
  assignedToId: string;
  lastContact: string;
  nextFollowUp: string;
  notes: string;
}

// Function to format a number as currency
export const formatCurrency = (amount: number, currency: string = '₹') => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(amount);
};

export const allLeads: Lead[] = [
  // First leads with assigned users
  {
    id: '1',
    name: 'Tech Solutions Pvt Ltd',
    contact: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    email: 'rajesh@techsolutions.com',
    value: '₹25L',
    status: 'qualified',
    priority: 'high',
    source: 'Website',
    assignedTo: 'Rahul Sharma',
    assignedToId: '1',
    lastContact: '2 hours ago',
    nextFollowUp: '2024-06-07',
    notes: 'Interested in business loan for expansion'
  },
  {
    id: '2',
    name: 'Manufacturing Co',
    contact: 'Priya Singh',
    phone: '+91 98765 43211',
    email: 'priya@manufacturing.com',
    value: '₹45L',
    status: 'proposal',
    priority: 'high',
    source: 'Referral',
    assignedTo: 'Anjali Patel',
    assignedToId: '3',
    lastContact: '1 day ago',
    nextFollowUp: '2024-06-08',
    notes: 'Equipment financing requirement'
  },
  {
    id: '3',
    name: 'Inbound Lead Corp',
    contact: 'Ravi Verma',
    phone: '+91 98765 43212',
    email: 'ravi@inboundcorp.com',
    value: '₹35L',
    status: 'new',
    priority: 'medium',
    source: 'Cold Call',
    assignedTo: 'Vikram Singh',
    assignedToId: '4',
    lastContact: '3 hours ago',
    nextFollowUp: '2024-06-09',
    notes: 'Contacted via inbound center, interested in SME loan'
  },
  {
    id: '4',
    name: 'Premium Investment Ltd',
    contact: 'Sunita Agarwal',
    phone: '+91 98765 43213',
    email: 'sunita@premiuminvest.com',
    value: '₹55L',
    status: 'qualified',
    priority: 'high',
    source: 'Referral',
    assignedTo: 'Neha Gupta',
    assignedToId: '5',
    lastContact: '1 hour ago',
    nextFollowUp: '2024-06-06',
    notes: 'High-value client looking for portfolio management services'
  },
  // Generate 250+ more leads with varied assignments
  ...Array.from({ length: 250 }, (_, i) => ({
    id: `${i + 5}`,
    name: `Business ${i + 5}`,
    contact: `Contact ${i + 5}`,
    phone: `+91 ${String(9876543000 + i).slice(0, 5)} ${String(9876543000 + i).slice(5)}`,
    email: `contact${i + 5}@business.com`,
    value: `₹${Math.floor(Math.random() * 50) + 5}L`,
    status: ['new', 'qualified', 'proposal', 'negotiation', 'converted'][Math.floor(Math.random() * 5)] as Lead['status'],
    priority: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as Lead['priority'],
    source: ['Website', 'Referral', 'Cold Call', 'Social Media'][Math.floor(Math.random() * 4)] as Lead['source'],
    assignedTo: ['Rahul Sharma', 'Anjali Patel', 'Vikram Singh', 'Neha Gupta'][Math.floor(Math.random() * 4)],
    assignedToId: ['1', '3', '4', '5'][Math.floor(Math.random() * 4)],
    lastContact: ['1 hour ago', '2 hours ago', '1 day ago', '2 days ago'][Math.floor(Math.random() * 4)],
    nextFollowUp: '2024-06-08',
    notes: `Generated lead ${i + 5} notes`
  }))
];
