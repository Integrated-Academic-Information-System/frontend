import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform, Text, View, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, Slot } from "expo-router";


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

export default function StudentTabsLayout() {

const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const userName = await AsyncStorage.getItem("userName");

      const isAuthenticated = !!token;

      if (!isAuthenticated) {
        router.replace("/");
        return;
      }

      setChecking(false);
    };

    checkAuth();
  }, []);

  // Show a loader while checking
  if (checking) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
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
      {/* Add student-specific tabs here */}

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
        name="latest-results"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              iconName="trending-up"
              label="Results"
              IconType={Feather}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="marks"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              iconName="book-open-variant"
              label="Marks"
              IconType={MaterialCommunityIcons}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="notifications"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              iconName="bell"
              label="Notifications"
              IconType={Feather}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              iconName="account-circle-outline"
              label="Profile"
              IconType={MaterialCommunityIcons}
            />
          ),
        }}
      />

    </Tabs>

  );
}
