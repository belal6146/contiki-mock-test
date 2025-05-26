
import React from 'react';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import FAQAccordion from './FAQAccordion';

// Mock the accordion component since it depends on Radix UI
jest.mock('@/components/ui/accordion', () => {
  return {
    Accordion: ({ children }: { children: React.ReactNode }) => <div data-testid="accordion">{children}</div>,
    AccordionItem: ({ children, value }: { children: React.ReactNode, value: string }) => (
      <div data-testid={`accordion-item-${value}`}>{children}</div>
    ),
    AccordionTrigger: ({ children }: { children: React.ReactNode }) => (
      <button data-testid="accordion-trigger">{children}</button>
    ),
    AccordionContent: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="accordion-content">{children}</div>
    ),
  };
});

describe('FAQAccordion', () => {
  const mockGeneralFAQs = [
    {
      question: "What is Contiki?",
      answer: "Contiki is a travel company that specializes in group tours for 18-35 year olds."
    },
    {
      question: "Why 18-35?",
      answer: "Our trips are designed specifically for young travelers looking for authentic experiences."
    }
  ];
  
  const mockTripFAQs = [
    {
      question: "Can I book online?",
      answer: "Yes, you can book your Contiki trip online through our website."
    },
    {
      question: "What's included?",
      answer: "Your trip includes accommodation, transportation, many meals, and a professional Trip Manager."
    }
  ];

  test('renders general FAQs section', () => {
    render(<FAQAccordion generalFAQs={mockGeneralFAQs} tripFAQs={[]} />);
    
    expect(screen.getByText('General FAQs')).toBeInTheDocument();
    expect(screen.getByText('What is Contiki?')).toBeInTheDocument();
    expect(screen.getByText('Why 18-35?')).toBeInTheDocument();
  });

  test('renders trip FAQs section', () => {
    render(<FAQAccordion generalFAQs={[]} tripFAQs={mockTripFAQs} />);
    
    expect(screen.getByText('Trip FAQs')).toBeInTheDocument();
    expect(screen.getByText('Can I book online?')).toBeInTheDocument();
    expect(screen.getByText("What's included?")).toBeInTheDocument();
  });

  test('renders both sections when both props are provided', () => {
    render(<FAQAccordion generalFAQs={mockGeneralFAQs} tripFAQs={mockTripFAQs} />);
    
    expect(screen.getByText('General FAQs')).toBeInTheDocument();
    expect(screen.getByText('Trip FAQs')).toBeInTheDocument();
  });

  test('does not render general FAQs section when empty array is provided', () => {
    render(<FAQAccordion generalFAQs={[]} tripFAQs={mockTripFAQs} />);
    
    expect(screen.queryByText('General FAQs')).not.toBeInTheDocument();
    expect(screen.getByText('Trip FAQs')).toBeInTheDocument();
  });

  test('does not render trip FAQs section when empty array is provided', () => {
    render(<FAQAccordion generalFAQs={mockGeneralFAQs} tripFAQs={[]} />);
    
    expect(screen.getByText('General FAQs')).toBeInTheDocument();
    expect(screen.queryByText('Trip FAQs')).not.toBeInTheDocument();
  });

  test('accordion triggers are rendered correctly', () => {
    render(<FAQAccordion generalFAQs={mockGeneralFAQs} tripFAQs={mockTripFAQs} />);
    
    const triggers = screen.getAllByTestId('accordion-trigger');
    expect(triggers.length).toBe(mockGeneralFAQs.length + mockTripFAQs.length);
  });

  test('accordion content is rendered correctly', () => {
    render(<FAQAccordion generalFAQs={mockGeneralFAQs} tripFAQs={mockTripFAQs} />);
    
    const contents = screen.getAllByTestId('accordion-content');
    expect(contents.length).toBe(mockGeneralFAQs.length + mockTripFAQs.length);
  });
});
