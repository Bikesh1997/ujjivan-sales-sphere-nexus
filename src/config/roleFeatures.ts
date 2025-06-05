
export interface NavigationItem {
  name: string;
  href: string;
  icon: string;
}

export interface RoleFeatures {
  features: string[];
  navigation: NavigationItem[];
}

export const roleFeatures: Record<string, RoleFeatures> = {
  sales_executive: {
    features: [
      'sales_funnel',
      'my_leads', 
      'my_tasks',
      'customer_360',
      'geo_location'
    ],
    navigation: [
      { name: 'Dashboard', href: '/', icon: 'Home' },
      { name: 'Sales Funnel', href: '/funnel', icon: 'TrendingUp' },
      { name: 'My Leads', href: '/leads', icon: 'UserPlus' },
      { name: 'My Tasks', href: '/tasks', icon: 'ClipboardList' },
      { name: 'Customer 360', href: '/customers', icon: 'Users' },
      { name: 'Geo Location', href: '/geo-location', icon: 'MapPin' }
    ]
  },
  supervisor: {
    features: [
      'executive_dashboard',
      'customer_analytics', 
      'kpa_management',
      'risk_management',
      'portfolio_management',
      'team_performance',
      'territory_management',
      'rule_management',
      'reports'
    ],
    navigation: [
      { name: 'Dashboard', href: '/', icon: 'Home' },
      { name: 'Executive Dashboard', href: '/executive-dashboard', icon: 'BarChart3' },
      { name: 'Customer Analytics', href: '/customer-analytics', icon: 'TrendingUp' },
      { name: 'Performance Analytics', href: '/team-performance', icon: 'Activity' },
      { name: 'Rule Management', href: '/rule-management', icon: 'Target' },
      { name: 'KPA Management', href: '/kpa-management', icon: 'Target' },
      { name: 'Risk Management', href: '/risk-management', icon: 'Shield' },
      { name: 'Portfolio', href: '/portfolio', icon: 'PieChart' },
      { name: 'Territory Management', href: '/territory-management', icon: 'MapPin' },
      { name: 'Reports', href: '/reports', icon: 'BarChart3' }
    ]
  },
  inbound_agent: {
    features: [
      'inbound_calls',
      'customer_360',
      'my_tasks'
    ],
    navigation: [
      { name: 'Dashboard', href: '/', icon: 'Home' },
      { name: 'Inbound Calls', href: '/inbound-calls', icon: 'Phone' },
      { name: 'Customer 360', href: '/customers', icon: 'Users' },
      { name: 'My Tasks', href: '/tasks', icon: 'ClipboardList' }
    ]
  },
  relationship_manager: {
    features: [
      'customer_analytics',
      'portfolio_management',
      'customer_360',
      'reports'
    ],
    navigation: [
      { name: 'Dashboard', href: '/', icon: 'Home' },
      { name: 'Customer Analytics', href: '/customer-analytics', icon: 'TrendingUp' },
      { name: 'Portfolio', href: '/portfolio', icon: 'PieChart' },
      { name: 'Customer 360', href: '/customers', icon: 'Users' },
      { name: 'Reports', href: '/reports', icon: 'BarChart3' }
    ]
  }
};
