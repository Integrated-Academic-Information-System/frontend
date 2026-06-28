import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, StatusBar, Text, View } from "react-native";
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

// ─── Notification Card Component ───────────────────────────
const NotificationCard = ({
  item,
  onMarkRead,
}: {
  item: Notification;
  onMarkRead: (id: string) => void;
}) => (
  <View
    className="bg-white rounded-[20px] p-4 mb-2.5"
    style={{
      shadowColor: "#000",
      shadowOpacity: 0.05,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 1 },
      elevation: 2,
    }}
  >
    <View className="flex-row items-start gap-3">
      <View
        className="w-10 h-10 rounded-full items-center justify-center flex-shrink-0"
        style={{ backgroundColor: item.read ? "#f0ebe6" : "#fdf0f0" }}
      >
        <Feather
          name={item.icon as any}
          size={18}
          color={item.read ? "#9c8b84" : "#8f140e"}
        />
        {!item.read && (
          <View
            className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-[#8f140e]"
            style={{ borderWidth: 1.5, borderColor: "#fff" }}
          />
        )}
      </View>

      <View className="flex-1">
        <View className="flex-row justify-between items-start">
          <Text className="text-[14px] font-extrabold text-[#1a1a1a] flex-1 pr-2 leading-snug">
            {item.title}
          </Text>
          <Text className="text-[11px] text-[#a5928a] flex-shrink-0 mt-0.5">
            {item.time}
          </Text>
        </View>
        <Text className="text-[12px] text-[#6f5f5a] leading-relaxed mt-1.5">
          {item.body}
        </Text>

        {!item.read && (
          <Pressable
            onPress={() => onMarkRead(item.id)}
            className="flex-row items-center gap-1 mt-2.5"
          >
            <Text className="text-[11px] font-bold text-[#8f140e]">
              Mark as Read
            </Text>
            <Feather name="check" size={12} color="#8f140e" />
          </Pressable>
        )}
      </View>
    </View>
  </View>
);

export default function NotificationsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#efeae4]" edges={["top"]}>
      <StatusBar barStyle="dark-content" />

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

      {/* Preview card - static for now */}
      <View className="px-4">
        <NotificationCard
          item={INITIAL_NOTIFICATIONS[0]}
          onMarkRead={() => {}}
        />
      </View>
    </SafeAreaView>
  );
}