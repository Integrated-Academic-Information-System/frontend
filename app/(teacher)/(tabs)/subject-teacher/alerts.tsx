import { ModernEmptyState } from "../../../../src/components/ModernEmptyState";

export default function AlertsScreen() {
  return (
    <ModernEmptyState
      badge="Subject alerts"
      iconName="alert-triangle"
      title="No subject alerts yet"
      description="Lesson notes, task reminders, and class-specific notices will show up here when they arrive."
    />
  );
}
