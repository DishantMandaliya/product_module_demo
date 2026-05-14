import { useState } from 'react';
import { mockProducts } from '../data/mockProducts';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {

  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);

      if (item) {
        return JSON.parse(item);
      }

      // Load mock products if localStorage is empty
      if (key === 'products') {
        return mockProducts as unknown as T;
      }

      return initialValue;

    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);

      window.localStorage.setItem(
        key,
        JSON.stringify(valueToStore)
      );

    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}