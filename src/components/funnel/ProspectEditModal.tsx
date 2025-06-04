
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface Prospect {
  id: string;
  name: string;
  company: string;
  stage: string;
  value: string;
  probability: number;
  lastContact: string;
  nextAction: string;
}

interface ProspectEditModalProps {
  prospect: Prospect | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onProspectUpdate: (prospect: Prospect) => void;
}

const ProspectEditModal = ({ prospect, isOpen, onOpenChange, onProspectUpdate }: ProspectEditModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    stage: '',
    value: '',
    probability: 0,
    lastContact: '',
    nextAction: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    if (prospect) {
      setFormData({
        name: prospect.name,
        company: prospect.company,
        stage: prospect.stage,
        value: prospect.value,
        probability: prospect.probability,
        lastContact: prospect.lastContact,
        nextAction: prospect.nextAction
      });
    }
  }, [prospect]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prospect) return;

    const updatedProspect = {
      ...prospect,
      ...formData
    };

    console.log('Updating prospect:', updatedProspect);
    onProspectUpdate(updatedProspect);
    toast({
      title: "Prospect Updated",
      description: `Prospect "${formData.company}" has been updated successfully.`,
    });
    onOpenChange(false);
  };

  if (!prospect) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Prospect</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Contact Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter contact name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Enter company name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stage">Stage</Label>
            <Select value={formData.stage.toLowerCase()} onValueChange={(value) => setFormData({ ...formData, stage: value.charAt(0).toUpperCase() + value.slice(1) })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="qualified">Qualified</SelectItem>
                <SelectItem value="proposal">Proposal</SelectItem>
                <SelectItem value="negotiation">Negotiation</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="value">Value</Label>
            <Input
              id="value"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              placeholder="e.g., ₹10L"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="probability">Probability (%)</Label>
            <Input
              id="probability"
              type="number"
              min="0"
              max="100"
              value={formData.probability}
              onChange={(e) => setFormData({ ...formData, probability: parseInt(e.target.value) || 0 })}
              placeholder="Enter probability percentage"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastContact">Last Contact</Label>
            <Input
              id="lastContact"
              value={formData.lastContact}
              onChange={(e) => setFormData({ ...formData, lastContact: e.target.value })}
              placeholder="Enter last contact date"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nextAction">Next Action</Label>
            <Textarea
              id="nextAction"
              value={formData.nextAction}
              onChange={(e) => setFormData({ ...formData, nextAction: e.target.value })}
              placeholder="Enter next action"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Update Prospect</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProspectEditModal;
