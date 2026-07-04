import { Feather } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ClassTeacherStudent,
  getClassTeacherStudents,
  saveClassTeacherStudents,
} from "../../../../src/lib/classTeacherStudents";
import {
  DEFAULT_CLASS_NAME,
  getClassTeacherProfile,
} from "../../../../src/lib/classTeacherProfile";
import { useAuthGuard } from "@/hooks/useAuthGuard";

const initialStudents: ClassTeacherStudent[] = [
  { name: "Aarav Perera", grade: "Grade 10 - A", roll: "01" },
  { name: "Nethmi Silva", grade: "Grade 10 - A", roll: "08" },
  { name: "Dulanjana Fernando", grade: "Grade 10 - A", roll: "14" },
];

export default function ClassInchargeStudentsScreen() {

  useAuthGuard

  const [addedStudents, setAddedStudents] = useState<ClassTeacherStudent[]>([]);
  const [composerOpen, setComposerOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("Grade 10 - A");
  const [roll, setRoll] = useState("");
  const [teacherName, setTeacherName] = useState("Username");
  const [className, setClassName] = useState(DEFAULT_CLASS_NAME);

  useEffect(() => {
    const loadStudents = async () => {
      const [storedStudents, profile] = await Promise.all([
        getClassTeacherStudents(),
        getClassTeacherProfile(),
      ]);

      setAddedStudents(storedStudents);
      setTeacherName(profile.teacherName);
      setClassName(profile.className);
    };

    loadStudents();
  }, []);

  const students = [...initialStudents, ...addedStudents];

  const canSave = useMemo(() => {
    return (
      name.trim().length > 0 &&
      grade.trim().length > 0 &&
      roll.trim().length > 0
    );
  }, [grade, name, roll]);

  const openComposer = () => {
    setName("");
    setGrade("Grade 10 - A");
    setRoll("");
    setComposerOpen(true);
  };

  const handleCreateStudent = () => {
    if (!canSave) {
      return;
    }

    const nextStudent = {
      name: name.trim(),
      grade: grade.trim(),
      roll: roll.trim(),
    };

    setAddedStudents((currentStudents) => {
      const nextStudents = [nextStudent, ...currentStudents];
      saveClassTeacherStudents(nextStudents);
      return nextStudents;
    });
    setComposerOpen(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#efeae4]">
      <ScrollView contentContainerClassName="px-6 pb-32 pt-4">

        <View className="flex-row items-center justify-between mb-5 gap-2">
          <View className="flex-row bg-white rounded-full p-1 shadow-sm">
            <Pressable
              onPress={() => setViewMode("list")}
              className={`flex-row items-center px-4 py-3 rounded-full ${
                viewMode === "list" ? "bg-[#fceeed]" : "bg-transparent"
              }`}
            >
              <Feather
                name="list"
                size={16}
                color={viewMode === "list" ? "#8f140e" : "#8e847f"}
              />
              <Text
                className={`ml-2 text-[14px] font-bold ${
                  viewMode === "list" ? "text-[#8f140e]" : "text-[#8e847f]"
                }`}
              >
                List
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setViewMode("grid")}
              className={`flex-row items-center px-4 py-3 rounded-full ${
                viewMode === "grid" ? "bg-[#fceeed]" : "bg-transparent"
              }`}
            >
              <Feather
                name="grid"
                size={16}
                color={viewMode === "grid" ? "#8f140e" : "#8e847f"}
              />
              <Text
                className={`ml-2 text-[14px] font-bold ${
                  viewMode === "grid" ? "text-[#8f140e]" : "text-[#8e847f]"
                }`}
              >
                Grid
              </Text>
            </Pressable>
          </View>
          <Pressable
            onPress={openComposer}
            className="flex-row items-center bg-white px-4 py-3 rounded-full shadow-sm active:opacity-80"
          >
            <Feather name="plus" size={18} color="#8f140e" />
            <Text className="ml-2 text-[14px] font-bold text-[#8f140e]">
              Add Student
            </Text>
          </Pressable>
        </View>

        <View className="bg-[#8f140e] rounded-[28px] p-6 mb-5 shadow-lg shadow-[#8f140e]/20">
          <Text className="text-[12px] font-semibold text-white/75 uppercase tracking-[4px]">
            Class Students
          </Text>
          <Text className="text-[30px] font-extrabold text-white mt-2 leading-tight">
            Manage your class list
          </Text>
          <Text className="text-white/80 mt-3 text-[14px] leading-5">
            Add students and keep everything organized in a simple list view.
          </Text>
        </View>

        <View className="flex-row gap-3 mb-5">
          <View className="flex-1 bg-white rounded-3xl p-4 shadow-sm">
            <Text className="text-[12px] font-semibold text-[#8e847f] uppercase tracking-wider">
              Total
            </Text>
            <Text className="text-[30px] font-extrabold mt-3 text-[#8f140e]">
              {students.length}
            </Text>
          </View>
          <View className="flex-1 bg-white rounded-3xl p-4 shadow-sm">
            <Text className="text-[12px] font-semibold text-[#8e847f] uppercase tracking-wider">
              Class
            </Text>
            <Text className="text-[18px] font-extrabold mt-3 text-[#212121]">
              {className}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-[18px] font-bold text-[#212121]">Students</Text>
          <Text className="text-[12px] font-semibold text-[#8e847f] uppercase tracking-wider">
            {students.length} total
          </Text>
        </View>
        <View
          className={viewMode === "grid" ? "flex-row flex-wrap gap-3" : "gap-3"}
        >
          {students.map((student) => (
            <View
              key={`${student.name}-${student.roll}`}
              className={`bg-white rounded-[24px] p-5 shadow-sm ${
                viewMode === "grid" ? "w-[48%]" : ""
              }`}
            >
              <View
                className={
                  viewMode === "grid" ? "items-start" : "flex-row items-center"
                }
              >
                <View
                  className={`h-12 w-12 rounded-2xl bg-[#fceeed] items-center justify-center ${
                    viewMode === "grid" ? "mb-4" : "mr-4"
                  }`}
                >
                  <Feather name="user" size={20} color="#8f140e" />
                </View>
                <View className={viewMode === "grid" ? "w-full" : "flex-1"}>
                  <Text className="text-[16px] font-bold text-[#212121]">
                    {student.name}
                  </Text>
                  <Text className="text-[13px] text-[#8e847f] mt-1">
                    {student.grade}
                  </Text>
                </View>
                <View
                  className={`bg-[#fceeed] px-3 py-2 rounded-full ${
                    viewMode === "grid" ? "mt-4 self-start" : ""
                  }`}
                >
                  <Text className="text-[12px] font-bold text-[#8f140e]">
                    Roll {student.roll}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <Modal
        visible={composerOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setComposerOpen(false)}
      >
        <View className="flex-1 bg-black/35 justify-end">
          <Pressable
            className="flex-1"
            onPress={() => setComposerOpen(false)}
          />
          <View className="bg-[#efeae4] rounded-t-[32px] px-6 pt-5 pb-8">
            <View className="flex-row items-center justify-between mb-5">
              <Text className="text-[22px] font-extrabold text-[#212121]">
                Add Student
              </Text>
              <Pressable
                onPress={() => setComposerOpen(false)}
                className="h-9 w-9 rounded-full bg-white items-center justify-center"
              >
                <Feather name="x" size={18} color="#8f140e" />
              </Pressable>
            </View>

            <View className="bg-white rounded-[24px] p-4 shadow-sm mb-4">
              <Text className="text-[12px] font-bold text-[#8e847f] uppercase tracking-wider mb-2">
                Student Name
              </Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Enter student name"
                placeholderTextColor="#b2a9a3"
                className="text-[16px] text-[#212121]"
              />
            </View>

            <View className="bg-white rounded-[24px] p-4 shadow-sm mb-4">
              <Text className="text-[12px] font-bold text-[#8e847f] uppercase tracking-wider mb-2">
                Class
              </Text>
              <TextInput
                value={grade}
                onChangeText={setGrade}
                placeholder="Enter class or section"
                placeholderTextColor="#b2a9a3"
                className="text-[16px] text-[#212121]"
              />
            </View>

            <View className="bg-white rounded-[24px] p-4 shadow-sm mb-4">
              <Text className="text-[12px] font-bold text-[#8e847f] uppercase tracking-wider mb-2">
                Roll Number
              </Text>
              <TextInput
                value={roll}
                onChangeText={setRoll}
                placeholder="Enter roll number"
                placeholderTextColor="#b2a9a3"
                className="text-[16px] text-[#212121]"
              />
            </View>

            <View className="flex-row gap-3">
              <Pressable
                onPress={() => setComposerOpen(false)}
                className="flex-1 rounded-full bg-white px-4 py-4 items-center"
              >
                <Text className="text-[15px] font-bold text-[#8f140e]">
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                onPress={handleCreateStudent}
                disabled={!canSave}
                className={`flex-1 rounded-full px-4 py-4 items-center ${
                  canSave ? "bg-[#8f140e]" : "bg-[#b8ada6]"
                }`}
              >
                <Text className="text-[15px] font-bold text-white">Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
