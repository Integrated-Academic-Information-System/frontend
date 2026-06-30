// app/(teacher)/class-teacher/marks-entry.tsx
import React from "react";
import MarksEntryUI from "../../../../src/components/MarksEntryUI"; 
import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function ClassInchargeMarksEntryScreen() {
  const { teacherId } = useAuthGuard(); // get the teacher id
  if (!teacherId) return null; // wait for get the id from auth

  return (
    <MarksEntryUI 
      userRole="class_incharge" 
      teacherId={teacherId} // pass real id
    />
  );
}