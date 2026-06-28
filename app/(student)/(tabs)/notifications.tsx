import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type Notification = {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
  icon: string;
};

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "Mathematics Quiz",
    body: "Your marks for Term 1 have been updated. Log in to the student portal to view your detailed performance report.",
    time: "2 hours ago",
    read: false,
    icon: "star",
  },
  {
    id: "2",
    title: "Library Notice",
    body: "The book 'Advanced Physics' is currently overdue by 3 days. Please return it to avoid further fine accumulation.",
    time: "5 hours ago",
    read: false,
    icon: "book-open",
  },
  {
    id: "3",
    title: "New Announcement",
    body: "School holiday on Monday due to the regional cultural festival. Enjoy your long weekend, students!",
    time: "Yesterday",
    read: true,
    icon: "volume-2",
  },
  {
    id: "4",
    title: "Exam Schedule",
    body: "The final semester examination schedule for Fall 2023 has been released. Please download your hall tickets.",
    time: "2 days ago",
    read: true,
    icon: "calendar",
  },
];

export default function NotificationsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#efeae4]" edges={["top"]}>
      <StatusBar barStyle="dark-content" />

      {/* Top Bar */}
      <View className="flex-row items-center justify-between px-4 pt-2 pb-3">
        <View className="flex-row items-center gap-2">
          <View className="w-9 h-9 rounded-full bg-[#e7e4e0] items-center justify-center">
            <MaterialCommunityIcons name="school" size={20} color="#8f140e" />
          </View>
          <Text className="text-[15px] font-extrabold text-[#8f140e]">
            Academy Core
          </Text>
        </View>
        <View className="w-9 h-9 rounded-full bg-[#f0ebe6] items-center justify-center">
          <Ionicons name="notifications-outline" size={20} color="#8f140e" />
        </View>
      </View>
    </SafeAreaView>
  );
}