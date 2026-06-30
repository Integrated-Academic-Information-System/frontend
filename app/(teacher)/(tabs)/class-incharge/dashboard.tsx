import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function ClassInchargeDashboard() {
  useAuthGuard();
  const router = useRouter();

  const handleManageClasses = () => {
    // Screenshot eke thiyena classes.tsx ekata point karanawa
    router.push("/(teacher)/(tabs)/class-incharge/marks-entry");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#efeae4] items-center justify-center px-6 relative">

      <View className="items-center gap-8">
        <Text className="text-2xl font-bold text-[#8f140e]">Class Incharge</Text>

        <Pressable
          onPress={handleManageClasses}
          className="bg-[#8f140e] px-8 py-4 rounded-2xl shadow-lg shadow-[#8f140e]/30 active:opacity-80"
        >
          <Text className="text-lg font-bold text-white">
             Go to Marks Entry
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}