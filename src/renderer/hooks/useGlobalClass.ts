import React from 'react';
export function useGlobalClass(className: string, target = document.body) {
  React.useEffect(() => {
    if (className) {
      target.classList.add(className);
    }
    return () => {
      if (className) {
        target.classList.remove(className);
      }
    };
  }, [className]);
}
