
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Route } from 'lucide-react';

interface DesktopRouteMapProps {
  onStartNavigation: () => void;
  onOptimizeRoute: () => void;
}

const DesktopRouteMap = ({ onStartNavigation, onOptimizeRoute }: DesktopRouteMapProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="h-5 w-5 mr-2" />
          Optimized Route Map
          <Badge className="ml-2 bg-green-100 text-green-800">AI Optimized</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 bg-gray-50 rounded-lg border relative overflow-hidden">
          {/* Simple SVG Map Visualization */}
          <svg className="w-full h-full" viewBox="0 0 400 320">
            {/* Background grid */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Roads/Routes */}
            <path d="M 50 50 Q 150 80 200 120 T 350 200" stroke="#3b82f6" strokeWidth="3" fill="none" strokeDasharray="5,5" />
            <path d="M 200 120 L 250 160 L 320 180" stroke="#3b82f6" strokeWidth="3" fill="none" strokeDasharray="5,5" />
            <path d="M 100 200 Q 180 220 250 160" stroke="#3b82f6" strokeWidth="3" fill="none" strokeDasharray="5,5" />
            
            {/* Customer locations */}
            <g>
              {/* Location 1 - Priya Sharma */}
              <circle cx="80" cy="70" r="8" fill="#ef4444" stroke="#fff" strokeWidth="2" />
              <text x="95" y="75" fontSize="10" fill="#374151" fontWeight="500">Priya S.</text>
              <text x="95" y="85" fontSize="8" fill="#6b7280">9:30 AM</text>
              
              {/* Location 2 - Rajesh Kumar */}
              <circle cx="180" cy="140" r="8" fill="#f59e0b" stroke="#fff" strokeWidth="2" />
              <text x="195" y="145" fontSize="10" fill="#374151" fontWeight="500">Rajesh K.</text>
              <text x="195" y="155" fontSize="8" fill="#6b7280">11:00 AM</text>
              
              {/* Location 3 - Anita Patel */}
              <circle cx="280" cy="120" r="8" fill="#ef4444" stroke="#fff" strokeWidth="2" />
              <text x="295" y="125" fontSize="10" fill="#374151" fontWeight="500">Anita P.</text>
              <text x="295" y="135" fontSize="8" fill="#6b7280">12:00 PM</text>
              
              {/* Location 4 - Vikram Singh */}
              <circle cx="340" cy="200" r="8" fill="#f59e0b" stroke="#fff" strokeWidth="2" />
              <text x="295" y="220" fontSize="10" fill="#374151" fontWeight="500">Vikram S.</text>
              <text x="295" y="230" fontSize="8" fill="#6b7280">2:30 PM</text>
              
              {/* Location 5 - Sunita Devi */}
              <circle cx="120" cy="220" r="8" fill="#10b981" stroke="#fff" strokeWidth="2" />
              <text x="135" y="225" fontSize="10" fill="#374151" fontWeight="500">Sunita D.</text>
              <text x="135" y="235" fontSize="8" fill="#6b7280">4:00 PM</text>
            </g>
            
            {/* Current location */}
            <g>
              <circle cx="50" cy="50" r="10" fill="#3b82f6" stroke="#fff" strokeWidth="3" />
              <circle cx="50" cy="50" r="6" fill="#1d4ed8" />
              <text x="65" y="45" fontSize="10" fill="#374151" fontWeight="600">You</text>
              <text x="65" y="55" fontSize="8" fill="#6b7280">Current</text>
            </g>
            
            {/* Distance markers */}
            <text x="110" y="100" fontSize="8" fill="#6b7280">2.3km</text>
            <text x="220" y="180" fontSize="8" fill="#6b7280">4.1km</text>
            <text x="320" y="150" fontSize="8" fill="#6b7280">6.8km</text>
          </svg>
          
          {/* Legend */}
          <div className="absolute bottom-2 left-2 bg-white p-2 rounded shadow-sm border text-xs">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>High Priority</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span>Medium</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Low</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex space-x-2">
          <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={onStartNavigation}>
            <Navigation className="h-4 w-4 mr-2" />
            Start Navigation
          </Button>
          <Button variant="outline" className="flex-1" onClick={onOptimizeRoute}>
            <Route className="h-4 w-4 mr-2" />
            Optimize Route
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DesktopRouteMap;
