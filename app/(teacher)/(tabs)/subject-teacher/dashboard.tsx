import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SubjectTeacherDashboard() {
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

      <View className="gap-5">
        <View className="rounded-[30px] border border-[#eaded3] bg-white px-5 py-6 shadow-lg shadow-[#5c231b]/10">
          <Text className="text-[12px] font-bold uppercase tracking-[0.35em] text-[#8f140e]">
            Teacher Dashboard
          </Text>
          <Text className="mt-3 text-3xl font-bold leading-10 text-[#7f2018]">
            Manage marks and student actions from one place.
          </Text>
          <Text className="mt-3 text-[15px] leading-6 text-[#7f726b]">
            Use this space to move quickly into marks entry or the student list
            without extra navigation.
          </Text>
        </View>

        <View className="flex-row flex-wrap gap-3">
          <Pressable
            onPress={() =>
              router.push("/(teacher)/(tabs)/subject-teacher/marks-entry")
            }
            className="flex-1 min-w-[150px] rounded-[26px] bg-[#8f140e] px-4 py-5 shadow-lg shadow-[#8f140e]/25 active:opacity-80"
          >
            <View className="h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
              <Feather name="edit-3" size={22} color="#ffffff" />
            </View>
            <Text className="mt-4 text-[17px] font-bold text-white">
              Marks Entry
            </Text>
            <Text className="mt-2 text-[13px] leading-5 text-white/85">
              Start entering or updating marks.
            </Text>
          </Pressable>

          <Pressable
            onPress={() =>
              router.push("/(teacher)/(tabs)/subject-teacher/students")
            }
            className="flex-1 min-w-[150px] rounded-[26px] border border-[#eaded3] bg-white px-4 py-5 shadow-lg shadow-[#5c231b]/8 active:opacity-80"
          >
            <View className="h-12 w-12 items-center justify-center rounded-2xl bg-[#8f140e]/10">
              <Feather name="users" size={22} color="#8f140e" />
            </View>
            <Text className="mt-4 text-[17px] font-bold text-[#7f2018]">
              Students
            </Text>
            <Text className="mt-2 text-[13px] leading-5 text-[#7f726b]">
              Open the student list for this subject.
            </Text>
          </Pressable>
        </View>

        <Pressable
          onPress={() =>
            router.push("/(teacher)/(tabs)/subject-teacher/alerts")
          }
          className="rounded-[26px] border border-[#eaded3] bg-[#fbf8f5] px-5 py-5 shadow-lg shadow-[#5c231b]/8 active:opacity-80"
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center flex-1">
              <View className="h-12 w-12 items-center justify-center rounded-2xl bg-[#8f140e]/10">
                <Feather name="bell" size={22} color="#8f140e" />
              </View>
              <View className="ml-4 flex-1">
                <Text className="text-[17px] font-bold text-[#7f2018]">
                  Alerts
                </Text>
                <Text className="mt-1 text-[13px] leading-5 text-[#7f726b]">
                  See subject-related notices and reminders.
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
