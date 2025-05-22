
"use client";

import React, { useEffect, useState } from 'react';
import { Trip } from '@/types/trip';
import { format, addMonths } from 'date-fns';
import { Calendar as CalendarIcon, ChevronDown, ChevronUp, Check, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TourDatesTabProps {
  trip: Trip;
}

// Month data with active status
const MONTHS = [
  { code: 'JAN', active: false },
  { code: 'FEB', active: false },
  { code: 'MAR', active: false },
  { code: 'APR', active: false },
  { code: 'MAY', active: true },
  { code: 'JUN', active: true },
  { code: 'JUL', active: true },
  { code: 'AUG', active: true },
  { code: 'SEP', active: true },
  { code: 'OCT', active: false },
  { code: 'NOV', active: false },
  { code: 'DEC', active: false }
];

const TRIP_TYPES = [
  { id: 'plus', label: 'Plus', variant: 'solid-light' },
  { id: 'standard', label: 'Standard', variant: 'outline' },
  { id: 'pride', label: 'Pride', variant: 'rainbow' },
  { id: 'gap', label: 'Gap 18-22', variant: 'solid-primary' },
  { id: 'chill', label: 'Chill', variant: 'outline' },
];

interface DepartureOption {
  id: string;
  startDate: Date;
  endDate: Date;
  types: string[];
  basePrice: number;
  discount: number;
  dealLabel: string;
  variants: {
    id: string;
    name: string;
    price: number;
  }[];
}

// Generate some sample data
const generateMockOptions = (trip: Trip): DepartureOption[] => {
  if (!trip.variations || trip.variations.length === 0) {
    const today = new Date();
    
    // Create sample variation if none exists
    return [
      {
        id: 'opt1',
        startDate: addMonths(today, 1),
        endDate: addMonths(today, 1.3),
        types: ['plus', 'standard'],
        basePrice: 1868,
        discount: 467,
        dealLabel: 'Last minute deal',
        variants: [
          { id: 'plus', name: 'PLUS', price: 1868 },
          { id: 'standard', name: 'STANDARD', price: 1401 }
        ]
      },
      {
        id: 'opt2',
        startDate: addMonths(today, 2),
        endDate: addMonths(today, 2.3),
        types: ['plus', 'pride'],
        basePrice: 1920,
        discount: 350,
        dealLabel: 'Early bird offer',
        variants: [
          { id: 'plus', name: 'PLUS', price: 1920 },
          { id: 'pride', name: 'PRIDE', price: 1570 }
        ]
      },
      {
        id: 'opt3',
        startDate: addMonths(today, 3),
        endDate: addMonths(today, 3.3),
        types: ['standard', 'chill'],
        basePrice: 1750,
        discount: 250,
        dealLabel: 'Summer special',
        variants: [
          { id: 'standard', name: 'STANDARD', price: 1750 },
          { id: 'chill', name: 'CHILL', price: 1500 }
        ]
      }
    ];
  }
  
  // Map from actual trip variations if available
  return trip.variations.map((v, idx) => ({
    id: v.id || `opt${idx}`,
    startDate: new Date(v.startDate),
    endDate: new Date(v.endDate),
    types: ['plus', idx % 2 === 0 ? 'standard' : 'pride'],
    basePrice: v.price,
    discount: Math.round(v.price * 0.15),
    dealLabel: idx % 2 === 0 ? 'Last minute deal' : 'Early bird offer',
    variants: [
      { id: 'plus', name: 'PLUS', price: v.price },
      { id: 'standard', name: 'STANDARD', price: v.price - Math.round(v.price * 0.15) }
    ]
  }));
};

const TourDatesTab: React.FC<TourDatesTabProps> = ({ trip }) => {
  const [selectedMonth, setSelectedMonth] = useState<string>('MAY');
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['plus']);
  const [openOptionId, setOpenOptionId] = useState<string | null>(null);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  
  // Generate mock options
  const options = generateMockOptions(trip);
  
  useEffect(() => {
    console.debug('[DatesPricing] mounted');
  }, []);
  
  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
    console.debug('[DatesPricing] filterChanged', { month, types: selectedTypes });
  };
  
  const handleTypeToggle = (type: string) => {
    setSelectedTypes(prev => {
      const newTypes = prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type];
      
      console.debug('[DatesPricing] filterChanged', { month: selectedMonth, types: newTypes });
      return newTypes;
    });
  };
  
  const toggleOption = (id: string) => {
    setOpenOptionId(prev => prev === id ? null : id);
    console.debug('[DatesPricing] toggleOption', id);
    
    // Set default variant when opening
    if (openOptionId !== id) {
      const option = options.find(opt => opt.id === id);
      if (option && !selectedVariants[id]) {
        setSelectedVariants(prev => ({
          ...prev,
          [id]: option.variants[0].id
        }));
      }
    }
  };
  
  const selectVariant = (optionId: string, variantId: string) => {
    setSelectedVariants(prev => ({
      ...prev,
      [optionId]: variantId
    }));
    console.debug('[DatesPricing] variantSelected', { optionId, variant: variantId });
  };
  
  const handleBookByPhone = (optionId: string) => {
    console.debug('[DatesPricing] bookByPhone', { 
      optionId, 
      variant: selectedVariants[optionId] 
    });
  };
  
  const handleRequestInfo = (optionId: string) => {
    console.debug('[DatesPricing] requestInfo', { 
      optionId, 
      variant: selectedVariants[optionId] 
    });
  };
  
  return (
    <TooltipProvider>
      <div className="bg-white">
        <div className="container py-8">
          <h2 className="text-2xl font-bold mb-6">Dates & Pricing</h2>
          <p className="text-gray-600 mb-8">Select your preferred departure date to see available options.</p>

          {/* Month Filter Pills */}
          <div className="mb-6">
            <p className="text-sm font-medium mb-2">Select Month</p>
            <div className="flex flex-wrap gap-2">
              {MONTHS.map((month) => (
                <button
                  key={month.code}
                  disabled={!month.active}
                  onClick={() => month.active && handleMonthChange(month.code)}
                  className={cn(
                    "h-10 px-4 py-2 rounded-full text-sm font-medium transition-colors tracking-wide",
                    month.active && selectedMonth === month.code 
                      ? "bg-accent text-black" 
                      : month.active 
                        ? "bg-white border border-gray-200 hover:bg-gray-50" 
                        : "bg-gray-100 text-gray-300 cursor-not-allowed"
                  )}
                >
                  {month.code}
                </button>
              ))}
            </div>
          </div>

          {/* Trip Type Filters */}
          <div className="mb-8">
            <p className="text-sm font-medium mb-2">Trip Type</p>
            <div className="flex flex-wrap gap-2">
              {TRIP_TYPES.map((type) => (
                <label 
                  key={type.id}
                  htmlFor={`type-${type.id}`}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium cursor-pointer transition-all",
                    type.variant === 'solid-light' && "bg-gray-100 text-black",
                    type.variant === 'outline' && "bg-white border border-gray-200",
                    type.variant === 'rainbow' && "bg-white border-2 border-transparent",
                    type.variant === 'solid-primary' && "bg-primary text-white",
                    selectedTypes.includes(type.id) && "ring-2 ring-accent ring-offset-2"
                  )}
                  style={type.variant === 'rainbow' ? {
                    background: `linear-gradient(white, white) padding-box, 
                                linear-gradient(to right, #FF5A5F, #FF9966, #FFCD38, #5CFF87, #5BBEFF, #CD5FFE) border-box`
                  } : {}}
                >
                  <Checkbox 
                    id={`type-${type.id}`}
                    checked={selectedTypes.includes(type.id)}
                    onCheckedChange={() => handleTypeToggle(type.id)}
                    className="sr-only"
                  />
                  {type.label}
                </label>
              ))}
            </div>
          </div>

          {/* Departure Options */}
          <div className="space-y-4">
            {options.map((option) => (
              <Collapsible
                key={option.id}
                open={openOptionId === option.id}
                onOpenChange={() => toggleOption(option.id)}
                className="border rounded-md overflow-hidden"
              >
                <CollapsibleTrigger className="w-full">
                  <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-white hover:bg-gray-50">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8 text-left">
                      <div>
                        <div className="font-bold">
                          {format(option.startDate, 'EEEE')} {format(option.startDate, 'MMM d, yyyy')}
                        </div>
                        <div className="text-sm text-gray-500">
                          Depart
                        </div>
                      </div>
                      
                      <div>
                        <div className="font-bold">
                          {format(option.endDate, 'EEEE')} {format(option.endDate, 'MMM d, yyyy')}
                        </div>
                        <div className="text-sm text-gray-500">
                          Return
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        {option.types.slice(0, 1).map(type => {
                          const typeInfo = TRIP_TYPES.find(t => t.id === type);
                          return (
                            <Badge 
                              key={type}
                              variant={type === 'plus' ? 'default' : 'outline'}
                              className={type === 'plus' ? 'bg-gray-100 text-black' : ''}
                            >
                              {typeInfo?.label || type}
                            </Badge>
                          );
                        })}
                        
                        {option.types.length > 1 && (
                          <span className="text-xs text-gray-500">
                            +{option.types.length - 1} other
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2 md:mt-0">
                      <Button 
                        variant="secondary" 
                        className="flex items-center gap-1 ml-auto"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookByPhone(option.id);
                        }}
                      >
                        CALL US £{option.basePrice}
                      </Button>
                      
                      <div className="ml-4">
                        {openOptionId === option.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                    </div>
                  </div>
                </CollapsibleTrigger>
                
                <CollapsibleContent>
                  <Card className="border-t-0 rounded-t-none m-4 shadow-md">
                    <CardContent className="p-0">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
                        {/* Left Column - Variants & Timeline */}
                        <div className="lg:col-span-7">
                          {/* Variant Selector */}
                          <div className="mb-6">
                            <h3 className="text-lg font-bold mb-3">Select Room Type</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {option.variants.map(variant => (
                                <button
                                  key={variant.id}
                                  onClick={() => selectVariant(option.id, variant.id)}
                                  className={cn(
                                    "flex items-start justify-between border rounded-md p-4 text-left",
                                    selectedVariants[option.id] === variant.id
                                      ? "border-green-600 bg-green-50"
                                      : "border-gray-200 hover:border-gray-300"
                                  )}
                                >
                                  <div>
                                    <div className="font-medium">{variant.name}</div>
                                    <div className="text-xl font-bold mt-2">£{variant.price}</div>
                                  </div>
                                  
                                  {selectedVariants[option.id] === variant.id && (
                                    <div className="bg-green-600 rounded-full p-1">
                                      <Check className="h-4 w-4 text-white" />
                                    </div>
                                  )}
                                </button>
                              ))}
                            </div>
                          </div>
                          
                          {/* Itinerary Timeline */}
                          <div className="mb-6">
                            <h3 className="text-lg font-bold mb-3">Trip Itinerary</h3>
                            <div className="relative pl-6 border-l-2 border-gray-300 space-y-6">
                              <div className="relative">
                                <div className="absolute -left-[25px] mt-1 w-4 h-4 bg-black rounded-full"></div>
                                <div>
                                  <div className="font-bold">
                                    {format(option.startDate, 'd MMM').toUpperCase()} Trip Start – {format(option.startDate, 'EEEE')}, 18:00 (Local Time)
                                  </div>
                                  <div className="text-gray-600">Athens, Greece</div>
                                </div>
                              </div>
                              
                              <div className="relative">
                                <div className="absolute -left-[25px] mt-1 w-4 h-4 bg-black rounded-full"></div>
                                <div>
                                  <div className="font-bold">
                                    {format(option.endDate, 'd MMM').toUpperCase()} Trip End – {format(option.endDate, 'EEEE')}, 12:00 (Local Time)
                                  </div>
                                  <div className="text-gray-600">Athens, Greece</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Further Information */}
                          <div className="bg-blue-50 border-l-4 border-blue-400 rounded-md p-4">
                            <h4 className="text-sm font-medium text-blue-800">Further Information</h4>
                            <p className="text-sm text-blue-700 leading-relaxed">
                              The meeting point for this trip is at the designated hotel at 18:00.
                              Make sure to arrive with enough time to check in and get settled.
                            </p>
                          </div>
                        </div>
                        
                        {/* Right Column - Price Breakdown */}
                        <div className="lg:col-span-5">
                          <div className="bg-green-50 rounded-md p-6">
                            <h3 className="text-lg font-bold mb-4">Price Breakdown</h3>
                            
                            <div className="space-y-2 mb-4">
                              <div className="flex justify-between">
                                <span>Plus</span>
                                <span className="font-medium">£{option.basePrice}</span>
                              </div>
                              
                              {option.discount > 0 && (
                                <div className="flex justify-between text-green-700">
                                  <span className="flex items-center gap-1">
                                    <Tag size={14} />
                                    Total Savings
                                  </span>
                                  <span className="font-medium">£{option.discount}</span>
                                </div>
                              )}
                              
                              {option.discount > 0 && (
                                <div className="text-sm text-green-700 pl-5">
                                  {option.dealLabel}
                                </div>
                              )}
                            </div>
                            
                            <div className="border-t border-green-200 pt-4 mb-6">
                              <div className="flex justify-between text-xl font-bold">
                                <span>Total Price</span>
                                <span>£{option.basePrice}</span>
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              <Button
                                variant="secondary"
                                className="w-full"
                                onClick={() => handleBookByPhone(option.id)}
                              >
                                BOOK BY PHONE
                              </Button>
                              
                              <Button
                                variant="outline"
                                className="w-full border-secondary text-secondary hover:bg-secondary/10"
                                onClick={() => handleRequestInfo(option.id)}
                              >
                                REQUEST MORE INFO
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default TourDatesTab;
