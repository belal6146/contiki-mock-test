
import '@testing-library/jest-dom';

// Make sure custom matchers are available globally
import { toBeInTheDocument, toHaveAttribute, toHaveTextContent } from '@testing-library/jest-dom/matchers';

// Explicitly extend Jest's expect
expect.extend({ 
  toBeInTheDocument,
  toHaveAttribute,
  toHaveTextContent,
  // Add all other matchers explicitly
  toBeDisabled: require('@testing-library/jest-dom').toBeDisabled,
  toBeEnabled: require('@testing-library/jest-dom').toBeEnabled,
  toBeEmpty: require('@testing-library/jest-dom').toBeEmpty,
  toBeInvalid: require('@testing-library/jest-dom').toBeInvalid,
  toBeRequired: require('@testing-library/jest-dom').toBeRequired,
  toBeValid: require('@testing-library/jest-dom').toBeValid,
  toContainElement: require('@testing-library/jest-dom').toContainElement,
  toHaveClass: require('@testing-library/jest-dom').toHaveClass,
  toHaveFocus: require('@testing-library/jest-dom').toHaveFocus,
  toHaveFormValues: require('@testing-library/jest-dom').toHaveFormValues,
  toHaveStyle: require('@testing-library/jest-dom').toHaveStyle,
  toHaveValue: require('@testing-library/jest-dom').toHaveValue
});

// Add required browser mocks
Object.defineProperty(window, 'matchMedia', {
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
