import { ModernEmptyState } from "../../../../src/components/ModernEmptyState";

export default function AlertsScreen() {
  return (
    <ModernEmptyState
      badge="Class alerts"
      iconName="alert-triangle"
      title="Nothing urgent right now"
      description="Attendance notices, classroom reminders, and student follow-ups will land here in the same visual style."
    />
  );
}
