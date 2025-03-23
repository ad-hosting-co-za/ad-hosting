import { useEffect } from 'react';

/**
 * A hook to set the document title
 * @param title The title to set
 */
export const useDocumentTitle = (title: string) => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;
    
    // Restore the previous title when the component unmounts
    return () => {
      document.title = previousTitle;
    };
  }, [title]);
}; 