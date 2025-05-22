
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

const FAQAccordion: React.FC<FAQAccordionProps> = ({ tripFAQs = [], generalFAQs = [] }) => {
  const [openTripFAQ, setOpenTripFAQ] = useState<number | null>(null);
  const [openGeneralFAQs, setOpenGeneralFAQs] = useState<number[]>([]);
  
  useEffect(() => {
    console.debug('[FAQAccordion] mounted', { 
      tripFAQsCount: tripFAQs?.length || 0, 
      generalFAQsCount: generalFAQs?.length || 0 
    });
  }, [tripFAQs, generalFAQs]);
  
  const toggleTripFAQ = (index: number) => {
    setOpenTripFAQ(prevIndex => prevIndex === index ? null : index);
    console.debug('[FAQAccordion] toggled', { 
      section: 'trip', 
      question: tripFAQs?.[index]?.question,
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
        question: generalFAQs?.[index]?.question,
        open: !isOpen
      });
      
      return newOpen;
    });
  };
  
  return (
    <section className="py-12">
      <div className="container max-w-4xl mx-auto px-4">
        {/* General FAQs */}
        {generalFAQs && generalFAQs.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-8 text-center">General FAQs</h2>
            
            <div className="bg-green-50 rounded-lg p-6">
              <div className="divide-y divide-gray-200">
                {generalFAQs.map((faq, index) => {
                  const isOpen = openGeneralFAQs.includes(index);
                  
                  return (
                    <div key={index} className="py-4">
                      <button
                        className="w-full text-left flex justify-between items-start hover:text-accent-foreground transition-colors duration-150 ease-in-out"
                        onClick={() => toggleGeneralFAQ(index)}
                        aria-expanded={isOpen}
                      >
                        <h3 className="text-lg font-medium pr-8">{faq.question}</h3>
                        <div className={`bg-primary rounded-full p-1 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                          <ChevronDown className="h-5 w-5 text-white" />
                        </div>
                      </button>
                      
                      <div 
                        className={`mt-4 text-gray-600 transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                      >
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        
        {/* Trip FAQs */}
        {tripFAQs && tripFAQs.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Trip FAQs</h2>
            
            <div className="divide-y divide-gray-200">
              {tripFAQs.map((faq, index) => {
                const isOpen = openTripFAQ === index;
                
                return (
                  <div key={index} className="py-4">
                    <button
                      className="w-full text-left flex justify-between items-start hover:text-accent-foreground transition-colors duration-150 ease-in-out"
                      onClick={() => toggleTripFAQ(index)}
                      aria-expanded={isOpen}
                    >
                      <h3 className="text-lg font-medium pr-8">{faq.question}</h3>
                      <div className={`bg-primary rounded-full p-1 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                        <ChevronDown className="h-5 w-5 text-white" />
                      </div>
                    </button>
                    
                    <div 
                      className={`mt-4 text-gray-600 transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FAQAccordion;
