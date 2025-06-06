
// Define the Role type locally since it's not exported from AuthContext
export type Role = 'sales_executive' | 'supervisor' | 'admin' | 'inbound_agent' | 'relationship_manager';

interface NavItem {
  name: string;
  href: string;
  icon: string;
}

interface RoleFeatures {
  name: string;
  navigation: NavItem[];
  permissions: string[];
}

export interface Feature {
  id: string;
  name: string;
  path: string;
  icon: string;
  description: string;
}

// Define feature sets for each role
export const roleFeatures: Record<Role, RoleFeatures> = {
  sales_executive: {
    name: 'Sales Executive',
    navigation: [
      { name: 'Dashboard', href: '/', icon: 'Home' },
      { name: 'Leads', href: '/leads', icon: 'ClipboardList' },
      { name: 'Tasks', href: '/tasks', icon: 'Activity' },
      { name: 'Customers', href: '/customers', icon: 'Users' },
      { name: 'Geo Location', href: '/geo-location', icon: 'MapPin' },
      { name: 'Sales Funnel', href: '/funnel', icon: 'BarChart3' },
      { name: 'Team Performance', href: '/team-performance', icon: 'TrendingUp' },
    ],
    permissions: [
      'view_dashboard',
      'create_lead',
      'edit_lead',
      'delete_lead',
      'view_customer',
      'create_task',
      'edit_task',
      'delete_task',
    ]
  },
  supervisor: {
    name: 'Supervisor',
    navigation: [
      { name: 'Dashboard', href: '/', icon: 'Home' },
      { name: 'Leads', href: '/leads', icon: 'ClipboardList' },
      { name: 'Tasks', href: '/tasks', icon: 'Activity' },
      { name: 'Customers', href: '/customers', icon: 'Users' },
      { name: 'Geo Location', href: '/geo-location', icon: 'MapPin' },
      { name: 'Sales Funnel', href: '/funnel', icon: 'BarChart3' },
      { name: 'Team Performance', href: '/team-performance', icon: 'TrendingUp' },
      { name: 'Territory Management', href: '/territory-management', icon: 'MapPin' },
      { name: 'Reports', href: '/reports', icon: 'BarChart3' },
    ],
    permissions: [
      'view_dashboard',
      'create_lead',
      'edit_lead',
      'delete_lead',
      'view_customer',
      'create_task',
      'edit_task',
      'delete_task',
      'assign_lead',
      'view_team_performance',
      'generate_reports',
    ]
  },
  admin: {
    name: 'Administrator',
    navigation: [
      { name: 'Dashboard', href: '/', icon: 'Home' },
      { name: 'User Management', href: '/user-management', icon: 'Users' }
    ],
    permissions: [
      'view_dashboard_admin',
      'manage_users',
      'view_all_reports',
      'manage_rules',
      'view_all_data',
      'export_data',
    ]
  },
  inbound_agent: {
    name: 'Inbound Agent',
    navigation: [
      { name: 'Dashboard', href: '/', icon: 'Home' },
      { name: 'Leads', href: '/leads', icon: 'ClipboardList' },
      { name: 'Tasks', href: '/tasks', icon: 'Activity' },
    ],
    permissions: [
      'view_dashboard',
      'create_lead',
      'edit_lead',
      'view_customer',
      'create_task',
      'edit_task',
    ]
  },
  relationship_manager: {
    name: 'Relationship Manager',
    navigation: [
      { name: 'Dashboard', href: '/', icon: 'Home' },
      { name: 'Portfolio', href: '/portfolio', icon: 'PieChart' },
      { name: 'Risk Management', href: '/risk-management', icon: 'Shield' },
      { name: 'Customer Analytics', href: '/customer-analytics', icon: 'BarChart3' },
    ],
    permissions: [
      'view_dashboard',
      'view_portfolio',
      'assess_risk',
      'analyze_customer',
    ]
  }
};

// Export the missing functions
export const getFeaturesForRole = (role: Role): Feature[] => {
  const roleConfig = roleFeatures[role];
  return roleConfig.navigation.map(nav => ({
    id: nav.href,
    name: nav.name,
    path: nav.href,
    icon: nav.icon,
    description: `Access to ${nav.name}`
  }));
};

export const hasFeatureAccess = (role: Role, featureId: string): boolean => {
  const features = getFeaturesForRole(role);
  return features.some(feature => feature.id === featureId);
};

// Hook to access role-based features
export const useRoleFeatures = () => {
  const getRoleFeatures = (role: Role) => {
    return roleFeatures[role] || roleFeatures.sales_executive;
  };

  const getNavigationItems = (role: Role = 'sales_executive') => {
    return roleFeatures[role]?.navigation || roleFeatures.sales_executive.navigation;
  };

  return { getRoleFeatures, getNavigationItems };
};
