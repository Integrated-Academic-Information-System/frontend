import { getAlertsApi, createAlertApi } from "../../../src/services/api";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface AlertItem {
  id: number;
  title: string;
  message: string;
  role_target: string;
  created_at: string;
  creator: { name: string };
}

const ROLE_TARGETS = [
  { label: "Everyone", value: "all" },
  { label: "Admins", value: "admin" },
  { label: "Students", value: "student" },
  { label: "Subject Teachers", value: "subject_teacher" },
  { label: "Class Incharges", value: "class_incharge" },
];

export default function AlertsScreen() {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [newRoleTarget, setNewRoleTarget] = useState("all");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = async () => {
    try {
      setIsLoading(true);
      const res = await getAlertsApi();
      setAlerts(res.data);
    } catch (error) {
      console.error("Failed to load alerts");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAlert = async () => {
    if (!newTitle.trim() || !newMessage.trim()) {
      Alert.alert("Error", "Please fill in both title and message.");
      return;
    }
    try {
      setIsSubmitting(true);
      await createAlertApi({
        title: newTitle,
        message: newMessage,
        role_target: newRoleTarget,
      });
      setModalVisible(false);
      setNewTitle("");
      setNewMessage("");
      setNewRoleTarget("all");
      loadAlerts();
      Alert.alert("Success", "Alert created successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to create alert.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "all": return "#8f140e";
      case "admin": return "#7c3aed";
      case "student": return "#0369a1";
      case "subject_teacher": return "#047857";
      case "class_incharge": return "#b45309";
      default: return "#6b7280";
    }
  };

  const getRoleLabel = (role: string) => {
    return ROLE_TARGETS.find((r) => r.value === role)?.label ?? role;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric", month: "short", day: "numeric",
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#efeae4]" edges={["top"]}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 pb-12 pt-4"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between mb-6 px-1">
          <View>
            <Text className="text-[28px] font-extrabold text-[#212121]">
              Alerts
            </Text>
            <Text className="text-[14px] text-[#6d615c] font-medium mt-1">
              {alerts.length} total alerts
            </Text>
          </View>
          {/* Create Alert Button */}
          <Pressable
            onPress={() => setModalVisible(true)}
            className="flex-row items-center bg-[#8f140e] px-4 py-2.5 rounded-full shadow-md"
          >
            <Feather name="plus" size={16} color="#fff" />
            <Text className="text-white font-bold text-[13px] ml-1">
              New Alert
            </Text>
          </Pressable>
        </View>

        {/* Loading */}
        {isLoading ? (
          <View className="items-center justify-center py-20">
            <ActivityIndicator size="large" color="#8f140e" />
            <Text className="mt-4 text-[#8f140e] font-bold">
              Loading alerts...
            </Text>
          </View>
        ) : alerts.length === 0 ? (
          // Empty State
          <View className="items-center justify-center py-20">
            <Feather name="bell-off" size={64} color="#c9b8b2" />
            <Text className="mt-4 text-[18px] font-bold text-[#6d615c]">
              No alerts yet
            </Text>
            <Text className="mt-2 text-[14px] text-[#a5928a] text-center">
              Tap New Alert to create your first alert
            </Text>
          </View>
        ) : (
          // Alerts List
          <View className="gap-3">
            {alerts.map((alert) => (
              <View
                key={alert.id}
                className="bg-white rounded-[24px] p-5 shadow-sm shadow-black/5"
              >
                {/* Top row */}
                <View className="flex-row items-start justify-between mb-3">
                  <View className="flex-1 mr-3">
                    <Text className="text-[16px] font-bold text-[#212121]">
                      {alert.title}
                    </Text>
                    <Text className="text-[12px] text-[#8e847f] mt-1">
                      By {alert.creator?.name ?? "Unknown"} • {formatDate(alert.created_at)}
                    </Text>
                  </View>
                  {/* Role Badge */}
                  <View
                    className="px-3 py-1 rounded-full"
                    style={{ backgroundColor: getRoleColor(alert.role_target) + "20" }}
                  >
                    <Text
                      className="text-[11px] font-bold"
                      style={{ color: getRoleColor(alert.role_target) }}
                    >
                      {getRoleLabel(alert.role_target)}
                    </Text>
                  </View>
                </View>
                {/* Divider */}
                <View className="h-px bg-[#f0ebe6] mb-3" />
                {/* Message */}
                <Text className="text-[14px] text-[#6d615c] leading-5">
                  {alert.message}
                </Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Create Alert Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/40">
          <View className="bg-white rounded-t-[32px] p-6">
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-[22px] font-extrabold text-[#212121]">
                New Alert
              </Text>
              <Pressable onPress={() => setModalVisible(false)}>
                <Feather name="x" size={24} color="#6d615c" />
              </Pressable>
            </View>

            {/* Title Input */}
            <Text className="text-[11px] font-bold tracking-[1px] text-[#8e847f] uppercase mb-2">
              Title
            </Text>
            <TextInput
              value={newTitle}
              onChangeText={setNewTitle}
              placeholder="e.g. Exam Schedule Update"
              placeholderTextColor="#a5928a"
              className="h-12 bg-[#f7f5f2] rounded-2xl px-4 text-[15px] text-[#212121] mb-4"
            />

            {/* Message Input */}
            <Text className="text-[11px] font-bold tracking-[1px] text-[#8e847f] uppercase mb-2">
              Message
            </Text>
            <TextInput
              value={newMessage}
              onChangeText={setNewMessage}
              placeholder="Type your alert message here..."
              placeholderTextColor="#a5928a"
              multiline
              numberOfLines={4}
              className="bg-[#f7f5f2] rounded-2xl px-4 py-3 text-[15px] text-[#212121] mb-4"
              style={{ minHeight: 100, textAlignVertical: "top" }}
            />

            {/* Role Target */}
            <Text className="text-[11px] font-bold tracking-[1px] text-[#8e847f] uppercase mb-2">
              Send To
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-6"
              contentContainerClassName="gap-2"
            >
              {ROLE_TARGETS.map((role) => (
                <Pressable
                  key={role.value}
                  onPress={() => setNewRoleTarget(role.value)}
                  className={`px-4 py-2 rounded-full border ${
                    newRoleTarget === role.value
                      ? "bg-[#8f140e] border-[#8f140e]"
                      : "bg-[#f7f5f2] border-[#e0d9d4]"
                  }`}
                >
                  <Text
                    className={`text-[13px] font-bold ${
                      newRoleTarget === role.value
                        ? "text-white"
                        : "text-[#6d615c]"
                    }`}
                  >
                    {role.label}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>

            {/* Submit Button */}
            <Pressable
              onPress={handleCreateAlert}
              disabled={isSubmitting}
              className="h-14 items-center justify-center rounded-full bg-[#8f140e] shadow-lg"
            >
              {isSubmitting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-[16px] font-bold text-white">
                  Send Alert
                </Text>
              )}
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}