import api from "./axios";

export const uploadPdf = async (formData) => {
  const response = await api.post("/api/pdf/upload", formData);
  return response.data;
};

export const getPdfHistory = async () => {
  const response = await api.get("/api/pdf/history");
  return response.data;
};

export const generatePdfQuestions = async (pdfId) => {
  const response = await api.post(`/api/pdf/generate-questions/${pdfId}`);
  return response.data;
};

export const getPdfQuestions = async (pdfId) => {
  const response = await api.get(`/api/pdf/questions/${pdfId}`);
  return response.data;
};
