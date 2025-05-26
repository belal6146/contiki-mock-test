
export interface BookingPassenger {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  address: {
    country: string;
    countryCode: string;
  };
  travelPassion?: string;
  numberOfTimesTravelledPreviously?: number;
  passengerId: number;
}

export interface SeatData {
  id: string;
  row: number;
  position: 'left' | 'right';
  passenger?: BookingPassenger;
  isOccupied: boolean;
  isSelected: boolean;
}
