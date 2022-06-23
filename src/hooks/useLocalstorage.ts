import React from 'react';

export default function useLocalStorage<T>(
  key: string,
  initialValueGetter: () => T
): [T, (newValue: T | ((prevState: T) => T)) => void] {
  const readValue = React.useCallback((): T => {
    if (typeof window === 'undefined') {
      return initialValueGetter();
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValueGetter();
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return initialValueGetter();
    }
  }, [initialValueGetter, key]);

  const [storedValue, setStoredValue] = React.useState<T>(readValue);

  const isCallback = React.useCallback(
    (maybeFunction: T | ((prevState: T) => T)): maybeFunction is (prevState: T) => T =>
      typeof maybeFunction === 'function',
    []
  );

  const setValue = React.useCallback(
    (newValue: T | ((prevState: T) => T)) => {
      if (typeof window == 'undefined') {
        console.warn(`Tried setting localStorage key “${key}”, but window is undefined.`);
      }

      try {
        const finalNewValue = isCallback(newValue) ? newValue(storedValue) : newValue;
        window.localStorage.setItem(key, JSON.stringify(finalNewValue));
        setStoredValue(finalNewValue);
      } catch (error) {
        console.warn(`Error writing localStorage key “${key}”:`, error);
      }
    },
    [key, storedValue, isCallback]
  );

  return [storedValue, setValue];
}
