import './global.css';
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <Stack
                screenOptions={{
                    headerShown: false, // 🔥 disable for ALL screens
                }}
            >
                <Stack.Screen name="(tabs)" />
            </Stack>
        </SafeAreaProvider>
    );
}