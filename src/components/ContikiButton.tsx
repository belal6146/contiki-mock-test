
import React, { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ContikiButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const ContikiButton: React.FC<ContikiButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  className,
  ...props
}) => {
  const variantClasses = {
    primary: 'bg-black text-white hover:bg-black/90',
    secondary: 'bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90',
    accent: 'bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90',
    outline: 'border border-black text-black hover:bg-black hover:text-white',
    ghost: 'text-black hover:bg-[#CCFF00]/10',
  };

  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium',
        'transition-all duration-150 ease-in-out',
        'focus:outline-none focus:ring-2 focus:ring-[#CCFF00] focus:ring-offset-2',
        'disabled:opacity-50 disabled:pointer-events-none',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        className
      )}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export default ContikiButton;
