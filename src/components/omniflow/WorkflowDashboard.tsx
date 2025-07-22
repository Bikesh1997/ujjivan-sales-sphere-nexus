import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Play, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Search, 
  Filter,
  MoreVertical,
  User,
  Calendar
} from 'lucide-react';
import omniFlowService, { WorkflowInstance, WorkflowTemplate } from '@/services/omniflowService';

const WorkflowDashboard: React.FC = () => {
  const [workflows, setWorkflows] = useState<WorkflowInstance[]>([]);
  const [templates, setTemplates] = useState<WorkflowTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    loadWorkflows();
    loadTemplates();
  }, []);

  const loadWorkflows = async () => {
    try {
      const workflowData = await omniFlowService.getWorkflowInstances({
        assignedTo: user?.role === 'supervisor' ? undefined : user?.id,
      });
      setWorkflows(workflowData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load workflows",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadTemplates = async () => {
    try {
      const templateData = await omniFlowService.getAccessibleWorkflows(user?.role || '');
      setTemplates(templateData);
    } catch (error) {
      console.error('Failed to load templates:', error);
    }
  };

  const startWorkflow = async (templateId: string) => {
    try {
      await omniFlowService.createWorkflowInstance(templateId, {
        initiatedBy: user?.id,
        branch: user?.branch,
      });
      
      toast({
        title: "Workflow Started",
        description: "Workflow has been successfully initiated",
      });
      
      loadWorkflows(); // Refresh the list
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start workflow",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'in_progress':
        return 'bg-blue-100 text-blue-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'failed':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} />;
      case 'in_progress':
        return <Clock size={16} />;
      case 'pending':
        return <Clock size={16} />;
      case 'failed':
        return <AlertCircle size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const filteredWorkflows = workflows.filter(workflow => {
    const matchesSearch = workflow.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workflow.currentStep.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || workflow.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || 
                           templates.find(t => t.id === workflow.templateId)?.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Workflow Dashboard</h1>
          <p className="text-gray-600">Manage and monitor your banking workflows</p>
        </div>
        
        {/* Quick Start Workflows */}
        <div className="flex gap-2 flex-wrap">
          {templates.slice(0, 3).map(template => (
            <Button
              key={template.id}
              size="sm"
              onClick={() => startWorkflow(template.id)}
              className="flex items-center gap-2"
            >
              <Play size={14} />
              Start {template.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search workflows..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="onboarding">Onboarding</SelectItem>
                <SelectItem value="kyc">KYC</SelectItem>
                <SelectItem value="loan_processing">Loan Processing</SelectItem>
                <SelectItem value="document_verification">Document Verification</SelectItem>
                <SelectItem value="approval">Approval</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Workflow List */}
      <div className="grid gap-4">
        {filteredWorkflows.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-gray-500">
                {workflows.length === 0 ? (
                  <>
                    <h3 className="font-medium mb-2">No workflows yet</h3>
                    <p>Start a new workflow to begin automation</p>
                  </>
                ) : (
                  <>
                    <h3 className="font-medium mb-2">No workflows match your filters</h3>
                    <p>Try adjusting your search or filter criteria</p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredWorkflows.map(workflow => {
            const template = templates.find(t => t.id === workflow.templateId);
            return (
              <Card key={workflow.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium">{template?.name || 'Unknown Workflow'}</h3>
                        <Badge className={getStatusColor(workflow.status)}>
                          {getStatusIcon(workflow.status)}
                          <span className="ml-1 capitalize">{workflow.status.replace('_', ' ')}</span>
                        </Badge>
                        <Badge variant="outline" className={getPriorityColor(workflow.priority)}>
                          {workflow.priority}
                        </Badge>
                      </div>
                      
                      <div className="text-sm text-gray-600 space-y-1">
                        <div className="flex items-center gap-4">
                          <span>ID: {workflow.id}</span>
                          <span>Current Step: {workflow.currentStep}</span>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          {workflow.assignedTo && (
                            <span className="flex items-center gap-1">
                              <User size={14} />
                              Assigned to: {workflow.assignedTo}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            Created: {new Date(workflow.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      <Button size="sm" variant="ghost">
                        <MoreVertical size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default WorkflowDashboard;