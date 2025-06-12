
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FollowUpAction {
  id: string;
  type: string;
  scheduledDate: string;
  description: string;
  priority: string;
  status: string;
}

interface AddFollowUpModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  followUpType: string;
  setFollowUpType: (type: string) => void;
  followUpDate: string;
  setFollowUpDate: (date: string) => void;
  followUpDescription: string;
  setFollowUpDescription: (description: string) => void;
  followUpPriority: string;
  setFollowUpPriority: (priority: string) => void;
  onSave: () => void;
}

const AddFollowUpModal = ({
  isOpen,
  onOpenChange,
  followUpType,
  setFollowUpType,
  followUpDate,
  setFollowUpDate,
  followUpDescription,
  setFollowUpDescription,
  followUpPriority,
  setFollowUpPriority,
  onSave
}: AddFollowUpModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-[90vw]">
        <DialogHeader>
          <DialogTitle className="text-base sm:text-lg">Add Follow-up Action</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Type</label>
            <Select value={followUpType} onValueChange={setFollowUpType}>
              <SelectTrigger className="text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Call">Call</SelectItem>
                <SelectItem value="Email">Email</SelectItem>
                <SelectItem value="Meeting">Meeting</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Scheduled Date</label>
            <Input
              type="date"
              value={followUpDate}
              onChange={(e) => setFollowUpDate(e.target.value)}
              className="text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea
              placeholder="Enter follow-up description..."
              value={followUpDescription}
              onChange={(e) => setFollowUpDescription(e.target.value)}
              rows={3}
              className="text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Priority</label>
            <Select value={followUpPriority} onValueChange={setFollowUpPriority}>
              <SelectTrigger className="text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <Button 
              onClick={onSave}
              className="flex-1 bg-[#056262] hover:bg-[#045050] text-sm"
            >
              Save Follow-up
            </Button>
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="flex-1 text-sm"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddFollowUpModal;
