import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  ArrowRight,
  Star,
  Trophy,
  Flame,
  Gift,
  Target
} from 'lucide-react';

interface QuickAction {
  id: string;
  title: string;
  icon: string;
  path: string;
  color: string;
  urgency?: 'high' | 'medium' | 'low';
  count?: number;
}

const quickActions: QuickAction[] = [
  {
    id: 'check_in',
    title: 'हाजिरी लगाएं',
    icon: '✅',
    path: '/check-in',
    color: 'bg-green-100 hover:bg-green-200 text-green-800',
    urgency: 'high'
  },
  {
    id: 'tasks',
    title: 'आज के काम',
    icon: '📋',
    path: '/gamified-tasks',
    color: 'bg-blue-100 hover:bg-blue-200 text-blue-800',
    count: 3
  },
  {
    id: 'customers',
    title: 'ग्राहक मिलना',
    icon: '👥',
    path: '/gamified-customers',
    color: 'bg-purple-100 hover:bg-purple-200 text-purple-800',
    count: 4
  },
  {
    id: 'calls',
    title: 'फोन करना',
    icon: '📞',
    path: '/calls',
    color: 'bg-orange-100 hover:bg-orange-200 text-orange-800',
    count: 7
  }
];

const SimpleDashboard = () => {
  // Mock user data
  const userData = {
    name: 'राजेश कुमार',
    level: 12,
    points: 1250,
    todayPoints: 185,
    streak: 15,
    completedTasks: 6,
    totalTasks: 10,
    rank: 1
  };

  const levelProgress = (userData.points % 100);
  const tasksProgress = (userData.completedTasks / userData.totalTasks) * 100;

  const currentTime = new Date().getHours();
  const greeting = currentTime < 12 ? 'सुप्रभात' : currentTime < 17 ? 'नमस्ते' : 'शुभ संध्या';

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-500 text-white overflow-hidden">
        <CardContent className="p-6 relative">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 text-6xl opacity-20">🌟</div>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">{greeting}!</h1>
              <p className="text-xl text-blue-100 mb-2">{userData.name}</p>
              <p className="text-blue-100">आज का दिन शुभ हो</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl mb-2">
                👨‍💼
              </div>
              <Badge className="bg-white/20 text-white border-white/30">
                स्तर {userData.level}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-2xl font-bold text-blue-600">{Math.round(tasksProgress)}%</div>
            <div className="text-sm text-gray-600">आज की प्रगति</div>
            <Progress value={tasksProgress} className="h-2 mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl mb-2">⭐</div>
            <div className="text-2xl font-bold text-yellow-600">{userData.todayPoints}</div>
            <div className="text-sm text-gray-600">आज के पॉइंट्स</div>
          </CardContent>
        </Card>
      </div>

      {/* Level Progress */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold">अपना स्तर</h3>
              <p className="text-gray-600">स्तर {userData.level} • {userData.points} कुल पॉइंट्स</p>
            </div>
            <Trophy className="h-8 w-8 text-yellow-600" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>अगले स्तर तक</span>
              <span>{levelProgress}/100</span>
            </div>
            <Progress value={levelProgress} className="h-4" />
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-lg font-bold text-orange-600">{userData.streak}</div>
              <div className="text-xs text-gray-600">लगातार दिन</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">#{userData.rank}</div>
              <div className="text-xs text-gray-600">टीम रैंक</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-600">8</div>
              <div className="text-xs text-gray-600">बैज</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Target className="mr-2 h-6 w-6 text-blue-600" />
          तुरंत करने वाले काम
        </h2>
        
        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((action) => (
            <Link key={action.id} to={action.path}>
              <Card className={`transition-all duration-300 hover:scale-105 hover:shadow-lg ${action.color}`}>
                <CardContent className="p-6 text-center relative">
                  {/* Urgency indicator */}
                  {action.urgency === 'high' && (
                    <div className="absolute top-2 right-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    </div>
                  )}
                  
                  {/* Count badge */}
                  {action.count && (
                    <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs">
                      {action.count}
                    </Badge>
                  )}
                  
                  <div className="text-4xl mb-3">{action.icon}</div>
                  <h3 className="font-bold text-lg">{action.title}</h3>
                  
                  <div className="mt-3 flex items-center justify-center">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Daily Motivation */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="text-5xl">🌟</div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-yellow-800">आज का प्रेरणा संदेश</h3>
              <p className="text-yellow-700">
                "हर छोटा कदम बड़ी सफलता की ओर ले जाता है। आज भी अपना बेस्ट दें!"
              </p>
            </div>
            <Flame className="h-8 w-8 text-orange-600" />
          </div>
        </CardContent>
      </Card>

      {/* Today's Rewards */}
      <Card className="bg-gradient-to-r from-green-50 to-teal-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Gift className="h-8 w-8 text-green-600" />
              <div>
                <h3 className="text-lg font-bold text-green-800">आज के इनाम</h3>
                <p className="text-sm text-green-700">सभी काम पूरे करने पर मिलेगा</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">₹500</div>
              <div className="text-sm text-green-700">बोनस</div>
            </div>
          </div>
          
          <div className="text-center">
            <Button className="bg-green-600 hover:bg-green-700 w-full h-12 text-lg font-bold">
              <Star className="mr-2 h-5 w-5" />
              इनाम देखें
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimpleDashboard;