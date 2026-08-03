import { Feather } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type IconName = ComponentProps<typeof Feather>["name"];

type ModernEmptyStateProps = {
  badge: string;
  title: string;
  description: string;
  iconName: IconName;
  actionLabel?: string;
  onActionPress?: () => void;
};

export function ModernEmptyState({
  badge,
  title,
  description,
  iconName,
  actionLabel,
  onActionPress,
}: ModernEmptyStateProps) {
  return (
    <SafeAreaView className="flex-1 bg-[#f5efe8]">
      <View className="absolute -top-10 right-[-40px] h-44 w-44 rounded-full bg-[#8f140e]/10" />
      <View className="absolute bottom-20 left-[-48px] h-40 w-40 rounded-full bg-[#d8b39d]/20" />
      <View className="absolute right-8 top-24 h-3 w-3 rounded-full bg-[#8f140e]/30" />
      <View className="absolute left-12 top-36 h-2 w-2 rounded-full bg-[#b97d63]/40" />

      <View className="flex-1 justify-center px-6 py-8">
        <View className="items-center rounded-[32px] border border-[#e8dbd0] bg-white px-6 py-8 shadow-xl">
          <View className="mb-5 h-16 w-16 items-center justify-center rounded-3xl bg-[#8f140e]/10">
            <Feather name={iconName} size={32} color="#8f140e" />
          </View>

          <View className="mb-4 rounded-full bg-[#8f140e]/10 px-4 py-1.5">
            <Text className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#8f140e]">
              {badge}
            </Text>
          </View>

          <Text className="text-center text-3xl font-bold leading-10 text-[#7f2018]">
            {title}
          </Text>

          <Text className="mt-4 max-w-xs text-center text-[15px] leading-6 text-[#7f726b]">
            {description}
          </Text>

          {actionLabel && onActionPress ? (
            <Pressable
              onPress={onActionPress}
              className="mt-6 rounded-full bg-[#8f140e] px-5 py-3 active:opacity-80"
            >
              <Text className="text-sm font-bold text-white">
                {actionLabel}
              </Text>
            </Pressable>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
}
