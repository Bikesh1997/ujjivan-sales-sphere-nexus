
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, Target, TrendingUp } from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  type: string;
  target: string;
  status: string;
  startDate: string;
  endDate: string;
  progress: number;
  leads: number;
  conversions: number;
}

interface CampaignDetailsModalProps {
  campaign: Campaign | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const CampaignDetailsModal = ({ campaign, isOpen, onOpenChange }: CampaignDetailsModalProps) => {
  if (!campaign) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'planned': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const conversionRate = campaign.leads > 0 ? ((campaign.conversions / campaign.leads) * 100).toFixed(1) : '0';

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Campaign Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-lg">{campaign.name}</h3>
            <Badge className={getStatusColor(campaign.status)} >
              {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Target size={16} className="text-gray-500" />
              <span className="text-sm">Type: {campaign.type}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm">Target: {campaign.target}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Calendar size={16} className="text-gray-500" />
              <span className="text-sm">Start: {campaign.startDate}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar size={16} className="text-gray-500" />
              <span className="text-sm">End: {campaign.endDate}</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm">{campaign.progress}%</span>
            </div>
            <Progress value={campaign.progress} className="h-2" />
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-lg font-semibold text-blue-600">{campaign.leads}</div>
              <div className="text-xs text-gray-500">Leads</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-green-600">{campaign.conversions}</div>
              <div className="text-xs text-gray-500">Conversions</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-purple-600">{conversionRate}%</div>
              <div className="text-xs text-gray-500">Rate</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CampaignDetailsModal;
