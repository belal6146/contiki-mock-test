
import React, { useState } from 'react';
import { useBooking } from '@/context/BookingContext';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';

type Step = 'date' | 'travelers' | 'confirm';

const BookingFlow: React.FC = () => {
  const [step, setStep] = useState<Step>('date');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<{
    date?: string;
    travelers?: string;
  }>({});

  const { date, travelers, setDate, setTravelers } = useBooking();

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
    
    console.debug('[BookingFlow] nextStep', { currentStep: step });
    
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

  const renderStep = () => {
    switch (step) {
      case 'date':
        return (
          <>
            <CardHeader>
              <CardTitle>Select a Date</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Calendar 
                  mode="single" 
                  selected={date ? new Date(date) : undefined}
                  onSelect={handleDateSelect} 
                  className="rounded-md border"
                  disabled={(date) => date < new Date()}
                />
                {errors.date && <p className="text-sm text-destructive">{errors.date}</p>}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={nextStep}
              >
                Next
              </Button>
            </CardFooter>
          </>
        );
        
      case 'travelers':
        return (
          <>
            <CardHeader>
              <CardTitle>How Many Travelers?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="travelers" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Number of Travelers
                  </label>
                  <Input
                    id="travelers"
                    type="number"
                    min="1"
                    value={travelers}
                    onChange={handleTravelersChange}
                  />
                  {errors.travelers && <p className="text-sm text-destructive">{errors.travelers}</p>}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setStep('date')}>
                Back
              </Button>
              <Button onClick={nextStep}>
                Next
              </Button>
            </CardFooter>
          </>
        );
        
      case 'confirm':
        return (
          <>
            <CardHeader>
              <CardTitle>Confirm Your Booking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">{date ? format(new Date(date), 'MMMM d, yyyy') : 'Not selected'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Travelers</p>
                    <p className="font-medium">{travelers}</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setStep('travelers')}>
                Back
              </Button>
              <Button 
                onClick={confirmBooking} 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Confirm Booking'}
              </Button>
            </CardFooter>
          </>
        );
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      {renderStep()}
    </Card>
  );
};

export default BookingFlow;
