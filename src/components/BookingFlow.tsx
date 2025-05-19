
import React, { useState, useEffect } from 'react';
import { useBooking } from '@/context/BookingContext';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { Check, Calendar as CalendarIcon, Users, ArrowRight } from 'lucide-react';

type Step = 'date' | 'travelers' | 'confirm';

const BookingFlow: React.FC = () => {
  const [step, setStep] = useState<Step>('date');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<{
    date?: string;
    travelers?: string;
  }>({});

  const { date, travelers, setDate, setTravelers } = useBooking();

  useEffect(() => {
    console.debug('[BookingFlow] step', step);
  }, [step]);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(format(selectedDate, 'yyyy-MM-dd'));
      setErrors(prev => ({ ...prev, date: undefined }));
    }
  };

  const handleTravelersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setTravelers(isNaN(value) ? 0 : value);
    
    if (value < 1) {
      setErrors(prev => ({ ...prev, travelers: 'At least 1 traveler is required' }));
    } else {
      setErrors(prev => ({ ...prev, travelers: undefined }));
    }
  };

  const validateStep = (): boolean => {
    const newErrors: typeof errors = {};
    
    if (step === 'date' && !date) {
      newErrors.date = 'Please select a date';
    }
    
    if (step === 'travelers') {
      if (travelers < 1) {
        newErrors.travelers = 'At least 1 traveler is required';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (!validateStep()) return;
    
    if (step === 'date') {
      setStep('travelers');
    } else if (step === 'travelers') {
      setStep('confirm');
    }
  };

  const confirmBooking = async () => {
    if (!validateStep()) return;
    
    console.debug('[BookingFlow] confirmed', { date, travelers });
    setIsSubmitting(true);
    
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setIsSubmitting(false);
    // You would typically redirect or show a success message here
  };

  // Progress indicator calculation
  const getProgress = () => {
    switch (step) {
      case 'date': return 33;
      case 'travelers': return 66;
      case 'confirm': return 100;
    }
  };

  return (
    <div className="space-y-6 max-w-md mx-auto">
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
        <div 
          className="bg-[#CCFF00] h-full transition-all duration-300 ease-in-out" 
          style={{ width: `${getProgress()}%` }}
        />
      </div>
      
      {/* Step Indicator */}
      <div className="flex justify-between mb-4">
        <div className={`flex flex-col items-center ${step === 'date' || step === 'travelers' || step === 'confirm' ? 'text-black' : 'text-gray-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${step === 'date' || step === 'travelers' || step === 'confirm' ? 'bg-[#CCFF00]' : 'bg-gray-200'}`}>
            {step === 'travelers' || step === 'confirm' ? <Check className="h-4 w-4" /> : <CalendarIcon className="h-4 w-4" />}
          </div>
          <span className="text-xs">Dates</span>
        </div>
        
        <div className={`flex flex-col items-center ${step === 'travelers' || step === 'confirm' ? 'text-black' : 'text-gray-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${step === 'travelers' || step === 'confirm' ? 'bg-[#CCFF00]' : 'bg-gray-200'}`}>
            {step === 'confirm' ? <Check className="h-4 w-4" /> : <Users className="h-4 w-4" />}
          </div>
          <span className="text-xs">Travelers</span>
        </div>
        
        <div className={`flex flex-col items-center ${step === 'confirm' ? 'text-black' : 'text-gray-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${step === 'confirm' ? 'bg-[#CCFF00]' : 'bg-gray-200'}`}>
            <Check className="h-4 w-4" />
          </div>
          <span className="text-xs">Confirm</span>
        </div>
      </div>

      <Card className="w-full">
        {step === 'date' && (
          <>
            <CardHeader>
              <CardTitle className="text-xl">Select Your Travel Date</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Calendar 
                  mode="single" 
                  selected={date ? new Date(date) : undefined}
                  onSelect={handleDateSelect} 
                  className="rounded-md border mx-auto"
                  disabled={(date) => date < new Date()}
                />
                {errors.date && (
                  <p className="text-sm text-[#ea384c] mt-1">{errors.date}</p>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={nextStep}
                className="w-full bg-[#CCFF00] hover:bg-[#CCFF00]/90 text-black"
              >
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </>
        )}
        
        {step === 'travelers' && (
          <>
            <CardHeader>
              <CardTitle className="text-xl">How Many Travelers?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="travelers" className="text-sm font-medium">
                    Number of Travelers
                  </label>
                  <Input
                    id="travelers"
                    type="number"
                    min="1"
                    value={travelers}
                    onChange={handleTravelersChange}
                    className="focus:border-[#CCFF00] focus:ring-[#CCFF00]"
                  />
                  {errors.travelers && (
                    <p className="text-sm text-[#ea384c] mt-1">{errors.travelers}</p>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between gap-4">
              <Button 
                variant="outline" 
                onClick={() => setStep('date')}
                className="w-1/2"
              >
                Back
              </Button>
              <Button 
                onClick={nextStep}
                className="w-1/2 bg-[#CCFF00] hover:bg-[#CCFF00]/90 text-black"
              >
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </>
        )}
        
        {step === 'confirm' && (
          <>
            <CardHeader>
              <CardTitle className="text-xl">Confirm Your Booking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-200">
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm font-medium">Travel Date</span>
                    </div>
                    <span className="text-sm">
                      {date ? format(new Date(date), 'MMMM d, yyyy') : 'Not selected'}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm font-medium">Travelers</span>
                    </div>
                    <span className="text-sm">{travelers}</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between gap-4">
              <Button 
                variant="outline" 
                onClick={() => setStep('travelers')}
                className="w-1/2"
              >
                Back
              </Button>
              <Button 
                onClick={confirmBooking} 
                disabled={isSubmitting}
                className="w-1/2 bg-[#CCFF00] hover:bg-[#CCFF00]/90 text-black"
              >
                {isSubmitting ? 'Processing...' : 'Confirm Booking'}
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
};

export default BookingFlow;
