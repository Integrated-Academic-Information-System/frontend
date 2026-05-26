import { getStudentsApi, getGradesApi } from "../../../../src/services/api";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Student {
  id: number;
  name: string;
  email: string;
  index_no: string;
  grade: string;
  grade_id: number;
}

interface Grade {
  id: number;
  name: string;
  level: number;
}

export default function StudentsScreen() {
  const [students, setStudents] = useState<Student[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [selectedGradeId, setSelectedGradeId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadGrades();
    loadStudents();
  }, []);

  const loadGrades = async () => {
    try {
      const res = await getGradesApi();
      setGrades(res.data);
    } catch (error) {
      console.error("Failed to load grades");
    }
  };

  const loadStudents = async (gradeId?: number, search?: string) => {
    try {
      setIsLoading(true);
      const res = await getStudentsApi({
        grade_id: gradeId,
        search: search,
      });
      setStudents(res.data);
    } catch (error) {
      console.error("Failed to load students");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGradeFilter = (gradeId: number | null) => {
    setSelectedGradeId(gradeId);
    loadStudents(gradeId ?? undefined, searchQuery);
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    loadStudents(selectedGradeId ?? undefined, text);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#efeae4]" edges={["top"]}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 pb-12 pt-4"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between mb-6 px-1">
          <View>
            <Text className="text-[28px] font-extrabold text-[#212121]">
              Students
            </Text>
            <Text className="text-[14px] text-[#6d615c] font-medium mt-1">
              {students.length} total students
            </Text>
          </View>
          <View className="h-10 w-10 rounded-full bg-[#8f140e] items-center justify-center">
            <MaterialCommunityIcons
              name="account-group"
              size={22}
              color="#fff"
            />
          </View>
        </View>

        {/* Search Bar */}
        <View className="h-12 flex-row items-center rounded-2xl bg-white px-4 shadow-sm shadow-black/5 mb-4">
          <Feather name="search" size={18} color="#8e847f" />
          <TextInput
            value={searchQuery}
            onChangeText={handleSearch}
            placeholder="Search by name or index no..."
            placeholderTextColor="#a5928a"
            className="ml-3 flex-1 text-[15px] text-[#212121]"
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => handleSearch("")}>
              <Feather name="x-circle" size={18} color="#a5928a" />
            </Pressable>
          )}
        </View>

        {/* Grade Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-6"
          contentContainerClassName="gap-2 px-1"
        >
          {/* All Grades button */}
          <Pressable
            onPress={() => handleGradeFilter(null)}
            className={`px-4 py-2 rounded-full border ${
              selectedGradeId === null
                ? "bg-[#8f140e] border-[#8f140e]"
                : "bg-white border-[#e0d9d4]"
            }`}
          >
            <Text
              className={`text-[13px] font-bold ${
                selectedGradeId === null ? "text-white" : "text-[#6d615c]"
              }`}
            >
              All Grades
            </Text>
          </Pressable>

          {/* Individual grade buttons */}
          {grades.map((grade) => (
            <Pressable
              key={grade.id}
              onPress={() => handleGradeFilter(grade.id)}
              className={`px-4 py-2 rounded-full border ${
                selectedGradeId === grade.id
                  ? "bg-[#8f140e] border-[#8f140e]"
                  : "bg-white border-[#e0d9d4]"
              }`}
            >
              <Text
                className={`text-[13px] font-bold ${
                  selectedGradeId === grade.id ? "text-white" : "text-[#6d615c]"
                }`}
              >
                {grade.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Loading State */}
        {isLoading ? (
          <View className="items-center justify-center py-20">
            <ActivityIndicator size="large" color="#8f140e" />
            <Text className="mt-4 text-[#8f140e] font-bold">
              Loading students...
            </Text>
          </View>
        ) : students.length === 0 ? (
          // Empty State
          <View className="items-center justify-center py-20">
            <MaterialCommunityIcons
              name="account-off-outline"
              size={64}
              color="#c9b8b2"
            />
            <Text className="mt-4 text-[18px] font-bold text-[#6d615c]">
              No students found
            </Text>
            <Text className="mt-2 text-[14px] text-[#a5928a] text-center">
              Try changing the grade filter or search query
            </Text>
          </View>
        ) : (
          // Students List
          <View className="gap-3">
            {students.map((student) => (
              <View
                key={student.id}
                className="bg-white rounded-[24px] p-4 shadow-sm shadow-black/5 flex-row items-center"
              >
                {/* Avatar */}
                <Image
                  source={{
                    uri: `https://i.pravatar.cc/100?img=${student.id + 10}`,
                  }}
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 16,
                    backgroundColor: "#E5E7EB",
                  }}
                />

                {/* Info */}
                <View className="ml-3 flex-1">
                  <Text
                    className="text-[16px] font-bold text-[#212121]"
                    numberOfLines={1}
                  >
                    {student.name}
                  </Text>
                  <Text className="text-[12px] text-[#8e847f] mt-0.5">
                    Index: {student.index_no}
                  </Text>
                  <Text className="text-[12px] text-[#8e847f]">
                    {student.email}
                  </Text>
                </View>

                {/* Grade Badge */}
                <View className="bg-[#fceeed] px-3 py-1.5 rounded-full">
                  <Text className="text-[11px] font-bold text-[#8f140e]">
                    {student.grade}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
