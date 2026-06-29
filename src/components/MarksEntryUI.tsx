// MarksEntryUI.tsx
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MarksEntryUI({
  userRole,
}: {
  userRole: "admin" | "subject_teacher" | "class_incharge";
}) {
  const [students, setStudents] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [grades, setGrades] = useState<any[]>([]);
  const [terms, setTerms] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [examYears, setExamYears] = useState<any[]>([]);

  const [selectedGrade, setSelectedGrade] = useState<any>(null);
  const [selectedTerm, setSelectedTerm] = useState<any>(null);
  const [selectedSubject, setSelectedSubject] = useState<any>(null);
  const [selectedYear, setSelectedYear] = useState<any>(null);

  const [showGradeModal, setShowGradeModal] = useState(false);
  const [showTermModal, setShowTermModal] = useState(false);
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [showYearModal, setShowYearModal] = useState(false);

  const API_URL = `${process.env.EXPO_PUBLIC_API_URL}`;

  // Use dummy IDs to test roles according to your Seeder
  const currentTeacherId =
    userRole === "subject_teacher" ? 2 : userRole === "class_incharge" ? 1 : "";

  useEffect(() => {
    fetchFormData();
  }, []);

  useEffect(() => {
    // Clear students immediately when filters change to prevent ghost marks
    setStudents([]);
    if (selectedGrade && selectedTerm && selectedYear) {
      fetchStudents();
    }
  }, [selectedGrade, selectedTerm, selectedSubject, selectedYear]);

  // Exact names matching the Database Seeder
  const grade6to9Subjects = [
    "Sinhala",
    "Tamil",
    "English Language",
    "Mathematics",
    "Science",
    "History",
    "Geography",
    "Citizenship Education (Civics)",
    "Religion",
    "ICT",
    "PTS",
    "Health and Physical Education",
    "Art",
    "Music",
    "Dancing",
    "Drama",
  ];
  const grade10to11Subjects = [
    "Sinhala",
    "English Language",
    "Mathematics",
    "Science",
    "History",
    "Religion",
    "Citizenship Education (Civics)",
    "Business Studies",
    "Geography",
    "Accounting",
    "Art",
    "Dancing",
    "Music",
    "ICT",
    "Home Science",
    "Agricultural Science",
    "Health and Physical Education",
  ];
  const grade12to13Subjects = [
    "General English",
    "General Information Technology",
    "English Language",
    "Sinhala",
    "History",
    "Political Science",
    "Communication & Media Studies",
    "Geography",
    "Business Studies",
    "Accounting",
    "Economics",
    "ICT",
    "Home Science",
    "Buddhist Civilization",
    "Art",
    "Dancing",
    "Music",
  ];

  const getFilteredSubjects = () => {
    if (!selectedGrade) return [];

    // Extract the grade number from names like "Grade 6", "Class 6A", etc.
    const match = selectedGrade.name?.match(/\d+/);
    const num = match ? parseInt(match[0], 10) : NaN;

    if (isNaN(num)) return subjects;

    // Keep the subject list aligned with the backend's core/bucket subject groups.
    if (num >= 6 && num <= 9) {
      return subjects.filter((subject) =>
        grade6to9Subjects.includes(subject.name),
      );
    } else if (num >= 10 && num <= 11) {
      return subjects.filter((subject) =>
        grade10to11Subjects.includes(subject.name),
      );
    } else if (num >= 12 && num <= 13) {
      return subjects.filter((subject) =>
        grade12to13Subjects.includes(subject.name),
      );
    }

    return subjects;
  };

  const fetchStudents = async () => {
    try {
      setStudents([]);

      const queryParams = new URLSearchParams();
      queryParams.append("role", userRole);
      if (currentTeacherId)
        queryParams.append("teacher_id", currentTeacherId.toString());

      if (selectedGrade) queryParams.append("grade_id", selectedGrade.id);
      if (selectedTerm) queryParams.append("term_id", selectedTerm.id);
      if (selectedSubject) queryParams.append("subject_id", selectedSubject.id);
      if (selectedYear) queryParams.append("exam_year_id", selectedYear.id);

      const response = await fetch(
        `${API_URL}/students?${queryParams.toString()}`,
      );
      const json = await response.json();
      if (json.success) setStudents(json.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchFormData = async () => {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("role", userRole);
      if (currentTeacherId)
        queryParams.append("teacher_id", currentTeacherId.toString());

      const response = await fetch(
        `${API_URL}/form-data?${queryParams.toString()}`,
      );
      const json = await response.json();

      if (json.success) {
        setGrades(json.data.grades);
        setTerms(json.data.terms);
        setSubjects(json.data.subjects);
        setExamYears(json.data.exam_years);

        if (json.data.grades.length > 0) setSelectedGrade(json.data.grades[0]);
        if (json.data.terms.length > 0) setSelectedTerm(json.data.terms[0]);
        if (json.data.exam_years.length > 0)
          setSelectedYear(json.data.exam_years[0]);

        if (json.data.subjects.length === 1) {
          setSelectedSubject(json.data.subjects[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching form data:", error);
    }
  };

  const getOfficialGradeLetter = (mark: string | undefined) => {
    if (!mark || mark === "") return "-";
    const num = parseInt(mark);
    if (isNaN(num) || num < 0 || num > 100) return "-";

    const isAL =
      selectedGrade?.name?.includes("12") ||
      selectedGrade?.name?.includes("13");

    if (num >= 75) return "A";
    if (num >= 65) return "B";
    if (num >= 50) return "C";
    if (num >= 35) return "S";
    return isAL ? "F" : "W";
  };

  const canEditMarks = userRole === "admin" || userRole === "subject_teacher";
  const isClassIncharge = userRole === "class_incharge";

  const roleDisplayName =
    userRole === "admin"
      ? "Admin"
      : userRole === "subject_teacher"
        ? "Subject Teacher"
        : "Class Incharge";

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

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(s.reg_no ?? s.index ?? "").includes(searchQuery),
  );

  const handleUpdateMark = (id: string, text: string) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, marks: text } : s)),
    );
  };

  const handleSubmitMarks = async () => {
    try {
      const studentsWithMarks = students
        .filter((s) => s.marks !== undefined && s.marks !== "")
        .map((s) => ({ student_id: s.id, mark: s.marks }));

      if (studentsWithMarks.length === 0) {
        Alert.alert(
          "Warning",
          "Please enter marks for at least one student before submitting.",
        );
        return;
      }

      if (!selectedSubject) {
        Alert.alert("Warning", "Please select a Subject first.");
        return;
      }

      const payload = {
        exam_year_id: selectedYear?.id,
        term_id: selectedTerm?.id,
        grade_id: selectedGrade?.id,
        subject_id: selectedSubject?.id,
        marks_data: studentsWithMarks,
      };

      const response = await fetch(`${API_URL}/save-marks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const json = await response.json();
      if (json.success) {
        Alert.alert("Success", json.message, [{ text: "OK" }]);
        fetchStudents();
      } else {
        Alert.alert("Database Error", json.message);
      }
    } catch (error) {
      Alert.alert(
        "Connection Error",
        "Could not connect to the backend server.",
      );
    }
  };

  const handleGenerateReport = () => {
    Alert.alert(
      "Report Generated",
      "Class report has been successfully generated.",
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
          <View className="flex-row items-center justify-between mb-4 px-1">
            <View className="flex-row items-center bg-white px-3 py-1.5 rounded-full shadow-sm shadow-black/5">
              <Image
                source={require("../../assets/images/school-logo.png")}
                style={{ width: 24, height: 24, borderRadius: 12 }}
              />
              <Text className="ml-2 text-[14px] font-bold text-[#8f140e]">
                {roleDisplayName}
              </Text>
            </View>
          </View>

          <View className="mb-6 px-1">
            <Text className="text-[28px] font-extrabold text-[#212121]">
              Marks Entry
            </Text>
            <View className="flex-row items-center mt-2">
              <Text className="text-[14px] text-[#6d615c] font-medium mr-2">
                Academic Year:
              </Text>
              <Pressable
                onPress={() => canEditMarks && setShowYearModal(true)}
                className="flex-row items-center bg-white px-3 py-1.5 rounded-lg border border-[#d6d0cb]"
              >
                <Text className="text-[14px] font-bold text-[#8f140e] mr-1">
                  {selectedYear ? selectedYear.name : "Loading..."}
                </Text>
                {canEditMarks && (
                  <Feather name="chevron-down" size={14} color="#a5928a" />
                )}
              </Pressable>
            </View>
          </View>

          <View className="rounded-[32px] bg-white p-5 shadow-xl shadow-black/5 mb-6">
            <DropdownField
              label="Class / Grade"
              value={selectedGrade ? selectedGrade.name : "Loading..."}
              onPress={() => setShowGradeModal(true)}
            />

            <DropdownField
              label="Term"
              value={selectedTerm ? selectedTerm.name : "Loading..."}
              onPress={() => setShowTermModal(true)}
            />

            <DropdownField
              label="Subject"
              value={
                selectedSubject ? selectedSubject.name : "Select a Subject"
              }
              onPress={() => {
                if (userRole === "admin" || userRole === "class_incharge") {
                  setShowSubjectModal(true);
                } else if (
                  userRole === "subject_teacher" &&
                  subjects.length > 1
                ) {
                  setShowSubjectModal(true);
                } else {
                  Alert.alert("Info", "You are only assigned to one subject.");
                }
              }}
            />
          </View>

          {/* Modal Setup */}
          {[
            {
              visible: showGradeModal,
              data: grades,
              setter: (val: any) => {
                setSelectedGrade(val);
                const currentFilteredSubjects = getFilteredSubjects();
                if (currentFilteredSubjects.length > 1) {
                  setSelectedSubject(null);
                } else if (currentFilteredSubjects.length === 1) {
                  setSelectedSubject(currentFilteredSubjects[0]);
                }
              },
              closer: setShowGradeModal,
              selected: selectedGrade,
            },
            {
              visible: showTermModal,
              data: terms,
              setter: setSelectedTerm,
              closer: setShowTermModal,
              selected: selectedTerm,
            },
            {
              visible: showSubjectModal,
              data: getFilteredSubjects(),
              setter: setSelectedSubject,
              closer: setShowSubjectModal,
              selected: selectedSubject,
            },
            {
              visible: showYearModal,
              data: examYears,
              setter: setSelectedYear,
              closer: setShowYearModal,
              selected: selectedYear,
            },
          ].map((modal, idx) => (
            <Modal
              key={idx}
              visible={modal.visible}
              transparent
              animationType="fade"
              onRequestClose={() => modal.closer(false)}
            >
              <Pressable
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(0,0,0,0.4)",
                }}
                onPress={() => modal.closer(false)}
              >
                <View
                  style={{
                    width: "90%",
                    maxHeight: "70%",
                    backgroundColor: "#fff",
                    borderRadius: 16,
                    padding: 12,
                  }}
                  onStartShouldSetResponder={() => true}
                >
                  <ScrollView showsVerticalScrollIndicator={false}>
                    {modal.data.map((item) => (
                      <Pressable
                        key={item.id}
                        onPress={() => {
                          modal.setter(item);
                          modal.closer(false);
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
                            color:
                              modal.selected?.id === item.id
                                ? "#8f140e"
                                : "#212121",
                            fontWeight:
                              modal.selected?.id === item.id ? "700" : "400",
                          }}
                        >
                          {item.name}
                        </Text>
                      </Pressable>
                    ))}
                  </ScrollView>
                </View>
              </Pressable>
            </Modal>
          ))}

          <View className="rounded-[32px] bg-white p-5 shadow-xl shadow-black/5 mb-6">
            <View className="mb-6 h-12 flex-row items-center rounded-2xl bg-[#f7f5f2] px-4">
              <Feather name="search" size={18} color="#8e847f" />
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search by name or index no..."
                placeholderTextColor="#a5928a"
                className="ml-3 flex-1 text-[15px] text-[#212121]"
              />
            </View>

            <View className="flex-row justify-between items-start mb-6">
              <Text className="text-[18px] font-extrabold text-[#212121] max-w-[150px] leading-6">
                Class Roster ({filteredStudents.length} Students)
              </Text>
            </View>

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
                      INDEX NO : {student.reg_no ?? student.index}
                    </Text>
                  </View>
                </View>

                <View className="flex-row items-center justify-end">
                  <View className="mr-3 w-8 items-center justify-center">
                    <Text className="text-[18px] font-black text-[#8f140e]">
                      {getOfficialGradeLetter(student.marks)}
                    </Text>
                  </View>

                  {canEditMarks && selectedSubject ? (
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
                    <View className="h-12 w-16 rounded-xl items-center justify-center bg-[#f0ebe6]">
                      <Text className="text-[16px] font-bold text-[#a5928a]">
                        {student.marks ? student.marks : "-"}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>

          <View className="rounded-[32px] bg-white p-5 shadow-xl shadow-black/5 mb-6">
            {canEditMarks ? (
              <Pressable
                onPress={handleSubmitMarks}
                disabled={!selectedSubject}
                style={{ opacity: selectedSubject ? 1 : 0.5 }}
                className="h-14 items-center justify-center rounded-full bg-[#8f140e] shadow-lg shadow-[#8f140e]/30"
              >
                <Text className="text-[16px] font-bold text-white">
                  Submit Final Marks
                </Text>
              </Pressable>
            ) : isClassIncharge ? (
              <Pressable
                onPress={handleGenerateReport}
                className="h-14 items-center justify-center rounded-full shadow-lg shadow-black/30 bg-[#212121]"
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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
