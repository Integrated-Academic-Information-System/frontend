// app/(student)/(tabs)/marks.tsx

import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// ─── Types ───────────────────────────────────────────────────────────────────

type Subject = {
  id: string;
  department: string;
  name: string;
  term: string;
  score: number;
  total: number;
  grade: string;
};

// ─── Static Data ─────────────────────────────────────────────────────────────

const ALL_SUBJECTS: Subject[] = [
  {
    id: "1",
    department: "Department of Mathematics",
    name: "Advanced Mathematics",
    term: "Fall 2024",
    score: 94,
    total: 100,
    grade: "A",
  },
  {
    id: "2",
    department: "Science Faculty",
    name: "Theoretical Physics",
    term: "Fall 2024",
    score: 88,
    total: 100,
    grade: "B+",
  },
  {
    id: "3",
    department: "Computer Science",
    name: "Data Structures",
    term: "Fall 2024",
    score: 91,
    total: 100,
    grade: "A-",
  },
  {
    id: "4",
    department: "Literature & Arts",
    name: "Academic Writing",
    term: "Fall 2024",
    score: 98,
    total: 100,
    grade: "A+",
  },
];

const SUBJECT_OPTIONS = [
  "All Subjects",
  "Mathematics",
  "Physics",
  "Computer Science",
  "Literature & Arts",
];

const TERM_OPTIONS = [
  "1st Term",
  "2nd Term",
  "3rd Term",
];

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function MarksScreen() {
  const router = useRouter();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#efeae4" }}
      edges={["top"]}
    >
      <StatusBar barStyle="dark-content" />

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Top Bar ── */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 16,
            paddingTop: 8,
            paddingBottom: 16,
          }}
        >
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => ({
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: "#e7e4e0",
              alignItems: "center",
              justifyContent: "center",
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Feather name="arrow-left" size={18} color="#2d2d2d" />
          </Pressable>
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: "#e7e4e0",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="person-outline" size={18} color="#8f140e" />
          </View>
        </View>

        {/* ── Page Title ── */}
        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          <Text
            style={{
              fontSize: 9,
              fontWeight: "800",
              color: "#8f140e",
              letterSpacing: 1.5,
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            Student Progress
          </Text>
          <Text style={{ fontSize: 30, fontWeight: "900", color: "#1a1a1a" }}>
            Marks View
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}