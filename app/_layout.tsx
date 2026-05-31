// app/_layout.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./global.css";

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [userRole, setUserRole] = useState<
    "admin" | "student" | "teacher" | null
  >(null);

  useEffect(() => {
    // Check if user is logged in and get their role on app startup
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const role = await AsyncStorage.getItem("userRole");

        if (token) {
          setIsLoggedIn(true);
          setUserRole((role as "admin" | "student" | "teacher") || "admin");
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  }, []);

  // Show nothing while checking auth
  if (isLoggedIn === null) {
    return null;
  }

  const initialRouteName = !isLoggedIn
    ? "index"
    : userRole === "admin"
      ? "(admin)/(tabs)"
      : userRole === "student"
        ? "(student)/(tabs)"
        : "(teacher)/(tabs)";

  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false, // disable for ALL screens
        }}
        initialRouteName={initialRouteName}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(admin)/(tabs)" />
        <Stack.Screen name="(student)/(tabs)" />
        <Stack.Screen name="(teacher)/(tabs)" />
      </Stack>
    </SafeAreaProvider>
  );
}
