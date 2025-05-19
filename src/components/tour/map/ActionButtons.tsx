
import React from 'react';
import { Button } from "@/components/ui/button";

const ActionButtons: React.FC = () => {
  return (
    <>
      {/* Download itinerary button */}
      <div className="flex justify-center mb-8">
        <Button 
          variant="outline" 
          className="flex items-center space-x-2 text-primary font-medium border-primary hover:bg-primary/5 transition-colors duration-150"
        >
          <span>DOWNLOAD ITINERARY</span>
        </Button>
      </div>
      
      {/* Expand all days button */}
      <div className="flex justify-end mb-4">
        <Button 
          variant="ghost" 
          className="text-secondary text-sm font-medium hover:bg-secondary/5 transition-colors duration-150"
        >
          EXPAND ALL DAYS
        </Button>
      </div>
    </>
  );
};

export default ActionButtons;
