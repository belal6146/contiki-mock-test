
import React from 'react';
import FAQAccordion from '@/components/tour/FAQAccordion';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  tripFAQs: FAQ[];
  generalFAQs: FAQ[];
}

const FAQSection: React.FC<FAQSectionProps> = ({ tripFAQs, generalFAQs }) => {
  return (
    <div className="bg-white py-12 border-t border-gray-100">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-10 text-center">Frequently Asked Questions</h2>
          <FAQAccordion 
            tripFAQs={tripFAQs} 
            generalFAQs={generalFAQs} 
          />
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
