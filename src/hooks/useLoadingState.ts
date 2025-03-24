import { useState, useCallback } from 'react';

interface LoadingState {
  [key: string]: boolean;
}

export function useLoadingState(initialStates: string[] = []) {
  const [loadingStates, setLoadingStates] = useState<LoadingState>(
    initialStates.reduce((acc, state) => ({ ...acc, [state]: false }), {})
  );

  const startLoading = useCallback((key: string) => {
    setLoadingStates(prev => ({ ...prev, [key]: true }));
  }, []);

  const stopLoading = useCallback((key: string) => {
    setLoadingStates(prev => ({ ...prev, [key]: false }));
  }, []);

  const isLoading = useCallback((key: string) => {
    return loadingStates[key] || false;
  }, [loadingStates]);

  const withLoading = useCallback(async <T>(
    key: string,
    operation: () => Promise<T>
  ): Promise<T> => {
    try {
      startLoading(key);
      return await operation();
    } finally {
      stopLoading(key);
    }
  }, [startLoading, stopLoading]);

  return {
    loadingStates,
    startLoading,
    stopLoading,
    isLoading,
    withLoading
  };
}

// Example usage:
// const { isLoading, withLoading } = useLoadingState(['submit', 'fetch']);
//
// const handleSubmit = async () => {
//   await withLoading('submit', async () => {
//     await submitForm();
//   });
// };
//
// return (
//   <button disabled={isLoading('submit')}>
//     {isLoading('submit') ? 'Submitting...' : 'Submit'}
//   </button>
// ); 