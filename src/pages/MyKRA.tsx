
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Target, 
  TrendingUp, 
  Award, 
  Plus,
  Settings,
  Calculator,
  Users,
  Briefcase,
  Percent,
  Hash,
  IndianRupee
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import KRASetupModal from '@/components/kra/KRASetupModal';
import IncentiveSimulator from '@/components/kra/IncentiveSimulator';

interface KRA {
  id: string;
  name: string;
  type: 'numeric' | 'percentage';
  weightage: number;
  target: number;
  achieved: number;
  threshold: {
    red: number;
    amber: number;
    green: number;
  };
}

const MyKRA = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);

  // Sample KRA data for field sales executive
  const [kras] = useState<KRA[]>([
    {
      id: '1',
      name: 'Customer Visits',
      type: 'numeric',
      weightage: 30,
      target: 100,
      achieved: 85,
      threshold: { red: 70, amber: 85, green: 90 }
    },
    {
      id: '2',
      name: 'SHGs Created',
      type: 'numeric',
      weightage: 40,
      target: 20,
      achieved: 18,
      threshold: { red: 14, amber: 17, green: 18 }
    },
    {
      id: '3',
      name: 'Conversion Rate',
      type: 'percentage',
      weightage: 20,
      target: 25,
      achieved: 28,
      threshold: { red: 17.5, amber: 22.5, green: 22.5 }
    },
    {
      id: '4',
      name: 'Fixed Deposits',
      type: 'numeric',
      weightage: 10,
      target: 15,
      achieved: 12,
      threshold: { red: 10.5, amber: 13.5, green: 13.5 }
    }
  ]);

  const getPerformanceColor = (achieved: number, target: number, threshold: any) => {
    const percentage = (achieved / target) * 100;
    if (percentage >= threshold.green) return { color: 'bg-green-100 text-green-800', status: 'Green' };
    if (percentage >= threshold.amber) return { color: 'bg-yellow-100 text-yellow-800', status: 'Amber' };
    return { color: 'bg-red-100 text-red-800', status: 'Red' };
  };

  const calculateOverallScore = () => {
    let totalScore = 0;
    kras.forEach(kra => {
      const achievement = Math.min((kra.achieved / kra.target) * 100, 100);
      totalScore += (achievement * kra.weightage) / 100;
    });
    return Math.round(totalScore);
  };

  const getIncentiveEligibility = () => {
    const overallScore = calculateOverallScore();
    if (overallScore >= 100) return { amount: 5000, tier: '100%' };
    if (overallScore >= 90) return { amount: 2000, tier: '90%' };
    if (overallScore >= 80) return { amount: 1000, tier: '80%' };
    return { amount: 0, tier: 'Below 80%' };
  };

  if (user?.role !== 'sales_executive' || user?.department !== 'field') {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Target size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Access Restricted</h3>
            <p className="text-gray-600">My KRA is only available for Field Sales Executives</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const overallScore = calculateOverallScore();
  const incentive = getIncentiveEligibility();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My KRA Dashboard</h1>
          <p className="text-gray-600">Key Result Areas - Field Sales Executive</p>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsSimulatorOpen(true)}
          >
            <Calculator size={16} className="mr-2" />
            Simulate
          </Button>
          <Button 
            size="sm" 
            className="bg-teal-600 hover:bg-teal-700"
            onClick={() => setIsSetupModalOpen(true)}
          >
            <Settings size={16} className="mr-2" />
            Configure KRA
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Overall Score</p>
                <p className="text-2xl font-bold text-gray-900">{overallScore}%</p>
              </div>
              <Target size={32} className="text-teal-500" />
            </div>
            <Progress value={overallScore} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Incentive Eligible</p>
                <p className="text-2xl font-bold text-gray-900">₹{incentive.amount}</p>
                <p className="text-xs text-gray-500">{incentive.tier} tier</p>
              </div>
              <IndianRupee size={32} className="text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active KRAs</p>
                <p className="text-2xl font-bold text-gray-900">{kras.length}</p>
              </div>
              <Briefcase size={32} className="text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Green KRAs</p>
                <p className="text-2xl font-bold text-gray-900">
                  {kras.filter(kra => getPerformanceColor(kra.achieved, kra.target, kra.threshold).status === 'Green').length}
                </p>
              </div>
              <Award size={32} className="text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* KRA Details */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">KRA Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance Details</TabsTrigger>
          <TabsTrigger value="incentives">Incentive Structure</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {kras.map((kra) => {
              const performance = getPerformanceColor(kra.achieved, kra.target, kra.threshold);
              const achievementPercentage = Math.min((kra.achieved / kra.target) * 100, 100);
              
              return (
                <Card key={kra.id}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{kra.name}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          {kra.type === 'numeric' ? <Hash size={14} /> : <Percent size={14} />}
                          <span className="text-sm text-gray-500 capitalize">{kra.type}</span>
                          <Badge variant="outline">{kra.weightage}% weight</Badge>
                        </div>
                      </div>
                      <Badge className={performance.color}>
                        {performance.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{kra.achieved} / {kra.target}</span>
                      </div>
                      <Progress value={achievementPercentage} />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Red: &lt;{kra.threshold.red}</span>
                        <span>Amber: {kra.threshold.red}-{kra.threshold.amber}</span>
                        <span>Green: &gt;{kra.threshold.green}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {kras.map((kra) => {
                  const achievementPercentage = Math.min((kra.achieved / kra.target) * 100, 100);
                  const weightedScore = (achievementPercentage * kra.weightage) / 100;
                  
                  return (
                    <div key={kra.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{kra.name}</h4>
                        <span className="text-sm text-gray-500">{kra.weightage}% weightage</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Achievement:</span>
                          <div className="font-medium">{achievementPercentage.toFixed(1)}%</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Weighted Score:</span>
                          <div className="font-medium">{weightedScore.toFixed(1)}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Status:</span>
                          <div className="font-medium">
                            {getPerformanceColor(kra.achieved, kra.target, kra.threshold).status}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="incentives" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Incentive Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">₹5,000</div>
                    <div className="text-sm text-gray-500">100% Target Achievement</div>
                    <Badge className="mt-2 bg-green-100 text-green-800">Premium Tier</Badge>
                  </div>
                  <div className="border rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">₹2,000</div>
                    <div className="text-sm text-gray-500">90% Target Achievement</div>
                    <Badge className="mt-2 bg-blue-100 text-blue-800">Standard Tier</Badge>
                  </div>
                  <div className="border rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-600">₹1,000</div>
                    <div className="text-sm text-gray-500">80% Target Achievement</div>
                    <Badge className="mt-2 bg-yellow-100 text-yellow-800">Basic Tier</Badge>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium mb-3">Special Incentives</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span>Complete 90% SHG target</span>
                      <span className="font-medium text-green-600">₹2,000 bonus</span>
                    </div>
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span>100% Customer Visit compliance</span>
                      <span className="font-medium text-blue-600">₹1,500 bonus</span>
                    </div>
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span>Exceed conversion rate by 5%</span>
                      <span className="font-medium text-purple-600">₹1,000 bonus</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <KRASetupModal 
        isOpen={isSetupModalOpen}
        onClose={() => setIsSetupModalOpen(false)}
      />
      
      <IncentiveSimulator 
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
        kras={kras}
      />
    </div>
  );
};

export default MyKRA;
