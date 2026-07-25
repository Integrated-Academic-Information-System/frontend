//app/(admin)/marks-entry.tsx
import React from "react";
// Import the shared component from the src directory
import MarksEntryUI from "../../../src/components/MarksEntryUI"; 

export default function AdminMarksEntryScreen() {


  // Pass the 'admin' role to enable full edit capabilities
  return <MarksEntryUI userRole="admin" />;
}