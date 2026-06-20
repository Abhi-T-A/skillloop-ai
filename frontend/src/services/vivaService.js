import * as vivaApi from "../api/vivaApi";

export const createVivaSession = async (pdfId) => {
  return vivaApi.startViva(pdfId);
};

export const evaluateVivaSession = async (payload) => {
  return vivaApi.evaluateViva(payload);
};

export const fetchVivaHistory = async () => {
  return vivaApi.getVivaHistory();
};

export const fetchVivaAnalytics = async () => {
  return vivaApi.getVivaAnalytics();
};
