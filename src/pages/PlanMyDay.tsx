
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { Target, CheckCircle, Route } from 'lucide-react';
import MobileCustomerCard from '@/components/mobile/MobileCustomerCard';
import MobileMapView from '@/components/mobile/MobileMapView';
import MobileStatsCards from '@/components/mobile/MobileStatsCards';
import DesktopStatsOverview from '@/components/desktop/DesktopStatsOverview';
import DesktopRouteMap from '@/components/desktop/DesktopRouteMap';
import DesktopCustomerVisitsList from '@/components/desktop/DesktopCustomerVisitsList';
import { CustomerVisit, sampleVisits } from '@/data/sampleVisitsData';

const PlanMyDay = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedVisit, setSelectedVisit] = useState<string | null>(null);
  const [visits, setVisits] = useState<CustomerVisit[]>(sampleVisits);

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleStatusChange = (visitId: string, newStatus: CustomerVisit['status']) => {
    setVisits(prev => prev.map(visit => 
      visit.id === visitId ? { ...visit, status: newStatus } : visit
    ));
    
    const visit = visits.find(v => v.id === visitId);
    if (visit) {
      toast({
        title: "Visit Status Updated",
        description: `${visit.name} marked as ${newStatus.replace('_', ' ')}`,
      });
    }
  };

  const handleCall = (visit: CustomerVisit) => {
    toast({
      title: "Calling Customer",
      description: `Initiating call to ${visit.name}`,
    });
  };

  const handleNavigate = (visit: CustomerVisit) => {
    toast({
      title: "Navigation Started",
      description: `Navigating to ${visit.name}'s location`,
    });
  };

  const handleOptimizeRoute = () => {
    toast({
      title: "Route Optimized",
      description: "Route has been recalculated for maximum efficiency.",
    });
  };

  const handleStartNavigation = () => {
    toast({
      title: "Navigation Started",
      description: "Starting navigation to your first destination.",
    });
  };

  // Calculate stats
  const completedVisits = visits.filter(v => v.status === 'completed').length;
  const totalVisits = visits.length;
  const totalDistance = visits.reduce((sum, visit) => sum + parseFloat(visit.distance), 0);
  const estimatedTotalTime = visits.reduce((sum, visit) => sum + visit.estimatedDuration, 0);
  const progressPercentage = (completedVisits / totalVisits) * 100;

  if (isMobile) {
    return (
      <div className="space-y-4 pb-6">
        {/* Mobile Header */}
        <div className="sticky top-0 bg-white z-10 pb-2 border-b">
          <h1 className="text-xl font-bold text-gray-900">Plan My Day</h1>
          <p className="text-sm text-gray-600">
            {currentTime.toLocaleDateString()}
          </p>
        </div>

        {/* Mobile Stats */}
        <MobileStatsCards
          totalVisits={totalVisits}
          completedVisits={completedVisits}
          totalDistance={totalDistance}
          estimatedTime={estimatedTotalTime}
          currentTime={currentTime}
        />

        {/* Mobile Map */}
        <MobileMapView
          visits={visits}
          onOptimizeRoute={handleOptimizeRoute}
          onStartNavigation={handleStartNavigation}
        />

        {/* Mobile Customer List */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Today's Visits</h2>
          {visits.map((visit) => (
            <MobileCustomerCard
              key={visit.id}
              visit={visit}
              onStatusChange={handleStatusChange}
              onCall={handleCall}
              onNavigate={handleNavigate}
              isSelected={selectedVisit === visit.id}
              onClick={() => setSelectedVisit(visit.id === selectedVisit ? null : visit.id)}
            />
          ))}
        </div>

        {/* Mobile Quick Actions */}
        <div className="fixed bottom-4 left-4 right-4 bg-white border rounded-lg shadow-lg p-3">
          <div className="grid grid-cols-2 gap-2">
            <Button 
              className="bg-green-600 hover:bg-green-700"
              onClick={() => {
                const pendingVisits = visits.filter(v => v.status === 'pending');
                if (pendingVisits.length > 0) {
                  handleStatusChange(pendingVisits[0].id, 'in_progress');
                } else {
                  toast({
                    title: "All Visits Completed",
                    description: "Great job! You've completed all visits for today.",
                  });
                }
              }}
            >
              <Target className="h-4 w-4 mr-2" />
              Next Visit
            </Button>
            
            <Button 
              variant="outline"
              onClick={handleOptimizeRoute}
            >
              <Route className="h-4 w-4 mr-2" />
              Optimize
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DesktopStatsOverview
        totalVisits={totalVisits}
        completedVisits={completedVisits}
        totalDistance={totalDistance}
        estimatedTotalTime={estimatedTotalTime}
        progressPercentage={progressPercentage}
        currentTime={currentTime}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DesktopRouteMap
          onStartNavigation={handleStartNavigation}
          onOptimizeRoute={handleOptimizeRoute}
        />

        <DesktopCustomerVisitsList
          visits={visits}
          selectedVisit={selectedVisit}
          onSelectVisit={setSelectedVisit}
          onStatusChange={handleStatusChange}
          onCall={handleCall}
          onNavigate={handleNavigate}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <Button 
          className="bg-green-600 hover:bg-green-700"
          onClick={() => {
            const pendingVisits = visits.filter(v => v.status === 'pending');
            if (pendingVisits.length > 0) {
              handleStatusChange(pendingVisits[0].id, 'in_progress');
            } else {
              toast({
                title: "All Visits Completed",
                description: "Great job! You've completed all visits for today.",
              });
            }
          }}
        >
          <Target className="h-4 w-4 mr-2" />
          Start Next Visit
        </Button>
        
        <Button 
          variant="outline"
          onClick={() => {
            toast({
              title: "Day Completed",
              description: "All visits have been marked as completed. Great work!",
            });
            setVisits(prev => prev.map(visit => ({ ...visit, status: 'completed' as const })));
          }}
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Mark Day Complete
        </Button>
        
        <Button 
          variant="outline"
          onClick={handleOptimizeRoute}
        >
          <Route className="h-4 w-4 mr-2" />
          Optimize Route
        </Button>
      </div>
    </div>
  );
};

export default PlanMyDay;
