import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { IntroDriver } from '@/components/onboarding/IntroDriver';
import { 
  Home, 
  Target, 
  Users, 
  CheckSquare, 
  Trophy, 
  Volume2,
  Moon,
  Sun,
  Settings
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface GameLayoutProps {
  children: React.ReactNode;
}

const GameLayout: React.FC<GameLayoutProps> = ({ children }) => {
  const [showDriver, setShowDriver] = useState(false);
  const [userLevel, setUserLevel] = useState(5);
  const [userPoints, setUserPoints] = useState(1250);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user has seen onboarding for current page
  useEffect(() => {
    const seenPages = JSON.parse(localStorage.getItem('seenOnboarding') || '[]');
    if (!seenPages.includes(location.pathname)) {
      setShowDriver(true);
    }
  }, [location.pathname]);

  const handleDriverComplete = () => {
    const seenPages = JSON.parse(localStorage.getItem('seenOnboarding') || '[]');
    seenPages.push(location.pathname);
    localStorage.setItem('seenOnboarding', JSON.stringify(seenPages));
    setShowDriver(false);
  };

  const driverSteps = [
    {
      id: '1',
      target: '.bottom-nav',
      title: 'नेवीगेशन बार',
      description: 'यहाँ से आप अलग-अलग सेक्शन में जा सकते हैं। होम, टास्क, कस्टमर और रिवार्ड्स देखें।',
      voiceText: 'नीचे के बटन से आप अपने काम के अलग हिस्से देख सकते हैं',
      position: 'top' as const
    },
    {
      id: '2', 
      target: '.user-progress',
      title: 'आपका प्रोग्रेस',
      description: 'यहाँ आपका लेवल और पॉइंट्स दिखाई देते हैं। ज्यादा काम करने से ज्यादा पॉइंट्स मिलते हैं!',
      voiceText: 'यहाँ आपके पॉइंट्स और लेवल दिखते हैं',
      position: 'bottom' as const
    }
  ];

  const navItems = [
    { icon: Home, label: 'होम', path: '/game-dashboard', emoji: '🏠' },
    { icon: Target, label: 'मिशन', path: '/game-tasks', emoji: '🎯' },
    { icon: Users, label: 'कस्टमर', path: '/game-customers', emoji: '👥' },
    { icon: Trophy, label: 'रिवार्ड्स', path: '/game-rewards', emoji: '🏆' }
  ];

  const currentLevelProgress = ((userPoints % 100) / 100) * 100;

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''} bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-purple-900`}>
      {/* Top Bar */}
      <div className="user-progress sticky top-0 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-white/20 p-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          {/* User Info */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
              {user?.name?.[0] || 'U'}
            </div>
            <div>
              <div className="font-bold text-gray-900 dark:text-white">Level {userLevel}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{userPoints} Points</div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsAudioEnabled(!isAudioEnabled)}
              className="w-10 h-10 rounded-full"
            >
              <Volume2 size={16} className={isAudioEnabled ? 'text-green-500' : 'text-gray-400'} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="w-10 h-10 rounded-full"
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </Button>
          </div>
        </div>

        {/* Level Progress */}
        <div className="max-w-md mx-auto mt-3">
          <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-300 mb-1">
            <span>Level {userLevel}</span>
            <span>Level {userLevel + 1}</span>
          </div>
          <Progress value={currentLevelProgress} className="h-2" />
        </div>
      </div>

      {/* Main Content */}
      <div className="pb-20 min-h-screen">
        {children}
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-t border-white/20 p-2 z-40">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Button
                key={item.path}
                variant="ghost"
                onClick={() => navigate(item.path)}
                className={`flex-1 flex flex-col items-center gap-1 h-16 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg scale-110' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <div className="text-lg">{item.emoji}</div>
                <span className="text-xs font-medium">{item.label}</span>
                {isActive && (
                  <div className="absolute -top-1 w-1 h-1 bg-yellow-400 rounded-full animate-pulse" />
                )}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Intro Driver */}
      <IntroDriver
        steps={driverSteps}
        onComplete={handleDriverComplete}
        isVisible={showDriver}
      />
    </div>
  );
};

export default GameLayout;