import {
  getDashboardData,
} from "../api/dashboardApi";

export const fetchDashboard = async () => {
  return getDashboardData();
};
