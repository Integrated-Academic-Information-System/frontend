// hooks/useAuthGuard.ts
import { useEffect, useState } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAuthGuard = (requiredStatus?: string) => {
  const [teacherId, setTeacherId] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const role = await AsyncStorage.getItem("userRole");
        const tId = await AsyncStorage.getItem("teacherId");
        const teacherStatus = await AsyncStorage.getItem("teacherStatus");
        const userName = await AsyncStorage.getItem("userName");

        const logoutAndRedirect = async () => {
          await AsyncStorage.multiRemove([
            "authToken",
            "userName",
            "teacherStatus",
            "teacherId",
            "userRole",
          ]);
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