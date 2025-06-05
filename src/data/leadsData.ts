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
  // First 50 leads with various statuses
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
  // Generate 200+ more leads
  ...Array.from({ length: 250 }, (_, i) => ({
    id: `${i + 3}`,
    name: `Business ${i + 3}`,
    contact: `Contact ${i + 3}`,
    phone: `+91 ${String(9876543000 + i).slice(0, 5)} ${String(9876543000 + i).slice(5)}`,
    email: `contact${i + 3}@business.com`,
    value: `₹${Math.floor(Math.random() * 50) + 5}L`,
    status: ['new', 'qualified', 'proposal', 'negotiation', 'converted'][Math.floor(Math.random() * 5)] as Lead['status'],
    priority: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as Lead['priority'],
    source: ['Website', 'Referral', 'Cold Call', 'Social Media'][Math.floor(Math.random() * 4)] as Lead['source'],
    assignedTo: ['Rahul Sharma', 'Anjali Patel', 'Priya Manager'][Math.floor(Math.random() * 3)],
    assignedToId: ['1', '3', '2'][Math.floor(Math.random() * 3)],
    lastContact: ['1 hour ago', '2 hours ago', '1 day ago', '2 days ago'][Math.floor(Math.random() * 4)],
    nextFollowUp: '2024-06-08',
    notes: `Generated lead ${i + 3} notes`
  }))
];
