
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Route,
  Car,
  Phone
} from 'lucide-react';

const PlanMyDay = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);

  // Mock data for today's customer visits
  const todaysVisits = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      business: 'Tech Solutions Pvt Ltd',
      address: 'Bandra West, Mumbai - 400050',
      phone: '+91 98765 43210',
      eta: '10:30 AM',
      priority: 'High',
      visitType: 'Loan Discussion',
      distance: '2.3 km',
      coordinates: [72.8265, 19.0596]
    },
    {
      id: 2,
      name: 'Priya Sharma',
      business: 'Digital Marketing Co',
      address: 'Andheri East, Mumbai - 400069',
      phone: '+91 87654 32109',
      eta: '12:15 PM',
      priority: 'Medium',
      visitType: 'Document Collection',
      distance: '4.1 km',
      coordinates: [72.8776, 19.1197]
    },
    {
      id: 3,
      name: 'Amit Patel',
      business: 'Construction Corp',
      address: 'Powai, Mumbai - 400076',
      phone: '+91 76543 21098',
      eta: '2:45 PM',
      priority: 'High',
      visitType: 'Site Visit',
      distance: '6.8 km',
      coordinates: [72.9081, 19.1176]
    },
    {
      id: 4,
      name: 'Sunita Devi',
      business: 'Textile Exports',
      address: 'Kurla West, Mumbai - 400070',
      phone: '+91 65432 10987',
      eta: '4:30 PM',
      priority: 'Medium',
      visitType: 'Follow-up Meeting',
      distance: '3.2 km',
      coordinates: [72.8790, 19.0728]
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalDistance = todaysVisits.reduce((sum, visit) => sum + parseFloat(visit.distance), 0);
  const estimatedTime = Math.round(totalDistance * 10 + todaysVisits.length * 30); // rough calculation

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Plan My Day</h1>
        <p className="text-gray-600">Optimize your route and manage today's customer visits</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Route Summary */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Route className="mr-2" size={18} />
              Route Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <MapPin size={16} className="text-blue-600 mr-2" />
                  <span className="text-sm font-medium">Total Distance</span>
                </div>
                <span className="font-bold text-blue-700">{totalDistance.toFixed(1)} km</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <Clock size={16} className="text-green-600 mr-2" />
                  <span className="text-sm font-medium">Est. Time</span>
                </div>
                <span className="font-bold text-green-700">{Math.floor(estimatedTime / 60)}h {estimatedTime % 60}m</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                <div className="flex items-center">
                  <Car size={16} className="text-orange-600 mr-2" />
                  <span className="text-sm font-medium">Total Visits</span>
                </div>
                <span className="font-bold text-orange-700">{todaysVisits.length}</span>
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Navigation size={16} className="mr-2" />
                Start Navigation
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Customer Visit List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2" size={18} />
              Today's Customer Visits
              <Badge className="ml-2 bg-blue-100 text-blue-800">
                {todaysVisits.length} visits
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todaysVisits.map((visit, index) => (
                <div 
                  key={visit.id} 
                  className={`border rounded-lg p-4 transition-all cursor-pointer ${
                    selectedCustomer === visit.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedCustomer(visit.id)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{visit.name}</h4>
                        <p className="text-sm text-gray-600">{visit.business}</p>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <MapPin size={10} className="mr-1" />
                          {visit.address}
                        </div>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <Phone size={10} className="mr-1" />
                          {visit.phone}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getPriorityColor(visit.priority)}>
                        {visit.priority}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">ETA: {visit.eta}</p>
                      <p className="text-xs text-gray-500">{visit.distance}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock size={12} className="mr-1" />
                      Purpose: {visit.visitType}
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Phone size={12} className="mr-1" />
                        Call
                      </Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <Navigation size={12} className="mr-1" />
                        Navigate
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Map Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="mr-2" size={18} />
            Optimized Route Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MapPin size={48} className="text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Interactive Route Map</p>
              <p className="text-sm text-gray-500">Map integration showing optimized path through all customer locations</p>
              <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
                <Route size={16} className="mr-2" />
                Optimize Route
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlanMyDay;
