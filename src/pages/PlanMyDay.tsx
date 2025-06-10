
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { sampleVisits, CustomerVisit } from '@/data/sampleVisitsData';
import DesktopStatsOverview from '@/components/desktop/DesktopStatsOverview';
import DesktopRouteMap from '@/components/desktop/DesktopRouteMap';
import DesktopCustomerVisitsList from '@/components/desktop/DesktopCustomerVisitsList';
import MobileStatsCards from '@/components/mobile/MobileStatsCards';
import MobileMapView from '@/components/mobile/MobileMapView';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const PlanMyDay = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [visits, setVisits] = useState<CustomerVisit[]>(sampleVisits);
  const [selectedVisit, setSelectedVisit] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMobile, setIsMobile] = useState(false);

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Check for mobile screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Calculate statistics
  const totalVisits = visits.length;
  const completedVisits = visits.filter(visit => visit.status === 'completed').length;
  const totalDistance = visits.reduce((acc, visit) => acc + parseFloat(visit.distance), 0);
  const estimatedTotalTime = visits.reduce((acc, visit) => acc + visit.estimatedDuration, 0);
  const progressPercentage = (completedVisits / totalVisits) * 100;

  const handleStatusChange = (visitId: string, status: CustomerVisit['status']) => {
    setVisits(visits.map(visit => 
      visit.id === visitId ? { ...visit, status } : visit
    ));
    
    const visit = visits.find(v => v.id === visitId);
    toast({
      title: "Visit Status Updated",
      description: `${visit?.name}'s visit has been marked as ${status.replace('_', ' ')}`,
    });
  };

  const handleCall = (visit: CustomerVisit) => {
    toast({
      title: "Calling Customer",
      description: `Initiating call to ${visit.name} at ${visit.phone}`,
    });
  };

  const handleNavigate = (visit: CustomerVisit) => {
    toast({
      title: "Navigation Started",
      description: `Starting navigation to ${visit.name}'s location`,
    });
  };

  const handleStartNavigation = () => {
    toast({
      title: "Route Navigation",
      description: "Starting optimized route navigation for all visits",
    });
  };

  const handleOptimizeRoute = () => {
    toast({
      title: "Route Optimization",
      description: "AI is optimizing your route for maximum efficiency",
    });
  };

  if (isMobile) {
    return (
      <div className="space-y-4 p-4">
        <MobileStatsCards
          totalVisits={totalVisits}
          completedVisits={completedVisits}
          totalDistance={totalDistance}
          estimatedTime={estimatedTotalTime}
          currentTime={currentTime}
        />
        
        <MobileMapView
          visits={visits}
          onOptimizeRoute={handleOptimizeRoute}
          onStartNavigation={handleStartNavigation}
        />

        {/* Mobile Visits List */}
        <div className="space-y-3">
          {visits.map((visit) => (
            <Card key={visit.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{visit.name}</h3>
                  <span className="text-xs text-gray-500">{visit.eta}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{visit.purpose}</p>
                <p className="text-xs text-gray-500 mb-3">{visit.address}</p>
                <div className="flex gap-2">
                  {visit.status === 'pending' && (
                    <>
                      <button 
                        className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm"
                        onClick={() => handleStatusChange(visit.id, 'in_progress')}
                      >
                        Start
                      </button>
                      <button 
                        className="px-3 py-2 border rounded text-sm"
                        onClick={() => handleCall(visit)}
                      >
                        Call
                      </button>
                    </>
                  )}
                  {visit.status === 'in_progress' && (
                    <button 
                      className="flex-1 bg-green-600 text-white py-2 px-3 rounded text-sm"
                      onClick={() => handleStatusChange(visit.id, 'completed')}
                    >
                      Complete
                    </button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
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
    </div>
  );
};

export default PlanMyDay;
