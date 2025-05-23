
import React from 'react';
import { format } from 'date-fns';

interface TimelineProps {
  startDate: Date;
  endDate: Date;
}

const TripTimeline: React.FC<TimelineProps> = ({ startDate, endDate }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-black mb-4">THE START</h3>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-3 top-6 bottom-6 w-0.5 bg-gray-300"></div>
        
        {/* Start point */}
        <div className="relative flex items-start gap-4 mb-6">
          <div className="relative z-10 w-6 h-6 bg-black rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <div className="flex-1 pt-1">
            <div className="font-bold text-black mb-1">
              {format(startDate, 'd MMM').toUpperCase()} Trip Start – {format(startDate, 'EEEE')}, 18:00 (Local Time)
            </div>
            <div className="text-gray-600">Athens, Greece</div>
          </div>
        </div>
        
        {/* End point */}
        <div className="relative flex items-start gap-4">
          <div className="relative z-10 w-6 h-6 bg-black rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <div className="flex-1 pt-1">
            <div className="font-bold text-black mb-1">
              {format(endDate, 'd MMM').toUpperCase()} Trip End – {format(endDate, 'EEEE')}, 12:00 (Local Time)
            </div>
            <div className="text-gray-600">Athens, Greece</div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start gap-2">
          <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-xs font-bold text-black">!</span>
          </div>
          <div>
            <div className="font-semibold text-black mb-1">Further Information</div>
            <div className="text-sm text-gray-700">
              This trip ends in Athens, our Greece sightseeing tour from April 2nd. On the trip
              will end in Athens at 12pm.
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-xs text-gray-500 mt-4">
        All pick-up and start dates/exact start times and locations.
      </div>
    </div>
  );
};

export default TripTimeline;
