
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  MapPin, 
  Phone, 
  TrendingUp, 
  BarChart3, 
  Settings 
} from 'lucide-react';

interface AIMessage {
  id: string;
  text: string;
  type: 'user' | 'ai';
  timestamp: Date;
}

const AIAssistantWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const { user } = useAuth();

  const getRolePrompt = () => {
    switch (user?.role) {
      case 'field_sales_officer':
        return {
          title: 'FSO Assistant',
          icon: MapPin,
          color: 'bg-blue-500',
          prompt: `You are an AI assistant for a Field Sales Officer (FSO) or Relationship Officer (RO) in a small finance bank.
Your job is to help plan daily visits, prioritize leads, and improve conversions using beat plans and customer context.

Your responsibilities include:
• Generate optimal customer visit routes using beat plans, distance, priority, and lead status
• Present visit objectives with customer history and cross-sell opportunities
• Remind the user to log attendance (with geotag) and update outcomes after each visit
• Provide timely nudges such as:
  - "You're close to a customer due for renewal"
  - "This lead has an upsell potential for Fixed Deposit"
  - "Meet 2 more leads today to meet your daily KRA"

Always prioritize next-best-action. Keep messages crisp and field-friendly.`
        };
      case 'inbound_contact_agent':
        return {
          title: 'Contact Agent Assistant',
          icon: Phone,
          color: 'bg-green-500',
          prompt: `You are an AI assistant for an Inbound Contact Center Agent at a small finance bank.
Your role is to assist in handling leads from phone, WhatsApp, and digital sources.

Assist by:
• Guiding on lead tagging (loan/savings/FD), KYC verification, and data enrichment
• Suggesting quick actions:
  - "Log callback request"
  - "Assign to nearest field officer"
• Using customer history to nudge:
  - "Repeat inquiry – check last interaction before responding"
  - "Eligible for pre-approved loan – suggest fast-track option"

Keep interactions focused, trackable, and helpful for fast resolution.`
        };
      case 'relationship_manager':
        return {
          title: 'RM Assistant',
          icon: TrendingUp,
          color: 'bg-purple-500',
          prompt: `You are an AI assistant for a Relationship Manager (RM) managing high-value customers.
Your role is to support the RM in cross-selling, upselling, portfolio review, and retention.

Assist by:
• Surfacing customer 360 views with linked family members, holdings, and recent interactions
• Providing timely nudges:
  - "FD maturing soon – suggest reinvestment"
  - "2 clients inactive for 30+ days – initiate contact"
  - "Family member eligible for a gold loan – schedule appointment"
• Monitoring goals and nudging for closure:
  - "You're 80% to your target – closing one housing loan will unlock ₹4,000 in incentives"

Help the RM stay proactive and personalized in their engagements.`
        };
      case 'supervisor':
        return {
          title: 'Supervisor Assistant',
          icon: BarChart3,
          color: 'bg-orange-500',
          prompt: `You are an AI assistant for a Branch Supervisor or Area Manager in a small finance bank.
Your goal is to give full visibility into field team performance, compliance, and support actions.

You should:
• Summarize field officer activity: beat coverage, attendance, and interaction volume
• Show actionable alerts:
  - "RM Pranav missed 2 visits today"
  - "FSO Sumit exceeded today's FD target – 90% KRA complete"
• Visualize field routes on a live map and evaluate routing efficiency
• Suggest coaching:
  - "Low FD conversion – suggest product training for FSO Anita"
• Support attendance, leave, and training hygiene oversight.`
        };
      case 'admin_mis_officer':
        return {
          title: 'Admin Assistant',
          icon: Settings,
          color: 'bg-red-500',
          prompt: `You are an AI assistant for Admin, MIS, or Sales Operations users.
Your role is to assist in system setup, reporting, and hygiene management.

Capabilities include:
• Lead rule configuration:
  - "Route leads from web portal to FSO team"
• Target/KRA setup:
  - "Update FD KRA for RMs to ₹50L this month"
• System audits:
  - "Show inactive users in the past 14 days"
  - "5 WhatsApp leads failed to sync – check integration logs"
• Enable quick exports or auto-email reports by product, location, or user type
• Maintain system reliability and insights for management layers.`
        };
      default:
        return {
          title: 'AI Assistant',
          icon: Bot,
          color: 'bg-gray-500',
          prompt: 'I am your banking AI assistant. How can I help you today?'
        };
    }
  };

  const roleConfig = getRolePrompt();
  const IconComponent = roleConfig.icon;

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      text: inputText,
      type: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response based on role
    setTimeout(() => {
      const aiResponse: AIMessage = {
        id: (Date.now() + 1).toString(),
        text: generateRoleBasedResponse(inputText, user?.role || 'field_sales_officer'),
        type: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);

    setInputText('');
  };

  const generateRoleBasedResponse = (input: string, role: string): string => {
    const responses = {
      field_sales_officer: [
        "Based on your location, you have 3 customers within 2km for renewal visits. Shall I optimize your route?",
        "Reminder: Log your attendance and visit outcomes for KRA tracking.",
        "Mrs. Sharma nearby is eligible for a Fixed Deposit upsell. Her current savings balance: ₹2.5L"
      ],
      inbound_contact_agent: [
        "This customer called 3 times last month. Check previous interaction notes before responding.",
        "Lead tagged as 'Personal Loan' - KYC verification pending. Shall I guide you through the process?",
        "Customer eligible for pre-approved loan. Fast-track option available."
      ],
      relationship_manager: [
        "Mr. Patel's FD worth ₹5L matures next week. Suggest reinvestment options.",
        "You're 85% to monthly target. Close 1 more housing loan to unlock ₹4K incentive.",
        "Family opportunity: Mr. Kumar's daughter eligible for education loan."
      ],
      supervisor: [
        "Team Update: FSO Rajesh exceeded daily target by 120%. 2 team members need visit reminders.",
        "Alert: 3 field officers haven't logged attendance. Shall I send reminders?",
        "Performance insight: Team conversion rate dropped 5% this week. Product training recommended."
      ],
      admin_mis_officer: [
        "System status: 47 new leads synced today. 2 integration errors detected.",
        "KRA Update: Monthly targets configured for all RMs. Auto-reports scheduled.",
        "User audit: 5 inactive users in past 14 days. Recommend access review."
      ]
    };

    const roleResponses = responses[role as keyof typeof responses] || responses.field_sales_officer;
    return roleResponses[Math.floor(Math.random() * roleResponses.length)];
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 rounded-full w-14 h-14 ${roleConfig.color} hover:opacity-90 shadow-lg z-50`}
      >
        <IconComponent size={24} className="text-white" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-80 h-96 shadow-2xl z-50 flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`p-1 rounded-full ${roleConfig.color}`}>
              <IconComponent size={16} className="text-white" />
            </div>
            <CardTitle className="text-sm">{roleConfig.title}</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="h-6 w-6 p-0"
          >
            <X size={14} />
          </Button>
        </div>
        <Badge variant="secondary" className="text-xs w-fit">
          {user?.role?.replace('_', ' ').toUpperCase()}
        </Badge>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-3">
        <div className="flex-1 overflow-y-auto space-y-3 mb-3">
          {messages.length === 0 && (
            <div className="text-xs text-gray-500 p-3 bg-gray-50 rounded-lg">
              {roleConfig.prompt.split('\n')[0]}
            </div>
          )}
          {messages.map((message) => (
            <div
              key={message.id}
              className={`text-xs p-2 rounded-lg max-w-[85%] ${
                message.type === 'user'
                  ? 'bg-blue-100 text-blue-900 ml-auto'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>
        
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask me anything..."
            className="flex-1 text-xs p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            onClick={sendMessage}
            size="sm"
            className={`${roleConfig.color} hover:opacity-90`}
          >
            <Send size={12} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAssistantWidget;
