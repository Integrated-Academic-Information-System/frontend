import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthGuard } from "@/hooks/useAuthGuard";

// ─── Types ───────────────────────────────────────────────────────────────────

type QuickAction = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  iconLib: "feather" | "material" | "ionicons";
  route: string;
};

type PerformanceItem = {
  id: string;
  subject: string;
  course: string;
  score: number;
  total: number;
  color: string;
  bgColor: string;
  symbol: string;
};

type NotificationItem = {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
};

// ─── Static Data ─────────────────────────────────────────────────────────────

const QUICK_ACTIONS: QuickAction[] = [
  {
    id: "marks",
    title: "View Marks",
    subtitle: "Detailed breakdown of current semester performance.",
    icon: "star",
    iconLib: "feather",
    route: "/(student)/(tabs)/marks",
  },
  {
    id: "profile",
    title: "My Profile",
    subtitle: "Manage your student credentials and preferences.",
    icon: "account-circle-outline",
    iconLib: "material",
    route: "/(student)/(tabs)/profile",
  },
  {
    id: "schedule",
    title: "Class Schedule",
    subtitle: "Check upcoming lectures, labs, and workshops.",
    icon: "calendar",
    iconLib: "feather",
    route: "/(student)/(tabs)/latest-results",
  },
];

const PERFORMANCE: PerformanceItem[] = [
  {
    id: "math",
    subject: "Mathematics",
    course: "Advanced Calculus II",
    score: 95,
    total: 100,
    color: "#1a73e8",
    bgColor: "#e8f0fe",
    symbol: "Σ",
  },
  {
    id: "chem",
    subject: "Chemistry",
    course: "Organic Chemistry Lab",
    score: 91,
    total: 100,
    color: "#d93025",
    bgColor: "#fce8e6",
    symbol: "⚗",
  },
  {
    id: "phys",
    subject: "Physics",
    course: "Quantum Mechanics",
    score: 88,
    total: 100,
    color: "#f9ab00",
    bgColor: "#fef7e0",
    symbol: "⚡",
  },
];

const NOTIFICATIONS: NotificationItem[] = [
  {
    id: "1",
    title: "Physics Quiz Results",
    body: 'Your results for "Weekly Quiz 08: Particle Physics" are now available. You scored higher than 83% of your peers.',
    time: "3h ago",
    read: false,
  },
  {
    id: "2",
    title: "School Holiday",
    body: "Please note that the campus will be closed next Friday for the Annual Faculty Symposium. No lectures scheduled.",
    time: "Yesterday",
    read: true,
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const ActionIcon = ({
  icon,
  iconLib,
  focused,
}: Pick<QuickAction, "icon" | "iconLib"> & { focused: boolean }) => {
  const color = focused ? "#8f140e" : "#6f5f5a";
  const size = 20;
  if (iconLib === "feather") return <Feather name={icon as any} size={size} color={color} />;
  if (iconLib === "material") return <MaterialCommunityIcons name={icon as any} size={size} color={color} />;
  return <Ionicons name={icon as any} size={size} color={color} />;
};

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function DashboardScreen() {

  useAuthGuard();

  const router = useRouter();
  const [userName, setUserName] = useState("Student");

  useEffect(() => {
    const loadUser = async () => {
      const stored = await AsyncStorage.getItem("userName");
      if (stored) setUserName(stored);
    };
    loadUser();
  }, []);



  const initials = userName
    .split(/[\s._-]/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <SafeAreaView className="flex-1 bg-[#efeae4]" edges={["top"]}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* ── Top Bar ── */}
        <View className="flex-row items-center justify-between px-4 pt-2 pb-3">
          <View className="flex-row items-center gap-3">
            <View className="w-9 h-9 rounded-full bg-[#e7e4e0] items-center justify-center">
              <Text style={{ fontSize: 13, fontWeight: "800", color: "#8f140e" }}>
                {initials}
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: 9, fontWeight: "800", color: "#a5928a", letterSpacing: 1, textTransform: "uppercase" }}>
                Student Hub
              </Text>
              <Text style={{ fontSize: 14, fontWeight: "800", color: "#1a1a1a", marginTop: 1 }}>
                {userName}
              </Text>
            </View>
          </View>

        </View>

        {/* ── Hero Academic Standing Card ── */}
        <View
          className="mx-4 mb-4 rounded-[22px] p-5"
          style={{ backgroundColor: "#8f140e" }}
        >
          <Text style={{ fontSize: 9, fontWeight: "800", color: "rgba(255,255,255,0.55)", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 }}>
            Academic Standing
          </Text>
          <Text style={{ fontSize: 48, fontWeight: "900", color: "#fff", lineHeight: 52 }}>
            92.4%
          </Text>
          <View className="flex-row gap-5 mt-4">
            <View>
              <Text style={{ fontSize: 9, color: "rgba(255,255,255,0.55)", fontWeight: "700", textTransform: "uppercase", letterSpacing: 1 }}>
                Class Rank
              </Text>
              <Text style={{ fontSize: 14, fontWeight: "800", color: "#fff", marginTop: 2 }}>
                #04
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: 9, color: "rgba(255,255,255,0.55)", fontWeight: "700", textTransform: "uppercase", letterSpacing: 1 }}>
                Standing
              </Text>
              <Text style={{ fontSize: 14, fontWeight: "800", color: "#fff", marginTop: 2 }}>
                Top 5% of your class
              </Text>
            </View>
          </View>
          <Pressable
            className="mt-4 bg-white rounded-full py-3 items-center"
            style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
          >
            <Text style={{ fontSize: 14, fontWeight: "700", color: "#8f140e" }}>
              View Transcript
            </Text>
          </Pressable>
        </View>

        {/* ── Quick Actions ── */}
        <View className="px-4 mb-2">
          <Text style={{ fontSize: 18, fontWeight: "900", color: "#1a1a1a", marginBottom: 12 }}>
            Quick Actions
          </Text>

          {QUICK_ACTIONS.map((action) => (
            <Pressable
              key={action.id}
              onPress={() => router.push(action.route as any)}
              className="bg-white rounded-2xl p-4 mb-2.5 flex-row items-start gap-3"
              style={({ pressed }) => ({
                opacity: pressed ? 0.85 : 1,
                borderWidth: 0.5,
                borderColor: "#f0ebe6",
              })}
            >
              <View
                className="w-10 h-10 rounded-full items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#fdf0f0" }}
              >
                <ActionIcon icon={action.icon} iconLib={action.iconLib} focused />
              </View>
              <View className="flex-1">
                <Text style={{ fontSize: 14, fontWeight: "800", color: "#1a1a1a" }}>
                  {action.title}
                </Text>
                <Text style={{ fontSize: 11, color: "#9c8b84", marginTop: 3, lineHeight: 16 }}>
                  {action.subtitle}
                </Text>
              </View>
              <Feather name="chevron-right" size={18} color="#c0b4af" style={{ marginTop: 2 }} />
            </Pressable>
          ))}
        </View>

        {/* ── Recent Performance ── */}
        <View className="px-4 mt-3 mb-2">
          <View className="flex-row justify-between items-center mb-3">
            <Text style={{ fontSize: 18, fontWeight: "900", color: "#1a1a1a" }}>
              Recent Performance
            </Text>
            <Pressable>
              <Text style={{ fontSize: 11, fontWeight: "800", color: "#8f140e" }}>
                Full Analytics
              </Text>
            </Pressable>
          </View>

          {PERFORMANCE.map((item) => (
            <View
              key={item.id}
              className="bg-white rounded-2xl px-4 py-3 mb-2 flex-row items-center gap-3"
              style={{ borderWidth: 0.5, borderColor: "#f0ebe6" }}
            >
              <View
                className="w-9 h-9 rounded-full items-center justify-center flex-shrink-0"
                style={{ backgroundColor: item.bgColor }}
              >
                <Text style={{ fontSize: 14, fontWeight: "800", color: item.color }}>
                  {item.symbol}
                </Text>
              </View>
              <View className="flex-1">
                <Text style={{ fontSize: 13, fontWeight: "800", color: "#1a1a1a" }}>
                  {item.subject}
                </Text>
                <Text style={{ fontSize: 10, color: "#9c8b84", marginTop: 1 }}>
                  {item.course}
                </Text>
              </View>
              <Text style={{ fontSize: 16, fontWeight: "900", color: "#1a1a1a" }}>
                {item.score}
                <Text style={{ fontSize: 10, color: "#9c8b84", fontWeight: "600" }}>
                  /{item.total}
                </Text>
              </Text>
            </View>
          ))}
        </View>

        {/* ── Latest Notifications ── */}
        <View className="px-4 mt-3">
          <Text style={{ fontSize: 18, fontWeight: "900", color: "#1a1a1a", marginBottom: 12 }}>
            Latest Notifications
          </Text>

          {NOTIFICATIONS.map((notif) => (
            <View
              key={notif.id}
              className="bg-white rounded-2xl p-4 mb-2.5"
              style={{ borderWidth: 0.5, borderColor: "#f0ebe6" }}
            >
              <View className="flex-row items-start justify-between mb-1">
                <View className="flex-row items-center gap-2 flex-1">
                  <View
                    className="w-2 h-2 rounded-full flex-shrink-0 mt-0.5"
                    style={{
                      backgroundColor: notif.read ? "transparent" : "#8f140e",
                      borderWidth: notif.read ? 1.5 : 0,
                      borderColor: "#c0b4af",
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "800",
                      color: notif.read ? "#1a1a1a" : "#8f140e",
                      flex: 1,
                    }}
                  >
                    {notif.title}
                  </Text>
                </View>
                <Text style={{ fontSize: 10, color: "#a5928a", marginLeft: 8 }}>
                  {notif.time}
                </Text>
              </View>
              <Text style={{ fontSize: 11, color: "#6f5f5a", lineHeight: 17, paddingLeft: 16 }}>
                {notif.body}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}