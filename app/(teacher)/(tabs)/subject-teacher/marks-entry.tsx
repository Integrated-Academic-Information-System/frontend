//app/(teacher)/subject-teacher/marks-entry.tsx
import React from "react";
// Import the shared component from the src directory
import MarksEntryUI from "../../../../src/components/MarksEntryUI"; 
import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function SubjectTeacherMarksEntryScreen() {
  useAuthGuard();
  // Pass the 'subject_teacher' role to enable edit capabilities
  return <MarksEntryUI userRole="subject_teacher" />;
}