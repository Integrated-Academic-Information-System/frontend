import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface StudentProfile {
  name: string;
  reg_no: string;
  grade: string;
  dob: string;
  address: string;
  mobile_number: string;
  email: string;
  core_subjects: { id: number; name: string; subject_code: string }[];
  bucket_subjects: { id: number; name: string; subject_code: string }[];
}

// ✅ This function must also be in the file
export function useStudentProfile() {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      setLoading(true);
      setError(null);

      const token = await AsyncStorage.getItem("authToken");
      if (!token) throw new Error("No token found");

      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/student/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Failed to load profile");
      }

      const data: StudentProfile = await response.json();
      setProfile(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return { profile, loading, error, refetch: fetchProfile };
}