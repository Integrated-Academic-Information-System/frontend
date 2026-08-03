// hooks/useAuthGuard.ts
import { useEffect, useState } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AUTH_STORAGE_KEYS = [
  "authToken",
  "userName",
  "teacher_name",
  "teacher_username",
  "teacher_email",
  "teacher_mobile",
  "teacher_status",
  "teacher_id",
  "userRole",
];

export const useAuthGuard = (requiredStatus?: string) => {
  const [teacherId, setTeacherId] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const role = await AsyncStorage.getItem("userRole");
        const tId = await AsyncStorage.getItem("teacher_id");
        const teacherStatus = await AsyncStorage.getItem("teacher_status");
        const userName = await AsyncStorage.getItem("userName");

        const logoutAndRedirect = async () => {
          console.log("[useAuthGuard] logoutAndRedirect fired");
          await AsyncStorage.multiRemove(AUTH_STORAGE_KEYS);
          router.replace("/");
        };

        if (!token) {
          await logoutAndRedirect();
          return;
        }

        const isTeacher =
          role === "teacher" ||
          (userName &&
            (userName.toLowerCase().includes("teacher") ||
              userName.toLowerCase().includes("ct_"))) ||
          teacherStatus === "0" ||
          teacherStatus === "1";

        if (isTeacher) {
          if (!tId) {
            await logoutAndRedirect();
            return;
          }
          if (requiredStatus !== undefined && teacherStatus !== requiredStatus) {
            await logoutAndRedirect();
            return;
          }
          setTeacherId(tId);
        }
      } catch (error) {
        router.replace("/");
      }
    };
    checkAuth();
  }, []);

  return { teacherId };
};