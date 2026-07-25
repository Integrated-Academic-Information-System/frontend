import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function TeacherHomeScreen() {
  useEffect(() => {
    const redirect = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const teacherStatus = await AsyncStorage.getItem("teacher_status");

        if (!token) {
          router.replace("/");
          return;
        }

        if (teacherStatus === "0") {
          router.replace("/(teacher)/(tabs)/subject-teacher/dashboard");
        } else if (teacherStatus === "1") {
          router.replace("/(teacher)/(tabs)/class-incharge/dashboard");
        } else {
          router.replace("/");
        }
      } catch (error) {
        console.error("Error in TeacherHomeScreen redirect:", error);
        router.replace("/");
      }
    };
    redirect();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#efeae4" }}>
      <ActivityIndicator size="large" color="#8f140e" />
    </View>
  );
}
