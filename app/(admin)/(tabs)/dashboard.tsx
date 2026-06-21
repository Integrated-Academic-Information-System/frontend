import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function DashboardScreen() {

  useAuthGuard();

  const router = useRouter();

  const handleMarksEntry = () => {
    router.push("/(admin)/(tabs)/marks-entry");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#efeae4] items-center justify-center px-6 relative">
      {/* <Pressable 
        onPress={() => router.replace("/role-selector")}
        className="absolute top-12 left-6 z-10 flex-row items-center bg-white px-3 py-2 rounded-full shadow-sm active:opacity-70"
      >
        <Feather name="arrow-left" size={18} color="#8f140e" />
        <Text className="ml-2 text-[14px] font-bold text-[#8f140e]">Roles</Text>
      </Pressable> */}

      <View className="items-center gap-8">
        <Text className="text-2xl font-bold text-[#8f140e]">Dashboard</Text>

        <Pressable
          onPress={handleMarksEntry}
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
