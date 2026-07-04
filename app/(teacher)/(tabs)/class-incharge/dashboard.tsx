import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useCallback, useState } from "react";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getClassTeacherStudents,
  ClassTeacherStudent,
} from "../../../../src/lib/classTeacherStudents";
import {
  DEFAULT_CLASS_NAME,
  getClassTeacherProfile,
} from "../../../../src/lib/classTeacherProfile";
import { useFocusEffect } from "@react-navigation/native";

const quickActions = [
  {
    title: "Update Marks",
    description: "Enter or review subject scores",
    icon: "book-open-variant",
    route: "/(teacher)/(tabs)/class-incharge/marks-entry",
    IconType: MaterialCommunityIcons,
  },
  {
    title: "Review Alerts",
    description: "See class warnings and notices",
    icon: "bell",
    route: "/(teacher)/(tabs)/class-incharge/alerts",
    IconType: Feather,
  },
  {
    title: "Students",
    description: "View and manage the class list",
    icon: "account-group-outline",
    route: "/(teacher)/(tabs)/class-incharge/students",
    IconType: MaterialCommunityIcons,
  },
];

const initialStudentCount = 3;

export default function ClassInchargeDashboard() {
  const router = useRouter();
  const [studentCount, setStudentCount] = useState(initialStudentCount);
  const [teacherName, setTeacherName] = useState("Username");
  const [className, setClassName] = useState(DEFAULT_CLASS_NAME);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const loadDashboardData = async () => {
        const storedStudents: ClassTeacherStudent[] =
          await getClassTeacherStudents();
        const profile = await getClassTeacherProfile();

        if (isActive) {
          setStudentCount(initialStudentCount + storedStudents.length);
          setTeacherName(profile.teacherName);
          setClassName(profile.className);
        }
      };

      loadDashboardData();

      return () => {
        isActive = false;
      };
    }, []),
  );

  const stats = [
    { label: "Students", value: String(studentCount), accent: "#8f140e" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#efeae4]">
      <ScrollView contentContainerClassName="px-6 pb-32 pt-4">
        <View className="flex-row items-center justify-between mb-6">

          <View className="flex-row items-center gap-3 rounded-full bg-white px-4 py-2 shadow-sm">
            <View className="h-10 w-10 rounded-full bg-[#8f140e] items-center justify-center">
              <Feather name="user" size={18} color="#fff" />
            </View>
            <View>
              <Text className="text-[12px] font-semibold text-[#8f140e] uppercase tracking-wider">
                {teacherName}
              </Text>
              <Text className="text-[12px] font-medium text-[#8e847f]">
                {className}
              </Text>
            </View>
          </View>
        </View>

        <View className="bg-[#8f140e] rounded-[28px] p-6 mb-5 shadow-lg shadow-[#8f140e]/20">
          <Text className="text-[12px] font-semibold text-white/75 uppercase tracking-[4px]">
            Class Incharge Dashboard
          </Text>
          <Text className="text-[30px] font-extrabold text-white mt-2 leading-tight">
            Manage your class from one place
          </Text>
          <Text className="text-white/80 mt-3 text-[14px] leading-5">
            Update marks, review class notices, and keep your class organized.
          </Text>
        </View>

        <View className="flex-row gap-3 mb-5">
          {stats.map((stat) => (
            <View
              key={stat.label}
              className="flex-1 bg-white rounded-3xl p-4 shadow-sm"
            >
              <Text className="text-[12px] font-semibold text-[#8e847f] uppercase tracking-wider">
                {stat.label}
              </Text>
              <Text
                className="text-[30px] font-extrabold mt-3"
                style={{ color: stat.accent }}
              >
                {stat.value}
              </Text>
            </View>
          ))}
        </View>

        <Text className="text-[18px] font-bold text-[#212121] mb-3">
          Quick Actions
        </Text>
        <View className="gap-3 mb-6">
          {quickActions.map((action) => (
            <Pressable
              key={action.title}
              onPress={() => router.push(action.route as any)}
              className="bg-white rounded-[24px] p-4 flex-row items-center shadow-sm active:opacity-80"
            >
              <View className="h-12 w-12 rounded-2xl bg-[#fceeed] items-center justify-center mr-4">
                <action.IconType
                  name={action.icon as any}
                  size={22}
                  color="#8f140e"
                />
              </View>
              <View className="flex-1">
                <Text className="text-[17px] font-bold text-[#212121]">
                  {action.title}
                </Text>
                <Text className="text-[13px] text-[#8e847f] mt-1">
                  {action.description}
                </Text>
              </View>
              <Feather name="chevron-right" size={20} color="#8e847f" />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}