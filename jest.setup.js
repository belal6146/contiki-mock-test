
import '@testing-library/jest-dom';

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
