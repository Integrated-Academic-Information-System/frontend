import { Feather } from "@expo/vector-icons";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useStudentProfile } from "@/hooks/useStudentProfile";
import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function StudentProfileScreen() {
  useAuthGuard();
  const { profile, loading, error, refetch } = useStudentProfile(); // ← call the hook

  // Loading state
  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-[#efeae4] justify-center items-center">
        <ActivityIndicator size="large" color="#8f140e" />
        <Text className="text-[#9c8b84] mt-3 text-sm">Loading profile...</Text>
      </SafeAreaView>
    );
  }

  // Error state
  if (error || !profile) {
    return (
      <SafeAreaView className="flex-1 bg-[#efeae4] justify-center items-center px-6">
        <Text className="text-[#8f140e] font-bold text-base mb-2">
          Failed to load profile
        </Text>
        <Text className="text-[#9c8b84] text-sm text-center mb-4">{error}</Text>
        <Pressable
          onPress={refetch}
          className="bg-[#8f140e] px-5 py-2.5 rounded-xl"
        >
          <Text className="text-white font-bold text-sm">Try Again</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const personalDetails = [
    { label: "FULL NAME", value: profile.name, highlight: false },
    { label: "DATE OF BIRTH", value: profile.dob, highlight: false },
    { label: "ADDRESS", value: profile.address, highlight: true },
    {
      label: "CONTACT NUMBER",
      value: profile.mobile_number,
      highlight: false,
    },
    { label: "EMAIL ADDRESS", value: profile.email, highlight: false },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#efeae4]" edges={["top"]}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        className="flex-1 mb-20"
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-4 py-5 pb-12"
      >
        <View className="w-full max-w-[340px] self-center">
          {/* --- MAIN PROFILE CARD --- */}
          <View className="bg-white rounded-[28px] px-5 py-6 items-center mb-3 shadow-sm shadow-black/5">
            <View className="border-[2.5px] border-[#E6A13B] rounded-[18px] p-[5px] bg-white mb-4">
              <Image
                source={{
                  uri: `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&size=200&background=8f140e&color=fff&bold=true&rounded=false`,
                }}
                className="w-24 h-24 rounded-[13px]"
                resizeMode="cover"
              />
            </View>

            <Text className="text-[20px] font-extrabold text-[#212121]">
              {profile.name}
            </Text>
            <Text className="text-[11px] text-[#9c8b84] mt-0.5">
              Reg.No: {profile.reg_no}
            </Text>

            <View className="flex-row gap-2 mt-3 mb-5">
              <View className="bg-[#f3efeb] px-3 py-1.5 rounded-xl">
                <Text className="text-[10px] font-extrabold text-[#6f5f5a] tracking-wide">
                  {profile.grade}
                </Text>
              </View>
            </View>
          </View>

          {/* --- PERFORMANCE SECTION --- */}
          <View className="flex-row justify-between items-center mt-4 mb-2.5 px-1">
            <Text className="text-[16px] font-extrabold text-[#212121]">
              Personal Details
            </Text>
          </View>

          {/* --- PERSONAL DETAILS CARD --- */}
          <View className="bg-white rounded-[28px] px-5 py-5 mt-2 shadow-sm shadow-black/5">
            {personalDetails.map(({ label, value, highlight }, i, arr) => (
              <View key={label}>
                <View className="mb-3.5">
                  <Text className="text-[9px] font-extrabold text-[#a5928a] tracking-widest mb-1">
                    {label}
                  </Text>
                  <Text
                    className="text-[14px] font-semibold"
                    style={{ color: highlight ? "#8f140e" : "#2d2d2d" }}
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

          {/* CORE SUBJECTS */}
          <View className="flex-row justify-between items-center mt-5 mb-2.5 px-1">
            <Text className="text-[16px] font-extrabold text-[#212121]">
              Core Subjects
            </Text>
          </View>

          {profile.core_subjects.length === 0 ? (
            <Text className="text-[#9c8b84] text-sm px-1">
              No core subjects assigned.
            </Text>
          ) : (
            profile.core_subjects.map(
              (subject: { id: number; name: string; subject_code: string }) => (
                <Pressable
                  key={subject.id}
                  className="bg-white rounded-2xl px-3.5 py-3 flex-row items-center border border-[#f0ebe6] mb-2"
                  style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
                >
                  <View className="w-9 h-9 rounded-full bg-[#fdf0f0] justify-center items-center">
                    <Text className="text-[13px]">📚</Text>
                  </View>
                  <View className="flex-1 ml-3">
                    <Text className="text-[13px] font-bold text-[#2d2d2d]">
                      {subject.name}
                    </Text>
                    <Text className="text-[10px] text-[#9c8b84]">
                      {subject.subject_code}
                    </Text>
                  </View>
                  <Feather name="chevron-right" size={18} color="#c0b4af" />
                </Pressable>
              ),
            )
          )}

          {/* BUCKET SUBJECTS */}
          <View className="flex-row justify-between items-center mt-5 mb-2.5 px-1">
            <Text className="text-[16px] font-extrabold text-[#212121]">
              Optional Subjects
            </Text>
          </View>

          {profile.bucket_subjects.length === 0 ? (
            <Text className="text-[#9c8b84] text-sm px-1">
              No optional subjects assigned.
            </Text>
          ) : (
            profile.bucket_subjects.map(
              (subject: { id: number; name: string; subject_code: string }) => (
                <Pressable
                  key={subject.id}
                  className="bg-white rounded-2xl px-3.5 py-3 flex-row items-center border border-[#f0ebe6] mb-2"
                  style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
                >
                  <View className="w-9 h-9 rounded-full bg-[#fff8ec] justify-center items-center">
                    <Text className="text-[13px]">🎯</Text>
                  </View>
                  <View className="flex-1 ml-3">
                    <Text className="text-[13px] font-bold text-[#2d2d2d]">
                      {subject.name}
                    </Text>
                    <Text className="text-[10px] text-[#9c8b84]">
                      {subject.subject_code}
                    </Text>
                  </View>
                  <Feather name="chevron-right" size={18} color="#c0b4af" />
                </Pressable>
              ),
            )
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
