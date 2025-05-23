
import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Users, Bus } from 'lucide-react';
import TravelersInfo, { BookingPassenger } from './TravelersInfo';
import BusSeatMap from './BusSeatMap';
import { ConsentManagerProvider } from '@/context/ConsentManager';

// Mock data for travelers using the correct BookingPassenger interface
const mockTravelers: BookingPassenger[] = [
  {
    id: 1,
    firstName: 'Emma',
    lastName: 'Wilson',
    age: 24,
    gender: 'Female',
    address: { country: 'Australia' },
    travelPassion: 'Photography',
    numberOfTimesTravelledPreviously: 3,
    passengerId: 1
  },
  {
    id: 2,
    firstName: 'James',
    lastName: 'Smith',
    age: 26,
    gender: 'Male',
    address: { country: 'USA' },
    travelPassion: 'Adventure sports',
    numberOfTimesTravelledPreviously: 5,
    passengerId: 2
  },
  {
    id: 3,
    firstName: 'Sophie',
    lastName: 'Brown',
    age: 23,
    gender: 'Female',
    address: { country: 'UK' },
    travelPassion: 'Cultural experiences',
    numberOfTimesTravelledPreviously: 2,
    passengerId: 3
  },
  {
    id: 4,
    firstName: 'Michael',
    lastName: 'Johnson',
    age: 29,
    gender: 'Male',
    address: { country: 'Canada' },
    travelPassion: 'History',
    numberOfTimesTravelledPreviously: 7,
    passengerId: 4
  },
  {
    id: 5,
    firstName: 'Jessica',
    lastName: 'Lee',
    age: 25,
    gender: 'Female',
    address: { country: 'New Zealand' },
    travelPassion: 'Nature and wildlife',
    numberOfTimesTravelledPreviously: 4,
    passengerId: 5
  },
  {
    id: 6,
    firstName: 'Daniel',
    lastName: 'Thompson',
    age: 31,
    gender: 'Male',
    address: { country: 'Ireland' },
    travelPassion: 'Food and wine',
    numberOfTimesTravelledPreviously: 6,
    passengerId: 6
  },
  {
    id: 7,
    firstName: 'Olivia',
    lastName: 'Garcia',
    age: 27,
    gender: 'Female',
    address: { country: 'Spain' },
    travelPassion: 'Architecture',
    numberOfTimesTravelledPreviously: 8,
    passengerId: 7
  },
  {
    id: 8,
    firstName: 'Thomas',
    lastName: 'Wright',
    age: 28,
    gender: 'Male',
    address: { country: 'Germany' },
    travelPassion: 'Technology',
    numberOfTimesTravelledPreviously: 3,
    passengerId: 8
  },
  {
    id: 9,
    firstName: 'Emily',
    lastName: 'Chen',
    age: 26,
    gender: 'Female',
    address: { country: 'Singapore' },
    travelPassion: 'Business networking',
    numberOfTimesTravelledPreviously: 9,
    passengerId: 9
  },
  {
    id: 10,
    firstName: 'Jack',
    lastName: 'Murphy',
    age: 24,
    gender: 'Male',
    address: { country: 'Ireland' },
    travelPassion: 'Culinary experiences',
    numberOfTimesTravelledPreviously: 2,
    passengerId: 10
  }
];

const TripDetailAccordion: React.FC = () => {
  return (
    <ConsentManagerProvider>
      <div className="mb-8">
        <Accordion type="single" collapsible className="w-full border rounded-md">
          {/* See Who's Travelling */}
          <AccordionItem value="travelers" className="border-b">
            <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
              <div className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-gray-500" />
                <span>See Who's Travelling</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <TravelersInfo passengers={mockTravelers} />
            </AccordionContent>
          </AccordionItem>
          
          {/* Bus Seating Plan */}
          <AccordionItem value="seating" className="border-b">
            <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
              <div className="flex items-center">
                <Bus className="mr-2 h-5 w-5 text-gray-500" />
                <span>Bus Seating Plan</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <BusSeatMap passengers={mockTravelers} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </ConsentManagerProvider>
  );
};

export default TripDetailAccordion;
