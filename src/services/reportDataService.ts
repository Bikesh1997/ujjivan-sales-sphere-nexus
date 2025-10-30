import { Role } from '@/types/rbac';

// Mock data sources
export const mockCRMData = {
  leads: Array.from({ length: 150 }, (_, i) => ({
    id: `lead-${i}`,
    name: `Lead ${i}`,
    product: ['Personal Loan', 'Home Loan', 'Credit Card', 'Business Loan'][i % 4],
    stage: ['New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'][i % 7],
    source: ['Website', 'Referral', 'Campaign', 'Walk-in', 'Cold Call'][i % 5],
    value: Math.floor(Math.random() * 5000000) + 100000,
    assignedTo: `RM-${(i % 25) + 1}`,
    branch: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata'][i % 5],
    region: ['West', 'North', 'South', 'South', 'East'][i % 5],
    createdAt: new Date(2024, 0, Math.floor(i / 5) + 1),
    lastActivity: new Date(2024, 0, Math.floor(i / 3) + 10),
    daysInactive: Math.floor(Math.random() * 60),
  })),
  
  customers: Array.from({ length: 200 }, (_, i) => ({
    id: `cust-${i}`,
    name: `Customer ${i}`,
    type: i < 150 ? 'Existing' : 'New',
    products: Math.floor(Math.random() * 3) + 1,
    totalValue: Math.floor(Math.random() * 10000000) + 500000,
    branch: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata'][i % 5],
    rm: `RM-${(i % 25) + 1}`,
    familySize: Math.floor(Math.random() * 5) + 1,
    joinedDate: new Date(2023, Math.floor(i / 20), 1),
  })),

  sales: Array.from({ length: 300 }, (_, i) => ({
    id: `sale-${i}`,
    product: ['Personal Loan', 'Home Loan', 'Credit Card', 'Business Loan', 'Gold Loan'][i % 5],
    amount: Math.floor(Math.random() * 5000000) + 100000,
    rm: `RM-${(i % 25) + 1}`,
    branch: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata'][i % 5],
    region: ['West', 'North', 'South', 'South', 'East'][i % 5],
    date: new Date(2024, 0, Math.floor(i / 10) + 1),
    commission: Math.floor(Math.random() * 50000) + 5000,
    crossSell: Math.random() > 0.7,
  })),

  activities: Array.from({ length: 500 }, (_, i) => ({
    id: `activity-${i}`,
    type: ['Call', 'Meeting', 'Email', 'Visit', 'Follow-up'][i % 5],
    rm: `RM-${(i % 25) + 1}`,
    leadId: `lead-${i % 150}`,
    date: new Date(2024, 0, Math.floor(i / 20) + 1),
    outcome: ['Successful', 'No Answer', 'Callback', 'Not Interested'][i % 4],
    duration: Math.floor(Math.random() * 60) + 5,
  })),
};

export const mockUserHierarchy = {
  rms: Array.from({ length: 25 }, (_, i) => ({
    id: `RM-${i + 1}`,
    name: `RM ${i + 1}`,
    supervisor: `SUP-${Math.floor(i / 5) + 1}`,
    branch: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata'][Math.floor(i / 5)],
    region: ['West', 'North', 'South', 'South', 'East'][Math.floor(i / 5)],
    joiningDate: new Date(2023, Math.floor(i / 5), 1),
  })),
  
  supervisors: Array.from({ length: 5 }, (_, i) => ({
    id: `SUP-${i + 1}`,
    name: `Supervisor ${i + 1}`,
    zonal: `ZH-${Math.floor(i / 2) + 1}`,
    branch: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata'][i],
    region: ['West', 'North', 'South', 'South', 'East'][i],
    teamSize: 5,
  })),
  
  zonalHeads: Array.from({ length: 3 }, (_, i) => ({
    id: `ZH-${i + 1}`,
    name: `Zonal Head ${i + 1}`,
    zone: ['Zone A', 'Zone B', 'Zone C'][i],
    regions: i === 0 ? ['West', 'North'] : i === 1 ? ['South'] : ['East'],
  })),
};

export const mockPerformanceData = {
  kra: mockUserHierarchy.rms.map(rm => ({
    userId: rm.id,
    metric: 'Sales Target',
    target: 5000000,
    achieved: Math.floor(Math.random() * 6000000),
    score: Math.floor(Math.random() * 100) + 60,
    points: Math.floor(Math.random() * 500),
  })),
  
  kpi: mockUserHierarchy.rms.map(rm => ({
    userId: rm.id,
    conversions: Math.floor(Math.random() * 30) + 10,
    calls: Math.floor(Math.random() * 200) + 100,
    meetings: Math.floor(Math.random() * 50) + 20,
    customerSatisfaction: Math.floor(Math.random() * 30) + 70,
  })),
};

export const mockCampaigns = Array.from({ length: 10 }, (_, i) => ({
  id: `campaign-${i}`,
  name: `Campaign ${i + 1}`,
  type: ['Email', 'SMS', 'WhatsApp', 'Social Media'][i % 4],
  startDate: new Date(2024, 0, i * 3 + 1),
  endDate: new Date(2024, 0, i * 3 + 15),
  reach: Math.floor(Math.random() * 10000) + 5000,
  responses: Math.floor(Math.random() * 2000) + 500,
  conversions: Math.floor(Math.random() * 200) + 50,
  cost: Math.floor(Math.random() * 500000) + 100000,
  roi: Math.random() * 3 + 1,
}));

export const mockSystemUsage = mockUserHierarchy.rms.map(rm => ({
  userId: rm.id,
  lastLogin: new Date(2024, 0, Math.floor(Math.random() * 30) + 1),
  loginCount: Math.floor(Math.random() * 50) + 20,
  syncFrequency: Math.floor(Math.random() * 10) + 5,
  offlineTime: Math.floor(Math.random() * 40),
  featuresUsed: Math.floor(Math.random() * 15) + 5,
  active: Math.random() > 0.2,
}));

// AI Insights Generator
export const generateAIInsights = (filters: any, userRole: Role | null) => {
  const insights = [];
  
  // Performance insight
  const perfChange = Math.floor(Math.random() * 30) - 10;
  if (perfChange > 0) {
    insights.push({
      type: 'positive',
      title: 'Performance Improvement Detected',
      description: `${userRole && userRole.level >= 2 ? 'Team' : 'Your'} performance increased by ${perfChange}% this period. ${perfChange > 15 ? 'Outstanding progress!' : 'Keep up the good work!'}`,
      metric: 'Performance',
      change: perfChange,
    });
  } else if (perfChange < -5) {
    insights.push({
      type: 'negative',
      title: 'Performance Dip Alert',
      description: `Performance decreased by ${Math.abs(perfChange)}% compared to previous period. Review action items to improve.`,
      metric: 'Performance',
      change: perfChange,
    });
  }
  
  // Conversion insight
  const topProduct = ['Personal Loan', 'Home Loan', 'Credit Card'][Math.floor(Math.random() * 3)];
  insights.push({
    type: 'neutral',
    title: 'Product Performance Leader',
    description: `${topProduct} shows highest conversion rate at ${Math.floor(Math.random() * 20) + 25}%. Consider focusing resources here.`,
    metric: 'Product Mix',
    recommendation: `Increase ${topProduct} marketing efforts`,
  });
  
  // Lead aging insight
  const staleLeads = Math.floor(Math.random() * 15) + 5;
  if (staleLeads > 8) {
    insights.push({
      type: 'warning',
      title: 'Stale Leads Detected',
      description: `${staleLeads} leads haven't been contacted in over 15 days. Immediate follow-up recommended.`,
      metric: 'Lead Management',
      action: 'Review and contact stale leads',
    });
  }
  
  // Predictive insight
  if (userRole && userRole.level >= 2) {
    const targetAchievement = Math.floor(Math.random() * 30) + 85;
    insights.push({
      type: targetAchievement >= 100 ? 'positive' : 'neutral',
      title: 'Target Achievement Forecast',
      description: `Based on current trends, team is projected to achieve ${targetAchievement}% of monthly target.`,
      metric: 'Prediction',
      forecast: `${targetAchievement}%`,
    });
  }
  
  // Geographic insight
  const topBranch = ['Mumbai', 'Delhi', 'Bangalore'][Math.floor(Math.random() * 3)];
  insights.push({
    type: 'neutral',
    title: 'Geographic Performance',
    description: `${topBranch} branch leads with ${Math.floor(Math.random() * 20) + 30}% higher conversion than average.`,
    metric: 'Geography',
    recommendation: `Study ${topBranch} best practices`,
  });
  
  return insights.slice(0, 4);
};

// Anomaly Detection
export const detectAnomalies = (data: any[], metric: string) => {
  const values = data.map(d => d[metric] || 0);
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  const threshold = avg * 0.3;
  
  return data
    .map((item, index) => ({
      ...item,
      isAnomaly: Math.abs(item[metric] - avg) > threshold,
      deviation: ((item[metric] - avg) / avg * 100).toFixed(1),
    }))
    .filter(item => item.isAnomaly);
};

// Natural Language Query Parser (simplified)
export const parseNLQuery = (query: string) => {
  const lowerQuery = query.toLowerCase();
  
  // Extract time period
  let dateRange = 'month';
  if (lowerQuery.includes('today')) dateRange = 'today';
  if (lowerQuery.includes('week')) dateRange = 'week';
  if (lowerQuery.includes('quarter')) dateRange = 'quarter';
  if (lowerQuery.includes('year')) dateRange = 'year';
  
  // Extract location
  let branch = 'all';
  const cities = ['mumbai', 'delhi', 'bangalore', 'chennai', 'kolkata'];
  cities.forEach(city => {
    if (lowerQuery.includes(city)) {
      branch = city.charAt(0).toUpperCase() + city.slice(1);
    }
  });
  
  // Extract metric
  let metric = 'performance';
  if (lowerQuery.includes('conversion') || lowerQuery.includes('sales')) metric = 'sales';
  if (lowerQuery.includes('lead')) metric = 'leads';
  if (lowerQuery.includes('revenue')) metric = 'revenue';
  
  // Extract top N
  const topMatch = lowerQuery.match(/top (\d+)/);
  const limit = topMatch ? parseInt(topMatch[1]) : 10;
  
  return { dateRange, branch, metric, limit };
};
