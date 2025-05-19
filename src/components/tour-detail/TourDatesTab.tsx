
import React, { useEffect, useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import VariationCards from '@/components/tour/VariationCards';
import BookingFlow from '@/components/BookingFlow';
import { Trip } from '@/types/trip';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';

interface TourDatesTabProps {
  trip: Trip;
}

const TourDatesTab: React.FC<TourDatesTabProps> = ({ trip }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    console.debug('[TourDatesTab] mounted', { tripId: trip.id, variations: trip.variations?.length || 0 });
  }, [trip.id, trip.variations]);

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
    console.debug('[TourDatesTab] dateSelected', { date: date ? format(date, 'yyyy-MM-dd') : 'none' });
  };

  const handleMonthChange = (month: Date) => {
    setCurrentMonth(month);
    console.debug('[TourDatesTab] monthChanged', { month: format(month, 'MMMM yyyy') });
  };

  const nextMonth = () => {
    const next = new Date(currentMonth);
    next.setMonth(currentMonth.getMonth() + 1);
    setCurrentMonth(next);
  };

  const prevMonth = () => {
    const prev = new Date(currentMonth);
    prev.setMonth(currentMonth.getMonth() - 1);
    setCurrentMonth(prev);
  };

  return (
    <div className="space-y-12 py-8">
      <h2 className="heading-md mb-6 container">Available Dates & Pricing</h2>
      
      <div className="container">
        <Card className="shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Calendar Section */}
              <div className="lg:col-span-5 p-6 border-r border-gray-200">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">Select Travel Date</h3>
                    <div className="flex space-x-2">
                      <button 
                        onClick={prevMonth}
                        className="p-1 rounded-full hover:bg-gray-100"
                        aria-label="Previous month"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <span className="font-medium">{format(currentMonth, 'MMMM yyyy')}</span>
                      <button 
                        onClick={nextMonth}
                        className="p-1 rounded-full hover:bg-gray-100"
                        aria-label="Next month"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateChange}
                    month={currentMonth}
                    onMonthChange={handleMonthChange}
                    className="rounded-md border p-3 pointer-events-auto"
                  />
                </div>
                {selectedDate && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-md">
                    <h4 className="font-bold mb-2">Selected Date</h4>
                    <p>{format(selectedDate, 'EEEE, MMMM d, yyyy')}</p>
                    <p className="text-sm text-green-600 mt-1">Available</p>
                  </div>
                )}
              </div>
              
              {/* Pricing Table Section */}
              <div className="lg:col-span-7 p-6">
                <h3 className="text-lg font-bold mb-4">Trip Options & Pricing</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Departure</TableHead>
                      <TableHead>Return</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(trip.variations || []).map((variation, index) => (
                      <TableRow key={variation.id || index}>
                        <TableCell>{format(new Date(variation.startDate), 'MMM dd, yyyy')}</TableCell>
                        <TableCell>{format(new Date(variation.endDate), 'MMM dd, yyyy')}</TableCell>
                        <TableCell className="font-bold">${variation.price}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            variation.availability === 'available' ? 'bg-green-100 text-green-800' :
                            variation.availability === 'limited' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {variation.availability === 'available' ? 'Available' :
                             variation.availability === 'limited' ? 'Limited' : 'Sold Out'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <button 
                            className={`btn ${variation.availability !== 'soldout' ? 'btn-primary' : 'btn-ghost opacity-50 cursor-not-allowed'}`}
                            disabled={variation.availability === 'soldout'}
                            onClick={() => console.debug('[TourDatesTab] bookNow clicked', { variationId: variation.id })}
                          >
                            {variation.availability !== 'soldout' ? 'Book Now' : 'Sold Out'}
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 container">
        <VariationCards variations={trip.variations || []} />
        
        <div id="booking" className="mt-8">
          <h3 className="text-xl font-bold mb-4">Book This Trip</h3>
          <BookingFlow />
        </div>
      </div>
    </div>
  );
};

export default TourDatesTab;
