
import React, { useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useConsent } from '@/context/ConsentManager';
import { maskName, maskAge } from '@/utils/DataMasking';
import { Button } from '@/components/ui/button';

export interface Traveler {
  id: string;
  name: string;
  age: number;
  country: string;
  occupation: string;
  seatId: string;
  hasAvatar?: boolean;
}

interface TravelersInfoProps {
  travelers: Traveler[];
}

const TravelersInfo: React.FC<TravelersInfoProps> = ({ travelers }) => {
  const { hasConsented, toggleConsent } = useConsent();
  const [showAll, setShowAll] = useState(false);
  
  const displayedTravelers = showAll ? travelers : travelers.slice(0, 5);
  
  if (!travelers || travelers.length === 0) {
    return (
      <div className="p-4 bg-gray-50 rounded-md">
        <p className="text-gray-500 text-center">No travelers have booked this trip yet.</p>
      </div>
    );
  }

  return (
    <div className="mt-2">
      <div className="mb-6 space-y-6">
        {displayedTravelers.map(traveler => (
          <div key={traveler.id} className="flex items-start">
            <Avatar className="h-10 w-10 mr-4 bg-gray-100">
              <AvatarFallback className="bg-gray-200 text-gray-600">
                {hasConsented && traveler.hasAvatar ? traveler.name.charAt(0) : traveler.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">
                    {hasConsented ? traveler.name : maskName(traveler.name)}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {hasConsented ? `${traveler.age} years` : maskAge(traveler.age)} • {traveler.country}
                  </p>
                  <p className="text-sm text-gray-600">{traveler.occupation}</p>
                </div>
                
                <div className="ml-4">
                  <div className="bg-black text-white text-xs py-1 px-2 rounded font-medium">
                    Seat {traveler.seatId}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Privacy consent toggle */}
      <div className="mb-4 flex items-center">
        <label htmlFor="privacy-toggle" className="text-sm text-gray-600 mr-2">
          {hasConsented ? "Showing full details" : "Show anonymized data for privacy"}
        </label>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={toggleConsent}
          className="text-xs h-8"
        >
          {hasConsented ? "Anonymize data" : "Show full details"}
        </Button>
      </div>
      
      {/* View all button */}
      {travelers.length > 5 && !showAll && (
        <div className="text-center">
          <Button
            variant="link"
            onClick={() => setShowAll(true)}
            className="text-orange-500 hover:text-orange-600"
          >
            View all travelers
          </Button>
        </div>
      )}
    </div>
  );
};

export default TravelersInfo;
