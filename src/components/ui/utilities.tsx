
import React from 'react';
import { cn } from '@/lib/utils';

// Card base component for consistent card styling
export const CardBase = React.memo<{
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined';
}>(({ children, className, variant = 'default' }) => {
  const baseClasses = 'bg-white rounded-xl overflow-hidden transition-all duration-300';
  
  const variantClasses = {
    default: 'shadow-md hover:shadow-xl',
    elevated: 'shadow-lg hover:shadow-2xl transform hover:-translate-y-1',
    outlined: 'border border-gray-200 hover:border-gray-300'
  };

  return (
    <div className={cn(baseClasses, variantClasses[variant], className)}>
      {children}
    </div>
  );
});

CardBase.displayName = 'CardBase';

// Button utility classes
export const buttonClasses = (variant: 'primary' | 'secondary' | 'outline' = 'primary', size: 'sm' | 'md' | 'lg' = 'md') => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-[#FF6900] text-white hover:bg-[#e65c00] focus:ring-[#FF6900]',
    secondary: 'bg-[#CCFF00] text-black hover:bg-[#b8e600] focus:ring-[#CCFF00]',
    outline: 'border-2 border-[#FF6900] text-[#FF6900] hover:bg-[#FF6900] hover:text-white'
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  return cn(baseClasses, variantClasses[variant], sizeClasses[size]);
};

// Container utility component
export const Container = React.memo<{
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}>(({ children, className, size = 'lg' }) => {
  const sizeClasses = {
    sm: 'max-w-4xl',
    md: 'max-w-6xl', 
    lg: 'max-w-7xl',
    xl: 'max-w-screen-2xl'
  };
  
  return (
    <div className={cn('mx-auto px-4 sm:px-6 lg:px-8', sizeClasses[size], className)}>
      {children}
    </div>
  );
});

Container.displayName = 'Container';

// Grid utility component
export const Grid = React.memo<{
  children: React.ReactNode;
  className?: string;
  cols?: 1 | 2 | 3 | 4 | 6;
  gap?: 'sm' | 'md' | 'lg';
}>(({ children, className, cols = 3, gap = 'md' }) => {
  const colsClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6'
  };
  
  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8'
  };
  
  return (
    <div className={cn('grid', colsClasses[cols], gapClasses[gap], className)}>
      {children}
    </div>
  );
});

Grid.displayName = 'Grid';
