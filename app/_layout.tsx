// app/_layout.tsx
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./global.css";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(admin)/(tabs)" />
        <Stack.Screen name="(student)/(tabs)" />
        <Stack.Screen name="(teacher)/(tabs)/index" />
        <Stack.Screen name="(teacher)/(tabs)/class-incharge" />
        <Stack.Screen name="(teacher)/(tabs)/subject-teacher" />
      </Stack>
    </SafeAreaProvider>
  );
}