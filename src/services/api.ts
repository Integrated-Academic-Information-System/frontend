import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Base URL of your Laravel backend
const BASE_URL = "http://127.0.0.1:8000/api";

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Automatically attach token to every request
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// AUTH
export const loginApi = (email: string, password: string) =>
  api.post("/auth/login", { email, password });

export const logoutApi = () =>
  api.post("/auth/logout");

export const getMeApi = () =>
  api.get("/auth/me");

// STUDENTS
export const getStudentsApi = (params?: {
  grade_id?: number;
  search?: string;
}) => api.get("/students", { params });

export const getStudentByIdApi = (id: number) =>
  api.get(`/students/${id}`);

// MARKS
export const getMarksApi = (params: {
  grade_id: number;
  subject_id: number;
  term_id: number;
  academic_year_id: number;
}) => api.get("/marks", { params });

export const submitMarksApi = (data: {
  subject_id: number;
  term_id: number;
  academic_year_id: number;
  marks: { student_id: number; marks: number }[];
}) => api.post("/marks/submit", data);

export const getStudentResultsApi = (studentId: number) =>
  api.get(`/results/${studentId}`);

// ALERTS
export const getAlertsApi = () =>
  api.get("/alerts");

export const createAlertApi = (data: {
  title: string;
  message: string;
  role_target: string;
}) => api.post("/alerts", data);

// NOTIFICATIONS
export const getNotificationsApi = () =>
  api.get("/notifications");

export const markNotificationReadApi = (id: number) =>
  api.put(`/notifications/${id}/read`);

export const markAllNotificationsReadApi = () =>
  api.put("/notifications/read-all");

// DROPDOWNS
export const getGradesApi = () =>
  api.get("/grades");

export const getSubjectsApi = (grade_id?: number) =>
  api.get("/subjects", { params: { grade_id } });

export const getTermsApi = () =>
  api.get("/terms");

export const getAcademicYearsApi = () =>
  api.get("/academic-years");

// REPORTS
export const generateReportApi = (data: {
  grade_id: number;
  term_id: number;
  academic_year_id: number;
}) => api.post("/reports/generate", data);

export default api;