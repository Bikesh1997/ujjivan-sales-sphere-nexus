
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building } from 'lucide-react';
import AIAnalysisModal from './modals/AIAnalysisModal';
import AddFollowUpModal from './modals/AddFollowUpModal';
import CommunicationHistory from './sections/CommunicationHistory';
import FollowUpActions from './sections/FollowUpActions';
import GuidedScripts from './sections/GuidedScripts';
import CommunicationLogger from './sections/CommunicationLogger';

interface Lead {
  id: string;
  name: string;
  contact: string;
  phone: string;
  email: string;
  status: string;
  source: string;
  value: string;
  assignedTo: string;
  assignedToId: string;
  lastContact: string;
  priority: string;
}

interface LeadViewModalProps {
  lead: Lead;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const LeadViewModal = ({ lead, isOpen, onOpenChange }: LeadViewModalProps) => {
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showAddFollowUp, setShowAddFollowUp] = useState(false);
  const [communicationType, setCommunicationType] = useState('Call');
  const [communicationNotes, setCommunicationNotes] = useState('');
  const [outcome, setOutcome] = useState('Neutral');

  // Follow-up form state
  const [followUpType, setFollowUpType] = useState('Call');
  const [followUpDate, setFollowUpDate] = useState('');
  const [followUpDescription, setFollowUpDescription] = useState('');
  const [followUpPriority, setFollowUpPriority] = useState('Medium');

  const [communicationHistory, setCommunicationHistory] = useState([
    {
      id: '1',
      type: 'Call',
      status: 'positive',
      date: '2025-06-06',
      summary: 'Follow-up call about investment products. Customer showed interest in mutual funds and requested a detailed presentation for next week.',
      conversation: [
        { time: '00:03', speaker: 'Agent', message: 'Hello, this is your financial advisor. How can I assist you today?' },
        { time: '00:10', speaker: 'Customer', message: 'Hi, I received information about investment options and I\'m interested to know more.' },
        { time: '00:18', speaker: 'Agent', message: 'Great! I can help you understand our investment products. What are your investment goals?' },
        { time: '00:26', speaker: 'Customer', message: 'I\'m looking for long-term wealth creation and want to start with mutual funds.' },
        { time: '00:35', speaker: 'Agent', message: 'Perfect! Let me explain our SIP options and portfolio strategies.' },
        { time: '00:42', speaker: 'Customer', message: 'That sounds good. Can you schedule a detailed meeting for next week?' }
      ]
    },
    {
      id: '2',
      type: 'Meeting',
      status: 'positive', 
      date: '2025-04-20',
      summary: 'Productive meeting with customer. Discussed investment portfolio and financial planning strategies.',
      conversation: []
    },
    {
      id: '3',
      type: 'Email',
      status: 'neutral',
      date: '2025-04-15',
      summary: 'Sent product brochure and investment guide. Customer acknowledged receipt but no immediate response on next steps.',
      conversation: []
    }
  ]);

  const [followUpActions, setFollowUpActions] = useState([
    {
      id: '1',
      type: 'Call',
      scheduledDate: '2025-06-10',
      description: 'Follow-up call to discuss mutual fund investment details',
      priority: 'High',
      status: 'Pending'
    },
    {
      id: '2',
      type: 'Meeting',
      scheduledDate: '2025-06-12',
      description: 'Portfolio review meeting with investment advisor',
      priority: 'High',
      status: 'Scheduled'
    },
    {
      id: '3',
      type: 'Email',
      scheduledDate: '2025-06-08',
      description: 'Send detailed investment brochure and SIP calculator',
      priority: 'Medium',
      status: 'Completed'
    }
  ]);

  const guidedScripts = [
    {
      id: '1',
      title: 'Investment Product Introduction',
      category: 'Sales',
      content: `Hi [Customer Name], 

I hope you're doing well. I'm calling to discuss some exciting investment opportunities that align with your financial goals.

Key Points to Cover:
1. Understand current financial situation
2. Explain SIP benefits and compound growth
3. Discuss risk tolerance and investment horizon
4. Present suitable mutual fund options
5. Schedule follow-up meeting for detailed proposal

Remember to:
- Listen actively to customer needs
- Provide clear examples and calculations
- Address any concerns about market volatility
- Emphasize long-term wealth creation benefits`
    },
    {
      id: '2',
      title: 'Follow-up Call Script',
      category: 'Follow-up',
      content: `Hello [Customer Name],

Thank you for your time during our last conversation about investment options.

Purpose of today's call:
1. Address any questions from our previous discussion
2. Present customized investment proposal
3. Explain next steps for account opening
4. Schedule documentation appointment

Key Benefits to Reinforce:
- Tax savings under 80C
- Professional fund management
- Diversified portfolio
- Flexible investment amounts`
    },
    {
      id: '3',
      title: 'Objection Handling Guide',
      category: 'Support',
      content: `Common Objections and Responses:

"Market is too volatile"
→ Explain SIP reduces volatility through rupee cost averaging
→ Show historical long-term returns data
→ Emphasize disciplined investing approach

"I don't have enough money to invest"
→ Highlight minimum SIP amounts (₹500/month)
→ Explain how small amounts grow significantly over time
→ Use SIP calculator for demonstration

"I need time to think"
→ Acknowledge their caution as wise
→ Offer to send educational material
→ Schedule follow-up call in 2-3 days`
    }
  ];

  const analysisReport = {
    sentiment: 'Positive and interested',
    customerConcerns: 'The customer showed genuine interest in investment products with focus on long-term wealth creation.',
    decisionDrivers: 'Investment returns and tax benefits. The customer is primarily motivated by financial growth and tax optimization.',
    conversionLikelihood: 'High (80%)',
    conversionDetails: 'Customer expressed clear intent to start SIP investments and requested detailed meeting.',
    riskTolerance: 'Moderate',
    riskToleranceDetails: 'Customer prefers balanced approach with moderate risk for better returns over long term.',
    investmentReadiness: 'High',
    investmentReadinessDetails: 'Customer has stable income and is ready to commit to systematic investment planning.'
  };

  const templates = [
    'Investment Product Pitch',
    'SIP Benefits Email', 
    'Portfolio Review Meeting',
    'Follow-up Investment Call'
  ];

  const handleLogCommunication = () => {
    if (!communicationNotes.trim()) return;

    const newCommunication = {
      id: Date.now().toString(),
      type: communicationType,
      status: outcome.toLowerCase(),
      date: new Date().toISOString().split('T')[0],
      summary: communicationNotes,
      conversation: []
    };

    setCommunicationHistory(prev => [newCommunication, ...prev]);
    setCommunicationNotes('');
    console.log('Communication logged:', newCommunication);
  };

  const handleAddFollowUp = () => {
    setShowAddFollowUp(true);
  };

  const handleSaveFollowUp = () => {
    if (!followUpDescription.trim() || !followUpDate) return;

    const newFollowUp = {
      id: Date.now().toString(),
      type: followUpType,
      scheduledDate: followUpDate,
      description: followUpDescription,
      priority: followUpPriority,
      status: 'Pending'
    };

    setFollowUpActions(prev => [newFollowUp, ...prev]);
    
    // Reset form
    setFollowUpType('Call');
    setFollowUpDate('');
    setFollowUpDescription('');
    setFollowUpPriority('Medium');
    setShowAddFollowUp(false);
    
    console.log('Follow-up action added:', newFollowUp);
  };

  const handleAnalyzeCall = () => {
    setShowAnalysis(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl w-[95vw] max-h-[95vh] overflow-y-auto p-3 sm:p-4 lg:p-6">
        <DialogHeader className="mb-4 sm:mb-6">
          <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl lg:text-2xl">
            <Building size={20} />
            Lead Details - {lead.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
          {/* Main Content */}
          <div className="xl:col-span-2 order-2 xl:order-1">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-4 sm:mb-6 h-auto p-1">
                <TabsTrigger 
                  value="details" 
                  className="text-[10px] xs:text-xs sm:text-sm px-2 py-2 sm:py-2.5 leading-tight"
                >
                  <span className="hidden xs:inline">Details</span>
                  <span className="xs:hidden">Info</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="activity" 
                  className="text-[10px] xs:text-xs sm:text-sm px-2 py-2 sm:py-2.5 leading-tight"
                >
                  Activity
                </TabsTrigger>
                <TabsTrigger 
                  value="followups" 
                  className="text-[10px] xs:text-xs sm:text-sm px-2 py-2 sm:py-2.5 leading-tight"
                >
                  <span className="hidden sm:inline">Follow-ups</span>
                  <span className="sm:hidden">Follow</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="scripts" 
                  className="text-[10px] xs:text-xs sm:text-sm px-2 py-2 sm:py-2.5 leading-tight"
                >
                  Scripts
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base sm:text-lg">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Company</label>
                        <p className="text-sm text-gray-900 break-words">{lead.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Contact Person</label>
                        <p className="text-sm text-gray-900 break-words">{lead.contact}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Phone</label>
                        <p className="text-sm text-gray-900 break-words">{lead.phone}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <p className="text-sm text-gray-900 break-words">{lead.email}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Status</label>
                        <Badge variant="outline" className="capitalize">{lead.status}</Badge>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Source</label>
                        <p className="text-sm text-gray-900 break-words">{lead.source}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Value</label>
                        <p className="text-sm text-gray-900">{lead.value}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Priority</label>
                        <Badge variant="outline" className="capitalize">{lead.priority}</Badge>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Assigned To</label>
                        <p className="text-sm text-gray-900 break-words">{lead.assignedTo}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Last Contact</label>
                        <p className="text-sm text-gray-900">{lead.lastContact}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="space-y-4 mt-4">
                <CommunicationHistory 
                  communicationHistory={communicationHistory}
                  onAnalyzeCall={handleAnalyzeCall}
                />
              </TabsContent>

              <TabsContent value="followups" className="mt-4">
                <FollowUpActions 
                  followUpActions={followUpActions}
                  onAddFollowUp={handleAddFollowUp}
                />
              </TabsContent>

              <TabsContent value="scripts" className="mt-4">
                <GuidedScripts guidedScripts={guidedScripts} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar */}
          <div className="order-1 xl:order-2">
            <CommunicationLogger 
              communicationType={communicationType}
              setCommunicationType={setCommunicationType}
              communicationNotes={communicationNotes}
              setCommunicationNotes={setCommunicationNotes}
              outcome={outcome}
              setOutcome={setOutcome}
              onLogCommunication={handleLogCommunication}
              templates={templates}
            />
          </div>
        </div>

        {/* AI Analysis Modal */}
        <AIAnalysisModal 
          isOpen={showAnalysis}
          onOpenChange={setShowAnalysis}
          analysisReport={analysisReport}
        />

        {/* Add Follow-up Modal */}
        <AddFollowUpModal 
          isOpen={showAddFollowUp}
          onOpenChange={setShowAddFollowUp}
          followUpType={followUpType}
          setFollowUpType={setFollowUpType}
          followUpDate={followUpDate}
          setFollowUpDate={setFollowUpDate}
          followUpDescription={followUpDescription}
          setFollowUpDescription={setFollowUpDescription}
          followUpPriority={followUpPriority}
          setFollowUpPriority={setFollowUpPriority}
          onSave={handleSaveFollowUp}
        />
      </DialogContent>
    </Dialog>
  );
};

export default LeadViewModal;
