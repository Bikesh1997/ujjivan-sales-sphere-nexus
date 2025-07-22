// OmniFlow API Service for Ujjivan Banking CRM
export interface OmniFlowConfig {
  baseUrl: string;
  apiKey: string;
  tenantId: string;
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: 'onboarding' | 'kyc' | 'loan_processing' | 'document_verification' | 'approval';
  requiredFields: string[];
  estimatedDuration: number; // in minutes
}

export interface WorkflowInstance {
  id: string;
  templateId: string;
  customerId?: string;
  leadId?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed' | 'cancelled';
  currentStep: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  data: Record<string, any>;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

export interface WorkflowStep {
  id: string;
  name: string;
  type: 'form' | 'approval' | 'document_upload' | 'verification' | 'api_call';
  status: 'pending' | 'completed' | 'failed';
  assignedRole?: string;
  data?: Record<string, any>;
}

export interface WorkflowEvent {
  id: string;
  workflowId: string;
  type: 'started' | 'step_completed' | 'completed' | 'failed' | 'escalated';
  timestamp: string;
  data: Record<string, any>;
}

class OmniFlowService {
  private config: OmniFlowConfig | null = null;
  private eventListeners: Map<string, ((event: WorkflowEvent) => void)[]> = new Map();

  constructor() {
    // Initialize with localStorage config if available
    this.loadConfig();
  }

  // Configuration Management
  configure(config: OmniFlowConfig) {
    this.config = config;
    localStorage.setItem('omniflow_config', JSON.stringify(config));
  }

  private loadConfig() {
    const stored = localStorage.getItem('omniflow_config');
    if (stored) {
      this.config = JSON.parse(stored);
    }
  }

  private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    if (!this.config) {
      throw new Error('OmniFlow not configured. Please set API credentials.');
    }

    const url = `${this.config.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.config.apiKey}`,
      'X-Tenant-ID': this.config.tenantId,
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new Error(`OmniFlow API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('OmniFlow API Request failed:', error);
      throw error;
    }
  }

  // Workflow Templates
  async getWorkflowTemplates(): Promise<WorkflowTemplate[]> {
    return this.makeRequest<WorkflowTemplate[]>('/api/v1/workflows/templates');
  }

  async getWorkflowTemplate(templateId: string): Promise<WorkflowTemplate> {
    return this.makeRequest<WorkflowTemplate>(`/api/v1/workflows/templates/${templateId}`);
  }

  // Workflow Instances
  async createWorkflowInstance(templateId: string, data: Record<string, any>): Promise<WorkflowInstance> {
    return this.makeRequest<WorkflowInstance>('/api/v1/workflows/instances', {
      method: 'POST',
      body: JSON.stringify({
        templateId,
        data,
        createdBy: this.getCurrentUserId(),
      }),
    });
  }

  async getWorkflowInstance(instanceId: string): Promise<WorkflowInstance> {
    return this.makeRequest<WorkflowInstance>(`/api/v1/workflows/instances/${instanceId}`);
  }

  async getWorkflowInstances(filters?: {
    status?: string;
    assignedTo?: string;
    customerId?: string;
    leadId?: string;
  }): Promise<WorkflowInstance[]> {
    const queryParams = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });
    }
    
    const endpoint = `/api/v1/workflows/instances${queryParams.toString() ? `?${queryParams}` : ''}`;
    return this.makeRequest<WorkflowInstance[]>(endpoint);
  }

  async updateWorkflowInstance(instanceId: string, updates: Partial<WorkflowInstance>): Promise<WorkflowInstance> {
    return this.makeRequest<WorkflowInstance>(`/api/v1/workflows/instances/${instanceId}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  }

  // Workflow Steps
  async getWorkflowSteps(instanceId: string): Promise<WorkflowStep[]> {
    return this.makeRequest<WorkflowStep[]>(`/api/v1/workflows/instances/${instanceId}/steps`);
  }

  async completeWorkflowStep(instanceId: string, stepId: string, data: Record<string, any>): Promise<WorkflowStep> {
    return this.makeRequest<WorkflowStep>(`/api/v1/workflows/instances/${instanceId}/steps/${stepId}/complete`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async assignWorkflowStep(instanceId: string, stepId: string, assignedTo: string): Promise<WorkflowStep> {
    return this.makeRequest<WorkflowStep>(`/api/v1/workflows/instances/${instanceId}/steps/${stepId}/assign`, {
      method: 'POST',
      body: JSON.stringify({ assignedTo }),
    });
  }

  // Banking-specific Workflow Helpers
  async startCustomerOnboarding(customerData: {
    name: string;
    email: string;
    phone: string;
    accountType: string;
    branch: string;
  }): Promise<WorkflowInstance> {
    return this.createWorkflowInstance('customer-onboarding', customerData);
  }

  async startKYCProcess(customerId: string, kycData: {
    documentType: string;
    documentNumber: string;
    address: Record<string, any>;
  }): Promise<WorkflowInstance> {
    return this.createWorkflowInstance('kyc-verification', {
      customerId,
      ...kycData,
    });
  }

  async startLoanApplication(applicationData: {
    customerId: string;
    loanType: string;
    amount: number;
    purpose: string;
    documents: string[];
  }): Promise<WorkflowInstance> {
    return this.createWorkflowInstance('loan-processing', applicationData);
  }

  async startDocumentVerification(verificationData: {
    customerId: string;
    workflowId: string;
    documents: Array<{
      type: string;
      url: string;
      metadata?: Record<string, any>;
    }>;
  }): Promise<WorkflowInstance> {
    return this.createWorkflowInstance('document-verification', verificationData);
  }

  // Event Management
  addEventListener(eventType: string, callback: (event: WorkflowEvent) => void) {
    if (!this.eventListeners.has(eventType)) {
      this.eventListeners.set(eventType, []);
    }
    this.eventListeners.get(eventType)!.push(callback);
  }

  removeEventListener(eventType: string, callback: (event: WorkflowEvent) => void) {
    const listeners = this.eventListeners.get(eventType);
    if (listeners) {
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  // Webhook receiver (for real-time updates)
  handleWebhookEvent(event: WorkflowEvent) {
    const listeners = this.eventListeners.get(event.type) || [];
    const allListeners = this.eventListeners.get('*') || [];
    
    [...listeners, ...allListeners].forEach(callback => {
      try {
        callback(event);
      } catch (error) {
        console.error('Error in workflow event listener:', error);
      }
    });
  }

  // Role-based Access Control
  async getAccessibleWorkflows(userRole: string): Promise<WorkflowTemplate[]> {
    const templates = await this.getWorkflowTemplates();
    
    // Filter workflows based on role permissions
    const rolePermissions: Record<string, string[]> = {
      'sales_executive': ['onboarding', 'kyc'],
      'relationship_manager': ['onboarding', 'kyc', 'loan_processing'],
      'supervisor': ['onboarding', 'kyc', 'loan_processing', 'approval'],
      'admin': ['onboarding', 'kyc', 'loan_processing', 'document_verification', 'approval'],
    };

    const allowedCategories = rolePermissions[userRole] || [];
    return templates.filter(template => allowedCategories.includes(template.category));
  }

  // Utility Methods
  private getCurrentUserId(): string {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).id : 'anonymous';
  }

  async getWorkflowMetrics(dateRange?: { from: string; to: string }) {
    const params = dateRange ? 
      `?from=${dateRange.from}&to=${dateRange.to}` : '';
    
    return this.makeRequest<{
      totalWorkflows: number;
      completedWorkflows: number;
      averageCompletionTime: number;
      workflowsByStatus: Record<string, number>;
      workflowsByCategory: Record<string, number>;
    }>(`/api/v1/workflows/metrics${params}`);
  }

  // Error Recovery
  async retryFailedWorkflow(instanceId: string): Promise<WorkflowInstance> {
    return this.makeRequest<WorkflowInstance>(`/api/v1/workflows/instances/${instanceId}/retry`, {
      method: 'POST',
    });
  }

  async escalateWorkflow(instanceId: string, reason: string): Promise<WorkflowInstance> {
    return this.makeRequest<WorkflowInstance>(`/api/v1/workflows/instances/${instanceId}/escalate`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  }
}

// Singleton instance
export const omniFlowService = new OmniFlowService();
export default omniFlowService;