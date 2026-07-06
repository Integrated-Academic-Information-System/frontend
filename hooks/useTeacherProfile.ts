import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface TeacherProfile {
  name: string;
  user_name: string;
  email: string;
  mobile_number: string;
  role: string;      // "Class Teacher" or "Subject Teacher"
  teacher_id: string;
}

export function useTeacherProfile() {
  const [profile, setProfile] = useState<TeacherProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      setLoading(true);
      setError(null);

      const [name, user_name, email, mobile_number, teacher_status, teacher_id] =
        await AsyncStorage.multiGet([
          "teacher_name",
          "teacher_username",
          "teacher_email",
          "teacher_mobile",
          "teacher_status",
          "teacher_id",
        ]);

      // Check all required keys are present
      if (!name[1] || !email[1]) {
        throw new Error("Profile data not found. Please log in again.");
      }

      setProfile({
        name:          name[1],
        user_name:     user_name[1] ?? "",
        email:         email[1],
        mobile_number: mobile_number[1] ?? "",
        role:          teacher_status[1] === "1" ? "Class Teacher" : "Subject Teacher",
        teacher_id:    teacher_id[1] ?? "",
      });

    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  // Call this after a successful profile update to sync local state
  function updateLocalProfile(updated: { email: string; mobile_number: string }) {
    setProfile((prev) =>
      prev ? { ...prev, email: updated.email, mobile_number: updated.mobile_number } : prev
    );
    // Also update AsyncStorage so it persists across navigations
    AsyncStorage.multiSet([
      ["teacher_email",  updated.email],
      ["teacher_mobile", updated.mobile_number],
    ]);
  }

  return { profile, loading, error, updateLocalProfile };
}