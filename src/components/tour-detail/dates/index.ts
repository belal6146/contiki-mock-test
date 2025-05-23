
export { default as MonthFilter } from './MonthFilter';
export { default as TripTypeFilter } from './TripTypeFilter';
export { default as DepartureOption } from './DepartureOption';

// Constants
export const MONTHS = [
  { id: 'JAN', label: 'JAN' },
  { id: 'FEB', label: 'FEB' },
  { id: 'MAR', label: 'MAR' },
  { id: 'APR', label: 'APR' },
  { id: 'MAY', label: 'MAY' },
  { id: 'JUN', label: 'JUN' },
  { id: 'JUL', label: 'JUL' },
  { id: 'AUG', label: 'AUG' },
  { id: 'SEP', label: 'SEP' },
  { id: 'OCT', label: 'OCT' },
  { id: 'NOV', label: 'NOV' },
  { id: 'DEC', label: 'DEC' },
];

export const TRIP_TYPES = [
  { id: 'plus', label: 'Plus', color: '#CCFF00' },
  { id: 'standard', label: 'Standard', color: '#FFFF00' },
  { id: 'pride', label: 'Pride', color: '#FF00FF' },
  { id: 'gap', label: 'Gap 18-22', color: '#6B46C1' },
  { id: 'chill', label: 'Chill', color: '#FFA500' },
];

// Helper functions
export const getTripTypeLabel = (typeId: string): string => {
  const type = TRIP_TYPES.find(t => t.id === typeId);
  return type ? type.label : typeId;
};

// Generate mock departure options for a trip
export const generateDepartureOptions = (trip: any) => {
  const startDate = new Date(2025, 4, 23); // May 23, 2025
  
  const options = [
    {
      id: 'dep-1',
      startDate: '2025-05-23',
      endDate: '2025-06-02',
      dayOfWeek: 'Friday',
      day: 23,
      month: 'May',
      year: 2025,
      price: 1751,
      oldPrice: 2334,
      discount: 25,
      availability: 'available' as const,
      variants: [
        {
          id: 'var-1',
          name: 'Plus + 1 other',
          price: 1751,
          availability: 'available' as const,
        }
      ],
      type: 'plus',
    },
    {
      id: 'dep-2',
      startDate: '2025-05-25',
      endDate: '2025-06-04',
      dayOfWeek: 'Sunday',
      day: 25,
      month: 'May',
      year: 2025,
      price: 1751,
      oldPrice: 2334, 
      discount: 25,
      availability: 'limited' as const,
      variants: [
        {
          id: 'var-2',
          name: 'Plus + 1 other',
          price: 1751,
          availability: 'limited' as const,
        }
      ],
      type: 'plus',
    },
    {
      id: 'dep-3',
      startDate: '2025-05-27',
      endDate: '2025-06-06',
      dayOfWeek: 'Tuesday',
      day: 27,
      month: 'May',
      year: 2025,
      price: 2218,
      oldPrice: 2334,
      discount: 5,
      availability: 'available' as const,
      variants: [
        {
          id: 'var-3-1',
          name: 'Plus',
          price: 2218,
          availability: 'available' as const,
        },
        {
          id: 'var-3-2',
          name: 'Pride',
          price: 2318,
          availability: 'limited' as const,
        }
      ],
      type: 'plus',
    },
  ];
  
  return options;
};
