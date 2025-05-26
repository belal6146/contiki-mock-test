
import { BookingPassenger } from './types';

export const mockBookingData: BookingPassenger[] = [
  {
    id: 50123455,
    firstName: "Robert",
    lastName: "Smith",
    age: 39,
    gender: "Male",
    address: { 
      country: "United Kingdom",
      countryCode: "gb"
    },
    travelPassion: "Culinary experiences",
    numberOfTimesTravelledPreviously: 8,
    passengerId: 1
  },
  {
    id: 50123456,
    firstName: "Emily",
    lastName: "Johnson",
    age: 36,
    gender: "Female",
    address: { 
      country: "United Kingdom",
      countryCode: "gb"
    },
    travelPassion: "History and museums",
    numberOfTimesTravelledPreviously: 5,
    passengerId: 2
  }
];
