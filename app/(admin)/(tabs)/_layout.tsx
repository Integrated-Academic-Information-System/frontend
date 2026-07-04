import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, Tabs } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Reusable component for Tab Icons
const TabIcon = ({ focused, iconName, label, IconType }: any) => {
  return (
    <View
      className={`items-center justify-center rounded-full ${
        focused
          ? "bg-[#8f140e] px-3 py-1.5 h-[52px] min-w-[64px]"
          : "h-12 min-w-[50px]"
      }`}
    >
      <IconType
        name={iconName}
        size={focused ? 20 : 24}
        color={focused ? "#ffffff" : "#8e847f"}
      />
      <Text
        className={`text-[8.5px] font-bold mt-1 tracking-wider uppercase ${
          focused ? "text-white" : "text-[#8e847f]"
        }`}
      >
        {label}
      </Text>
    </View>
  );
};

// Menu items for the hamburger drawer
const MENU_ITEMS = [
  {
    label: "Student Management",
    route: "/admin/students",
    icon: "users",
    IconType: Feather,
  },
  {
    label: "Dashboard",
    route: "/admin/dashboard",
    icon: "view-dashboard-outline",
    IconType: MaterialCommunityIcons,
  },
  {
    label: "Performance",
    route: "/admin/performance",
    icon: "trending-up",
    IconType: Feather,
  },
  { label: "Alerts", route: "/admin/alerts", icon: "bell", IconType: Feather },
  {
    label: "Analytics",
    route: "/admin/analytics",
    icon: "bar-chart-2",
    IconType: Feather,
  },
  {
    label: "Accounts",
    route: "/admin/accounts",
    icon: "user",
    IconType: Feather,
  },
  {
    label: "Curriculum",
    route: "/admin/curriculum",
    icon: "book-open-variant",
    IconType: MaterialCommunityIcons,
  },
];

export default function AdminTabsLayout() {
  const [checking, setChecking] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const userName = await AsyncStorage.getItem("userName");

      const isAuthenticated = !!token;
      const isAdmin = userName?.toLowerCase().includes("admin");

      if (!isAuthenticated || !isAdmin) {
        if (typeof window !== "undefined") {
          window.location.href = "/";
        } else {
          router.replace("/");
        }
        return;
      }

      setChecking(false);
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    setMenuVisible(false);
    try {
      const token = await AsyncStorage.getItem("authToken");
      await fetch(`${process.env.EXPO_PUBLIC_API_URL}` + "/admin/logout", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (e) {
      console.log("Logout request failed:", e);
    } finally {
      await AsyncStorage.multiRemove(["authToken", "userName"]);
      if (typeof window !== "undefined") {
        window.location.href = "/";
      } else {
        router.replace("/");
      }
    }
  };

  const handleMenuItemPress = (route: string) => {
    setMenuVisible(false);
    router.push(route as any);
  };

  // Show a loader while checking
  if (checking) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: true,
          headerTitle: "Admin",
          headerTitleAlign: "left",
          headerStyle: {
            backgroundColor: "#fcfbfa",
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 2,
            borderBottomColor: "#e6e4e1",
          },
          headerTitleStyle: {
            color: "#7a0e08",
            fontSize: 24,
            fontWeight: "bold",
          },
          headerTitleContainerStyle: {
            justifyContent: "center",
            paddingLeft: 20,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => setMenuVisible(true)}
              style={{ marginLeft: 20, marginRight: -10 }}
            >
              <Feather name="menu" size={26} color="#7a0e08" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => console.log("Avatar Pressed")}
              style={{
                marginRight: 20,
                justifyContent: "center",
                marginBottom: 10,
              }}
            >
              <Image
                source={{ uri: "https://i.pravatar.cc/150?img=68" }}
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 21,
                  backgroundColor: "#2c3036",
                }}
              />
            </TouchableOpacity>
          ),
          tabBarShowLabel: false,
          tabBarStyle: {
            position: "absolute",
            bottom: Platform.OS === "ios" ? 24 : 16,
            left: 16,
            right: 16,
            elevation: 5,
            backgroundColor: "#f7f5f2",
            borderRadius: 40,
            height: 72,
            paddingHorizontal: 8,
            paddingBottom: 0,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 15,
            shadowOffset: { width: 0, height: 10 },
            borderTopWidth: 0,
          },
        }}
      >
        <Tabs.Screen
          name="dashboard"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon
                focused={focused}
                iconName="view-dashboard-outline"
                label="Dashboard"
                IconType={MaterialCommunityIcons}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="students"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon
                focused={focused}
                iconName="users"
                label="Students"
                IconType={Feather}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="marks-entry"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon
                focused={focused}
                iconName="book-open-variant"
                label="Subjects"
                IconType={MaterialCommunityIcons}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="alerts"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon
                focused={focused}
                iconName="bell"
                label="Alerts"
                IconType={Feather}
              />
            ),
          }}
        />
      </Tabs>

      {/* Hamburger Menu Modal */}
      <Modal
        visible={menuVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setMenuVisible(false)}
      >
        {/* Backdrop - tap to close */}
        <Pressable
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.4)" }}
          onPress={() => setMenuVisible(false)}
        >
          {/* Stop propagation so tapping inside the panel doesn't close it */}
          <Pressable
            style={{
              width: 280,
              height: "100%",
              backgroundColor: "#fcfbfa",
              paddingTop: Platform.OS === "ios" ? 60 : 40,
              paddingHorizontal: 16,
              shadowColor: "#000",
              shadowOpacity: 0.2,
              shadowRadius: 10,
              shadowOffset: { width: 2, height: 0 },
            }}
          >
            <Text
              style={{
                color: "#7a0e08",
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 24,
                paddingHorizontal: 8,
              }}
            >
              Menu
            </Text>

            {MENU_ITEMS.map((item) => (
              <TouchableOpacity
                key={item.label}
                onPress={() => handleMenuItemPress(item.route)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 14,
                  paddingHorizontal: 8,
                  borderRadius: 12,
                }}
              >
                <item.IconType
                  name={item.icon as any}
                  size={20}
                  color="#7a0e08"
                />
                <Text
                  style={{
                    marginLeft: 14,
                    fontSize: 15,
                    fontWeight: "600",
                    color: "#3a3530",
                  }}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
            {/* Divider */}
            <View
              style={{
                height: 1,
                backgroundColor: "#e6e4e1",
                marginVertical: 12,
              }}
            />

            <TouchableOpacity
              onPress={handleLogout}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 14,
                paddingHorizontal: 8,
                borderRadius: 12,
              }}
            >
              <Feather name="log-out" size={20} color="#c0392b" />
              <Text
                style={{
                  marginLeft: 14,
                  fontSize: 15,
                  fontWeight: "600",
                  color: "#c0392b",
                }}
              >
                Logout
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}
