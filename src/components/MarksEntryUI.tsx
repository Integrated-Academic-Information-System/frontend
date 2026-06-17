import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
  Alert,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Dummy data for the class roster
const DUMMY_STUDENTS = [
  {
    id: "1",
    name: "Adrian Thorne",
    index: "12345",
    marks: "88",
    status: "validated",
  },
  {
    id: "2",
    name: "Beatrix Vance",
    index: "12346",
    marks: "",
    status: "pending",
  },
  {
    id: "3",
    name: "Cassian Grey",
    index: "12347",
    marks: "74",
    status: "validated",
  },
  {
    id: "4",
    name: "Daphne Laize",
    index: "12348",
    marks: "",
    status: "pending",
  },
];

// Props: Receives userRole to determine UI rendering and permissions
export default function MarksEntryUI({
  userRole,
}: {
  userRole: "admin" | "subject_teacher" | "class_incharge";
}) {
  const [students, setStudents] = useState(DUMMY_STUDENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [academicYear, setAcademicYear] = useState("2023-2024");

  // Grade options and selection state
  const GRADE_OPTIONS = [
    "Grade 6",
    "Grade 7",
    "Grade 8",
    "Grade 9",
    "Grade 10",
    "Grade 11",
  ];
  const [selectedGrade, setSelectedGrade] = useState(GRADE_OPTIONS[0]);
  const [showGradeModal, setShowGradeModal] = useState(false);

  // Term options and selection state
  const TERM_OPTIONS = ["First Term", "Mid Term", "Final Term"];
  const [selectedTerm, setSelectedTerm] = useState(TERM_OPTIONS[0]);
  const [showTermModal, setShowTermModal] = useState(false);

  // ROLE PERMISSIONS LOGIC
  // Admins and Subject Teachers can edit marks. Class Incharges can only view.
  const canEditMarks = userRole === "admin" || userRole === "subject_teacher";
  const isClassIncharge = userRole === "class_incharge";

  // Determine the display name for the top badge
  const roleDisplayName =
    userRole === "admin"
      ? "Admin"
      : userRole === "subject_teacher"
        ? "Subject Teacher"
        : "Class Incharge";

  // Reusable dropdown UI component
  const DropdownField = ({
    label,
    value,
    onPress,
  }: {
    label: string;
    value: string;
    onPress?: () => void;
  }) => (
    <View className="mb-4">
      <Text className="text-[11px] font-bold tracking-[1px] text-[#8e847f] uppercase mb-2 ml-1">
        {label}
      </Text>
      <Pressable
        onPress={onPress}
        className="h-14 flex-row items-center justify-between rounded-2xl bg-[#f7f5f2] px-4"
      >
        <Text className="text-[15px] font-semibold text-[#3b3331]">
          {value}
        </Text>
        <Feather name="chevron-down" size={20} color="#8e847f" />
      </Pressable>
    </View>
  );

  // Filter students based on search query (by name or index)
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.index.includes(searchQuery),
  );

  // Update specific student's marks in the state array
  const handleUpdateMark = (id: string, text: string) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id ? { ...student, marks: text } : student,
      ),
    );
  };

  // Mock submission handler for editable roles
  const handleSubmitMarks = () => {
    console.log("Saving for Academic Year:", academicYear);
    console.log("Student Marks Data:", students);
    Alert.alert(
      "Success",
      "Marks have been saved successfully! (Backend pending)",
      [{ text: "OK" }],
    );
  };

  // Mock report generation handler for view-only roles
  const handleGenerateReport = () => {
    Alert.alert(
      "Report Generated",
      "Class report has been successfully generated and saved.",
      [{ text: "OK" }],
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#efeae4]" edges={["top"]}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          className="flex-1"
          contentContainerClassName="px-4 pb-12 pt-2 md:px-8 lg:px-12"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Top Profile / Role Badge */}
          <View className="flex-row items-center justify-between mb-4 px-1">
            <View className="flex-row items-center bg-white px-3 py-1.5 rounded-full shadow-sm shadow-black/5">
              <Image
                // Adjusted path assuming components is inside src and images are in assets
                source={require("../../assets/images/school-logo.png")}
                style={{ width: 24, height: 24, borderRadius: 12 }}
                className="h-6 w-6 rounded-full"
              />
              <Text className="ml-2 text-[14px] font-bold text-[#8f140e]">
                {roleDisplayName}
              </Text>
            </View>
            <View className="h-9 w-9 rounded-full bg-gray-300 overflow-hidden border-2 border-white shadow-sm">
              <Image
                source={{ uri: "https://i.pravatar.cc/100?img=11" }}
                style={{ width: "100%", height: "100%" }}
                className="h-full w-full"
              />
            </View>
          </View>

          {/* Page Title & Editable Academic Year */}
          <View className="mb-6 px-1">
            <Text className="text-[28px] font-extrabold text-[#212121]">
              Marks Entry
            </Text>
            <View className="flex-row items-center mt-2">
              <Text className="text-[14px] text-[#6d615c] font-medium mr-2">
                Academic Year:
              </Text>
              <View className="flex-row items-center bg-white px-3 py-1.5 rounded-lg border border-[#d6d0cb]">
                <TextInput
                  value={academicYear}
                  onChangeText={setAcademicYear}
                  placeholder="e.g. 2023-2024"
                  placeholderTextColor="#a5928a"
                  editable={canEditMarks} // Disabled if user lacks edit permission
                  className="text-[14px] font-bold text-[#8f140e] p-0 m-0 w-[80px]"
                />
                {canEditMarks && (
                  <Feather
                    name="edit-2"
                    size={12}
                    color="#a5928a"
                    className="ml-1"
                  />
                )}
              </View>
            </View>
          </View>

          {/* Filters Card */}
          <View className="rounded-[32px] bg-white p-5 shadow-xl shadow-black/5 mb-6">
            <DropdownField
              label="Grade"
              value={selectedGrade}
              onPress={() => setShowGradeModal(true)}
            />
            <DropdownField
              label="Term"
              value={selectedTerm}
              onPress={() => setShowTermModal(true)}
            />
            <DropdownField label="Subject" value="Advanced Mathematics" />
            <Pressable className="mt-2 h-14 flex-row items-center justify-center rounded-2xl bg-[#8f140e] shadow-md shadow-[#8f140e]/30">
              <Ionicons name="sync" size={18} color="#fff" className="mr-2" />
              <Text className="text-[16px] font-bold text-white ml-2">
                Sync Data
              </Text>
            </Pressable>
          </View>

          {/* Grade selection modal */}
          <Modal
            visible={showGradeModal}
            transparent
            animationType="fade"
            onRequestClose={() => setShowGradeModal(false)}
          >
            <Pressable
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0,0,0,0.4)",
              }}
              onPress={() => setShowGradeModal(false)}
            >
              <View
                style={{
                  width: "90%",
                  backgroundColor: "#fff",
                  borderRadius: 16,
                  padding: 12,
                }}
                onStartShouldSetResponder={() => true}
              >
                {GRADE_OPTIONS.map((g) => (
                  <Pressable
                    key={g}
                    onPress={() => {
                      setSelectedGrade(g);
                      setShowGradeModal(false);
                    }}
                    style={{
                      paddingVertical: 12,
                      borderBottomWidth: 1,
                      borderBottomColor: "#f0ebe6",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        color: selectedGrade === g ? "#8f140e" : "#212121",
                        fontWeight: selectedGrade === g ? "700" : "400",
                      }}
                    >
                      {g}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </Pressable>
          </Modal>

          {/* Term selection modal */}
          <Modal
            visible={showTermModal}
            transparent
            animationType="fade"
            onRequestClose={() => setShowTermModal(false)}
          >
            <Pressable
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0,0,0,0.4)",
              }}
              onPress={() => setShowTermModal(false)}
            >
              <View
                style={{
                  width: "90%",
                  backgroundColor: "#fff",
                  borderRadius: 16,
                  padding: 12,
                }}
                onStartShouldSetResponder={() => true}
              >
                {TERM_OPTIONS.map((t) => (
                  <Pressable
                    key={t}
                    onPress={() => {
                      setSelectedTerm(t);
                      setShowTermModal(false);
                    }}
                    style={{
                      paddingVertical: 12,
                      borderBottomWidth: 1,
                      borderBottomColor: "#f0ebe6",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        color: selectedTerm === t ? "#8f140e" : "#212121",
                        fontWeight: selectedTerm === t ? "700" : "400",
                      }}
                    >
                      {t}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </Pressable>
          </Modal>

          {/* Class Roster Card */}
          <View className="rounded-[32px] bg-white p-5 shadow-xl shadow-black/5 mb-6">
            {/* Search Bar */}
            <View className="mb-6 h-12 flex-row items-center rounded-2xl bg-[#f7f5f2] px-4">
              <Feather name="search" size={18} color="#8e847f" />
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search by name or index no..."
                placeholderTextColor="#a5928a"
                className="ml-3 flex-1 text-[15px] text-[#212121]"
              />
              {searchQuery.length > 0 && (
                <Pressable onPress={() => setSearchQuery("")}>
                  <Feather name="x-circle" size={18} color="#a5928a" />
                </Pressable>
              )}
            </View>

            <View className="flex-row justify-between items-start mb-6">
              <Text className="text-[18px] font-extrabold text-[#212121] max-w-[150px] leading-6">
                Class Roster ({filteredStudents.length} Students)
              </Text>
              <View className="bg-[#f0ebe6] px-3 py-1.5 rounded-full flex-row items-center">
                <MaterialCommunityIcons
                  name="target"
                  size={14}
                  color="#8e847f"
                />
                <Text className="text-[12px] font-bold text-[#6d615c] ml-1">
                  Range: 0 - 100
                </Text>
              </View>
            </View>

            {/* Student List with Permission Logic */}
            {filteredStudents.map((student, index) => (
              <View
                key={student.id}
                className={`flex-row items-center justify-between py-3 ${index !== filteredStudents.length - 1 ? "border-b border-[#f0ebe6]" : ""}`}
              >
                <View className="flex-row items-center flex-1 shrink mr-2">
                  <Image
                    source={{
                      uri: `https://i.pravatar.cc/100?img=${parseInt(student.id) + 10}`,
                    }}
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      backgroundColor: "#E5E7EB",
                    }}
                  />
                  <View className="ml-3 shrink pr-2">
                    <Text
                      className="text-[15px] font-bold text-[#212121]"
                      numberOfLines={1}
                    >
                      {student.name}
                    </Text>
                    <Text
                      className="text-[11px] font-semibold text-[#8e847f] mt-0.5"
                      numberOfLines={1}
                    >
                      INDEX NO : {student.index}
                    </Text>
                  </View>
                </View>

                {/* MARKS FIELD LOGIC */}
                <View className="flex-shrink-0">
                  {canEditMarks ? (
                    // Render editable input for Admins and Subject Teachers
                    <TextInput
                      value={student.marks}
                      onChangeText={(text) =>
                        handleUpdateMark(student.id, text)
                      }
                      placeholder="-"
                      placeholderTextColor="#a5928a"
                      keyboardType="number-pad"
                      maxLength={3}
                      className={`h-12 w-16 rounded-xl text-center text-[16px] font-bold ${student.marks ? "bg-[#fceeed] text-[#8f140e]" : "bg-[#f7f5f2] text-[#212121]"}`}
                    />
                  ) : (
                    // Render read-only text view for Class Incharge
                    <View
                      className={`h-12 w-16 rounded-xl items-center justify-center ${student.marks ? "bg-[#f7f5f2]" : "bg-transparent"}`}
                    >
                      <Text
                        className={`text-[16px] font-bold ${student.marks ? "text-[#212121]" : "text-[#a5928a]"}`}
                      >
                        {student.marks ? student.marks : "-"}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            ))}

            {/* Empty state when search returns no results */}
            {filteredStudents.length === 0 && (
              <Text className="text-center text-[#8e847f] py-4">
                No students found.
              </Text>
            )}

            <Pressable className="mt-4 h-12 items-center justify-center rounded-xl bg-[#f7f5f2]">
              <Text className="text-[13px] font-bold text-[#8f140e]">
                Load More Students
              </Text>
            </Pressable>
          </View>

          {/* Entry Progress / Action Buttons Card */}
          <View className="rounded-[32px] bg-white p-5 shadow-xl shadow-black/5 mb-6">
            <Text className="text-[11px] font-bold tracking-[1px] text-[#8e847f] uppercase mb-6 text-center">
              Entry Progress
            </Text>

            <View className="items-center justify-center mb-6">
              <View className="h-28 w-28 rounded-full border-[8px] border-[#8f140e] items-center justify-center">
                <Text className="text-[24px] font-extrabold text-[#212121]">
                  24%
                </Text>
              </View>
            </View>

            <View className="flex-row items-center justify-between bg-[#f7f5f2] p-3 rounded-2xl mb-3">
              <View className="flex-row items-center">
                <Feather name="check-square" size={16} color="#8f140e" />
                <Text className="ml-2 text-[14px] font-medium text-[#433735]">
                  Validated
                </Text>
              </View>
              <Text className="text-[14px] font-bold text-[#212121]">
                10/42
              </Text>
            </View>

            <View className="flex-row items-center justify-between bg-[#fcf2f2] p-3 rounded-2xl mb-6">
              <View className="flex-row items-center">
                <Feather name="alert-triangle" size={16} color="#ef4444" />
                <Text className="ml-2 text-[14px] font-medium text-[#433735]">
                  Errors
                </Text>
              </View>
              <Text className="text-[14px] font-bold text-[#ef4444]">0</Text>
            </View>

            {/* BUTTON LOGIC: Conditional rendering based on role */}
            {canEditMarks ? (
              <>
                <Pressable
                  onPress={handleSubmitMarks}
                  className="h-14 items-center justify-center rounded-full bg-[#8f140e] shadow-lg shadow-[#8f140e]/30"
                >
                  <Text className="text-[16px] font-bold text-white">
                    Submit Final Marks
                  </Text>
                </Pressable>
                <Text className="text-center text-[10px] font-bold text-[#a5928a] mt-3 uppercase tracking-[1px]">
                  Locked after submission
                </Text>
              </>
            ) : isClassIncharge ? (
              /* FIX: Added inline style for backgroundColor so NativeWind doesn't drop it */
              <Pressable
                onPress={handleGenerateReport}
                className="h-14 items-center justify-center rounded-full shadow-lg shadow-black/30"
                style={{ backgroundColor: "#212121" }}
              >
                <View className="flex-row items-center justify-center">
                  <Feather name="file-text" size={18} color="#ffffff" />
                  <Text className="text-[16px] font-bold text-white ml-2">
                    Generate Class Report
                  </Text>
                </View>
              </Pressable>
            ) : null}
          </View>

          {/* Validation Rules Card */}
          <View className="px-2 mb-4">
            <Text className="text-[11px] font-bold tracking-[1px] text-[#8e847f] uppercase mb-4">
              Validation Rules
            </Text>
            <View className="gap-y-3">
              <View className="flex-row items-start pr-4">
                <MaterialCommunityIcons
                  name="shield-check-outline"
                  size={16}
                  color="#8f140e"
                  className="mt-0.5"
                />
                <Text className="ml-2 text-[12px] leading-4 text-[#6d615c]">
                  Scores must be whole integers between 0 and 100 inclusive.
                </Text>
              </View>
              <View className="flex-row items-start pr-4">
                <MaterialCommunityIcons
                  name="shield-check-outline"
                  size={16}
                  color="#8f140e"
                  className="mt-0.5"
                />
                <Text className="ml-2 text-[12px] leading-4 text-[#6d615c]">
                  Zero (0) marks must be manually confirmed for absentees.
                </Text>
              </View>
              <View className="flex-row items-start pr-4">
                <MaterialCommunityIcons
                  name="shield-check-outline"
                  size={16}
                  color="#8f140e"
                  className="mt-0.5"
                />
                <Text className="ml-2 text-[12px] leading-4 text-[#6d615c]">
                  All fields must be filled before the global "Submit" is
                  active.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
