
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
          {/* Proper India Map */}
          <div className="relative w-full max-w-sm h-96">
            <svg viewBox="0 0 300 400" className="w-full h-full">
              {/* India Outline with Regional Divisions */}
              
              {/* North Region */}
              <path
                d="M80 50 L220 50 L230 80 L250 100 L240 120 L220 110 L200 120 L180 110 L160 115 L140 105 L120 110 L100 100 L85 85 Z"
                fill="#f8f9fa"
                stroke="#6b7280"
                strokeWidth="1.5"
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
              
              {/* West Region */}
              <path
                d="M60 120 L100 100 L120 110 L140 105 L130 140 L125 180 L115 220 L105 250 L95 280 L85 300 L75 280 L70 250 L65 220 L60 180 L55 150 Z"
                fill="#ced4da"
                stroke="#6b7280"
                strokeWidth="1.5"
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
              
              {/* Central Region */}
              <path
                d="M140 105 L160 115 L180 110 L200 120 L190 140 L185 160 L180 180 L175 200 L170 220 L160 240 L150 220 L140 200 L135 180 L130 160 L125 140 Z"
                fill="#adb5bd"
                stroke="#6b7280"
                strokeWidth="1.5"
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
              
              {/* East Region */}
              <path
                d="M200 120 L240 120 L250 100 L260 120 L270 140 L275 160 L280 180 L275 200 L270 220 L260 240 L250 220 L240 200 L230 180 L220 160 L210 140 L200 120 Z"
                fill="#dee2e6"
                stroke="#6b7280"
                strokeWidth="1.5"
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
              
              {/* South Region */}
              <path
                d="M105 250 L115 220 L125 180 L135 180 L140 200 L150 220 L160 240 L170 220 L175 200 L180 180 L185 160 L190 140 L200 120 L210 140 L220 160 L230 180 L240 200 L250 220 L260 240 L270 220 L275 200 L280 180 L285 200 L290 220 L285 240 L280 260 L270 280 L255 300 L240 315 L220 325 L200 330 L180 335 L160 330 L140 325 L120 315 L105 300 L95 280 Z"
                fill="#e9ecef"
                stroke="#6b7280"
                strokeWidth="1.5"
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
              
              {/* Region Labels */}
              <text x="150" y="85" textAnchor="middle" className="text-xs font-medium fill-gray-700">
                North
              </text>
              <text x="80" y="200" textAnchor="middle" className="text-xs font-medium fill-gray-700">
                West
              </text>
              <text x="150" y="175" textAnchor="middle" className="text-xs font-medium fill-gray-700">
                Central
              </text>
              <text x="240" y="175" textAnchor="middle" className="text-xs font-medium fill-gray-700">
                East
              </text>
              <text x="190" y="290" textAnchor="middle" className="text-xs font-medium fill-gray-700">
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
