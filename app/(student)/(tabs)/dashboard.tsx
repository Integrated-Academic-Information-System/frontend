import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function StudentDashboardScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#f4ede6] px-6 relative justify-center">
      <View className="absolute -top-12 right-[-40px] h-40 w-40 rounded-full bg-[#8f140e]/10" />
      <View className="absolute bottom-20 left-[-36px] h-32 w-32 rounded-full bg-[#d8b39d]/20" />

      <Pressable
        onPress={() => router.replace("/role-selector")}
        className="absolute top-12 left-6 z-10 flex-row items-center rounded-full bg-white px-3 py-2 shadow-sm active:opacity-70"
      >
        <Feather name="arrow-left" size={18} color="#8f140e" />
        <Text className="ml-2 text-[14px] font-bold text-[#8f140e]">Roles</Text>
      </Pressable>

      <View className="gap-4">
        <View className="items-start gap-3">
          <View className="rounded-full bg-[#8f140e]/10 px-4 py-1.5">
            <Text className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#8f140e]">
              Student Dashboard
            </Text>
          </View>

          <Text className="max-w-[260px] text-4xl font-bold leading-11 text-[#7f2018]">
            Your school activity, simplified.
          </Text>

          <Text className="max-w-[320px] text-[15px] leading-6 text-[#7f726b]">
            Quickly check results, marks, and notifications from one clean
            dashboard.
          </Text>
        </View>

        <View className="flex-row flex-wrap gap-3 pt-2">
          <Pressable
            onPress={() => router.push("/(student)/(tabs)/latest-results")}
            className="flex-1 min-w-[150px] rounded-[26px] bg-[#8f140e] px-4 py-5 shadow-lg shadow-[#8f140e]/25 active:opacity-80"
          >
            <View className="h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
              <Feather name="trending-up" size={22} color="#ffffff" />
            </View>
            <Text className="mt-4 text-[17px] font-bold text-white">
              Latest Results
            </Text>
            <Text className="mt-2 text-[13px] leading-5 text-white/85">
              Open your newest result summary.
            </Text>
          </Pressable>

          <Pressable
            onPress={() => router.push("/(student)/(tabs)/notifications")}
            className="flex-1 min-w-[150px] rounded-[26px] border border-[#eaded3] bg-white px-4 py-5 shadow-lg shadow-[#5c231b]/8 active:opacity-80"
          >
            <View className="h-12 w-12 items-center justify-center rounded-2xl bg-[#8f140e]/10">
              <Feather name="bell" size={22} color="#8f140e" />
            </View>
            <Text className="mt-4 text-[17px] font-bold text-[#7f2018]">
              Notifications
            </Text>
            <Text className="mt-2 text-[13px] leading-5 text-[#7f726b]">
              Check school notices and reminders.
            </Text>
          </Pressable>
        </View>

        <Pressable
          onPress={() => router.push("/(student)/(tabs)/marks")}
          className="rounded-[26px] border border-[#eaded3] bg-[#fbf8f5] px-5 py-5 shadow-lg shadow-[#5c231b]/8 active:opacity-80"
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center flex-1">
              <View className="h-12 w-12 items-center justify-center rounded-2xl bg-[#8f140e]/10">
                <Feather name="book-open" size={22} color="#8f140e" />
              </View>
              <View className="ml-4 flex-1">
                <Text className="text-[17px] font-bold text-[#7f2018]">
                  Marks
                </Text>
                <Text className="mt-1 text-[13px] leading-5 text-[#7f726b]">
                  View subject-wise marks with a cleaner layout.
                </Text>
              </View>
            </View>

            <Feather name="chevron-right" size={20} color="#8f140e" />
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
