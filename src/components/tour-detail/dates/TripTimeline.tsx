
import React from 'react';
import { format } from 'date-fns';

interface TimelineProps {
  startDate: Date;
  endDate: Date;
}

const TripTimeline: React.FC<TimelineProps> = ({ startDate, endDate }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold mb-3">Trip Itinerary</h3>
      <div className="relative pl-6 border-l-2 border-gray-300 space-y-6">
        <div className="relative">
          <div className="absolute -left-[25px] mt-1 w-4 h-4 bg-black rounded-full"></div>
          <div>
            <div className="font-bold">
              {format(startDate, 'd MMM').toUpperCase()} Trip Start – {format(startDate, 'EEEE')}, 18:00 (Local Time)
            </div>
            <div className="text-gray-600">Athens, Greece</div>
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute -left-[25px] mt-1 w-4 h-4 bg-black rounded-full"></div>
          <div>
            <div className="font-bold">
              {format(endDate, 'd MMM').toUpperCase()} Trip End – {format(endDate, 'EEEE')}, 12:00 (Local Time)
            </div>
            <div className="text-gray-600">Athens, Greece</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripTimeline;
