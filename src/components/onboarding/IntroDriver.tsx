import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Volume2, VolumeX } from 'lucide-react';

interface DriverStep {
  id: string;
  target: string;
  title: string;
  description: string;
  voiceText: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

interface IntroDriverProps {
  steps: DriverStep[];
  onComplete: () => void;
  isVisible: boolean;
}

export const IntroDriver: React.FC<IntroDriverProps> = ({ 
  steps, 
  onComplete, 
  isVisible 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);

  const speakText = (text: string) => {
    if (isAudioEnabled && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN'; // Hindi
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    if (isVisible && steps.length > 0) {
      speakText(steps[currentStep].voiceText);
    }
  }, [currentStep, isVisible, steps, isAudioEnabled]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  if (!isVisible || steps.length === 0) return null;

  const currentStepData = steps[currentStep];

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm" />
      
      {/* Highlight target element */}
      <div className="fixed inset-0 z-50 pointer-events-none">
        <div 
          className="absolute bg-white/10 border-4 border-yellow-400 rounded-lg animate-pulse"
          style={{
            // This would need dynamic positioning based on target element
            top: '20%',
            left: '20%', 
            width: '200px',
            height: '80px'
          }}
        />
      </div>

      {/* Driver Card */}
      <div className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Card className="w-80 bg-gradient-to-br from-blue-500 to-purple-600 text-white border-0 shadow-2xl animate-scale-in">
          <CardContent className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="text-2xl">🎯</div>
                <h3 className="font-bold text-lg">{currentStepData.title}</h3>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                  className="text-white hover:bg-white/20"
                >
                  {isAudioEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSkip}
                  className="text-white hover:bg-white/20"
                >
                  <X size={16} />
                </Button>
              </div>
            </div>

            {/* Content */}
            <p className="text-white/90 mb-6 text-sm leading-relaxed">
              {currentStepData.description}
            </p>

            {/* Progress */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-1">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index <= currentStep ? 'bg-yellow-400' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-white/70">
                {currentStep + 1} / {steps.length}
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleSkip}
                className="flex-1 bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                Skip
              </Button>
              <Button
                onClick={handleNext}
                className="flex-1 bg-yellow-400 text-black hover:bg-yellow-300 font-semibold"
              >
                {currentStep === steps.length - 1 ? 'शुरू करें!' : 'Next'}
              </Button>
            </div>

            {/* Hand animation */}
            <div className="absolute -bottom-2 -right-2 animate-bounce">
              <div className="text-2xl">👉</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};