import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import OmniFlowConfiguration from '@/components/omniflow/OmniFlowConfiguration';
import WorkflowDashboard from '@/components/omniflow/WorkflowDashboard';
import WorkflowWidget from '@/components/omniflow/WorkflowWidget';
import { Settings, Workflow, Play, BarChart3 } from 'lucide-react';

const WorkflowManagement: React.FC = () => {
  const [isConfigured, setIsConfigured] = useState(false);
  const { user } = useAuth();

  // Check if OmniFlow is already configured
  React.useEffect(() => {
    const config = localStorage.getItem('omniflow_config');
    setIsConfigured(!!config);
  }, []);

  const handleConfigured = () => {
    setIsConfigured(true);
  };

  if (!isConfigured) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Workflow size={24} />
          <h1 className="text-2xl font-bold">Workflow Management</h1>
        </div>
        
        <div className="max-w-2xl">
          <OmniFlowConfiguration onConfigured={handleConfigured} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Workflow size={24} />
          <h1 className="text-2xl font-bold">Workflow Management</h1>
        </div>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList>
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart3 size={16} />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="workflows" className="flex items-center gap-2">
            <Play size={16} />
            Start Workflows
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings size={16} />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <WorkflowDashboard />
        </TabsContent>

        <TabsContent value="workflows">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Available Workflows</h2>
              <p className="text-gray-600 mb-6">
                Start automated workflows for various banking processes. Each workflow guides you through
                the required steps and ensures compliance with banking regulations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <WorkflowWidget type="customer_onboarding" />
              <WorkflowWidget type="kyc_verification" />
              <WorkflowWidget type="loan_application" />
              <WorkflowWidget type="document_verification" />
            </div>

            {/* Role-specific workflows */}
            {user?.role === 'relationship_manager' && (
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Relationship Manager Workflows</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Portfolio Review</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">
                        Systematic review of customer portfolio and relationship enhancement
                      </p>
                      <WorkflowWidget type="customer_onboarding" compact />
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Cross-sell Opportunity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">
                        Identify and process cross-selling opportunities
                      </p>
                      <WorkflowWidget type="loan_application" compact />
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {user?.role === 'supervisor' && (
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Supervisor Workflows</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Team Performance Review</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">
                        Comprehensive team performance evaluation and feedback
                      </p>
                      <WorkflowWidget type="document_verification" compact />
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Approval Workflows</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">
                        Review and approve pending transactions and applications
                      </p>
                      <WorkflowWidget type="loan_application" compact />
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <div className="max-w-2xl">
            <OmniFlowConfiguration onConfigured={handleConfigured} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkflowManagement;