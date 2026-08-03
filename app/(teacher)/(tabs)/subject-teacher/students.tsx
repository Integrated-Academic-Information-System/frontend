import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function StudentsScreen() {
  const router = useRouter();

  const classes = [
    {
      name: "Class 8A",
      count: 4,
      students: [
        { name: "Aarav Perera", roll: "08A-01" },
        { name: "Sithumi Silva", roll: "08A-02" },
        { name: "Nethum Fernando", roll: "08A-03" },
        { name: "Malsha Jayasinghe", roll: "08A-04" },
      ],
    },
    {
      name: "Class 8B",
      count: 4,
      students: [
        { name: "Isuru Bandara", roll: "08B-01" },
        { name: "Chamodi Abeysekara", roll: "08B-02" },
        { name: "Tharindu Dissanayake", roll: "08B-03" },
        { name: "Nimasha Weerasinghe", roll: "08B-04" },
      ],
    },
    {
      name: "Class 9A",
      count: 4,
      students: [
        { name: "Hasini Ranasinghe", roll: "09A-01" },
        { name: "Kavindu Mendis", roll: "09A-02" },
        { name: "Piumi Rajapaksha", roll: "09A-03" },
        { name: "Denuwan Karunaratne", roll: "09A-04" },
      ],
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#f4ede6]">
      <View className="absolute -top-12 right-[-40px] h-40 w-40 rounded-full bg-[#8f140e]/10" />
      <View className="absolute bottom-20 left-[-36px] h-32 w-32 rounded-full bg-[#d8b39d]/20" />

      <ScrollView
        contentContainerClassName="px-6 pb-10 pt-12"
        showsVerticalScrollIndicator={false}
      >
        <View className="rounded-full bg-white px-3 py-2 self-start shadow-sm">
          <Text className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#8f140e]">
            Subject Teacher
          </Text>
        </View>

        <View className="mt-5 rounded-[30px] border border-[#eaded3] bg-white px-5 py-6 shadow-lg shadow-[#5c231b]/10">
          <Text className="text-3xl font-bold leading-10 text-[#7f2018]">
            Students grouped by class.
          </Text>
          <Text className="mt-3 text-[15px] leading-6 text-[#7f726b]">
            Review each class, open a student, and use edit access when marks or
            details need to be updated.
          </Text>

          <View className="mt-5 flex-row flex-wrap gap-3">
            <View className="min-w-[96px] flex-1 rounded-2xl bg-[#fbf8f5] px-4 py-3">
              <Text className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#8f140e]">
                Classes
              </Text>
              <Text className="mt-2 text-2xl font-bold text-[#7f2018]">3</Text>
            </View>

            <View className="min-w-[96px] flex-1 rounded-2xl bg-[#fbf8f5] px-4 py-3">
              <Text className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#8f140e]">
                Students
              </Text>
              <Text className="mt-2 text-2xl font-bold text-[#7f2018]">12</Text>
            </View>

            <View className="min-w-[96px] flex-1 rounded-2xl bg-[#fbf8f5] px-4 py-3">
              <Text className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#8f140e]">
                Editable
              </Text>
              <Text className="mt-2 text-2xl font-bold text-[#7f2018]">12</Text>
            </View>
          </View>
        </View>

        <View className="mt-5 gap-4">
          {classes.map((group) => (
            <View
              key={group.name}
              className="rounded-[28px] border border-[#eaded3] bg-white px-5 py-5 shadow-lg shadow-[#5c231b]/8"
            >
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="text-[18px] font-bold text-[#7f2018]">
                    {group.name}
                  </Text>
                  <Text className="mt-1 text-[13px] text-[#7f726b]">
                    {group.count} students in this class
                  </Text>
                </View>
              </View>

              <View className="mt-4 gap-3">
                {group.students.map((student) => (
                  <View
                    key={student.roll}
                    className="rounded-2xl bg-[#fbf8f5] px-4 py-4"
                  >
                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center flex-1">
                        <View className="h-11 w-11 items-center justify-center rounded-2xl bg-[#8f140e]/10">
                          <Feather name="user" size={20} color="#8f140e" />
                        </View>
                        <View className="ml-3 flex-1">
                          <Text className="text-[16px] font-bold text-[#7f2018]">
                            {student.name}
                          </Text>
                          <Text className="mt-1 text-[12px] text-[#7f726b]">
                            {student.roll}
                          </Text>
                        </View>
                      </View>

                      <Pressable
                        onPress={() =>
                          router.push(
                            "/(teacher)/(tabs)/subject-teacher/marks-entry",
                          )
                        }
                        className="flex-row items-center rounded-full bg-[#8f140e] px-3 py-2 active:opacity-80"
                      >
                        <Feather name="edit-3" size={14} color="#ffffff" />
                        <Text className="ml-2 text-[12px] font-bold text-white">
                          Edit
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
