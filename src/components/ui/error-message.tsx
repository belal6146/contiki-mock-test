
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title = "Something went wrong",
  message = "We encountered an error while loading this content. Please try again.",
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-6 bg-white rounded-md shadow-sm border border-red-100 min-h-[200px]">
      <div className="text-red-500 mb-4">
        <AlertCircle className="h-12 w-12 mx-auto" />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md">{message}</p>
      {onRetry && (
        <Button 
          onClick={onRetry}
          variant="outline"
          className="border-red-200 hover:bg-red-50"
          aria-label="Retry loading content"
        >
          Try Again
        </Button>
      )}
    </div>
  );
};

export default ErrorMessage;
