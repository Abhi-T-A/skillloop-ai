import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { login, register } from "../services/authService";
import { fetchDashboard } from "../services/dashboardService";
import {
  fetchPdfHistory,
  fetchPdfQuestions,
  requestPdfQuestions,
  uploadPdfFile,
} from "../services/pdfService";
import {
  fetchStudyHistory,
  requestStudyGuide,
} from "../services/studyService";
import {
  createVivaSession,
  evaluateVivaSession,
  fetchVivaAnalytics,
  fetchVivaHistory,
} from "../services/vivaService";

export const queryKeys = {
  dashboard: ["dashboard"],
  studyHistory: ["study-history"],
  pdfHistory: ["pdf-history"],
  pdfQuestions: (pdfId) => ["pdf-questions", pdfId],
  vivaHistory: ["viva-history"],
  vivaAnalytics: ["viva-analytics"],
  vivaSession: (pdfId) => ["viva-session", pdfId],
};

export const useDashboardQuery = () =>
  useQuery({
    queryKey: queryKeys.dashboard,
    queryFn: fetchDashboard,
  });

export const useStudyHistoryQuery = () =>
  useQuery({
    queryKey: queryKeys.studyHistory,
    queryFn: fetchStudyHistory,
  });

export const useStudyGuideMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: requestStudyGuide,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.studyHistory });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard });
    },
  });
};

export const usePdfHistoryQuery = () =>
  useQuery({
    queryKey: queryKeys.pdfHistory,
    queryFn: fetchPdfHistory,
  });

export const usePdfUploadMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ formData, onUploadProgress }) => uploadPdfFile(formData, { onUploadProgress }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pdfHistory });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard });
    },
  });
};

export const usePdfQuestionMutation = () =>
  useMutation({
    mutationFn: requestPdfQuestions,
  });

export const usePdfQuestionsQuery = (pdfId, enabled = true) =>
  useQuery({
    queryKey: queryKeys.pdfQuestions(pdfId),
    queryFn: () => fetchPdfQuestions(pdfId),
    enabled: Boolean(pdfId) && enabled,
  });

export const useVivaHistoryQuery = () =>
  useQuery({
    queryKey: queryKeys.vivaHistory,
    queryFn: fetchVivaHistory,
  });

export const useVivaAnalyticsQuery = () =>
  useQuery({
    queryKey: queryKeys.vivaAnalytics,
    queryFn: fetchVivaAnalytics,
  });

export const useVivaSessionMutation = () =>
  useMutation({
    mutationFn: createVivaSession,
  });

export const useEvaluateVivaMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: evaluateVivaSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.vivaHistory });
      queryClient.invalidateQueries({ queryKey: queryKeys.vivaAnalytics });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard });
    },
  });
};

export const useAuthLoginMutation = () =>
  useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
  });

export const useAuthRegisterMutation = () =>
  useMutation({
    mutationFn: register,
  });
