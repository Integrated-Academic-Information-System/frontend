import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function StudentDashboardScreen() {
  const router = useRouter();

  const handleViewResults = () => {
    // Screenshot eke thiyena latest-results file ekata point karanawa
    router.push("/(student)/(tabs)/latest-results");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#efeae4] items-center justify-center px-6 relative">
      <Pressable 
        onPress={() => router.replace("/role-selector")}
        className="absolute top-12 left-6 z-10 flex-row items-center bg-white px-3 py-2 rounded-full shadow-sm active:opacity-70"
      >
        <Feather name="arrow-left" size={18} color="#8f140e" />
        <Text className="ml-2 text-[14px] font-bold text-[#8f140e]">Roles</Text>
      </Pressable>

      <View className="items-center gap-8">
        <Text className="text-2xl font-bold text-[#8f140e]">Student Dashboard</Text>

        <Pressable
          onPress={handleViewResults}
          className="bg-[#8f140e] px-8 py-4 rounded-2xl shadow-lg shadow-[#8f140e]/30 active:opacity-80"
        >
          <Text className="text-lg font-bold text-white">
            View Latest Results
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}