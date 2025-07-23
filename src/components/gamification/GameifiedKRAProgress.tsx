import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Target, 
  Star, 
  Trophy, 
  Users, 
  Phone, 
  MapPin, 
  TrendingUp,
  Calendar,
  Award,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface KRAItem {
  id: string;
  title: string;
  target: number;
  current: number;
  xpReward: number;
  category: 'visits' | 'calls' | 'conversions' | 'meetings';
  icon: any;
  level: 'bronze' | 'silver' | 'gold' | 'platinum';
}

const GameifiedKRAProgress = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [showCelebration, setShowCelebration] = useState<string | null>(null);

  const kraItems: KRAItem[] = [
    {
      id: 'visits',
      title: 'Customer Visits 🏠',
      target: 20,
      current: 16,
      xpReward: 10,
      category: 'visits',
      icon: MapPin,
      level: 'gold'
    },
    {
      id: 'calls',
      title: 'Follow-up Calls 📞',
      target: 50,
      current: 42,
      xpReward: 5,
      category: 'calls',
      icon: Phone,
      level: 'silver'
    },
    {
      id: 'conversions',
      title: 'Lead Conversions 💰',
      target: 8,
      current: 6,
      xpReward: 25,
      category: 'conversions',
      icon: Target,
      level: 'platinum'
    },
    {
      id: 'meetings',
      title: 'SHG Meetings 👥',
      target: 5,
      current: 4,
      xpReward: 15,
      category: 'meetings',
      icon: Users,
      level: 'bronze'
    }
  ];

  const addProgress = (kraId: string, amount: number = 1) => {
    const kra = kraItems.find(k => k.id === kraId);
    if (!kra || kra.current >= kra.target) return;

    // Update progress
    kra.current = Math.min(kra.current + amount, kra.target);
    
    // Show celebration if completed
    if (kra.current === kra.target) {
      setShowCelebration(kraId);
      setTimeout(() => setShowCelebration(null), 2000);
    }

    toast({
      title: "🎯 Progress Updated!",
      description: `+${amount} ${kra.title.split(' ')[0]} • +${kra.xpReward * amount} XP earned!`,
    });
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'bronze': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'silver': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'gold': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'platinum': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'bronze': return '🥉';
      case 'silver': return '🥈';
      case 'gold': return '🥇';
      case 'platinum': return '💎';
      default: return '⭐';
    }
  };

  const getProgressColor = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage >= 100) return 'bg-green-500';
    if (percentage >= 75) return 'bg-blue-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  // Only show for Field Executives
  if (user?.role !== 'sales_executive') {
    return null;
  }

  const totalXP = kraItems.reduce((sum, kra) => sum + (kra.current * kra.xpReward), 0);
  const maxXP = kraItems.reduce((sum, kra) => sum + (kra.target * kra.xpReward), 0);
  const overallProgress = (totalXP / maxXP) * 100;

  return (
    <div className="space-y-6">
      {/* Overall Progress Header */}
      <Card className="bg-gradient-to-r from-green-500 to-blue-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">KRA Mission Control 🎯</h2>
              <p className="text-green-100">Track your key results and earn XP!</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{totalXP} XP</div>
              <div className="text-sm text-green-100">Total Earned</div>
            </div>
          </div>
          
          <div className="flex justify-between text-sm text-green-100 mb-2">
            <span>Overall KRA Progress</span>
            <span>{Math.round(overallProgress)}% Complete</span>
          </div>
          <Progress value={overallProgress} className="h-3 bg-green-400/30" />
          
          <div className="mt-4 grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-lg font-bold">{kraItems.filter(k => k.current >= k.target).length}</div>
              <div className="text-xs text-green-100">Missions Complete</div>
            </div>
            <div>
              <div className="text-lg font-bold">{maxXP - totalXP} XP</div>
              <div className="text-xs text-green-100">Remaining to Unlock</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KRA Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {kraItems.map((kra) => {
          const progressPercentage = (kra.current / kra.target) * 100;
          const isCompleted = kra.current >= kra.target;
          const isCelebrating = showCelebration === kra.id;
          
          return (
            <Card key={kra.id} className={`transition-all duration-300 ${isCelebrating ? 'animate-pulse ring-4 ring-yellow-400' : ''} ${isCompleted ? 'bg-green-50 border-green-200' : ''}`}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-lg">
                  <div className="flex items-center">
                    <kra.icon className="mr-2 h-5 w-5 text-blue-600" />
                    {kra.title}
                  </div>
                  <Badge className={getLevelColor(kra.level)}>
                    {getLevelIcon(kra.level)} {kra.level}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Progress Display */}
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">
                      {kra.current}<span className="text-lg text-gray-500">/{kra.target}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {isCompleted ? 'Mission Complete! 🎉' : `${kra.target - kra.current} remaining`}
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Progress</span>
                      <span>{Math.round(progressPercentage)}%</span>
                    </div>
                    <Progress 
                      value={progressPercentage} 
                      className="h-3"
                    />
                  </div>
                  
                  {/* XP Info */}
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-2" />
                      <span className="text-sm font-medium">XP Earned</span>
                    </div>
                    <div className="text-sm font-bold text-blue-600">
                      {kra.current * kra.xpReward} / {kra.target * kra.xpReward} XP
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    {!isCompleted && (
                      <>
                        <Button 
                          size="sm" 
                          className="flex-1 bg-blue-600 hover:bg-blue-700"
                          onClick={() => addProgress(kra.id, 1)}
                        >
                          <Zap className="mr-1 h-3 w-3" />
                          +1 Progress
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="flex-1"
                          onClick={() => addProgress(kra.id, 3)}
                        >
                          <TrendingUp className="mr-1 h-3 w-3" />
                          +3 Boost
                        </Button>
                      </>
                    )}
                    
                    {isCompleted && (
                      <div className="flex-1 text-center p-2 bg-green-100 rounded-lg">
                        <div className="flex items-center justify-center text-green-700">
                          <Trophy className="h-4 w-4 mr-2" />
                          <span className="font-medium">Mission Complete!</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Weekly Challenges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <Award className="mr-2 h-6 w-6 text-purple-500" />
            Weekly Challenges 🏆
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg bg-purple-50 border-purple-200">
              <div className="flex items-center mb-3">
                <Calendar className="h-5 w-5 text-purple-600 mr-2" />
                <h4 className="font-medium">Consistency Master</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">Complete all daily KRAs for 5 days</p>
              <div className="flex items-center justify-between">
                <Progress value={60} className="flex-1 mr-2 h-2" />
                <span className="text-sm font-bold text-purple-600">3/5 days</span>
              </div>
              <div className="mt-2 text-xs text-purple-600">Reward: +500 XP, Gold Badge</div>
            </div>
            
            <div className="p-4 border rounded-lg bg-blue-50 border-blue-200">
              <div className="flex items-center mb-3">
                <Target className="h-5 w-5 text-blue-600 mr-2" />
                <h4 className="font-medium">Conversion Expert</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">Achieve 10 lead conversions this week</p>
              <div className="flex items-center justify-between">
                <Progress value={70} className="flex-1 mr-2 h-2" />
                <span className="text-sm font-bold text-blue-600">7/10 conversions</span>
              </div>
              <div className="mt-2 text-xs text-blue-600">Reward: +1000 XP, Platinum Badge</div>
            </div>
            
            <div className="p-4 border rounded-lg bg-green-50 border-green-200">
              <div className="flex items-center mb-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                <h4 className="font-medium">Team Player</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">Help 3 team members with their KRAs</p>
              <div className="flex items-center justify-between">
                <Progress value={33} className="flex-1 mr-2 h-2" />
                <span className="text-sm font-bold text-green-600">1/3 helped</span>
              </div>
              <div className="mt-2 text-xs text-green-600">Reward: +300 XP, Team Badge</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameifiedKRAProgress;