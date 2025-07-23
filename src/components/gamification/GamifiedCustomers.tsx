import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Star,
  Volume2,
  Navigation,
  Camera,
  CheckCircle,
  Heart,
  Gift,
  User
} from 'lucide-react';

interface SimpleCustomer {
  id: string;
  name: string;
  hindiName?: string;
  icon: string;
  location: string;
  distance: string;
  visitStatus: 'pending' | 'visited' | 'callback_needed';
  priority: 'high' | 'medium' | 'low';
  purpose: string;
  hindiPurpose: string;
  points: number;
  lastVisit?: string;
  phoneNumber: string;
  relationship: 'new' | 'existing' | 'vip';
}

const sampleCustomers: SimpleCustomer[] = [
  {
    id: 'cust_1',
    name: 'Priya Sharma',
    hindiName: 'प्रिया शर्मा',
    icon: '👩',
    location: 'वार्ड 3, सेक्टर 12',
    distance: '0.5 किमी',
    visitStatus: 'pending',
    priority: 'high',
    purpose: 'New Savings Account',
    hindiPurpose: 'नया बचत खाता',
    points: 75,
    phoneNumber: '+91 98765 43210',
    relationship: 'new'
  },
  {
    id: 'cust_2',
    name: 'Rajesh Kumar',
    hindiName: 'राजेश कुमार',
    icon: '👨',
    location: 'मुख्य बाज़ार',
    distance: '1.2 किमी',
    visitStatus: 'callback_needed',
    priority: 'high',
    purpose: 'Loan Follow-up',
    hindiPurpose: 'लोन की जानकारी',
    points: 100,
    lastVisit: '2 दिन पहले',
    phoneNumber: '+91 98765 43211',
    relationship: 'existing'
  },
  {
    id: 'cust_3',
    name: 'Meera Devi',
    hindiName: 'मीरा देवी',
    icon: '👵',
    location: 'गांव - रामपुर',
    distance: '3.5 किमी',
    visitStatus: 'pending',
    priority: 'medium',
    purpose: 'SHG Formation',
    hindiPurpose: 'समूह बनाना',
    points: 150,
    phoneNumber: '+91 98765 43212',
    relationship: 'vip'
  },
  {
    id: 'cust_4',
    name: 'Amit Singh',
    hindiName: 'अमित सिंह',
    icon: '👨‍💼',
    location: 'बिजनेस पार्क',
    distance: '2.1 किमी',
    visitStatus: 'visited',
    priority: 'low',
    purpose: 'Insurance Renewal',
    hindiPurpose: 'बीमा नवीकरण',
    points: 50,
    lastVisit: 'आज सुबह',
    phoneNumber: '+91 98765 43213',
    relationship: 'existing'
  }
];

const GamifiedCustomers = () => {
  const [customers, setCustomers] = useState(sampleCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState<SimpleCustomer | null>(null);
  const [todayVisits, setTodayVisits] = useState(1);
  const [totalPoints, setTotalPoints] = useState(275);

  // Filter customers by status for easy navigation
  const pendingVisits = customers.filter(c => c.visitStatus === 'pending');
  const callbackNeeded = customers.filter(c => c.visitStatus === 'callback_needed');
  const completedToday = customers.filter(c => c.visitStatus === 'visited');

  // Play audio instruction
  const playAudio = (text: string) => {
    console.log(`Playing audio: ${text}`);
  };

  // Handle customer action
  const handleCustomerAction = (customer: SimpleCustomer, action: 'call' | 'visit' | 'navigate') => {
    switch (action) {
      case 'call':
        playAudio(`${customer.hindiName} को फोन करते हैं`);
        break;
      case 'visit':
        playAudio(`${customer.hindiName} के घर जाने के लिए रास्ता दिखाते हैं`);
        break;
      case 'navigate':
        playAudio(`${customer.location} का रास्ता`);
        break;
    }
    
    setSelectedCustomer(customer);
  };

  // Complete visit
  const completeVisit = (customerId: string) => {
    setCustomers(prev => prev.map(customer => 
      customer.id === customerId 
        ? { ...customer, visitStatus: 'visited' as const, lastVisit: 'अभी' }
        : customer
    ));
    
    const customer = customers.find(c => c.id === customerId);
    if (customer) {
      setTotalPoints(prev => prev + customer.points);
      setTodayVisits(prev => prev + 1);
      playAudio('बहुत बढ़िया! मिलना पूरा हुआ');
    }
    
    setSelectedCustomer(null);
  };

  // Get status color and icon
  const getStatusDisplay = (status: SimpleCustomer['visitStatus']) => {
    switch (status) {
      case 'pending':
        return { 
          color: 'bg-blue-100 text-blue-800', 
          text: 'मिलना है',
          icon: '🏠'
        };
      case 'callback_needed':
        return { 
          color: 'bg-orange-100 text-orange-800', 
          text: 'फोन करें',
          icon: '📞'
        };
      case 'visited':
        return { 
          color: 'bg-green-100 text-green-800', 
          text: 'मिल चुके',
          icon: '✅'
        };
    }
  };

  // Get priority color
  const getPriorityColor = (priority: SimpleCustomer['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-50 text-red-600 border-red-200';
      case 'medium': return 'bg-yellow-50 text-yellow-600 border-yellow-200';
      case 'low': return 'bg-green-50 text-green-600 border-green-200';
    }
  };

  // Get relationship icon
  const getRelationshipIcon = (relationship: SimpleCustomer['relationship']) => {
    switch (relationship) {
      case 'new': return '✨';
      case 'existing': return '🤝';
      case 'vip': return '⭐';
    }
  };

  return (
    <div className="space-y-6">
      {/* Daily Progress Header */}
      <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">ग्राहक मिलना</h1>
              <p className="text-purple-100">आज के ग्राहक दर्शन</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-1">👥</div>
              <div className="text-sm">मिलना</div>
            </div>
          </div>

          {/* Today's Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-white/10 rounded-lg">
              <div className="text-xl font-bold">{completedToday.length}</div>
              <div className="text-xs">मिल चुके</div>
            </div>
            <div className="text-center p-3 bg-white/10 rounded-lg">
              <div className="text-xl font-bold">{pendingVisits.length}</div>
              <div className="text-xs">बाकी हैं</div>
            </div>
            <div className="text-center p-3 bg-white/10 rounded-lg">
              <div className="text-xl font-bold">{totalPoints}</div>
              <div className="text-xs">कुल पॉइंट्स</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Priority Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4 text-center">
            <div className="text-3xl mb-2">🔥</div>
            <div className="font-bold text-red-800">तुरंत मिलें</div>
            <div className="text-sm text-red-600">{callbackNeeded.length} ग्राहक</div>
          </CardContent>
        </Card>
        
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="text-3xl mb-2">🎯</div>
            <div className="font-bold text-blue-800">आज जाना है</div>
            <div className="text-sm text-blue-600">{pendingVisits.length} ग्राहक</div>
          </CardContent>
        </Card>
      </div>

      {/* Customer List */}
      <div className="space-y-4">
        {customers.map((customer) => {
          const statusDisplay = getStatusDisplay(customer.visitStatus);
          
          return (
            <Card 
              key={customer.id}
              className={`transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                customer.visitStatus === 'visited' ? 'opacity-60' : 'cursor-pointer'
              }`}
            >
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Customer Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="text-4xl">{customer.icon}</div>
                        <div className="absolute -top-1 -right-1 text-lg">
                          {getRelationshipIcon(customer.relationship)}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{customer.hindiName}</h3>
                        <p className="text-gray-600 text-sm">{customer.name}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end space-y-2">
                      <Badge className={getPriorityColor(customer.priority)}>
                        {customer.priority === 'high' ? 'जरूरी' : 
                         customer.priority === 'medium' ? 'सामान्य' : 'बाद में'}
                      </Badge>
                      <Badge className={statusDisplay.color}>
                        {statusDisplay.icon} {statusDisplay.text}
                      </Badge>
                    </div>
                  </div>

                  {/* Purpose and Location */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <User className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-medium text-gray-700">काम</span>
                        </div>
                        <p className="font-bold">{customer.hindiPurpose}</p>
                        <p className="text-sm text-gray-600">{customer.purpose}</p>
                      </div>
                      
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <MapPin className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-medium text-gray-700">पता</span>
                        </div>
                        <p className="font-bold">{customer.location}</p>
                        <p className="text-sm text-gray-600">{customer.distance} दूर</p>
                      </div>
                    </div>
                  </div>

                  {/* Points and Last Visit */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Star className="h-5 w-5 text-yellow-600" />
                        <span className="font-bold text-yellow-600">+{customer.points}</span>
                      </div>
                      
                      {customer.lastVisit && (
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">पिछली बार: {customer.lastVisit}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-4 gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handleCustomerAction(customer, 'call')}
                      className="h-14 flex-col space-y-1 text-blue-600 hover:text-blue-700"
                      disabled={customer.visitStatus === 'visited'}
                    >
                      <Phone className="h-5 w-5" />
                      <span className="text-xs">फोन</span>
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => handleCustomerAction(customer, 'navigate')}
                      className="h-14 flex-col space-y-1 text-green-600 hover:text-green-700"
                      disabled={customer.visitStatus === 'visited'}
                    >
                      <Navigation className="h-5 w-5" />
                      <span className="text-xs">रास्ता</span>
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => playAudio(customer.hindiName + ' ' + customer.hindiPurpose)}
                      className="h-14 flex-col space-y-1 text-purple-600 hover:text-purple-700"
                    >
                      <Volume2 className="h-5 w-5" />
                      <span className="text-xs">सुनें</span>
                    </Button>
                    
                    {customer.visitStatus !== 'visited' ? (
                      <Button
                        onClick={() => completeVisit(customer.id)}
                        className="h-14 flex-col space-y-1 bg-green-600 hover:bg-green-700 text-white"
                      >
                        <CheckCircle className="h-5 w-5" />
                        <span className="text-xs">पूरा</span>
                      </Button>
                    ) : (
                      <Button
                        disabled
                        variant="outline"
                        className="h-14 flex-col space-y-1 bg-green-100 text-green-600"
                      >
                        <CheckCircle className="h-5 w-5" />
                        <span className="text-xs">हो गया</span>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Daily Target */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Gift className="h-8 w-8 text-green-600" />
              <div>
                <h3 className="text-lg font-bold text-green-800">आज का लक्ष्य</h3>
                <p className="text-sm text-green-700">5 ग्राहकों से मिलना</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">{completedToday.length}/5</div>
              <div className="text-sm text-green-700">पूरे हुए</div>
            </div>
          </div>
          
          <Progress value={(completedToday.length / 5) * 100} className="h-3" />
          
          {completedToday.length >= 5 && (
            <div className="mt-3 text-center">
              <Badge className="bg-green-100 text-green-800 text-sm px-4 py-2">
                🎉 बधाई हो! आज का लक्ष्य पूरा!
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GamifiedCustomers;