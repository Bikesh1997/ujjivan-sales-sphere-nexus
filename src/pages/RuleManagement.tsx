
import RuleManagement from '@/components/supervisor/RuleManagement';

const RuleManagementPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Rule Management</h1>
          <p className="text-gray-600">Configure lead routing and assignment rules</p>
        </div>
      </div>
      <RuleManagement />
    </div>
  );
};

export default RuleManagementPage;
