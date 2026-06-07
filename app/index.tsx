//index.tsx

import { Feather, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [language, setLanguage] = useState<"English" | "Sinhala">("English");

  const handleClearForm = () => {
    setUsername("");
    setPassword("");
    setRememberMe(false);
    setShowPassword(false);
    setLanguage("English");
  };

  const handleSignIn = async () => {
    try {
      const trimmedUsername = username.trim();

      if (!trimmedUsername || !password) {
        Alert.alert(
          "Missing Credentials",
          "Please enter both username/email and password.",
        );
        return;
      }

      // Save dummy auth token to AsyncStorage
      const response = await fetch(process.env.EXPO_PUBLIC_API_URL+"/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: trimmedUsername, // from your input field state
          password: password, // from your input field state
        }),
      });

      const data = await response.json();

      // If login failed
      if (!response.ok) {
        Alert.alert("Login Failed", data.message);
        return;
      }

      // Save real token from backend
      await AsyncStorage.setItem("authToken", data.token);
      await AsyncStorage.setItem("userName", data.user_name);

      // Move into the post-login flow so success is visible to the user.
      router.replace("/role-selector");
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert(
        "Login Error",
        "Unable to sign in. Please check the backend URL and network connection.",
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#efeae4]">
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          className="flex-1"
          contentContainerClassName="min-h-full px-4 py-5"
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 items-center justify-between">
            <View className="w-full max-w-[340px] flex-1 rounded-[34px] bg-white px-5 py-6 shadow-2xl shadow-black/10">
              <View className="items-center pt-2">
                <View className="w-full flex-row items-start gap-3">
                  <View className="h-11 w-11 rounded-full overflow-hidden">
                    <Image
                      source={require("../assets/images/school-logo.png")}
                      className="h-full w-full"
                      style={{ width: 44, height: 44 }}
                      resizeMode="cover"
                    />
                  </View>
                  <Text className="mt-1 flex-1 text-[16px] font-bold leading-5 text-[#8f140e]">
                    R/ Belihuloya Dhammarathana Maha Vidyalaya
                  </Text>
                </View>
              </View>

              <View className="mt-14">
                <Text className="text-[34px] font-extrabold leading-[40px] text-[#212121]">
                  Welcome
                </Text>
                <Text className="mt-3 max-w-[255px] text-[18px] leading-[25px] text-[#6d615c]">
                  Please enter your credentials to access your dashboard.
                </Text>
              </View>

              <View className="mt-11">
                <Text className="mb-3 text-[12px] font-bold tracking-[1.8px] text-[#6f5f5a]">
                  USERNAME / EMAIL
                </Text>
                <View className="h-14 flex-row items-center rounded-full bg-[#e7e4e0] px-4">
                  <Feather name="user" size={19} color="#a58e86" />
                  <TextInput
                    value={username}
                    onChangeText={setUsername}
                    placeholder="e.g. kumara@gmail.com"
                    placeholderTextColor="#a5928a"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    className="ml-3 flex-1 text-[17px] text-[#433735]"
                  />
                </View>
              </View>

              <View className="mt-6">
                <Text className="mb-3 text-[12px] font-bold tracking-[1.8px] text-[#6f5f5a]">
                  PASSWORD
                </Text>
                <View className="h-14 flex-row items-center rounded-full bg-[#e7e4e0] px-4">
                  <Feather name="lock" size={19} color="#a58e86" />
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="••••••••"
                    placeholderTextColor="#a5928a"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    className="ml-3 flex-1 text-[17px] text-[#433735]"
                  />
                  <Pressable
                    onPress={() =>
                      setShowPassword((currentValue) => !currentValue)
                    }
                    hitSlop={10}
                    accessibilityRole="button"
                    accessibilityLabel={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    <Ionicons
                      name={showPassword ? "eye-off-outline" : "eye-outline"}
                      size={24}
                      color="#9c8b84"
                    />
                  </Pressable>
                </View>
              </View>

              <View className="mt-4 flex-row items-start justify-between">
                <Pressable
                  onPress={() => setRememberMe((currentValue) => !currentValue)}
                  className="flex-row items-start gap-2"
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: rememberMe }}
                >
                  <View
                    className={`mt-0.5 h-5 w-5 rounded-[5px] border border-[#dfd8d3] items-center justify-center ${
                      rememberMe ? "bg-[#8f140e]" : "bg-[#f3efeb]"
                    }`}
                  >
                    {rememberMe && (
                      <Feather name="check" size={14} color="#fff" />
                    )}
                  </View>
                  <Text className="max-w-[90px] text-[16px] leading-5 text-[#62554f]">
                    Keep me signed in
                  </Text>
                </Pressable>

                <Pressable onPress={() => {}} hitSlop={10}>
                  <Text className="text-right text-[16px] font-bold leading-5 text-[#8f140e]">
                    Forgot Password?
                  </Text>
                </Pressable>
              </View>

              <View className="mt-8 gap-3">
                <Pressable
                  onPress={handleSignIn}
                  className="h-14 items-center justify-center rounded-full bg-[#8f140e] shadow-lg shadow-black/20"
                >
                  <View className="flex-row items-center gap-2">
                    <Text className="text-[18px] font-semibold text-white">
                      Sign In
                    </Text>
                    <Feather name="arrow-right" size={22} color="#fff" />
                  </View>
                </Pressable>

                <Pressable
                  onPress={handleClearForm}
                  className="h-14 items-center justify-center rounded-full"
                  style={({ pressed }) => ({
                    backgroundColor: pressed ? "#8f140e" : "#e7e4e0",
                  })}
                >
                  {({ pressed }) => (
                    <View className="flex-row items-center gap-2">
                      <Feather
                        name="refresh-ccw"
                        size={17}
                        color={pressed ? "#fff" : "#2d2d2d"}
                      />
                      <Text
                        className="text-[16px] font-medium tracking-[0.4px]"
                        style={{ color: pressed ? "#fff" : "#2d2d2d" }}
                      >
                        CLEAR FORM
                      </Text>
                    </View>
                  )}
                </Pressable>
              </View>

              <View className="mt-8">
                <Text className="text-[16px] font-bold text-[#8f140e]">
                  Select Language
                </Text>
                <View className="mt-8 flex-row gap-6">
                  <Pressable
                    onPress={() => setLanguage("English")}
                    className={`h-14 flex-1 items-center justify-center rounded-full ${
                      language === "English" ? "bg-[#8f140e]" : "bg-[#e7e4e0]"
                    }`}
                  >
                    <Text
                      className={`text-[15px] font-medium tracking-[0.6px] ${
                        language === "English" ? "text-white" : "text-[#3a3a3a]"
                      }`}
                    >
                      ENGLISH
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => setLanguage("Sinhala")}
                    className={`h-14 flex-1 items-center justify-center rounded-full ${
                      language === "Sinhala" ? "bg-[#8f140e]" : "bg-[#e7e4e0]"
                    }`}
                  >
                    <Text
                      className={`text-[15px] font-medium tracking-[0.6px] ${
                        language === "Sinhala" ? "text-white" : "text-[#3a3a3a]"
                      }`}
                    >
                      SINHALA
                    </Text>
                  </Pressable>
                </View>
              </View>

              <View className="mt-auto pt-8">
                <View className="h-px bg-[#f0ebe6]" />
                <Text className="mt-7 text-center text-[13px] leading-5 text-[#6c625d]">
                  System Version 11.0 • Authorized Personnel Only
                </Text>
              </View>
            </View>

            <View className="w-full max-w-[340px] items-center gap-3 px-2 py-4">
              <View className="flex-row items-center gap-2">
                <Feather name="help-circle" size={18} color="#78716c" />
                <Text className="text-[15px] text-[#6d6a67]">
                  Need help? contact IT Support
                </Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Ionicons
                  name="shield-checkmark-outline"
                  size={18}
                  color="#78716c"
                />
                <Text className="text-[15px] text-[#6d6a67]">
                  Secure SSL Encryption
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
