
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
          {/* Accurate India Map */}
          <div className="relative w-full max-w-sm h-96">
            <svg viewBox="0 0 400 500" className="w-full h-full">
              {/* India Outline with Regional Divisions */}
              
              {/* North Region - Kashmir, Punjab, Haryana, UP, Uttarakhand, HP, Delhi, Rajasthan (northern part) */}
              <path
                d="M120 30 L140 25 L160 20 L180 25 L200 30 L220 35 L240 40 L260 45 L275 55 L285 70 L290 85 L285 100 L275 110 L260 115 L240 120 L220 125 L200 130 L180 135 L160 140 L150 145 L140 150 L130 155 L120 160 L110 150 L105 140 L100 125 L95 110 L90 95 L85 80 L90 65 L100 50 L110 40 Z"
                fill="#f8f9fa"
                stroke="#6b7280"
                strokeWidth="1.5"
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
              
              {/* West Region - Gujarat, Maharashtra, Goa, Rajasthan (southern part) */}
              <path
                d="M85 80 L90 95 L95 110 L100 125 L105 140 L110 150 L120 160 L115 175 L110 190 L105 205 L100 220 L95 235 L90 250 L85 265 L80 280 L75 295 L70 310 L65 295 L60 280 L55 265 L50 250 L45 235 L40 220 L35 205 L40 190 L45 175 L50 160 L55 145 L60 130 L65 115 L70 100 L75 85 Z"
                fill="#ced4da"
                stroke="#6b7280"
                strokeWidth="1.5"
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
              
              {/* Central Region - MP, Chhattisgarh, Jharkhand (western part) */}
              <path
                d="M120 160 L130 155 L140 150 L150 145 L160 140 L170 145 L180 150 L190 155 L200 160 L210 165 L220 170 L230 175 L235 190 L230 205 L225 220 L220 235 L215 250 L210 265 L200 270 L190 275 L180 280 L170 275 L160 270 L150 265 L140 260 L130 255 L120 250 L115 235 L110 220 L115 205 L120 190 L125 175 Z"
                fill="#adb5bd"
                stroke="#6b7280"
                strokeWidth="1.5"
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
              
              {/* East Region - West Bengal, Bihar, Odisha, Jharkhand (eastern part), Seven Sisters */}
              <path
                d="M230 175 L240 170 L250 165 L270 160 L290 155 L310 150 L330 155 L340 170 L345 185 L350 200 L355 215 L360 230 L355 245 L350 260 L345 275 L340 290 L330 295 L320 290 L310 285 L300 280 L290 275 L280 270 L270 265 L260 260 L250 255 L240 250 L235 235 L235 220 L235 205 L235 190 Z"
                fill="#dee2e6"
                stroke="#6b7280"
                strokeWidth="1.5"
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
              
              {/* South Region - Andhra Pradesh, Telangana, Karnataka, Kerala, Tamil Nadu */}
              <path
                d="M70 310 L75 295 L80 280 L85 265 L90 250 L95 235 L100 220 L105 205 L110 190 L115 175 L120 190 L125 205 L130 220 L135 235 L140 250 L145 265 L150 280 L155 295 L160 310 L165 325 L170 340 L175 355 L180 370 L185 385 L190 400 L195 415 L200 430 L195 440 L185 445 L175 450 L165 455 L155 460 L145 455 L135 450 L125 445 L115 440 L105 435 L95 430 L85 425 L75 420 L65 415 L55 410 L50 395 L55 380 L60 365 L65 350 L70 335 L70 320 Z"
                fill="#e9ecef"
                stroke="#6b7280"
                strokeWidth="1.5"
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
              
              {/* Sri Lanka (small island) */}
              <circle cx="170" cy="480" r="8" fill="#f0f0f0" stroke="#6b7280" strokeWidth="1"/>
              
              {/* Region Labels */}
              <text x="180" y="100" textAnchor="middle" className="text-xs font-medium fill-gray-700">
                North
              </text>
              <text x="65" y="220" textAnchor="middle" className="text-xs font-medium fill-gray-700">
                West
              </text>
              <text x="170" y="215" textAnchor="middle" className="text-xs font-medium fill-gray-700">
                Central
              </text>
              <text x="290" y="220" textAnchor="middle" className="text-xs font-medium fill-gray-700">
                East
              </text>
              <text x="140" y="370" textAnchor="middle" className="text-xs font-medium fill-gray-700">
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
