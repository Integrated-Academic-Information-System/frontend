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

export default function StudentTabsLayout() {
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
    </Tabs>
  );
}
