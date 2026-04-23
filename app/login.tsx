import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
} from 'react-native';

// Note: Make sure you have NativeWind installed for Tailwind CSS support in React Native
// npm install nativewind && npm install --save-dev tailwindcss

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'EN' | 'SI'>('EN');

  const handleSignIn = () => {
    console.log('Sign In pressed', { username, password, keepSignedIn });
  };

  const handleClearForm = () => {
    setUsername('');
    setPassword('');
    setKeepSignedIn(false);
  };

  return (
    <ScrollView
      className="flex-1 bg-gray-100"
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <StatusBar barStyle="dark-content" backgroundColor="#f3f4f6" />

      <View className="flex-1 px-8 pt-16 pb-8">

        {/* School Logo & Name */}
        <View className="flex-row items-center mb-10">
          <View className="w-12 h-12 rounded-full bg-[#8B1A1A] items-center justify-center mr-3">
            {/* Replace with your actual school logo */}
            <Text className="text-white text-xl font-bold">🎓</Text>
          </View>
          <View className="flex-1">
            <Text className="text-[#8B1A1A] font-bold text-sm leading-tight">
              R/ Belihuloya Dhammarathana
            </Text>
            <Text className="text-[#8B1A1A] font-bold text-sm leading-tight">
              Maha Vidyalaya
            </Text>
          </View>
        </View>

        {/* Welcome Heading */}
        <Text className="text-4xl font-bold text-gray-900 mb-2">Welcome</Text>
        <Text className="text-gray-500 text-base mb-8">
          Please enter your credentials to access your dashboard.
        </Text>

        {/* Username / Email Field */}
        <Text className="text-xs font-semibold text-gray-500 tracking-widest mb-2 uppercase">
          Username / Email
        </Text>
        <View className="flex-row items-center bg-gray-200 rounded-xl px-4 py-3 mb-5">
          <Text className="text-gray-400 mr-3 text-base">👤</Text>
          <TextInput
            className="flex-1 text-gray-700 text-base"
            placeholder="e.g. kumara@gmail.com"
            placeholderTextColor="#9ca3af"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        {/* Password Field */}
        <Text className="text-xs font-semibold text-gray-500 tracking-widest mb-2 uppercase">
          Password
        </Text>
        <View className="flex-row items-center bg-gray-200 rounded-xl px-4 py-3 mb-5">
          <Text className="text-gray-400 mr-3 text-base">🔒</Text>
          <TextInput
            className="flex-1 text-gray-700 text-base"
            placeholder="••••••••"
            placeholderTextColor="#9ca3af"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text className="text-gray-400 text-base">
              {showPassword ? '🙈' : '👁️'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Keep Signed In & Forgot Password */}
        <View className="flex-row items-center justify-between mb-7">
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => setKeepSignedIn(!keepSignedIn)}
          >
            <View
              className={`w-5 h-5 rounded border-2 mr-2 items-center justify-center ${
                keepSignedIn
                  ? 'bg-[#8B1A1A] border-[#8B1A1A]'
                  : 'border-gray-400 bg-white'
              }`}
            >
              {keepSignedIn && (
                <Text className="text-white text-xs font-bold">✓</Text>
              )}
            </View>
            <Text className="text-gray-600 text-sm">Keep me{'\n'}signed in</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text className="text-[#8B1A1A] font-semibold text-sm">
              Forgot{'\n'}Password?
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sign In Button */}
        <TouchableOpacity
          className="bg-[#8B1A1A] rounded-full py-4 items-center justify-center flex-row mb-3"
          onPress={handleSignIn}
        >
          <Text className="text-white font-bold text-lg mr-2">Sign In</Text>
          <Text className="text-white text-lg">→</Text>
        </TouchableOpacity>

        {/* Clear Form Button */}
        <TouchableOpacity
          className="bg-gray-200 rounded-full py-4 items-center justify-center flex-row mb-8"
          onPress={handleClearForm}
        >
          <Text className="text-gray-600 font-semibold text-base mr-2">↺</Text>
          <Text className="text-gray-600 font-semibold text-base tracking-widest uppercase">
            Clear Form
          </Text>
        </TouchableOpacity>

        {/* Language Selector */}
        <Text className="text-[#8B1A1A] font-bold text-base mb-3">
          Select Language
        </Text>
        <View className="flex-row gap-3 mb-10">
          <TouchableOpacity
            className={`flex-1 py-3 rounded-full items-center ${
              selectedLanguage === 'EN' ? 'bg-[#8B1A1A]' : 'bg-gray-200'
            }`}
            onPress={() => setSelectedLanguage('EN')}
          >
            <Text
              className={`font-bold tracking-widest text-sm ${
                selectedLanguage === 'EN' ? 'text-white' : 'text-gray-600'
              }`}
            >
              ENGLISH
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-1 py-3 rounded-full items-center ${
              selectedLanguage === 'SI' ? 'bg-[#8B1A1A]' : 'bg-gray-200'
            }`}
            onPress={() => setSelectedLanguage('SI')}
          >
            <Text
              className={`font-bold tracking-widest text-sm ${
                selectedLanguage === 'SI' ? 'text-white' : 'text-gray-600'
              }`}
            >
              SINHALA
            </Text>
          </TouchableOpacity>
        </View>

        {/* Version Info */}
        <Text className="text-center text-gray-400 text-xs mb-6">
          System Version 11.0 • Authorized Personnel Only
        </Text>

        {/* Footer Links */}
        <View className="items-center gap-2">
          <TouchableOpacity className="flex-row items-center">
            <Text className="text-gray-500 text-xs mr-1">❓</Text>
            <Text className="text-gray-500 text-xs">
              Need help? contact IT Support
            </Text>
          </TouchableOpacity>
          <View className="flex-row items-center">
            <Text className="text-gray-500 text-xs mr-1">🔒</Text>
            <Text className="text-gray-500 text-xs">Secure SSL Encryption</Text>
          </View>
        </View>

      </View>
    </ScrollView>
  );
}