
import React, { createContext, useContext, useState, ReactNode } from 'react';

type BookingContextType = {
  date: string | null;
  travelers: number;
  setDate: (date: string | null) => void;
  setTravelers: (count: number) => void;
  reset: () => void;
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

type BookingProviderProps = {
  children: ReactNode;
};

export const BookingProvider: React.FC<BookingProviderProps> = ({ children }) => {
  const [date, setDate] = useState<string | null>(null);
  const [travelers, setTravelers] = useState<number>(1);

  const reset = () => {
    setDate(null);
    setTravelers(1);
  };

  return (
    <BookingContext.Provider
      value={{
        date,
        travelers,
        setDate,
        setTravelers,
        reset
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
