export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"
).replace(/\/$/, "");

export const API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT || 30000);

export const TOKEN_STORAGE_KEY = "skillloop_token";
export const USER_STORAGE_KEY = "skillloop_user";
export const THEME_STORAGE_KEY = "skillloop_theme";

export default API_BASE_URL;
