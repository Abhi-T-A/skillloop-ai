import {
  useCallback,
  useEffect,
  useMemo,
} from "react";

import * as authService from "../services/authService";
import {
  TOKEN_STORAGE_KEY,
  USER_STORAGE_KEY,
} from "../config/apiConfig";
import AuthContext from "./auth-context-core";
import useLocalStorage from "../hooks/useLocalStorage";

export const AuthProvider = ({
  children,
}) => {
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_KEY, null);
  const [user, setUser] = useLocalStorage(USER_STORAGE_KEY, null);
  const loading = false;

  useEffect(() => {
    const handleUnauthorized = () => {
      setToken(null);
      setUser(null);
    };

    window.addEventListener("skillloop:unauthorized", handleUnauthorized);

    return () => {
      window.removeEventListener("skillloop:unauthorized", handleUnauthorized);
    };
  }, [setToken, setUser]);

  const login = useCallback(
    async (email, password) => {
      const response = await authService.login({
        email,
        password,
      });

      setToken(response.token);
      setUser(response.user);

      return response;
    },
    [setToken, setUser]
  );

  const register = useCallback(async (payload) => {
    return authService.register(payload);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
  }, [setToken, setUser]);

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      login,
      logout,
      register,
      isAuthenticated: Boolean(token && user),
    }),
    [loading, login, logout, register, token, user]
  );

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
};
