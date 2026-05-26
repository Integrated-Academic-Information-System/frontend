import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AlertsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#efeae4] items-center justify-center">
      <Text className="text-2xl font-bold text-[#8f140e]">Alerts</Text>
    </SafeAreaView>
  );
}
