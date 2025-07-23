import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Star, 
  Target, 
  MapPin, 
  Phone, 
  Users, 
  CheckCircle,
  Flame,
  Zap,
  Award,
  Calendar,
  TrendingUp,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface GameProgress {
  currentXP: number;
  level: number;
  nextLevelXP: number;
  dailyStreak: number;
  weeklyStreak: number;
  badges: string[];
  completedMissions: number;
  totalMissions: number;
}

interface Mission {
  id: string;
  title: string;
  description: string;
  type: 'visit' | 'call' | 'meeting' | 'documentation';
  xpReward: number;
  status: 'pending' | 'in_progress' | 'completed';
  icon: any;
  difficulty: 'easy' | 'medium' | 'hard';
}

const FieldExecutiveGameDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [gameProgress, setGameProgress] = useState<GameProgress>({
    currentXP: 850,
    level: 5,
    nextLevelXP: 1000,
    dailyStreak: 3,
    weeklyStreak: 2,
    badges: ['First Visit', 'Call Master', 'Team Player'],
    completedMissions: 12,
    totalMissions: 15
  });

  const [showCelebration, setShowCelebration] = useState(false);

  const dailyMissions: Mission[] = [
    {
      id: '1',
      title: 'Complete 3 Customer Visits',
      description: 'Visit 3 customers in your beat plan today',
      type: 'visit',
      xpReward: 50,
      status: 'completed',
      icon: MapPin,
      difficulty: 'medium'
    },
    {
      id: '2',
      title: 'Make 10 Follow-up Calls',
      description: 'Contact pending leads and update status',
      type: 'call',
      xpReward: 30,
      status: 'in_progress',
      icon: Phone,
      difficulty: 'easy'
    },
    {
      id: '3',
      title: 'Attend SHG Meeting',
      description: 'Facilitate self-help group formation',
      type: 'meeting',
      xpReward: 75,
      status: 'pending',
      icon: Users,
      difficulty: 'hard'
    },
    {
      id: '4',
      title: 'Submit Daily Report',
      description: 'Complete and submit your field activity report',
      type: 'documentation',
      xpReward: 20,
      status: 'pending',
      icon: CheckCircle,
      difficulty: 'easy'
    }
  ];

  const availableBadges = [
    { id: 'streak_master', name: 'Streak Master', description: '7-day login streak', earned: true, icon: '🔥' },
    { id: 'visit_champion', name: 'Visit Champion', description: '50 customer visits', earned: true, icon: '🏆' },
    { id: 'call_expert', name: 'Call Expert', description: '100 successful calls', earned: false, icon: '📞' },
    { id: 'team_leader', name: 'Team Leader', description: 'Help 5 team members', earned: false, icon: '👥' }
  ];

  const completeMission = (missionId: string) => {
    const mission = dailyMissions.find(m => m.id === missionId);
    if (!mission || mission.status === 'completed') return;

    // Update mission status
    mission.status = 'completed';
    
    // Add XP
    const newXP = gameProgress.currentXP + mission.xpReward;
    let newLevel = gameProgress.level;
    let nextLevelXP = gameProgress.nextLevelXP;
    
    // Check for level up
    if (newXP >= nextLevelXP) {
      newLevel += 1;
      nextLevelXP += 200; // Each level requires 200 more XP
      setShowCelebration(true);
    }

    setGameProgress(prev => ({
      ...prev,
      currentXP: newXP,
      level: newLevel,
      nextLevelXP,
      completedMissions: prev.completedMissions + 1
    }));

    // Show celebration toast
    toast({
      title: "🎉 Mission Complete!",
      description: `+${mission.xpReward} XP earned! ${newLevel > gameProgress.level ? 'LEVEL UP!' : ''}`,
    });

    // Hide celebration after 2 seconds
    if (newLevel > gameProgress.level) {
      setTimeout(() => setShowCelebration(false), 2000);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in_progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'hard': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const progressPercentage = (gameProgress.currentXP / gameProgress.nextLevelXP) * 100;

  // Only show for Field Executives
  if (user?.role !== 'sales_executive') {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Celebration Animation */}
      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="animate-bounce-in text-6xl">🎉</div>
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-purple-500/20 to-pink-500/20 animate-pulse"></div>
        </div>
      )}

      {/* Game Header */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Welcome back, Champion! 🏆</h2>
              <p className="text-blue-100">Ready for today's missions?</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">Level {gameProgress.level}</div>
              <div className="text-sm text-blue-100">{gameProgress.currentXP}/{gameProgress.nextLevelXP} XP</div>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between text-sm text-blue-100 mb-2">
              <span>Progress to Level {gameProgress.level + 1}</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-3 bg-blue-400/30" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Flame className="mr-2 h-5 w-5 text-orange-500" />
              Daily Stats ⚡
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Flame className="h-4 w-4 text-orange-500 mr-2" />
                  <span className="text-sm">Daily Streak</span>
                </div>
                <Badge className="bg-orange-100 text-orange-800 font-bold">
                  {gameProgress.dailyStreak} days 🔥
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-blue-500 mr-2" />
                  <span className="text-sm">Weekly Streak</span>
                </div>
                <Badge className="bg-blue-100 text-blue-800 font-bold">
                  {gameProgress.weeklyStreak} weeks 📅
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Trophy className="h-4 w-4 text-yellow-500 mr-2" />
                  <span className="text-sm">Mission Progress</span>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800 font-bold">
                  {gameProgress.completedMissions}/{gameProgress.totalMissions} ⭐
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Earned Badges */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Award className="mr-2 h-5 w-5 text-purple-500" />
              Badges Earned 🏅
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {availableBadges.map((badge) => (
                <div key={badge.id} className={`p-3 rounded-lg border ${badge.earned ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50 border-gray-200 opacity-60'}`}>
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{badge.icon}</span>
                    <div>
                      <h4 className="font-medium text-sm">{badge.name}</h4>
                      <p className="text-xs text-gray-600">{badge.description}</p>
                    </div>
                    {badge.earned && (
                      <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Zap className="mr-2 h-5 w-5 text-yellow-500" />
              Quick Start Mission 🚀
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                <MapPin className="mr-2 h-4 w-4" />
                Start Customer Visit +50 XP
              </Button>
              <Button className="w-full bg-green-600 hover:bg-green-700" size="lg">
                <Phone className="mr-2 h-4 w-4" />
                Make Follow-up Call +30 XP
              </Button>
              <Button className="w-full bg-purple-600 hover:bg-purple-700" size="lg">
                <Users className="mr-2 h-4 w-4" />
                Join SHG Meeting +75 XP
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Missions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <Target className="mr-2 h-6 w-6 text-blue-500" />
            Today's Missions 🎯
            <Badge className="ml-2 bg-blue-100 text-blue-800">
              {dailyMissions.filter(m => m.status === 'completed').length}/{dailyMissions.length} Complete
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dailyMissions.map((mission) => (
              <div key={mission.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <mission.icon className={`h-5 w-5 mr-2 ${getDifficultyColor(mission.difficulty)}`} />
                    <div>
                      <h4 className="font-medium">{mission.title}</h4>
                      <p className="text-sm text-gray-600">{mission.description}</p>
                    </div>
                  </div>
                  <Badge className={`text-xs ${getStatusColor(mission.status)}`}>
                    {mission.status.replace('_', ' ')}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-bold text-yellow-600">+{mission.xpReward} XP</span>
                    <Badge className={`text-xs ${getDifficultyColor(mission.difficulty)}`}>
                      {mission.difficulty}
                    </Badge>
                  </div>
                  
                  {mission.status === 'pending' && (
                    <Button 
                      size="sm" 
                      onClick={() => completeMission(mission.id)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Start Mission
                      <ChevronRight className="ml-1 h-3 w-3" />
                    </Button>
                  )}
                  
                  {mission.status === 'in_progress' && (
                    <Button 
                      size="sm" 
                      onClick={() => completeMission(mission.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Complete +{mission.xpReward} XP
                      <CheckCircle className="ml-1 h-3 w-3" />
                    </Button>
                  )}
                  
                  {mission.status === 'completed' && (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      <span className="text-sm font-medium">Complete! 🎉</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <TrendingUp className="mr-2 h-5 w-5 text-green-500" />
            Performance Insights 📊
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-700">85%</div>
                <div className="text-sm text-green-600">Mission Success Rate</div>
                <div className="text-xs text-gray-500 mt-1">Above average! 🌟</div>
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-700">1,250</div>
                <div className="text-sm text-blue-600">Total XP This Week</div>
                <div className="text-xs text-gray-500 mt-1">+300 vs last week 📈</div>
              </div>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-700">3rd</div>
                <div className="text-sm text-purple-600">Team Ranking</div>
                <div className="text-xs text-gray-500 mt-1">Keep pushing! 💪</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FieldExecutiveGameDashboard;