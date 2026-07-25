import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useClassStudents } from "@/hooks/useClassStudents";

export default function ClassInchargeStudentsScreen() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const { data, loading, error, refetch } = useClassStudents();

  // ── Loading state ──────────────────────────────────────────────────────
  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-[#efeae4] justify-center items-center">
        <ActivityIndicator size="large" color="#8f140e" />
        <Text className="text-[#9c8b84] mt-3 text-sm">
          Loading students...
        </Text>
      </SafeAreaView>
    );
  }

  // ── Error state ────────────────────────────────────────────────────────
  if (error || !data) {
    return (
      <SafeAreaView className="flex-1 bg-[#efeae4] justify-center items-center px-6">
        <Text className="text-[#8f140e] font-bold text-base mb-2">
          Failed to load students
        </Text>
        <Text className="text-[#9c8b84] text-sm text-center mb-4">
          {error}
        </Text>
        <Pressable
          onPress={refetch}
          className="bg-[#8f140e] px-5 py-2.5 rounded-xl"
        >
          <Text className="text-white font-bold text-sm">Try Again</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#efeae4]">
      <ScrollView contentContainerClassName="px-6 pb-32 pt-4">

        {/* ── View Mode Toggle ── */}
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

          {/* Refresh button */}
          <Pressable
            onPress={refetch}
            className="flex-row items-center bg-white px-4 py-3 rounded-full shadow-sm active:opacity-80"
          >
            <Feather name="refresh-cw" size={18} color="#8f140e" />
            <Text className="ml-2 text-[14px] font-bold text-[#8f140e]">
              Refresh
            </Text>
          </Pressable>
        </View>

        {/* ── Hero Card ── */}
        <View className="bg-[#8f140e] rounded-[28px] p-6 mb-5 shadow-lg shadow-[#8f140e]/20">
          <Text className="text-[12px] font-semibold text-white/75 uppercase tracking-[4px]">
            Class Students
          </Text>
          <Text className="text-[30px] font-extrabold text-white mt-2 leading-tight">
            {data.class_name}
          </Text>
          <Text className="text-white/80 mt-3 text-[14px] leading-5">
            View and manage all students assigned to your class.
          </Text>
        </View>

        {/* ── Stats Row ── */}
        <View className="flex-row gap-3 mb-5">
          <View className="flex-1 bg-white rounded-3xl p-4 shadow-sm">
            <Text className="text-[12px] font-semibold text-[#8e847f] uppercase tracking-wider">
              Total Students
            </Text>
            <Text className="text-[30px] font-extrabold mt-3 text-[#8f140e]">
              {data.student_count}
            </Text>
          </View>
          <View className="flex-1 bg-white rounded-3xl p-4 shadow-sm">
            <Text className="text-[12px] font-semibold text-[#8e847f] uppercase tracking-wider">
              Class
            </Text>
            <Text className="text-[18px] font-extrabold mt-3 text-[#212121]">
              {data.class_name}
            </Text>
          </View>
        </View>

        {/* ── Student List Header ── */}
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-[18px] font-bold text-[#212121]">
            Students
          </Text>
          <Text className="text-[12px] font-semibold text-[#8e847f] uppercase tracking-wider">
            {data.student_count} total
          </Text>
        </View>

        {/* ── Empty state ── */}
        {data.students.length === 0 ? (
          <View className="bg-white rounded-[24px] p-8 items-center">
            <Feather name="users" size={40} color="#c0b4af" />
            <Text className="text-[#9c8b84] text-sm mt-4 text-center">
              No students assigned to this class yet.
            </Text>
          </View>
        ) : (
          // ── Student Cards ──
          <View className={viewMode === "grid" ? "flex-row flex-wrap gap-3" : "gap-3"}>
            {data.students.map((student, idx) => (
              <View
                key={student.id}
                className={`bg-white rounded-[24px] p-5 shadow-sm ${
                  viewMode === "grid" ? "w-[48%]" : ""
                }`}
              >
                <View
                  className={
                    viewMode === "grid"
                      ? "items-start"
                      : "flex-row items-center"
                  }
                >
                  {/* Avatar */}
                  <View
                    className={`h-12 w-12 rounded-2xl bg-[#fceeed] items-center justify-center ${
                      viewMode === "grid" ? "mb-4" : "mr-4"
                    }`}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "800",
                        color: "#8f140e",
                      }}
                    >
                      {student.name.charAt(0).toUpperCase()}
                    </Text>
                  </View>

                  {/* Name + Reg No */}
                  <View className={viewMode === "grid" ? "w-full" : "flex-1"}>
                    <Text className="text-[16px] font-bold text-[#212121]">
                      {student.name}
                    </Text>
                    <Text className="text-[13px] text-[#8e847f] mt-1">
                      {student.reg_no}
                    </Text>
                    {student.email ? (
                      <Text className="text-[11px] text-[#b2a9a3] mt-0.5">
                        {student.email}
                      </Text>
                    ) : null}
                  </View>

                  {/* Index badge */}
                  <View
                    className={`bg-[#fceeed] px-3 py-2 rounded-full ${
                      viewMode === "grid" ? "mt-4 self-start" : ""
                    }`}
                  >
                    <Text className="text-[12px] font-bold text-[#8f140e]">
                      #{String(idx + 1).padStart(2, "0")}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}