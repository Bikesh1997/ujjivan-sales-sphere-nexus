import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { IntroDriver } from '@/components/onboarding/IntroDriver';

const GameDashboard = () => {
  const [showDriver, setShowDriver] = useState(false);
  const [celebrationVisible, setCelebrationVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has seen dashboard onboarding
    const seenDashboard = localStorage.getItem('seenDashboardOnboarding');
    if (!seenDashboard) {
      setShowDriver(true);
    }
  }, []);

  const handleDriverComplete = () => {
    localStorage.setItem('seenDashboardOnboarding', 'true');
    setShowDriver(false);
  };

  const handleStartMission = (mission: string) => {
    setCelebrationVisible(true);
    setTimeout(() => {
      setCelebrationVisible(false);
      navigate('/game-tasks');
    }, 1500);
  };

  const driverSteps = [
    {
      id: '1',
      target: '.daily-missions',
      title: 'आज के मिशन',
      description: 'यहाँ आपके आज के सभी काम दिखे हैं। हर मिशन पूरा करने पर पॉइंट्स मिलते हैं!',
      voiceText: 'यहाँ आपके आज के मिशन हैं, इन्हें पूरा करके पॉइंट्स जीतें',
      position: 'bottom' as const
    },
    {
      id: '2',
      target: '.achievements',
      title: 'आपकी उपलब्धियाँ',
      description: 'यहाँ आपके बैज और रिवार्ड्स दिखते हैं। ज्यादा काम करने से नए बैज अनलॉक होते हैं!',
      voiceText: 'यहाँ आपके जीते हुए बैज और इनाम देख सकते हैं',
      position: 'top' as const
    }
  ];

  const missions = [
    {
      id: 1,
      title: '🎯 5 कस्टमर विजिट',
      description: 'आज 5 नए कस्टमर से मिलें',
      progress: 60,
      points: 50,
      status: 'active',
      emoji: '🎯'
    },
    {
      id: 2,
      title: '📋 डेली रिपोर्ट',
      description: 'अपनी दिन की रिपोर्ट भेजें',
      progress: 0,
      points: 30,
      status: 'pending',
      emoji: '📋'
    },
    {
      id: 3,
      title: '🏦 2 SHG फॉर्म',
      description: 'नए SHG का फॉर्म भरें',
      progress: 100,
      points: 80,
      status: 'completed',
      emoji: '✅'
    }
  ];

  const achievements = [
    { id: 1, name: 'पहला दिन', emoji: '🌟', unlocked: true },
    { id: 2, name: 'हफ्ता पूरा', emoji: '🏆', unlocked: true },
    { id: 3, name: 'मासिक चैंपियन', emoji: '👑', unlocked: false },
    { id: 4, name: 'टीम लीडर', emoji: '⭐', unlocked: false }
  ];

  return (
    <div className="p-4 max-w-md mx-auto space-y-6">
      {/* Welcome Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          आज का दिन शुरू करें! 🌅
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          नए मिशन पूरे करके पॉइंट्स जीतें
        </p>
      </div>

      {/* Daily Missions */}
      <div className="daily-missions space-y-3">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          🎯 आज के मिशन
        </h2>
        
        {missions.map((mission) => (
          <Card 
            key={mission.id} 
            className={`overflow-hidden transition-all duration-300 hover:scale-105 ${
              mission.status === 'completed' 
                ? 'bg-gradient-to-r from-green-50 to-green-100 border-green-200' 
                : mission.status === 'active'
                ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200'
                : 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200'
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{mission.emoji}</div>
                  <div>
                    <h3 className="font-semibold text-sm">{mission.title}</h3>
                    <p className="text-xs text-gray-600">{mission.description}</p>
                  </div>
                </div>
                <Badge variant={mission.status === 'completed' ? 'default' : 'secondary'}>
                  +{mission.points} 🪙
                </Badge>
              </div>
              
              {mission.status !== 'completed' && (
                <>
                  <Progress value={mission.progress} className="mb-3 h-2" />
                  <Button 
                    onClick={() => handleStartMission(mission.title)}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl h-12"
                  >
                    {mission.status === 'active' ? 'जारी रखें 🚀' : 'मिशन शुरू करें ▶️'}
                  </Button>
                </>
              )}
              
              {mission.status === 'completed' && (
                <div className="text-center py-2">
                  <span className="text-green-600 font-semibold">🎉 पूरा हो गया!</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="text-center p-3 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
          <div className="text-xl">🔥</div>
          <div className="text-lg font-bold text-orange-600">5</div>
          <div className="text-xs text-gray-600">दिन Streak</div>
        </Card>
        <Card className="text-center p-3 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <div className="text-xl">🎯</div>
          <div className="text-lg font-bold text-purple-600">80%</div>
          <div className="text-xs text-gray-600">इस हफ्ते</div>
        </Card>
        <Card className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <div className="text-xl">🏆</div>
          <div className="text-lg font-bold text-green-600">12</div>
          <div className="text-xs text-gray-600">बैज</div>
        </Card>
      </div>

      {/* Achievements */}
      <div className="achievements space-y-3">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          🏆 उपलब्धियाँ
        </h2>
        
        <div className="grid grid-cols-4 gap-3">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`text-center p-3 rounded-xl transition-all ${
                achievement.unlocked
                  ? 'bg-gradient-to-br from-yellow-100 to-orange-100 border-2 border-yellow-300 animate-pulse'
                  : 'bg-gray-100 border-2 border-gray-200 opacity-50'
              }`}
            >
              <div className="text-2xl mb-1">{achievement.emoji}</div>
              <div className="text-xs font-medium">{achievement.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Celebration Animation */}
      {celebrationVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="text-6xl animate-bounce">🎉</div>
        </div>
      )}

      {/* Intro Driver */}
      <IntroDriver
        steps={driverSteps}
        onComplete={handleDriverComplete}
        isVisible={showDriver}
      />
    </div>
  );
};

export default GameDashboard;