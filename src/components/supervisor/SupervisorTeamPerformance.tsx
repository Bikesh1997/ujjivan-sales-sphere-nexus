import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, Target } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  status: string;
  revenue: number;
  target: number;
}

interface SupervisorTeamPerformanceProps {
  teamMembers: TeamMember[];
  onViewDetails: (member: TeamMember) => void;
  onAssignLeads: (member: TeamMember) => void;
}

const SupervisorTeamPerformance = ({ 
  teamMembers, 
  onViewDetails, 
  onAssignLeads 
}: SupervisorTeamPerformanceProps) => {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState('savings-account');

  // Banking products based on the Ujjivan SFB image
  const bankingProducts = [
    { value: 'savings-account', label: 'Savings Account' },
    { value: 'current-account', label: 'Current Account' },
    { value: 'deposits', label: 'Deposits' },
    { value: 'home-loans', label: 'Home Loans' },
    { value: 'two-wheeler-loan', label: 'Two Wheeler Loan' },
    { value: 'msme-loan', label: 'MSME Loan' },
    { value: 'video-banking', label: 'Video Banking' },
    { value: 'gold-loan', label: 'Gold Loan' },
    { value: 'agri-loans', label: 'Agri. Loans' },
    { value: 'micro-loan', label: 'Micro Loan' },
    { value: 'insurance', label: 'Insurance' },
    { value: 'retail-forex', label: 'Retail Forex & Trade' },
    { value: 'sampoorna-family', label: 'Sampoorna Family Banking' },
    { value: 'life-event-banking', label: 'Life Event Based Banking Services' }
  ];

  const regions = [
    { value: 'all', label: 'All Regions' },
    { value: 'north', label: 'North' },
    { value: 'south', label: 'South' },
    { value: 'east', label: 'East' },
    { value: 'west', label: 'West' },
    { value: 'central', label: 'Central' }
  ];

  // Generate performance data based on selected product and region
  const getPerformanceData = () => {
    // Product-specific categories for x-axis
    const productCategories = {
      'savings-account': ['New Accounts', 'Account Upgrades', 'Digital Onboarding', 'Branch Visits'],
      'current-account': ['SME Accounts', 'Corporate Accounts', 'Startup Accounts', 'Freelancer Accounts'],
      'deposits': ['Fixed Deposits', 'Recurring Deposits', 'Senior Citizen FD', 'Tax Saver FD'],
      'home-loans': ['First Home', 'Home Extension', 'Plot Purchase', 'Construction Loan'],
      'two-wheeler-loan': ['New Vehicle', 'Used Vehicle', 'Electric Vehicle', 'Commercial 2W'],
      'msme-loan': ['Working Capital', 'Term Loan', 'Equipment Finance', 'Cash Credit'],
      'video-banking': ['Account Opening', 'Loan Processing', 'Investment Advisory', 'Customer Support'],
      'gold-loan': ['Jewelry Loan', 'Gold Coin Loan', 'Digital Gold', 'Gold Investment'],
      'agri-loans': ['Crop Loan', 'Equipment Loan', 'Livestock Loan', 'Irrigation Loan'],
      'micro-loan': ['Personal Loan', 'Business Loan', 'Education Loan', 'Medical Loan'],
      'insurance': ['Life Insurance', 'Health Insurance', 'Vehicle Insurance', 'Property Insurance'],
      'retail-forex': ['Travel Card', 'Forex Exchange', 'Trade Finance', 'Remittances'],
      'sampoorna-family': ['Family Savings', 'Child Education', 'Retirement Planning', 'Emergency Fund'],
      'life-event-banking': ['Marriage Finance', 'Education Loan', 'Home Purchase', 'Retirement Planning']
    };

    const categories = productCategories[selectedProduct] || ['Category 1', 'Category 2', 'Category 3', 'Category 4'];
    
    // Generate realistic data for each category
    return categories.map((category, index) => {
      const baseTarget = 50 + (index * 15);
      const baseAchieved = baseTarget * (0.7 + Math.random() * 0.4);
      
      // Adjust based on region
      let regionMultiplier = 1;
      switch (selectedRegion) {
        case 'north': regionMultiplier = 1.2; break;
        case 'south': regionMultiplier = 1.1; break;
        case 'west': regionMultiplier = 1.3; break;
        case 'east': regionMultiplier = 0.9; break;
        case 'central': regionMultiplier = 1.0; break;
        default: regionMultiplier = 1;
      }

      return {
        name: category,
        target: Math.round(baseTarget * regionMultiplier),
        achieved: Math.round(baseAchieved * regionMultiplier),
        conversion: Math.round((baseAchieved / baseTarget) * 100)
      };
    });
  };

  // Get top performing team members (top 3)
  const getTopTeamMembers = () => {
    return [...teamMembers]
      .sort((a, b) => (b.revenue / b.target) - (a.revenue / a.target))
      .slice(0, 3);
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const getPerformanceColor = (achieved: number, target: number) => {
    const percentage = (achieved / target) * 100;
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const teamPerformanceData = getPerformanceData();
  const topTeamMembers = getTopTeamMembers();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Team Performance Comparison</CardTitle>
          <div className="flex gap-4 mt-4">
            <div className="flex-1">
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Region" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region.value} value={region.value}>
                      {region.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Product" />
                </SelectTrigger>
                <SelectContent>
                  {bankingProducts.map((product) => (
                    <SelectItem key={product.value} value={product.value}>
                      {product.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={teamPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                label={{ value: 'Product Categories', position: 'insideBottom', offset: -5 }}
              />
              <YAxis 
                label={{ value: 'Revenue (₹L)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip />
              <Bar dataKey="target" fill="#e2e8f0" name="Target" />
              <Bar dataKey="achieved" fill="#0d9488" name="Achieved" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            {topTeamMembers.map((member, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-teal-100 text-teal-700 rounded-full font-bold text-sm">
                    #{index + 1}
                  </div>
                  <Avatar>
                    <AvatarFallback className="bg-teal-100 text-teal-700">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.role}</p>
                    <Badge className={getStatusColor(member.status)}>
                      {member.status}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">
                    ₹{member.revenue}L / ₹{member.target}L
                  </p>
                  <p className={`text-lg font-bold ${getPerformanceColor(member.revenue, member.target)}`}>
                    {Math.round((member.revenue / member.target) * 100)}%
                  </p>
                  <div className="flex space-x-2 mt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onViewDetails(member)}
                    >
                      <Eye size={14} className="mr-1" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onAssignLeads(member)}
                    >
                      <Target size={14} className="mr-1" />
                      Assign
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupervisorTeamPerformance;
