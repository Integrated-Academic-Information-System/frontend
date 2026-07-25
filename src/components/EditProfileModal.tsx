import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ─────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────
interface EditProfileModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: (updated: { email: string; mobile_number: string }) => void;
  currentEmail: string;
  currentPhone: string;
  apiEndpoint: string;   // e.g. "/teacher/profile/update" or "/student/profile/update"
  tokenKey: string;      // e.g. "teacher_token" or "student_token"
}

interface FormState {
  email: string;
  mobile_number: string;
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}

interface FieldErrors {
  email?: string;
  mobile_number?: string;
  current_password?: string;
  new_password?: string;
  new_password_confirmation?: string;
  general?: string;
}

// ─────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────
export default function EditProfileModal({
  visible,
  onClose,
  onSuccess,
  currentEmail,
  currentPhone,
  apiEndpoint,
  tokenKey,
}: EditProfileModalProps) {
  const [form, setForm] = useState<FormState>({
    email: currentEmail,
    mobile_number: currentPhone,
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  function update(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear field error on change
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate(): boolean {
    const newErrors: FieldErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email.";
    }

    if (!form.mobile_number.trim()) {
      newErrors.mobile_number = "Phone number is required.";
    }

    // Password fields — only validate if user typed something
    const wantsPasswordChange =
      form.current_password || form.new_password || form.new_password_confirmation;

    if (wantsPasswordChange) {
      if (!form.current_password) {
        newErrors.current_password = "Current password is required.";
      }
      if (!form.new_password) {
        newErrors.new_password = "New password is required.";
      } else if (form.new_password.length < 6) {
        newErrors.new_password = "Password must be at least 6 characters.";
      }
      if (form.new_password !== form.new_password_confirmation) {
        newErrors.new_password_confirmation = "Passwords do not match.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit() {
    if (!validate()) return;

    setLoading(true);
    setErrors({});
    setSuccessMessage("");

    try {
      const token = await AsyncStorage.getItem(tokenKey);
      if (!token) throw new Error("No token found. Please log in again.");

      // Build payload — only include password fields if user filled them
      const payload: Record<string, string> = {
        email: form.email,
        mobile_number: form.mobile_number,
      };

      if (form.current_password && form.new_password) {
        payload.current_password = form.current_password;
        payload.new_password = form.new_password;
        payload.new_password_confirmation = form.new_password_confirmation;
      }

      const response = await fetch(`${API_URL}${apiEndpoint}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        // Laravel validation errors
        if (data.errors) {
          const mapped: FieldErrors = {};
          Object.entries(data.errors).forEach(([key, val]) => {
            mapped[key as keyof FieldErrors] = (val as string[])[0];
          });
          setErrors(mapped);
        } else {
          setErrors({ general: data.message || "Update failed." });
        }
        return;
      }

      setSuccessMessage("Profile updated successfully.");
      onSuccess({ email: data.email, mobile_number: data.mobile_number });

      // Reset password fields only
      setForm((prev) => ({
        ...prev,
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
      }));

      // Close after short delay so user sees success message
      setTimeout(() => {
        setSuccessMessage("");
        onClose();
      }, 1500);

    } catch (e: any) {
      setErrors({ general: e.message || "Something went wrong." });
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    setErrors({});
    setSuccessMessage("");
    setForm({
      email: currentEmail,
      mobile_number: currentPhone,
      current_password: "",
      new_password: "",
      new_password_confirmation: "",
    });
    onClose();
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={handleClose}
    >
      <View className="flex-1 justify-end bg-black/40">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View className="rounded-t-[36px] bg-[#f4efe8] px-5 pt-5 pb-10">

            {/* Handle bar */}
            <View className="mb-4 self-center w-10 h-1 rounded-full bg-[#d9cfc8]" />

            {/* Header */}
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-[22px] font-extrabold text-[#1f1f1f]">
                Edit Profile
              </Text>
              <TouchableOpacity
                onPress={handleClose}
                className="h-9 w-9 items-center justify-center rounded-full bg-[#ede8e2]"
              >
                <Feather name="x" size={18} color="#6b5f5a" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>

              {/* General error */}
              {errors.general ? (
                <View className="mb-4 rounded-2xl bg-[#fdecea] px-4 py-3">
                  <Text className="text-[13px] text-[#8f140e] font-semibold">
                    {errors.general}
                  </Text>
                </View>
              ) : null}

              {/* Success message */}
              {successMessage ? (
                <View className="mb-4 rounded-2xl bg-[#e8f5e9] px-4 py-3">
                  <Text className="text-[13px] text-[#2e7d32] font-semibold">
                    {successMessage}
                  </Text>
                </View>
              ) : null}

              {/* ── Contact Info Section ── */}
              <Text className="mb-3 text-[11px] font-bold uppercase tracking-[2.5px] text-[#a59b96]">
                Contact Info
              </Text>

              <View className="mb-3 rounded-[20px] bg-white px-4 py-3">
                <Text className="text-[10px] font-bold uppercase tracking-widest text-[#b0a49e] mb-1">
                  Email Address
                </Text>
                <TextInput
                  value={form.email}
                  onChangeText={(v) => update("email", v)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="text-[15px] font-semibold text-[#1f1f1f]"
                  placeholder="Enter email"
                  placeholderTextColor="#c4b8b2"
                />
              </View>
              {errors.email ? (
                <Text className="mb-2 ml-2 text-[12px] text-[#8f140e]">
                  {errors.email}
                </Text>
              ) : null}

              <View className="mb-3 rounded-[20px] bg-white px-4 py-3">
                <Text className="text-[10px] font-bold uppercase tracking-widest text-[#b0a49e] mb-1">
                  Phone Number
                </Text>
                <TextInput
                  value={form.mobile_number}
                  onChangeText={(v) => update("mobile_number", v)}
                  keyboardType="phone-pad"
                  className="text-[15px] font-semibold text-[#1f1f1f]"
                  placeholder="Enter phone number"
                  placeholderTextColor="#c4b8b2"
                />
              </View>
              {errors.mobile_number ? (
                <Text className="mb-2 ml-2 text-[12px] text-[#8f140e]">
                  {errors.mobile_number}
                </Text>
              ) : null}

              {/* ── Change Password Section ── */}
              <Text className="mb-3 mt-5 text-[11px] font-bold uppercase tracking-[2.5px] text-[#a59b96]">
                Change Password
              </Text>
              <Text className="mb-3 ml-1 text-[12px] text-[#b0a49e]">
                Leave blank if you don't want to change your password.
              </Text>

              {/* Current Password */}
              <View className="mb-3 rounded-[20px] bg-white px-4 py-3 flex-row items-center">
                <View className="flex-1">
                  <Text className="text-[10px] font-bold uppercase tracking-widest text-[#b0a49e] mb-1">
                    Current Password
                  </Text>
                  <TextInput
                    value={form.current_password}
                    onChangeText={(v) => update("current_password", v)}
                    secureTextEntry={!showCurrentPassword}
                    className="text-[15px] font-semibold text-[#1f1f1f]"
                    placeholder="Enter current password"
                    placeholderTextColor="#c4b8b2"
                  />
                </View>
                <Pressable onPress={() => setShowCurrentPassword((p) => !p)}>
                  <Feather
                    name={showCurrentPassword ? "eye-off" : "eye"}
                    size={18}
                    color="#b0a49e"
                  />
                </Pressable>
              </View>
              {errors.current_password ? (
                <Text className="mb-2 ml-2 text-[12px] text-[#8f140e]">
                  {errors.current_password}
                </Text>
              ) : null}

              {/* New Password */}
              <View className="mb-3 rounded-[20px] bg-white px-4 py-3 flex-row items-center">
                <View className="flex-1">
                  <Text className="text-[10px] font-bold uppercase tracking-widest text-[#b0a49e] mb-1">
                    New Password
                  </Text>
                  <TextInput
                    value={form.new_password}
                    onChangeText={(v) => update("new_password", v)}
                    secureTextEntry={!showNewPassword}
                    className="text-[15px] font-semibold text-[#1f1f1f]"
                    placeholder="Enter new password"
                    placeholderTextColor="#c4b8b2"
                  />
                </View>
                <Pressable onPress={() => setShowNewPassword((p) => !p)}>
                  <Feather
                    name={showNewPassword ? "eye-off" : "eye"}
                    size={18}
                    color="#b0a49e"
                  />
                </Pressable>
              </View>
              {errors.new_password ? (
                <Text className="mb-2 ml-2 text-[12px] text-[#8f140e]">
                  {errors.new_password}
                </Text>
              ) : null}

              {/* Confirm New Password */}
              <View className="mb-3 rounded-[20px] bg-white px-4 py-3 flex-row items-center">
                <View className="flex-1">
                  <Text className="text-[10px] font-bold uppercase tracking-widest text-[#b0a49e] mb-1">
                    Confirm New Password
                  </Text>
                  <TextInput
                    value={form.new_password_confirmation}
                    onChangeText={(v) => update("new_password_confirmation", v)}
                    secureTextEntry={!showConfirmPassword}
                    className="text-[15px] font-semibold text-[#1f1f1f]"
                    placeholder="Confirm new password"
                    placeholderTextColor="#c4b8b2"
                  />
                </View>
                <Pressable onPress={() => setShowConfirmPassword((p) => !p)}>
                  <Feather
                    name={showConfirmPassword ? "eye-off" : "eye"}
                    size={18}
                    color="#b0a49e"
                  />
                </Pressable>
              </View>
              {errors.new_password_confirmation ? (
                <Text className="mb-2 ml-2 text-[12px] text-[#8f140e]">
                  {errors.new_password_confirmation}
                </Text>
              ) : null}

              {/* Submit Button */}
              <TouchableOpacity
                onPress={handleSubmit}
                disabled={loading}
                className="mt-6 rounded-[20px] bg-[#8f140e] py-4 items-center"
                style={{ opacity: loading ? 0.7 : 1 }}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text className="text-[15px] font-bold text-white">
                    Save Changes
                  </Text>
                )}
              </TouchableOpacity>

            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}