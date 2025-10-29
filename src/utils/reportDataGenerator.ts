import { Role } from '@/types/rbac';

export interface ReportFilters {
  dateRange: string;
  department: string;
  category: string;
}

// Generate KPI data based on filters
export const generateKPIData = (filters: ReportFilters, userRole: Role | null) => {
  const multiplier = getMultiplierByDateRange(filters.dateRange);
  const categoryMultiplier = getCategoryMultiplier(filters.category);
  
  if (userRole && userRole.level >= 2) {
    return [
      {
        title: 'Team Performance',
        value: `${(87.5 * categoryMultiplier).toFixed(1)}%`,
        change: `+${(12.3 * multiplier).toFixed(1)}%`,
        trend: 'up' as const,
        description: 'Average team completion rate'
      },
      {
        title: 'Total Conversions',
        value: Math.floor(342 * multiplier * categoryMultiplier).toString(),
        change: `+${Math.floor(28 * multiplier)}`,
        trend: 'up' as const,
        description: 'Team conversions this period'
      },
      {
        title: 'Revenue Generated',
        value: `₹${(45.2 * multiplier * categoryMultiplier).toFixed(1)}L`,
        change: `+${(18.5 * multiplier).toFixed(1)}%`,
        trend: 'up' as const,
        description: 'Total team revenue'
      },
      {
        title: 'Active Team Members',
        value: Math.floor(24 * categoryMultiplier).toString(),
        change: `+${Math.floor(2 * multiplier)}`,
        trend: 'up' as const,
        description: 'Currently active users'
      },
    ];
  } else {
    return [
      {
        title: 'My Performance',
        value: `${(92.3 * categoryMultiplier).toFixed(1)}%`,
        change: `+${(5.2 * multiplier).toFixed(1)}%`,
        trend: 'up' as const,
        description: 'Your task completion rate'
      },
      {
        title: 'My Conversions',
        value: Math.floor(18 * multiplier * categoryMultiplier).toString(),
        change: `+${Math.floor(3 * multiplier)}`,
        trend: 'up' as const,
        description: 'Conversions this period'
      },
      {
        title: 'My Revenue',
        value: `₹${(3.8 * multiplier * categoryMultiplier).toFixed(1)}L`,
        change: `+${(22 * multiplier).toFixed(0)}%`,
        trend: 'up' as const,
        description: 'Your total revenue'
      },
      {
        title: 'Active Leads',
        value: Math.floor(32 * categoryMultiplier).toString(),
        change: `-${Math.floor(2 * multiplier)}`,
        trend: 'down' as const,
        description: 'Leads in pipeline'
      },
    ];
  }
};

// Generate chart data based on filters
export const generateChartData = (filters: ReportFilters) => {
  const multiplier = getMultiplierByDateRange(filters.dateRange);
  const categoryMultiplier = getCategoryMultiplier(filters.category);
  
  const timeLabels = getTimeLabels(filters.dateRange);
  
  const performanceData = timeLabels.map((label, index) => {
    const variance = 1 + (Math.sin(index) * 0.1); // Add some variation
    return {
      month: label,
      conversions: Math.floor(45 * multiplier * categoryMultiplier * variance),
      leads: Math.floor(120 * multiplier * categoryMultiplier * variance),
      revenue: Math.floor(380000 * multiplier * categoryMultiplier * variance)
    };
  });

  const categoryData = [
    { name: 'Leads', value: Math.floor(342 * categoryMultiplier) },
    { name: 'Tasks', value: Math.floor(289 * categoryMultiplier) },
    { name: 'Conversions', value: Math.floor(156 * categoryMultiplier) },
    { name: 'Follow-ups', value: Math.floor(421 * categoryMultiplier) },
  ];

  const teamData = [
    { name: 'Rahul S.', performance: Math.floor(92 * categoryMultiplier), conversions: Math.floor(28 * multiplier) },
    { name: 'Priya M.', performance: Math.floor(88 * categoryMultiplier), conversions: Math.floor(24 * multiplier) },
    { name: 'Amit K.', performance: Math.floor(85 * categoryMultiplier), conversions: Math.floor(22 * multiplier) },
    { name: 'Sneha P.', performance: Math.floor(90 * categoryMultiplier), conversions: Math.floor(26 * multiplier) },
    { name: 'Vikram R.', performance: Math.floor(82 * categoryMultiplier), conversions: Math.floor(20 * multiplier) },
  ];

  return { performanceData, categoryData, teamData };
};

// Generate table data based on filters
export const generateTableData = (filters: ReportFilters, userRole: Role | null, type: string) => {
  const multiplier = getMultiplierByDateRange(filters.dateRange);
  const categoryFilter = filters.category;
  
  switch (type) {
    case 'team':
      return userRole && userRole.level >= 2 ? {
        title: 'Team Performance Details',
        headers: ['Team Member', 'Role', 'Tasks', 'Conversions', 'Revenue', 'Status'],
        rows: [
          { name: 'Rahul Sharma', role: 'Sales Executive', tasks: Math.floor(45 * multiplier), conversions: Math.floor(28 * multiplier), revenue: `₹${(4.2 * multiplier).toFixed(1)}L`, status: 'active' },
          { name: 'Priya Mehta', role: 'Sales Executive', tasks: Math.floor(42 * multiplier), conversions: Math.floor(24 * multiplier), revenue: `₹${(3.8 * multiplier).toFixed(1)}L`, status: 'active' },
          { name: 'Amit Kumar', role: 'Relationship Manager', tasks: Math.floor(38 * multiplier), conversions: Math.floor(22 * multiplier), revenue: `₹${(3.5 * multiplier).toFixed(1)}L`, status: 'active' },
          { name: 'Sneha Patel', role: 'Sales Executive', tasks: Math.floor(41 * multiplier), conversions: Math.floor(26 * multiplier), revenue: `₹${(4.0 * multiplier).toFixed(1)}L`, status: 'active' },
        ]
      } : null;

    case 'system':
      return userRole && userRole.level >= 2 ? {
        title: 'System Activity Log',
        headers: ['Activity', 'User', 'Timestamp', 'Type', 'Status'],
        rows: [
          { activity: 'Lead Created', user: 'Rahul S.', timestamp: '2 mins ago', type: 'Lead', status: 'completed' },
          { activity: 'Task Assigned', user: 'System', timestamp: '15 mins ago', type: 'Task', status: 'completed' },
          { activity: 'Report Generated', user: 'Priya M.', timestamp: '1 hour ago', type: 'Report', status: 'completed' },
          { activity: 'User Login', user: 'Amit K.', timestamp: '2 hours ago', type: 'Auth', status: 'completed' },
        ]
      } : null;

    default:
      const activities = generateActivities(categoryFilter, multiplier);
      return {
        title: userRole && userRole.level >= 2 ? 'Recent Team Activity' : 'My Recent Activity',
        headers: ['Activity', 'Date', 'Category', 'Result', 'Status'],
        rows: activities
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
