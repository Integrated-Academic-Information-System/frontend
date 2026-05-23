import {
  getMarksApi,
  getGradesApi,
  getSubjectsApi,
  getTermsApi,
  getAcademicYearsApi,
  submitMarksApi,
} from "../services/api";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
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
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Types
type Role = "admin" | "subject_teacher" | "class_incharge";

interface Student {
  student_id: number;
  name: string;
  index_no: string;
  marks: string;
  status: string;
  mark_id: number | null;
}

interface DropdownItem {
  id: number;
  name: string;
  level?: number;
  year?: string;
  order?: number;
}

export default function MarksEntryUI({ userRole }: { userRole: Role }) {
  // Data states
  const [students, setStudents] = useState<Student[]>([]);
  const [grades, setGrades] = useState<DropdownItem[]>([]);
  const [subjects, setSubjects] = useState<DropdownItem[]>([]);
  const [terms, setTerms] = useState<DropdownItem[]>([]);
  const [academicYears, setAcademicYears] = useState<DropdownItem[]>([]);

  // Selected filter states
  const [selectedGrade, setSelectedGrade] = useState<DropdownItem | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<DropdownItem | null>(
    null,
  );
  const [selectedTerm, setSelectedTerm] = useState<DropdownItem | null>(null);
  const [selectedYear, setSelectedYear] = useState<DropdownItem | null>(null);

  // UI states
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoadingDropdowns, setIsLoadingDropdowns] = useState(true);
  const [isLoadingStudents, setIsLoadingStudents] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSynced, setIsSynced] = useState(false);

  // Permissions
  const canEditMarks = userRole === "admin" || userRole === "subject_teacher";
  const isClassIncharge = userRole === "class_incharge";
  const roleDisplayName =
    userRole === "admin"
      ? "Admin"
      : userRole === "subject_teacher"
        ? "Subject Teacher"
        : "Class Incharge";

  // Load dropdowns on mount
  useEffect(() => {
    loadDropdowns();
  }, []);

  // Reload subjects when grade changes
  useEffect(() => {
    if (selectedGrade) {
      loadSubjects(selectedGrade.id);
      setSelectedSubject(null);
      setStudents([]);
      setIsSynced(false);
    }
  }, [selectedGrade]);

  const loadDropdowns = async () => {
    try {
      setIsLoadingDropdowns(true);
      const [gradesRes, termsRes, yearsRes] = await Promise.all([
        getGradesApi(),
        getTermsApi(),
        getAcademicYearsApi(),
      ]);
      setGrades(gradesRes.data);
      setTerms(termsRes.data);
      setAcademicYears(yearsRes.data);

      // Set defaults
      if (gradesRes.data.length > 0) setSelectedGrade(gradesRes.data[0]);
      if (termsRes.data.length > 0) setSelectedTerm(termsRes.data[0]);
      if (yearsRes.data.length > 0) setSelectedYear(yearsRes.data[0]);
    } catch (error) {
      Alert.alert("Error", "Failed to load data. Please try again.");
    } finally {
      setIsLoadingDropdowns(false);
    }
  };

  const loadSubjects = async (gradeId: number) => {
    try {
      const res = await getSubjectsApi(gradeId);
      setSubjects(res.data);
      if (res.data.length > 0) setSelectedSubject(res.data[0]);
    } catch (error) {
      console.error("Failed to load subjects");
    }
  };

  const handleSync = async () => {
    if (!selectedGrade || !selectedSubject || !selectedTerm || !selectedYear) {
      Alert.alert("Error", "Please select all filters first.");
      return;
    }
    try {
      setIsLoadingStudents(true);
      const res = await getMarksApi({
        grade_id: selectedGrade.id,
        subject_id: selectedSubject.id,
        term_id: selectedTerm.id,
        academic_year_id: selectedYear.id,
      });
      setStudents(
        res.data.map((s: any) => ({
          ...s,
          marks: s.marks?.toString() ?? "",
        })),
      );
      setIsSynced(true);
    } catch (error) {
      Alert.alert("Error", "Failed to load students.");
    } finally {
      setIsLoadingStudents(false);
    }
  };

  const handleUpdateMark = (studentId: number, text: string) => {
    setStudents((prev) =>
      prev.map((s) => (s.student_id === studentId ? { ...s, marks: text } : s)),
    );
  };

  const handleSubmitMarks = async () => {
    if (!selectedSubject || !selectedTerm || !selectedYear) {
      Alert.alert("Error", "Please sync data first.");
      return;
    }

    const incomplete = students.filter((s) => s.marks === "");
    if (incomplete.length > 0) {
      Alert.alert(
        "Warning",
        `${incomplete.length} student(s) have empty marks. Please fill all marks.`,
      );
      return;
    }

    try {
      setIsSubmitting(true);
      await submitMarksApi({
        subject_id: selectedSubject.id,
        term_id: selectedTerm.id,
        academic_year_id: selectedYear.id,
        marks: students.map((s) => ({
          student_id: s.student_id,
          marks: parseInt(s.marks),
        })),
      });
      Alert.alert("Success", "Marks submitted successfully!", [{ text: "OK" }]);
      handleSync(); // Reload to show updated status
    } catch (error: any) {
      const msg = error.response?.data?.message || "Failed to submit marks.";
      Alert.alert("Error", msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGenerateReport = () => {
    Alert.alert(
      "Report Generated",
      "Class report has been successfully generated.",
      [{ text: "OK" }],
    );
  };

  // Filter students by search
  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.index_no.includes(searchQuery),
  );

  // Progress calculation
  const validatedCount = students.filter((s) => s.marks !== "").length;
  const progressPercent =
    students.length > 0
      ? Math.round((validatedCount / students.length) * 100)
      : 0;

  // Dropdown selector component
  const DropdownField = ({
    label,
    value,
    items,
    onSelect,
    keyField = "name",
  }: {
    label: string;
    value: string;
    items: DropdownItem[];
    onSelect: (item: DropdownItem) => void;
    keyField?: string;
  }) => {
    const [open, setOpen] = useState(false);
    return (
      <View className="mb-4">
        <Text className="text-[11px] font-bold tracking-[1px] text-[#8e847f] uppercase mb-2 ml-1">
          {label}
        </Text>
        <Pressable
          onPress={() => setOpen(!open)}
          className="h-14 flex-row items-center justify-between rounded-2xl bg-[#f7f5f2] px-4"
        >
          <Text className="text-[15px] font-semibold text-[#3b3331]">
            {value}
          </Text>
          <Feather
            name={open ? "chevron-up" : "chevron-down"}
            size={20}
            color="#8e847f"
          />
        </Pressable>
        {open && (
          <View className="mt-1 rounded-2xl bg-white border border-[#f0ebe6] overflow-hidden shadow-sm">
            {items.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => {
                  onSelect(item);
                  setOpen(false);
                }}
                className="px-4 py-3 border-b border-[#f7f5f2]"
              >
                <Text className="text-[14px] text-[#3b3331] font-medium">
                  {item.name || item.year}
                </Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>
    );
  };

  if (isLoadingDropdowns) {
    return (
      <SafeAreaView className="flex-1 bg-[#efeae4] items-center justify-center">
        <ActivityIndicator size="large" color="#8f140e" />
        <Text className="mt-4 text-[#8f140e] font-bold">Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#efeae4]" edges={["top"]}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          className="flex-1"
          contentContainerClassName="px-4 pb-12 pt-2"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View className="flex-row items-center justify-between mb-4 px-1">
            <View className="flex-row items-center bg-white px-3 py-1.5 rounded-full shadow-sm">
              <Image
                source={require("../../assets/images/school-logo.png")}
                style={{ width: 24, height: 24, borderRadius: 12 }}
              />
              <Text className="ml-2 text-[14px] font-bold text-[#8f140e]">
                {roleDisplayName}
              </Text>
            </View>
            <View className="h-9 w-9 rounded-full bg-gray-300 overflow-hidden border-2 border-white shadow-sm">
              <Image
                source={{ uri: "https://i.pravatar.cc/100?img=11" }}
                style={{ width: "100%", height: "100%" }}
              />
            </View>
          </View>

          {/* Title */}
          <View className="mb-6 px-1">
            <Text className="text-[28px] font-extrabold text-[#212121]">
              Marks Entry
            </Text>
            <Text className="text-[14px] text-[#6d615c] font-medium mt-1">
              Academic Year: {selectedYear?.year ?? "—"}
            </Text>
          </View>

          {/* Filters Card */}
          <View className="rounded-[32px] bg-white p-5 shadow-xl shadow-black/5 mb-6">
            <DropdownField
              label="Grade"
              value={selectedGrade?.name ?? "Select Grade"}
              items={grades}
              onSelect={setSelectedGrade}
            />
            <DropdownField
              label="Term"
              value={selectedTerm?.name ?? "Select Term"}
              items={terms}
              onSelect={setSelectedTerm}
            />
            <DropdownField
              label="Subject"
              value={selectedSubject?.name ?? "Select Subject"}
              items={subjects}
              onSelect={setSelectedSubject}
            />
            <DropdownField
              label="Academic Year"
              value={selectedYear?.year ?? "Select Year"}
              items={academicYears.map((y) => ({
                ...y,
                name: y.year ?? y.name,
              }))}
              onSelect={setSelectedYear}
            />
            <Pressable
              onPress={handleSync}
              disabled={isLoadingStudents}
              className="mt-2 h-14 flex-row items-center justify-center rounded-2xl bg-[#8f140e] shadow-md"
            >
              {isLoadingStudents ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <Ionicons name="sync" size={18} color="#fff" />
                  <Text className="text-[16px] font-bold text-white ml-2">
                    Sync Data
                  </Text>
                </>
              )}
            </Pressable>
          </View>

          {/* Class Roster Card */}
          {isSynced && (
            <View className="rounded-[32px] bg-white p-5 shadow-xl shadow-black/5 mb-6">
              {/* Search */}
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

              <View className="flex-row justify-between items-center mb-6">
                <Text className="text-[18px] font-extrabold text-[#212121]">
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

              {/* Student List */}
              {filteredStudents.map((student, index) => (
                <View
                  key={student.student_id}
                  className={`flex-row items-center justify-between py-3 ${
                    index !== filteredStudents.length - 1
                      ? "border-b border-[#f0ebe6]"
                      : ""
                  }`}
                >
                  <View className="flex-row items-center flex-1 shrink mr-2">
                    <Image
                      source={{
                        uri: `https://i.pravatar.cc/100?img=${student.student_id + 10}`,
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
                      <Text className="text-[11px] font-semibold text-[#8e847f] mt-0.5">
                        INDEX NO: {student.index_no}
                      </Text>
                    </View>
                  </View>

                  <View className="flex-shrink-0">
                    {canEditMarks ? (
                      <TextInput
                        value={student.marks}
                        onChangeText={(text) =>
                          handleUpdateMark(student.student_id, text)
                        }
                        placeholder="-"
                        placeholderTextColor="#a5928a"
                        keyboardType="number-pad"
                        maxLength={3}
                        className={`h-12 w-16 rounded-xl text-center text-[16px] font-bold ${
                          student.marks
                            ? "bg-[#fceeed] text-[#8f140e]"
                            : "bg-[#f7f5f2] text-[#212121]"
                        }`}
                      />
                    ) : (
                      <View
                        className={`h-12 w-16 rounded-xl items-center justify-center ${
                          student.marks ? "bg-[#f7f5f2]" : "bg-transparent"
                        }`}
                      >
                        <Text
                          className={`text-[16px] font-bold ${
                            student.marks ? "text-[#212121]" : "text-[#a5928a]"
                          }`}
                        >
                          {student.marks ? student.marks : "-"}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              ))}

              {filteredStudents.length === 0 && (
                <Text className="text-center text-[#8e847f] py-4">
                  No students found.
                </Text>
              )}
            </View>
          )}

          {/* Progress & Submit Card */}
          {isSynced && (
            <View className="rounded-[32px] bg-white p-5 shadow-xl shadow-black/5 mb-6">
              <Text className="text-[11px] font-bold tracking-[1px] text-[#8e847f] uppercase mb-6 text-center">
                Entry Progress
              </Text>

              <View className="items-center justify-center mb-6">
                <View className="h-28 w-28 rounded-full border-[8px] border-[#8f140e] items-center justify-center">
                  <Text className="text-[24px] font-extrabold text-[#212121]">
                    {progressPercent}%
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center justify-between bg-[#f7f5f2] p-3 rounded-2xl mb-3">
                <View className="flex-row items-center">
                  <Feather name="check-square" size={16} color="#8f140e" />
                  <Text className="ml-2 text-[14px] font-medium text-[#433735]">
                    Filled
                  </Text>
                </View>
                <Text className="text-[14px] font-bold text-[#212121]">
                  {validatedCount}/{students.length}
                </Text>
              </View>

              {canEditMarks ? (
                <>
                  <Pressable
                    onPress={handleSubmitMarks}
                    disabled={isSubmitting}
                    className="h-14 items-center justify-center rounded-full bg-[#8f140e] shadow-lg mt-3"
                  >
                    {isSubmitting ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text className="text-[16px] font-bold text-white">
                        Submit Final Marks
                      </Text>
                    )}
                  </Pressable>
                  <Text className="text-center text-[10px] font-bold text-[#a5928a] mt-3 uppercase tracking-[1px]">
                    Locked after submission
                  </Text>
                </>
              ) : isClassIncharge ? (
                <Pressable
                  onPress={handleGenerateReport}
                  className="h-14 items-center justify-center rounded-full shadow-lg mt-3"
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
          )}

          {/* Empty state before sync */}
          {!isSynced && (
            <View className="rounded-[32px] bg-white p-8 shadow-xl shadow-black/5 mb-6 items-center">
              <Ionicons name="sync-outline" size={48} color="#8f140e" />
              <Text className="text-[16px] font-bold text-[#212121] mt-4 text-center">
                Select filters and tap Sync Data
              </Text>
              <Text className="text-[13px] text-[#8e847f] mt-2 text-center">
                Choose a grade, term, subject and academic year then press Sync
                to load students.
              </Text>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
