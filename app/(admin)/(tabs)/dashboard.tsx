import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  DashboardStats,
  getDashboardStats,
} from "../../../src/lib/adminUsers";

export default function DashboardScreen() {
  const router = useRouter();

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        if (!cancelled) setStats(data);
      } catch {
        // Silently fall back to null – UI handles missing data gracefully
      } finally {
        if (!cancelled) setStatsLoading(false);
      }
    };
    fetchStats();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleMarksEntry = () => {
    router.push("/(admin)/(tabs)/marks-entry");
  };

  const handleUserManagement = () => {
    router.push("/(admin)/(tabs)/students");
  };

  const StatCard = ({
    label,
    value,
    icon,
  }: {
    label: string;
    value: number | undefined;
    icon: string;
  }) => (
    <View className="flex-row items-start justify-between rounded-3xl border border-zinc-100 bg-white p-5 shadow-sm">
      <View>
        <Text className="mb-1 text-xs font-bold uppercase tracking-wider text-zinc-400">
          {label}
        </Text>
        {statsLoading ? (
          <ActivityIndicator size="small" color="#8f140e" />
        ) : (
          <Text className="text-3xl font-black text-[#8f140e]">
            {(value ?? 0).toLocaleString()}
          </Text>
        )}
      </View>
      <View className="rounded-xl bg-[#8f140e]/10 p-3">
        <FontAwesome5 name={icon as any} size={18} color="#8f140e" />
      </View>
    </View>
  );

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

          <View className="mb-6 gap-4 mt-6">
            <StatCard label="Total Users" value={stats?.users} icon="users" />
            <StatCard label="Students" value={stats?.students} icon="user-graduate" />
            <StatCard label="Teachers" value={stats?.teachers} icon="chalkboard-teacher" />
            <StatCard label="Subjects" value={stats?.subjects} icon="book-open" />
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
