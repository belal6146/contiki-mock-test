import React from 'react';
import { Umbrella, Sun, ThermometerSun, Cloud, Check, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PackingGuideProps {
  destination: string;
  weatherInfo?: {
    spring: { high: number; low: number; description: string };
    summer: { high: number; low: number; description: string };
    fall: { high: number; low: number; description: string };
    winter: { high: number; low: number; description: string };
  };
}

const PackingGuide: React.FC<PackingGuideProps> = ({
  destination = 'Greek Islands',
  weatherInfo = {
    spring: { high: 22, low: 14, description: 'Mild and pleasant with occasional rain' },
    summer: { high: 32, low: 22, description: 'Hot and dry with clear skies' },
    fall: { high: 25, low: 16, description: 'Warm and mostly sunny' },
    winter: { high: 14, low: 8, description: 'Mild but can be cool and rainy' }
  }
}) => {
  // Essential packing items
  const essentials = [
    'Passport and travel documents',
    'Credit/debit cards and cash (Euros)',
    'Phone and charger',
    'Adapters (Type C and F)',
    'Medications'
  ];
  
  const clothing = [
    'Lightweight, breathable clothing',
    'Swimwear (2-3 sets)',
    'Light jacket or sweater for evenings',
    'Comfortable walking shoes',
    'Sandals or flip-flops',
    'Hat and sunglasses'
  ];
  
  const other = [
    'Sunscreen (SPF 30+ recommended)',
    'Insect repellent',
    'Daypack for excursions',
    'Water bottle',
    'Travel towel',
    'Camera'
  ];

  return (
    <section className="py-12 bg-white border-t border-gray-200">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">Packing Guide & Weather</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Weather Information */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold mb-4">Weather in {destination}</h3>
                <p className="text-gray-600 text-sm mb-6">
                  The Greek Islands enjoy a Mediterranean climate with hot, dry summers and mild winters. 
                  Weather can vary between islands, so check specific conditions before your trip.
                </p>
                
                <Button className="w-full bg-[#CCFF00] hover:bg-[#CCFF00]/90 text-black flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  <span>Download Weather Guide</span>
                </Button>
              </div>
              
              <div className="divide-y divide-gray-200">
                <div className="p-4 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-yellow-100 p-2 rounded-full">
                      <Sun className="w-5 h-5 text-yellow-600" />
                    </div>
                    <h4 className="font-bold">Summer (Jun-Aug)</h4>
                  </div>
                  
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 text-sm">Temperature</span>
                    <span className="font-medium">
                      {weatherInfo.summer.low}°C - {weatherInfo.summer.high}°C
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600">
                    {weatherInfo.summer.description}
                  </p>
                </div>
                
                <div className="p-4 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-orange-100 p-2 rounded-full">
                      <ThermometerSun className="w-5 h-5 text-orange-600" />
                    </div>
                    <h4 className="font-bold">Fall (Sep-Nov)</h4>
                  </div>
                  
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 text-sm">Temperature</span>
                    <span className="font-medium">
                      {weatherInfo.fall.low}°C - {weatherInfo.fall.high}°C
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600">
                    {weatherInfo.fall.description}
                  </p>
                </div>
                
                <div className="p-4 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Cloud className="w-5 h-5 text-blue-600" />
                    </div>
                    <h4 className="font-bold">Winter (Dec-Feb)</h4>
                  </div>
                  
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 text-sm">Temperature</span>
                    <span className="font-medium">
                      {weatherInfo.winter.low}°C - {weatherInfo.winter.high}°C
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600">
                    {weatherInfo.winter.description}
                  </p>
                </div>
                
                <div className="p-4 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Umbrella className="w-5 h-5 text-green-600" />
                    </div>
                    <h4 className="font-bold">Spring (Mar-May)</h4>
                  </div>
                  
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 text-sm">Temperature</span>
                    <span className="font-medium">
                      {weatherInfo.spring.low}°C - {weatherInfo.spring.high}°C
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600">
                    {weatherInfo.spring.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Packing List */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-6">Packing Checklist</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Essential Documents */}
                <div>
                  <h4 className="font-bold mb-4 text-[#FF6900]">Essentials</h4>
                  <ul className="space-y-3">
                    {essentials.map((item, index) => (
                      <li key={`essential-${index}`} className="flex items-start gap-2">
                        <div className="bg-[#CCFF00] rounded-full p-0.5 mt-1 flex-shrink-0">
                          <Check className="w-3 h-3 text-black" />
                        </div>
                        <span className="text-sm text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Clothing */}
                <div>
                  <h4 className="font-bold mb-4 text-[#FF6900]">Clothing</h4>
                  <ul className="space-y-3">
                    {clothing.map((item, index) => (
                      <li key={`clothing-${index}`} className="flex items-start gap-2">
                        <div className="bg-[#CCFF00] rounded-full p-0.5 mt-1 flex-shrink-0">
                          <Check className="w-3 h-3 text-black" />
                        </div>
                        <span className="text-sm text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Other Items */}
                <div>
                  <h4 className="font-bold mb-4 text-[#FF6900]">Other Items</h4>
                  <ul className="space-y-3">
                    {other.map((item, index) => (
                      <li key={`other-${index}`} className="flex items-start gap-2">
                        <div className="bg-[#CCFF00] rounded-full p-0.5 mt-1 flex-shrink-0">
                          <Check className="w-3 h-3 text-black" />
                        </div>
                        <span className="text-sm text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Pro Tips</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Pack light! Most accommodations provide towels and basic toiletries.</li>
                  <li>• Consider bringing a small waterproof bag for beach days.</li>
                  <li>• A lightweight scarf is versatile for sun protection, chilly evenings, or visiting churches.</li>
                  <li>• Leave room in your luggage for souvenirs!</li>
                </ul>
              </div>
              
              <div className="mt-6 flex justify-center">
                <Button className="bg-[#CCFF00] hover:bg-[#CCFF00]/90 text-black flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  <span>Download Complete Packing List</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackingGuide;
