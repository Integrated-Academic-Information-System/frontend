import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function DashboardScreen() {

  useAuthGuard();

   const [activeFilter, setActiveFilter] = useState<
      "all" | "critical" | "warning" | "info"
    >("all");
  const router = useRouter();

  const totalStudents = 1284;
  const totalSubjects = 42;

  const handleMarksEntry = () => {
    router.push("/(admin)/(tabs)/marks-entry");
  };

  return (
    <SafeAreaView
      className="flex-1 bg-[#F9F9F9]"
      edges={["top", "left", "right"]}
    >
      {/* --- Top Header Navigation Bar --- */}
      <View className="flex-row justify-between items-center px-6 pt-4 pb-4 bg-[#F9F9F9]">
        {/* Blended Back Button using your original navigation logic */}

        <Text className="text-[#8f140e] font-bold text-lg">Admin</Text>
        <View className="h-9 w-9 rounded-full bg-gray-300 overflow-hidden border-2 border-white shadow-sm">
          <Image
            source={{ uri: "https://i.pravatar.cc/100?img=11" }}
            style={{ width: "100%", height: "100%" }}
            className="h-full w-full"
          />
        </View>
      </View>

      {/* --- Scrollable Dashboard Body --- */}
      <ScrollView
        className="flex-1 px-6"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Message */}
        <View className="mt-4 mb-6">
          <Text className="text-2xl font-extrabold text-zinc-900 tracking-tight">
            Hello, Admin!
=======
    <SafeAreaView className="flex-1 bg-[#efeae4] items-center justify-center px-6 relative">
      {/* <Pressable 
        onPress={() => router.replace("/role-selector")}
        className="absolute top-12 left-6 z-10 flex-row items-center bg-white px-3 py-2 rounded-full shadow-sm active:opacity-70"
      >
        <Feather name="arrow-left" size={18} color="#8f140e" />
        <Text className="ml-2 text-[14px] font-bold text-[#8f140e]">Roles</Text>
      </Pressable> */}

      <View className="items-center gap-8">
        <Text className="text-2xl font-bold text-[#8f140e]">Dashboard</Text>

        <Pressable
          onPress={handleMarksEntry}
          className="bg-[#8f140e] px-8 py-4 rounded-2xl shadow-lg shadow-[#8f140e]/30 active:opacity-80"
        >
          <Text className="text-lg font-bold text-white">
            Go to Marks Entry
          </Text>
          <Text className="text-zinc-500 text-sm mt-1 leading-relaxed">
            Your educational ecosystem is performing optimally today.
          </Text>
        </View>

        {/* Metric Cards Grid */}
        <View className="gap-4 mb-6">
          {/* Students Card */}
          <View className="bg-white border border-zinc-100 p-5 rounded-3xl shadow-sm flex-row justify-between items-start">
            <View>
              <Text className="text-zinc-400 font-bold text-xs uppercase tracking-wider mb-1">
                Students
              </Text>
              <Text className="text-3xl font-black text-[#8f140e]">
                {totalStudents.toLocaleString()}
              </Text>
            </View>
            <View className="bg-[#8f140e]/10 p-3 rounded-xl">
              <FontAwesome5 name="users" size={18} color="#8f140e" />
            </View>
          </View>

          {/* Subjects Card */}
          <View className="bg-white border border-zinc-100 p-5 rounded-3xl shadow-sm flex-row justify-between items-start">
            <View>
              <Text className="text-zinc-400 font-bold text-xs uppercase tracking-wider mb-1">
                Subjects
              </Text>
              <Text className="text-3xl font-black text-[#8f140e]">
                {totalSubjects}
              </Text>
            </View>
            <View className="bg-[#8f140e]/10 p-3 rounded-xl">
              <FontAwesome5 name="book-open" size={18} color="#8f140e" />
            </View>
          </View>
        </View>

        {/* --- Quick Management Actions Button Groups --- */}
        <View className="w-full gap-3.5 mb-6">
          {/* Top Grid Row (50% split) */}
          <View className="flex-row gap-3 w-full">
            <Pressable className="flex-1 bg-[#8f140e] py-3.5 rounded-2xl items-center justify-center shadow-sm active:opacity-90">
              <Text className="text-white text-base font-bold tracking-wide">
                New Students
              </Text>
            </Pressable>

            <Pressable
              onPress={handleMarksEntry}
              className="flex-1 bg-zinc-200 py-3.5 rounded-2xl items-center justify-center active:opacity-80"
            >
              <Text className="text-zinc-700 text-base font-bold tracking-wide">
                Enter Marks
              </Text>
            </Pressable>
          </View>

          {/* Full Width Row 1 */}
          <Pressable className="w-full bg-zinc-200 py-3.5 rounded-2xl items-center justify-center active:opacity-80">
            <Text className="text-zinc-700 text-base font-bold tracking-wide">
              User Management
            </Text>
          </Pressable>

          {/* Full Width Row 2 */}
          <Pressable className="w-full bg-zinc-200 py-3.5 rounded-2xl items-center justify-center active:opacity-80">
            <Text className="text-zinc-700 text-base font-bold tracking-wide">
              Manage Subjects
            </Text>
          </Pressable>
        </View>

        {/* --- Recent Alerts Section (Expanded to 5 Items) --- */}
        <View className="bg-[#F3F3F3] p-5 rounded-3xl border border-zinc-200/60 mb-6">
          <Text className="text-[#8f140e] font-bold text-[10px] tracking-widest uppercase">
            System Status
          </Text>
          <Text className="text-lg font-bold text-zinc-900 mt-0.5">
            Recent Alerts
          </Text>
          <Text className="text-zinc-500 text-xs mt-1 leading-relaxed">
            Five departments have pending actions or system notifications
            requiring admin review.
          </Text>

          <View className="gap-2 mt-4">
            {/* Alert 1: Critical Danger */}
            <View className="bg-white px-4 py-3 rounded-2xl flex-row items-center gap-3 shadow-sm border border-zinc-100 mb-0.5">
              <View className="w-2 h-2 rounded-full bg-red-600" />
              <Text className="text-zinc-700 text-xs font-medium flex-1">
                Physics Lab: Missing marks for 12 students
              </Text>
            </View>

            {/* Alert 2: Database Warning */}
            <View className="bg-white px-4 py-3 rounded-2xl flex-row items-center gap-3 shadow-sm border border-zinc-100 mb-0.5">
              <View className="w-2 h-2 rounded-full bg-amber-500" />
              <Text className="text-zinc-700 text-xs font-medium flex-1">
                Server update scheduled for 11:30 PM
              </Text>
            </View>

            {/* Alert 3: Enrollment Info/Success (New) */}
            <View className="bg-white px-4 py-3 rounded-2xl flex-row items-center gap-3 shadow-sm border border-zinc-100 mb-0.5">
              <View className="w-2 h-2 rounded-full bg-emerald-600" />
              <Text className="text-zinc-700 text-xs font-medium flex-1">
                Completed intake integration: 142 new student profiles synced
              </Text>
            </View>

            {/* Alert 4: Fee/Payment Issue (New) */}
            <View className="bg-white px-4 py-3 rounded-2xl flex-row items-center gap-3 shadow-sm border border-zinc-100 mb-0.5">
              <View className="w-2 h-2 rounded-full bg-red-600" />
              <Text className="text-zinc-700 text-xs font-medium flex-1">
                Payment Gateway: 4 student transaction timeouts detected
              </Text>
            </View>

            {/* Alert 5: Curriculum Update (New) */}
            <View className="bg-white px-4 py-3 rounded-2xl flex-row items-center gap-3 shadow-sm border border-zinc-100">
              <View className="w-2 h-2 rounded-full bg-amber-500" />
              <Text className="text-zinc-700 text-xs font-medium flex-1">
                Grade 11 Request: Syllabus revisions pending for grade 11
                Mathematics and Science subjects
              </Text>
            </View>
          </View>
        </View>

        {/* --- Educational Promo Banner --- */}
        <View className="relative rounded-3xl overflow-hidden bg-[#400c0c] p-6 min-h-[260px] justify-end mt-2 shadow-md">
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyhHY7lxvKIWT42gbtaNVzDLySXlnnIXRdRA&s",
            }}
            className="absolute inset-0 opacity-50"
            resizeMode="cover"
          />
          {/* Soft dark gradient overlay for better text contrast over a larger image */}
          <View className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          <View className="z-10">
            <Text className="text-white font-extrabold text-xl mb-1.5 tracking-tight">
              Master Plan Update 2024
            </Text>
            <Text className="text-zinc-200 text-sm mb-4 max-w-[95%] leading-relaxed">
              Review the latest structural changes to the campus layouts and new
              architectural blueprints.
            </Text>
            <Pressable className="border border-white/50 bg-white/10 self-start px-5 py-2.5 rounded-full active:opacity-80 backdrop-blur-sm">
              <Text className="text-white text-xs font-bold tracking-wide uppercase">
                View Blueprint
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
