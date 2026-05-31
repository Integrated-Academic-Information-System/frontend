import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

export interface Student {
  id: string;
  name: string;
  badgeNo: string;
  avatar: any; // Use require() or URI string depending on asset setup
  currentGrade: string;
  attendance: string;
}

interface StudentCardProps {
  student: Student;
  onViewProfile: (id: string) => void;
}

export const StudentCard: React.FC<StudentCardProps> = ({ student, onViewProfile }) => {
  return (
    <View className="bg-white rounded-3xl p-5 mb-5 shadow-sm border border-gray-100/50">
      {/* Header Info */}
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center flex-1 pr-2">
          {/* Avatar Container */}
          <View className="w-14 h-14 rounded-2xl bg-teal-50 overflow-hidden items-center justify-center">
            <Image 
              source={student.avatar} 
              className="w-12 h-12" 
              resizeMode="contain"
            />
          </View>
          
          {/* Name & ID */}
          <View className="ml-3 flex-1">
            <Text className="text-gray-900 font-bold text-lg leading-6" numberOfLines={2}>
              {student.name}
            </Text>
            <Text className="text-gray-400 text-xs mt-0.5 font-medium tracking-wide">
              ID: {student.id}
            </Text>
          </View>
        </View>

        {/* Badge Number */}
        <View className="bg-red-50 px-3 py-1 rounded-full self-start">
          <Text className="text-red-800 text-xs font-semibold tracking-wider">
            {student.badgeNo}
          </Text>
        </View>
      </View>

      {/* Grid Stats */}
      <View className="space-y-2 mb-5">
        <View className="flex-row justify-between items-center">
          <Text className="text-gray-400 font-medium text-sm">Current Grade</Text>
          <Text className="text-gray-800 font-bold text-sm">{student.currentGrade}</Text>
        </View>
        <View className="flex-row justify-between items-center">
          <Text className="text-gray-400 font-medium text-sm">Attendance</Text>
          <Text className="text-gray-800 font-bold text-sm">{student.attendance}</Text>
        </View>
      </View>

      {/* Action Button */}
      <TouchableOpacity 
        activeOpacity={0.8}
        onPress={() => onViewProfile(student.id)}
        className="bg-[#7A0000] py-3.5 rounded-full flex-row items-center justify-center"
      >
        <Text className="text-white font-semibold text-base mr-2">View Profile</Text>
        <Text className="text-white font-bold text-base">→</Text>
      </TouchableOpacity>
    </View>
  );
};