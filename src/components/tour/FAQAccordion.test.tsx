import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FAQAccordion from './FAQAccordion';

// Mock the accordion component
jest.mock('@/components/ui/accordion', () => {
  return {
    Accordion: ({ children }: { children: React.ReactNode }) => <div data-testid="accordion">{children}</div>,
    AccordionContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    AccordionItem: ({ children, value }: { children: React.ReactNode, value: string }) => (
      <div data-value={value}>{children}</div>
    ),
    AccordionTrigger: ({ children, className }: { children: React.ReactNode, className: string }) => (
      <button className={className}>{children}</button>
    ),
  };
});

describe('FAQAccordion', () => {
  const mockTripFAQs = [
    {
      question: 'What should I pack?',
      answer: 'Pack light and bring comfortable walking shoes.'
    }
  ];

  const mockGeneralFAQs = [
    {
      question: 'How do I book?',
      answer: 'You can book online or call our customer service.'
    }
  ];

  test('renders trip FAQs when provided', () => {
    render(<FAQAccordion tripFAQs={mockTripFAQs} generalFAQs={[]} />);
    
    expect(screen.getByText('Trip FAQs')).toBeInTheDocument();
    expect(screen.getByText('What should I pack?')).toBeInTheDocument();
  });

  test('renders general FAQs when provided', () => {
    render(<FAQAccordion tripFAQs={[]} generalFAQs={mockGeneralFAQs} />);
    
    expect(screen.getByText('General FAQs')).toBeInTheDocument();
    expect(screen.getByText('How do I book?')).toBeInTheDocument();
  });

  test('renders both sections when both are provided', () => {
    render(<FAQAccordion tripFAQs={mockTripFAQs} generalFAQs={mockGeneralFAQs} />);
    
    expect(screen.getByText('Trip FAQs')).toBeInTheDocument();
    expect(screen.getByText('General FAQs')).toBeInTheDocument();
  });

  test('handles empty arrays gracefully', () => {
    render(<FAQAccordion tripFAQs={[]} generalFAQs={[]} />);
    
    // Should not crash and accordion should still be present
    expect(screen.getByTestId('accordion')).toBeInTheDocument();
  });
});
