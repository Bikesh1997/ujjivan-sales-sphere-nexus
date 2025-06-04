
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

export const Loading = ({ size = 'md', text, className }: LoadingProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div className={cn('flex flex-col items-center justify-center space-y-2', className)}>
      <Loader2 className={cn('animate-spin text-teal-600', sizeClasses[size])} />
      {text && (
        <p className="text-sm text-gray-600 animate-pulse">{text}</p>
      )}
    </div>
  );
};

export const LoadingPage = ({ text = 'Loading...' }: { text?: string }) => (
  <div className="min-h-screen flex items-center justify-center">
    <Loading size="lg" text={text} />
  </div>
);

export const LoadingCard = ({ text }: { text?: string }) => (
  <div className="flex items-center justify-center p-8">
    <Loading text={text} />
  </div>
);
