
// Feature access configuration for different roles
export interface Feature {
  id: string;
  name: string;
  path: string;
  icon: string;
  roles: string[];
  description: string;
}

export const FEATURES: Feature[] = [
  // Sales Executive Features
  {
    id: 'dashboard',
    name: 'My Dashboard',
    path: '/',
    icon: 'Home',
    roles: ['sales_executive', 'field_manager', 'relationship_manager'],
    description: 'Personal performance dashboard'
  },
  {
    id: 'my_leads',
    name: 'My Leads',
    path: '/leads',
    icon: 'UserPlus',
    roles: ['sales_executive', 'field_manager', 'relationship_manager'],
    description: 'Manage assigned leads'
  },
  {
    id: 'my_tasks',
    name: 'My Tasks',
    path: '/tasks',
    icon: 'ClipboardList',
    roles: ['sales_executive', 'field_manager', 'relationship_manager'],
    description: 'Personal task management'
  },
  {
    id: 'customer_360',
    name: 'Customer 360',
    path: '/customers',
    icon: 'Users',
    roles: ['sales_executive', 'field_manager', 'relationship_manager'],
    description: 'Customer relationship management'
  },
  {
    id: 'geo_location',
    name: 'Geo Tracking',
    path: '/geo-location',
    icon: 'MapPin',
    roles: ['sales_executive', 'field_manager', 'relationship_manager'],
    description: 'Location tracking and beat planning'
  },
  {
    id: 'sales_funnel',
    name: 'My Pipeline',
    path: '/funnel',
    icon: 'BarChart3',
    roles: ['sales_executive', 'field_manager', 'relationship_manager'],
    description: 'Personal sales pipeline'
  },

  // Supervisor Features
  {
    id: 'supervisor_dashboard',
    name: 'Team Dashboard',
    path: '/',
    icon: 'Home',
    roles: ['supervisor'],
    description: 'Team performance overview'
  },
  {
    id: 'team_management',
    name: 'Team Management',
    path: '/team-management',
    icon: 'Users',
    roles: ['supervisor'],
    description: 'Manage team members and assignments'
  },
  {
    id: 'lead_allocation',
    name: 'Lead Allocation',
    path: '/lead-allocation',
    icon: 'UserPlus',
    roles: ['supervisor'],
    description: 'Assign leads to team members'
  },
  {
    id: 'team_tasks',
    name: 'Team Tasks',
    path: '/team-tasks',
    icon: 'ClipboardList',
    roles: ['supervisor'],
    description: 'Monitor team task progress'
  },
  {
    id: 'team_performance',
    name: 'Performance Analytics',
    path: '/team-performance',
    icon: 'TrendingUp',
    roles: ['supervisor'],
    description: 'Team performance analytics'
  },
  {
    id: 'territory_management',
    name: 'Territory Management',
    path: '/territory-management',
    icon: 'MapPin',
    roles: ['supervisor'],
    description: 'Manage sales territories'
  },
  {
    id: 'reports',
    name: 'Reports & Analytics',
    path: '/reports',
    icon: 'BarChart3',
    roles: ['supervisor'],
    description: 'Generate team reports'
  },
  
  // Executive Level Features (both roles with different access levels)
  {
    id: 'executive_dashboard',
    name: 'Executive Dashboard',
    path: '/executive-dashboard',
    icon: 'TrendingUp',
    roles: ['supervisor'],
    description: 'High-level performance metrics'
  },
  {
    id: 'customer_analytics',
    name: 'Customer Analytics',
    path: '/customer-analytics',
    icon: 'Activity',
    roles: ['supervisor'],
    description: 'Customer behavior analysis'
  },
  {
    id: 'kpa_management',
    name: 'KPA Management',
    path: '/kpa-management',
    icon: 'Target',
    roles: ['supervisor'],
    description: 'Key performance area management'
  },
  {
    id: 'portfolio_management',
    name: 'Portfolio Management',
    path: '/portfolio',
    icon: 'PieChart',
    roles: ['supervisor'],
    description: 'Portfolio oversight'
  },
  {
    id: 'risk_management',
    name: 'Risk Management',
    path: '/risk-management',
    icon: 'Shield',
    roles: ['supervisor'],
    description: 'Risk assessment and management'
  }
];

// Get features for a specific role
export const getFeaturesForRole = (role: string): Feature[] => {
  return FEATURES.filter(feature => feature.roles.includes(role));
};

// Check if a role has access to a feature
export const hasFeatureAccess = (role: string, featureId: string): boolean => {
  const feature = FEATURES.find(f => f.id === featureId);
  return feature ? feature.roles.includes(role) : false;
};

// Get icon component mapping
export const getIconName = (iconName: string) => {
  const iconMap: { [key: string]: string } = {
    'Home': 'Home',
    'UserPlus': 'UserPlus',
    'ClipboardList': 'ClipboardList',
    'Users': 'Users',
    'MapPin': 'MapPin',
    'BarChart3': 'BarChart3',
    'TrendingUp': 'TrendingUp',
    'Activity': 'Activity',
    'Target': 'Target',
    'PieChart': 'PieChart',
    'Shield': 'Shield'
  };
  return iconMap[iconName] || 'Home';
};
