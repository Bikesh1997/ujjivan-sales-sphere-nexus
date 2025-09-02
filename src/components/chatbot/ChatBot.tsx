import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  X, 
  Send, 
  User, 
  Bot,
  Globe,
  Phone,
  MapPin,
  CreditCard,
  DollarSign,
  FileText
} from 'lucide-react';
import { useChatbot } from '@/hooks/useChatbot';
import { securityGuidelines } from '@/services/chatbotService';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  language: 'en' | 'hi';
}

interface QuickReply {
  id: string;
  text: string;
  textHi: string;
  action: string;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { processMessage, isProcessing, isConnectedToAgent, resetAgentConnection } = useChatbot();

  const quickReplies: QuickReply[] = [
    { id: '1', text: 'Check Balance', textHi: 'बैलेंस चेक करें', action: 'balance' },
    { id: '2', text: 'Loan Details', textHi: 'लोन की जानकारी', action: 'loan' },
    { id: '3', text: 'Nearest Branch', textHi: 'नजदीकी शाखा', action: 'branch' },
    { id: '4', text: 'Interest Rates', textHi: 'ब्याज दरें', action: 'rates' },
    { id: '5', text: 'Fixed Deposits', textHi: 'फिक्स्ड डिपॉजिट', action: 'fd' },
    { id: '6', text: 'Contact Support', textHi: 'सहायता केंद्र', action: 'support' },
  ];

  const greetings = {
    en: "Hello! I'm Uma, your Ujjivan Banking Assistant. 🏦\n\nI can help you with:\n• Account balance inquiries\n• Loan information\n• Branch & ATM locations\n• Interest rates\n• Fixed deposits\n• General support\n\n🔒 Security Note: Never share your PIN, password, or OTP with anyone.\n\nHow can I assist you today?",
    hi: "नमस्ते! मैं उमा हूं, आपकी उज्जीवन बैंकिंग सहायक। 🏦\n\nमैं आपकी इसमें सहायता कर सकती हूं:\n• खाता शेष पूछताछ\n• लोन की जानकारी\n• शाखा और एटीएम स्थान\n• ब्याज दरें\n• फिक्स्ड डिपॉजिट\n• सामान्य सहायता\n\n🔒 सुरक्षा नोट: अपना पिन, पासवर्ड या ओटीपी किसी के साथ साझा न करें।\n\nआज मैं आपकी कैसे सहायता कर सकती हूं?"
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add initial greeting
      const greeting: Message = {
        id: '1',
        text: greetings[language],
        sender: 'bot',
        timestamp: new Date(),
        language
      };
      setMessages([greeting]);
    }
  }, [isOpen, language]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addMessage = (text: string, sender: 'user' | 'bot', lang: 'en' | 'hi' = language) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
      language: lang
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isProcessing) return;

    const userMessage = inputText.trim();
    addMessage(userMessage, 'user');
    setInputText('');

    try {
      const botResponse = await processMessage(userMessage, language);
      addMessage(botResponse, 'bot');
    } catch (error) {
      console.error('Error getting bot response:', error);
      addMessage(
        language === 'en' 
          ? "I apologize for the inconvenience. Please try again or contact our support team."
          : "असुविधा के लिए मुझे खेद है। कृपया पुनः प्रयास करें या हमारी सहायता टीम से संपर्क करें।",
        'bot'
      );
    }
  };

  const handleQuickReply = async (action: string, text: string) => {
    if (isProcessing) return;
    
    addMessage(text, 'user');

    try {
      const botResponse = await processMessage(action, language);
      addMessage(botResponse, 'bot');
    } catch (error) {
      console.error('Error processing quick reply:', error);
      addMessage(
        language === 'en'
          ? "I apologize for the inconvenience. Please try again."
          : "असुविधा के लिए मुझे खेद है। कृपया पुनः प्रयास करें।",
        'bot'
      );
    }
  };

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'hi' : 'en';
    setLanguage(newLang);
    
    // Update greeting message
    const greeting: Message = {
      id: Date.now().toString(),
      text: greetings[newLang],
      sender: 'bot',
      timestamp: new Date(),
      language: newLang
    };
    setMessages(prev => [...prev, greeting]);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          size="lg"
        >
          <MessageCircle size={28} className="text-white" />
        </Button>
        <div className="absolute -top-12 -left-20 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap">
          Need help? Chat with Uma!
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]">
      <Card className="w-full h-full flex flex-col shadow-2xl border-0 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot size={20} />
            </div>
            <div>
              <h3 className="font-semibold">Uma - Banking Assistant</h3>
              <p className="text-xs text-blue-100">Ujjivan Small Finance Bank</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="text-white hover:bg-white/20 p-2"
            >
              <Globe size={16} />
              <span className="ml-1 text-xs">{language.toUpperCase()}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 p-2"
            >
              <X size={16} />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-3 ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border shadow-sm'
                }`}
              >
                <div className="flex items-start space-x-2">
                  {message.sender === 'bot' && (
                    <Bot size={16} className="text-blue-600 mt-1 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isProcessing && (
            <div className="flex justify-start">
              <div className="bg-white border shadow-sm rounded-2xl p-3 max-w-[80%]">
                <div className="flex items-center space-x-2">
                  <Bot size={16} className="text-blue-600" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        <div className="p-3 bg-white border-t">
          <div className="grid grid-cols-2 gap-2 mb-3">
            {quickReplies.map((reply) => (
              <Button
                key={reply.id}
                variant="outline"
                size="sm"
                onClick={() => handleQuickReply(reply.action, language === 'en' ? reply.text : reply.textHi)}
                className="text-xs h-8 text-left justify-start border-blue-200 hover:bg-blue-50 hover:border-blue-300"
              >
                {language === 'en' ? reply.text : reply.textHi}
              </Button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t">
          <div className="flex space-x-2">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={language === 'en' ? "Type your message..." : "अपना संदेश टाइप करें..."}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 border-gray-200 focus:border-blue-500"
            />
            <Button
              onClick={handleSendMessage}
              className="bg-blue-600 hover:bg-blue-700 px-3"
              disabled={!inputText.trim() || isProcessing}
            >
              <Send size={16} />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ChatBot;