import api from "./axios";

export const startViva = async (pdfId) => {
  const response = await api.get(`/api/viva/start/${pdfId}`);
  return response.data;
};

export const evaluateViva = async (payload) => {
  const response = await api.post("/api/viva/evaluate", payload);
  return response.data;
};

export const getVivaHistory = async () => {
  const response = await api.get("/api/viva/history");
  return response.data;
};

export const getVivaAnalytics = async () => {
  const response = await api.get("/api/viva/analytics");
  return response.data;
};
