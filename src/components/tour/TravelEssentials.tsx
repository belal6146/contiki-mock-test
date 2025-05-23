
import React from 'react';
import { FileText, Wallet, FileCheck, Globe, ShieldCheck, AlertCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

const TravelEssentials = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">Travel Essentials</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left column - Travel Documents */}
          <div className="md:col-span-2">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-gray-700" />
                Required Documents
              </h3>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="passport">
                  <AccordionTrigger className="text-left font-medium hover:no-underline">
                    Passport Information
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    <p className="mb-2">Your passport must be valid for at least 6 months beyond your intended return date.</p>
                    <p>Ensure you have enough blank pages for entry/exit stamps (at least 2-4 pages).</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="visa">
                  <AccordionTrigger className="text-left font-medium hover:no-underline">
                    Visa Requirements
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    <p className="mb-2">EU citizens do not need a visa for Greece.</p>
                    <p className="mb-2">US, Canadian, Australian, and New Zealand citizens can stay visa-free for up to 90 days.</p>
                    <p className="mb-2">Other nationalities should check with the Greek embassy or consulate in their country.</p>
                    <Button variant="outline" className="mt-2 text-black border-black" size="sm">
                      Check Visa Requirements
                    </Button>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="health">
                  <AccordionTrigger className="text-left font-medium hover:no-underline">
                    Health & Vaccination Requirements
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    <p className="mb-2">No specific vaccinations are required for travel to Greece.</p>
                    <p>It's recommended to have routine vaccinations up to date (MMR, diphtheria-tetanus-pertussis, etc.).</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <div className="mt-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-gray-700" />
                  Currency & Payment
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-1">Local Currency</h4>
                    <p className="text-sm text-gray-600">Euro (€) is the currency used in Greece.</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-1">Credit Cards & ATMs</h4>
                    <p className="text-sm text-gray-600">
                      Major credit cards are widely accepted in hotels, restaurants, and shops in tourist areas. 
                      ATMs are available on all islands, but we recommend bringing some cash for smaller establishments.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-1">Tipping</h4>
                    <p className="text-sm text-gray-600">
                      Tipping isn't mandatory but is appreciated. Consider 5-10% in restaurants if service charge isn't included.
                      Your Trip Manager can provide specific guidance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - Travel Insurance */}
          <div>
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-gray-700" />
                Travel Insurance
              </h3>
              
              <div className="rounded-lg border border-orange-200 bg-orange-50 p-4 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Important:</span> Travel insurance is mandatory for all Contiki trips. 
                    You'll need to provide proof of insurance before departure.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <p className="text-gray-600 text-sm">
                  We strongly recommend purchasing comprehensive travel insurance that includes coverage for:
                </p>
                
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <div className="w-5 h-5 bg-[#CCFF00] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FileCheck className="w-3 h-3" />
                    </div>
                    Trip cancellation and interruption
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <div className="w-5 h-5 bg-[#CCFF00] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FileCheck className="w-3 h-3" />
                    </div>
                    Emergency medical expenses and evacuation
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <div className="w-5 h-5 bg-[#CCFF00] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FileCheck className="w-3 h-3" />
                    </div>
                    Lost, stolen or damaged baggage
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <div className="w-5 h-5 bg-[#CCFF00] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FileCheck className="w-3 h-3" />
                    </div>
                    Travel delays
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <div className="w-5 h-5 bg-[#CCFF00] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FileCheck className="w-3 h-3" />
                    </div>
                    24/7 assistance services
                  </li>
                </ul>
              </div>
              
              <Button className="w-full bg-[#CCFF00] hover:bg-[#CCFF00]/90 text-black">
                Get a Quote
              </Button>
              
              <div className="mt-6">
                <h4 className="font-medium mb-2">Our Partners</h4>
                <div className="flex gap-4">
                  <div className="bg-gray-100 p-2 rounded">
                    <Globe className="w-8 h-8 text-gray-500" />
                  </div>
                  <div className="bg-gray-100 p-2 rounded">
                    <Globe className="w-8 h-8 text-gray-500" />
                  </div>
                  <div className="bg-gray-100 p-2 rounded">
                    <Globe className="w-8 h-8 text-gray-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TravelEssentials;
