import {
  Home,
  UserPlus,
  ClipboardList,
  Users,
  MapPin,
  BarChart3,
  TrendingUp,
  Activity,
  Target,
  PieChart,
  Shield
} from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  icon: string;
}

interface RoleFeaturesConfig {
  features: string[];
  permissions: string[];
  navigation: NavItem[];
}

export interface RoleFeatures {
  sales_executive: RoleFeaturesConfig;
  supervisor: RoleFeaturesConfig;
  inbound_agent: RoleFeaturesConfig;
  relationship_manager: RoleFeaturesConfig;
}

const roleFeatures: RoleFeatures = {
  sales_executive: {
    features: [
      'dashboard',
      'leads',
      'customers',
      'tasks',
      'reports',
      'plan_my_day'
    ],
    permissions: [
      'view_own_leads',
      'edit_own_leads',
      'view_customers',
      'create_tasks',
      'view_reports'
    ],
    navigation: [
      { name: 'Dashboard', href: '/', icon: 'Home' },
      { name: 'Lead Management', href: '/leads', icon: 'UserPlus' },
      { name: 'Customer 360', href: '/customers', icon: 'Users' },
      { name: 'Plan My Day', href: '/plan-my-day', icon: 'MapPin' },
      { name: 'Tasks', href: '/tasks', icon: 'ClipboardList' },
      { name: 'Reports', href: '/reports', icon: 'BarChart3' }
    ]
  },
  supervisor: {
    features: [
      'dashboard',
      'leads',
      'customers',
      'tasks',
      'reports',
      'team_management',
      'performance_analytics',
      'territory_management',
      'plan_my_day'
    ],
    permissions: [
      'view_all_leads',
      'edit_all_leads',
      'view_customers',
      'manage_team',
      'view_analytics',
      'create_tasks',
      'view_reports',
      'manage_territory'
    ],
    navigation: [
      { name: 'Dashboard', href: '/', icon: 'Home' },
      { name: 'Lead Management', href: '/leads', icon: 'UserPlus' },
      { name: 'Customer 360', href: '/customers', icon: 'Users' },
      { name: 'Plan My Day', href: '/plan-my-day', icon: 'MapPin' },
      { name: 'Tasks', href: '/tasks', icon: 'ClipboardList' },
      { name: 'Team Management', href: '/team', icon: 'Users' },
      { name: 'Territory Management', href: '/territory', icon: 'MapPin' },
      { name: 'Analytics', href: '/analytics', icon: 'TrendingUp' },
      { name: 'Reports', href: '/reports', icon: 'BarChart3' }
    ]
  },
  inbound_agent: {
    features: [
      'dashboard',
      'leads',
      'customers',
      'tasks'
    ],
    permissions: [
      'view_assigned_leads',
      'edit_assigned_leads',
      'view_customers',
      'create_tasks'
    ],
    navigation: [
      { name: 'Dashboard', href: '/', icon: 'Home' },
      { name: 'Lead Management', href: '/leads', icon: 'UserPlus' },
      { name: 'Customer 360', href: '/customers', icon: 'Users' },
      { name: 'Tasks', href: '/tasks', icon: 'ClipboardList' }
    ]
  },
  relationship_manager: {
    features: [
      'dashboard',
      'customers',
      'portfolio_management',
      'risk_management',
      'tasks',
      'reports',
      'plan_my_day'
    ],
    permissions: [
      'view_portfolio',
      'manage_portfolio',
      'view_customers',
      'manage_risk',
      'create_tasks',
      'view_reports'
    ],
    navigation: [
      { name: 'Dashboard', href: '/', icon: 'Home' },
      { name: 'Customer 360', href: '/customers', icon: 'Users' },
      { name: 'Plan My Day', href: '/plan-my-day', icon: 'MapPin' },
      { name: 'Portfolio Management', href: '/portfolio', icon: 'PieChart' },
      { name: 'Risk Management', href: '/risk', icon: 'Shield' },
      { name: 'Tasks', href: '/tasks', icon: 'ClipboardList' },
      { name: 'Reports', href: '/reports', icon: 'BarChart3' }
    ]
  }
};

export const getRoleFeatures = (role: string) => {
  return roleFeatures[role as keyof RoleFeatures] || roleFeatures.sales_executive;
};

export const getNavigationItems = (role: string) => {
  return getRoleFeatures(role).navigation;
};
