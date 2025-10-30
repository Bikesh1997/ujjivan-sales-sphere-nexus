import { Role } from '@/types/rbac';
import { mockCRMData, mockUserHierarchy, mockPerformanceData, mockCampaigns, mockSystemUsage } from '@/services/reportDataService';

export interface ReportFilters {
  dateRange: string;
  department: string;
  category: string;
  branch?: string;
  product?: string;
  rm?: string;
}

// Filter data based on date range
const filterByDateRange = (data: any[], dateField: string, dateRange: string) => {
  const now = new Date();
  const startDate = new Date();
  
  switch (dateRange) {
    case 'today':
      startDate.setHours(0, 0, 0, 0);
      break;
    case 'week':
      startDate.setDate(now.getDate() - 7);
      break;
    case 'month':
      startDate.setMonth(now.getMonth() - 1);
      break;
    case 'quarter':
      startDate.setMonth(now.getMonth() - 3);
      break;
    case 'year':
      startDate.setFullYear(now.getFullYear() - 1);
      break;
    default:
      startDate.setMonth(now.getMonth() - 1);
  }
  
  return data.filter(item => new Date(item[dateField]) >= startDate);
};

// Apply filters to data
const applyFilters = (data: any[], filters: ReportFilters) => {
  let filtered = data;
  
  if (filters.branch && filters.branch !== 'all') {
    filtered = filtered.filter(item => item.branch === filters.branch);
  }
  
  if (filters.product && filters.product !== 'all') {
    filtered = filtered.filter(item => item.product === filters.product);
  }
  
  if (filters.rm && filters.rm !== 'all') {
    filtered = filtered.filter(item => item.rm === filters.rm || item.assignedTo === filters.rm);
  }
  
  return filtered;
};

// Generate KPI data based on filters
export const generateKPIData = (filters: ReportFilters, userRole: Role | null) => {
  const filteredSales = applyFilters(filterByDateRange(mockCRMData.sales, 'date', filters.dateRange), filters);
  const filteredLeads = applyFilters(filterByDateRange(mockCRMData.leads, 'createdAt', filters.dateRange), filters);
  
  const totalRevenue = filteredSales.reduce((sum, sale) => sum + sale.amount, 0);
  const conversions = filteredSales.length;
  const totalLeads = filteredLeads.length;
  const conversionRate = totalLeads > 0 ? (conversions / totalLeads * 100) : 0;
  
  const prevMultiplier = 0.85;
  const prevRevenue = totalRevenue * prevMultiplier;
  const prevConversions = Math.floor(conversions * prevMultiplier);
  
  const revenueChange = totalRevenue > 0 ? ((totalRevenue - prevRevenue) / prevRevenue * 100) : 0;
  const conversionChange = conversions > 0 ? ((conversions - prevConversions) / prevConversions * 100) : 0;
  
  if (userRole && userRole.level >= 2) {
    const activeRMs = new Set(filteredSales.map(s => s.rm)).size;
    
    return [
      {
        title: 'Team Performance',
        value: `${conversionRate.toFixed(1)}%`,
        change: `${conversionChange > 0 ? '+' : ''}${conversionChange.toFixed(1)}%`,
        trend: conversionChange >= 0 ? 'up' as const : 'down' as const,
        description: 'Team conversion rate'
      },
      {
        title: 'Total Conversions',
        value: conversions.toString(),
        change: `${conversionChange > 0 ? '+' : ''}${Math.floor(conversions - prevConversions)}`,
        trend: conversionChange >= 0 ? 'up' as const : 'down' as const,
        description: 'Team conversions this period'
      },
      {
        title: 'Revenue Generated',
        value: `₹${(totalRevenue / 100000).toFixed(1)}L`,
        change: `${revenueChange > 0 ? '+' : ''}${revenueChange.toFixed(1)}%`,
        trend: revenueChange >= 0 ? 'up' as const : 'down' as const,
        description: 'Total team revenue'
      },
      {
        title: 'Active Team Members',
        value: activeRMs.toString(),
        change: `+${Math.floor(activeRMs * 0.1)}`,
        trend: 'up' as const,
        description: 'Currently active RMs'
      },
    ];
  } else {
    const myLeads = filteredLeads.length;
    const myConversions = filteredSales.length;
    const myRevenue = totalRevenue;
    
    return [
      {
        title: 'My Performance',
        value: `${conversionRate.toFixed(1)}%`,
        change: `${conversionChange > 0 ? '+' : ''}${conversionChange.toFixed(1)}%`,
        trend: conversionChange >= 0 ? 'up' as const : 'down' as const,
        description: 'Your conversion rate'
      },
      {
        title: 'My Conversions',
        value: myConversions.toString(),
        change: `${conversionChange > 0 ? '+' : ''}${Math.floor(myConversions - prevConversions)}`,
        trend: conversionChange >= 0 ? 'up' as const : 'down' as const,
        description: 'Conversions this period'
      },
      {
        title: 'My Revenue',
        value: `₹${(myRevenue / 100000).toFixed(1)}L`,
        change: `${revenueChange > 0 ? '+' : ''}${revenueChange.toFixed(0)}%`,
        trend: revenueChange >= 0 ? 'up' as const : 'down' as const,
        description: 'Your total revenue'
      },
      {
        title: 'Active Leads',
        value: myLeads.toString(),
        change: `${Math.random() > 0.5 ? '+' : '-'}${Math.floor(myLeads * 0.1)}`,
        trend: Math.random() > 0.5 ? 'up' as const : 'down' as const,
        description: 'Leads in pipeline'
      },
    ];
  }
};

// Generate chart data based on filters
export const generateChartData = (filters: ReportFilters, type: string = 'overview') => {
  const filteredSales = applyFilters(filterByDateRange(mockCRMData.sales, 'date', filters.dateRange), filters);
  const filteredLeads = applyFilters(filterByDateRange(mockCRMData.leads, 'createdAt', filters.dateRange), filters);
  
  const timeLabels = getTimeLabels(filters.dateRange);
  
  // Group data by time periods
  const performanceData = timeLabels.map((label, index) => {
    const periodSales = filteredSales.filter((_, i) => i % timeLabels.length === index);
    const periodLeads = filteredLeads.filter((_, i) => i % timeLabels.length === index);
    
    return {
      month: label,
      conversions: periodSales.length,
      leads: periodLeads.length,
      revenue: periodSales.reduce((sum, s) => sum + s.amount, 0)
    };
  });

  // Category distribution
  const categoryData = type === 'leads' 
    ? Object.entries(
        filteredLeads.reduce((acc, lead) => {
          acc[lead.stage] = (acc[lead.stage] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)
      ).map(([name, value]) => ({ name, value }))
    : type === 'sales'
    ? Object.entries(
        filteredSales.reduce((acc, sale) => {
          acc[sale.product] = (acc[sale.product] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)
      ).map(([name, value]) => ({ name, value }))
    : [
        { name: 'Leads', value: filteredLeads.length },
        { name: 'Conversions', value: filteredSales.length },
        { name: 'Follow-ups', value: filteredLeads.filter(l => l.daysInactive < 7).length },
        { name: 'Stale', value: filteredLeads.filter(l => l.daysInactive > 15).length },
      ];

  // Team performance
  const teamPerformanceMap = filteredSales.reduce((acc, sale) => {
    if (!acc[sale.rm]) {
      acc[sale.rm] = { conversions: 0, revenue: 0 };
    }
    acc[sale.rm].conversions++;
    acc[sale.rm].revenue += sale.amount;
    return acc;
  }, {} as Record<string, { conversions: number; revenue: number }>);
  
  const teamPerformance = (Object.entries(teamPerformanceMap) as [string, { conversions: number; revenue: number }][])
    .map(([name, data]) => ({
      name,
      performance: Math.floor((data.conversions / filteredSales.length) * 100),
      conversions: data.conversions,
      revenue: data.revenue
    }))
    .sort((a, b) => b.conversions - a.conversions)
    .slice(0, 10);

  return { performanceData, categoryData, teamData: teamPerformance };
};

// Generate table data based on filters
export const generateTableData = (filters: ReportFilters, userRole: Role | null, type: string) => {
  const filteredSales = applyFilters(filterByDateRange(mockCRMData.sales, 'date', filters.dateRange), filters);
  const filteredLeads = applyFilters(filterByDateRange(mockCRMData.leads, 'createdAt', filters.dateRange), filters);
  const filteredActivities = applyFilters(filterByDateRange(mockCRMData.activities, 'date', filters.dateRange), filters);
  
  switch (type) {
    case 'performance':
      return {
        title: 'Performance Breakdown',
        headers: ['Metric', 'Target', 'Achieved', 'Percentage', 'Status'],
        rows: [
          { metric: 'Sales Target', target: '₹50L', achieved: `₹${(filteredSales.reduce((sum, s) => sum + s.amount, 0) / 100000).toFixed(1)}L`, percentage: '92%', status: 'on-track' },
          { metric: 'Conversions', target: '50', achieved: filteredSales.length.toString(), percentage: '88%', status: 'on-track' },
          { metric: 'Lead Generation', target: '100', achieved: filteredLeads.length.toString(), percentage: '110%', status: 'exceeded' },
          { metric: 'Customer Calls', target: '200', achieved: filteredActivities.filter(a => a.type === 'Call').length.toString(), percentage: '85%', status: 'needs-attention' },
        ]
      };

    case 'sales':
      return {
        title: 'Sales Details',
        headers: ['Product', 'Amount', 'RM', 'Branch', 'Date', 'Commission'],
        rows: filteredSales.slice(0, 20).map(sale => ({
          product: sale.product,
          amount: `₹${(sale.amount / 100000).toFixed(2)}L`,
          rm: sale.rm,
          branch: sale.branch,
          date: sale.date.toLocaleDateString(),
          commission: `₹${(sale.commission / 1000).toFixed(1)}K`
        }))
      };

    case 'leads':
      return {
        title: 'Lead Pipeline',
        headers: ['Lead', 'Product', 'Stage', 'Source', 'Value', 'Days Inactive', 'Status'],
        rows: filteredLeads.slice(0, 20).map(lead => ({
          lead: lead.name,
          product: lead.product,
          stage: lead.stage,
          source: lead.source,
          value: `₹${(lead.value / 100000).toFixed(2)}L`,
          daysInactive: lead.daysInactive.toString(),
          status: lead.daysInactive > 15 ? 'stale' : lead.daysInactive > 7 ? 'warm' : 'hot'
        }))
      };

    case 'customers':
      return {
        title: 'Customer Portfolio',
        headers: ['Customer', 'Type', 'Products', 'Total Value', 'Branch', 'RM', 'Family Size'],
        rows: mockCRMData.customers.slice(0, 20).map(cust => ({
          customer: cust.name,
          type: cust.type,
          products: cust.products.toString(),
          totalValue: `₹${(cust.totalValue / 100000).toFixed(1)}L`,
          branch: cust.branch,
          rm: cust.rm,
          familySize: cust.familySize.toString()
        }))
      };

    case 'geographic':
      const branchPerformanceMap = filteredSales.reduce((acc, sale) => {
        if (!acc[sale.branch]) {
          acc[sale.branch] = { sales: 0, revenue: 0, conversions: 0 };
        }
        acc[sale.branch].sales++;
        acc[sale.branch].revenue += sale.amount;
        acc[sale.branch].conversions++;
        return acc;
      }, {} as Record<string, { sales: number; revenue: number; conversions: number }>);
      
      const branchPerformance = (Object.entries(branchPerformanceMap) as [string, { sales: number; revenue: number; conversions: number }][]);
      
      return {
        title: 'Geographic Performance',
        headers: ['Branch', 'Region', 'Sales', 'Revenue', 'Conv. Rate', 'Rank'],
        rows: branchPerformance.map(([branch, data], idx) => ({
          branch,
          region: mockUserHierarchy.rms.find(rm => rm.branch === branch)?.region || 'N/A',
          sales: data.sales.toString(),
          revenue: `₹${(data.revenue / 100000).toFixed(1)}L`,
          convRate: `${Math.floor(Math.random() * 30) + 60}%`,
          rank: (idx + 1).toString()
        }))
      };

    case 'campaigns':
      return {
        title: 'Campaign Performance',
        headers: ['Campaign', 'Type', 'Reach', 'Responses', 'Conversions', 'ROI', 'Status'],
        rows: mockCampaigns.map(camp => ({
          campaign: camp.name,
          type: camp.type,
          reach: camp.reach.toLocaleString(),
          responses: camp.responses.toLocaleString(),
          conversions: camp.conversions.toString(),
          roi: `${camp.roi.toFixed(2)}x`,
          status: camp.roi > 2 ? 'excellent' : camp.roi > 1.5 ? 'good' : 'needs-improvement'
        }))
      };

    case 'system':
      return userRole && userRole.level >= 2 ? {
        title: 'System Usage Report',
        headers: ['User', 'Last Login', 'Logins', 'Sync Freq.', 'Features Used', 'Status'],
        rows: mockSystemUsage.slice(0, 20).map(usage => ({
          user: usage.userId,
          lastLogin: usage.lastLogin.toLocaleDateString(),
          logins: usage.loginCount.toString(),
          syncFreq: `${usage.syncFrequency}/day`,
          featuresUsed: usage.featuresUsed.toString(),
          status: usage.active ? 'active' : 'inactive'
        }))
      } : null;

    case 'team':
      return userRole && userRole.level >= 2 ? {
        title: 'Team Performance Details',
        headers: ['Team Member', 'Branch', 'Sales', 'Conversions', 'Revenue', 'Score', 'Status'],
        rows: mockUserHierarchy.rms.slice(0, 15).map(rm => {
          const rmSales = filteredSales.filter(s => s.rm === rm.id);
          const rmPerf = mockPerformanceData.kra.find(k => k.userId === rm.id);
          return {
            name: rm.name,
            branch: rm.branch,
            sales: rmSales.length.toString(),
            conversions: rmSales.length.toString(),
            revenue: `₹${(rmSales.reduce((sum, s) => sum + s.amount, 0) / 100000).toFixed(1)}L`,
            score: rmPerf?.score.toString() || 'N/A',
            status: (rmPerf?.score || 0) >= 80 ? 'excellent' : (rmPerf?.score || 0) >= 60 ? 'good' : 'needs-improvement'
          };
        })
      } : null;

    default:
      return {
        title: userRole && userRole.level >= 2 ? 'Recent Team Activity' : 'My Recent Activity',
        headers: ['Activity', 'Date', 'Type', 'Outcome', 'Duration', 'Status'],
        rows: filteredActivities.slice(0, 20).map(activity => ({
          activity: `${activity.type} - ${activity.leadId}`,
          date: activity.date.toLocaleDateString(),
          type: activity.type,
          outcome: activity.outcome,
          duration: `${activity.duration}m`,
          status: activity.outcome === 'Successful' ? 'success' : activity.outcome === 'Not Interested' ? 'failed' : 'pending'
        }))
      };
  }
};

// Helper functions
function getMultiplierByDateRange(dateRange: string): number {
  switch (dateRange) {
    case 'today': return 0.05;
    case 'week': return 0.25;
    case 'month': return 1;
    case 'quarter': return 3;
    case 'year': return 12;
    default: return 1;
  }
}

function getCategoryMultiplier(category: string): number {
  switch (category) {
    case 'all': return 1;
    case 'leads': return 1.2;
    case 'tasks': return 0.9;
    case 'performance': return 1.1;
    case 'revenue': return 1.3;
    default: return 1;
  }
}

function getTimeLabels(dateRange: string): string[] {
  switch (dateRange) {
    case 'today': return ['6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM'];
    case 'week': return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    case 'month': return ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    case 'quarter': return ['Month 1', 'Month 2', 'Month 3'];
    case 'year': return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    default: return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  }
}

function generateActivities(category: string, multiplier: number) {
  const allActivities = [
    { activity: 'Lead Conversion - Personal Loan', date: '2024-01-15', category: 'Sales', result: `₹${(2.5 * multiplier).toFixed(1)}L`, status: 'success' },
    { activity: 'Customer Follow-up', date: '2024-01-15', category: 'Task', result: 'Completed', status: 'success' },
    { activity: 'Lead Generation', date: '2024-01-14', category: 'Lead', result: `${Math.floor(5 * multiplier)} New`, status: 'success' },
    { activity: 'Team Meeting', date: '2024-01-14', category: 'Task', result: 'Attended', status: 'success' },
    { activity: 'Report Submission', date: '2024-01-13', category: 'Report', result: 'On Time', status: 'success' },
    { activity: 'Revenue Target Achieved', date: '2024-01-13', category: 'Revenue', result: `₹${(1.8 * multiplier).toFixed(1)}L`, status: 'success' },
    { activity: 'Performance Review', date: '2024-01-12', category: 'Performance', result: 'Excellent', status: 'success' },
    { activity: 'New Lead Assignment', date: '2024-01-12', category: 'Lead', result: `${Math.floor(3 * multiplier)} Leads`, status: 'success' },
  ];

  if (category === 'all') {
    return allActivities.slice(0, 5);
  }

  const categoryMap: { [key: string]: string[] } = {
    'leads': ['Lead', 'Sales'],
    'tasks': ['Task'],
    'performance': ['Performance', 'Report'],
    'revenue': ['Sales', 'Revenue']
  };

  const relevantCategories = categoryMap[category] || [];
  return allActivities.filter(activity => 
    relevantCategories.some(cat => activity.category.includes(cat))
  ).slice(0, 5);
}
