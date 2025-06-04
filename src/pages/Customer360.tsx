import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  MapPin, 
  Building, 
  DollarSign,
  TrendingUp,
  Clock,
  FileText,
  MessageSquare,
  Star
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Customer360 = () => {
  const { toast } = useToast();
  const [selectedCustomer, setSelectedCustomer] = useState('customer-1');

  const customerData = {
    'customer-1': {
      id: 'customer-1',
      name: 'John Smith',
      email: 'john.smith@techcorp.com',
      phone: '+1 (555) 123-4567',
      company: 'TechCorp Solutions',
      position: 'CEO',
      location: 'San Francisco, CA',
      joinDate: '2023-01-15',
      totalValue: '₹45L',
      status: 'Active',
      satisfaction: 4.8,
      lastContact: '2024-01-15'
    }
  };

  const interactionHistory = [
    {
      id: 1,
      type: 'call',
      date: '2024-01-15',
      description: 'Follow-up call regarding project timeline',
      outcome: 'Positive'
    },
    {
      id: 2,
      type: 'email',
      date: '2024-01-10',
      description: 'Sent proposal for Q2 expansion',
      outcome: 'Pending'
    },
    {
      id: 3,
      type: 'meeting',
      date: '2024-01-08',
      description: 'Strategic planning session',
      outcome: 'Successful'
    }
  ];

  const opportunities = [
    {
      id: 1,
      title: 'Q2 Expansion Project',
      value: '₹25L',
      stage: 'Proposal',
      probability: 75,
      closeDate: '2024-03-30'
    },
    {
      id: 2,
      title: 'System Integration',
      value: '₹15L',
      stage: 'Negotiation',
      probability: 60,
      closeDate: '2024-04-15'
    }
  ];

  const handleCall = () => {
    toast({
      title: "Initiating Call",
      description: "Starting call with the customer",
    });
  };

  const handleEmail = () => {
    toast({
      title: "Compose Email",
      description: "Opening email composer",
    });
  };

  const handleScheduleMeeting = () => {
    toast({
      title: "Schedule Meeting",
      description: "Opening calendar to schedule meeting",
    });
  };

  const handleAddNote = () => {
    toast({
      title: "Add Note",
      description: "Opening note composer",
    });
  };

  const handleViewOpportunity = (opportunityId: number) => {
    toast({
      title: "View Opportunity",
      description: `Opening details for opportunity ${opportunityId}`,
    });
  };

  const currentCustomer = customerData[selectedCustomer as keyof typeof customerData];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer 360°</h1>
          <p className="text-gray-600">Complete view of customer relationship and history</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleCall}>
            <Phone size={16} className="mr-2" />
            Call
          </Button>
          <Button variant="outline" onClick={handleEmail}>
            <Mail size={16} className="mr-2" />
            Email
          </Button>
          <Button onClick={handleScheduleMeeting}>
            <Calendar size={16} className="mr-2" />
            Schedule Meeting
          </Button>
        </div>
      </div>

      {/* Customer Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start space-x-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={`https://avatar.vercel.sh/${currentCustomer.name}.png`} alt={currentCustomer.name} />
              <AvatarFallback className="text-xl">
                {currentCustomer.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-semibold">{currentCustomer.name}</h3>
                <p className="text-gray-600">{currentCustomer.position}</p>
                <p className="text-gray-600">{currentCustomer.company}</p>
                <Badge className="mt-2">{currentCustomer.status}</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Mail size={16} className="text-gray-400" />
                  <span className="text-sm">{currentCustomer.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone size={16} className="text-gray-400" />
                  <span className="text-sm">{currentCustomer.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin size={16} className="text-gray-400" />
                  <span className="text-sm">{currentCustomer.location}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <DollarSign size={16} className="text-gray-400" />
                  <span className="text-sm">Total Value: {currentCustomer.totalValue}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star size={16} className="text-gray-400" />
                  <span className="text-sm">Satisfaction: {currentCustomer.satisfaction}/5</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock size={16} className="text-gray-400" />
                  <span className="text-sm">Last Contact: {currentCustomer.lastContact}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Information */}
      <Tabs defaultValue="interactions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="interactions">Interaction History</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="interactions">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Interactions</CardTitle>
              <Button onClick={handleAddNote}>
                <FileText size={16} className="mr-2" />
                Add Note
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {interactionHistory.map((interaction) => (
                  <div key={interaction.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                    <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                      {interaction.type === 'call' && <Phone size={16} className="text-blue-600" />}
                      {interaction.type === 'email' && <Mail size={16} className="text-blue-600" />}
                      {interaction.type === 'meeting' && <Calendar size={16} className="text-blue-600" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{interaction.description}</h4>
                        <span className="text-sm text-gray-500">{interaction.date}</span>
                      </div>
                      <Badge variant="outline" className="mt-1">
                        {interaction.outcome}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="opportunities">
          <Card>
            <CardHeader>
              <CardTitle>Active Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {opportunities.map((opportunity) => (
                  <div key={opportunity.id} className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50" onClick={() => handleViewOpportunity(opportunity.id)}>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{opportunity.title}</h4>
                      <span className="text-lg font-semibold text-green-600">{opportunity.value}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <Badge variant="outline">{opportunity.stage}</Badge>
                      <span>Probability: {opportunity.probability}%</span>
                      <span>Close Date: {opportunity.closeDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Documents & Files</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <FileText size={48} className="mx-auto mb-4 text-gray-300" />
                <p>No documents uploaded yet</p>
                <Button variant="outline" className="mt-4">
                  Upload Document
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Customer Notes</CardTitle>
              <Button onClick={handleAddNote}>
                <MessageSquare size={16} className="mr-2" />
                Add Note
              </Button>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <MessageSquare size={48} className="mx-auto mb-4 text-gray-300" />
                <p>No notes added yet</p>
                <Button variant="outline" className="mt-4" onClick={handleAddNote}>
                  Add First Note
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Customer360;
