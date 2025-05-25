
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
    <section className="py-8 md:py-16 bg-white font-montserrat">
      <div className="container max-w-4xl mx-auto px-4">
        {/* General FAQs */}
        {generalFAQs && generalFAQs.length > 0 && (
          <div className="mb-8 md:mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-black">
                General FAQs
              </h2>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 14L12 9L17 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            <div className="bg-[#f0f8f0] rounded-lg overflow-hidden">
              <Accordion type="single" collapsible className="w-full">
                {generalFAQs.map((faq, index) => (
                  <AccordionItem 
                    key={`general-faq-${index}`} 
                    value={`item-${index}`} 
                    className="border-b border-[#e0f0e0] last:border-b-0"
                  >
                    <AccordionTrigger className="hover:no-underline focus:outline-none focus:ring-0 px-6 py-4 text-left group [&[data-state=open]>div>svg]:rotate-45">
                      <div className="flex items-center justify-between w-full">
                        <h3 className="text-base md:text-lg font-semibold text-black text-left pr-4 leading-tight">
                          {faq.question}
                        </h3>
                        <div className="flex-shrink-0 w-8 h-8 bg-black rounded-full flex items-center justify-center ml-4">
                          <Plus className="w-4 h-4 text-white transition-transform duration-200" />
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 pt-0">
                      <p className="text-gray-700 leading-relaxed text-sm md:text-base">
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
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 14L12 9L17 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            <div className="bg-[#f0f8f0] rounded-lg overflow-hidden">
              <Accordion type="single" collapsible className="w-full">
                {tripFAQs.map((faq, index) => (
                  <AccordionItem 
                    key={`trip-faq-${index}`} 
                    value={`trip-item-${index}`} 
                    className="border-b border-[#e0f0e0] last:border-b-0"
                  >
                    <AccordionTrigger className="hover:no-underline focus:outline-none focus:ring-0 px-6 py-4 text-left group [&[data-state=open]>div>svg]:rotate-45">
                      <div className="flex items-center justify-between w-full">
                        <h3 className="text-base md:text-lg font-semibold text-black text-left pr-4 leading-tight">
                          {faq.question}
                        </h3>
                        <div className="flex-shrink-0 w-8 h-8 bg-black rounded-full flex items-center justify-center ml-4">
                          <Plus className="w-4 h-4 text-white transition-transform duration-200" />
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 pt-0">
                      <p className="text-gray-700 leading-relaxed text-sm md:text-base">
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
