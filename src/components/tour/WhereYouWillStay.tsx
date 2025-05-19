
import React, { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import hotelImage from '/images/accommodation-luxury.jpg';

interface Accommodation {
  name: string;
  location: string;
  image: string;
  nightsCount: number;
}

interface WhereYouWillStayProps {
  accommodation: Accommodation;
}

const WhereYouWillStay: React.FC<WhereYouWillStayProps> = ({ accommodation }) => {
  useEffect(() => {
    console.debug('[WhereYouWillStay] mounted', { accommodation });
  }, [accommodation]);
  
  return (
    <section className="py-16">
      <div className="container">
        <h2 className="text-3xl font-bold text-primary mb-4">Where You Will Stay</h2>
        <p className="text-lg text-gray-600 mb-8">Learn more about the accommodation included on this trip</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main accommodation card */}
          <div className="col-span-2">
            <Card className="overflow-hidden rounded-2xl shadow-md h-full">
              <div className="relative h-72">
                <img 
                  src={accommodation.image || hotelImage} 
                  alt={accommodation.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-8">
                <div className="uppercase text-xs font-semibold tracking-wider text-gray-500 mb-3">VIRTUAL TOUR</div>
                <h3 className="text-2xl font-bold mb-2">{accommodation.name}</h3>
                <p className="text-gray-700 mb-4">{accommodation.location}</p>
                <div className="flex items-center mb-6">
                  <div className="bg-secondary text-secondary-foreground text-xs font-medium px-4 py-1 rounded-full">
                    {accommodation.nightsCount} nights
                  </div>
                </div>
                <Button variant="ghost" className="text-secondary font-medium flex items-center gap-2 p-0 hover:bg-transparent hover:text-secondary/80">
                  See More <ExternalLink size={16} />
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Accommodation summary */}
          <div className="h-full">
            <Card className="flex flex-col items-center justify-center text-center p-8 h-full rounded-2xl shadow-md">
              <div className="bg-secondary rounded-full w-20 h-20 flex items-center justify-center mb-6">
                <span className="text-secondary-foreground text-2xl font-bold">{accommodation.nightsCount}</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">All Accommodation is Included</h3>
              <p className="text-gray-600">
                {accommodation.nightsCount} nights in Hotels, 2 nights in Special Stay
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhereYouWillStay;
