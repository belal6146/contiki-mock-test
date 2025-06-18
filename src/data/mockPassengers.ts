import { FellowTraveller } from '@/components/tour/FellowTravellerList';

// Generate a comprehensive list of mock passengers
export const generateMockPassengers = (): FellowTraveller[] => {
  const firstNames = [
    'John', 'Jane', 'Michael', 'Sarah', 'David', 'Emma', 'Chris', 'Lisa', 'James', 'Anna',
    'Robert', 'Maria', 'William', 'Jennifer', 'Richard', 'Amanda', 'Thomas', 'Jessica', 'Charles', 'Ashley',
    'Daniel', 'Melissa', 'Matthew', 'Michelle', 'Anthony', 'Kimberly', 'Mark', 'Amy', 'Donald', 'Laura',
    'Steven', 'Helen', 'Kevin', 'Donna', 'Brian', 'Carol', 'George', 'Ruth', 'Edward', 'Sharon'
  ];

  const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
    'Hernandez', 'Lopez', 'Gonzales', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
    'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
    'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores'
  ];

  const countries = [
    { name: 'United States', code: 'us' },
    { name: 'United Kingdom', code: 'gb' },
    { name: 'Canada', code: 'ca' },
    { name: 'Australia', code: 'au' },
    { name: 'Germany', code: 'de' },
    { name: 'France', code: 'fr' },
    { name: 'Spain', code: 'es' },
    { name: 'Italy', code: 'it' },
    { name: 'Netherlands', code: 'nl' },
    { name: 'Sweden', code: 'se' },
    { name: 'Norway', code: 'no' },
    { name: 'Denmark', code: 'dk' },
    { name: 'Brazil', code: 'br' },
    { name: 'Mexico', code: 'mx' },
    { name: 'Japan', code: 'jp' },
    { name: 'South Korea', code: 'kr' },
    { name: 'New Zealand', code: 'nz' },
    { name: 'Ireland', code: 'ie' },
    { name: 'Belgium', code: 'be' },
    { name: 'Switzerland', code: 'ch' }
  ];

  const travelPassions = [
    'Photography', 'Ancient civilizations', 'Wildlife photography', 'Adventure sports', 'Local cuisine',
    'Art and culture', 'Music festivals', 'Beach relaxation', 'Mountain hiking', 'Historical sites',
    'Architecture', 'Street food', 'Nightlife', 'Museums', 'Nature conservation', 'Scuba diving',
    'Rock climbing', 'Wine tasting', 'Local markets', 'Traditional crafts', 'Religious sites',
    'Urban exploration', 'Surfing', 'Cycling tours', 'Cooking classes'
  ];

  const additionalProducts = [
    [{ name: 'City Walking Tour', type: 'miscellaneous' }],
    [{ name: 'Cooking Class Experience', type: 'miscellaneous' }],
    [{ name: 'Museum Pass', type: 'miscellaneous' }],
    [{ name: 'Wine Tasting Tour', type: 'miscellaneous' }],
    [{ name: 'Adventure Sports Package', type: 'miscellaneous' }],
    [{ name: 'Photography Workshop', type: 'miscellaneous' }],
    [{ name: 'Local Guide Service', type: 'miscellaneous' }],
    [{ name: 'Cultural Experience', type: 'miscellaneous' }],
    [{ name: 'Transportation Upgrade', type: 'miscellaneous' }],
    []
  ];

  const roomTypes = ['double', 'twin', 'single'];
  const beddingPreferences = ['doubleBed', 'twinBeds'];
  const genders = ['Male', 'Female'];

  return Array.from({ length: 42 }, (_, index) => {
    const firstName = firstNames[index % firstNames.length];
    const lastName = lastNames[Math.floor(index / firstNames.length) % lastNames.length];
    const country = countries[index % countries.length];
    const roomType = roomTypes[index % roomTypes.length];
    const gender = genders[index % genders.length];
    
    // Generate birth year (ages 20-65)
    const birthYear = 2004 - (20 + (index % 45));
    const birthMonth = String((index % 12) + 1).padStart(2, '0');
    const birthDate = String((index % 28) + 1).padStart(2, '0');

    // Create room mate for non-single rooms
    let roomMate = undefined;
    if (roomType !== 'single' && index % 2 === 0 && index + 1 < 42) {
      const mateFirstName = firstNames[(index + 1) % firstNames.length];
      const mateLastName = lastNames[Math.floor((index + 1) / firstNames.length) % lastNames.length];
      roomMate = {
        firstName: mateFirstName,
        lastName: mateLastName
      };
    }

    return {
      id: 70000000 + index,
      firstName,
      lastName,
      age: 2024 - birthYear,
      gender,
      address: {
        country: country.name,
        countryCode: country.code
      },
      travelPassion: travelPassions[index % travelPassions.length],
      numberOfTimesTravelledPreviously: index % 8,
      passengerId: index + 1,
      roomType,
      roomMate,
      beddingPreference: beddingPreferences[index % beddingPreferences.length],
      additionalProducts: additionalProducts[index % additionalProducts.length],
      dateOfBirthActual: {
        year: birthYear.toString(),
        month: birthMonth,
        date: birthDate
      }
    };
  });
};

export const mockPassengers = generateMockPassengers();
export const mockPassengersFull = generateMockPassengers();
export const mockPassengersSparse = mockPassengersFull.slice(0, 5);
