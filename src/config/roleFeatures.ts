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

export interface Feature {
  id: string;
  name: string;
  path: string;
  icon: string;
  description: string;
}

export const roleFeatures: Record<string, Feature[]> = {
  sales_executive: [
    {
      id: 'dashboard',
      name: 'Dashboard',
      path: '/',
      icon: 'Home',
      description: 'Overview of sales performance'
    },
    {
      id: 'my_kra',
      name: 'My KRA',
      path: '/my-kra',
      icon: 'Target',
      description: 'Key Result Areas management'
    },
    {
      id: 'lead_management',
      name: 'Lead Management',
      path: '/leads',
      icon: 'ClipboardList',
      description: 'Manage and track leads'
    },
    {
      id: 'customer_engagement',
      name: 'Customer Engagement',
      path: '/customer-engagement',
      icon: 'Activity',
      description: 'Track customer interactions'
    },
    {
      id: 'reports_analytics',
      name: 'Reports & Analytics',
      path: '/reports',
      icon: 'BarChart3',
      description: 'View performance reports'
    }
  ],
  supervisor: [
    {
      id: 'dashboard',
      name: 'Dashboard',
      path: '/supervisor',
      icon: 'Home',
      description: 'Team performance overview'
    },
    {
      id: 'team_management',
      name: 'Team Management',
      path: '/team',
      icon: 'Users',
      description: 'Manage team members'
    },
    {
      id: 'lead_distribution',
      name: 'Lead Distribution',
      path: '/leads',
      icon: 'MapPin',
      description: 'Assign leads to team members'
    },
    {
      id: 'performance_monitoring',
      name: 'Performance Monitoring',
      path: '/performance',
      icon: 'TrendingUp',
      description: 'Monitor team performance'
    },
    {
      id: 'reports_analytics',
      name: 'Reports & Analytics',
      path: '/reports',
      icon: 'BarChart3',
      description: 'Generate team reports'
    }
  ],
  inbound_agent: [
    {
      id: 'dashboard',
      name: 'Dashboard',
      path: '/',
      icon: 'Home',
      description: 'Overview of inbound activities'
    },
    {
      id: 'call_management',
      name: 'Call Management',
      path: '/calls',
      icon: 'Phone',
      description: 'Manage inbound calls'
    },
    {
      id: 'customer_support',
      name: 'Customer Support',
      path: '/support',
      icon: 'Shield',
      description: 'Provide customer support'
    },
    {
      id: 'reports_analytics',
      name: 'Reports & Analytics',
      path: '/reports',
      icon: 'PieChart',
      description: 'View call reports'
    }
  ],
  relationship_manager: [
    {
      id: 'dashboard',
      name: 'Dashboard',
      path: '/',
      icon: 'Home',
      description: 'Overview of customer relationships'
    },
    {
      id: 'customer_profiles',
      name: 'Customer Profiles',
      path: '/customers',
      icon: 'Users',
      description: 'Manage customer profiles'
    },
    {
      id: 'loan_management',
      name: 'Loan Management',
      path: '/loans',
      icon: 'ClipboardList',
      description: 'Manage customer loans'
    },
     {
      id: 'reports_analytics',
      name: 'Reports & Analytics',
      path: '/reports',
      icon: 'PieChart',
      description: 'View relationship reports'
    }
  ]
};

export const getFeaturesForRole = (role: string): Feature[] => {
  return roleFeatures[role] || [];
};

export const hasFeatureAccess = (role: string, featureId: string): boolean => {
  const features = getFeaturesForRole(role);
  return features.some(feature => feature.id === featureId);
};
