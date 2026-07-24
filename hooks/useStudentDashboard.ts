import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type PerformanceItem = {
  subject: string;
  subject_code: string;
  score: number;
};

type NotificationItem = {
  id: number;
  title: string;
  body: string;
  read: boolean;
  created_at: string;
};

type DashboardData = {
  academic_standing: number;
  class_rank: string | null;
  standing_label: string | null;
  recent_performance: PerformanceItem[];
  notifications: NotificationItem[];
};

export function useStudentDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await AsyncStorage.getItem("authToken");
      const res = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/student/dashboard`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Failed to load dashboard");
      setData(json);
    } catch (e: any) {
      setError(e.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return { data, loading, error, refetch: fetchDashboard };
}