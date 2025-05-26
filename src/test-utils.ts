
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Re-export all testing utilities from a single location
export {
  render,
  screen,
  fireEvent,
  act,
  userEvent
};

// Custom render function for components that need providers
export const renderWithProviders = (ui: React.ReactElement, options = {}) => {
  return render(ui, options);
};

// Helper for async user interactions
export const setupUser = () => userEvent.setup();
