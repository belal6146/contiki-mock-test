
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    // You could also log to an error reporting service here
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback || (
        <div className="min-h-[400px] flex flex-col items-center justify-center text-center px-4 py-16 bg-bgLight">
          <h2 className="text-2xl font-bold text-primary mb-4">Something went wrong</h2>
          <p className="text-gray-700 mb-8">
            We're sorry, but there was an error loading this content.
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="btn-primary px-4 py-2"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
