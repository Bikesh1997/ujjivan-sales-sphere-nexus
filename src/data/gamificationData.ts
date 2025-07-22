// Gamification system for KRA management
export interface GameificationPoints {
  total: number;
  thisMonth: number;
  lastMonth: number;
  daily: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'performance' | 'streak' | 'milestone' | 'team' | 'learning';
  points: number;
  unlockedAt?: string;
  isUnlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

export interface UserLevel {
  currentLevel: number;
  currentXP: number;
  nextLevelXP: number;
  title: string;
  perks: string[];
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatar?: string;
  points: number;
  level: number;
  department: string;
  streak: number;
  badge?: string;
}

// Sample achievements data
export const achievements: Achievement[] = [
  {
    id: '1',
    name: 'First Steps',
    description: 'Complete your first KRA target',
    icon: 'Target',
    category: 'milestone',
    points: 100,
    isUnlocked: true,
    unlockedAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Sales Champion',
    description: 'Exceed monthly sales target by 20%',
    icon: 'Trophy',
    category: 'performance',
    points: 500,
    isUnlocked: true,
    unlockedAt: '2024-01-20'
  },
  {
    id: '3',
    name: 'Hot Streak',
    description: 'Achieve targets for 7 consecutive days',
    icon: 'Flame',
    category: 'streak',
    points: 300,
    isUnlocked: false,
    progress: 4,
    maxProgress: 7
  },
  {
    id: '4',
    name: 'Team Player',
    description: 'Help 5 colleagues achieve their targets',
    icon: 'Users',
    category: 'team',
    points: 250,
    isUnlocked: false,
    progress: 2,
    maxProgress: 5
  },
  {
    id: '5',
    name: 'Learning Master',
    description: 'Complete 10 financial education modules',
    icon: 'GraduationCap',
    category: 'learning',
    points: 400,
    isUnlocked: false,
    progress: 7,
    maxProgress: 10
  }
];

// Sample leaderboard data
export const leaderboardData: LeaderboardEntry[] = [
  {
    rank: 1,
    userId: '3',
    name: 'Anjali Patel',
    points: 2850,
    level: 8,
    department: 'Sales',
    streak: 12,
    badge: 'Sales Champion'
  },
  {
    rank: 2,
    userId: '5',
    name: 'Neha Gupta',
    points: 2650,
    level: 7,
    department: 'Relationship Management',
    streak: 8,
    badge: 'Team Player'
  },
  {
    rank: 3,
    userId: '4',
    name: 'Vikram Singh',
    points: 2420,
    level: 7,
    department: 'Inbound',
    streak: 5
  },
  {
    rank: 4,
    userId: '2',
    name: 'Priya Manager',
    points: 2200,
    level: 6,
    department: 'Supervision',
    streak: 15,
    badge: 'Hot Streak'
  }
];

// Level system
export const getLevelInfo = (totalXP: number): UserLevel => {
  const levels = [
    { level: 1, xpRequired: 0, title: 'Newcomer', perks: ['Basic dashboard'] },
    { level: 2, xpRequired: 500, title: 'Learner', perks: ['Progress tracking'] },
    { level: 3, xpRequired: 1200, title: 'Performer', perks: ['Advanced analytics'] },
    { level: 4, xpRequired: 2000, title: 'Achiever', perks: ['Custom goals'] },
    { level: 5, xpRequired: 3000, title: 'Expert', perks: ['Mentoring access'] },
    { level: 6, xpRequired: 4500, title: 'Champion', perks: ['Team challenges'] },
    { level: 7, xpRequired: 6500, title: 'Elite', perks: ['Premium features'] },
    { level: 8, xpRequired: 9000, title: 'Master', perks: ['Leadership tools'] },
  ];

  let currentLevel = levels[0];
  let nextLevel = levels[1];

  for (let i = 0; i < levels.length - 1; i++) {
    if (totalXP >= levels[i].xpRequired && totalXP < levels[i + 1].xpRequired) {
      currentLevel = levels[i];
      nextLevel = levels[i + 1];
      break;
    } else if (totalXP >= levels[levels.length - 1].xpRequired) {
      currentLevel = levels[levels.length - 1];
      nextLevel = levels[levels.length - 1];
      break;
    }
  }

  return {
    currentLevel: currentLevel.level,
    currentXP: totalXP,
    nextLevelXP: nextLevel.xpRequired,
    title: currentLevel.title,
    perks: currentLevel.perks
  };
};

// Point calculation functions
export const calculateKRAPoints = (kraProgress: number, target: number): number => {
  const completion = (kraProgress / target) * 100;
  
  if (completion >= 120) return 200; // Exceed by 20%+
  if (completion >= 100) return 150; // Meet target
  if (completion >= 80) return 100;  // 80% completion
  if (completion >= 60) return 50;   // 60% completion
  return 25; // Participation points
};

export const calculateStreakBonus = (streakDays: number): number => {
  if (streakDays >= 30) return 500;
  if (streakDays >= 14) return 200;
  if (streakDays >= 7) return 100;
  if (streakDays >= 3) return 50;
  return 0;
};

export const getAchievementColor = (category: string) => {
  const colors = {
    performance: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    streak: 'bg-red-100 text-red-700 border-red-200',
    milestone: 'bg-blue-100 text-blue-700 border-blue-200',
    team: 'bg-green-100 text-green-700 border-green-200',
    learning: 'bg-purple-100 text-purple-700 border-purple-200'
  };
  return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-700 border-gray-200';
};