
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
  travelPassion: string;
  numberOfTimesTravelledPreviously: number;
  passengerId: number;
}
