
import React, { useEffect } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { ChevronDown } from 'lucide-react';
import { DayDetails } from '@/types/trip';

interface DailyAccordionProps {
  days: DayDetails[];
}

const DailyAccordion: React.FC<DailyAccordionProps> = ({ days }) => {
  useEffect(() => {
    console.debug('[DailyAccordion] mounted', { daysCount: days.length });
  }, [days.length]);

  const handleToggle = (isOpen: boolean, day: number) => {
    console.debug('[DailyAccordion] toggled', { day, open: isOpen });
  };

  return (
    <div className="container mb-16">
      <h3 className="heading-sm mb-8">Daily Itinerary</h3>
      <Accordion type="multiple" className="space-y-4">
        {days.map((day) => (
          <AccordionItem 
            key={day.day} 
            value={`day-${day.day}`}
            className="border-b border-gray-200 data-[state=open]:bg-[#F1F6F9] rounded-md overflow-hidden"
          >
            <AccordionTrigger 
              className="py-4 px-4 w-full text-left flex items-center justify-between hover:no-underline"
              onClick={() => handleToggle(true, day.day)}
            >
              <div className="flex items-center">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-accent text-accent-foreground rounded-full text-sm font-medium mr-4">
                  {day.day}
                </span>
                <div>
                  <div className="font-bold">{day.title}</div>
                </div>
              </div>
              <ChevronDown className="h-5 w-5 transition-transform duration-300" />
            </AccordionTrigger>
            
            <AccordionContent className="transition-all duration-300 ease-in-out">
              <div className="px-16 pb-6 pt-2">
                <p className="text-gray-700 mb-4">{day.description}</p>
                
                <div className="flex flex-wrap gap-4">
                  <div className="bg-bgLight rounded-md px-4 py-2 text-sm">
                    <span className="font-medium">Meals:</span> {day.meals.join(', ') || 'Not included'}
                  </div>
                  <div className="bg-bgLight rounded-md px-4 py-2 text-sm">
                    <span className="font-medium">Stay:</span> {day.accommodation}
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default DailyAccordion;
