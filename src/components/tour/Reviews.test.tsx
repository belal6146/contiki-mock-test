
import React from 'react';
import { render, screen, userEvent } from '@/test-utils';
import Reviews from './Reviews';

// Mock the select component
jest.mock('@/components/ui/select', () => {
  return {
    Select: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    SelectContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    SelectItem: ({ value, children }: { value: string, children: React.ReactNode }) => (
      <option value={value}>{children}</option>
    ),
    SelectTrigger: ({ children, className, 'aria-label': ariaLabel }: { 
      children: React.ReactNode, 
      className: string, 
      'aria-label': string 
    }) => (
      <button aria-label={ariaLabel} className={className}>{children}</button>
    ),
    SelectValue: ({ placeholder }: { placeholder: string }) => <span>{placeholder}</span>,
  };
});

// Mock the button component
jest.mock('@/components/ui/button', () => {
  return {
    Button: ({ children, onClick, className }: { 
      children: React.ReactNode, 
      onClick: () => void, 
      className: string 
    }) => (
      <button onClick={onClick} className={className}>{children}</button>
    ),
  };
});

describe('Reviews', () => {
  test('renders reviews section', () => {
    render(<Reviews tripId="123" />);
    
    // Check sort and filter controls
    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(screen.getByText('Filter reviews')).toBeInTheDocument();
    
    // Check that reviews are rendered
    expect(screen.getByText("John O'Connor")).toBeInTheDocument();
    expect(screen.getByText("Maria Garcia")).toBeInTheDocument();
  });

  test('initially shows limited number of reviews', () => {
    render(<Reviews tripId="123" />);
    
    // Only first two reviews should be visible
    expect(screen.getByText("John O'Connor")).toBeInTheDocument();
    expect(screen.getByText("Maria Garcia")).toBeInTheDocument();
    expect(screen.queryByText("David Kim")).not.toBeInTheDocument();
    
    // Load more button should be visible
    expect(screen.getByText("Load More Reviews")).toBeInTheDocument();
  });

  test('clicking load more shows additional reviews', async () => {
    render(<Reviews tripId="123" />);
    
    // Click load more button
    const user = userEvent.setup();
    await user.click(screen.getByText("Load More Reviews"));
    
    // Third review should now be visible
    expect(screen.getByText("David Kim")).toBeInTheDocument();
    
    // All three reviews should be visible
    expect(screen.getByText("John O'Connor")).toBeInTheDocument();
    expect(screen.getByText("Maria Garcia")).toBeInTheDocument();
    expect(screen.getByText("David Kim")).toBeInTheDocument();
    
    // Load more button should be hidden
    expect(screen.queryByText("Load More Reviews")).not.toBeInTheDocument();
  });

  test('renders support replies when available', () => {
    render(<Reviews tripId="123" />);
    
    // Check for reply on first review
    expect(screen.getByText("Maria from Contiki")).toBeInTheDocument();
    
    // Second review should not have a reply
    const mariaReview = screen.getByText("Maria Garcia").closest('div');
    expect(mariaReview).not.toContain(screen.queryByText("Thomas from Contiki"));
  });

  test('truncates long reviews', () => {
    render(<Reviews tripId="123" />);
    
    // Check that the long reviews have the "Read more" button
    expect(screen.getAllByText("Read more").length).toBeGreaterThan(0);
  });
});
