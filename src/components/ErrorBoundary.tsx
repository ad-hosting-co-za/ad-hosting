import React, { Component, ErrorInfo, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to your error reporting service
    this.props.onError?.(error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

interface ErrorFallbackProps {
  error: Error | null;
}

function ErrorFallback({ error }: ErrorFallbackProps) {
  const navigate = useNavigate();

  const handleRetry = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-red-500 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-400 mb-4">
            {error?.message || 'An unexpected error occurred'}
          </p>
          <div className="bg-card rounded-lg p-4 mb-6">
            <pre className="text-sm text-gray-300 overflow-auto">
              {error?.stack}
            </pre>
          </div>
          <div className="flex space-x-4 justify-center">
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={handleGoHome}
              className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary-dark transition-colors"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ErrorBoundary };
export type { Props as ErrorBoundaryProps, State as ErrorBoundaryState };

// Example usage:
// <ErrorBoundary
//   onError={(error, errorInfo) => {
//     // Log to error reporting service
//     console.error('Error caught by boundary:', error, errorInfo);
//   }}
//   fallback={<CustomErrorComponent />}
// >
//   <YourApp />
// </ErrorBoundary> 