import React from "react";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { 
  ScrollView, 
  Text, 
  View, 
  Pressable, 
  StatusBar,
  ImageBackground
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

export default function AdminDashboard() {
  return (
    <SafeAreaView className="flex-1 bg-[#f8f6f4]">
      <StatusBar barStyle="dark-content" />
      
      {/* Centered responsive container wrapper */}
      <View className="flex-1 w-full max-w-md mx-auto relative">
        
        <ScrollView 
          className="flex-1" 
          contentContainerStyle={{ paddingBottom: 140 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="px-6 pt-4">
            
            {/* Header Section */}
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <Feather name="menu" size={24} color="#8f140e" />
                <Text className="text-[20px] font-bold text-[#8f140e]">Admin</Text>
              </View>
              <View className="h-10 w-10 items-center justify-center rounded-full bg-[#2d2d2d]">
                <Feather name="user" size={18} color="white" />
              </View>
            </View>

            {/* Welcome Text */}
            <View className="mt-10">
              <Text className="text-[36px] font-bold tracking-tight text-[#212121]">
                Hello, Admin!
              </Text>
              <Text className="mt-2 text-[16px] leading-[22px] text-[#6d615c]">
                Your educational ecosystem is performing optimally today.
              </Text>
            </View>

            {/* Stats Section */}
            <View className="mt-8 gap-4">
              <View className="flex-row items-center justify-between rounded-[28px] bg-white p-6 shadow-sm shadow-black/5">
                <View className="h-12 w-12 items-center justify-center rounded-2xl bg-[#fff5f5]">
                  <Feather name="users" size={24} color="#8f140e" />
                </View>
                <View className="flex-1 px-4">
                  <Text className="text-[28px] font-bold text-[#8f140e]">1,284</Text>
                </View>
                <Text className="text-[12px] font-bold tracking-widest text-[#a39794]">STUDENTS</Text>
              </View>

              <View className="flex-row items-center justify-between rounded-[28px] bg-white p-6 shadow-sm shadow-black/5">
                <View className="h-12 w-12 items-center justify-center rounded-2xl bg-[#fff5f5]">
                  <Feather name="book" size={24} color="#8f140e" />
                </View>
                <View className="flex-1 px-4">
                  <Text className="text-[28px] font-bold text-[#8f140e]">42</Text>
                </View>
                <Text className="text-[12px] font-bold tracking-widest text-[#a39794]">SUBJECTS</Text>
              </View>
            </View>

            {/* Action Buttons with Routing */}
            <View className="mt-8 gap-3">
              <View className="flex-row gap-3">
                <Pressable 
                  onPress={() => router.push("/students")} 
                  className="h-14 flex-1 items-center justify-center rounded-full bg-[#8f140e] active:opacity-80"
                >
                  <Text className="text-[15px] font-bold text-white">View Students</Text>
                </Pressable>
                <Pressable 
                  onPress={() => router.push("/marks")} 
                  className="h-14 flex-1 items-center justify-center rounded-full bg-[#e7e5e2] active:opacity-70"
                >
                  <Text className="text-[15px] font-bold text-[#2d2d2d]">Enter Marks</Text>
                </Pressable>
              </View>
              
              <Pressable className="h-14 items-center justify-center rounded-full bg-[#e7e5e2] active:opacity-70">
                <Text className="text-[15px] font-bold text-[#2d2d2d]">User Management</Text>
              </Pressable>
            </View>

            {/* Recent Alerts Section */}
            <View className="mt-10 rounded-[32px] bg-[#f2f0ed] p-6">
              <Text className="text-[11px] font-bold tracking-[1.5px] text-[#8f140e]">SYSTEM STATUS</Text>
              <Text className="mt-1 text-[26px] font-bold text-[#212121]">Recent Alerts</Text>
              
              <View className="mt-6 gap-3">
                <View className="flex-row items-center gap-3 rounded-2xl bg-white p-4">
                  <View className="h-2 w-2 rounded-full bg-[#8f140e]" />
                  <Text className="text-[13px] font-medium text-[#433735]">Physics Lab: Missing marks for 12 students</Text>
                </View>
              </View>
            </View>

            {/* Master Plan Card */}
            <View className="mt-8 overflow-hidden rounded-[32px] bg-[#8f140e]">
              <ImageBackground 
                source={{ uri: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&q=80&w=1000' }} 
                className="h-[300px] justify-end p-6"
                imageStyle={{ opacity: 0.6 }}
              >
                <Text className="text-[24px] font-bold text-white">Master Plan Update 2024</Text>
                <Text className="mt-2 text-[14px] text-white/80">Review structural changes.</Text>
                <Pressable className="mt-4 w-32 rounded-full bg-white/20 px-4 py-2 border border-white/30">
                  <Text className="text-center text-[12px] font-bold text-white">VIEW REPORT</Text>
                </Pressable>
              </ImageBackground>
            </View>

          </View>
        </ScrollView>

        {/* --- FLOATING NAVBAR CONTAINED INSIDE RESPONSIVE BOUNDS --- */}
        <View className="absolute bottom-10 left-6 right-6 h-[72px] flex-row items-center justify-around rounded-full bg-[#e7e5e2] px-2 shadow-xl shadow-black/10">
          
          {/* Dashboard Tab (Current) */}
          <Pressable 
            onPress={() => router.push("/dashboard")}
            className="h-14 flex-row items-center gap-2 rounded-full bg-[#8f140e] px-5"
          >
            <MaterialCommunityIcons name="view-dashboard" size={20} color="white" />
            <Text className="text-[11px] font-bold text-white">DASHBOARD</Text>
          </Pressable>

          {/* Students Tab */}
          <Pressable 
            onPress={() => router.push("/students")} 
            className="items-center justify-center p-2 active:opacity-50"
          >
            <Feather name="users" size={20} color="#6d6a67" />
            <Text className="mt-1 text-[9px] font-bold text-[#6d6a67]">STUDENTS</Text>
          </Pressable>

          {/* Subjects Tab */}
          <Pressable 
            onPress={() => router.push("/subjects")}
            className="items-center justify-center p-2 active:opacity-50"
          >
            <Feather name="book-open" size={20} color="#6d6a67" />
            <Text className="mt-1 text-[9px] font-bold text-[#6d6a67]">SUBJECTS</Text>
          </Pressable>

          {/* Alerts Tab */}
          <Pressable 
            onPress={() => router.push("/alerts")}
            className="items-center justify-center p-2 active:opacity-50"
          >
            <Feather name="bell" size={20} color="#6d6a67" />
            <Text className="mt-1 text-[9px] font-bold text-[#6d6a67]">ALERTS</Text>
          </Pressable>
        </View>

      </View>
    </SafeAreaView>
  );
}