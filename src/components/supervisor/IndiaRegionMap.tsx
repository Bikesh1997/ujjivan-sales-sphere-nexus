
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const IndiaRegionMap = () => {
  const regionData = [
    { region: 'North', value: '₹18.5L', color: '#f8f9fa' },
    { region: 'South', value: '₹15.2L', color: '#e9ecef' },
    { region: 'East', value: '₹8.7L', color: '#dee2e6' },
    { region: 'West', value: '₹12.1L', color: '#ced4da' },
    { region: 'Central', value: '₹6.3L', color: '#adb5bd' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Regional Sales Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          {/* Simplified India Map */}
          <div className="relative w-full max-w-xs h-80">
            <svg viewBox="0 0 200 280" className="w-full h-full">
              {/* North Region */}
              <path
                d="M40 20 L160 20 L160 80 L40 80 Z"
                fill="#f8f9fa"
                stroke="#6b7280"
                strokeWidth="1"
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
              
              {/* West Region */}
              <path
                d="M20 80 L80 80 L80 180 L20 180 Z"
                fill="#ced4da"
                stroke="#6b7280"
                strokeWidth="1"
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
              
              {/* Central Region */}
              <path
                d="M80 80 L140 80 L140 140 L80 140 Z"
                fill="#adb5bd"
                stroke="#6b7280"
                strokeWidth="1"
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
              
              {/* East Region */}
              <path
                d="M140 80 L180 80 L180 160 L140 160 Z"
                fill="#dee2e6"
                stroke="#6b7280"
                strokeWidth="1"
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
              
              {/* South Region */}
              <path
                d="M40 180 L160 180 L140 260 L60 260 Z"
                fill="#e9ecef"
                stroke="#6b7280"
                strokeWidth="1"
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
              
              {/* Region Labels */}
              <text x="100" y="55" textAnchor="middle" className="text-xs font-medium fill-gray-700">
                North
              </text>
              <text x="50" y="135" textAnchor="middle" className="text-xs font-medium fill-gray-700">
                West
              </text>
              <text x="110" y="115" textAnchor="middle" className="text-xs font-medium fill-gray-700">
                Central
              </text>
              <text x="160" y="125" textAnchor="middle" className="text-xs font-medium fill-gray-700">
                East
              </text>
              <text x="100" y="225" textAnchor="middle" className="text-xs font-medium fill-gray-700">
                South
              </text>
            </svg>
          </div>
          
          {/* Sales Figures */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
            {regionData.map((region) => (
              <div key={region.region} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full border border-gray-300"
                    style={{ backgroundColor: region.color }}
                  />
                  <span className="text-sm font-medium text-gray-700">{region.region}</span>
                </div>
                <span className="text-sm font-bold text-gray-900">{region.value}</span>
              </div>
            ))}
          </div>
          
          {/* Total */}
          <div className="w-full max-w-sm p-3 bg-teal-50 rounded-lg border border-teal-200">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-teal-800">Total Sales</span>
              <span className="text-lg font-bold text-teal-900">₹60.8L</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IndiaRegionMap;
