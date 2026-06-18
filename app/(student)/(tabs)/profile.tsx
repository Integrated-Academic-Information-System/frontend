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

      </ScrollView>
    </SafeAreaView>
  );
}