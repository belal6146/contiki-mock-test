
import React, { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ContikiButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
}

const ContikiButton: React.FC<ContikiButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  isLoading = false,
  className,
  disabled,
  ...props
}) => {
  const baseClasses = cn(
    'inline-flex items-center justify-center font-semibold tracking-wider uppercase transition-all duration-200 ease-in-out',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CCFF00]',
    'disabled:opacity-60 disabled:pointer-events-none disabled:cursor-not-allowed',
    'transform hover:scale-[1.02] active:scale-[0.98]',
    {
      'w-full': fullWidth,
    }
  );

  const variantClasses = {
    primary: cn(
      'bg-[#CCFF00] text-black hover:bg-[#bfff00] active:bg-[#adeb00]',
      'shadow-lg hover:shadow-xl',
      'border-2 border-[#CCFF00] hover:border-[#bfff00]'
    ),
    secondary: cn(
      'bg-black text-white hover:bg-gray-800 active:bg-gray-900',
      'shadow-lg hover:shadow-xl',
      'border-2 border-black hover:border-gray-800'
    ),
    outline: cn(
      'border-2 border-[#CCFF00] bg-transparent text-[#CCFF00]',
      'hover:bg-[#CCFF00] hover:text-black hover:border-[#CCFF00]',
      'active:bg-[#adeb00] active:border-[#adeb00]'
    ),
    ghost: cn(
      'bg-transparent text-gray-800 hover:bg-gray-100 active:bg-gray-200',
      'border-2 border-transparent'
    ),
    link: cn(
      'bg-transparent text-[#CCFF00] underline-offset-4 hover:underline',
      'border-2 border-transparent p-0'
    ),
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-xs rounded-md',
    md: 'px-6 py-3 text-sm rounded-lg',
    lg: 'px-8 py-4 text-base rounded-lg',
    xl: 'px-10 py-5 text-lg rounded-xl',
  };

  const isDisabled = disabled || isLoading;

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        {
          'cursor-wait': isLoading,
        },
        className
      )}
      disabled={isDisabled}
      style={{
        fontFamily: 'Montserrat, sans-serif',
        letterSpacing: '0.5px',
      }}
      {...props}
    >
      {isLoading && (
        <div 
          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"
          aria-hidden="true"
        />
      )}
      
      {icon && iconPosition === 'left' && !isLoading && (
        <span className="mr-2 transition-transform duration-150 ease-in-out">
          {icon}
        </span>
      )}
      
      <span className={cn({ 'opacity-0': isLoading })}>
        {children}
      </span>
      
      {icon && iconPosition === 'right' && !isLoading && (
        <span className="ml-2 transition-transform duration-150 ease-in-out">
          {icon}
        </span>
      )}
    </button>
  );
};

export default ContikiButton;
