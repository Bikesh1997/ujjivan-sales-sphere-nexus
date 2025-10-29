import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

interface MessageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  message: string;
  type?: 'success' | 'error' | 'info';
}

export const MessageDialog = ({ open, onOpenChange, title, message, type = 'success' }: MessageDialogProps) => {
  const icons = {
    success: <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-4" />,
    error: <AlertCircle className="w-12 h-12 text-red-600 dark:text-red-400 mx-auto mb-4" />,
    info: <Info className="w-12 h-12 text-primary mx-auto mb-4" />
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="text-center">
            {icons[type]}
            <DialogTitle className="text-center text-xl">{title}</DialogTitle>
            <DialogDescription className="text-center mt-2">
              {message}
            </DialogDescription>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
