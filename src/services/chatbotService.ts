// Chatbot Service for Ujjivan Banking Assistant
// This service will handle AI-powered responses once connected to Supabase

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  language: 'en' | 'hi';
}

export interface BankingQuery {
  type: 'balance' | 'loan' | 'branch' | 'rates' | 'fd' | 'support' | 'general';
  data?: any;
}

// Banking knowledge base for static responses
export const bankingKnowledgeBase = {
  en: {
    balance: {
      response: "For account balance inquiry, please log into your Ujjivan mobile app or visit the nearest branch with your account details. For security reasons, I cannot access your personal account information.",
      followUp: ["Download Mobile App", "Find Nearest Branch", "Contact Support"]
    },
    loan: {
      response: "Our loan products include:\n\n📋 **Personal Loans**: 11.99% onwards\n🏢 **Business Loans**: 15.00% onwards\n💰 **Micro Finance**: Competitive rates\n🏠 **Home Loans**: Special rates available\n\nWould you like specific information about any loan type?",
      followUp: ["Personal Loan Details", "Business Loan Info", "Apply for Loan"]
    },
    branch: {
      response: "I can help you find the nearest Ujjivan Small Finance Bank branch and ATM. Please share your:\n\n📍 Current location or city name\n📮 PIN code\n\nOr you can use our branch locator on the mobile app.",
      followUp: ["Share Location", "Enter PIN Code", "Download App"]
    },
    rates: {
      response: "**Current Interest Rates** (Subject to change):\n\n💰 **Savings Account**: 4.00% - 7.00% p.a.\n🏦 **Fixed Deposits**: 5.50% - 8.50% p.a.\n📱 **Personal Loans**: 11.99% onwards\n🏢 **Business Loans**: 15.00% onwards\n🏠 **Home Loans**: Contact for rates\n\n*Rates vary based on amount, tenure, and eligibility",
      followUp: ["FD Calculator", "Loan Eligibility", "Contact Manager"]
    },
    fd: {
      response: "**Fixed Deposit Benefits**:\n\n✅ Interest rates up to 8.50% p.a.\n✅ Flexible tenure: 7 days to 10 years\n✅ Minimum deposit: ₹1,000\n✅ Senior citizen benefits\n✅ Premature withdrawal facility\n✅ Auto-renewal options\n\nWould you like to calculate your FD returns?",
      followUp: ["FD Calculator", "Open FD Account", "Senior Citizen Rates"]
    },
    support: {
      response: "**Customer Support Options**:\n\n📞 **24/7 Helpline**: 1800-208-2121\n📧 **Email**: customercare@ujjivan.com\n💬 **Live Chat**: Available on mobile app\n🌐 **Website**: www.ujjivansfb.in\n🏢 **Branch Visit**: Find nearest branch\n\nHow would you prefer to get assistance?",
      followUp: ["Call Support", "Find Branch", "Email Support"]
    },
    products: {
      response: "**Ujjivan Banking Products**:\n\n💳 **Accounts**: Savings, Current, Salary\n🏦 **Deposits**: Fixed, Recurring\n💰 **Loans**: Personal, Business, Home, Vehicle\n💳 **Cards**: Debit Cards, Credit Cards\n📱 **Digital**: Mobile Banking, UPI\n🛡️ **Insurance**: Life, Health, General\n\nWhich product interests you?",
      followUp: ["Open Account", "Apply for Loan", "Get Debit Card"]
    }
  },
  hi: {
    balance: {
      response: "खाता शेष की जानकारी के लिए, कृपया अपने उज्जीवन मोबाइल ऐप में लॉग इन करें या अपने खाता विवरण के साथ निकटतम शाखा में जाएं। सुरक्षा कारणों से, मैं आपकी व्यक्तिगत खाता जानकारी तक नहीं पहुंच सकती।",
      followUp: ["मोबाइल ऐप डाउनलोड करें", "निकटतम शाखा खोजें", "सहायता संपर्क करें"]
    },
    loan: {
      response: "हमारे लोन उत्पाद:\n\n📋 **पर्सनल लोन**: 11.99% से शुरू\n🏢 **बिजनेस लोन**: 15.00% से शुरू\n💰 **माइक्रो फाइनेंस**: प्रतिस्पर्धी दरें\n🏠 **होम लोन**: विशेष दरें उपलब्ध\n\nक्या आप किसी विशिष्ट लोन प्रकार की जानकारी चाहते हैं?",
      followUp: ["पर्सनल लोन विवरण", "बिजनेस लोन जानकारी", "लोन के लिए आवेदन"]
    },
    branch: {
      response: "मैं आपको निकटतम उज्जीवन स्मॉल फाइनेंस बैंक शाखा और एटीएम खोजने में मदद कर सकती हूं। कृपया साझा करें:\n\n📍 वर्तमान स्थान या शहर का नाम\n📮 पिन कोड\n\nया आप मोबाइल ऐप पर हमारे ब्रांच लोकेटर का उपयोग कर सकते हैं।",
      followUp: ["स्थान साझा करें", "पिन कोड दर्ज करें", "ऐप डाउनलोड करें"]
    },
    rates: {
      response: "**वर्तमान ब्याज दरें** (परिवर्तन के अधीन):\n\n💰 **बचत खाता**: 4.00% - 7.00% प्रति वर्ष\n🏦 **फिक्स्ड डिपॉजिट**: 5.50% - 8.50% प्रति वर्ष\n📱 **पर्सनल लोन**: 11.99% से आगे\n🏢 **बिजनेस लोन**: 15.00% से आगे\n🏠 **होम लोन**: दरों के लिए संपर्क करें\n\n*दरें राशि, कार्यकाल और पात्रता के आधार पर भिन्न होती हैं",
      followUp: ["FD कैलकुलेटर", "लोन पात्रता", "मैनेजर से संपर्क"]
    },
    fd: {
      response: "**फिक्स्ड डिपॉजिट लाभ**:\n\n✅ 8.50% प्रति वर्ष तक ब्याज दरें\n✅ लचीला कार्यकाल: 7 दिन से 10 साल तक\n✅ न्यूनतम जमा: ₹1,000\n✅ वरिष्ठ नागरिक लाभ\n✅ समय से पहले निकासी की सुविधा\n✅ ऑटो-रिन्यूअल विकल्प\n\nक्या आप अपने FD रिटर्न की गणना करना चाहते हैं?",
      followUp: ["FD कैलकुलेटर", "FD खाता खोलें", "वरिष्ठ नागरिक दरें"]
    },
    support: {
      response: "**ग्राहक सहायता विकल्प**:\n\n📞 **24/7 हेल्पलाइन**: 1800-208-2121\n📧 **ईमेल**: customercare@ujjivan.com\n💬 **लाइव चैट**: मोबाइल ऐप पर उपलब्ध\n🌐 **वेबसाइट**: www.ujjivansfb.in\n🏢 **शाखा जाएं**: निकटतम शाखा खोजें\n\nआप कैसे सहायता प्राप्त करना पसंद करेंगे?",
      followUp: ["सपोर्ट कॉल करें", "शाखा खोजें", "ईमेल सपोर्ट"]
    },
    products: {
      response: "**उज्जीवन बैंकिंग उत्पाद**:\n\n💳 **खाते**: बचत, चालू, सैलरी\n🏦 **जमा**: फिक्स्ड, आवर्ती\n💰 **लोन**: पर्सनल, बिजनेस, होम, वाहन\n💳 **कार्ड**: डेबिट कार्ड, क्रेडिट कार्ड\n📱 **डिजिटल**: मोबाइल बैंकिंग, UPI\n🛡️ **बीमा**: जीवन, स्वास्थ्य, सामान्य\n\nकौन सा उत्पाद आपको दिलचस्प लगता है?",
      followUp: ["खाता खोलें", "लोन के लिए आवेदन", "डेबिट कार्ड प्राप्त करें"]
    }
  }
};

// Security guidelines for banking chatbot
export const securityGuidelines = {
  en: [
    "🔒 Never share your PIN, Password, or OTP with anyone",
    "🔒 Ujjivan will never ask for sensitive details via chat",
    "🔒 Always verify bank communications through official channels",
    "🔒 Report suspicious activities immediately"
  ],
  hi: [
    "🔒 अपना पिन, पासवर्ड या ओटीपी किसी के साथ साझा न करें",
    "🔒 उज्जीवन कभी भी चैट के माध्यम से संवेदनशील विवरण नहीं मांगेगा",
    "🔒 हमेशा आधिकारिक चैनलों के माध्यम से बैंक संचार की पुष्टि करें",
    "🔒 संदिग्ध गतिविधियों की तुरंत रिपोर्ट करें"
  ]
} as const;

// Intent classification for user queries
export const classifyIntent = (userInput: string): BankingQuery => {
  const input = userInput.toLowerCase();
  
  if (input.includes('balance') || input.includes('बैलेंस') || input.includes('शेष')) {
    return { type: 'balance' };
  }
  
  if (input.includes('loan') || input.includes('लोन') || input.includes('उधार')) {
    return { type: 'loan' };
  }
  
  if (input.includes('branch') || input.includes('atm') || input.includes('शाखा') || input.includes('एटीएम')) {
    return { type: 'branch' };
  }
  
  if (input.includes('rate') || input.includes('interest') || input.includes('दर') || input.includes('ब्याज')) {
    return { type: 'rates' };
  }
  
  if (input.includes('fixed') || input.includes('deposit') || input.includes('fd') || input.includes('फिक्स्ड') || input.includes('जमा')) {
    return { type: 'fd' };
  }
  
  if (input.includes('support') || input.includes('help') || input.includes('contact') || input.includes('सहायता') || input.includes('मदद')) {
    return { type: 'support' };
  }
  
  return { type: 'general' };
};

// Generate bot response based on intent
export const generateBotResponse = (intent: BankingQuery, language: 'en' | 'hi'): string => {
  const knowledge = bankingKnowledgeBase[language];
  
  switch (intent.type) {
    case 'balance':
      return knowledge.balance.response;
    case 'loan':
      return knowledge.loan.response;
    case 'branch':
      return knowledge.branch.response;
    case 'rates':
      return knowledge.rates.response;
    case 'fd':
      return knowledge.fd.response;
    case 'support':
      return knowledge.support.response;
    default:
      return language === 'en' 
        ? "I understand you're looking for banking assistance. I can help you with account balance, loans, branch locations, interest rates, fixed deposits, and general support. Please choose from the quick reply options below or ask me about any banking service."
        : "मैं समझती हूं कि आप बैंकिंग सहायता चाह रहे हैं। मैं आपकी खाता शेष, लोन, शाखा स्थान, ब्याज दरें, फिक्स्ड डिपॉजिट और सामान्य सहायता में मदद कर सकती हूं। कृपया नीचे दिए गए त्वरित उत्तर विकल्पों से चुनें या मुझसे किसी भी बैंकिंग सेवा के बारे में पूछें।";
  }
};

// This function will be enhanced once Supabase is connected for AI-powered responses
export const getAIResponse = async (userMessage: string, language: 'en' | 'hi'): Promise<string> => {
  // TODO: Implement AI-powered responses using Supabase Edge Functions
  // This would integrate with OpenAI, Anthropic, or other AI services
  
  // For now, use intent-based responses
  const intent = classifyIntent(userMessage);
  return generateBotResponse(intent, language);
};

// Branch locator service (mock data - would integrate with real API)
export const findNearestBranches = async (location: string) => {
  // TODO: Integrate with Ujjivan's branch locator API via Supabase
  return [
    {
      name: "Ujjivan SFB - Main Branch",
      address: "Commercial Street, Bangalore",
      distance: "2.5 km",
      phone: "080-12345678",
      timings: "10:00 AM - 4:00 PM"
    },
    {
      name: "Ujjivan SFB - Koramangala",
      address: "Koramangala 4th Block, Bangalore", 
      distance: "3.2 km",
      phone: "080-87654321",
      timings: "10:00 AM - 4:00 PM"
    }
  ];
};

// Lead routing service for complex queries
export const routeToHumanAgent = async (query: string, userInfo?: any) => {
  // TODO: Implement routing to human agents via Supabase
  console.log('Routing to human agent:', query);
  return {
    ticketId: `UJV${Date.now()}`,
    estimatedWaitTime: "5-10 minutes",
    agentType: "Customer Care Executive"
  };
};