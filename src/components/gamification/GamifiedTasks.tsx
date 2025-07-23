import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  CheckCircle, 
  Star, 
  Volume2,
  Camera,
  MapPin,
  Clock,
  ArrowRight,
  Gift
} from 'lucide-react';

// Daily task interface for visual-first design
interface SimpleTask {
  id: string;
  title: string;
  icon: string;
  hindiTitle: string;
  steps: number;
  completed: number;
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
  status: 'not_started' | 'in_progress' | 'completed';
  timeRequired: string;
  location?: string;
}

const sampleTasks: SimpleTask[] = [
  {
    id: 'task_1',
    title: 'Morning Check-in',
    hindiTitle: 'सुबह की हाजिरी',
    icon: '🌅',
    steps: 1,
    completed: 1,
    points: 10,
    difficulty: 'easy',
    status: 'completed',
    timeRequired: '2 मिनट',
    location: 'यहीं पर'
  },
  {
    id: 'task_2',
    title: 'Customer Visits',
    hindiTitle: 'घर जा कर मिलना',
    icon: '🏠',
    steps: 5,
    completed: 2,
    points: 50,
    difficulty: 'medium',
    status: 'in_progress',
    timeRequired: '3 घंटे',
    location: 'बाहर जाना है'
  },
  {
    id: 'task_3',
    title: 'Phone Calls',
    hindiTitle: 'फोन पर बात',
    icon: '📞',
    steps: 10,
    completed: 0,
    points: 30,
    difficulty: 'easy',
    status: 'not_started',
    timeRequired: '1 घंटा',
    location: 'कहीं भी'
  },
  {
    id: 'task_4',
    title: 'Form Submission',
    hindiTitle: 'फॉर्म जमा करना',
    icon: '📝',
    steps: 3,
    completed: 0,
    points: 75,
    difficulty: 'hard',
    status: 'not_started',
    timeRequired: '2 घंटे',
    location: 'ऑफिस में'
  }
];

const GamifiedTasks = () => {
  const [tasks, setTasks] = useState(sampleTasks);
  const [dailyPoints, setDailyPoints] = useState(60);
  const [currentStreak, setCurrentStreak] = useState(5);
  const [showCelebration, setShowCelebration] = useState(false);

  // Calculate overall progress
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const overallProgress = (completedTasks / totalTasks) * 100;

  // Play audio instruction
  const playAudio = (text: string) => {
    console.log(`Playing audio: ${text}`);
  };

  // Handle task action
  const handleTaskAction = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    if (task.status === 'completed') {
      playAudio('यह काम पहले से पूरा है');
      return;
    }

    playAudio(`${task.hindiTitle} शुरू करते हैं`);
    
    // Navigate to task details or start task
    console.log(`Starting task: ${task.title}`);
  };

  // Get status display
  const getStatusDisplay = (task: SimpleTask) => {
    switch (task.status) {
      case 'not_started':
        return { 
          color: 'bg-gray-100 hover:bg-gray-200 text-gray-800', 
          text: 'शुरू करें',
          icon: Play
        };
      case 'in_progress':
        return { 
          color: 'bg-blue-100 hover:bg-blue-200 text-blue-800', 
          text: 'जारी रखें',
          icon: ArrowRight
        };
      case 'completed':
        return { 
          color: 'bg-green-100 text-green-800', 
          text: 'पूरा हुआ',
          icon: CheckCircle
        };
    }
  };

  // Get difficulty color
  const getDifficultyColor = (difficulty: SimpleTask['difficulty']) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-50 text-green-600 border-green-200';
      case 'medium': return 'bg-yellow-50 text-yellow-600 border-yellow-200';
      case 'hard': return 'bg-red-50 text-red-600 border-red-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Daily Progress Header */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">आज के काम</h1>
              <p className="text-blue-100">आज की सभी गतिविधियां</p>
            </div>
            <div className="text-right">
              <div className="text-3xl mb-1">🎯</div>
              <div className="text-sm">लक्ष्य</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>आज की प्रगति</span>
              <span>{completedTasks}/{totalTasks} काम</span>
            </div>
            <Progress value={overallProgress} className="h-4 bg-blue-400" />
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center p-3 bg-white/10 rounded-lg">
              <div className="text-xl font-bold">{dailyPoints}</div>
              <div className="text-xs">आज के पॉइंट्स</div>
            </div>
            <div className="text-center p-3 bg-white/10 rounded-lg">
              <div className="text-xl font-bold">{currentStreak}</div>
              <div className="text-xs">लगातार दिन</div>
            </div>
            <div className="text-center p-3 bg-white/10 rounded-lg">
              <div className="text-xl font-bold">{Math.round(overallProgress)}%</div>
              <div className="text-xs">पूर्ण</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Task List - Large Cards */}
      <div className="space-y-4">
        {tasks.map((task) => {
          const statusDisplay = getStatusDisplay(task);
          const StatusIcon = statusDisplay.icon;
          
          return (
            <Card 
              key={task.id}
              className={`transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer ${
                task.status === 'completed' ? 'ring-2 ring-green-400 bg-green-50' : ''
              }`}
              onClick={() => handleTaskAction(task.id)}
            >
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Task Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-6xl">{task.icon}</div>
                      <div>
                        <h3 className="text-xl font-bold">{task.hindiTitle}</h3>
                        <p className="text-gray-600 text-sm">{task.title}</p>
                      </div>
                    </div>
                    
                    {/* Difficulty Badge */}
                    <Badge className={`${getDifficultyColor(task.difficulty)} border`}>
                      {task.difficulty === 'easy' ? 'आसान' : 
                       task.difficulty === 'medium' ? 'मध्यम' : 'कठिन'}
                    </Badge>
                  </div>

                  {/* Progress Bar */}
                  {task.steps > 1 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-medium">
                        <span>प्रगति</span>
                        <span>{task.completed}/{task.steps} स्टेप</span>
                      </div>
                      <Progress value={(task.completed / task.steps) * 100} className="h-3" />
                    </div>
                  )}

                  {/* Task Details */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="flex flex-col items-center space-y-1">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <span className="text-sm font-medium">{task.timeRequired}</span>
                      <span className="text-xs text-gray-500">समय</span>
                    </div>
                    
                    <div className="flex flex-col items-center space-y-1">
                      <MapPin className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium">{task.location}</span>
                      <span className="text-xs text-gray-500">जगह</span>
                    </div>
                    
                    <div className="flex flex-col items-center space-y-1">
                      <Star className="h-5 w-5 text-yellow-600" />
                      <span className="text-sm font-medium">+{task.points}</span>
                      <span className="text-xs text-gray-500">पॉइंट्स</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex space-x-3">
                    <Button
                      className={`flex-1 h-14 text-lg font-bold ${statusDisplay.color}`}
                      variant="outline"
                      disabled={task.status === 'completed'}
                    >
                      <StatusIcon className="mr-2 h-6 w-6" />
                      {statusDisplay.text}
                    </Button>

                    {/* Helper Buttons */}
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        playAudio(task.hindiTitle);
                      }}
                      className="w-14 h-14 p-0"
                    >
                      <Volume2 className="h-5 w-5" />
                    </Button>

                    {task.status === 'in_progress' && (
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={(e) => {
                          e.stopPropagation();
                          playAudio('फोटो लेने के लिए कैमरा खोलें');
                        }}
                        className="w-14 h-14 p-0"
                      >
                        <Camera className="h-5 w-5" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Today's Reward Target */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Gift className="h-8 w-8 text-yellow-600" />
              <div>
                <h3 className="text-lg font-bold text-yellow-800">आज का लक्ष्य</h3>
                <p className="text-sm text-yellow-700">सभी काम पूरे करने पर बोनस पॉइंट्स</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-yellow-600">+100</div>
              <div className="text-sm text-yellow-700">बोनस पॉइंट्स</div>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between text-sm font-medium mb-2">
              <span>आज का लक्ष्य प्रगति</span>
              <span>{completedTasks}/{totalTasks}</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
            
            {overallProgress === 100 && (
              <div className="mt-3 text-center">
                <Badge className="bg-green-100 text-green-800 text-sm px-4 py-2">
                  🎉 बधाई हो! आज का लक्ष्य पूरा हुआ!
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GamifiedTasks;