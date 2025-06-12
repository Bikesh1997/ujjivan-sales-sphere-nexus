
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Phone, Mail, Calendar, Bot } from 'lucide-react';

interface ConversationMessage {
  time: string;
  speaker: string;
  message: string;
}

interface CommunicationEntry {
  id: string;
  type: string;
  status: string;
  date: string;
  summary: string;
  conversation: ConversationMessage[];
}

interface CommunicationHistoryProps {
  communicationHistory: CommunicationEntry[];
  onAnalyzeCall: () => void;
}

const CommunicationHistory = ({ communicationHistory, onAnalyzeCall }: CommunicationHistoryProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-base sm:text-lg">Communication History</span>
          <Badge variant="secondary" className="bg-orange-100 text-orange-700 text-xs">
            Lead auto-escalated to Sales team
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {communicationHistory.map((comm) => (
          <div key={comm.id} className="border rounded-lg p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                {comm.type === 'Call' ? (
                  <Phone size={16} className="text-blue-600 flex-shrink-0" />
                ) : comm.type === 'Meeting' ? (
                  <Calendar size={16} className="text-green-600 flex-shrink-0" />
                ) : (
                  <Mail size={16} className="text-purple-600 flex-shrink-0" />
                )}
                <span className="font-medium text-sm">{comm.type}</span>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${comm.status === 'positive' ? 'text-green-700 border-green-200' : 'text-gray-700'}`}
                >
                  {comm.status}
                </Badge>
              </div>
              <span className="text-xs sm:text-sm text-gray-500">{comm.date}</span>
            </div>
            
            {comm.conversation.length > 0 && (
              <>
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-blue-600 mb-2 text-sm"
                  onClick={() => {/* View call details */}}
                >
                  View call details →
                </Button>

                <div className="bg-gray-50 rounded p-3 mb-3">
                  <h4 className="font-medium text-sm mb-2">Conversation</h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {comm.conversation.map((msg, idx) => (
                      <div key={idx} className="text-xs">
                        <span className="text-gray-500">{msg.time}</span>
                        <div className={`p-2 rounded mt-1 ${
                          msg.speaker === 'Agent' 
                            ? 'bg-blue-50 text-blue-900 ml-2 sm:ml-4' 
                            : 'bg-white border mr-2 sm:mr-4'
                        }`}>
                          <strong>{msg.speaker}:</strong> {msg.message}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="bg-blue-50 rounded p-3">
              <h4 className="font-medium text-sm mb-1">Summary</h4>
              <p className="text-sm text-gray-700">{comm.summary}</p>
            </div>

            {comm.type === 'Call' && (
              <div className="mt-3 flex justify-end">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={onAnalyzeCall}
                  className="flex items-center gap-2 text-xs sm:text-sm"
                >
                  <Bot size={14} />
                  <span className="hidden sm:inline">Analyze call summary with AI</span>
                  <span className="sm:hidden">AI Analysis</span>
                </Button>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default CommunicationHistory;
