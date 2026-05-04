import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // We hide the system tab bar to use a custom one inside the card
        tabBarStyle: { display: 'none' }, 
      }}
    />
  );
}