import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Switch,
  Image,
  Modal,
  FlatList,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

// Type definitions for clean data mapping
interface UserDirectoryItem {
  id: string;
  name: string;
  role: 'STUDENT' | 'TEACHER' | 'ADMIN';
  email: string;
  registeredDate: string;
  status: 'ACTIVE' | 'INACTIVE';
  avatar: any; 
}

export const UserManagementScreen = () => {
  // --- Form States ---
  const [fullName, setFullName] = useState('');
  const [usernameEmail, setUsernameEmail] = useState('');
  const [role, setRole] = useState('Student');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isAccountActive, setIsAccountActive] = useState(true);
  const [isRoleModalVisible, setIsRoleModalVisible] = useState(false);

  // --- Directory States ---
  const [searchQuery, setSearchQuery] = useState('');

  const rolesList = ['Student', 'Teacher', 'Admin'];

  // Mock Data perfectly mirroring your second image's directory list
  const initialDirectory: UserDirectoryItem[] = [
    { 
      id: '1',
      name: 'Alex Mercer',
      role: 'STUDENT',
      email: 'mercer.a@academy.edu',
      registeredDate: 'REGISTERED OCT 2023',
      status: 'ACTIVE',
      avatar: require('../../assets/images/sampleAvatar.png'), // Replace with actual path or use URI
    },
    {
      id: '2',
      name: 'Sarah Kinsley',
      role: 'TEACHER',
      email: 'kinsley.s@academy.edu',
      registeredDate: 'REGISTERED MAY 2022',
      status: 'ACTIVE',
      avatar: require('../../assets/images/sampleAvatar.png'),
    },
    {
      id: '3',
      name: 'David Walsh',
      role: 'ADMIN',
      email: 'walsh.d@academy.edu',
      registeredDate: 'REGISTERED JAN 2021',
      status: 'INACTIVE',
      avatar: require('../../assets/images/sampleAvatar.png'),
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]">
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />

      <ScrollView 
        className="flex-1 px-6" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        {/* --- NAVBAR --- */}
        <View className="flex-row justify-between items-center mt-4 mb-8">
          <View className="flex-row items-center">
            {/* Header Mini-Avatar */}
            <View className="w-10 h-10 rounded-full bg-slate-900 overflow-hidden mr-3">
              <Image 
                source={require('../../assets/images/sampleAvatar.png')} 
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
            <Text className="text-[#7A0000] font-bold text-2xl tracking-tight">
              User Management
            </Text>
          </View>
          
          {/* Settings Icon */}
          <TouchableOpacity activeOpacity={0.6} className="p-1">
            <Text className="text-gray-600 text-xl">⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* --- SECTION 1: CREATE NEW IDENTITY --- */}
        <View className="mb-4">
          <Text className="text-gray-950 font-bold text-3xl tracking-tight mb-2">
            Create New Identity
          </Text>
          <Text className="text-gray-500 font-normal text-sm leading-5 pr-4">
            Expand your institution's digital ecosystem by provisioning new secure access credentials.
          </Text>
        </View>

        {/* --- FORM CARD --- */}
        <View className="bg-white rounded-[36px] p-6 mb-10 shadow-sm border border-gray-100/40">
          
          {/* Full Name Input */}
          <View className="mb-5">
            <Text className="text-[#5C4D4D] text-[11px] font-bold tracking-wider uppercase mb-2">
              Full Name
            </Text>
            <TextInput
              placeholder="e.g. Julian Montgomery"
              placeholderTextColor="#A3A3A3"
              value={fullName}
              onChangeText={setFullName}
              className="bg-[#F4F4F4] rounded-full px-5 py-3.5 text-gray-800 font-medium text-sm"
            />
          </View>

          {/* Username / Email Input */}
          <View className="mb-5">
            <Text className="text-[#5C4D4D] text-[11px] font-bold tracking-wider uppercase mb-2">
              Username / Email
            </Text>
            <TextInput
              placeholder="j.montgomery@academy.edu"
              placeholderTextColor="#A3A3A3"
              value={usernameEmail}
              onChangeText={setUsernameEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              className="bg-[#F4F4F4] rounded-full px-5 py-3.5 text-gray-800 font-medium text-sm"
            />
          </View>

          {/* Role Selection (Custom Dropdown) */}
          <View className="mb-5">
            <Text className="text-[#5C4D4D] text-[11px] font-bold tracking-wider uppercase mb-2">
              Role Selection
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setIsRoleModalVisible(true)}
              className="bg-[#F4F4F4] rounded-full px-5 py-3.5 flex-row justify-between items-center"
            >
              <Text className="text-gray-800 font-medium text-sm">{role}</Text>
              <Text className="text-gray-400 text-xs">▼</Text>
            </TouchableOpacity>
          </View>

          {/* Password Input */}
          <View className="mb-5">
            <Text className="text-[#5C4D4D] text-[11px] font-bold tracking-wider uppercase mb-2">
              Password
            </Text>
            <TextInput
              placeholder="••••••••••••"
              placeholderTextColor="#A3A3A3"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
              className="bg-[#F4F4F4] rounded-full px-5 py-3.5 text-gray-800 font-medium text-sm"
            />
          </View>

          {/* Confirm Password Input */}
          <View className="mb-6">
            <Text className="text-[#5C4D4D] text-[11px] font-bold tracking-wider uppercase mb-2">
              Confirm Password
            </Text>
            <TextInput
              placeholder="••••••••••••"
              placeholderTextColor="#A3A3A3"
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              className="bg-[#F4F4F4] rounded-full px-5 py-3.5 text-gray-800 font-medium text-sm"
            />
          </View>

          {/* Account Status Switch Container */}
          <View className="bg-[#F4F4F4] rounded-full py-2.5 pl-5 pr-3 flex-row justify-between items-center mb-6">
            <View className="flex-row items-center">
              <Text className="text-gray-600 mr-2 text-sm">🛡️</Text>
              <Text className="text-gray-700 font-bold text-[11px] tracking-wider uppercase">
                Account Status
              </Text>
            </View>
            <Switch
              value={isAccountActive}
              onValueChange={setIsAccountActive}
              trackColor={{ false: '#D1D5DB', true: '#7A0000' }}
              thumbColor="#FFFFFF"
              ios_backgroundColor="#D1D5DB"
            />
          </View>

          {/* Action Buttons Row */}
          <View className="flex-row justify-between items-center space-x-3">
            <TouchableOpacity
              activeOpacity={0.8}
              className="bg-[#7A0000] flex-1 py-4 rounded-full items-center justify-center shadow-sm"
            >
              <Text className="text-white font-bold text-sm">Add User</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              className="bg-[#E5E5E5] flex-1 py-4 rounded-full items-center justify-center"
            >
              <Text className="text-gray-800 font-bold text-sm">Save Draft</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* --- SECTION 2: USER DIRECTORY --- */}
        <View className="mb-4">
          <Text className="text-gray-950 font-bold text-2xl tracking-tight mb-1">
            User Directory
          </Text>
          <Text className="text-gray-400 font-medium text-xs">
            Manage and audit 1,248 registered entities
          </Text>
        </View>

        {/* Directory Search Field */}
        <View className="flex-row items-center bg-[#F4F4F4] rounded-full px-5 py-3.5 mb-6">
          <Text className="text-gray-400 text-sm mr-2">🔍</Text>
          <TextInput
            placeholder="Search by name, email or role..."
            placeholderTextColor="#A3A3A3"
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 text-gray-800 text-sm font-medium p-0"
          />
        </View>

        {/* Directory Cards Mapping */}
        {initialDirectory.map((item) => (
          <View 
            key={item.id} 
            className="bg-white rounded-3xl p-5 mb-4 shadow-sm border border-gray-100/40"
          >
            {/* Header Layer */}
            <View className="flex-row items-start justify-between mb-3">
              <View className="flex-row items-center flex-1">
                <View className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden mr-3">
                  <Image source={item.avatar} className="w-full h-full" />
                </View>
                <View>
                  <Text className="text-gray-900 font-bold text-base">{item.name}</Text>
                  <Text className="text-gray-400 font-bold text-[10px] tracking-wide mt-0.5">
                    {item.role}
                  </Text>
                </View>
              </View>

              {/* Dynamic Status Badges */}
              <View className={`px-2.5 py-1 rounded-full ${
                item.status === 'ACTIVE' ? 'bg-[#E6F4EA]' : 'bg-[#F1F3F4]'
              }`}>
                <Text className={`text-[10px] font-bold tracking-wider ${
                  item.status === 'ACTIVE' ? 'text-[#137333]' : 'text-[#5F6368]'
                }`}>
                  {item.status}
                </Text>
              </View>
            </View>

            {/* Email & Date Fields */}
            <View className="mb-4 pl-1">
              <Text className="text-gray-500 font-medium text-xs mb-0.5">{item.email}</Text>
              <Text className="text-gray-400 text-[10px] uppercase font-semibold tracking-wide">
                {item.registeredDate}
              </Text>
            </View>

            {/* Divider Line */}
            <View className="h-[1px] bg-gray-100 w-full mb-3.5" />

            {/* Bottom Actions Row */}
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center space-x-4">
                <TouchableOpacity className="p-1">
                  <Text className="text-gray-500 text-sm">✏️</Text>
                </TouchableOpacity>
                <TouchableOpacity className="p-1">
                  <Text className="text-red-500 text-sm">🗑️</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity className="flex-row items-center py-1">
                <Text className="text-gray-400 font-bold text-[10px] tracking-wider uppercase mr-1">
                  View Logs
                </Text>
                <Text className="text-gray-400 text-xs">→</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Load More Button */}
        <TouchableOpacity 
          activeOpacity={0.7}
          className="flex-row items-center justify-center bg-[#F4F4F4] rounded-full py-3.5 mt-2 mb-4"
        >
          <Text className="text-gray-800 font-bold text-xs mr-2">
            Load All Directory Entries
          </Text>
          <Text className="text-gray-600 text-xs">▼</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* --- Native Modal UI for Role Picker Dropdown --- */}
      <Modal
        visible={isRoleModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsRoleModalVisible(false)}
      >
        <TouchableOpacity 
          className="flex-1 bg-black/40 justify-center items-center px-6"
          activeOpacity={1}
          onPress={() => setIsRoleModalVisible(false)}
        >
          <View className="bg-white w-full rounded-3xl p-4 shadow-xl">
            <Text className="text-gray-900 font-bold text-base mb-3 p-2 border-b border-gray-100">
              Select User Role
            </Text>
            <FlatList
              data={rolesList}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="py-3.5 px-3 rounded-xl active:bg-gray-100"
                  onPress={() => {
                    setRole(item);
                    setIsRoleModalVisible(false);
                  }}
                >
                  <Text className="text-gray-800 text-sm font-medium">{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};