
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
    id: 'field_dashboard',
    name: 'Field Dashboard',
    path: '/',
    icon: 'Home',
    roles: ['field_sales_officer'],
    description: 'Beat planning and field performance dashboard'
  },
  {
    id: 'field_leads',
    name: 'My Leads',
    path: '/leads',
    icon: 'UserPlus',
    roles: ['field_sales_officer'],
    description: 'Manage assigned field leads'
  },
  {
    id: 'beat_planning',
    name: 'Beat Planning',
    path: '/geo-location',
    icon: 'MapPin',
    roles: ['field_sales_officer'],
    description: 'Route planning and customer visits'
  },
  {
    id: 'field_tasks',
    name: 'My Tasks',
    path: '/tasks',
    icon: 'ClipboardList',
    roles: ['field_sales_officer'],
    description: 'Field visit tasks and follow-ups'
  },
  {
    id: 'customer_visits',
    name: 'Customer Visits',
    path: '/customers',
    icon: 'Users',
    roles: ['field_sales_officer'],
    description: 'Customer visit history and planning'
  },

  // Inbound Contact Agent Features
  {
    id: 'inbound_dashboard',
    name: 'Contact Dashboard',
    path: '/',
    icon: 'Home',
    roles: ['inbound_contact_agent'],
    description: 'Inbound lead management dashboard'
  },
  {
    id: 'inbound_leads',
    name: 'Incoming Leads',
    path: '/leads',
    icon: 'Phone',
    roles: ['inbound_contact_agent'],
    description: 'Handle incoming customer inquiries'
  },
  {
    id: 'lead_verification',
    name: 'Lead Verification',
    path: '/tasks',
    icon: 'UserCheck',
    roles: ['inbound_contact_agent'],
    description: 'KYC and lead verification tasks'
  },
  {
    id: 'call_management',
    name: 'Call Management',
    path: '/customers',
    icon: 'PhoneCall',
    roles: ['inbound_contact_agent'],
    description: 'Call scheduling and management'
  },

  // Relationship Manager Features
  {
    id: 'rm_dashboard',
    name: 'RM Dashboard',
    path: '/',
    icon: 'Home',
    roles: ['relationship_manager'],
    description: 'Portfolio and relationship overview'
  },
  {
    id: 'portfolio_management',
    name: 'Portfolio Management',
    path: '/portfolio',
    icon: 'PieChart',
    roles: ['relationship_manager'],
    description: 'High-value customer portfolio'
  },
  {
    id: 'customer_360',
    name: 'Customer 360',
    path: '/customers',
    icon: 'Users',
    roles: ['relationship_manager'],
    description: 'Complete customer relationship view'
  },
  {
    id: 'rm_leads',
    name: 'RM Leads',
    path: '/leads',
    icon: 'UserPlus',
    roles: ['relationship_manager'],
    description: 'High-value prospect management'
  },
  {
    id: 'cross_sell',
    name: 'Cross-sell Opportunities',
    path: '/funnel',
    icon: 'TrendingUp',
    roles: ['relationship_manager'],
    description: 'Cross-sell and upsell tracking'
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
    id: 'geo_tracking',
    name: 'Geo Tracking',
    path: '/geo-location',
    icon: 'MapPin',
    roles: ['supervisor'],
    description: 'Real-time team location tracking'
  },
  {
    id: 'performance_analytics',
    name: 'Performance Analytics',
    path: '/team-performance',
    icon: 'BarChart3',
    roles: ['supervisor'],
    description: 'Team performance analytics'
  },
  {
    id: 'lead_allocation',
    name: 'Lead Allocation',
    path: '/lead-allocation',
    icon: 'UserPlus',
    roles: ['supervisor'],
    description: 'Assign leads to team members'
  },

  // Admin/MIS Officer Features
  {
    id: 'admin_dashboard',
    name: 'Admin Dashboard',
    path: '/',
    icon: 'Home',
    roles: ['admin_mis_officer'],
    description: 'System administration overview'
  },
  {
    id: 'system_config',
    name: 'System Config',
    path: '/team-management',
    icon: 'Settings',
    roles: ['admin_mis_officer'],
    description: 'System configuration and setup'
  },
  {
    id: 'mis_reports',
    name: 'MIS Reports',
    path: '/reports',
    icon: 'BarChart3',
    roles: ['admin_mis_officer'],
    description: 'Generate custom MIS reports'
  },
  {
    id: 'user_management',
    name: 'User Management',
    path: '/team-management',
    icon: 'Users',
    roles: ['admin_mis_officer'],
    description: 'Manage system users and roles'
  },
  {
    id: 'audit_trail',
    name: 'Audit Trail',
    path: '/reports',
    icon: 'Shield',
    roles: ['admin_mis_officer'],
    description: 'System audit and compliance'
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
    'Shield': 'Shield',
    'Phone': 'Phone',
    'PhoneCall': 'PhoneCall',
    'UserCheck': 'UserCheck',
    'Settings': 'Settings'
  };
  return iconMap[iconName] || 'Home';
};
