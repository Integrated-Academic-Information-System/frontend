import {
  getNotificationsApi,
  markNotificationReadApi,
  markAllNotificationsReadApi,
} from "../../../src/services/api";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface NotificationItem {
  id: number;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      setIsLoading(true);
      const res = await getNotificationsApi();
      setNotifications(res.data);
    } catch (error) {
      console.error("Failed to load notifications");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkRead = async (id: number) => {
    try {
      await markNotificationReadApi(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)),
      );
    } catch (error) {
      console.error("Failed to mark as read");
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllNotificationsReadApi();
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    } catch (error) {
      console.error("Failed to mark all as read");
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return (
    <SafeAreaView className="flex-1 bg-[#efeae4]" edges={["top"]}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 pb-12 pt-4"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between mb-6 px-1">
          <View>
            <Text className="text-[28px] font-extrabold text-[#212121]">
              Notifications
            </Text>
            <Text className="text-[14px] text-[#6d615c] font-medium mt-1">
              {unreadCount} unread
            </Text>
          </View>
          {unreadCount > 0 && (
            <Pressable
              onPress={handleMarkAllRead}
              className="flex-row items-center bg-white px-4 py-2 rounded-full shadow-sm border border-[#e0d9d4]"
            >
              <Feather name="check-circle" size={14} color="#8f140e" />
              <Text className="text-[12px] font-bold text-[#8f140e] ml-1">
                Mark all read
              </Text>
            </Pressable>
          )}
        </View>

        {/* Loading */}
        {isLoading ? (
          <View className="items-center justify-center py-20">
            <ActivityIndicator size="large" color="#8f140e" />
            <Text className="mt-4 text-[#8f140e] font-bold">
              Loading notifications...
            </Text>
          </View>
        ) : notifications.length === 0 ? (
          // Empty State
          <View className="items-center justify-center py-20">
            <Feather name="bell-off" size={64} color="#c9b8b2" />
            <Text className="mt-4 text-[18px] font-bold text-[#6d615c]">
              No notifications yet
            </Text>
            <Text className="mt-2 text-[14px] text-[#a5928a] text-center">
              You will see notifications here when marks are updated
            </Text>
          </View>
        ) : (
          // Notifications List
          <View className="gap-3">
            {notifications.map((notification) => (
              <Pressable
                key={notification.id}
                onPress={() =>
                  !notification.is_read && handleMarkRead(notification.id)
                }
                className={`rounded-[24px] p-5 shadow-sm shadow-black/5 ${
                  notification.is_read ? "bg-white" : "bg-[#fceeed]"
                }`}
              >
                <View className="flex-row items-start justify-between">
                  <View className="flex-1 mr-3">
                    <Text className="text-[16px] font-bold text-[#212121]">
                      {notification.title}
                    </Text>
                    <Text className="text-[13px] text-[#8e847f] mt-1">
                      {formatDate(notification.created_at)}
                    </Text>
                  </View>
                  {/* Unread dot */}
                  {!notification.is_read && (
                    <View className="h-3 w-3 rounded-full bg-[#8f140e] mt-1" />
                  )}
                </View>
                <View className="h-px bg-[#f0ebe6] my-3" />
                <Text className="text-[14px] text-[#6d615c] leading-5">
                  {notification.message}
                </Text>
                {!notification.is_read && (
                  <Text className="text-[11px] font-bold text-[#8f140e] mt-2">
                    Tap to mark as read
                  </Text>
                )}
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
