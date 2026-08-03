import { useRouter } from "expo-router";
import { ModernEmptyState } from "../../../src/components/ModernEmptyState";

export default function NotificationsScreen() {
  const router = useRouter();

  return (
    <ModernEmptyState
      badge="Student updates"
      iconName="bell"
      title="You're all caught up"
      description="Exam reminders, result updates, and school notices will appear here in a cleaner, easier-to-scan layout."
      actionLabel="Open Latest Results"
      onActionPress={() => router.push("/(student)/(tabs)/latest-results")}
    />
  );
}
