import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./global.css";

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");

        // If token is a dummy dev token, clear it
        if (token && token.startsWith("dev_token_")) {
          await AsyncStorage.clear();
          setIsLoggedIn(false);
        } else if (token) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
      } finally {
        setIsReady(true);
      }
    };
    checkAuth();
  }, []);

  if (!isReady) return null;

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <Stack.Screen name="(admin)" />
        ) : (
          <Stack.Screen name="index" />
        )}
      </Stack>
    </SafeAreaProvider>
  );
}
