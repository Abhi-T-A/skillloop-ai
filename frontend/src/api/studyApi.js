import api from "./axios";

export const generateStudyGuide = async (payload) => {
  const response = await api.post("/api/study/generate", payload);
  return response.data;
};

export const getStudyHistory = async () => {
  const response = await api.get("/api/study/history");
  return response.data;
};
