import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Volume2, X, ArrowRight } from 'lucide-react';

interface DriverStep {
  id: string;
  target: string;
  title: string;
  description: string;
  audioText: string;
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
}

interface OnboardingDriverProps {
  pageId: string;
  steps: DriverStep[];
  onComplete: () => void;
}

const OnboardingDriver: React.FC<OnboardingDriverProps> = ({ pageId, steps, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has seen this page tour before
    const visitedPages = JSON.parse(localStorage.getItem('visitedPages') || '[]');
    if (!visitedPages.includes(pageId)) {
      setIsVisible(true);
      playAudio(steps[0]?.audioText);
    }
  }, [pageId, steps]);

  const playAudio = (text: string) => {
    console.log(`🔊 Playing Hindi audio: ${text}`);
    // In real implementation, use Web Speech API or audio files
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      playAudio(steps[nextStep].audioText);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    // Mark page as visited
    const visitedPages = JSON.parse(localStorage.getItem('visitedPages') || '[]');
    visitedPages.push(pageId);
    localStorage.setItem('visitedPages', JSON.stringify(visitedPages));
    
    setIsVisible(false);
    onComplete();
  };

  const handleSkip = () => {
    playAudio('टूर छोड़ा गया');
    handleComplete();
  };

  if (!isVisible || !steps[currentStep]) return null;

  const step = steps[currentStep];

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
        {/* Skip button */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleSkip}
          className="absolute top-4 right-4 bg-white"
        >
          <X className="h-4 w-4 mr-1" />
          छोड़ें
        </Button>

        {/* Driver Card */}
        <Card className="max-w-md w-full bg-white shadow-2xl">
          <CardContent className="p-6">
            {/* Step indicator */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex space-x-2">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      index <= currentStep ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {currentStep + 1}/{steps.length}
              </span>
            </div>

            {/* Content */}
            <div className="text-center space-y-4">
              <div className="text-6xl">{step.id === 'welcome' ? '👋' : '🎯'}</div>
              
              <h2 className="text-xl font-bold text-gray-900">{step.title}</h2>
              
              <p className="text-gray-700 leading-relaxed">{step.description}</p>

              {/* Audio button */}
              <Button
                variant="outline"
                onClick={() => playAudio(step.audioText)}
                className="w-full h-12 text-lg"
              >
                <Volume2 className="h-5 w-5 mr-2" />
                फिर से सुनें
              </Button>

              {/* Navigation */}
              <div className="flex space-x-3">
                {currentStep === steps.length - 1 ? (
                  <Button 
                    onClick={handleComplete}
                    className="flex-1 h-12 text-lg bg-green-600 hover:bg-green-700"
                  >
                    समझ गया! ✅
                  </Button>
                ) : (
                  <Button 
                    onClick={handleNext}
                    className="flex-1 h-12 text-lg"
                  >
                    आगे बढ़ें
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

// Predefined tours for different pages
export const tours = {
  dashboard: [
    {
      id: 'welcome',
      target: '',
      title: 'स्वागत है!',
      description: 'यह आपका मुख्य पेज है। यहाँ से आप अपने सभी काम देख सकते हैं।',
      audioText: 'स्वागत है! यह आपका मुख्य पेज है। यहाँ से आप अपने सभी काम देख सकते हैं।',
      position: 'center' as const
    },
    {
      id: 'tasks',
      target: '.quick-actions',
      title: 'आज के काम',
      description: 'यहाँ आपके आज के सभी काम दिखे हैं। नीले बटन दबा कर शुरू करें।',
      audioText: 'यहाँ आपके आज के सभी काम दिखे हैं। नीले बटन दबा कर शुरू करें।',
      position: 'top' as const
    },
    {
      id: 'navigation',
      target: '.bottom-nav',
      title: 'नेवीगेशन',
      description: 'नीचे के बटन से अलग-अलग पेज पर जा सकते हैं। आइकन देख कर समझें।',
      audioText: 'नीचे के बटन से अलग-अलग पेज पर जा सकते हैं। आइकन देख कर समझें।',
      position: 'top' as const
    }
  ],
  tasks: [
    {
      id: 'task_welcome',
      target: '',
      title: 'काम की सूची',
      description: 'यहाँ आपके आज के सभी काम हैं। एक-एक करके पूरे करें।',
      audioText: 'यहाँ आपके आज के सभी काम हैं। एक-एक करके पूरे करें।',
      position: 'center' as const
    },
    {
      id: 'task_card',
      target: '.task-card',
      title: 'काम कार्ड',
      description: 'हर काम एक कार्ड में है। बड़े बटन दबा कर शुरू करें।',
      audioText: 'हर काम एक कार्ड में है। बड़े बटन दबा कर शुरू करें।',
      position: 'bottom' as const
    }
  ],
  customers: [
    {
      id: 'customer_welcome',
      target: '',
      title: 'ग्राहक मिलना',
      description: 'यहाँ उन लोगों की सूची है जिनसे आपको मिलना है।',
      audioText: 'यहाँ उन लोगों की सूची है जिनसे आपको मिलना है।',
      position: 'center' as const
    }
  ]
};

export default OnboardingDriver;