import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useTeacherProfile } from "@/hooks/useTeacherProfile";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EditProfileModal from "../../../../src/components/EditProfileModal";

export default function ProfileScreen() {
  useAuthGuard();

  const { profile, loading, error, updateLocalProfile } = useTeacherProfile();
  const [modalVisible, setModalVisible] = useState(false);

  // ── Loading ──────────────────────────────────────────────
  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-[#f4efe8] justify-center items-center">
        <ActivityIndicator size="large" color="#8f140e" />
        <Text className="text-[#9c8b84] mt-3 text-sm">Loading profile...</Text>
      </SafeAreaView>
    );
  }

  // ── Error ────────────────────────────────────────────────
  if (error || !profile) {
    return (
      <SafeAreaView className="flex-1 bg-[#f4efe8] justify-center items-center px-6">
        <Text className="text-[#8f140e] font-bold text-base text-center">
          {error ?? "Failed to load profile."}
        </Text>
      </SafeAreaView>
    );
  }

  // ── Avatar URL from name ─────────────────────────────────
  const avatarUri = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    profile.name,
  )}&size=200&background=8f140e&color=fff&bold=true&rounded=false`;

  return (
    <View className="flex-1 bg-[#f4efe8]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* ── Profile Card ── */}
        <View className="mx-5 mt-5 rounded-[32px] bg-white px-5 py-6 shadow-sm">
          <View className="items-center">
            <Image
              source={{ uri: avatarUri }}
              className="h-28 w-28 rounded-[20px]"
            />

            <Text className="mt-4 text-[28px] font-bold text-[#1f1f1f]">
              {profile.name}
            </Text>

            <View className="mt-2 rounded-full bg-[#8f140e] px-4 py-1.5">
              <Text className="text-xs font-bold uppercase tracking-widest text-white">
                {profile.role}
              </Text>
            </View>

            <Text className="mt-3 text-[15px] text-[#8e847f]">
              {profile.email}
            </Text>
          </View>

          {/* Edit Button */}
          <View className="mt-6">
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              className="flex-row items-center justify-center rounded-2xl bg-[#8f140e] py-3"
            >
              <Feather name="edit-2" size={18} color="#fff" />
              <Text className="ml-2 text-sm font-bold text-white">
                Edit Profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Personal Information ── */}
        <View className="mx-5 mt-5 rounded-[32px] bg-white px-5 py-6">
          <Text className="mb-5 text-[13px] font-bold uppercase tracking-[3px] text-[#8e847f]">
            Personal Information
          </Text>

          <InfoRow
            icon={<Feather name="user" size={20} color="#8f140e" />}
            label="Username"
            value={profile.user_name}
          />
          <InfoRow
            icon={<Feather name="mail" size={20} color="#8f140e" />}
            label="Email"
            value={profile.email}
          />
          <InfoRow
            icon={<Feather name="phone" size={20} color="#8f140e" />}
            label="Phone"
            value={profile.mobile_number}
          />
          <InfoRow
            icon={
              <MaterialCommunityIcons
                name="school-outline"
                size={22}
                color="#8f140e"
              />
            }
            label="Role"
            value={profile.role}
            noBorder
          />
        </View>

        {/* ── Account Summary ── */}
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
      </ScrollView>

      {/* ── Edit Profile Modal ── */}
      <EditProfileModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSuccess={updateLocalProfile}
        currentEmail={profile.email}
        currentPhone={profile.mobile_number}
        apiEndpoint="/teacher/profile/update"
        tokenKey="authToken"
      />
    </View>
  );
}

// ─────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────
function SummaryCard({ title, value }: { title: string; value: string }) {
  return (
    <View className="flex-1 rounded-3xl bg-[#f8f5f1] px-4 py-5">
      <Text className="text-[12px] uppercase tracking-[2px] text-[#9d938d]">
        {title}
      </Text>
      <Text className="mt-2 text-[28px] font-bold text-[#7a0e08]">{value}</Text>
    </View>
  );
}
