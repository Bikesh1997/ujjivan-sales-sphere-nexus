import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Trophy, 
  Target, 
  Flame, 
  Star, 
  TrendingUp,
  Award,
  Users,
  GraduationCap,
  Zap
} from 'lucide-react';
import { 
  achievements, 
  leaderboardData, 
  getLevelInfo, 
  getAchievementColor,
  type Achievement,
  type LeaderboardEntry 
} from '@/data/gamificationData';
import { useAuth } from '@/contexts/AuthContext';

const KRAGamification: React.FC = () => {
  const { user } = useAuth();
  
  // Mock user data
  const userStats = {
    totalXP: 2850,
    monthlyPoints: 450,
    currentStreak: 12,
    rank: 1,
    completedAchievements: 8
  };

  const levelInfo = getLevelInfo(userStats.totalXP);
  const progressPercent = ((userStats.totalXP - (levelInfo.currentLevel === 1 ? 0 : 500)) / 
                          (levelInfo.nextLevelXP - (levelInfo.currentLevel === 1 ? 0 : 500))) * 100;

  const unlockedAchievements = achievements.filter(a => a.isUnlocked);
  const inProgressAchievements = achievements.filter(a => !a.isUnlocked && a.progress !== undefined);

  return (
    <div className="space-y-6">
      {/* Level & XP Card */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">Level {levelInfo.currentLevel}</h2>
              <p className="text-blue-100">{levelInfo.title}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{userStats.totalXP.toLocaleString()}</p>
              <p className="text-blue-100">Total XP</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress to Level {levelInfo.currentLevel + 1}</span>
              <span>{userStats.totalXP} / {levelInfo.nextLevelXP}</span>
            </div>
            <Progress value={progressPercent} className="h-3 bg-blue-400" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stats Cards */}
        <div className="lg:col-span-2 space-y-6">
          {/* Performance Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Star size={24} className="mx-auto mb-2 text-yellow-500" />
                <p className="text-2xl font-bold">{userStats.monthlyPoints}</p>
                <p className="text-sm text-gray-600">This Month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Flame size={24} className="mx-auto mb-2 text-red-500" />
                <p className="text-2xl font-bold">{userStats.currentStreak}</p>
                <p className="text-sm text-gray-600">Day Streak</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Trophy size={24} className="mx-auto mb-2 text-purple-500" />
                <p className="text-2xl font-bold">#{userStats.rank}</p>
                <p className="text-sm text-gray-600">Team Rank</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Award size={24} className="mx-auto mb-2 text-green-500" />
                <p className="text-2xl font-bold">{userStats.completedAchievements}</p>
                <p className="text-sm text-gray-600">Achievements</p>
              </CardContent>
            </Card>
          </div>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award size={20} />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Recent Achievements */}
                <div>
                  <h4 className="font-medium mb-3 text-green-700">🎉 Recently Unlocked</h4>
                  <div className="grid gap-3">
                    {unlockedAchievements.slice(0, 2).map(achievement => (
                      <div key={achievement.id} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          {achievement.icon === 'Trophy' && <Trophy size={20} className="text-green-600" />}
                          {achievement.icon === 'Target' && <Target size={20} className="text-green-600" />}
                          {achievement.icon === 'Flame' && <Flame size={20} className="text-green-600" />}
                        </div>
                        <div className="flex-1">
                          <h5 className="font-medium text-green-800">{achievement.name}</h5>
                          <p className="text-sm text-green-600">{achievement.description}</p>
                        </div>
                        <Badge className="bg-green-500 text-white">+{achievement.points} XP</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* In Progress */}
                <div>
                  <h4 className="font-medium mb-3">🎯 In Progress</h4>
                  <div className="space-y-3">
                    {inProgressAchievements.map(achievement => (
                      <div key={achievement.id} className="flex items-center gap-3 p-3 border rounded-lg">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                          {achievement.icon === 'Flame' && <Flame size={20} className="text-gray-600" />}
                          {achievement.icon === 'Users' && <Users size={20} className="text-gray-600" />}
                          {achievement.icon === 'GraduationCap' && <GraduationCap size={20} className="text-gray-600" />}
                        </div>
                        <div className="flex-1">
                          <h5 className="font-medium">{achievement.name}</h5>
                          <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                          <Progress 
                            value={(achievement.progress! / achievement.maxProgress!) * 100} 
                            className="h-2"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            {achievement.progress} / {achievement.maxProgress}
                          </p>
                        </div>
                        <Badge variant="outline">+{achievement.points} XP</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp size={20} />
                Team Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboardData.map((entry, index) => (
                  <div 
                    key={entry.userId} 
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      entry.userId === user?.id ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      entry.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                      entry.rank === 2 ? 'bg-gray-100 text-gray-700' :
                      entry.rank === 3 ? 'bg-orange-100 text-orange-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {entry.rank}
                    </div>
                    
                    <div className="flex-1">
                      <h5 className="font-medium text-sm">{entry.name}</h5>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <span>Lv.{entry.level}</span>
                        <span>•</span>
                        <span>{entry.points.toLocaleString()} XP</span>
                        {entry.streak > 0 && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Flame size={10} className="text-red-500" />
                              {entry.streak}
                            </span>
                          </>
                        )}
                      </div>
                      {entry.badge && (
                        <Badge variant="outline" className="text-xs mt-1">
                          {entry.badge}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" size="sm" className="w-full mt-4">
                View Full Leaderboard
              </Button>
            </CardContent>
          </Card>

          {/* Daily Challenge */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap size={20} />
                Daily Challenge
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-medium text-purple-800">Make 15 Customer Calls</h4>
                  <p className="text-sm text-purple-600 mb-2">Complete 15 calls to unlock bonus XP</p>
                  <Progress value={73} className="h-2" />
                  <div className="flex justify-between text-xs text-purple-600 mt-1">
                    <span>11 / 15 calls</span>
                    <span>+100 XP</span>
                  </div>
                </div>
                
                <Button size="sm" className="w-full">
                  Start Calling
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default KRAGamification;