
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
  // Field Sales Officer Features
  {
    id: 'dashboard',
    name: 'My Dashboard',
    path: '/',
    icon: 'Home',
    roles: ['field_sales_officer'],
    description: 'Personal performance dashboard'
  },
  {
    id: 'my_leads',
    name: 'My Leads',
    path: '/leads',
    icon: 'UserPlus',
    roles: ['field_sales_officer'],
    description: 'Manage assigned leads'
  },
  {
    id: 'my_tasks',
    name: 'My Tasks',
    path: '/tasks',
    icon: 'ClipboardList',
    roles: ['field_sales_officer'],
    description: 'Personal task management'
  },
  {
    id: 'customer_360',
    name: 'Customer 360',
    path: '/customers',
    icon: 'Users',
    roles: ['field_sales_officer', 'relationship_manager'],
    description: 'Customer relationship management'
  },
  {
    id: 'sales_funnel',
    name: 'My Pipeline',
    path: '/funnel',
    icon: 'BarChart3',
    roles: ['field_sales_officer', 'relationship_manager'],
    description: 'Personal sales pipeline'
  },

  // Inbound Contact Agent Features
  {
    id: 'inbound_dashboard',
    name: 'Contact Dashboard',
    path: '/',
    icon: 'Home',
    roles: ['inbound_contact_agent'],
    description: 'Inbound call management dashboard'
  },
  {
    id: 'inbound_leads',
    name: 'Inbound Leads',
    path: '/leads',
    icon: 'UserPlus',
    roles: ['inbound_contact_agent'],
    description: 'Handle incoming lead inquiries'
  },
  {
    id: 'call_management',
    name: 'Call Management',
    path: '/tasks',
    icon: 'ClipboardList',
    roles: ['inbound_contact_agent'],
    description: 'Manage inbound calls and follow-ups'
  },

  // Relationship Manager Features
  {
    id: 'rm_dashboard',
    name: 'RM Dashboard',
    path: '/',
    icon: 'Home',
    roles: ['relationship_manager'],
    description: 'Relationship management dashboard'
  },
  {
    id: 'portfolio_leads',
    name: 'Portfolio Leads',
    path: '/leads',
    icon: 'UserPlus',
    roles: ['relationship_manager'],
    description: 'Manage high-value client leads'
  },
  {
    id: 'relationship_tasks',
    name: 'Client Tasks',
    path: '/tasks',
    icon: 'ClipboardList',
    roles: ['relationship_manager'],
    description: 'Client relationship activities'
  },

  // Supervisor Features (with geo tracking restriction)
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
    id: 'geo_location',
    name: 'Geo Tracking',
    path: '/geo-location',
    icon: 'MapPin',
    roles: ['supervisor'],
    description: 'Location tracking and geo-fencing (Supervisor only)'
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
