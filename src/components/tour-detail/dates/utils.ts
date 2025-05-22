
import { Trip } from '@/types/trip';
import { DepartureOptionData } from './DepartureOption';
import { addMonths } from 'date-fns';

export const MONTHS = [
  { code: 'JAN', active: false },
  { code: 'FEB', active: false },
  { code: 'MAR', active: false },
  { code: 'APR', active: false },
  { code: 'MAY', active: true },
  { code: 'JUN', active: true },
  { code: 'JUL', active: true },
  { code: 'AUG', active: true },
  { code: 'SEP', active: true },
  { code: 'OCT', active: false },
  { code: 'NOV', active: false },
  { code: 'DEC', active: false }
];

export const TRIP_TYPES = [
  { id: 'plus', label: 'Plus', variant: 'solid-light' as const },
  { id: 'standard', label: 'Standard', variant: 'outline' as const },
  { id: 'pride', label: 'Pride', variant: 'rainbow' as const },
  { id: 'gap', label: 'Gap 18-22', variant: 'solid-primary' as const },
  { id: 'chill', label: 'Chill', variant: 'outline' as const },
];

export const getTripTypeLabel = (typeId: string): string => {
  const type = TRIP_TYPES.find(t => t.id === typeId);
  return type?.label || typeId;
};

// Generate some sample data
export const generateDepartureOptions = (trip: Trip): DepartureOptionData[] => {
  if (!trip.variations || trip.variations.length === 0) {
    const today = new Date();
    
    // Create sample variation if none exists
    return [
      {
        id: 'opt1',
        startDate: addMonths(today, 1),
        endDate: addMonths(today, 1.3),
        types: ['plus', 'standard'],
        basePrice: 1868,
        discount: 467,
        dealLabel: 'Last minute deal',
        variants: [
          { id: 'plus', name: 'PLUS', price: 1868 },
          { id: 'standard', name: 'STANDARD', price: 1401 }
        ]
      },
      {
        id: 'opt2',
        startDate: addMonths(today, 2),
        endDate: addMonths(today, 2.3),
        types: ['plus', 'pride'],
        basePrice: 1920,
        discount: 350,
        dealLabel: 'Early bird offer',
        variants: [
          { id: 'plus', name: 'PLUS', price: 1920 },
          { id: 'pride', name: 'PRIDE', price: 1570 }
        ]
      },
      {
        id: 'opt3',
        startDate: addMonths(today, 3),
        endDate: addMonths(today, 3.3),
        types: ['standard', 'chill'],
        basePrice: 1750,
        discount: 250,
        dealLabel: 'Summer special',
        variants: [
          { id: 'standard', name: 'STANDARD', price: 1750 },
          { id: 'chill', name: 'CHILL', price: 1500 }
        ]
      }
    ];
  }
  
  // Map from actual trip variations if available
  return trip.variations.map((v, idx) => ({
    id: v.id || `opt${idx}`,
    startDate: new Date(v.startDate),
    endDate: new Date(v.endDate),
    types: ['plus', idx % 2 === 0 ? 'standard' : 'pride'],
    basePrice: v.price,
    discount: Math.round(v.price * 0.15),
    dealLabel: idx % 2 === 0 ? 'Last minute deal' : 'Early bird offer',
    variants: [
      { id: 'plus', name: 'PLUS', price: v.price },
      { id: 'standard', name: 'STANDARD', price: v.price - Math.round(v.price * 0.15) }
    ]
  }));
};
