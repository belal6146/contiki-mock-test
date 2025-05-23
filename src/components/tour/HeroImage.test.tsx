
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import HeroImage from './HeroImage';

// Mock analytics
jest.mock('@/lib/analytics', () => ({
  trackEvent: jest.fn(),
}));

// Define a custom type to handle the Image mock properly
interface MockImage {
  onload: () => void;
  onerror: () => void;
  src: string;
}

// Mock the Image constructor with a proper TypeScript implementation
const originalImage = global.Image;
global.Image = function() {
  const mockImage = {
    onload: () => {},
    onerror: () => {},
    src: '',
  } as MockImage;
  
  // Use setTimeout to simulate async image loading
  setTimeout(() => {
    mockImage.onload();
  }, 100);
  
  return mockImage;
} as unknown as typeof global.Image;

describe('HeroImage', () => {
  const defaultProps = {
    imageUrl: 'https://example.com/image.jpg',
    title: 'Test Title',
    subtitle: 'Test Subtitle',
  };

  test('renders loading state initially', () => {
    render(<HeroImage {...defaultProps} />);
    
    // Loading spinner should be visible
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('renders content after image loads', async () => {
    jest.useFakeTimers();
    render(<HeroImage {...defaultProps} />);
    
    // Fast forward time to trigger image onload
    act(() => {
      jest.advanceTimersByTime(200);
    });
    
    // Title and subtitle should be visible
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
    
    // Loading spinner should be gone
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    
    jest.useRealTimers();
  });

  test('applies proper accessible attributes', () => {
    render(<HeroImage {...defaultProps} />);
    
    // Check aria-label
    const heroSection = screen.getByRole('img');
    expect(heroSection).toHaveAttribute('aria-label', 'Hero image: Test Title');
  });

  test('handles missing props gracefully', () => {
    render(<HeroImage imageUrl="" title="" subtitle="" />);
    
    // Should render a skeleton loader
    expect(screen.getByTestId('hero-skeleton')).toBeInTheDocument();
  });

  test('renders fallback image when imageUrl is empty', async () => {
    jest.useFakeTimers();
    render(<HeroImage imageUrl="" title="Test Title" subtitle="Test Subtitle" />);
    
    // Fast forward time to trigger image onload
    act(() => {
      jest.advanceTimersByTime(200);
    });
    
    // Content should still render
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    
    jest.useRealTimers();
  });

  test('renders with parallax effect container', () => {
    render(<HeroImage {...defaultProps} />);
    
    // Check for the parallax container
    const container = document.querySelector('.transition-transform');
    expect(container).toBeInTheDocument();
  });
  
  // Restore the original Image constructor after tests
  afterAll(() => {
    global.Image = originalImage;
  });
});
