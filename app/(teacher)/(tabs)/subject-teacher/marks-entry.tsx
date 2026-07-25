// app/(teacher)/subject-teacher/marks-entry.tsx
import React from "react";
import MarksEntryUI from "../../../../src/components/MarksEntryUI"; 
import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function SubjectTeacherMarksEntryScreen() {
  
  const { teacherId } = useAuthGuard("0"); 

  if (!teacherId) return null; 

  return (
    <MarksEntryUI 
      userRole="subject_teacher" 
      teacherId={teacherId} 
    />
  );
}