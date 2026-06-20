import * as pdfApi from "../api/pdfApi";

export const uploadPdfFile = async (formData) => {
  return pdfApi.uploadPdf(formData);
};

export const fetchPdfHistory = async () => {
  return pdfApi.getPdfHistory();
};

export const requestPdfQuestions = async (pdfId) => {
  return pdfApi.generatePdfQuestions(pdfId);
};

export const fetchPdfQuestions = async (pdfId) => {
  return pdfApi.getPdfQuestions(pdfId);
};
