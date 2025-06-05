
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Bell, TrendingUp, Target, MapPin, Users, IndianRupee, Calendar } from 'lucide-react';
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
  value?: string;
  count?: number;
  deadline?: string;
}

const SmartNudges = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedNudge, setSelectedNudge] = useState<Nudge | null>(null);

  // Calculate dynamic nudges based on user data
  const userLeads = user?.role === 'supervisor' ? allLeads : allLeads.filter(lead => lead.assignedToId === user?.id);
  const overdueLeads = userLeads.filter(lead => lead.lastContact.includes('days ago') || lead.lastContact.includes('week ago'));
  const highValueProspects = userLeads.filter(lead => parseFloat(lead.value.replace('₹', '').replace('L', '')) > 30);

  const nudges: Nudge[] = [
    {
      id: '1',
      title: 'High-Value Portfolio Opportunity',
      description: `You have ${highValueProspects.length} senior citizens eligible for FD products. Average ticket size: ₹35L`,
      type: 'opportunity',
      priority: 'High',
      actionLabel: 'View Prospects',
      count: highValueProspects.length,
      value: '₹35L'
    },
    {
      id: '2',
      title: 'KRA Achievement Alert',
      description: `Complete ${3 - userLeads.filter(lead => lead.status === 'converted').length} more loan disbursals to achieve 100% KRA and unlock ₹45K incentive`,
      type: 'kra',
      priority: 'High',
      actionLabel: 'View Pipeline',
      count: 3 - userLeads.filter(lead => lead.status === 'converted').length,
      value: '₹45K',
      deadline: '15 days left'
    },
    {
      id: '3',
      title: 'Beat Plan Optimization',
      description: `Visit customers in Bandra area today. ${overdueLeads.length + 3} high-value prospects within 2km radius.`,
      type: 'route',
      priority: 'Medium',
      actionLabel: 'Plan Route',
      count: overdueLeads.length + 3
    },
    {
      id: '4',
      title: 'Follow-up Required',
      description: `${overdueLeads.length} leads haven't been contacted in 3+ days. Total potential value: ₹${Math.round(overdueLeads.reduce((sum, lead) => sum + parseFloat(lead.value.replace('₹', '').replace('L', '')), 0))}L`,
      type: 'follow-up',
      priority: 'High',
      actionLabel: 'View Overdue',
      count: overdueLeads.length,
      value: `₹${Math.round(overdueLeads.reduce((sum, lead) => sum + parseFloat(lead.value.replace('₹', '').replace('L', '')), 0))}L`
    },
    {
      id: '5',
      title: 'Cross-Sell Opportunity',
      description: `3 converted customers are eligible for insurance products. Potential additional revenue: ₹12L`,
      type: 'cross-sell',
      priority: 'Medium',
      actionLabel: 'View Customers',
      count: 3,
      value: '₹12L'
    }
  ];

  const handleNudgeAction = (nudge: Nudge) => {
    setSelectedNudge(nudge);
    
    switch (nudge.type) {
      case 'opportunity':
        toast({
          title: "Portfolio Opportunity",
          description: `Opening prospects list for ${nudge.count} high-value leads...`,
        });
        break;
      case 'kra':
        toast({
          title: "KRA Pipeline",
          description: "Opening sales pipeline to track progress...",
        });
        break;
      case 'route':
        toast({
          title: "Route Planner",
          description: "Optimizing route for Bandra area visits...",
        });
        break;
      case 'follow-up':
        toast({
          title: "Follow-up List",
          description: `Showing ${nudge.count} overdue leads...`,
        });
        break;
      case 'cross-sell':
        toast({
          title: "Cross-Sell Opportunities",
          description: "Opening customer list for insurance products...",
        });
        break;
    }
  };

  const getNudgeIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return <TrendingUp size={20} className="text-blue-600" />;
      case 'kra': return <Target size={20} className="text-orange-600" />;
      case 'route': return <MapPin size={20} className="text-green-600" />;
      case 'follow-up': return <Calendar size={20} className="text-red-600" />;
      case 'cross-sell': return <Users size={20} className="text-purple-600" />;
      default: return <Bell size={20} />;
    }
  };

  const getNudgeColor = (type: string) => {
    switch (type) {
      case 'opportunity': return 'bg-blue-50 border-blue-200';
      case 'kra': return 'bg-orange-50 border-orange-200';
      case 'route': return 'bg-green-50 border-green-200';
      case 'follow-up': return 'bg-red-50 border-red-200';
      case 'cross-sell': return 'bg-purple-50 border-purple-200';
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bell size={18} className="mr-2" />
          Smart Nudges
          <Badge className="ml-2 bg-teal-100 text-teal-800">
            {nudges.filter(n => n.priority === 'High').length} High Priority
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {nudges.map((nudge) => (
            <div key={nudge.id} className={`p-4 border rounded-lg ${getNudgeColor(nudge.type)} hover:shadow-md transition-shadow cursor-pointer`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  {getNudgeIcon(nudge.type)}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-medium text-gray-900">{nudge.title}</h4>
                      <Badge className={getPriorityColor(nudge.priority)}>
                        {nudge.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">{nudge.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        {nudge.count && (
                          <span className="flex items-center">
                            <Users size={12} className="mr-1" />
                            {nudge.count} items
                          </span>
                        )}
                        {nudge.value && (
                          <span className="flex items-center">
                            <IndianRupee size={12} className="mr-1" />
                            {nudge.value}
                          </span>
                        )}
                        {nudge.deadline && (
                          <span className="flex items-center text-orange-600">
                            <Calendar size={12} className="mr-1" />
                            {nudge.deadline}
                          </span>
                        )}
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => handleNudgeAction(nudge)}
                        className="bg-teal-600 hover:bg-teal-700"
                      >
                        {nudge.actionLabel}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Dialog open={!!selectedNudge} onOpenChange={() => setSelectedNudge(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center">
                {selectedNudge && getNudgeIcon(selectedNudge.type)}
                <span className="ml-2">{selectedNudge?.title}</span>
              </DialogTitle>
              <DialogDescription>
                Take action on this smart nudge to improve your sales performance.
              </DialogDescription>
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
