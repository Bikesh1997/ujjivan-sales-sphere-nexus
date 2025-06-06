
import { Card, CardContent } from "@/components/ui/card";
import { Users, CheckCircle2, UserCheck, BadgeCheck } from "lucide-react";

export interface LeadStatsCardsProps {
  stats: {
    total: number;
    new: number;
    contacted: number;
    qualified: number;
    converted: number;
  };
}

const LeadStatsCards = ({ stats }: LeadStatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center">
            <div className="p-2 bg-gray-100 rounded-full mr-3">
              <Users size={20} className="text-gray-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Leads</p>
              <h3 className="text-2xl font-bold">{stats.total}</h3>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-full mr-3">
              <Users size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">New</p>
              <h3 className="text-2xl font-bold">{stats.new}</h3>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-full mr-3">
              <UserCheck size={20} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Contacted</p>
              <h3 className="text-2xl font-bold">{stats.contacted}</h3>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-full mr-3">
              <CheckCircle2 size={20} className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Qualified</p>
              <h3 className="text-2xl font-bold">{stats.qualified}</h3>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-full mr-3">
              <BadgeCheck size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Converted</p>
              <h3 className="text-2xl font-bold">{stats.converted}</h3>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadStatsCards;
