import { useEffect } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAuthGuard = (requiredStatus?: string) => {
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const userName = await AsyncStorage.getItem("userName");
        const teacherStatus = await AsyncStorage.getItem("teacherStatus");

        // No token → redirect to login
        if (!token || !userName) {
          router.replace("/");
          return;
        }

        // If requiredStatus provided, check teacher role
        if (requiredStatus !== undefined && teacherStatus !== requiredStatus) {
          router.replace("/");
          return;
        }

      } catch (error) {
        console.error("Auth guard error:", error);
        router.replace("/");
      }
    };

    checkAuth();
  }, []);
};