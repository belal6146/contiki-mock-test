
import React from 'react';
import { Trip } from '@/types/trip';
import { CalendarDays, Bed, Utensils, Users, MapPin } from 'lucide-react';

interface TourDetailsGridProps {
  trip: Trip;
}

const TourDetailsGrid: React.FC<TourDetailsGridProps> = ({ trip }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="grid grid-cols-1 gap-6">
        {/* Days */}
        <div className="flex items-center gap-3">
          <CalendarDays className="w-5 h-5 text-gray-600" />
          <div>
            <div className="text-sm text-gray-600">Days</div>
            <div className="font-semibold text-black">{trip.duration} days, 2 countries</div>
          </div>
        </div>
        
        {/* Accommodation */}
        <div className="flex items-center gap-3">
          <Bed className="w-5 h-5 text-gray-600" />
          <div>
            <div className="text-sm text-gray-600">Accommodation</div>
            <div className="font-semibold text-black">9 nights in Hotels, 2 nights in Special Stay</div>
          </div>
        </div>
        
        {/* Meals */}
        <div className="flex items-center gap-3">
          <Utensils className="w-5 h-5 text-gray-600" />
          <div>
            <div className="text-sm text-gray-600">Meals</div>
            <div className="font-semibold text-black">10 Breakfasts, 3 Dinners</div>
          </div>
        </div>
        
        {/* Transport */}
        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-gray-600" />
          <div>
            <div className="text-sm text-gray-600">Transport</div>
            <div className="font-semibold text-black">Ferry</div>
          </div>
        </div>
        
        {/* Group Size */}
        <div className="flex items-center gap-3">
          <Users className="w-5 h-5 text-gray-600" />
          <div>
            <div className="text-sm text-gray-600">Group Size</div>
            <div className="font-semibold text-black">Average 35 people</div>
          </div>
        </div>
        
        {/* Team */}
        <div className="flex items-center gap-3">
          <Users className="w-5 h-5 text-gray-600" />
          <div>
            <div className="text-sm text-gray-600">Team</div>
            <div className="font-semibold text-black">Expert Trip Manager, Local Guides</div>
          </div>
        </div>
      </div>
      
      {/* Change View Button */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <button className="flex items-center justify-center gap-2 w-full text-black font-semibold text-sm">
          <span>Change view</span>
          <span className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-xs">⊞</span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default TourDetailsGrid;
