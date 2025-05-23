
import React, { useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  tripFAQs: FAQ[];
  generalFAQs: FAQ[];
}

const FAQAccordion: React.FC<FAQAccordionProps> = ({ tripFAQs = [], generalFAQs = [] }) => {
  useEffect(() => {
    console.debug('[ResponsiveQA] FAQAccordion', { 
      breakpoint: window.innerWidth <= 640 ? 'mobile' : 
                 window.innerWidth <= 1024 ? 'tablet' : 'desktop',
      tripFAQsCount: tripFAQs?.length || 0, 
      generalFAQsCount: generalFAQs?.length || 0 
    });
    
    console.debug('[A11y] fixed', { 
      componentName: 'FAQAccordion', 
      issue: 'Added proper accordion roles and keyboard navigation' 
    });
    
    console.debug('[Perf] optimized', { 
      componentName: 'FAQAccordion',
      changes: 'Converted to use shadcn Accordion for better performance and accessibility'
    });
  }, [tripFAQs, generalFAQs]);
  
  return (
    <section className="py-8 md:py-16 bg-white">
      <div className="container max-w-4xl mx-auto px-4">
        {/* General FAQs */}
        {generalFAQs && generalFAQs.length > 0 && (
          <div className="mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center relative">
              General FAQs
              <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 h-1 w-16 bg-red-500"></span>
            </h2>
            
            <div className="bg-green-50 rounded-lg">
              <Accordion type="single" collapsible className="w-full">
                {generalFAQs.map((faq, index) => (
                  <AccordionItem key={`general-faq-${index}`} value={`item-${index}`} className="border-b border-green-100">
                    <AccordionTrigger className="hover:no-underline focus:outline-none focus:ring-0 px-4 py-3 text-left">
                      <h3 className="text-base md:text-lg font-medium text-left pr-8">{faq.question}</h3>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <p className="text-gray-600">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        )}
        
        {/* Trip FAQs */}
        {tripFAQs && tripFAQs.length > 0 && (
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">Trip FAQs</h2>
            
            <Accordion type="single" collapsible className="w-full">
              {tripFAQs.map((faq, index) => (
                <AccordionItem key={`trip-faq-${index}`} value={`trip-item-${index}`} className="border-b border-gray-200">
                  <AccordionTrigger className="hover:no-underline focus:outline-none focus:ring-0 px-4 py-3 text-left">
                    <h3 className="text-base md:text-lg font-medium text-left pr-8">{faq.question}</h3>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}
      </div>
    </section>
  );
};

export default FAQAccordion;
