import React from "react";
// Import the shared component from the src directory
import MarksEntryUI from "../../../../src/components/MarksEntryUI"; 

export default function SubjectTeacherMarksEntryScreen() {
  // Pass the 'subject_teacher' role to enable edit capabilities
  return <MarksEntryUI userRole="subject_teacher" />;
}