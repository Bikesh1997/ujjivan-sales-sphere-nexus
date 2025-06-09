
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { allLeads } from '@/data/leadsData';

export const useCustomerData = () => {
  const { user } = useAuth();
  const [enhancedLeads, setEnhancedLeads] = useState(allLeads);

  // Generate 50 additional random leads on component mount
  useEffect(() => {
    const generateRandomLeads = (count: number) => {
      const companies = ['TechStart Solutions', 'Global Dynamics', 'Innovation Labs', 'Future Corp', 'NextGen Systems', 'Smart Industries', 'Digital Ventures', 'Prime Solutions', 'Elite Enterprises', 'Metro Business', 'Sunrise Corp', 'Alpha Industries', 'Beta Systems', 'Gamma Tech', 'Delta Solutions'];
      const contacts = ['Rajesh Kumar', 'Priya Singh', 'Amit Sharma', 'Neha Patel', 'Vikash Gupta', 'Sunita Rao', 'Manoj Verma', 'Kavita Joshi', 'Rohit Agarwal', 'Deepika Mehta', 'Sanjay Yadav', 'Pooja Reddy', 'Kiran Nair', 'Divya Iyer', 'Arun Pillai'];
      const sources = ['Website Forms', 'WhatsApp Business', 'Call Center', 'Social Media', 'Referral', 'Email Campaign'];
      const priorities = ['High', 'Medium', 'Low'];
      const statuses = ['new', 'qualified', 'proposal'];

      return Array.from({ length: count }, (_, index) => ({
        id: `CR${String(Date.now() + index).slice(-6)}`,
        name: companies[Math.floor(Math.random() * companies.length)],
        contact: contacts[Math.floor(Math.random() * contacts.length)],
        phone: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
        email: `contact${index + 1}@company.com`,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        source: sources[Math.floor(Math.random() * sources.length)],
        value: `₹${Math.floor(Math.random() * 30) + 5}L`,
        assignedTo: user?.name || 'Current User',
        assignedToId: user?.id || 'current',
        lastContact: 'Just now',
        priority: priorities[Math.floor(Math.random() * priorities.length)]
      }));
    };

    const newLeads = generateRandomLeads(50);
    setEnhancedLeads(prevLeads => [...prevLeads, ...newLeads]);
  }, [user]);

  // Create customer data from leads
  const createCustomerFromLead = (lead: any) => {
    const customerKey = lead.contact.toLowerCase().replace(/\s+/g, '-');
    return {
      key: customerKey,
      name: lead.contact,
      id: lead.id,
      segment: lead.priority === 'High' ? 'Premium' : lead.priority === 'Medium' ? 'Gold' : 'Silver',
      relationshipValue: lead.priority === 'High' ? 'High' : 'Medium',
      totalRelationship: lead.value,
      phone: lead.phone,
      email: lead.email,
      address: 'Address not available',
      joinDate: '01 Jan 2024',
      lastContact: lead.lastContact,
      lastInteraction: lead.lastContact,
      riskScore: 'Low',
      products: [
        { type: 'Savings Account', balance: '₹1.5L', status: 'Active' },
      ],
      interactions: [
        { date: '25 May 2024', type: 'Call', purpose: 'Lead Follow-up', outcome: 'Interested' },
      ],
      family: [],
      opportunities: [
        { product: 'Personal Loan', priority: 'Medium', reason: 'New customer opportunity', potential: '₹5L' },
      ]
    };
  };

  // Enhanced customer data with additional family members for Neha's account + leads
  const staticCustomerData = {
    'priya-sharma': {
      name: 'Priya Sharma',
      id: 'CUST001234',
      segment: 'Premium',
      relationshipValue: 'High',
      totalRelationship: '₹15.2L',
      phone: '+91 98765 43210',
      email: 'priya.sharma@email.com',
      address: 'Bandra West, Mumbai 400050',
      joinDate: '15 Mar 2019',
      lastInteraction: '2 days ago',
      riskScore: 'Low',
      products: [
        { type: 'Savings Account', balance: '₹2.5L', status: 'Active' },
        { type: 'Fixed Deposit', amount: '₹8L', maturity: '15 Dec 2024' },
        { type: 'Home Loan', outstanding: '₹45L', emi: '₹42,000' },
        { type: 'Credit Card', limit: '₹3L', utilization: '35%' },
      ],
      interactions: [
        { date: '25 May 2024', type: 'Call', purpose: 'FD Renewal Discussion', outcome: 'Interested' },
        { date: '20 May 2024', type: 'Branch Visit', purpose: 'Loan Documentation', outcome: 'Completed' },
        { date: '15 May 2024', type: 'Email', purpose: 'Insurance Product Offer', outcome: 'No Response' },
        { date: '10 May 2024', type: 'SMS', purpose: 'Payment Reminder', outcome: 'Paid' },
      ],
      family: [
        { 
          name: 'Rajesh Sharma', 
          relation: 'Spouse', 
          age: 45,
          products: ['Savings Account', 'SIP'], 
          relationshipValue: '₹8.5L',
          isCustomer: true,
          phone: '+91 98765 43211',
          email: 'rajesh.sharma@email.com',
          opportunities: ['Life Insurance', 'Personal Loan']
        },
        { 
          name: 'Arjun Sharma', 
          relation: 'Son', 
          age: 16,
          products: ['Student Account'],
          relationshipValue: '₹25K',
          isCustomer: true,
          opportunities: ['Education Loan', 'Study Abroad Loan']
        },
        { 
          name: 'Meera Sharma', 
          relation: 'Mother-in-law', 
          age: 68,
          products: [],
          isCustomer: false,
          phone: '+91 98765 43214',
          opportunities: ['Senior Citizen FD', 'Health Insurance', 'Pension Plan']
        }
      ],
      opportunities: [
        { product: 'Personal Loan', priority: 'High', reason: 'Good credit history & salary increment', potential: '₹8L' },
        { product: 'Life Insurance', priority: 'Medium', reason: 'Family protection needs', potential: '₹50L cover' },
        { product: 'Mutual Funds', priority: 'Low', reason: 'Investment diversification', potential: '₹2L SIP' },
      ]
    },
    'rajesh-kumar': {
      name: 'Rajesh Kumar',
      id: 'CUST001235',
      segment: 'Gold',
      relationshipValue: 'Medium',
      totalRelationship: '₹8.5L',
      phone: '+91 98765 43211',
      email: 'rajesh.kumar@email.com',
      address: 'Koramangala, Bangalore 560034',
      joinDate: '22 Jul 2020',
      lastInteraction: '1 week ago',
      riskScore: 'Medium',
      products: [
        { type: 'Savings Account', balance: '₹1.2L', status: 'Active' },
        { type: 'Personal Loan', outstanding: '₹3.5L', emi: '₹15,000' },
        { type: 'Credit Card', limit: '₹2L', utilization: '45%' },
      ],
      interactions: [
        { date: '18 May 2024', type: 'Call', purpose: 'Loan EMI Discussion', outcome: 'Completed' },
        { date: '10 May 2024', type: 'Email', purpose: 'Investment Product Offer', outcome: 'Interested' },
      ],
      family: [
        { name: 'Sunita Kumar', relation: 'Spouse', products: ['Savings Account'] },
      ],
      opportunities: [
        { product: 'Fixed Deposit', priority: 'High', reason: 'Surplus liquidity', potential: '₹5L' },
        { product: 'Health Insurance', priority: 'Medium', reason: 'Family health coverage', potential: '₹10L cover' },
      ]
    },
    'anita-patel': {
      name: 'Anita Patel',
      id: 'CUST001236',
      segment: 'Silver',
      relationshipValue: 'Medium',
      totalRelationship: '₹4.8L',
      phone: '+91 98765 43212',
      email: 'anita.patel@email.com',
      address: 'Satellite, Ahmedabad 380015',
      joinDate: '05 Jan 2022',
      lastInteraction: '3 days ago',
      riskScore: 'Low',
      products: [
        { type: 'Savings Account', balance: '₹85K', status: 'Active' },
        { type: 'SIP', amount: '₹2K/month', status: 'Active' },
      ],
      interactions: [
        { date: '22 May 2024', type: 'Branch Visit', purpose: 'Account Opening', outcome: 'Completed' },
        { date: '15 May 2024', type: 'Call', purpose: 'Product Information', outcome: 'Interested' },
      ],
      family: [],
      opportunities: [
        { product: 'Credit Card', priority: 'High', reason: 'Good salary and credit score', potential: '₹1.5L limit' },
        { product: 'Term Insurance', priority: 'Medium', reason: 'Young professional protection', potential: '₹25L cover' },
      ]
    },
    'vikram-singh': {
      name: 'Vikram Singh',
      id: 'CUST001237',
      segment: 'Premium',
      relationshipValue: 'High',
      totalRelationship: '₹22.3L',
      phone: '+91 98765 43213',
      email: 'vikram.singh@email.com',
      address: 'Vasant Kunj, New Delhi 110070',
      joinDate: '10 Nov 2018',
      lastInteraction: '5 days ago',
      riskScore: 'Low',
      products: [
        { type: 'Savings Account', balance: '₹5.2L', status: 'Active' },
        { type: 'Fixed Deposit', amount: '₹12L', maturity: '20 Jan 2025' },
        { type: 'Home Loan', outstanding: '₹65L', emi: '₹58,000' },
        { type: 'Credit Card', limit: '₹5L', utilization: '25%' },
        { type: 'SIP', amount: '₹10K/month', status: 'Active' },
      ],
      interactions: [
        { date: '20 May 2024', type: 'Call', purpose: 'Investment Review', outcome: 'Scheduled Meeting' },
        { date: '12 May 2024', type: 'Email', purpose: 'Premium Banking Offer', outcome: 'Interested' },
      ],
      family: [
        { name: 'Meera Singh', relation: 'Spouse', products: ['Savings Account', 'SIP', 'Term Insurance'] },
        { name: 'Kavya Singh', relation: 'Daughter', products: ['Minor Savings Account'] },
      ],
      opportunities: [
        { product: 'Business Loan', priority: 'High', reason: 'Expanding business operations', potential: '₹15L' },
        { product: 'Child Education Plan', priority: 'Medium', reason: 'Daughter\'s education planning', potential: '₹20L' },
      ]
    }
  };

  // Combine static customer data with leads data
  const customerData = { ...staticCustomerData };
  
  // Add customers from enhanced leads - ensure all leads are included
  enhancedLeads.forEach(lead => {
    const customerKey = lead.contact.toLowerCase().replace(/\s+/g, '-');
    if (!customerData[customerKey]) {
      customerData[customerKey] = createCustomerFromLead(lead);
    }
  });

  const customers = Object.entries(customerData).map(([key, data]) => ({
    key,
    ...data
  }));

  return {
    customers,
    customerData,
    enhancedLeads
  };
};
