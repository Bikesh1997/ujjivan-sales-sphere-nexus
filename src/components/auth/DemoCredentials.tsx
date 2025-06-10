
import React from 'react';
import { Button } from '@/components/ui/button';

interface DemoCredentialsProps {
  onFillCredentials: (userType: 'admin' | 'sales2' | 'supervisor' | 'inbound' | 'relationship') => void;
  isLoading: boolean;
}

const DemoCredentials = ({ onFillCredentials, isLoading }: DemoCredentialsProps) => {
  return (
    <div className="mt-6 space-y-3">
      <div className="text-center text-sm text-gray-600 mb-3">
        Demo Accounts:
      </div>
      
      <div className="grid grid-cols-1 gap-2">
        <Button 
          variant="outline" 
          onClick={() => onFillCredentials('admin')}
          className="w-full text-xs h-10"
          disabled={isLoading}
        >
          Admin Demo
        </Button>
        <Button 
          variant="outline" 
          onClick={() => onFillCredentials('sales2')}
          className="w-full text-xs h-10"
          disabled={isLoading}
        >
          Sales Executive Demo (Anjali)
        </Button>
        <Button 
          variant="outline" 
          onClick={() => onFillCredentials('inbound')}
          className="w-full text-xs h-10"
          disabled={isLoading}
        >
          Inbound Agent Demo (Vikram)
        </Button>
        <Button 
          variant="outline" 
          onClick={() => onFillCredentials('relationship')}
          className="w-full text-xs h-10"
          disabled={isLoading}
        >
          Relationship Manager Demo (Neha)
        </Button>
        <Button 
          variant="outline" 
          onClick={() => onFillCredentials('supervisor')}
          className="w-full text-xs h-10"
          disabled={isLoading}
        >
          Supervisor Demo
        </Button>
      </div>
      
      <div className="text-center text-xs text-gray-500 mt-2">
        Password: password123
      </div>
    </div>
  );
};

export default DemoCredentials;
