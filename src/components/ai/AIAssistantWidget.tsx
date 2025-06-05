
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
  AlertCircle,
  Zap
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
        return "🚗 Field Sales AI Assistant: I can help you with beat planning, customer visits, route optimization, and converting leads. Try asking: 'Plan my route for today' or 'Show KRA progress'";
      case 'inbound_contact_agent':
        return "📞 Inbound Contact AI Assistant: I can help you manage incoming leads, verify KYC, handle customer inquiries, and schedule callbacks. Try asking: 'Show pending callbacks' or 'Verify customer details'";
      case 'relationship_manager':
        return "👥 Relationship Management AI Assistant: I can help you manage your portfolio, identify cross-sell opportunities, and nurture customer relationships. Try asking: 'Show portfolio insights' or 'Find cross-sell opportunities'";
      case 'supervisor':
        return "👨‍💼 Supervisory AI Assistant: I can help you monitor team performance, track field coverage, manage compliance, and view real-time analytics. Try asking: 'Show team status' or 'Performance summary'";
      case 'admin_mis_officer':
        return "⚙️ Admin/MIS AI Assistant: I can help you with system configurations, MIS reports, user management, and system monitoring. Try asking: 'Generate MIS report' or 'System health check'";
      default:
        return "Hello! I'm your AI assistant. How can I help you today?";
    }
  };

  const getQuickSuggestions = () => {
    switch (user?.role) {
      case 'field_sales_officer':
        return [
          'Plan my route for today',
          'Show KRA progress',
          'Find nearby prospects',
          'Update visit status'
        ];
      case 'inbound_contact_agent':
        return [
          'Show pending callbacks',
          'Verify customer KYC',
          'Check lead priority',
          'Schedule follow-up'
        ];
      case 'relationship_manager':
        return [
          'Portfolio insights',
          'Cross-sell opportunities',
          'Customer risk analysis',
          'Relationship mapping'
        ];
      case 'supervisor':
        return [
          'Team performance',
          'Field coverage status',
          'Compliance alerts',
          'Resource allocation'
        ];
      case 'admin_mis_officer':
        return [
          'Generate MIS report',
          'System health check',
          'User activity log',
          'Data sync status'
        ];
      default:
        return ['Help me get started', 'What can you do?'];
    }
  };

  const generateAIResponse = (userMessage: string): Message => {
    const roleResponses = {
      'field_sales_officer': {
        'route': "🗺️ Based on your beat plan for Bandra area, I suggest visiting: \n1. Raj Enterprises (₹25L potential) - 10:00 AM\n2. Tech Solutions (Follow-up) - 11:30 AM\n3. Manufacturing Co (New prospect) - 2:00 PM\n\nOptimal route saves 2 hours. Current location: Mumbai Central.",
        'kra': "📊 KRA Progress Update:\n✅ Target: ₹50L (75% achieved - ₹37.5L)\n✅ Visits: 45/60 (On track)\n✅ Conversions: 8/12 (Ahead by 2)\n\n🎯 Need ₹12.5L more to unlock ₹8,000 incentive!\nRecommended: Focus on 3 hot prospects worth ₹15L total.",
        'nearby': "📍 Nearby High-Value Prospects (1km radius):\n• Sharma Industries - ₹30L potential\n• Digital Hub - ₹18L potential  \n• Food Processing - ₹22L potential\n\nAll have warm leads. Suggest calling before visiting.",
        'default': "I can help you with beat planning, route optimization, KRA tracking, customer visits, and lead conversion strategies. What specific task can I assist with?"
      },
      'inbound_contact_agent': {
        'callbacks': "📞 Priority Callbacks Today:\n🔥 High: Mrs. Priya Sharma (₹50L Home Loan) - Call by 2 PM\n⚡ Medium: Mr. Gupta (₹25L Business Loan) - Call by 4 PM\n📋 Normal: 3 other prospects - After 5 PM\n\nSuggested script templates available.",
        'verify': "🔍 KYC Verification Checklist:\n✅ PAN Card validation\n✅ Aadhaar verification  \n📋 Pending: Income proof, Bank statements\n\nI can generate verification templates and set follow-up reminders automatically.",
        'priority': "⭐ Lead Priority Matrix:\n🔥 Hot (3): Ready to convert within 24hrs\n⚡ Warm (7): Need follow-up within 48hrs\n📋 Cold (12): Long-term nurturing required\n\nFocus on hot leads first for maximum conversion.",
        'default': "I can help you manage incoming leads, verify customer details, schedule callbacks, prioritize prospects, and route leads to field teams. What do you need help with?"
      },
      'relationship_manager': {
        'portfolio': "💼 Portfolio Overview:\n📊 Total AUM: ₹2.5Cr across 45 customers\n📈 Growth: +15% QoQ\n⚠️ Alerts: 3 FDs maturing (₹75L), 2 inactive customers\n\n🎯 Opportunities: 5 customers eligible for gold loans worth ₹45L potential.",
        'cross-sell': "🎯 Top Cross-sell Opportunities:\n1. Mr. Agarwal - Gold Loan (₹15L, Score: 95%)\n2. Mrs. Shah - Education Loan (₹8L, Score: 88%)\n3. Sharma Family - Insurance (₹2L premium, Score: 92%)\n\nRecommended: Schedule family meetings this week.",
        'risk': "⚠️ Portfolio Risk Analysis:\n🟢 Low Risk: 35 customers (78%)\n🟡 Medium Risk: 8 customers (18%)\n🔴 High Risk: 2 customers (4%)\n\nAction needed: Review high-risk accounts, suggest restructuring options.",
        'default': "I can help you manage your high-value customer portfolio, identify cross-sell opportunities, analyze customer relationships, and plan family banking strategies."
      },
      'supervisor': {
        'team': "👥 Team Status (Real-time):\n🟢 Active: 4/5 officers (80% coverage)\n📍 Locations: All within geo-fence\n🎯 Performance: 85% of daily targets\n⚠️ Alert: Vikash offline since 2 PM\n\n📊 Today's Metrics: 15 visits, 8 leads, 3 conversions",
        'performance': "📈 Team Performance Summary:\n🥇 Top Performer: Priya (110% target)\n📊 Team Average: 92% target achievement\n🎯 Conversion Rate: 78% (Above benchmark)\n📋 Training Needed: Vikash (cross-sell techniques)",
        'compliance': "🛡️ Compliance Dashboard:\n✅ Geo-fence: All compliant\n⚠️ Pending: 3 KYC verifications\n🔍 Audit Items: 2 document reviews\n📊 Overall Score: 94% (Excellent)",
        'default': "I can help you monitor team performance, track field coverage, manage compliance, analyze productivity metrics, and coordinate resource allocation."
      },
      'admin_mis_officer': {
        'report': "📊 Daily MIS Report Generated:\n📈 New Leads: 127 (↑15% vs yesterday)\n🔄 Data Sync: 89% success rate\n👥 Active Users: 45/48\n📍 Geo Tracking: 98% accuracy\n\n⚠️ Issues: 3 API timeouts, 2 sync failures",
        'health': "🔧 System Health Check:\n✅ All APIs operational\n✅ Database performance: Optimal\n⚠️ Warning: Server load at 78%\n🔄 Last backup: 2 hours ago\n\n💡 Recommendation: Schedule maintenance window",
        'users': "👥 User Activity Summary:\n🟢 Active: 42 users online\n🟡 Inactive: 3 users (>7 days)\n🔐 Security: No unauthorized access\n📱 Mobile app usage: 85%\n\n📋 Action: Deactivate inactive accounts",
        'default': "I can help you with system configurations, generate MIS reports, manage user accounts, monitor data sync, track system performance, and handle administrative tasks."
      }
    };

    const userRole = user?.role || 'field_sales_officer';
    const responses = roleResponses[userRole as keyof typeof roleResponses];
    
    let responseContent = responses.default;
    const lowerMessage = userMessage.toLowerCase();
    
    // Enhanced keyword matching
    Object.entries(responses).forEach(([key, value]) => {
      if (key !== 'default') {
        if (lowerMessage.includes(key) || 
            lowerMessage.includes(key.replace(/[_-]/g, ' ')) ||
            (key === 'callbacks' && lowerMessage.includes('call')) ||
            (key === 'nearby' && lowerMessage.includes('prospect')) ||
            (key === 'health' && lowerMessage.includes('system'))) {
          responseContent = value;
        }
      }
    });

    return {
      id: Date.now().toString(),
      type: 'assistant',
      content: responseContent,
      timestamp: new Date(),
      actions: ['View Details', 'Take Action', 'Set Reminder']
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

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
    setTimeout(() => handleSendMessage(), 100);
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
    switch (user?.role) {
      case 'field_sales_officer': return 'Field Sales AI';
      case 'inbound_contact_agent': return 'Contact Center AI';
      case 'relationship_manager': return 'Relationship AI';
      case 'supervisor': return 'Supervisor AI';
      case 'admin_mis_officer': return 'Admin AI';
      default: return 'AI Assistant';
    }
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
              <span className="ml-2">{getRoleName()}</span>
              <Badge variant="secondary" className="ml-2 text-xs bg-green-100 text-green-800">
                <Zap size={10} className="mr-1" />
                Smart
              </Badge>
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
              <div className="space-y-3">
                <div className="text-xs text-gray-600">
                  {getRoleSpecificPrompt()}
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-medium text-gray-700">Quick Actions:</div>
                  <div className="grid grid-cols-1 gap-1">
                    {getQuickSuggestions().map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs h-7 justify-start"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {messages.map((message) => (
              <div key={message.id} className={`mb-3 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block p-2 rounded-lg text-xs max-w-[90%] whitespace-pre-line ${
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
          <div className="p-3 border-t">
            <div className="flex space-x-2">
              <Input
                placeholder={`Ask your ${getRoleName()}...`}
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIAssistantWidget;
