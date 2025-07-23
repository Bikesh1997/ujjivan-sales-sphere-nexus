import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Volume2, 
  VolumeX, 
  LogOut,
  Sun,
  Moon
} from 'lucide-react';

interface GamifiedLayoutProps {
  children: React.ReactNode;
}

// Simple navigation items with large icons
const navigationItems = [
  {
    id: 'home',
    icon: '🏠',
    label: 'घर',
    audioLabel: 'होम स्क्रीन',
    path: '/gamified-kra',
    color: 'bg-blue-100 hover:bg-blue-200'
  },
  {
    id: 'tasks',
    icon: '✅',
    label: 'काम',
    audioLabel: 'आज के काम',
    path: '/gamified-tasks',
    color: 'bg-green-100 hover:bg-green-200'
  },
  {
    id: 'customers',
    icon: '👥',
    label: 'ग्राहक',
    audioLabel: 'ग्राहक मिलना',
    path: '/gamified-customers',
    color: 'bg-purple-100 hover:bg-purple-200'
  },
  {
    id: 'rewards',
    icon: '🎁',
    label: 'इनाम',
    audioLabel: 'पुरस्कार केंद्र',
    path: '/rewards',
    color: 'bg-yellow-100 hover:bg-yellow-200'
  }
];

const GamifiedLayout: React.FC<GamifiedLayoutProps> = ({ children }) => {
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  // Play audio instruction
  const playAudio = (text: string) => {
    if (audioEnabled) {
      console.log(`Playing audio: ${text}`);
      // In real implementation, use Text-to-Speech API
    }
  };

  const currentTime = new Date().getHours();
  const greeting = currentTime < 12 ? 'सुप्रभात' : currentTime < 17 ? 'नमस्ते' : 'शुभ संध्या';

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-green-50'}`}>
      {/* Top Header - Simplified */}
      <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg border-b-4 border-blue-500`}>
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            {/* User Greeting */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-xl text-white">
                👨‍💼
              </div>
              <div>
                <h1 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {greeting}, {user?.name?.split(' ')[0]}!
                </h1>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  आज का दिन शुभ हो
                </p>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center space-x-2">
              {/* Audio Toggle */}
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  setAudioEnabled(!audioEnabled);
                  playAudio(audioEnabled ? 'आवाज़ बंद' : 'आवाज़ चालू');
                }}
                className="rounded-full w-12 h-12 p-0"
              >
                {audioEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
              </Button>

              {/* Dark Mode Toggle */}
              <Button
                variant="outline"
                size="lg"
                onClick={() => setDarkMode(!darkMode)}
                className="rounded-full w-12 h-12 p-0"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </Button>

              {/* Logout */}
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  playAudio('अलविदा');
                  logout();
                }}
                className="rounded-full w-12 h-12 p-0 text-red-600 hover:text-red-700"
              >
                <LogOut size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 pb-24">
        {children}
      </main>

      {/* Bottom Navigation - Large Touch Targets */}
      <nav className={`fixed bottom-0 left-0 right-0 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-t-4 border-blue-500 shadow-lg`}>
        <div className="px-4 py-2">
          <div className="grid grid-cols-4 gap-2">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => playAudio(item.audioLabel)}
                  className={`
                    flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300
                    ${isActive 
                      ? 'bg-blue-500 text-white shadow-lg scale-105' 
                      : `${item.color} ${darkMode ? 'text-gray-200' : 'text-gray-800'}`
                    }
                    hover:scale-110 touch-target-large
                  `}
                  style={{ minHeight: '80px' }}
                >
                  <div className="text-3xl mb-1">{item.icon}</div>
                  <span className="text-sm font-bold">{item.label}</span>
                  
                  {/* Active Indicator */}
                  {isActive && (
                    <div className="w-2 h-2 bg-white rounded-full mt-1"></div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Hidden audio helper */}
      <div className="sr-only">
        <audio id="audio-helper" controls>
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};

export default GamifiedLayout;