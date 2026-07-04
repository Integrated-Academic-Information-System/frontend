import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { 
  Image, 
  Pressable, 
  ScrollView, 
  Text, 
  TextInput, 
  View 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Student {
  id: string;
  name: string;
  studentId: string;
  gradeCode: string;
  currentGrade: string;
  attendance: string;
}

export default function StudentsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  // Clean data structured directly from your design preview image
  const students: Student[] = [
    {
      id: "1",
      name: "A.B.C. Chinthaka Weerasinghe",
      studentId: "IAIS-2024-1001",
      gradeCode: "11A1",
      currentGrade: "11th - Section A",
      attendance: "98%",
    },
    {
      id: "2",
      name: "Elena Rodriguez",
      studentId: "IAIS-2024-1112",
      gradeCode: "13B2",
      currentGrade: "13th - Section B",
      attendance: "62%",
    },
    {
      id: "3",
      name: "Julian Chen",
      studentId: "IAIS-2024-043",
      gradeCode: "12A1",
      currentGrade: "12th - Section A",
      attendance: "100%",
    },
    {
      id: "4",
      name: "Sofia Al-Farsi",
      studentId: "IAIS-2024-714",
      gradeCode: "10C3",
      currentGrade: "10th - Section C",
      attendance: "89%",
    },
    {
      id: "5",
      name: "Luis Valenz",
      studentId: "IAIS-2024-254",
      gradeCode: "12B1",
      currentGrade: "12th - Section B",
      attendance: "95%",
    }
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#efeae4]" edges={['top', 'left', 'right']}>
      
      {/* --- Main Contents Scroll Frame --- */}
      <ScrollView className="flex-1 px-6" contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        
        {/* Main Header Row */}
        <View className="mt-2 mb-5">
          <Text className="text-3xl font-bold text-[#8f140e]">Students</Text>
          <Text className="text-zinc-600 text-sm mt-1 leading-relaxed font-medium">
            Manage and monitor academic progress of the current cohort.
          </Text>
        </View>

        {/* Search Bar Input Context */}
        <View className="flex-row items-center bg-white rounded-full px-4 py-3 mb-3 border border-zinc-200/50 shadow-sm">
          <Feather name="search" size={18} color="#888" />
          <TextInput
            placeholder="Search student by name, ID or Class..."
            placeholderTextColor="#999"
            className="flex-1 text-sm text-zinc-800 ml-2 font-medium"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Filter Selection Panel Link */}
        <Pressable className="w-full bg-white/80 py-2.5 rounded-full flex-row items-center justify-center gap-2 mb-6 border border-zinc-200/40 active:opacity-80 shadow-sm">
          <Ionicons name="options-outline" size={16} color="#444" />
          <Text className="text-zinc-700 text-xs font-bold tracking-wide">Filters</Text>
        </Pressable>

        {/* --- Rendered Active Student Cards --- */}
        <View className="gap-5">
          {students.map((student) => (
            <View key={student.id} className="bg-white p-5 rounded-3xl border border-zinc-200/40 shadow-sm relative">
              
              {/* Header Box Profile Details */}
              <View className="flex-row gap-4 items-start mb-4">
                <View className="w-12 h-12 rounded-2xl bg-zinc-100/80 overflow-hidden items-center justify-center border border-zinc-100">
                  <FontAwesome5 name="user-graduate" size={22} color="#8f140e" />
                </View>

                <View className="flex-1 pr-14">
                  <Text className="text-base font-bold text-zinc-900 leading-tight mb-0.5">{student.name}</Text>
                  <Text className="text-zinc-400 text-xs font-bold">ID: {student.studentId}</Text>
                </View>

                {/* Right Badge Classroom Section Code */}
                <View className="absolute right-0 top-0 bg-red-50/60 px-3 py-1 rounded-full border border-red-100">
                  <Text className="text-[#8f140e] text-[10px] font-extrabold uppercase tracking-wider">{student.gradeCode}</Text>
                </View>
              </View>

              {/* Attendance and Progression Split Grid Metrics */}
              <View className="border-t border-zinc-100 pt-3 mb-4 gap-2">
                <View className="flex-row justify-between items-center">
                  <Text className="text-zinc-400 text-xs font-semibold">Current Grade</Text>
                  <Text className="text-zinc-800 text-xs font-bold">{student.currentGrade}</Text>
                </View>
                <View className="flex-row justify-between items-center">
                  <Text className="text-zinc-400 text-xs font-semibold">Attendance</Text>
                  <Text className="text-zinc-800 text-xs font-black">{student.attendance}</Text>
                </View>
              </View>

              {/* Profile Deep-dive Trigger Button */}
              <Pressable 
                onPress={() => router.push(`/student-profile/${student.id}` as any)}
                className="w-full bg-[#8f140e] py-3.5 rounded-2xl flex-row items-center justify-center gap-1.5 shadow-sm active:opacity-95"
              >
                <Text className="text-white text-xs font-bold tracking-wide">View Profile</Text>
                <Feather name="chevron-right" size={14} color="#FFF" />
              </Pressable>

            </View>
          ))}

          {/* --- New Enrollment Placement Border Area --- */}
          <Pressable className="w-full border-2 border-dashed border-zinc-300 bg-white/40 p-6 rounded-3xl items-center justify-center gap-2 active:opacity-70 mt-2">
            <View className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-sm border border-zinc-200/50">
              <Feather name="user-plus" size={18} color="#8f140e" />
            </View>
            <Text className="text-zinc-600 text-xs font-bold tracking-wide">Enroll New Student</Text>
          </Pressable>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}