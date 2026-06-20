import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { getErrorText } from "../utils/helpers";

const useApi = (apiFunction, options = {}) => {
  const { defaultData = null, immediate = false } = options;
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...params) => {
      setLoading(true);
      setError(null);

      try {
        const result = await apiFunction(...params);
        setData(result);
        return result;
      } catch (err) {
        setError(getErrorText(err));
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiFunction]
  );

  const reset = useCallback(() => {
    setData(defaultData);
    setError(null);
    setLoading(false);
  }, [defaultData]);

  useEffect(() => {
    if (immediate) {
      const timeoutId = window.setTimeout(() => {
        execute();
      }, 0);

      return () => window.clearTimeout(timeoutId);
    }
  }, [execute, immediate]);

  return {
    data,
    loading,
    error,
    execute,
    reset,
  };
};

export default useApi;
