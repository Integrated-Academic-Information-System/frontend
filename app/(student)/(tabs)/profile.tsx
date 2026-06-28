import React from 'react';
import { Text, View, Image, ScrollView, Pressable, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';

export default function StudentProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#efeae4]" edges={['top']}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-4 py-5 pb-12"
      >
        <View className="w-full max-w-[340px] self-center">

          {/* --- MAIN PROFILE CARD --- */}
          <View className="bg-white rounded-[28px] px-5 py-6 items-center mb-3 shadow-sm shadow-black/5">
            <View className="border-[2.5px] border-[#E6A13B] rounded-[18px] p-[5px] bg-white mb-4">
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200' }}
                className="w-24 h-24 rounded-[13px]"
                resizeMode="cover"
              />
            </View>

            <Text className="text-[20px] font-extrabold text-[#212121]">Supun Piyumal</Text>
            <Text className="text-[11px] text-[#9c8b84] mt-0.5">ID: AC-2024-8842</Text>

            <View className="flex-row gap-2 mt-3 mb-5">
              <View className="bg-[#f3efeb] px-3 py-1.5 rounded-xl">
                <Text className="text-[10px] font-extrabold text-[#6f5f5a] tracking-wide">GRADE 11</Text>
              </View>
              <View className="bg-[#f3efeb] px-3 py-1.5 rounded-xl">
                <Text className="text-[10px] font-extrabold text-[#6f5f5a] tracking-wide">TERM 2</Text>
              </View>
            </View>

            <Pressable
              className="h-14 w-full rounded-full bg-[#8f140e] items-center justify-center flex-row gap-2 mb-3"
              style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
            >
              <Text className="text-white font-bold text-[15px]">View Marks</Text>
              <Feather name="chevron-right" size={18} color="#fff" />
            </Pressable>

            <Pressable
              className="h-14 w-full rounded-full bg-[#e7e4e0] items-center justify-center flex-row gap-2"
              style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
            >
              <Feather name="edit-2" size={16} color="#3a3a3a" />
              <Text className="text-[#3a3a3a] font-semibold text-[15px]">Edit Profile</Text>
            </Pressable>
          </View>

          {/* --- PERFORMANCE SECTION --- */}
          <View className="flex-row justify-between items-center mt-4 mb-2.5 px-1">
            <Text className="text-[16px] font-extrabold text-[#212121]">Performance</Text>
            <Ionicons name="trending-up-outline" size={20} color="#8f140e" />
          </View>

          {[
            { icon: 'star', label: 'AVERAGE GPA', value: '3.92' },
            { icon: 'book-open', label: 'CREDITS', value: '24 / 26' },
            { icon: 'calendar', label: 'ATTENDANCE', value: '98%' },
          ].map(({ icon, label, value }) => (
            <View
              key={label}
              className="bg-white rounded-[18px] px-4 py-3.5 flex-row items-center mb-2 shadow-sm shadow-black/5"
            >
              <View className="w-[42px] h-[42px] rounded-full bg-[#fdf0f0] items-center justify-center mr-4">
                <Feather name={icon as any} size={18} color="#8f140e" />
              </View>
              <View>
                <Text className="text-[9px] font-extrabold text-[#a5928a] tracking-widest">{label}</Text>
                <Text className="text-[17px] font-extrabold text-[#212121] mt-0.5">{value}</Text>
              </View>
            </View>
          ))}

          {/* --- PERSONAL DETAILS CARD --- */}
          <View className="bg-white rounded-[28px] px-5 py-5 mt-2 shadow-sm shadow-black/5">
            <Text className="text-[16px] font-extrabold text-[#212121] mb-4">Personal Details</Text>

            {[
              { label: 'FULL NAME', value: 'Supun Piyumal', highlight: false },
              { label: 'DATE OF BIRTH', value: 'May 14, 2007', highlight: false },
              { label: 'EMAIL ADDRESS', value: 'supun@academy.edu', highlight: true },
              { label: 'EMERGENCY CONTACT', value: 'Elena Thorne (+1 555-0129)', highlight: false },
            ].map(({ label, value, highlight }, i, arr) => (
              <View key={label}>
                <View className="mb-3.5">
                  <Text className="text-[9px] font-extrabold text-[#a5928a] tracking-widest mb-1">{label}</Text>
                  <Text
                    className="text-[14px] font-semibold"
                    style={{ color: highlight ? '#8f140e' : '#2d2d2d' }}
                  >
                    {value}
                  </Text>
                </View>
                {i < arr.length - 1 && (
                  <View className="h-px bg-[#f0ebe6] mb-3.5" />
                )}
              </View>
            ))}
          </View>

          {/* --- CURRENT SUBJECTS SECTION --- */}
          <View className="flex-row justify-between items-center mt-5 mb-2.5 px-1">
            <Text className="text-[16px] font-extrabold text-[#212121]">Current Subjects</Text>
            <Pressable>
              <Text className="text-[#8f140e] font-extrabold text-xs">View Schedule</Text>
            </Pressable>
          </View>

          {[
            { code: 'Σ', name: 'Advanced Mathematics', teacher: 'Prof. Aris Thorne' },
            { code: '⚗', name: 'Quantum Physics', teacher: 'Dr. Sarah Chen' },
            { code: '📖', name: 'Modern Literature', teacher: 'Julienne Vane' },
            { code: '</>', name: 'Computer Science II', teacher: 'Marcus Reed' },
          ].map((subject, index) => (
            <Pressable
              key={index}
              className="bg-white rounded-2xl px-3.5 py-3 flex-row items-center mb-2 border border-[#f0ebe6]"
              style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
            >
              <View className="w-9 h-9 rounded-full bg-[#fdf0f0] justify-center items-center">
                <Text className="text-[13px] font-bold text-[#8f140e]">{subject.code}</Text>
              </View>
              <View className="flex-1 ml-3">
                <Text className="text-[13px] font-bold text-[#2d2d2d]">{subject.name}</Text>
                <Text className="text-[11px] text-[#9c8b84] mt-0.5">{subject.teacher}</Text>
              </View>
              <Feather name="chevron-right" size={18} color="#c0b4af" />
            </Pressable>
          ))}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}