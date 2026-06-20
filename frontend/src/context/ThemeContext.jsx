import { useCallback, useEffect, useMemo } from "react";

import { THEME_STORAGE_KEY } from "../config/apiConfig";
import ThemeContext from "./theme-context-core";
import useLocalStorage from "../hooks/useLocalStorage";

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage(THEME_STORAGE_KEY, "light");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  }, [setTheme]);

  const value = useMemo(
    () => ({
      darkMode: theme === "dark",
      theme,
      setTheme,
      toggleTheme,
    }),
    [setTheme, theme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
