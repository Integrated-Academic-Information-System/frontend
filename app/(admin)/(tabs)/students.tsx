import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function StudentsScreen() {

useAuthGuard();

  return (
    <SafeAreaView className="flex-1 bg-[#efeae4] items-center justify-center">
      <Text className="text-2xl font-bold text-[#8f140e]">Students</Text>
    </SafeAreaView>
  );
}
