
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Phone, 
  Mail, 
  Calendar, 
  MessageSquare, 
  Bot, 
  Clock,
  User,
  Building,
  FileText,
  TrendingUp
} from 'lucide-react';

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
  const [communicationType, setCommunicationType] = useState('Call');
  const [communicationNotes, setCommunicationNotes] = useState('');
  const [outcome, setOutcome] = useState('Neutral');

  const communicationHistory = [
    {
      id: '1',
      type: 'Call',
      status: 'positive',
      date: '2025-06-06',
      summary: 'Follow-up call about policy renewal. Customer was initially concerned about the premium increase but agreed to renew after explaining enhanced benefits and loyalty discount.',
      conversation: [
        { time: '00:03', speaker: 'Agent', message: 'Hello, this is Bharti AXA. How can I assist you today?' },
        { time: '00:10', speaker: 'Customer', message: 'Hi, I received a reminder about my policy renewal but I\'m not sure if I want to continue.' },
        { time: '00:18', speaker: 'Agent', message: 'I understand your concern. May I know what\'s making you hesitant about renewing your policy?' },
        { time: '00:26', speaker: 'Customer', message: 'Well, the premium seems higher than what I was paying last year, and I\'m wondering if there are any other options.' }
      ]
    },
    {
      id: '2',
      type: 'Meeting',
      status: 'positive', 
      date: '2025-04-20',
      summary: 'Productive meeting with Ayaan Singh. Customer agreed to renew policy.',
      conversation: []
    }
  ];

  const analysisReport = {
    sentiment: 'Initially hesitant, then positive',
    customerConcerns: 'The customer began with clear price concerns but shifted to a more positive outlook once value was explained.',
    decisionDrivers: 'Price-to-value ratio. The customer was primarily concerned with premium increases but was receptive when additional benefits were explained.',
    renewalLikelihood: 'High (85%)',
    renewalDetails: 'The customer verbally committed to renewal after understanding the enhanced coverage benefits.',
    priceSensitivity: 'High',
    priceSensitivityDetails: 'The customer\'s initial hesitation was directly related to premium increases, indicating strong price sensitivity.',
    valueRecognition: 'Strong',
    valueRecognitionDetails: 'Despite price concerns, the customer responded well to explanations about additional coverage'
  };

  const templates = [
    'Renewal Reminder Call',
    'Quote Email', 
    'Meeting Request',
    'Follow-up Call'
  ];

  const handleLogCommunication = () => {
    console.log('Logging communication:', {
      type: communicationType,
      notes: communicationNotes,
      outcome: outcome
    });
    setCommunicationNotes('');
  };

  const handleAnalyzeCall = () => {
    setShowAnalysis(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building size={20} />
            Lead Details - {lead.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="details">Customer Details</TabsTrigger>
                <TabsTrigger value="activity">Activity Logs</TabsTrigger>
                <TabsTrigger value="followups">Follow-ups</TabsTrigger>
                <TabsTrigger value="scripts">Guided Scripts</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Company</label>
                        <p className="text-sm text-gray-900">{lead.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Contact Person</label>
                        <p className="text-sm text-gray-900">{lead.contact}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Phone</label>
                        <p className="text-sm text-gray-900">{lead.phone}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <p className="text-sm text-gray-900">{lead.email}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Status</label>
                        <Badge variant="outline" className="capitalize">{lead.status}</Badge>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Source</label>
                        <p className="text-sm text-gray-900">{lead.source}</p>
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
                        <p className="text-sm text-gray-900">{lead.assignedTo}</p>
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
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Communication History
                      <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                        Lead auto-escalated to Sales team
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {communicationHistory.map((comm) => (
                      <div key={comm.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {comm.type === 'Call' ? (
                              <Phone size={16} className="text-blue-600" />
                            ) : (
                              <Calendar size={16} className="text-green-600" />
                            )}
                            <span className="font-medium">{comm.type}</span>
                            <Badge 
                              variant="outline" 
                              className={comm.status === 'positive' ? 'text-green-700 border-green-200' : 'text-gray-700'}
                            >
                              {comm.status}
                            </Badge>
                          </div>
                          <span className="text-sm text-gray-500">{comm.date}</span>
                        </div>
                        
                        {comm.type === 'Call' && (
                          <Button 
                            variant="link" 
                            className="p-0 h-auto text-blue-600 mb-2"
                            onClick={() => {/* View call details */}}
                          >
                            View call details →
                          </Button>
                        )}

                        <div className="bg-gray-50 rounded p-3 mb-3">
                          <h4 className="font-medium text-sm mb-2">Conversation</h4>
                          <div className="space-y-2 max-h-32 overflow-y-auto">
                            {comm.conversation.map((msg, idx) => (
                              <div key={idx} className="text-xs">
                                <span className="text-gray-500">{msg.time}</span>
                                <div className={`p-2 rounded mt-1 ${
                                  msg.speaker === 'Agent' 
                                    ? 'bg-blue-50 text-blue-900 ml-4' 
                                    : 'bg-white border mr-4'
                                }`}>
                                  <strong>{msg.speaker}:</strong> {msg.message}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-blue-50 rounded p-3">
                          <h4 className="font-medium text-sm mb-1">Summary</h4>
                          <p className="text-sm text-gray-700">{comm.summary}</p>
                        </div>

                        {comm.type === 'Call' && (
                          <div className="mt-3 flex justify-end">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={handleAnalyzeCall}
                              className="flex items-center gap-2"
                            >
                              <Bot size={14} />
                              Analyze call summary with AI
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="followups" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Follow-up Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">No follow-up actions scheduled.</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="scripts" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Guided Scripts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">No guided scripts available.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4">
            {/* Log Communication */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Log Communication</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Communication Type</label>
                  <Select value={communicationType} onValueChange={setCommunicationType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Call">Call</SelectItem>
                      <SelectItem value="Email">Email</SelectItem>
                      <SelectItem value="Meeting">Meeting</SelectItem>
                      <SelectItem value="SMS">SMS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Notes</label>
                  <Textarea
                    placeholder="Enter communication details..."
                    value={communicationNotes}
                    onChange={(e) => setCommunicationNotes(e.target.value)}
                    rows={3}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Outcome</label>
                  <Select value={outcome} onValueChange={setOutcome}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Positive">Positive</SelectItem>
                      <SelectItem value="Neutral">Neutral</SelectItem>
                      <SelectItem value="Negative">Negative</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={handleLogCommunication}
                  className="w-full bg-[#056262] hover:bg-[#045050]"
                >
                  <MessageSquare size={16} className="mr-2" />
                  Log Communication
                </Button>
              </CardContent>
            </Card>

            {/* Communication Templates */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Communication Templates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {templates.map((template, index) => (
                  <Button 
                    key={index}
                    variant="outline" 
                    className="w-full justify-start text-sm"
                  >
                    {template}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AI Analysis Modal */}
        {showAnalysis && (
          <Dialog open={showAnalysis} onOpenChange={setShowAnalysis}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Bot size={20} className="text-blue-600" />
                  AI Call Analysis
                </DialogTitle>
                <p className="text-sm text-gray-600">Analysis complete</p>
              </DialogHeader>

              <div className="space-y-4">
                <div className="bg-gray-50 rounded p-4">
                  <h3 className="font-medium mb-3">Call Analysis Report</h3>
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <strong>Customer Sentiment:</strong> {analysisReport.sentiment}
                      <br />
                      {analysisReport.customerConcerns}
                    </div>

                    <div>
                      <strong>Decision Drivers:</strong> {analysisReport.decisionDrivers}
                    </div>

                    <div>
                      <strong>Renewal Likelihood:</strong> {analysisReport.renewalLikelihood}
                      <br />
                      {analysisReport.renewalDetails}
                    </div>

                    <div>
                      <strong>Price Sensitivity:</strong> {analysisReport.priceSensitivity}
                      <br />
                      {analysisReport.priceSensitivityDetails}
                    </div>

                    <div>
                      <strong>Value Recognition:</strong> {analysisReport.valueRecognition}
                      <br />
                      {analysisReport.valueRecognitionDetails}
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={() => setShowAnalysis(false)}
                  className="w-full"
                >
                  Close
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LeadViewModal;
