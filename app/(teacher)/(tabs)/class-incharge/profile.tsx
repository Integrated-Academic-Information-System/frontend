import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";

export default function ProfileScreen() {
  const user = {
    name: "John Doe",
    role: "Administrator",
    email: "johndoe@example.com",
    phone: "+94 77 123 4567",
    school: "Royal College",
    joinedDate: "12 Jan 2024",
    avatar: "https://i.pravatar.cc/300?img=68",
  };

  return (
    <View className="flex-1 bg-[#f4efe8]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Header / Profile Card */}
        <View className="mx-5 mt-5 rounded-[32px] bg-white px-5 py-6 shadow-sm">
          <View className="items-center">
            <Image
              source={{ uri: user.avatar }}
              className="h-28 w-28 rounded-full"
            />

            <Text className="mt-4 text-[28px] font-bold text-[#1f1f1f]">
              {user.name}
            </Text>

            <View className="mt-2 rounded-full bg-[#8f140e] px-4 py-1.5">
              <Text className="text-xs font-bold uppercase tracking-widest text-white">
                {user.role}
              </Text>
            </View>

            <Text className="mt-3 text-[15px] text-[#8e847f]">
              {user.email}
            </Text>
          </View>

          {/* Buttons */}
          <View className="mt-6 flex-row gap-3">
            <TouchableOpacity className="flex-1 flex-row items-center justify-center rounded-2xl bg-[#8f140e] py-3">
              <Feather name="edit-2" size={18} color="#fff" />
              <Text className="ml-2 text-sm font-bold text-white">
                Edit Profile
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-1 flex-row items-center justify-center rounded-2xl bg-[#f3eee8] py-3">
              <Feather name="settings" size={18} color="#7a0e08" />
              <Text className="ml-2 text-sm font-bold text-[#7a0e08]">
                Settings
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Personal Information */}
        <View className="mx-5 mt-5 rounded-[32px] bg-white px-5 py-6">
          <Text className="mb-5 text-[13px] font-bold uppercase tracking-[3px] text-[#8e847f]">
            Personal Information
          </Text>

          <InfoRow
            icon={<Feather name="mail" size={20} color="#8f140e" />}
            label="Email"
            value={user.email}
          />

          <InfoRow
            icon={<Feather name="phone" size={20} color="#8f140e" />}
            label="Phone"
            value={user.phone}
          />

          <InfoRow
            icon={<MaterialCommunityIcons name="school-outline" size={22} color="#8f140e" />}
            label="School"
            value={user.school}
          />

          <InfoRow
            icon={<Feather name="calendar" size={20} color="#8f140e" />}
            label="Joined"
            value={user.joinedDate}
            noBorder
          />
        </View>

        {/* Account Summary */}
        <View className="mx-5 mt-5 rounded-[32px] bg-white px-5 py-6">
          <Text className="mb-5 text-[13px] font-bold uppercase tracking-[3px] text-[#8e847f]">
            Account Summary
          </Text>

          <View className="flex-row gap-3">
            <SummaryCard title="Classes" value="12" />
            <SummaryCard title="Students" value="248" />
          </View>

          <View className="mt-3 flex-row gap-3">
            <SummaryCard title="Subjects" value="18" />
            <SummaryCard title="Alerts" value="6" />
          </View>
        </View>

        {/* Logout */}
        <View className="mx-5 mt-5 mb-8">
          <TouchableOpacity className="flex-row items-center justify-center rounded-2xl bg-[#fff1f1] py-4">
            <Feather name="log-out" size={18} color="#b00020" />
            <Text className="ml-2 text-sm font-bold text-[#b00020]">
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

function InfoRow({
  icon,
  label,
  value,
  noBorder = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  noBorder?: boolean;
}) {
  return (
    <View
      className={`flex-row items-center py-4 ${
        !noBorder ? "border-b border-[#f1ece7]" : ""
      }`}
    >
      <View className="mr-4 h-11 w-11 items-center justify-center rounded-2xl bg-[#f8f5f1]">
        {icon}
      </View>

      <View className="flex-1">
        <Text className="text-[12px] uppercase tracking-[2px] text-[#a59b96]">
          {label}
        </Text>
        <Text className="mt-1 text-[16px] font-semibold text-[#222]">
          {value}
        </Text>
      </View>
    </View>
  );
}

function SummaryCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <View className="flex-1 rounded-3xl bg-[#f8f5f1] px-4 py-5">
      <Text className="text-[12px] uppercase tracking-[2px] text-[#9d938d]">
        {title}
      </Text>
      <Text className="mt-2 text-[28px] font-bold text-[#7a0e08]">
        {value}
      </Text>
    </View>
  );
}