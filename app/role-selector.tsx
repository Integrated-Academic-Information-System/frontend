import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RoleSelectorScreen() {
  const router = useRouter();

  // Helper component to keep the buttons clean and uniform
  const RoleButton = ({ title, icon, path, IconType }: any) => (
    <Pressable
      onPress={() => router.replace(path)}
      className="w-full flex-row items-center bg-white p-4 rounded-2xl mb-4 shadow-lg shadow-black/5 active:opacity-70"
    >
      <View className="h-12 w-12 rounded-full bg-[#fceeed] items-center justify-center mr-4">
        <IconType name={icon} size={24} color="#8f140e" />
      </View>
      <View className="flex-1">
        <Text className="text-[18px] font-bold text-[#212121]">{title}</Text>
        <Text className="text-[12px] text-[#8e847f] mt-1">Tap to enter {title.toLowerCase()} view</Text>
      </View>
      <Feather name="chevron-right" size={20} color="#8e847f" />
    </Pressable>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#efeae4] px-6">
      
      {/* Header Area */}
      <View className="items-center mt-8 mb-10">
        <Image
          source={require("../assets/images/school-logo.png")} // Update path if needed
          className="h-16 w-16 rounded-full mb-4"
          style={{ width: 64, height: 64 }}
          resizeMode="cover"
        />
        <Text className="text-[28px] font-extrabold text-[#212121] text-center">
          Dev Environment
        </Text>
        <Text className="text-[14px] font-medium text-[#8f140e] mt-2 uppercase tracking-widest">
          Select User Role
        </Text>
      </View>

      {/* Role Buttons List */}
      <View className="w-full max-w-md self-center">
        
        {/* 1. Admin */}
        <RoleButton 
          title="Admin" 
          icon="shield-account-outline" 
          path="/(admin)/(tabs)/dashboard" 
          IconType={MaterialCommunityIcons}
        />

        {/* 2. Student */}
        <RoleButton 
          title="Student" 
          icon="account-school-outline" 
          path="/(student)/(tabs)/dashboard" 
          IconType={MaterialCommunityIcons}
        />

        {/* 3. Class Incharge (Teacher) */}
        <RoleButton 
          title="Class Incharge" 
          icon="human-male-board" 
          path="/(teacher)/(tabs)/class-incharge/dashboard" 
          IconType={MaterialCommunityIcons}
        />

        {/* 4. Subject Teacher */}
        <RoleButton 
          title="Subject Teacher" 
          icon="book-open-outline" 
          path="/(teacher)/(tabs)/subject-teacher/dashboard" 
          IconType={MaterialCommunityIcons}
        />

      </View>

      {/* Footer Info */}
      <View className="mt-auto mb-6 items-center">
         <View className="bg-[#fceeed] px-4 py-2 rounded-full flex-row items-center">
            <Feather name="alert-circle" size={14} color="#8f140e" />
            <Text className="text-[20px] font-bold text-[#8f140e] ml-2">
              Development Routing Only
            </Text>
         </View>
      </View>
      
    </SafeAreaView>
  );
}