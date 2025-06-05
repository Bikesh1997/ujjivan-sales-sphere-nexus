
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Bot, 
  MessageCircle, 
  Send, 
  Minimize2, 
  Maximize2,
  MapPin,
  Phone,
  TrendingUp,
  Users,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  actions?: string[];
}

const AIAssistantWidget = () => {
  const { user } = useAuth();
  const [isMinimized, setIsMinimized] = useState(true);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  // Role-specific AI prompts and responses
  const getRoleSpecificPrompt = () => {
    switch (user?.role) {
      case 'field_sales_officer':
        return "I'm your Field Sales AI assistant. I can help you with beat planning, customer visits, and converting leads. What would you like assistance with today?";
      case 'inbound_contact_agent':
        return "I'm your Inbound Contact AI assistant. I can help you manage incoming leads, verify KYC, and handle customer inquiries. How can I assist you?";
      case 'relationship_manager':
        return "I'm your Relationship Management AI assistant. I can help you manage your portfolio, identify cross-sell opportunities, and nurture customer relationships. What do you need help with?";
      case 'supervisor':
        return "I'm your Supervisory AI assistant. I can help you monitor team performance, track field coverage, and manage compliance. How can I support your team today?";
      case 'admin_mis_officer':
        return "I'm your Admin/MIS AI assistant. I can help you with system configurations, MIS reports, and user management. What would you like assistance with?";
      default:
        return "Hello! I'm your AI assistant. How can I help you today?";
    }
  };

  const generateAIResponse = (userMessage: string): Message => {
    const roleResponses = {
      'field_sales_officer': {
        'route': "Based on your beat plan, I suggest visiting 3 high-priority customers in Bandra today. Customer A (loan renewal due), Customer B (FD maturity), and Customer C (new prospect). Optimal route: A→B→C saves 2 hours travel time.",
        'kra': "You're currently at 75% of your monthly KRA. Convert 2 more loans (₹15L target remaining) to unlock ₹4,000 incentive. I've identified 5 hot prospects within 1km of your current location.",
        'customer': "Customer Raj Singh last visited 45 days ago, has ₹25L FD maturing next week. High cross-sell score for gold loan. Suggest calling today to schedule visit.",
        'default': "I can help you with beat planning, customer visits, KRA tracking, and lead conversion. Try asking about your route, KRA progress, or specific customers."
      },
      'inbound_contact_agent': {
        'lead': "New lead from WhatsApp - Priya Mehta, interested in home loan. KYC pending, credit score 750+. Suggest immediate callback and schedule field visit within 24 hours.",
        'verify': "For KYC verification, I need: PAN, Aadhaar, Income proof, and Bank statements. I can generate the verification checklist and set follow-up reminders.",
        'callback': "You have 5 pending callbacks today. Priority order: High-value prospects first. Mrs. Sharma (₹50L loan inquiry) - call by 2 PM, Mr. Gupta (FD inquiry) - call by 4 PM.",
        'default': "I can help you manage incoming leads, verify customer details, schedule callbacks, and route leads to field teams. What specific task can I assist with?"
      },
      'relationship_manager': {
        'portfolio': "Your portfolio: 45 customers, ₹2.5Cr total assets. 3 FDs maturing this month (₹75L), 2 customers inactive 30+ days. Cross-sell opportunity: 5 customers eligible for gold loans.",
        'cross-sell': "Mr. Agarwal's FD matures in 7 days. He has gold worth ₹15L, credit score 780. Perfect candidate for gold loan at 8.5% interest. Suggest meeting this week.",
        'relationship': "Family network identified: Sharma family has 4 banking relationships across branches. Son eligible for education loan, father has recurring deposits. Schedule family meeting for comprehensive planning.",
        'default': "I can help you manage your high-value customer portfolio, identify cross-sell opportunities, track customer relationships, and plan family banking strategies."
      },
      'supervisor': {
        'team': "Team status: 4/5 field officers active, 85% beat coverage today. Rahul completed 6/8 planned visits, Anjali at 4/6. Overall team performance 82% vs target.",
        'tracking': "Real-time locations: Rahul - Bandra West (on schedule), Anjali - Andheri (30 min behind), Vikash - offline since 2 PM (needs check-in).",
        'performance': "Weekly performance: Team achieved 92% of lead targets, 78% conversion rate. Top performer: Priya (110% target). Training needed: Vikash (cross-sell techniques).",
        'default': "I can help you monitor team performance, track field coverage, manage compliance, and identify coaching opportunities for your team members."
      },
      'admin_mis_officer': {
        'reports': "Daily MIS ready: 127 new leads, 89% data sync success, 3 inactive users detected. Lead sources: WhatsApp 45%, Website 35%, Referrals 20%.",
        'config': "System health: All APIs running, KRA targets updated for Q2, 2 new user accounts pending approval. 5 WhatsApp leads failed sync - API timeout issue detected.",
        'audit': "Audit alert: 3 users with no activity in 14 days, 5 leads without proper KYC verification, 2 geo-fence violations this week require review.",
        'default': "I can help you with system configurations, generate MIS reports, manage user accounts, monitor data sync, and track system performance."
      }
    };

    const userRole = user?.role || 'field_sales_officer';
    const responses = roleResponses[userRole as keyof typeof roleResponses];
    
    let responseContent = responses.default;
    const lowerMessage = userMessage.toLowerCase();
    
    // Simple keyword matching for demo
    Object.entries(responses).forEach(([key, value]) => {
      if (key !== 'default' && lowerMessage.includes(key)) {
        responseContent = value;
      }
    });

    return {
      id: Date.now().toString(),
      type: 'assistant',
      content: responseContent,
      timestamp: new Date(),
      actions: ['View Details', 'Take Action']
    };
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    const aiResponse = generateAIResponse(inputMessage);

    setMessages(prev => [...prev, userMessage, aiResponse]);
    setInputMessage('');
  };

  const getRoleIcon = () => {
    switch (user?.role) {
      case 'field_sales_officer': return <MapPin size={16} />;
      case 'inbound_contact_agent': return <Phone size={16} />;
      case 'relationship_manager': return <Users size={16} />;
      case 'supervisor': return <TrendingUp size={16} />;
      case 'admin_mis_officer': return <AlertCircle size={16} />;
      default: return <Bot size={16} />;
    }
  };

  const getRoleName = () => {
    return user?.role?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'AI Assistant';
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsMinimized(false)}
          className="bg-teal-600 hover:bg-teal-700 rounded-full p-3 shadow-lg"
          size="sm"
        >
          <Bot size={20} />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80">
      <Card className="shadow-xl">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-sm">
              {getRoleIcon()}
              <span className="ml-2">{getRoleName()} AI</span>
              <Badge variant="secondary" className="ml-2 text-xs">Online</Badge>
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(true)}
            >
              <Minimize2 size={14} />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-64 p-3">
            {messages.length === 0 && (
              <div className="text-sm text-gray-600 mb-3">
                {getRoleSpecificPrompt()}
              </div>
            )}
            {messages.map((message) => (
              <div key={message.id} className={`mb-3 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block p-2 rounded-lg text-xs max-w-[90%] ${
                  message.type === 'user' 
                    ? 'bg-teal-600 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  {message.content}
                </div>
                {message.actions && (
                  <div className="mt-1 space-x-1">
                    {message.actions.map((action, index) => (
                      <Button key={index} variant="outline" size="sm" className="text-xs h-6">
                        {action}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </ScrollArea>
          <div className="p-3 border-t flex space-x-2">
            <Input
              placeholder="Ask me anything..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="text-sm"
            />
            <Button
              onClick={handleSendMessage}
              size="sm"
              className="bg-teal-600 hover:bg-teal-700"
            >
              <Send size={14} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIAssistantWidget;
