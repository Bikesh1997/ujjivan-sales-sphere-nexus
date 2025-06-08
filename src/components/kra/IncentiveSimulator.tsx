
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Calculator, IndianRupee, TrendingUp, Target } from 'lucide-react';

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

interface IncentiveSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
  kras: KRA[];
}

const IncentiveSimulator = ({ isOpen, onClose, kras }: IncentiveSimulatorProps) => {
  const [simulatedValues, setSimulatedValues] = useState<Record<string, number>>(
    kras.reduce((acc, kra) => ({ ...acc, [kra.id]: kra.achieved }), {})
  );

  const calculateSimulatedScore = () => {
    let totalScore = 0;
    kras.forEach(kra => {
      const achieved = simulatedValues[kra.id] || 0;
      const achievement = Math.min((achieved / kra.target) * 100, 100);
      totalScore += (achievement * kra.weightage) / 100;
    });
    return Math.round(totalScore);
  };

  const getSimulatedIncentive = () => {
    const score = calculateSimulatedScore();
    if (score >= 100) return { amount: 5000, tier: '100%', bonus: 0 };
    if (score >= 90) return { amount: 2000, tier: '90%', bonus: getBonusAmount() };
    if (score >= 80) return { amount: 1000, tier: '80%', bonus: getBonusAmount() };
    return { amount: 0, tier: 'Below 80%', bonus: 0 };
  };

  const getBonusAmount = () => {
    let bonus = 0;
    
    // SHG bonus
    const shgKRA = kras.find(k => k.name.toLowerCase().includes('shg'));
    if (shgKRA) {
      const shgAchievement = (simulatedValues[shgKRA.id] / shgKRA.target) * 100;
      if (shgAchievement >= 90) bonus += 2000;
    }

    // Customer visits bonus
    const visitsKRA = kras.find(k => k.name.toLowerCase().includes('visit'));
    if (visitsKRA) {
      const visitsAchievement = (simulatedValues[visitsKRA.id] / visitsKRA.target) * 100;
      if (visitsAchievement >= 100) bonus += 1500;
    }

    // Conversion rate bonus
    const conversionKRA = kras.find(k => k.name.toLowerCase().includes('conversion'));
    if (conversionKRA) {
      const conversionAchievement = (simulatedValues[conversionKRA.id] / conversionKRA.target) * 100;
      if (conversionAchievement >= 105) bonus += 1000;
    }

    return bonus;
  };

  const handleValueChange = (kraId: string, value: number) => {
    setSimulatedValues(prev => ({ ...prev, [kraId]: value }));
  };

  const resetToActual = () => {
    setSimulatedValues(kras.reduce((acc, kra) => ({ ...acc, [kra.id]: kra.achieved }), {}));
  };

  const simulatedScore = calculateSimulatedScore();
  const incentive = getSimulatedIncentive();
  const totalEarnings = incentive.amount + incentive.bonus;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Calculator size={20} className="mr-2" />
            Incentive Simulator
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Simulation Controls */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Simulate Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {kras.map((kra) => {
                  const currentValue = simulatedValues[kra.id] || 0;
                  const achievementPercentage = (currentValue / kra.target) * 100;
                  
                  return (
                    <div key={kra.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label className="text-sm font-medium">{kra.name}</Label>
                        <Badge variant="outline">
                          {achievementPercentage.toFixed(1)}%
                        </Badge>
                      </div>
                      <div className="px-3">
                        <Slider
                          value={[currentValue]}
                          onValueChange={(value) => handleValueChange(kra.id, value[0])}
                          max={kra.target * 1.5}
                          step={1}
                          className="w-full"
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>0</span>
                        <span className="font-medium">
                          {currentValue} / {kra.target}
                        </span>
                        <span>{Math.round(kra.target * 1.5)}</span>
                      </div>
                    </div>
                  );
                })}
                
                <Button variant="outline" onClick={resetToActual} className="w-full mt-4">
                  Reset to Actual Values
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="space-y-4">
            {/* Score Display */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Simulated Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-teal-600 mb-2">
                    {simulatedScore}%
                  </div>
                  <div className="text-sm text-gray-600">Overall Score</div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-xl font-bold text-blue-600">₹{incentive.amount}</div>
                    <div className="text-sm text-blue-800">Base Incentive</div>
                    <div className="text-xs text-gray-600">{incentive.tier} tier</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-xl font-bold text-green-600">₹{incentive.bonus}</div>
                    <div className="text-sm text-green-800">Bonus Amount</div>
                    <div className="text-xs text-gray-600">Special rewards</div>
                  </div>
                </div>

                <div className="text-center p-4 bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg border-2 border-teal-200">
                  <div className="flex items-center justify-center mb-2">
                    <IndianRupee className="text-teal-600 mr-1" size={20} />
                    <span className="text-2xl font-bold text-teal-800">₹{totalEarnings}</span>
                  </div>
                  <div className="text-sm text-teal-700 font-medium">Total Earnings</div>
                </div>
              </CardContent>
            </Card>

            {/* Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Performance Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {kras.map((kra) => {
                    const currentValue = simulatedValues[kra.id] || 0;
                    const achievementPercentage = (currentValue / kra.target) * 100;
                    const weightedScore = (Math.min(achievementPercentage, 100) * kra.weightage) / 100;
                    
                    return (
                      <div key={kra.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <div>
                          <div className="font-medium text-sm">{kra.name}</div>
                          <div className="text-xs text-gray-500">
                            {currentValue} / {kra.target} ({achievementPercentage.toFixed(1)}%)
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-sm">
                            {weightedScore.toFixed(1)} pts
                          </div>
                          <div className="text-xs text-gray-500">
                            {kra.weightage}% weight
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IncentiveSimulator;
