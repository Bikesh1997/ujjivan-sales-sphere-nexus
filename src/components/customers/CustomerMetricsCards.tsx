
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Heart, Calendar } from 'lucide-react';

interface CustomerMetricsCardsProps {
  customer: {
    totalRelationship: string;
    relationshipValue: string;
    riskScore: string;
    lastInteraction: string;
  };
}

const CustomerMetricsCards = ({ customer }: CustomerMetricsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Relationship Value</p>
              <p className="text-xl font-bold text-gray-900">{customer.totalRelationship}</p>
              <Badge className="bg-green-100 text-green-800 mt-1">{customer.relationshipValue}</Badge>
            </div>
            <TrendingUp size={24} className="text-teal-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Risk Score</p>
              <p className="text-xl font-bold text-gray-900">{customer.riskScore}</p>
              <p className="text-xs text-gray-500 mt-1">Last updated: 3 days ago</p>
            </div>
            <Heart size={24} className="text-green-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Last Interaction</p>
              <p className="text-xl font-bold text-gray-900">{customer.lastInteraction}</p>
              <p className="text-xs text-gray-500 mt-1">Recent activity</p>
            </div>
            <Calendar size={24} className="text-orange-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerMetricsCards;
