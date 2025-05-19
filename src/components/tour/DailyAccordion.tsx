
import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface DayDetails {
  day: number;
  title: string;
  description: string;
  meals: string[];
  accommodation: string;
}

interface DailyAccordionProps {
  days: DayDetails[];
}

const DailyAccordion: React.FC<DailyAccordionProps> = ({ days }) => {
  const [openDays, setOpenDays] = useState<number[]>([]);
  
  useEffect(() => {
    console.debug('[DailyAccordion] mounted', { daysCount: days.length });
  }, [days.length]);
  
  const toggleDay = (dayNumber: number) => {
    setOpenDays(prev => {
      const isOpen = prev.includes(dayNumber);
      const newOpenDays = isOpen 
        ? prev.filter(day => day !== dayNumber)
        : [...prev, dayNumber];
        
      console.debug('[DailyAccordion] toggled', { 
        day: dayNumber, 
        open: !isOpen 
      });
      
      return newOpenDays;
    });
  };
  
  return (
    <div className="container mb-12">
      <div className="space-y-4">
        {days.map(day => {
          const isOpen = openDays.includes(day.day);
          
          return (
            <div key={day.day} className="border-b border-gray-200">
              <button
                className="w-full py-4 px-4 text-left flex items-center justify-between focus:outline-none"
                onClick={() => toggleDay(day.day)}
                aria-expanded={isOpen}
              >
                <div className="flex items-center">
                  <span className="inline-block w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center text-sm font-medium mr-4">
                    {day.day}
                  </span>
                  <div>
                    <div className="font-bold">{day.title}</div>
                  </div>
                </div>
                <ChevronDown 
                  className={`h-5 w-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} 
                />
              </button>
              
              {isOpen && (
                <div className="px-16 pb-6 pt-2">
                  <p className="text-gray-700 mb-4">{day.description}</p>
                  
                  <div className="flex flex-wrap gap-4">
                    <div className="bg-bgLight rounded-md px-3 py-2 text-sm">
                      <span className="font-medium">Meals:</span> {day.meals.join(', ') || 'Not included'}
                    </div>
                    <div className="bg-bgLight rounded-md px-3 py-2 text-sm">
                      <span className="font-medium">Stay:</span> {day.accommodation}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DailyAccordion;
