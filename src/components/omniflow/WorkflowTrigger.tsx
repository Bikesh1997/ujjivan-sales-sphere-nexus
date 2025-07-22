import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Play, Workflow } from 'lucide-react';
import WorkflowWidget from './WorkflowWidget';

interface WorkflowTriggerProps {
  leadId?: string;
  customerId?: string;
  context: 'lead_detail' | 'customer_detail' | 'dashboard';
  compact?: boolean;
}

const WorkflowTrigger: React.FC<WorkflowTriggerProps> = ({ 
  leadId, 
  customerId, 
  context, 
  compact = false 
}) => {
  const { toast } = useToast();

  const getRecommendedWorkflows = () => {
    if (context === 'lead_detail') {
      return [
        { type: 'customer_onboarding' as const, priority: 'high' },
        { type: 'kyc_verification' as const, priority: 'medium' }
      ];
    }
    
    if (context === 'customer_detail') {
      return [
        { type: 'kyc_verification' as const, priority: 'high' },
        { type: 'loan_application' as const, priority: 'medium' },
        { type: 'document_verification' as const, priority: 'low' }
      ];
    }
    
    return [
      { type: 'customer_onboarding' as const, priority: 'high' }
    ];
  };

  const workflows = getRecommendedWorkflows();

  if (compact) {
    return (
      <div className="flex gap-2">
        {workflows.slice(0, 2).map((workflow, index) => (
          <WorkflowWidget
            key={index}
            type={workflow.type}
            customerId={customerId}
            leadId={leadId}
            compact
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Workflow size={20} />
        <h3 className="font-medium">Recommended Workflows</h3>
      </div>
      
      <div className="grid gap-3">
        {workflows.map((workflow, index) => {
          const priorityColors = {
            high: 'bg-red-100 text-red-700',
            medium: 'bg-yellow-100 text-yellow-700',
            low: 'bg-green-100 text-green-700'
          };

          return (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Play size={16} className="text-blue-600" />
                <div>
                  <p className="font-medium capitalize">
                    {workflow.type.replace('_', ' ')}
                  </p>
                  <p className="text-sm text-gray-600">
                    {workflow.type === 'customer_onboarding' && 'Complete customer registration and account setup'}
                    {workflow.type === 'kyc_verification' && 'Verify customer identity and documents'}
                    {workflow.type === 'loan_application' && 'Process loan application and approval'}
                    {workflow.type === 'document_verification' && 'Verify submitted documents'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge className={priorityColors[workflow.priority]}>
                  {workflow.priority}
                </Badge>
                <WorkflowWidget
                  type={workflow.type}
                  customerId={customerId}
                  leadId={leadId}
                  compact
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkflowTrigger;