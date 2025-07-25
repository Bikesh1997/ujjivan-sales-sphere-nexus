
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Bell, TrendingUp, Target, MapPin, Users, IndianRupee, Calendar, Star, Zap, Trophy, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { allLeads } from '@/data/leadsData';

interface Nudge {
  id: string;
  title: string;
  description: string;
  type: 'opportunity' | 'kra' | 'route' | 'follow-up' | 'cross-sell';
  priority: 'High' | 'Medium' | 'Low';
  actionLabel: string;
  navigationPath: string;
  value?: string;
  count?: number;
  deadline?: string;
}

const SmartNudges = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedNudge, setSelectedNudge] = useState<Nudge | null>(null);

  // Calculate dynamic nudges based on user data
  const userLeads = user?.role === 'supervisor' ? allLeads : allLeads.filter(lead => lead.assignedToId === user?.id);
  const overdueLeads = userLeads.filter(lead => lead.lastContact.includes('days ago') || lead.lastContact.includes('week ago'));
  const highValueProspects = userLeads.filter(lead => parseFloat(lead.value.replace('₹', '').replace('L', '')) > 30);

  // Define nudges based on user role
  const getBaseNudges = (): Nudge[] => {
    const baseNudges: Nudge[] = [
      {
        id: '2',
        title: 'KRA Achievement Mission 🏆',
        description: `Complete ${3 - userLeads.filter(lead => lead.status === 'converted').length} more loan disbursals to achieve 100% KRA and unlock ₹45K incentive`,
        type: 'kra',
        priority: 'High',
        actionLabel: 'Start Mission',
        navigationPath: '/funnel',
        count: 3 - userLeads.filter(lead => lead.status === 'converted').length,
        value: '₹45K',
        deadline: '15 days left'
      },
      {
        id: '4',
        title: 'Follow-up Sprint Mission 📞',
        description: `3 leads haven't been contacted in 3+ days. Total potential value: ₹${Math.round(overdueLeads.slice(0, 3).reduce((sum, lead) => sum + parseFloat(lead.value.replace('₹', '').replace('L', '')), 0))}L`,
        type: 'follow-up',
        priority: 'High',
        actionLabel: 'Accept Challenge',
        navigationPath: '/tasks',
        count: 3,
        value: `₹${Math.round(overdueLeads.slice(0, 3).reduce((sum, lead) => sum + parseFloat(lead.value.replace('₹', '').replace('L', '')), 0))}L`
      },
      {
        id: '5',
        title: 'Cross-Sell Quest 💼',
        description: `3 converted customers are eligible for insurance products. Potential additional revenue: ₹12L`,
        type: 'cross-sell',
        priority: 'Medium',
        actionLabel: 'Begin Quest',
        navigationPath: '/customers',
        count: 3,
        value: '₹12L'
      }
    ];

    // Add Beat Plan Optimization for all users except Vikram Singh
    if (user?.name !== 'Vikram Singh') {
      baseNudges.splice(1, 0, {
        id: '3',
        title: 'Territory Conquest Mission 🗺️',
        description: `Visit customers in Bandra area today. ${overdueLeads.length + 3} high-value prospects within 2km radius.`,
        type: 'route',
        priority: 'Medium',
        actionLabel: 'Launch Mission',
        navigationPath: '/plan-my-day',
        count: overdueLeads.length + 3
      });
    }

    // Only show High-Value Portfolio Opportunity for Neha (Relationship Manager)
    if (user?.id === '5' && user?.name === 'Neha Gupta') {
      baseNudges.unshift({
        id: '1',
        title: 'Elite Portfolio Mission 💎',
        description: `You have ${highValueProspects.length} senior citizens eligible for FD products. Average ticket size: ₹35L`,
        type: 'opportunity',
        priority: 'High',
        actionLabel: 'Start Mission',
        navigationPath: '/leads',
        count: highValueProspects.length,
        value: '₹35L'
      });
    }

    return baseNudges;
  };

  const nudges = getBaseNudges();
  
  const getXPReward = (type: string, priority: string) => {
    const baseXP = { 'High': 75, 'Medium': 50, 'Low': 25 };
    return baseXP[priority as keyof typeof baseXP] || 25;
  };

  const getDifficultyStars = (priority: string) => {
    const stars = { 'High': 3, 'Medium': 2, 'Low': 1 };
    return stars[priority as keyof typeof stars] || 1;
  };

  const getEstimatedTime = (type: string) => {
    const times = {
      'opportunity': '15-20 min',
      'kra': '10-15 min', 
      'route': '5-10 min',
      'follow-up': '20-25 min',
      'cross-sell': '15-20 min'
    };
    return times[type as keyof typeof times] || '10-15 min';
  };

  const handleNudgeAction = (nudge: Nudge) => {
    setSelectedNudge(nudge);
    
    const xpReward = getXPReward(nudge.type, nudge.priority);
    
    switch (nudge.type) {
      case 'opportunity':
        toast({
          title: "🎯 Mission Accepted!",
          description: `+${xpReward} XP • Opening elite prospects mission...`,
        });
        break;
      case 'kra':
        toast({
          title: "🏆 Achievement Mission Started!",
          description: `+${xpReward} XP • Opening KRA progress mission...`,
        });
        break;
      case 'route':
        toast({
          title: "🗺️ Territory Mission Launched!",
          description: `+${xpReward} XP • Opening conquest route planner...`,
        });
        break;
      case 'follow-up':
        toast({
          title: "📞 Sprint Mission Accepted!",
          description: `+${xpReward} XP • Opening follow-up challenge...`,
        });
        break;
      case 'cross-sell':
        toast({
          title: "💼 Quest Begins!",
          description: `+${xpReward} XP • Opening cross-sell adventure...`,
        });
        break;
    }
    
    // Navigate to the respective page
    navigate(nudge.navigationPath);
  };

  const getNudgeIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return <Trophy size={20} className="text-yellow-500" />;
      case 'kra': return <Target size={20} className="text-orange-500" />;
      case 'route': return <MapPin size={20} className="text-green-500" />;
      case 'follow-up': return <Zap size={20} className="text-red-500" />;
      case 'cross-sell': return <Star size={20} className="text-purple-500" />;
      default: return <Bell size={20} />;
    }
  };

  const getNudgeColor = (type: string) => {
    switch (type) {
      case 'opportunity': return 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200 hover:from-yellow-100 hover:to-amber-100';
      case 'kra': return 'bg-gradient-to-r from-orange-50 to-red-50 border-orange-200 hover:from-orange-100 hover:to-red-100';
      case 'route': return 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 hover:from-green-100 hover:to-emerald-100';
      case 'follow-up': return 'bg-gradient-to-r from-red-50 to-pink-50 border-red-200 hover:from-red-100 hover:to-pink-100';
      case 'cross-sell': return 'bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200 hover:from-purple-100 hover:to-indigo-100';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalXP = nudges.reduce((sum, nudge) => sum + getXPReward(nudge.type, nudge.priority), 0);
  
  return (
    <Card>
      <CardHeader className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Trophy size={20} className="mr-2 text-yellow-300" />
            Today's Missions 🎯
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
              {nudges.length} Available
            </Badge>
            <Badge className="bg-yellow-500/20 text-yellow-200 border-yellow-300/30 backdrop-blur-sm">
              {totalXP} XP Potential
            </Badge>
          </div>
        </CardTitle>
        <div className="flex items-center justify-between text-sm text-white/80 mt-2">
          <span>🔥 {nudges.filter(n => n.priority === 'High').length} Critical Missions • ⭐ {nudges.filter(n => n.priority === 'Medium').length} Standard Missions</span>
          <span>💪 Complete all for bonus rewards!</span>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {nudges.map((nudge) => {
            const xpReward = getXPReward(nudge.type, nudge.priority);
            const difficultyStars = getDifficultyStars(nudge.priority);
            const estimatedTime = getEstimatedTime(nudge.type);
            
            return (
              <div key={nudge.id} className={`p-5 border-2 rounded-xl ${getNudgeColor(nudge.type)} hover:shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-opacity-60`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="p-2 rounded-lg bg-white/50 backdrop-blur-sm">
                      {getNudgeIcon(nudge.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-bold text-gray-900 text-lg">{nudge.title}</h4>
                        <div className="flex items-center space-x-2">
                          <Badge className={`${getPriorityColor(nudge.priority)} font-semibold`}>
                            {'⭐'.repeat(difficultyStars)} {nudge.priority}
                          </Badge>
                          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold">
                            +{xpReward} XP
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mb-4 leading-relaxed">{nudge.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center bg-white/60 px-2 py-1 rounded-md">
                            <Clock size={12} className="mr-1 text-blue-500" />
                            {estimatedTime}
                          </span>
                          {nudge.count && (
                            <span className="flex items-center bg-white/60 px-2 py-1 rounded-md">
                              <Users size={12} className="mr-1 text-green-500" />
                              {nudge.count} targets
                            </span>
                          )}
                          {nudge.value && (
                            <span className="flex items-center bg-white/60 px-2 py-1 rounded-md">
                              <IndianRupee size={12} className="mr-1 text-purple-500" />
                              {nudge.value} potential
                            </span>
                          )}
                          {nudge.deadline && (
                            <span className="flex items-center bg-orange-100 text-orange-700 px-2 py-1 rounded-md font-medium">
                              <Calendar size={12} className="mr-1" />
                              {nudge.deadline}
                            </span>
                          )}
                        </div>
                        <Button 
                          size="sm" 
                          onClick={() => handleNudgeAction(nudge)}
                          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                        >
                          {nudge.actionLabel} 🚀
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <Dialog open={!!selectedNudge} onOpenChange={() => setSelectedNudge(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center">
                {selectedNudge && getNudgeIcon(selectedNudge.type)}
                <span className="ml-2">{selectedNudge?.title}</span>
              </DialogTitle>
            </DialogHeader>
            {selectedNudge && (
              <div className="space-y-4">
                <p className="text-gray-700">{selectedNudge.description}</p>
                <div className="flex items-center space-x-4 text-sm">
                  {selectedNudge.count && (
                    <Badge variant="outline">{selectedNudge.count} items</Badge>
                  )}
                  {selectedNudge.value && (
                    <Badge variant="outline">{selectedNudge.value}</Badge>
                  )}
                  {selectedNudge.deadline && (
                    <Badge className="bg-orange-100 text-orange-800">{selectedNudge.deadline}</Badge>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button 
                    onClick={() => {
                      handleNudgeAction(selectedNudge);
                      setSelectedNudge(null);
                    }}
                    className="bg-teal-600 hover:bg-teal-700"
                  >
                    {selectedNudge.actionLabel}
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedNudge(null)}>
                    Close
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default SmartNudges;
