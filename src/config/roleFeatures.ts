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
    id: 'fso_dashboard',
    name: 'Beat Dashboard',
    path: '/',
    icon: 'Home',
    roles: ['field_sales_officer'],
    description: 'Beat planning and visit management'
  },
  {
    id: 'beat_planning',
    name: 'Beat Planning',
    path: '/beat-planning',
    icon: 'MapPin',
    roles: ['field_sales_officer'],
    description: 'Plan customer visits and routes'
  },
  {
    id: 'customer_visits',
    name: 'Customer Visits',
    path: '/customer-visits',
    icon: 'UserPlus',
    roles: ['field_sales_officer'],
    description: 'Track customer interactions'
  },
  {
    id: 'my_leads_fso',
    name: 'My Leads',
    path: '/leads',
    icon: 'Users',
    roles: ['field_sales_officer'],
    description: 'Manage assigned leads'
  },

  // Inbound Contact Agent Features
  {
    id: 'inbound_dashboard',
    name: 'Contact Dashboard',
    path: '/',
    icon: 'Home',
    roles: ['inbound_contact_agent'],
    description: 'Handle incoming inquiries'
  },
  {
    id: 'lead_verification',
    name: 'Lead Verification',
    path: '/lead-verification',
    icon: 'Shield',
    roles: ['inbound_contact_agent'],
    description: 'Verify and process leads'
  },
  {
    id: 'call_management',
    name: 'Call Management',
    path: '/call-management',
    icon: 'Phone',
    roles: ['inbound_contact_agent'],
    description: 'Log calls and interactions'
  },

  // Relationship Manager Features
  {
    id: 'rm_dashboard',
    name: 'Portfolio Dashboard',
    path: '/',
    icon: 'Home',
    roles: ['relationship_manager'],
    description: 'Portfolio overview and management'
  },
  {
    id: 'customer_360_rm',
    name: 'Customer 360',
    path: '/customers',
    icon: 'Users',
    roles: ['relationship_manager'],
    description: 'Complete customer view with family'
  },
  {
    id: 'portfolio_management',
    name: 'Portfolio Management',
    path: '/portfolio',
    icon: 'PieChart',
    roles: ['relationship_manager'],
    description: 'Manage high-value customers'
  },
  {
    id: 'cross_sell',
    name: 'Cross-Sell Opportunities',
    path: '/cross-sell',
    icon: 'TrendingUp',
    roles: ['relationship_manager'],
    description: 'Identify upsell opportunities'
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
    description: 'Manage team members'
  },
  {
    id: 'performance_monitoring',
    name: 'Performance Monitor',
    path: '/team-performance',
    icon: 'BarChart3',
    roles: ['supervisor'],
    description: 'Monitor team performance'
  },
  {
    id: 'live_tracking',
    name: 'Live Tracking',
    path: '/live-tracking',
    icon: 'MapPin',
    roles: ['supervisor'],
    description: 'Real-time field team tracking'
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
    name: 'System Configuration',
    path: '/system-config',
    icon: 'Settings',
    roles: ['admin_mis_officer'],
    description: 'Configure system rules and settings'
  },
  {
    id: 'reports_admin',
    name: 'Reports & Analytics',
    path: '/reports',
    icon: 'BarChart3',
    roles: ['admin_mis_officer'],
    description: 'Generate system reports'
  },
  {
    id: 'user_management',
    name: 'User Management',
    path: '/user-management',
    icon: 'Users',
    roles: ['admin_mis_officer'],
    description: 'Manage system users'
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
