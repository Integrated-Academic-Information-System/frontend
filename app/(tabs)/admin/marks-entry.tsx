// app/(tabs)/admin/marks-entry.tsx
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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Dummy Data for Class Roster
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

export default function MarksEntryScreen() {
  const [students, setStudents] = useState(DUMMY_STUDENTS);

  // Helper component for mock dropdowns
  const DropdownField = ({
    label,
    value,
  }: {
    label: string;
    value: string;
  }) => (
    <View className="mb-4">
      <Text className="text-[11px] font-bold tracking-[1px] text-[#8e847f] uppercase mb-2 ml-1">
        {label}
      </Text>
      <Pressable className="h-14 flex-row items-center justify-between rounded-2xl bg-[#f7f5f2] px-4">
        <Text className="text-[15px] font-semibold text-[#3b3331]">
          {value}
        </Text>
        <Feather name="chevron-down" size={20} color="#8e847f" />
      </Pressable>
    </View>
  );

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
          {/* Top Profile / Admin Badge */}
          <View className="flex-row items-center justify-between mb-4 px-1">
            <View className="flex-row items-center bg-white px-3 py-1.5 rounded-full shadow-sm shadow-black/5">
              <Image
                source={require("../../../assets/images/school-logo.png")} // Update path if needed
                style={{ width: 24, height: 24, borderRadius: 12 }}
                className="h-6 w-6 rounded-full"
              />
              <Text className="ml-2 text-[14px] font-bold text-[#8f140e]">
                Admin
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

          {/* Page Title */}
          <View className="mb-6 px-1">
            <Text className="text-[28px] font-extrabold text-[#212121]">
              Marks Entry
            </Text>
            <Text className="text-[14px] text-[#6d615c] mt-1 font-medium">
              Academic Year: 2023-2024
            </Text>
          </View>

          {/* Filters Card */}
          <View className="rounded-[32px] bg-white p-5 shadow-xl shadow-black/5 mb-6">
            <DropdownField label="Grade" value="Grade 7" />
            <DropdownField label="Term" value="Mid-Term Assessment" />
            <DropdownField label="Subject" value="Advanced Mathematics" />

            <Pressable className="mt-2 h-14 flex-row items-center justify-center rounded-2xl bg-[#8f140e] shadow-md shadow-[#8f140e]/30">
              <Ionicons name="sync" size={18} color="#fff" className="mr-2" />
              <Text className="text-[16px] font-bold text-white ml-2">
                Sync Data
              </Text>
            </Pressable>
          </View>

          {/* Class Roster Card */}
          <View className="rounded-[32px] bg-white p-5 shadow-xl shadow-black/5 mb-6">
            <View className="flex-row justify-between items-start mb-6">
              <Text className="text-[18px] font-extrabold text-[#212121] max-w-[150px] leading-6">
                Class Roster (42 Students)
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
            {students.map((student, index) => (
              <View
                key={student.id}
                className={`flex-row items-center justify-between py-3 ${index !== students.length - 1 ? "border-b border-[#f0ebe6]" : ""}`}
              >
                <View className="flex-row items-center flex-1 shrink mr-2">
                  <Image
                    source={{
                      uri: `https://i.pravatar.cc/100?img=${index + 1}`,
                    }}
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      backgroundColor: "#E5E7EB",
                    }}
                    className="h-11 w-11 rounded-xl bg-gray-200"
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

                <View className="flex-row items-center flex-shrink-0">
                  <TextInput
                    value={student.marks}
                    placeholder="-"
                    placeholderTextColor="#a5928a"
                    keyboardType="number-pad"
                    className={`h-10 w-14 rounded-xl text-center text-[15px] font-bold ${student.marks ? "bg-[#fceeed] text-[#8f140e]" : "bg-[#f7f5f2] text-[#212121]"}`}
                  />
                  <View className="ml-3 w-6 items-center justify-center">
                    {student.status === "validated" ? (
                      <Ionicons
                        name="checkmark-circle"
                        size={22}
                        color="#10b981"
                      />
                    ) : (
                      <View className="h-[20px] w-[20px] rounded-full border-2 border-[#d6d0cb]" />
                    )}
                  </View>
                </View>
              </View>
            ))}

            {/* Load More Button */}
            <Pressable className="mt-4 h-12 items-center justify-center rounded-xl bg-[#f7f5f2]">
              <Text className="text-[13px] font-bold text-[#8f140e]">
                Load More Students (38 Remaining)
              </Text>
            </Pressable>
          </View>

          {/* Entry Progress Card */}
          <View className="rounded-[32px] bg-white p-5 shadow-xl shadow-black/5 mb-6">
            <Text className="text-[11px] font-bold tracking-[1px] text-[#8e847f] uppercase mb-6 text-center">
              Entry Progress
            </Text>

            {/* Circular Progress Mock */}
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

            <Pressable className="h-14 items-center justify-center rounded-full bg-[#8f140e] shadow-lg shadow-[#8f140e]/30">
              <Text className="text-[16px] font-bold text-white">
                Submit Final Marks
              </Text>
            </Pressable>
            <Text className="text-center text-[10px] font-bold text-[#a5928a] mt-3 uppercase tracking-[1px]">
              Locked after submission
            </Text>
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
