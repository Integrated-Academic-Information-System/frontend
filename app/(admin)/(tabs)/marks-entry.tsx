import React from "react";
// Import the shared component from the src directory
import MarksEntryUI from "../../../src/components/MarksEntryUI"; 
import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function AdminMarksEntryScreen() {

  useAuthGuard();

  // Pass the 'admin' role to enable full edit capabilities
  return <MarksEntryUI userRole="admin" />;
}