import React from "react";
// Import the shared component from the src directory
import MarksEntryUI from "../../../../src/components/MarksEntryUI"; 
import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function ClassInchargeMarksEntryScreen() {
  useAuthGuard();
  // Pass the 'class_incharge' role for view-only permissions and report generation
  return <MarksEntryUI userRole="class_incharge" />;
}