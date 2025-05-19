
import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  tripFAQs: FAQ[];
  generalFAQs: FAQ[];
}

const FAQAccordion: React.FC<FAQAccordionProps> = ({ tripFAQs, generalFAQs }) => {
  const [openTripFAQ, setOpenTripFAQ] = useState<number | null>(0);
  const [openGeneralFAQs, setOpenGeneralFAQs] = useState<number[]>([]);
  
  useEffect(() => {
    console.debug('[FAQAccordion] mounted', { 
      tripFAQsCount: tripFAQs.length, 
      generalFAQsCount: generalFAQs.length 
    });
  }, [tripFAQs.length, generalFAQs.length]);
  
  const toggleTripFAQ = (index: number) => {
    setOpenTripFAQ(prevIndex => prevIndex === index ? null : index);
    console.debug('[FAQAccordion] toggled', { 
      section: 'trip', 
      question: tripFAQs[index].question,
      open: openTripFAQ !== index
    });
  };
  
  const toggleGeneralFAQ = (index: number) => {
    setOpenGeneralFAQs(prev => {
      const isOpen = prev.includes(index);
      const newOpen = isOpen 
        ? prev.filter(i => i !== index)
        : [...prev, index];
        
      console.debug('[FAQAccordion] toggled', { 
        section: 'general', 
        question: generalFAQs[index].question,
        open: !isOpen
      });
      
      return newOpen;
    });
  };
  
  return (
    <section className="py-12">
      <div className="container">
        {/* Trip FAQs */}
        <div className="mb-12">
          <h2 className="text-2xl font-medium text-primary mb-6">Trip FAQs</h2>
          
          <div className="divide-y divide-gray-200">
            {tripFAQs.map((faq, index) => {
              const isOpen = openTripFAQ === index;
              
              return (
                <div key={index} className="py-4">
                  <button
                    className="w-full text-left flex justify-between items-start"
                    onClick={() => toggleTripFAQ(index)}
                    aria-expanded={isOpen}
                  >
                    <h3 className="text-lg font-medium pr-8">{faq.question}</h3>
                    <div className={`bg-primary rounded-full p-1 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                      <ChevronDown className="h-5 w-5 text-white" />
                    </div>
                  </button>
                  
                  {isOpen && (
                    <div className="mt-4 text-gray-600">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* General FAQs */}
        <div>
          <h2 className="text-2xl font-medium text-primary mb-6">General FAQs</h2>
          
          <div className="bg-bgLight rounded-lg p-6">
            <div className="divide-y divide-gray-200">
              {generalFAQs.map((faq, index) => {
                const isOpen = openGeneralFAQs.includes(index);
                
                return (
                  <div key={index} className="py-4">
                    <button
                      className="w-full text-left flex justify-between items-start"
                      onClick={() => toggleGeneralFAQ(index)}
                      aria-expanded={isOpen}
                    >
                      <h3 className="text-lg font-medium pr-8">{faq.question}</h3>
                      <div className={`bg-primary rounded-full p-1 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                        <ChevronDown className="h-5 w-5 text-white" />
                      </div>
                    </button>
                    
                    {isOpen && (
                      <div className="mt-4 text-gray-600">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQAccordion;
