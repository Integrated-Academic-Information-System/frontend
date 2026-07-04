import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const initialAlerts = [
  {
    title: "Parent meeting scheduled",
    detail: "Friday 3:00 PM - confirm the agenda with the class committee.",
    tone: "#8f140e",
    badge: "Notice",
  },
  {
    title: "Exam timetable update",
    detail: "The midterm schedule has been revised and needs review.",
    tone: "#156f4a",
    badge: "Update",
  },
  {
    title: "Pending class notice",
    detail: "One announcement is waiting for approval before publishing.",
    tone: "#c07a00",
    badge: "Pending",
  },
];

export default function ClassInchargeAlertsScreen() {
  const router = useRouter();
  const [alerts, setAlerts] = useState(initialAlerts);
  const [composerOpen, setComposerOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [selectedTone, setSelectedTone] = useState("#8f140e");

  const canSave = useMemo(() => {
    return title.trim().length > 0 && detail.trim().length > 0;
  }, [detail, title]);

  const toneOptions = [
    { label: "Notice", value: "#8f140e" },
    { label: "Update", value: "#156f4a" },
    { label: "Alert", value: "#c07a00" },
  ];

  const openComposer = () => {
    setTitle("");
    setDetail("");
    setSelectedTone("#8f140e");
    setComposerOpen(true);
  };

  const handleCreateAlert = () => {
    if (!canSave) {
      return;
    }

    setAlerts((currentAlerts) => [
      {
        title: title.trim(),
        detail: detail.trim(),
        tone: selectedTone,
        badge:
          toneOptions.find((option) => option.value === selectedTone)?.label ??
          "Notice",
      },
      ...currentAlerts,
    ]);
    setComposerOpen(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#efeae4]">
      <ScrollView contentContainerClassName="px-6 pb-32 pt-4">
        <View className="flex-row items-center justify-between mb-6">
          <View className="items-center justify-center">
            <Text className="text-xl text-black font-bold uppercase tracking-[4px]">
            Class Alerts
          </Text>
          </View>
        </View>

        <View className="bg-[#8f140e] rounded-[28px] p-6 mb-5 shadow-lg shadow-[#8f140e]/20">
          <Text className="text-[20px] font-extrabold text-white mt-2 leading-tight">
            Keep track of class updates
          </Text>
          <Text className="text-white/80 mt-3 text-[14px] leading-5">
            Review the latest notices, approvals, and reminders for your class.
          </Text>

          <Pressable
            onPress={openComposer}
            className="mt-5 self-start flex-row items-center bg-white px-4 py-3 rounded-full active:opacity-80"
          >
            <Feather name="plus" size={18} color="#8f140e" />
            <Text className="ml-2 text-[14px] font-bold text-[#8f140e]">
              Create Alert
            </Text>
          </Pressable>
        </View>

        <Text className="text-[18px] font-bold text-[#212121] mb-3">
          Latest Alerts
        </Text>
        <View className="gap-3">
          {alerts.map((alert) => (
            <View
              key={alert.title}
              className="bg-white rounded-[24px] p-5 shadow-sm"
            >
              <View className="flex-row items-start">
                <View
                  className="h-11 w-11 rounded-2xl items-center justify-center mr-4"
                  style={{ backgroundColor: `${alert.tone}18` }}
                >
                  <Feather name="bell" size={20} color={alert.tone} />
                </View>
                <View className="flex-1">
                  <View className="self-start bg-[#fceeed] px-3 py-1 rounded-full mb-2">
                    <Text className="text-[11px] font-bold text-[#8f140e] uppercase tracking-wider">
                      {alert.badge}
                    </Text>
                  </View>
                  <Text className="text-[16px] font-bold text-[#212121]">
                    {alert.title}
                  </Text>
                  <Text className="text-[13px] text-[#8e847f] mt-2 leading-5">
                    {alert.detail}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <Modal
        visible={composerOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setComposerOpen(false)}
      >
        <View className="flex-1 bg-black/35 justify-end">
          <Pressable
            className="flex-1"
            onPress={() => setComposerOpen(false)}
          />
          <View className="bg-[#efeae4] rounded-t-[32px] px-6 pt-5 pb-8">
            <View className="flex-row items-center justify-between mb-5">
              <Text className="text-[22px] font-extrabold text-[#212121]">
                Create Alert
              </Text>
              <Pressable
                onPress={() => setComposerOpen(false)}
                className="h-9 w-9 rounded-full bg-white items-center justify-center"
              >
                <Feather name="x" size={18} color="#8f140e" />
              </Pressable>
            </View>

            <View className="bg-white rounded-[24px] p-4 shadow-sm mb-4">
              <Text className="text-[12px] font-bold text-[#8e847f] uppercase tracking-wider mb-2">
                Alert Title
              </Text>
              <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="Type a clear title"
                placeholderTextColor="#b2a9a3"
                className="text-[16px] text-[#212121]"
              />
            </View>

            <View className="bg-white rounded-[24px] p-4 shadow-sm mb-4">
              <Text className="text-[12px] font-bold text-[#8e847f] uppercase tracking-wider mb-2">
                Message
              </Text>
              <TextInput
                value={detail}
                onChangeText={setDetail}
                placeholder="Write the class notice or reminder"
                placeholderTextColor="#b2a9a3"
                className="text-[16px] text-[#212121] min-h-[90px]"
                multiline
                textAlignVertical="top"
              />
            </View>

            <Text className="text-[12px] font-bold text-[#8e847f] uppercase tracking-wider mb-3">
              Alert Type
            </Text>
            <View className="flex-row gap-3 mb-6">
              {toneOptions.map((option) => {
                const isSelected = selectedTone === option.value;
                return (
                  <Pressable
                    key={option.value}
                    onPress={() => setSelectedTone(option.value)}
                    className={`flex-1 rounded-full px-4 py-3 items-center border ${
                      isSelected
                        ? "bg-white border-[#8f140e]"
                        : "bg-[#f7f5f2] border-transparent"
                    }`}
                  >
                    <Text
                      className={`text-[13px] font-bold ${
                        isSelected ? "text-[#8f140e]" : "text-[#8e847f]"
                      }`}
                    >
                      {option.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <View className="flex-row gap-3">
              <Pressable
                onPress={() => setComposerOpen(false)}
                className="flex-1 rounded-full bg-white px-4 py-4 items-center"
              >
                <Text className="text-[15px] font-bold text-[#8f140e]">
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                onPress={handleCreateAlert}
                disabled={!canSave}
                className={`flex-1 rounded-full px-4 py-4 items-center ${
                  canSave ? "bg-[#8f140e]" : "bg-[#b8ada6]"
                }`}
              >
                <Text className="text-[15px] font-bold text-white">
                  Publish
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
