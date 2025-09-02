import { useState, useCallback } from 'react';
import { getAIResponse, ChatMessage, routeToHumanAgent } from '@/services/chatbotService';

export const useChatbot = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConnectedToAgent, setIsConnectedToAgent] = useState(false);

  const processMessage = useCallback(async (
    userMessage: string, 
    language: 'en' | 'hi'
  ): Promise<string> => {
    setIsProcessing(true);
    
    try {
      // Check if user wants human agent
      const wantsAgent = userMessage.toLowerCase().includes('agent') || 
                        userMessage.toLowerCase().includes('human') ||
                        userMessage.toLowerCase().includes('व्यक्ति') ||
                        userMessage.toLowerCase().includes('एजेंट');
      
      if (wantsAgent && !isConnectedToAgent) {
        const routingInfo = await routeToHumanAgent(userMessage);
        setIsConnectedToAgent(true);
        
        return language === 'en' 
          ? `I'm connecting you with our customer care team. Your ticket ID is ${routingInfo.ticketId}. Estimated wait time: ${routingInfo.estimatedWaitTime}. Please stay connected.`
          : `मैं आपको हमारी कस्टमर केयर टीम से जोड़ रही हूं। आपका टिकट आईडी ${routingInfo.ticketId} है। अनुमानित प्रतीक्षा समय: ${routingInfo.estimatedWaitTime}। कृपया जुड़े रहें।`;
      }
      
      // Get AI response
      const response = await getAIResponse(userMessage, language);
      return response;
      
    } catch (error) {
      console.error('Error processing message:', error);
      return language === 'en'
        ? "I apologize, but I'm experiencing technical difficulties. Please try again or contact our customer care at 1800-208-2121."
        : "मुझे खेद है, लेकिन मुझे तकनीकी कठिनाइयों का सामना कर रहा हूं। कृपया फिर से कोशिश करें या 1800-208-2121 पर हमारी कस्टमर केयर से संपर्क करें।";
    } finally {
      setIsProcessing(false);
    }
  }, [isConnectedToAgent]);

  const resetAgentConnection = useCallback(() => {
    setIsConnectedToAgent(false);
  }, []);

  return {
    processMessage,
    isProcessing,
    isConnectedToAgent,
    resetAgentConnection
  };
};