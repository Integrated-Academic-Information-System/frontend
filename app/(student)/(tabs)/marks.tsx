import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  Pressable,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

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

export default function MarksViewScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-[#efeae4]">
      <StatusBar barStyle="dark-content" />

      <ScrollView
        className="flex-1"
        contentContainerClassName="items-center py-6 px-4"
        showsVerticalScrollIndicator={false}
      >
        {/* MAIN CARD CONTAINER (ALIGNMENT FIX CORE) */}
        <View className="w-full max-w-[360px] bg-white rounded-[34px] px-5 py-6 shadow-lg shadow-black/10">

          {/* HEADER */}
          <View className="flex-row items-center justify-between">
            <Pressable className="p-2">
              <Feather name="arrow-left" size={20} color="#6d615c" />
            </Pressable>

            <Text className="text-[14px] font-semibold text-[#8f140e]">
              Academic Records
            </Text>

            <View className="w-9 h-9 rounded-full bg-[#8f140e]/10 items-center justify-center">
              <Text className="text-[#8f140e] font-bold">D</Text>
            </View>
          </View>

          {/* TITLE */}
          <Text className="mt-6 text-[12px] tracking-[1.5px] text-[#6f5f5a] font-bold uppercase">
            Student Progress
          </Text>

          <Text className="text-[30px] font-extrabold text-[#212121] mt-1">
            Marks View
          </Text>

          <Text className="text-[14px] text-[#6d615c] mt-2 leading-5">
            Track academic performance across all enrolled subjects.
          </Text>

          {/* SEARCH CARD */}
          <View className="mt-6 bg-[#fcfbfa] border border-[#f0ebe6] rounded-[24px] p-4 gap-3">

            <View className="flex-row items-center bg-[#e7e4e0] rounded-full px-4 h-12">
              <Feather name="search" size={18} color="#a58e86" />
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search subject..."
                placeholderTextColor="#a5928a"
                className="ml-2 flex-1 text-[#433735]"
              />
            </View>

            <View className="flex-row gap-3">
              <View className="flex-1 h-11 bg-[#e7e4e0] rounded-full justify-center px-4">
                <Text className="text-[#6d615c] text-[13px]">All Subjects</Text>
              </View>

              <View className="flex-1 h-11 bg-[#e7e4e0] rounded-full justify-center px-4">
                <Text className="text-[#6d615c] text-[13px]">Fall 2024</Text>
              </View>
            </View>

            <View className="flex-row gap-3 mt-2">
              <Pressable className="flex-1 h-11 justify-center items-center">
                <Text className="text-[#6d615c]">Back</Text>
              </Pressable>

              <Pressable className="flex-1 h-11 bg-[#8f140e] rounded-full justify-center items-center">
                <Text className="text-white font-semibold">View Results</Text>
              </Pressable>
            </View>
          </View>

          {/* SUBJECT HEADER */}
          <View className="mt-7 flex-row justify-between items-center">
            <Text className="text-[16px] font-bold text-[#212121]">
              Subject Performance
            </Text>
            <Text className="text-[12px] text-[#6d615c]">
              {SUBJECTS_DATA.length} records
            </Text>
          </View>

          {/* SUBJECT LIST */}
          <View className="mt-3 gap-3">
            {SUBJECTS_DATA.map((item) => (
              <View
                key={item.id}
                className="flex-row items-center justify-between bg-[#fcfbfa] border border-[#f0ebe6] rounded-[20px] p-4"
              >
                <View className="flex-row items-center gap-3 flex-1">
                  <View className="w-10 h-10 bg-white border border-[#f0ebe6] rounded-xl items-center justify-center">
                    <MaterialCommunityIcons
                      name={item.icon as any}
                      size={18}
                      color="#8f140e"
                    />
                  </View>

                  <View className="flex-1">
                    <Text className="font-semibold text-[#212121]">
                      {item.name}
                    </Text>
                    <Text className="text-[11px] text-[#6d615c]">
                      {item.teacher}
                    </Text>
                  </View>
                </View>

                <Text className="font-bold text-[#8f140e]">
                  {item.score}
                </Text>
              </View>
            ))}
          </View>

          {/* GPA CARD */}
          <View className="mt-7 bg-[#8f140e] rounded-[26px] p-5">
            <Text className="text-[#f3dada] text-[11px] tracking-[1px]">
              TERM PERFORMANCE
            </Text>

            <Text className="text-white text-[28px] font-bold mt-2">
              Exceptional Progress
            </Text>

            <Text className="text-[#f5f5f5] text-[13px] mt-2 leading-5">
              Strong consistency across all subjects indicates excellent academic standing.
            </Text>

            <View className="my-4 h-[1px] bg-[#a33a3a]" />

            <Text className="text-[#f3dada] text-[11px]">
              CUMULATIVE GPA
            </Text>

            <Text className="text-white text-[40px] font-bold">
              3.92
            </Text>

            <Text className="text-[#f3dada] text-[12px]">
              on 4.0 scale
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}