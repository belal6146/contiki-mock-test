import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TabNav from './TabNav';

describe('TabNav', () => {
  const mockTabs = [
    { id: 'tab1', label: 'Tab 1' },
    { id: 'tab2', label: 'Tab 2' },
    { id: 'tab3', label: 'Tab 3' },
  ];

  const mockChildren = <div>Tab Content</div>;

  test('renders all tabs', () => {
    render(<TabNav tabs={mockTabs}>{mockChildren}</TabNav>);
    
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
    expect(screen.getByText('Tab 3')).toBeInTheDocument();
  });

  test('first tab is active by default', () => {
    render(<TabNav tabs={mockTabs}>{mockChildren}</TabNav>);
    
    const firstTab = screen.getByRole('tab', { name: 'Tab 1' });
    expect(firstTab).toHaveAttribute('aria-selected', 'true');
  });

  test('clicking on a tab activates it', async () => {
    render(<TabNav tabs={mockTabs}>{mockChildren}</TabNav>);
    
    const secondTab = screen.getByText('Tab 2');
    const user = userEvent.setup();
    await user.click(secondTab);
    
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveAttribute('aria-selected', 'false');
  });

  test('renders correct tab panel', () => {
    render(<TabNav tabs={mockTabs}>{mockChildren}</TabNav>);
    
    const tabPanel = screen.getByRole('tabpanel');
    expect(tabPanel).toBeInTheDocument();
    expect(tabPanel).toHaveTextContent('Tab Content');
  });

  test('keyboard navigation works', async () => {
    render(<TabNav tabs={mockTabs}>{mockChildren}</TabNav>);
    
    const firstTab = screen.getByRole('tab', { name: 'Tab 1' });
    firstTab.focus();
    
    // Press right arrow key to move to next tab
    const user = userEvent.setup();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveAttribute('aria-selected', 'true');
    
    // Press right arrow key again to move to last tab
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Tab 3' })).toHaveAttribute('aria-selected', 'true');
    
    // Press right arrow key on last tab to loop back to first tab
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveAttribute('aria-selected', 'true');
    
    // Press left arrow key to move to last tab
    await user.keyboard('{ArrowLeft}');
    expect(screen.getByRole('tab', { name: 'Tab 3' })).toHaveAttribute('aria-selected', 'true');
  });

  test('calls onChange when tab is clicked', async () => {
    const handleChange = jest.fn();
    render(<TabNav tabs={mockTabs} onChange={handleChange}>{mockChildren}</TabNav>);
    
    const secondTab = screen.getByText('Tab 2');
    const user = userEvent.setup();
    await user.click(secondTab);
    
    expect(handleChange).toHaveBeenCalledWith('tab2');
  });

  test('external activeTab control works', () => {
    render(<TabNav tabs={mockTabs} activeTab="tab3">{mockChildren}</TabNav>);
    
    expect(screen.getByRole('tab', { name: 'Tab 3' })).toHaveAttribute('aria-selected', 'true');
  });
});
