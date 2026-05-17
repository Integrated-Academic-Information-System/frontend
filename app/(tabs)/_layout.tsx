import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform, Text, View } from "react-native";

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
        className={`text-[9px] font-bold mt-1 tracking-wider uppercase ${
          focused ? "text-white" : "text-[#8e847f]"
        }`}
      >
        {label}
      </Text>
    </View>
  );
};

export default function GlobalTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // hide top default header
        tabBarShowLabel: false, // Default labels hide becouse put the  custom thing
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
      {/* HERE WE LINK THE API TABS.
        Since the folders are inside 'admin/', you need to give that path.
      */}

      {/* 1. Dashboard Tab */}
      <Tabs.Screen
        name="admin/dashboard"
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

      {/* 2. Students Tab */}
      <Tabs.Screen
        name="admin/students"
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

      {/* 3. Subjects / Marks Entry Tab (Oya hadapu eka) */}
      <Tabs.Screen
        name="admin/marks-entry"
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

      {/* 4. Alerts Tab */}
      <Tabs.Screen
        name="admin/alerts"
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

      {/* HIDE KARANNA ONE FILES TIKA:
        Me folders/files yatama bottom bar eke tab ekak widihata penna ona nathi nisa `href: null` danawa.
      */}
      <Tabs.Screen name="admin/_layout" options={{ href: null }} />
      <Tabs.Screen name="admin/subjects" options={{ href: null }} />
      <Tabs.Screen name="student" options={{ href: null }} />
      <Tabs.Screen name="teacher" options={{ href: null }} />
    </Tabs>
  );
}
