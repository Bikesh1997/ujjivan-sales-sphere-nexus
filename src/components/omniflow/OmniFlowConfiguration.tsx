import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Settings, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import omniFlowService, { OmniFlowConfig } from '@/services/omniflowService';

interface OmniFlowConfigurationProps {
  onConfigured?: () => void;
}

const OmniFlowConfiguration: React.FC<OmniFlowConfigurationProps> = ({ onConfigured }) => {
  const [config, setConfig] = useState<Partial<OmniFlowConfig>>({
    baseUrl: '',
    apiKey: '',
    tenantId: '',
  });
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if already configured
    const stored = localStorage.getItem('omniflow_config');
    if (stored) {
      const storedConfig = JSON.parse(stored);
      setConfig(storedConfig);
      testConnection(storedConfig);
    }
  }, []);

  const testConnection = async (testConfig: OmniFlowConfig) => {
    setIsConnecting(true);
    setConnectionError(null);

    try {
      omniFlowService.configure(testConfig);
      // Test the connection by fetching workflow templates
      await omniFlowService.getWorkflowTemplates();
      setIsConnected(true);
      toast({
        title: "OmniFlow Connected",
        description: "Successfully connected to OmniFlow workflow engine",
      });
      onConfigured?.();
    } catch (error) {
      setIsConnected(false);
      const errorMessage = error instanceof Error ? error.message : 'Connection failed';
      setConnectionError(errorMessage);
      toast({
        title: "Connection Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleConnect = async () => {
    if (!config.baseUrl || !config.apiKey || !config.tenantId) {
      toast({
        title: "Missing Configuration",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    await testConnection(config as OmniFlowConfig);
  };

  const handleDisconnect = () => {
    localStorage.removeItem('omniflow_config');
    setConfig({ baseUrl: '', apiKey: '', tenantId: '' });
    setIsConnected(false);
    setConnectionError(null);
    
    toast({
      title: "Disconnected",
      description: "OmniFlow configuration has been removed",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings size={20} />
          OmniFlow Configuration
          {isConnected && (
            <Badge variant="default" className="bg-green-100 text-green-700">
              <CheckCircle size={12} className="mr-1" />
              Connected
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isConnected && (
          <Alert>
            <AlertCircle size={16} />
            <AlertDescription>
              Configure OmniFlow to enable workflow automation for customer onboarding, 
              KYC processing, loan applications, and document verification.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <div>
            <Label htmlFor="baseUrl">OmniFlow Base URL</Label>
            <Input
              id="baseUrl"
              placeholder="https://your-omniflow-instance.com"
              value={config.baseUrl}
              onChange={(e) => setConfig(prev => ({ ...prev, baseUrl: e.target.value }))}
              disabled={isConnected}
            />
          </div>

          <div>
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Enter your OmniFlow API key"
              value={config.apiKey}
              onChange={(e) => setConfig(prev => ({ ...prev, apiKey: e.target.value }))}
              disabled={isConnected}
            />
          </div>

          <div>
            <Label htmlFor="tenantId">Tenant ID</Label>
            <Input
              id="tenantId"
              placeholder="your-tenant-id"
              value={config.tenantId}
              onChange={(e) => setConfig(prev => ({ ...prev, tenantId: e.target.value }))}
              disabled={isConnected}
            />
          </div>

          {connectionError && (
            <Alert variant="destructive">
              <AlertCircle size={16} />
              <AlertDescription>{connectionError}</AlertDescription>
            </Alert>
          )}

          <div className="flex gap-2">
            {!isConnected ? (
              <Button 
                onClick={handleConnect} 
                disabled={isConnecting}
                className="flex items-center gap-2"
              >
                {isConnecting ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <CheckCircle size={16} />
                )}
                {isConnecting ? 'Connecting...' : 'Connect to OmniFlow'}
              </Button>
            ) : (
              <Button 
                variant="destructive" 
                onClick={handleDisconnect}
                className="flex items-center gap-2"
              >
                Disconnect
              </Button>
            )}
          </div>
        </div>

        {isConnected && (
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2">Available Workflows</h4>
            <p className="text-sm text-green-700">
              OmniFlow is now configured and ready to automate your banking workflows:
            </p>
            <ul className="text-sm text-green-700 mt-2 space-y-1">
              <li>• Customer Onboarding</li>
              <li>• KYC Verification</li>
              <li>• Loan Processing</li>
              <li>• Document Verification</li>
              <li>• Approval Workflows</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OmniFlowConfiguration;