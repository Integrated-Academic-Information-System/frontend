import { Stack } from "expo-router";

export default function TeacherLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "Teacher Dashboard" }} />
      <Stack.Screen
        name="class-incharge"
        options={{ title: "Class Incharge" }}
      />
      <Stack.Screen
        name="subject-teacher"
        options={{ title: "Subject Teacher" }}
      />
    </Stack>
  );
}
