
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageSquare } from 'lucide-react';

interface CommunicationLoggerProps {
  communicationType: string;
  setCommunicationType: (type: string) => void;
  communicationNotes: string;
  setCommunicationNotes: (notes: string) => void;
  outcome: string;
  setOutcome: (outcome: string) => void;
  onLogCommunication: () => void;
  templates: string[];
}

const CommunicationLogger = ({
  communicationType,
  setCommunicationType,
  communicationNotes,
  setCommunicationNotes,
  outcome,
  setOutcome,
  onLogCommunication,
  templates
}: CommunicationLoggerProps) => {
  return (
    <div className="space-y-4">
      {/* Log Communication */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Log Communication</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Communication Type</label>
            <Select value={communicationType} onValueChange={setCommunicationType}>
              <SelectTrigger className="text-sm">
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
              className="text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Outcome</label>
            <Select value={outcome} onValueChange={setOutcome}>
              <SelectTrigger className="text-sm">
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
            onClick={onLogCommunication}
            className="w-full bg-[#056262] hover:bg-[#045050] text-sm"
          >
            <MessageSquare size={16} className="mr-2" />
            Log Communication
          </Button>
        </CardContent>
      </Card>

      {/* Communication Templates */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Communication Templates</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {templates.map((template, index) => (
            <Button 
              key={index}
              variant="outline" 
              className="w-full justify-start text-xs sm:text-sm h-auto py-2 px-3"
            >
              {template}
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunicationLogger;
