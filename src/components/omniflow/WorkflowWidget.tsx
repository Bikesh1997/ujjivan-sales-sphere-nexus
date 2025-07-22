import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Play, 
  Clock, 
  FileText, 
  User, 
  DollarSign,
  CheckCircle,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import omniFlowService from '@/services/omniflowService';

interface WorkflowWidgetProps {
  type: 'customer_onboarding' | 'kyc_verification' | 'loan_application' | 'document_verification';
  customerId?: string;
  leadId?: string;
  compact?: boolean;
}

const WorkflowWidget: React.FC<WorkflowWidgetProps> = ({ 
  type, 
  customerId, 
  leadId, 
  compact = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const { user } = useAuth();
  const { toast } = useToast();

  const getWorkflowConfig = () => {
    switch (type) {
      case 'customer_onboarding':
        return {
          title: 'Customer Onboarding',
          description: 'Start complete customer onboarding process',
          icon: <User size={20} />,
          color: 'bg-blue-100 text-blue-700',
          fields: [
            { key: 'name', label: 'Full Name', type: 'text', required: true },
            { key: 'email', label: 'Email Address', type: 'email', required: true },
            { key: 'phone', label: 'Phone Number', type: 'tel', required: true },
            { key: 'accountType', label: 'Account Type', type: 'select', required: true, options: [
              'savings', 'current', 'fd', 'rd'
            ]},
            { key: 'branch', label: 'Preferred Branch', type: 'text', required: true },
            { key: 'initialDeposit', label: 'Initial Deposit Amount', type: 'number', required: false },
          ]
        };
      case 'kyc_verification':
        return {
          title: 'KYC Verification',
          description: 'Initiate Know Your Customer verification process',
          icon: <CheckCircle size={20} />,
          color: 'bg-green-100 text-green-700',
          fields: [
            { key: 'documentType', label: 'Document Type', type: 'select', required: true, options: [
              'aadhar', 'pan', 'passport', 'driving_license', 'voter_id'
            ]},
            { key: 'documentNumber', label: 'Document Number', type: 'text', required: true },
            { key: 'address', label: 'Current Address', type: 'textarea', required: true },
            { key: 'pincode', label: 'PIN Code', type: 'text', required: true },
            { key: 'occupation', label: 'Occupation', type: 'text', required: false },
            { key: 'annualIncome', label: 'Annual Income', type: 'number', required: false },
          ]
        };
      case 'loan_application':
        return {
          title: 'Loan Application',
          description: 'Process new loan application',
          icon: <DollarSign size={20} />,
          color: 'bg-purple-100 text-purple-700',
          fields: [
            { key: 'loanType', label: 'Loan Type', type: 'select', required: true, options: [
              'personal', 'home', 'vehicle', 'business', 'education'
            ]},
            { key: 'amount', label: 'Loan Amount', type: 'number', required: true },
            { key: 'tenure', label: 'Tenure (months)', type: 'number', required: true },
            { key: 'purpose', label: 'Purpose of Loan', type: 'textarea', required: true },
            { key: 'monthlyIncome', label: 'Monthly Income', type: 'number', required: true },
            { key: 'employmentType', label: 'Employment Type', type: 'select', required: true, options: [
              'salaried', 'self_employed', 'business', 'retired'
            ]},
          ]
        };
      case 'document_verification':
        return {
          title: 'Document Verification',
          description: 'Verify submitted documents',
          icon: <FileText size={20} />,
          color: 'bg-orange-100 text-orange-700',
          fields: [
            { key: 'documentCategory', label: 'Document Category', type: 'select', required: true, options: [
              'identity', 'address', 'income', 'bank_statement', 'other'
            ]},
            { key: 'verificationLevel', label: 'Verification Level', type: 'select', required: true, options: [
              'basic', 'enhanced', 'comprehensive'
            ]},
            { key: 'notes', label: 'Additional Notes', type: 'textarea', required: false },
          ]
        };
      default:
        return {
          title: 'Workflow',
          description: 'Start workflow process',
          icon: <Play size={20} />,
          color: 'bg-gray-100 text-gray-700',
          fields: []
        };
    }
  };

  const config = getWorkflowConfig();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const baseWorkflowData = {
        ...formData,
        customerId,
        leadId,
        initiatedBy: user?.id,
        branch: user?.branch,
        timestamp: new Date().toISOString(),
      };

      let workflow;
      switch (type) {
        case 'customer_onboarding':
          workflow = await omniFlowService.startCustomerOnboarding({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            accountType: formData.accountType,
            branch: formData.branch || user?.branch || '',
            ...baseWorkflowData,
          });
          break;
        case 'kyc_verification':
          workflow = await omniFlowService.startKYCProcess(customerId!, {
            documentType: formData.documentType,
            documentNumber: formData.documentNumber,
            address: {
              street: formData.address,
              pincode: formData.pincode,
            },
            ...baseWorkflowData,
          });
          break;
        case 'loan_application':
          workflow = await omniFlowService.startLoanApplication({
            customerId: customerId!,
            loanType: formData.loanType,
            amount: Number(formData.amount),
            purpose: formData.purpose,
            documents: [], // Will be populated later in the workflow
            ...baseWorkflowData,
          });
          break;
        case 'document_verification':
          workflow = await omniFlowService.startDocumentVerification({
            customerId: customerId!,
            workflowId: 'pending',
            documents: [], // Will be populated from file uploads
            ...baseWorkflowData,
          });
          break;
      }

      toast({
        title: "Workflow Started",
        description: `${config.title} workflow has been initiated successfully`,
      });

      setIsOpen(false);
      setFormData({});
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start workflow. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const renderField = (field: any) => {
    switch (field.type) {
      case 'select':
        return (
          <Select onValueChange={(value) => updateFormData(field.key, value)}>
            <SelectTrigger>
              <SelectValue placeholder={`Select ${field.label}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options.map((option: string) => (
                <SelectItem key={option} value={option}>
                  {option.replace('_', ' ').toUpperCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'textarea':
        return (
          <Textarea
            placeholder={field.label}
            value={formData[field.key] || ''}
            onChange={(e) => updateFormData(field.key, e.target.value)}
          />
        );
      default:
        return (
          <Input
            type={field.type}
            placeholder={field.label}
            value={formData[field.key] || ''}
            onChange={(e) => updateFormData(field.key, e.target.value)}
          />
        );
    }
  };

  if (compact) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button size="sm" variant="outline" className="flex items-center gap-2">
            {config.icon}
            Start {config.title}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{config.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {config.fields.map(field => (
              <div key={field.key}>
                <Label htmlFor={field.key}>{field.label}</Label>
                {renderField(field)}
              </div>
            ))}
            <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Starting...' : 'Start Workflow'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge className={config.color}>
                  {config.icon}
                </Badge>
                <span className="text-base">{config.title}</span>
              </div>
              <Play size={16} className="text-gray-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">{config.description}</p>
            <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Clock size={12} />
                Est. 15-30 min
              </span>
              <span>Click to start</span>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {config.icon}
            {config.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 max-h-96 overflow-y-auto">
          {config.fields.map(field => (
            <div key={field.key}>
              <Label htmlFor={field.key}>
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </Label>
              {renderField(field)}
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Starting Workflow...' : 'Start Workflow'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WorkflowWidget;