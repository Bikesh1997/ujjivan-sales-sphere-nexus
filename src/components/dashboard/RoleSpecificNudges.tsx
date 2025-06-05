
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Bell, TrendingUp, Target, MapPin, Users, IndianRupee, Calendar, Phone, UserCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { expandedLeadsData } from '@/data/expandedLeadsData';

interface Nudge {
  id: string;
  title: string;
  description: string;
  type: 'opportunity' | 'kra' | 'route' | 'follow-up' | 'cross-sell' | 'support' | 'portfolio';
  priority: 'High' | 'Medium' | 'Low';
  actionLabel: string;
  navigationPath: string;
  value?: string;
  count?: number;
  deadline?: string;
}

const RoleSpecificNudges = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedNudge, setSelectedNudge] = useState<Nudge | null>(null);

  // Calculate dynamic nudges based on user data
  const userLeads = user?.role === 'supervisor' ? expandedLeadsData : expandedLeadsData.filter(lead => lead.assignedToId === user?.id);
  const overdueLeads = userLeads.filter(lead => lead.lastContact.includes('days ago') || lead.lastContact.includes('week ago'));
  const highValueProspects = userLeads.filter(lead => parseFloat(lead.value.replace('₹', '').replace('L', '')) > 50);

  const getRoleSpecificNudges = (): Nudge[] => {
    switch (user?.role) {
      case 'field_sales_officer':
        return [
          {
            id: 'fso-1',
            title: 'Beat Plan Optimization',
            description: `Visit ${highValueProspects.length} high-value prospects in your territory today. Optimize route for maximum efficiency.`,
            type: 'route',
            priority: 'High',
            actionLabel: 'Plan Route',
            navigationPath: '/geo-location',
            count: highValueProspects.length
          },
          {
            id: 'fso-2',
            title: 'KRA Achievement Alert',
            description: `Complete ${3 - userLeads.filter(lead => lead.status === 'converted').length} more conversions to achieve monthly target.`,
            type: 'kra',
            priority: 'High',
            actionLabel: 'View Pipeline',
            navigationPath: '/funnel',
            count: 3 - userLeads.filter(lead => lead.status === 'converted').length,
            deadline: '15 days left'
          },
          {
            id: 'fso-3',
            title: 'Follow-up Required',
            description: `${overdueLeads.length} leads need immediate follow-up. Don't lose potential business!`,
            type: 'follow-up',
            priority: 'Medium',
            actionLabel: 'View Tasks',
            navigationPath: '/tasks',
            count: overdueLeads.length
          }
        ];

      case 'inbound_contact_agent':
        return [
          {
            id: 'ica-1',
            title: 'Incoming Lead Queue',
            description: `${Math.floor(Math.random() * 15) + 5} new leads waiting for initial contact. Response time critical!`,
            type: 'support',
            priority: 'High',
            actionLabel: 'Handle Leads',
            navigationPath: '/leads',
            count: Math.floor(Math.random() * 15) + 5
          },
          {
            id: 'ica-2',
            title: 'Customer Query Backlog',
            description: `${Math.floor(Math.random() * 8) + 3} customer queries pending resolution. Maintain service quality.`,
            type: 'support',
            priority: 'Medium',
            actionLabel: 'View Queries',
            navigationPath: '/tasks',
            count: Math.floor(Math.random() * 8) + 3
          },
          {
            id: 'ica-3',
            title: 'Lead Qualification Target',
            description: 'Qualify 5 more leads today to meet daily target. Current progress: 70%',
            type: 'kra',
            priority: 'Medium',
            actionLabel: 'Qualify Leads',
            navigationPath: '/leads',
            count: 5
          }
        ];

      case 'relationship_manager':
        return [
          {
            id: 'rm-1',
            title: 'High-Value Portfolio Review',
            description: `${highValueProspects.length} clients due for portfolio review. Identify upsell opportunities.`,
            type: 'portfolio',
            priority: 'High',
            actionLabel: 'Review Portfolio',
            navigationPath: '/customers',
            count: highValueProspects.length,
            value: '₹125L'
          },
          {
            id: 'rm-2',
            title: 'Cross-Sell Opportunities',
            description: '8 existing customers eligible for insurance and investment products.',
            type: 'cross-sell',
            priority: 'High',
            actionLabel: 'View Opportunities',
            navigationPath: '/customers',
            count: 8,
            value: '₹45L'
          },
          {
            id: 'rm-3',
            title: 'Relationship Maintenance',
            description: 'Schedule quarterly reviews with top 5 clients. Strengthen relationships.',
            type: 'portfolio',
            priority: 'Medium',
            actionLabel: 'Schedule Reviews',
            navigationPath: '/tasks',
            count: 5
          }
        ];

      case 'supervisor':
        return [
          {
            id: 'sup-1',
            title: 'Team Performance Alert',
            description: '2 team members below target. Immediate coaching required.',
            type: 'kra',
            priority: 'High',
            actionLabel: 'View Team',
            navigationPath: '/team-performance',
            count: 2
          },
          {
            id: 'sup-2',
            title: 'Lead Allocation Needed',
            description: `${overdueLeads.length} unassigned leads in pipeline. Optimize distribution.`,
            type: 'opportunity',
            priority: 'High',
            actionLabel: 'Allocate Leads',
            navigationPath: '/lead-allocation',
            count: overdueLeads.length
          },
          {
            id: 'sup-3',
            title: 'Geo-fence Violations',
            description: '3 field agents outside assigned territories. Monitor compliance.',
            type: 'route',
            priority: 'Medium',
            actionLabel: 'View Tracking',
            navigationPath: '/geo-location',
            count: 3
          }
        ];

      default:
        return [
          {
            id: 'def-1',
            title: 'System Overview',
            description: 'Check system performance and user activity.',
            type: 'kra',
            priority: 'Low',
            actionLabel: 'View Dashboard',
            navigationPath: '/',
            count: 1
          }
        ];
    }
  };

  const nudges = getRoleSpecificNudges();

  const handleNudgeAction = (nudge: Nudge) => {
    setSelectedNudge(nudge);
    
    toast({
      title: nudge.title,
      description: `Opening ${nudge.actionLabel.toLowerCase()}...`,
    });
    
    navigate(nudge.navigationPath);
  };

  const getNudgeIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return <TrendingUp size={20} className="text-blue-600" />;
      case 'kra': return <Target size={20} className="text-orange-600" />;
      case 'route': return <MapPin size={20} className="text-green-600" />;
      case 'follow-up': return <Calendar size={20} className="text-red-600" />;
      case 'cross-sell': return <Users size={20} className="text-purple-600" />;
      case 'support': return <Phone size={20} className="text-blue-600" />;
      case 'portfolio': return <UserCheck size={20} className="text-indigo-600" />;
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
      case 'support': return 'bg-blue-50 border-blue-200';
      case 'portfolio': return 'bg-indigo-50 border-indigo-200';
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
          Smart Nudges - {user?.role?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          <Badge className="ml-2 bg-teal-100 text-teal-800">
            {nudges.filter(n => n.priority === 'High').length} High Priority
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {nudges.map((nudge) => (
            <div key={nudge.id} className={`p-4 border rounded-lg ${getNudgeColor(nudge.type)} hover:shadow-md transition-shadow`}>
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
      </CardContent>
    </Card>
  );
};

export default RoleSpecificNudges;
