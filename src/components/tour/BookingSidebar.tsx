
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar, Users, Check, Info, HelpCircle, ArrowRight, CalendarCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface BookingSidebarProps {
  price: number;
  oldPrice?: number;
  tourName: string;
  startDate?: string;
  duration: number;
  savings?: number;
}

const BookingSidebar: React.FC<BookingSidebarProps> = ({
  price,
  oldPrice,
  tourName,
  startDate,
  duration,
  savings
}) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(startDate || null);
  const [travelerCount, setTravelerCount] = useState<number>(1);
  
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0 
    }).format(value);
  };
  
  const discountPercentage = oldPrice ? Math.round((oldPrice - price) / oldPrice * 100) : 0;
  
  const handleTravelerDecrease = () => {
    if (travelerCount > 1) {
      setTravelerCount(travelerCount - 1);
    }
  };
  
  const handleTravelerIncrease = () => {
    if (travelerCount < 20) {
      setTravelerCount(travelerCount + 1);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md sticky top-24">
      {/* Header with price */}
      <div className="p-5 border-b border-gray-200">
        <div className="flex flex-col mb-2">
          <span className="text-sm text-gray-500">From</span>
          <div className="flex items-end gap-2">
            {oldPrice && (
              <span className="text-gray-400 line-through text-lg">{formatPrice(oldPrice)}</span>
            )}
            <span className="text-2xl font-bold">{formatPrice(price)}</span>
            {discountPercentage > 0 && (
              <span className="text-sm bg-red-100 text-red-600 px-1 py-0.5 rounded">
                Save {discountPercentage}%
              </span>
            )}
          </div>
        </div>
        
        <div className="text-sm text-gray-600">
          {savings && savings > 0 && (
            <div className="text-green-600 font-medium mb-1">
              You save {formatPrice(savings)}
            </div>
          )}
          <div>Price per person</div>
          <div>Secure your trip with a {formatPrice(price * 0.1)} deposit</div>
        </div>
      </div>
      
      {/* Date selection */}
      <div className="p-5 border-b border-gray-200">
        <h3 className="font-semibold mb-3">Date Options</h3>
        
        {selectedDate ? (
          <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <Calendar className="text-gray-500 w-5 h-5" />
              <div>
                <div className="font-medium">{format(new Date(selectedDate), 'dd MMM yyyy')}</div>
                <div className="text-xs text-gray-500">{duration} days</div>
              </div>
            </div>
            <Button 
              variant="ghost"
              size="sm"
              className="text-xs hover:bg-gray-200"
              onClick={() => setSelectedDate(null)}
            >
              Change
            </Button>
          </div>
        ) : (
          <Button 
            className="w-full bg-[#CCFF00] hover:bg-[#CCFF00]/90 text-black flex items-center justify-between"
            onClick={() => {}}
          >
            <span>Select departure date</span>
            <CalendarCheck className="w-5 h-5" />
          </Button>
        )}
        
        <div className="mt-3 text-sm text-gray-600 flex items-center gap-1">
          <Info className="w-4 h-4" />
          <span>Prices may vary based on departure date</span>
        </div>
      </div>
      
      {/* Traveler count */}
      <div className="p-5 border-b border-gray-200">
        <h3 className="font-semibold mb-3">Travelers</h3>
        
        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center gap-2">
            <Users className="text-gray-500 w-5 h-5" />
            <span className="font-medium">{travelerCount} Traveler{travelerCount !== 1 ? 's' : ''}</span>
          </div>
          
          <div className="flex items-center">
            <button 
              className="w-8 h-8 bg-white border border-gray-300 rounded-l flex items-center justify-center hover:bg-gray-100"
              onClick={handleTravelerDecrease}
              disabled={travelerCount <= 1}
            >
              -
            </button>
            <div className="px-3 py-1 border-t border-b border-gray-300">{travelerCount}</div>
            <button 
              className="w-8 h-8 bg-white border border-gray-300 rounded-r flex items-center justify-center hover:bg-gray-100"
              onClick={handleTravelerIncrease}
            >
              +
            </button>
          </div>
        </div>
        
        <div className="mt-3 text-sm text-gray-600 flex items-center gap-1">
          <Info className="w-4 h-4" />
          <span>Ages 18-35 only</span>
        </div>
      </div>
      
      {/* Trip summary */}
      <div className="p-5 border-b border-gray-200">
        <h3 className="font-semibold mb-3">Trip Summary</h3>
        
        <div className="text-sm space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Trip cost ({travelerCount} {travelerCount === 1 ? 'person' : 'people'})</span>
            <span className="font-medium">{formatPrice(price * travelerCount)}</span>
          </div>
          
          {savings && savings > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-green-600">Savings</span>
              <span className="font-medium text-green-600">-{formatPrice(savings * travelerCount)}</span>
            </div>
          )}
          
          <div className="flex justify-between items-center pt-2 border-t border-gray-200">
            <span className="font-semibold">Total</span>
            <span className="font-bold text-lg">{formatPrice(price * travelerCount)}</span>
          </div>
          
          <div className="flex justify-between items-center text-xs text-gray-600">
            <span>Deposit due today</span>
            <span>{formatPrice(price * travelerCount * 0.1)}</span>
          </div>
        </div>
      </div>
      
      {/* Call to action */}
      <div className="p-5">
        <Button 
          className="w-full bg-[#CCFF00] hover:bg-[#CCFF00]/90 text-black font-bold text-lg"
        >
          Book Now
        </Button>
        
        <div className="mt-4 flex justify-center">
          <Button variant="ghost" className="text-sm text-gray-600 flex items-center gap-1">
            <HelpCircle className="w-4 h-4" />
            <span>Help me book</span>
          </Button>
        </div>
        
        {/* Key selling points */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Check className="w-4 h-4 text-green-500" />
            <span>Low deposit to secure your spot</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Check className="w-4 h-4 text-green-500" />
            <span>Flexible payment options</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Check className="w-4 h-4 text-green-500" />
            <span>No booking or credit card fees</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSidebar;
