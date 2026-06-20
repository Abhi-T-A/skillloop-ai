import axios from "axios";
import {
  API_BASE_URL,
  API_TIMEOUT,
  TOKEN_STORAGE_KEY,
  USER_STORAGE_KEY,
} from "../config/apiConfig";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

const getErrorMessage = (error) => {
  const payload = error?.response?.data;

  if (typeof payload === "string") {
    return payload;
  }

  return (
    payload?.message ||
    payload?.error ||
    payload?.title ||
    error?.message ||
    "Something went wrong. Please try again."
  );
};

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(USER_STORAGE_KEY);
      window.dispatchEvent(new Event("skillloop:unauthorized"));
    }

    error.userMessage = getErrorMessage(error);
    return Promise.reject(error);
  }
);

export default api;
