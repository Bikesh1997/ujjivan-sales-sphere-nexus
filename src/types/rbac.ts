
export interface Permission {
  id: string;
  name: string;
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete' | 'manage';
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  level: number; // Higher level = more privileges
}

export interface UserRole {
  userId: string;
  roleId: string;
  assignedBy: string;
  assignedAt: Date;
  expiresAt?: Date;
}

export const PERMISSIONS = {
  // Lead Management
  LEAD_CREATE: { id: 'lead_create', name: 'Create Lead', resource: 'leads', action: 'create' as const },
  LEAD_READ: { id: 'lead_read', name: 'View Leads', resource: 'leads', action: 'read' as const },
  LEAD_UPDATE: { id: 'lead_update', name: 'Update Lead', resource: 'leads', action: 'update' as const },
  LEAD_DELETE: { id: 'lead_delete', name: 'Delete Lead', resource: 'leads', action: 'delete' as const },
  LEAD_ASSIGN: { id: 'lead_assign', name: 'Assign Leads', resource: 'leads', action: 'manage' as const },
  
  // Task Management
  TASK_CREATE: { id: 'task_create', name: 'Create Task', resource: 'tasks', action: 'create' as const },
  TASK_READ: { id: 'task_read', name: 'View Tasks', resource: 'tasks', action: 'read' as const },
  TASK_UPDATE: { id: 'task_update', name: 'Update Task', resource: 'tasks', action: 'update' as const },
  TASK_DELETE: { id: 'task_delete', name: 'Delete Task', resource: 'tasks', action: 'delete' as const },
  
  // Beat Planning
  BEAT_CREATE: { id: 'beat_create', name: 'Create Beat Plan', resource: 'beats', action: 'create' as const },
  BEAT_READ: { id: 'beat_read', name: 'View Beat Plans', resource: 'beats', action: 'read' as const },
  BEAT_UPDATE: { id: 'beat_update', name: 'Update Beat Plan', resource: 'beats', action: 'update' as const },
  
  // Customer Management
  CUSTOMER_READ: { id: 'customer_read', name: 'View Customers', resource: 'customers', action: 'read' as const },
  CUSTOMER_UPDATE: { id: 'customer_update', name: 'Update Customer', resource: 'customers', action: 'update' as const },
  CUSTOMER_360: { id: 'customer_360', name: 'Customer 360 View', resource: 'customers', action: 'manage' as const },
  
  // Portfolio Management
  PORTFOLIO_READ: { id: 'portfolio_read', name: 'View Portfolio', resource: 'portfolio', action: 'read' as const },
  PORTFOLIO_MANAGE: { id: 'portfolio_manage', name: 'Manage Portfolio', resource: 'portfolio', action: 'manage' as const },
  
  // Reports
  REPORT_VIEW: { id: 'report_view', name: 'View Reports', resource: 'reports', action: 'read' as const },
  REPORT_GENERATE: { id: 'report_generate', name: 'Generate Reports', resource: 'reports', action: 'create' as const },
  
  // User Management
  USER_MANAGE: { id: 'user_manage', name: 'Manage Users', resource: 'users', action: 'manage' as const },
  USER_VIEW: { id: 'user_view', name: 'View Users', resource: 'users', action: 'read' as const },
  
  // System Admin
  SYSTEM_CONFIG: { id: 'system_config', name: 'System Configuration', resource: 'system', action: 'manage' as const },
  RULES_MANAGE: { id: 'rules_manage', name: 'Manage Rules', resource: 'rules', action: 'manage' as const },
};

export const ROLES: Role[] = [
  {
    id: 'field_sales_officer',
    name: 'Field Sales Officer',
    description: 'Handles outbound sales and customer visits',
    level: 1,
    permissions: [
      PERMISSIONS.LEAD_READ,
      PERMISSIONS.LEAD_UPDATE,
      PERMISSIONS.TASK_CREATE,
      PERMISSIONS.TASK_READ,
      PERMISSIONS.TASK_UPDATE,
      PERMISSIONS.BEAT_CREATE,
      PERMISSIONS.BEAT_READ,
      PERMISSIONS.BEAT_UPDATE,
      PERMISSIONS.CUSTOMER_READ,
      PERMISSIONS.CUSTOMER_UPDATE,
      PERMISSIONS.REPORT_VIEW,
    ]
  },
  {
    id: 'inbound_contact_agent',
    name: 'Inbound Contact Agent',
    description: 'Handles incoming leads via call, WhatsApp, web',
    level: 1,
    permissions: [
      PERMISSIONS.LEAD_CREATE,
      PERMISSIONS.LEAD_READ,
      PERMISSIONS.LEAD_UPDATE,
      PERMISSIONS.CUSTOMER_READ,
      PERMISSIONS.CUSTOMER_UPDATE,
      PERMISSIONS.TASK_CREATE,
      PERMISSIONS.TASK_READ,
      PERMISSIONS.TASK_UPDATE,
    ]
  },
  {
    id: 'relationship_manager',
    name: 'Relationship Manager',
    description: 'Manages portfolio of high-value customers',
    level: 2,
    permissions: [
      PERMISSIONS.LEAD_READ,
      PERMISSIONS.LEAD_UPDATE,
      PERMISSIONS.CUSTOMER_READ,
      PERMISSIONS.CUSTOMER_UPDATE,
      PERMISSIONS.CUSTOMER_360,
      PERMISSIONS.PORTFOLIO_READ,
      PERMISSIONS.PORTFOLIO_MANAGE,
      PERMISSIONS.TASK_CREATE,
      PERMISSIONS.TASK_READ,
      PERMISSIONS.TASK_UPDATE,
      PERMISSIONS.REPORT_VIEW,
      PERMISSIONS.REPORT_GENERATE,
    ]
  },
  {
    id: 'supervisor',
    name: 'Branch Supervisor',
    description: 'Monitors team performance and manages branch operations',
    level: 3,
    permissions: [
      PERMISSIONS.LEAD_CREATE,
      PERMISSIONS.LEAD_READ,
      PERMISSIONS.LEAD_UPDATE,
      PERMISSIONS.LEAD_DELETE,
      PERMISSIONS.LEAD_ASSIGN,
      PERMISSIONS.TASK_CREATE,
      PERMISSIONS.TASK_READ,
      PERMISSIONS.TASK_UPDATE,
      PERMISSIONS.TASK_DELETE,
      PERMISSIONS.CUSTOMER_READ,
      PERMISSIONS.CUSTOMER_UPDATE,
      PERMISSIONS.CUSTOMER_360,
      PERMISSIONS.PORTFOLIO_READ,
      PERMISSIONS.PORTFOLIO_MANAGE,
      PERMISSIONS.REPORT_VIEW,
      PERMISSIONS.REPORT_GENERATE,
      PERMISSIONS.USER_MANAGE,
      PERMISSIONS.USER_VIEW,
    ]
  },
  {
    id: 'admin_mis_officer',
    name: 'Admin/MIS Officer',
    description: 'System configuration and reporting oversight',
    level: 4,
    permissions: [
      PERMISSIONS.LEAD_CREATE,
      PERMISSIONS.LEAD_READ,
      PERMISSIONS.LEAD_UPDATE,
      PERMISSIONS.LEAD_DELETE,
      PERMISSIONS.LEAD_ASSIGN,
      PERMISSIONS.TASK_CREATE,
      PERMISSIONS.TASK_READ,
      PERMISSIONS.TASK_UPDATE,
      PERMISSIONS.TASK_DELETE,
      PERMISSIONS.CUSTOMER_READ,
      PERMISSIONS.CUSTOMER_UPDATE,
      PERMISSIONS.CUSTOMER_360,
      PERMISSIONS.PORTFOLIO_READ,
      PERMISSIONS.PORTFOLIO_MANAGE,
      PERMISSIONS.REPORT_VIEW,
      PERMISSIONS.REPORT_GENERATE,
      PERMISSIONS.USER_MANAGE,
      PERMISSIONS.USER_VIEW,
      PERMISSIONS.SYSTEM_CONFIG,
      PERMISSIONS.RULES_MANAGE,
    ]
  }
];
