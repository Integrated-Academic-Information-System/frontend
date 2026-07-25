import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardScreen() {
  const [activeFilter, setActiveFilter] = useState<
    "all" | "critical" | "warning" | "info"
  >("all");

  const router = useRouter();

  const totalStudents = 1284;
  const totalSubjects = 42;

  const handleMarksEntry = () => {
    router.push("/(admin)/(tabs)/marks-entry");
  };

  const handleUserManagement = () => {
    router.push("/(admin)/(tabs)/students");
  };

  return (
    <SafeAreaView
      className="flex-1 bg-[#F9F9F9]"
      edges={["top", "left", "right"]}
    >
      <View className="flex-1">
        <ScrollView
          className="flex-1 px-6"
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="mt-4 mb-6">
            <Text className="text-2xl font-extrabold tracking-tight text-zinc-900">
              Hello, Admin!
            </Text>
            <Text className="mt-1 text-zinc-500">
              Your educational ecosystem is performing optimally today.
            </Text>
          </View>

          <View className="items-center gap-8">
            <Text className="text-2xl font-bold text-[#8f140e]">Dashboard</Text>

            <Pressable
              onPress={handleMarksEntry}
              className="rounded-2xl bg-[#8f140e] px-8 py-4 shadow-lg shadow-[#8f140e]/30 active:opacity-80"
            >
              <Text className="text-lg font-bold text-white">
                Go to Marks Entry
              </Text>
            </Pressable>
          </View>

          <View className="mb-6 gap-4">
            <View className="flex-row items-start justify-between rounded-3xl border border-zinc-100 bg-white p-5 shadow-sm">
              <View>
                <Text className="mb-1 text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Students
                </Text>
                <Text className="text-3xl font-black text-[#8f140e]">
                  {totalStudents.toLocaleString()}
                </Text>
              </View>
              <View className="rounded-xl bg-[#8f140e]/10 p-3">
                <FontAwesome5 name="users" size={18} color="#8f140e" />
              </View>
            </View>

            <View className="flex-row items-start justify-between rounded-3xl border border-zinc-100 bg-white p-5 shadow-sm">
              <View>
                <Text className="mb-1 text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Subjects
                </Text>
                <Text className="text-3xl font-black text-[#8f140e]">
                  {totalSubjects}
                </Text>
              </View>
              <View className="rounded-xl bg-[#8f140e]/10 p-3">
                <FontAwesome5 name="book-open" size={18} color="#8f140e" />
              </View>
            </View>
          </View>

          <View className="mb-6 w-full gap-3.5">
            <View className="w-full flex-row gap-3">
              <Pressable className="flex-1 items-center justify-center rounded-2xl bg-[#8f140e] py-3.5 shadow-sm active:opacity-90">
                <Text className="text-base font-bold tracking-wide text-white">
                  New Students
                </Text>
              </Pressable>

              <Pressable
                onPress={handleMarksEntry}
                className="flex-1 items-center justify-center rounded-2xl bg-zinc-200 py-3.5 active:opacity-80"
              >
                <Text className="text-base font-bold tracking-wide text-zinc-700">
                  Enter Marks
                </Text>
              </Pressable>
            </View>

            <Pressable
              onPress={handleUserManagement}
              className="w-full items-center justify-center rounded-2xl bg-zinc-200 py-3.5 active:opacity-80"
            >
              <Text className="text-base font-bold tracking-wide text-zinc-700">
                User Management
              </Text>
            </Pressable>

            <Pressable className="w-full items-center justify-center rounded-2xl bg-zinc-200 py-3.5 active:opacity-80">
              <Text className="text-base font-bold tracking-wide text-zinc-700">
                Manage Subjects
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
