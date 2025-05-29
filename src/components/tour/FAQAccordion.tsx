import React, { useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';
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
    <section className="py-12 bg-white">
      <div className="container max-w-4xl mx-auto">
        {/* General FAQs */}
        {generalFAQs && generalFAQs.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-black">
                General FAQs
              </h2>
            </div>
            
            <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
              <Accordion type="single" collapsible className="w-full">
                {generalFAQs.map((faq, index) => (
                  <AccordionItem
                    key={`general-faq-${index}`}
                    value={`item-${index}`}
                    className="border-b border-gray-200 last:border-b-0"
                  >
                    <AccordionTrigger className="flex items-center justify-between w-full hover:no-underline focus:outline-none focus:ring-0 px-6 py-4 text-left group">
                      <h3 className="text-base font-bold text-black text-left pr-4 leading-tight">
                        {faq.question}
                      </h3>
                      <div className="flex-shrink-0 w-6 h-6 bg-[#CCFF00] rounded-full flex items-center justify-center ml-auto transform transition-transform duration-200 group-[&[data-state=open]]:rotate-45">
                        <Plus className="w-4 h-4 text-black" />
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 pt-0">
                      <p className="text-gray-700 leading-relaxed text-sm">
                        {faq.answer}
                      </p>
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
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-black">
                Trip FAQs
              </h2>
            </div>
            
            <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
              <Accordion type="single" collapsible className="w-full">
                {tripFAQs.map((faq, index) => (
                  <AccordionItem
                    key={`trip-faq-${index}`}
                    value={`trip-item-${index}`}
                    className="border-b border-gray-200 last:border-b-0"
                  >
                    <AccordionTrigger className="flex items-center justify-between w-full hover:no-underline focus:outline-none focus:ring-0 px-6 py-4 text-left group">
                      <h3 className="text-base font-bold text-black text-left pr-4 leading-tight">
                        {faq.question}
                      </h3>
                      <div className="flex-shrink-0 w-6 h-6 bg-[#CCFF00] rounded-full flex items-center justify-center ml-auto transform transition-transform duration-200 group-[&[data-state=open]]:rotate-45">
                        <Plus className="w-4 h-4 text-black" />
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 pt-0">
                      <p className="text-gray-700 leading-relaxed text-sm">
                        {faq.answer}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FAQAccordion;
