import { ModernEmptyState } from "../../../src/components/ModernEmptyState";

export default function AlertsScreen() {
  return (
    <ModernEmptyState
      badge="Admin alerts"
      iconName="alert-triangle"
      title="No alerts queued"
      description="Operational notices, approvals, and urgent updates will appear here once something needs attention."
    />
  );
}
