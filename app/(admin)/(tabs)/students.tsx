import { router } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Student, StudentCard } from "../../../src/components/StudentCard";

const studentAvatar = require("../../../assets/images/sampleAvatar.png");

// Mock Data matching your UI screenshots exactly
const mockStudents: Student[] = [
  {
    id: "#AC-2024- 081",
    name: "A.B.C. Chamara Weerasinghe",
    badgeNo: "9965",
    avatar: studentAvatar,
    currentGrade: "11th - Section A",
    attendance: "98%",
  },
  {
    id: "#AC-2024-112",
    name: "Elena Rodriguez",
    badgeNo: "9934",
    avatar: studentAvatar,
    currentGrade: "11th - Section B",
    attendance: "92%",
  },
  {
    id: "#AC-2024-045",
    name: "Julian Chen",
    badgeNo: "9923",
    avatar: studentAvatar,
    currentGrade: "12th - Section A",
    attendance: "100%",
  },
  {
    id: "#AC-2024-192",
    name: "Sofia Al-Farsi",
    badgeNo: "9976",
    avatar: studentAvatar,
    currentGrade: "10th - Section C",
    attendance: "95%",
  },
  {
    id: "#AC-2024-204",
    name: "Leo Vance",
    badgeNo: "9989",
    avatar: studentAvatar,
    currentGrade: "12th - Section B",
    attendance: "89%",
  },
];

export default function StudentsScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("STUDENTS");

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]">
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />

      {/* Main Container */}
      <View className="flex-1 px-6 pt-2">
        {/* Continuous Scroll Content */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }} // Gives spacing for bottom nav
        >
          {/* Header Bar */}
          <View className="flex-row justify-between items-center mt-2 mb-6">
            <TouchableOpacity className="p-1">
              {/* Menu Hamburger Icon */}
              <View className="w-5 h-0.5 bg-gray-800 my-0.5" />
              <View className="w-5 h-0.5 bg-gray-800 my-0.5" />
              <View className="w-5 h-0.5 bg-gray-800 my-0.5" />
            </TouchableOpacity>

            <Text className="text-[#7A0000] font-bold text-base tracking-wide">
              Mr. Saman Kumara
            </Text>

            {/* Minimal Profile Icon */}
            <View className="w-9 h-9 rounded-full bg-slate-900 border border-gray-200 overflow-hidden" />
          </View>

          {/* Screen Title Block */}
          <View className="mb-6">
            <Text className="text-gray-900 font-bold text-3xl tracking-tight mb-2">
              Students
            </Text>
            <Text className="text-gray-500 font-normal text-sm leading-5">
              Manage and monitor academic progress of the current cohort.
            </Text>
          </View>

          {/* Search Input */}
          <View className="flex-row items-center bg-[#EAEAEA] rounded-full px-5 py-3.5 mb-3">
            {/* Search Icon */}
            <Text className="text-gray-400 text-lg mr-3">🔍</Text>
            <TextInput
              placeholder="Search students by name, ID or class..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="flex-1 text-gray-800 text-sm font-medium p-0"
            />
          </View>

          {/* Filters Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            className="flex-row items-center justify-center bg-[#EAEAEA] rounded-full py-3.5 mb-6"
          >
            <Text className="text-gray-700 font-medium text-sm mr-2">
              🎛️ Filters
            </Text>
          </TouchableOpacity>

          {/* Student List */}
          {mockStudents.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onViewProfile={(id) =>
                console.log(`Navigating to profile: ${id}`)
              }
            />
          ))}

          {/* Enroll New Student Box */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push("/(admin)/admin-user-management")}
            className="border-2 border-dashed border-gray-200 bg-white rounded-3xl py-8 items-center justify-center mb-6"
          >
            <View className="w-12 h-12 rounded-full bg-gray-100 items-center justify-center mb-2">
              <Text className="text-gray-600 text-xl font-semibold">👤+</Text>
            </View>
            <Text className="text-gray-800 font-bold text-base">
              Enroll New Student
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Navigation provided by parent _layout.tsx; local nav removed */}
    </SafeAreaView>
  );
}
