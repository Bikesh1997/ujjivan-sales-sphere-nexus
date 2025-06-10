
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Route } from 'lucide-react';

interface CustomerVisit {
  id: string;
  name: string;
  priority: 'High' | 'Medium' | 'Low';
  eta: string;
  distance: string;
  latitude: number;
  longitude: number;
}

interface MobileMapViewProps {
  visits: CustomerVisit[];
  onOptimizeRoute: () => void;
  onStartNavigation: () => void;
}

const MobileMapView = ({ visits, onOptimizeRoute, onStartNavigation }: MobileMapViewProps) => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-lg">
          <MapPin className="h-5 w-5 mr-2" />
          Route Overview
          <Badge className="ml-2 bg-green-100 text-green-800 text-xs">AI Optimized</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Simplified Mobile Map */}
        <div className="h-48 bg-gray-50 rounded-lg border relative overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 320 192">
            {/* Background grid for mobile */}
            <defs>
              <pattern id="mobile-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mobile-grid)" />
            
            {/* Mobile-optimized route lines */}
            <path d="M 40 40 Q 120 60 160 90 T 280 130" stroke="#3b82f6" strokeWidth="2" fill="none" strokeDasharray="3,3" />
            <path d="M 160 90 L 200 110 L 250 120" stroke="#3b82f6" strokeWidth="2" fill="none" strokeDasharray="3,3" />
            
            {/* Customer locations - mobile optimized */}
            <g>
              {/* Current location */}
              <circle cx="40" cy="40" r="6" fill="#3b82f6" stroke="#fff" strokeWidth="2" />
              <text x="50" y="35" fontSize="8" fill="#374151" fontWeight="600">You</text>
              
              {/* Visit locations */}
              <circle cx="80" cy="60" r="5" fill="#ef4444" stroke="#fff" strokeWidth="1" />
              <text x="88" y="64" fontSize="7" fill="#374151">1</text>
              
              <circle cx="160" cy="90" r="5" fill="#f59e0b" stroke="#fff" strokeWidth="1" />
              <text x="168" y="94" fontSize="7" fill="#374151">2</text>
              
              <circle cx="220" cy="100" r="5" fill="#ef4444" stroke="#fff" strokeWidth="1" />
              <text x="228" y="104" fontSize="7" fill="#374151">3</text>
              
              <circle cx="280" cy="130" r="5" fill="#f59e0b" stroke="#fff" strokeWidth="1" />
              <text x="250" y="148" fontSize="7" fill="#374151">4</text>
              
              <circle cx="100" cy="150" r="5" fill="#10b981" stroke="#fff" strokeWidth="1" />
              <text x="108" y="154" fontSize="7" fill="#374151">5</text>
            </g>
            
            {/* Distance labels - mobile optimized */}
            <text x="90" y="80" fontSize="6" fill="#6b7280">2.3km</text>
            <text x="180" y="120" fontSize="6" fill="#6b7280">4.1km</text>
          </svg>
          
          {/* Mobile legend */}
          <div className="absolute bottom-1 left-1 bg-white p-1 rounded text-xs border">
            <div className="flex space-x-2">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
                <span className="text-xs">High</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></div>
                <span className="text-xs">Med</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                <span className="text-xs">Low</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <Button 
            onClick={onStartNavigation}
            className="bg-blue-600 hover:bg-blue-700 text-sm h-10"
          >
            <Navigation className="h-4 w-4 mr-2" />
            Navigate
          </Button>
          <Button 
            variant="outline" 
            onClick={onOptimizeRoute}
            className="text-sm h-10"
          >
            <Route className="h-4 w-4 mr-2" />
            Optimize
          </Button>
        </div>

        {/* Quick Stats for Mobile */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-gray-50 rounded p-2">
            <p className="text-xs text-gray-600">Visits</p>
            <p className="text-lg font-bold">{visits.length}</p>
          </div>
          <div className="bg-gray-50 rounded p-2">
            <p className="text-xs text-gray-600">Distance</p>
            <p className="text-lg font-bold">27km</p>
          </div>
          <div className="bg-gray-50 rounded p-2">
            <p className="text-xs text-gray-600">Time</p>
            <p className="text-lg font-bold">3h 30m</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MobileMapView;
