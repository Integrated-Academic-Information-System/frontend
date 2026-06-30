import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { 
  Pressable, 
  ScrollView, 
  Text, 
  View 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthGuard } from "@/hooks/useAuthGuard";


interface AdminAlert {
  id: string;
  category: "critical" | "warning" | "info";
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
}

export default function AlertsScreen() {
  const [activeFilter, setActiveFilter] = useState<"all" | "critical" | "warning" | "info">("all");

  // Mock array containing contextual system messages
  const initialAlerts: AdminAlert[] = [
    {
      id: "1",
      category: "critical",
      title: "Missing Grade Submissions",
      description: "Physics Lab: Marks are missing for 12 students in Section A. The submission deadline has passed.",
      timestamp: "10 mins ago",
      isRead: false,
    },
    {
      id: "2",
      category: "warning",
      title: "Scheduled Server Maintenance",
      description: "The core database cluster will undergo a rolling update tonight at 11:30 PM. Expect brief service interruptions.",
      timestamp: "1 hour ago",
      isRead: false,
    },
    {
      id: "3",
      category: "info",
      title: "Student Intake Sync Complete",
      description: "142 new registration profiles have been verified and synced successfully from the registration portal.",
      timestamp: "3 hours ago",
      isRead: true,
    },
    {
      id: "4",
      category: "critical",
      title: "Payment Gateway Timeout",
      description: "4 student financial transactions timed out at the checkout layer. Immediate review required.",
      timestamp: "5 hours ago",
      isRead: true,
    },
    {
      id: "5",
      category: "warning",
      title: "Syllabus Revisions Pending",
      description: "Computer Science Dept submitted curriculum adjustments awaiting formal admin approval.",
      timestamp: "Yesterday",
      isRead: true,
    }
  ];

  // Filtering Logic
  const filteredAlerts = initialAlerts.filter(
    (alert) => activeFilter === "all" || alert.category === activeFilter
  );

  // Helper mapping icon colors based on severity status
  const getCategoryMeta = (category: string) => {
    switch (category) {
      case "critical":
        return { color: "#dc2626", bg: "#fef2f2", icon: "alert-circle-outline" as const };
      case "warning":
        return { color: "#d97706", bg: "#fffbeb", icon: "warning-outline" as const };
      default:
        return { color: "#059669", bg: "#f0fdf4", icon: "information-circle-outline" as const };
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#efeae4]" edges={['top', 'left', 'right']}>
      
      {/* --- Top Navbar Context --- */}
      <View className="flex-row justify-between items-center px-6 pt-4 pb-3">
        <Text className="text-2xl font-bold text-[#8f140e]">Alerts</Text>
        <Pressable className="p-2 bg-white/60 rounded-full active:opacity-75">
          <MaterialCommunityIcons name="bell-check-outline" size={20} color="#8f140e" />
        </Pressable>
      </View>

      {/* --- Horizontal Filter Strip --- */}
      <View className="px-6 py-2">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-2">
          {(["all", "critical", "warning", "info"] as const).map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <Pressable
                key={filter}
                onPress={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full border mr-2 transition-all ${
                  isActive 
                    ? "bg-[#8f140e] border-[#8f140e]" 
                    : "bg-white/80 border-zinc-200"
                }`}
              >
                <Text className={`text-xs font-bold capitalize ${isActive ? "text-white" : "text-zinc-600"}`}>
                  {filter}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* --- Main Alerts List --- */}
      <ScrollView className="flex-1 px-6 mt-4" contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        <View className="gap-4">
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((alert) => {
              const meta = getCategoryMeta(alert.category);
              return (
                <View 
                  key={alert.id} 
                  className={`p-4 rounded-3xl bg-white border border-zinc-200/40 shadow-sm flex-row gap-3 relative ${
                    !alert.isRead ? "border-l-4 border-l-[#8f140e]" : ""
                  }`}
                >
                  {/* Left Side Status Indicator Ring Container */}
                  <View 
                    className="w-10 h-10 rounded-2xl items-center justify-center self-start"
                    style={{ backgroundColor: meta.bg }}
                  >
                    <Ionicons name={meta.icon} size={20} color={meta.color} />
                  </View>

                  {/* Body Copy Block */}
                  <View className="flex-1">
                    <View className="flex-row justify-between items-start pr-2">
                      <Text className="text-sm font-bold text-zinc-900 flex-1 mr-2 leading-tight">
                        {alert.title}
                      </Text>
                      <Text className="text-[10px] text-zinc-400 font-semibold mt-0.5">
                        {alert.timestamp}
                      </Text>
                    </View>
                    
                    <Text className="text-zinc-600 text-xs mt-1.5 leading-relaxed font-medium">
                      {alert.description}
                    </Text>
                  </View>

                  {/* Tiny unread bubble dot beacon marker */}
                  {!alert.isRead && (
                    <View className="absolute top-4 right-4 w-2 h-2 bg-[#8f140e] rounded-full" />
                  )}
                </View>
              );
            })
          ) : (
            // Fallback Empty State Display 
            <View className="items-center justify-center py-20 gap-2">
              <Feather name="bell-off" size={40} color="#8f140e" style={{ opacity: 0.4 }} />
              <Text className="text-zinc-500 font-semibold text-sm mt-2">No notifications found</Text>
            </View>
          )}
        </View>
      </ScrollView>
=======

  useAuthGuard();

  return (
    
    <SafeAreaView className="flex-1 bg-[#efeae4] items-center justify-center">
      <Text className="text-2xl font-bold text-[#8f140e]">Alerts</Text>
    </SafeAreaView>
  );
}