
import React from 'react';
import { format } from 'date-fns';

interface TimelineProps {
  startDate: Date;
  endDate: Date;
}

const TripTimeline: React.FC<TimelineProps> = ({ startDate, endDate }) => {
  const formatDay = (date: Date) => format(date, 'd');
  const formatMonth = (date: Date) => format(date, 'MMM').toUpperCase();
  const formatWeekday = (date: Date) => format(date, 'EEEE');
  const formatTime = (date: Date) => format(date, 'HH:mm');
  
  return (
    <div className="space-y-4 font-montserrat">
      <h3 className="text-lg font-bold text-black mb-4 uppercase tracking-wide">TRIP START</h3>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-3 top-6 bottom-6 w-0.5 bg-gray-300"></div>
        
        {/* Start point */}
        <div className="relative flex items-start gap-4 mb-10">
          <div className="rounded-full border-2 border-white bg-white w-6 h-6 z-10 flex items-center justify-center shadow-sm">
            <div className="w-3 h-3 bg-black rounded-full"></div>
          </div>
          <div className="flex-1">
            <div className="text-4xl font-bold text-black">
              {formatDay(startDate)}
            </div>
            <div className="uppercase text-sm font-bold text-black tracking-wide">{formatMonth(startDate)}</div>
            <div className="text-gray-600 font-medium">
              {formatWeekday(startDate)}, {formatTime(startDate)} (Local Time)<br />
              Athens, Greece
            </div>
          </div>
        </div>
        
        {/* TRIP END point */}
        <h3 className="text-lg font-bold text-black mb-4 uppercase tracking-wide">TRIP END</h3>
        <div className="relative flex items-start gap-4">
          <div className="rounded-full border-2 border-white bg-white w-6 h-6 z-10 flex items-center justify-center shadow-sm">
            <div className="w-3 h-3 bg-black rounded-full"></div>
          </div>
          <div className="flex-1">
            <div className="text-4xl font-bold text-black">
              {formatDay(endDate)}
            </div>
            <div className="uppercase text-sm font-bold text-black tracking-wide">{formatMonth(endDate)}</div>
            <div className="text-gray-600 font-medium">
              {formatWeekday(endDate)}, {formatTime(endDate)} (Local Time)<br />
              Athens, Greece
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripTimeline;
