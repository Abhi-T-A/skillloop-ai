import { useCallback, useState } from "react";

const readStoredValue = (key, initialValue) => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch {
    return initialValue;
  }
};

export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() =>
    readStoredValue(key, initialValue)
  );

  const setValue = useCallback(
    (value) => {
      setStoredValue((currentValue) => {
        const nextValue =
          value instanceof Function ? value(currentValue) : value;

        if (nextValue === null || nextValue === undefined) {
          window.localStorage.removeItem(key);
        } else {
          window.localStorage.setItem(key, JSON.stringify(nextValue));
        }

        return nextValue;
      });
    },
    [key]
  );

  return [storedValue, setValue];
}
