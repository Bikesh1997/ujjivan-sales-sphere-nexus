import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Mail, Clock } from 'lucide-react';

interface ScheduleEmailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSchedule: (data: ScheduleData) => void;
}

export interface ScheduleData {
  email: string;
  frequency: string;
  reportType: string;
  time: string;
}

export const ScheduleEmailModal = ({ open, onOpenChange, onSchedule }: ScheduleEmailModalProps) => {
  const [formData, setFormData] = useState<ScheduleData>({
    email: '',
    frequency: 'weekly',
    reportType: 'overview',
    time: '09:00'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSchedule(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            Schedule Email Reports
          </DialogTitle>
          <DialogDescription>
            Set up automated email delivery of your reports
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reportType">Report Type</Label>
            <Select 
              value={formData.reportType}
              onValueChange={(value) => setFormData({ ...formData, reportType: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="overview">Overview Report</SelectItem>
                <SelectItem value="performance">Performance Report</SelectItem>
                <SelectItem value="team">Team Analytics</SelectItem>
                <SelectItem value="system">System Report</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="frequency" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Frequency
            </Label>
            <Select 
              value={formData.frequency}
              onValueChange={(value) => setFormData({ ...formData, frequency: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly (Monday)</SelectItem>
                <SelectItem value="monthly">Monthly (1st day)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Delivery Time
            </Label>
            <Input
              id="time"
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              required
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Schedule Report
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
