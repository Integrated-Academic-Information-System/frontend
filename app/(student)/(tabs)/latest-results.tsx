import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  Pressable,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuthGuard } from "@/hooks/useAuthGuard";

// Mock Data for subjects matching the layout
const SUBJECTS_DATA = [
  {
    id: "1",
    name: "Advanced Mathematics",
    teacher: "Dr. Aris Thorne",
    score: "38/40",
    icon: "sigma",
  },
  {
    id: "2",
    name: "Quantum Physics",
    teacher: "Prof. Selina Kyle",
    score: "35/40",
    icon: "atom",
  },
  {
    id: "3",
    name: "Global History II",
    teacher: "Mr. Arthur Pendragon",
    score: "32/40",
    icon: "book-open-variant",
  },
  {
    id: "4",
    name: "Microeconomics",
    teacher: "Ms. Clara Prince",
    score: "39/40",
    icon: "chart-timeline-variant",
  },
];

export default function ResultsDashboard() {

  useAuthGuard();

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-[#efeae4]">
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          className="flex-1"
          contentContainerClassName="min-h-full px-4 py-5"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="w-full items-center gap-5">
            
            {/* INNER MAIN CONTENT ENVELOPE CARD */}
            <View className="w-full max-w-[340px] rounded-[34px] bg-white px-5 py-6 shadow-2xl shadow-black/10">
              
              {/* HEADER BRANDING SECTION */}
              <View className="items-center pt-2">
                <View className="w-full flex-row items-start gap-3">
                  <View className="w-[42px] h-[42px] bg-[#8f140e]/10 rounded-full items-center justify-center">
                    <Ionicons name="school" size={20} color="#8f140e" />
                  </View>
                  <View className="flex-1">
                    <Text className="mt-0.5 text-[15px] font-bold leading-5 text-[#8f140e]">
                      R/ Belihuloya Dhammarathana Maha Vidyalaya
                    </Text>
                  </View>
                  <Pressable className="p-1 rounded-full active:bg-gray-100">
                    <Feather name="bell" size={20} color="#6d615c" />
                  </Pressable>
                </View>
              </View>

              {/* WELCOME TITLE ROW */}
              <View className="mt-10">
                <Text className="text-[12px] font-bold tracking-[1.8px] text-[#6f5f5a] uppercase">
                  Academic Session 2023/24
                </Text>
                <Text className="text-[32px] font-extrabold leading-[38px] text-[#212121] mt-2">
                  Academic Results
                </Text>
                <Text className="mt-2 text-[16px] leading-[22px] text-[#6d615c]">
                  Your current standing reflects exceptional academic progress this term.
                </Text>
              </View>

              {/* SECURITY / PRIVACY BADGE BANNER */}
              <View className="mt-6 flex-row items-center gap-2.5 bg-[#fdf5d5] border border-[#f5e6a5] rounded-2xl px-4 py-3">
                <Feather name="lock" size={15} color="#856404" />
                <Text className="text-[13px] font-semibold text-[#856404]">
                  Private View • Student Data Only
                </Text>
              </View>

              {/* METRIC ROW CARDS SECTION */}
              <View className="mt-8 gap-4">
                
                {/* METRIC 1: Term GPA */}
                <View className="bg-[#fcfbfa] border border-[#f0ebe6] rounded-[24px] p-4 flex-row justify-between items-center">
                  <View className="flex-1">
                    <Text className="text-[11px] font-bold text-[#a58e86] uppercase tracking-[1px]">
                      Term GPA
                    </Text>
                    <View className="flex-row items-baseline gap-0.5 mt-1">
                      <Text className="text-[28px] font-black text-[#212121]">3.82</Text>
                      <Text className="text-[14px] font-medium text-[#a58e86]">/ 4.0</Text>
                    </View>
                    <View className="bg-[#e6f4ea] self-start px-2 py-0.5 rounded-md mt-2">
                      <Text className="text-[11px] font-bold text-[#137333]">+0.05 vs mid-term</Text>
                    </View>
                  </View>
                  <MaterialCommunityIcons name="school-outline" size={44} color="#dfd8d3" />
                </View>

                {/* METRIC 2: Rank in Class */}
                <View className="bg-[#fcfbfa] border border-[#f0ebe6] rounded-[24px] p-4 flex-row justify-between items-center">
                  <View className="flex-1">
                    <Text className="text-[11px] font-bold text-[#a58e86] uppercase tracking-[1px]">
                      Rank in Class
                    </Text>
                    <View className="flex-row items-baseline gap-0.5 mt-1">
                      <Text className="text-[28px] font-black text-[#212121]">04</Text>
                      <Text className="text-[14px] font-medium text-[#a58e86]">of 124</Text>
                    </View>
                    <View className="w-full h-1.5 bg-[#e7e4e0] rounded-full mt-3 overflow-hidden">
                      <View className="w-[90%] h-full bg-[#ffca28]" />
                    </View>
                  </View>
                  <MaterialCommunityIcons name="medal-outline" size={44} color="#dfd8d3" />
                </View>
              </View>

              {/* SEARCH & INPUT CONTROLS */}
              <View className="mt-8">
                <Text className="mb-3 text-[12px] font-bold tracking-[1.8px] text-[#6f5f5a]">
                  FILTER BY SUBJECT
                </Text>
                <View className="h-14 flex-row items-center rounded-full bg-[#e7e4e0] px-4">
                  <Feather name="search" size={19} color="#a58e86" />
                  <TextInput
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder="Search subject..."
                    placeholderTextColor="#a5928a"
                    autoCapitalize="none"
                    autoCorrect={false}
                    className="ml-3 flex-1 text-[17px] text-[#433735]"
                  />
                </View>
              </View>

              {/* RESULTS SUB-TABLE CONTAINER */}
              <View className="mt-6 border border-[#f0ebe6] rounded-[24px] overflow-hidden bg-[#fcfbfa]">
                <View className="bg-[#f3efeb] px-4 py-3 border-b border-[#f0ebe6] flex-row justify-between">
                  <Text className="text-[11px] font-bold tracking-[1px] text-[#a58e86] uppercase">Subject</Text>
                  <Text className="text-[11px] font-bold tracking-[1px] text-[#a58e86] uppercase text-right">Marks</Text>
                </View>

                {SUBJECTS_DATA.filter((sub) =>
                  sub.name.toLowerCase().includes(searchQuery.toLowerCase())
                ).map((item, index, filteredArray) => (
                  <View
                    key={item.id}
                    className={`px-4 py-3.5 flex-row items-center justify-between ${
                      index !== filteredArray.length - 1 ? "border-b border-[#f0ebe6]" : ""
                    }`}
                  >
                    <View className="flex-row items-center flex-1 pr-3 gap-3">
                      <View className="w-9 h-9 rounded-xl bg-white border border-[#f0ebe6] items-center justify-center">
                        <MaterialCommunityIcons name={item.icon as any} size={17} color="#8f140e" />
                      </View>
                      <View className="flex-1">
                        <Text className="text-[14px] font-bold text-[#212121]" numberOfLines={1}>
                          {item.name}
                        </Text>
                        <Text className="text-[11px] text-[#a58e86] mt-0.5" numberOfLines={1}>
                          {item.teacher}
                        </Text>
                      </View>
                    </View>
                    <Text className="text-[15px] font-bold text-[#8f140e] text-right">
                      {item.score}
                    </Text>
                  </View>
                ))}
              </View>

              {/* ACTION CALLOUT BUTTON ACTIONS */}
              <View className="mt-8 gap-3">
                <Pressable
                  className="h-14 items-center justify-center rounded-full bg-[#8f140e] shadow-lg shadow-black/20 active:opacity-90"
                  onPress={() => {}}
                >
                  <View className="flex-row items-center gap-2">
                    <Feather name="printer" size={18} color="#fff" />
                    <Text className="text-[16px] font-semibold text-white tracking-[0.4px]">
                      PRINT TRANSCRIPT
                    </Text>
                  </View>
                </Pressable>
              </View>

              {/* SYSTEM DETAILS METADATA FOOTER */}
              <View className="mt-8 pt-6 border-t border-[#f0ebe6]">
                <Text className="text-center text-[12px] leading-5 text-[#6c625d]">
                  System Version 11.0 • Student Portal Record
                </Text>
              </View>

            </View>

            {/* SECURE SUB-FOOTER UTILITIES */}
            <View className="w-full max-w-[340px] items-center gap-2 px-2 pb-4">
              <View className="flex-row items-center gap-2">
                <Ionicons name="shield-checkmark-outline" size={16} color="#78716c" />
                <Text className="text-[14px] text-[#6d6a67]">
                  Official Academic Information Desk
                </Text>
              </View>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}