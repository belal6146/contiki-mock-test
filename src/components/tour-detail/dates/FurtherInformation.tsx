
import React from 'react';

interface FurtherInformationProps {
  information?: string;
  additionalNote?: string;
}

const FurtherInformation: React.FC<FurtherInformationProps> = ({ 
  information = "This trip ends at 10am in Athens. For those participating in the Athens Sightseeing Free Time Add On, the trip will end in Athens at 12pm.",
  additionalNote = "Flights there and back again aren't included."
}) => {
  return (
    <div className="mb-8">
      <h4 className="font-bold text-black mb-4">Further Information</h4>
      <div className="flex items-start gap-3 mb-4">
        <div className="bg-yellow-400 text-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">
          !
        </div>
        <p className="text-sm text-gray-700">
          {information}
        </p>
      </div>
      <p className="text-xs italic text-gray-600">
        {additionalNote}
      </p>
    </div>
  );
};

export default FurtherInformation;
