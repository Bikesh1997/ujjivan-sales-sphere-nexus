
export interface CustomerVisit {
  id: string;
  name: string;
  address: string;
  phone: string;
  priority: 'High' | 'Medium' | 'Low';
  purpose: string;
  estimatedDuration: number;
  eta: string;
  distance: string;
  status: 'pending' | 'in_progress' | 'completed' | 'skipped';
  latitude: number;
  longitude: number;
}

export const sampleVisits: CustomerVisit[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    address: 'Bandra West, Mumbai 400050',
    phone: '+91 98765 43210',
    priority: 'High',
    purpose: 'Home Loan Discussion',
    estimatedDuration: 45,
    eta: '9:30 AM',
    distance: '2.3 km',
    status: 'pending',
    latitude: 19.0544,
    longitude: 72.8270
  },
  {
    id: '2',
    name: 'Rajesh Kumar',
    address: 'Andheri East, Mumbai 400069',
    phone: '+91 98765 43211',
    priority: 'Medium',
    purpose: 'Investment Advisory',
    estimatedDuration: 30,
    eta: '11:00 AM',
    distance: '4.1 km',
    status: 'pending',
    latitude: 19.1136,
    longitude: 72.8697
  },
  {
    id: '3',
    name: 'Anita Patel',
    address: 'Powai, Mumbai 400076',
    phone: '+91 98765 43212',
    priority: 'High',
    purpose: 'Credit Card Application',
    estimatedDuration: 20,
    eta: '12:00 PM',
    distance: '6.8 km',
    status: 'pending',
    latitude: 19.1197,
    longitude: 72.9060
  },
  {
    id: '4',
    name: 'Vikram Singh',
    address: 'Worli, Mumbai 400018',
    phone: '+91 98765 43213',
    priority: 'Medium',
    purpose: 'Portfolio Review',
    estimatedDuration: 60,
    eta: '2:30 PM',
    distance: '8.2 km',
    status: 'pending',
    latitude: 19.0176,
    longitude: 72.8133
  },
  {
    id: '5',
    name: 'Sunita Devi',
    address: 'Kurla West, Mumbai 400070',
    phone: '+91 98765 43214',
    priority: 'Low',
    purpose: 'Account Opening',
    estimatedDuration: 25,
    eta: '4:00 PM',
    distance: '5.5 km',
    status: 'pending',
    latitude: 19.0728,
    longitude: 72.8826
  }
];
