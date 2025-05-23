
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
  writable: true,
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

// Mock IntersectionObserver
class IntersectionObserver {
  observe = jest.fn()
  disconnect = jest.fn()
  unobserve = jest.fn()
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
});

Object.defineProperty(global, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
});

// Mock Image constructor for tests
Object.defineProperty(global, 'Image', {
  writable: true,
  value: class {
    constructor() {
      setTimeout(() => {
        if (this.onload) this.onload();
      }, 100);
    }
    onload = null;
    onerror = null;
    src = '';
  }
});

// Console debugging suppression for tests
const originalConsoleDebug = console.debug;
console.debug = (...args) => {
  if (process.env.NODE_ENV === 'test' && args[0]?.includes('[')) {
    return; // Suppress debug logs in tests
  }
  originalConsoleDebug(...args);
};
