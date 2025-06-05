
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Phone, PhoneOff } from 'lucide-react';

interface CallInProgressModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  contactName: string;
  phoneNumber: string;
}

const CallInProgressModal = ({ isOpen, onOpenChange, contactName, phoneNumber }: CallInProgressModalProps) => {
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOpen) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(interval);
  }, [isOpen]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-center text-green-700">Call in Progress</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-6 py-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
            <Phone size={32} className="text-green-600" />
          </div>
          
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900">{contactName}</h3>
            <p className="text-gray-600 font-mono text-lg">{phoneNumber}</p>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-mono text-gray-900">{formatDuration(callDuration)}</div>
            <p className="text-sm text-gray-500">Call duration</p>
          </div>
          
          <Button 
            onClick={handleEndCall}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full"
            size="lg"
          >
            <PhoneOff size={20} className="mr-2" />
            End Call
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CallInProgressModal;
