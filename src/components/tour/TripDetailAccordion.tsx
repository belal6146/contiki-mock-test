
import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Users, Bus } from 'lucide-react';
import TravelersInfo, { Traveler } from './TravelersInfo';
import BusSeatMap from './BusSeatMap';
import { Seat } from './SeatGrid';
import { ConsentManagerProvider } from '@/context/ConsentManager';

// Mock data for travelers
const mockTravelers: Traveler[] = [
  {
    id: '1',
    name: 'Emma Wilson',
    age: 24,
    country: 'Australia',
    occupation: 'Marketing Manager',
    seatId: '1A',
    hasAvatar: true
  },
  {
    id: '2',
    name: 'James Smith',
    age: 26,
    country: 'USA',
    occupation: 'Software Developer',
    seatId: '2A',
    hasAvatar: false
  },
  {
    id: '3',
    name: 'Sophie Brown',
    age: 23,
    country: 'UK',
    occupation: 'Student',
    seatId: '3A',
    hasAvatar: true
  },
  {
    id: '4',
    name: 'Michael Johnson',
    age: 29,
    country: 'Canada',
    occupation: 'Photographer',
    seatId: '4B',
    hasAvatar: true
  },
  {
    id: '5',
    name: 'Jessica Lee',
    age: 25,
    country: 'New Zealand',
    occupation: 'Teacher',
    seatId: '5A',
    hasAvatar: false
  },
  {
    id: '6',
    name: 'Daniel Thompson',
    age: 31,
    country: 'Ireland',
    occupation: 'Doctor',
    seatId: '7B',
    hasAvatar: true
  },
  {
    id: '7',
    name: 'Olivia Garcia',
    age: 27,
    country: 'Spain',
    occupation: 'Architect',
    seatId: '8A',
    hasAvatar: true
  },
  {
    id: '8',
    name: 'Thomas Wright',
    age: 28,
    country: 'Germany',
    occupation: 'Engineer',
    seatId: '21B',
    hasAvatar: false
  },
  {
    id: '9',
    name: 'Emily Chen',
    age: 26,
    country: 'Singapore',
    occupation: 'Financial Analyst',
    seatId: '23A',
    hasAvatar: true
  },
  {
    id: '10',
    name: 'Jack Murphy',
    age: 24,
    country: 'Ireland',
    occupation: 'Chef',
    seatId: '26A',
    hasAvatar: false
  }
];

// Mock data for upper deck seats
const mockUpperDeckSeats: Seat[] = [
  { id: '21A', status: 'available' },
  { id: '21B', status: 'occupied_male', traveler: { id: '8', name: 'Thomas Wright' } },
  { id: '22A', status: 'available' },
  { id: '22B', status: 'available' },
  { id: '23A', status: 'occupied_female', traveler: { id: '9', name: 'Emily Chen' } },
  { id: '23B', status: 'available' },
  { id: '24A', status: 'available' },
  { id: '24B', status: 'available' },
  { id: '25A', status: 'occupied_male' },
  { id: '25B', status: 'available' },
  { id: '26A', status: 'occupied_male', traveler: { id: '10', name: 'Jack Murphy' } },
  { id: '26B', status: 'available' },
  { id: '27A', status: 'available' },
  { id: '27B', status: 'available' },
  { id: '28A', status: 'available' },
  { id: '28B', status: 'available' }
];

// Mock data for lower deck seats
const mockLowerDeckSeats: Seat[] = [
  { id: '1A', status: 'occupied_female', traveler: { id: '1', name: 'Emma Wilson' } },
  { id: '1B', status: 'available' },
  { id: '2A', status: 'occupied_male', traveler: { id: '2', name: 'James Smith' } },
  { id: '2B', status: 'available' },
  { id: '3A', status: 'occupied_female', traveler: { id: '3', name: 'Sophie Brown' } },
  { id: '3B', status: 'available' },
  { id: '4A', status: 'available' },
  { id: '4B', status: 'occupied_male', traveler: { id: '4', name: 'Michael Johnson' } },
  { id: '5A', status: 'occupied_female', traveler: { id: '5', name: 'Jessica Lee' } },
  { id: '5B', status: 'available' },
  { id: '6A', status: 'available' },
  { id: '6B', status: 'available' },
  { id: '7A', status: 'available' },
  { id: '7B', status: 'occupied_male', traveler: { id: '6', name: 'Daniel Thompson' } },
  { id: '8A', status: 'occupied_female', traveler: { id: '7', name: 'Olivia Garcia' } },
  { id: '8B', status: 'available' },
  { id: '9A', status: 'available' },
  { id: '9B', status: 'available' },
  { id: '10A', status: 'available' },
  { id: '10B', status: 'available' }
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
              <TravelersInfo travelers={mockTravelers} />
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
              <BusSeatMap 
                upperDeckSeats={mockUpperDeckSeats}
                lowerDeckSeats={mockLowerDeckSeats}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </ConsentManagerProvider>
  );
};

export default TripDetailAccordion;
