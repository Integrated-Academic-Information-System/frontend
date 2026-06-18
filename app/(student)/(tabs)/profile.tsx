import React from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5, Feather } from '@expo/vector-icons';

export default function StudentProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-neutral-100">
      <StatusBar barStyle="dark-content" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }} className="px-4">
        
        {/* --- MAIN PROFILE CARD --- */}
        <View className="bg-white rounded-[24px] p-6 items-center mt-6 shadow-sm">
          <View className="rounded-[20px] p-1.5 bg-white border-2 border-[#E6A13B] mb-4">
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200' }} 
              className="w-[100px] h-[100px] rounded-[14px]" 
            />
          </View>
          
          <Text className="text-2xl font-extrabold text-neutral-900">Supun Piyumal</Text>
          <Text className="text-xs text-neutral-500 mt-1">ID: AC-2024-8842</Text>
          
          <View className="flex-row mt-3 mb-5">
            <View className="bg-neutral-100 px-3 py-1.5 rounded-xl mx-1">
              <Text className="text-[10px] font-bold text-neutral-600">GRADE 11</Text>
            </View>
            <View className="bg-neutral-100 px-3 py-1.5 rounded-xl mx-1">
              <Text className="text-[10px] font-bold text-neutral-600">TERM 2</Text>
            </View>
          </View>

          <TouchableOpacity className="bg-[#8f140e] w-full py-3.5 rounded-[20px] items-center mb-2.5 active:opacity-80">
            <Text className="text-white font-bold text-base">View Marks</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-neutral-200 w-full py-3.5 rounded-[20px] items-center active:opacity-80">
            <Text className="text-neutral-800 font-semibold text-base">Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* --- PERFORMANCE SECTION --- */}
        <View className="flex-row justify-between items-center mt-6 mb-3 px-1">
          <Text className="text-lg font-extrabold text-neutral-900">Performance</Text>
          <MaterialCommunityIcons name="trending-up" size={20} color="#8f140e" />
        </View>

        {/* GPA */}
        <View className="bg-white rounded-[18px] p-4 flex-row items-center mb-2.5 shadow-sm">
          <View className="w-10 h-10 rounded-full bg-red-50 justify-center items-center mr-4">
            <FontAwesome5 name="star" size={16} color="#8f140e" />
          </View>
          <View className="flex-1">
            <Text className="text-[10px] font-bold text-neutral-400 tracking-wider">AVERAGE GPA</Text>
            <Text className="text-lg font-extrabold text-neutral-900 mt-0.5">3.92</Text>
          </View>
        </View>

        {/* Credits */}
        <View className="bg-white rounded-[18px] p-4 flex-row items-center mb-2.5 shadow-sm">
          <View className="w-10 h-10 rounded-full bg-red-50 justify-center items-center mr-4">
            <FontAwesome5 name="graduation-cap" size={16} color="#8f140e" />
          </View>
          <View className="flex-1">
            <Text className="text-[10px] font-bold text-neutral-400 tracking-wider">CREDITS</Text>
            <Text className="text-lg font-extrabold text-neutral-900 mt-0.5">24/26</Text>
          </View>
        </View>

        {/* Attendance */}
        <View className="bg-white rounded-[18px] p-4 flex-row items-center mb-2.5 shadow-sm">
          <View className="w-10 h-10 rounded-full bg-red-50 justify-center items-center mr-4">
            <MaterialCommunityIcons name="calendar-month" size={18} color="#8f140e" />
          </View>
          <View className="flex-1">
            <Text className="text-[10px] font-bold text-neutral-400 tracking-wider">ATTENDANCE</Text>
            <Text className="text-lg font-extrabold text-neutral-900 mt-0.5">98%</Text>
          </View>
        </View>

        {/* --- PERSONAL DETAILS CARD --- */}
        <View className="bg-white rounded-[24px] p-5 mt-3 shadow-sm">
          <Text className="text-lg font-extrabold text-neutral-900 mb-4">Personal Details</Text>
          
          <View className="mb-4">
            <Text className="text-[9px] font-bold text-neutral-400 tracking-wider">FULL NAME</Text>
            <Text className="text-sm font-semibold text-neutral-900 mt-1">Supun Piyumal</Text>
          </View>

          <View className="mb-4">
            <Text className="text-[9px] font-bold text-neutral-400 tracking-wider">DATE OF BIRTH</Text>
            <Text className="text-sm font-semibold text-neutral-900 mt-1">May 14, 2007</Text>
          </View>

          <View className="mb-4">
            <Text className="text-[9px] font-bold text-neutral-400 tracking-wider">EMAIL ADDRESS</Text>
            <Text className="text-sm font-semibold text-neutral-900 mt-1">j.thorne@academy.edu</Text>
          </View>

          <View className="mb-1">
            <Text className="text-[9px] font-bold text-neutral-400 tracking-wider">EMERGENCY CONTACT</Text>
            <Text className="text-sm font-semibold text-neutral-900 mt-1">Elena Thorne (+1 555-0129)</Text>
          </View>
        </View>

        {/* --- CURRENT SUBJECTS SECTION --- */}
        <View className="flex-row justify-between items-center mt-6 mb-3 px-1">
          <Text className="text-lg font-extrabold text-neutral-900">Current Subjects</Text>
          <TouchableOpacity>
            <Text className="text-[#8f140e] font-bold text-xs">View Schedule</Text>
          </TouchableOpacity>
        </View>

        {/* Subject Rows */}
        {[
          { code: 'Σ', name: 'Advanced Mathematics', teacher: 'Prof. Aris Thorne' },
          { code: '⚗', name: 'Quantum Physics', teacher: 'Dr. Sarah Chen' },
          { code: '📖', name: 'Modern Literature', teacher: 'Julienne Vane' },
          { code: '<>', name: 'Computer Science II', teacher: 'Marcus Reed' }
        ].map((subject, index) => (
          <TouchableOpacity key={index} className="bg-white rounded-2xl p-3.5 flex-row items-center mb-2 shadow-xs border border-neutral-100">
            <View className="w-9 h-9 rounded-full bg-red-50 justify-center items-center">
              <Text className="text-sm font-bold text-[#8f140e]">{subject.code}</Text>
            </View>
            <View className="flex-1 ml-3.5">
              <Text className="text-sm font-bold text-neutral-800">{subject.name}</Text>
              <Text className="text-xs text-neutral-500 mt-0.5">{subject.teacher}</Text>
            </View>
            <Feather name="chevron-right" size={18} color="#A0A0A0" />
          </TouchableOpacity>
         ))}

      </ScrollView>
    </SafeAreaView>
  );
}