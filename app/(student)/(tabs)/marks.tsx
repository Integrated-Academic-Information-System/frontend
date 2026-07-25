import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
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
  "Fall 2024",
  "Spring 2024",
  "Fall 2023",
  "Spring 2023",
];

// ─── Grade Color Helper ───────────────────────────────────────────────────────

const gradeColor = (grade: string): string => {
  if (grade.startsWith("A")) return "#1a73e8";
  if (grade.startsWith("B")) return "#0f9d58";
  if (grade.startsWith("C")) return "#f9ab00";
  return "#d93025";
};

// ─── Subject Card Component ───────────────────────────────────────────────────

const SubjectCard = ({ item }: { item: Subject }) => (
  <View
    style={{
      backgroundColor: "#fff",
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      borderWidth: 0.5,
      borderColor: "#f0ebe6",
    }}
  >
    <Text
      style={{
        fontSize: 9,
        fontWeight: "800",
        color: "#a5928a",
        letterSpacing: 1,
        textTransform: "uppercase",
        marginBottom: 6,
      }}
    >
      {item.department}
    </Text>

    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "900",
          color: "#1a1a1a",
          flex: 1,
          lineHeight: 26,
          paddingRight: 12,
        }}
      >
        {item.name}
      </Text>
      <Text
        style={{
          fontSize: 22,
          fontWeight: "900",
          color: gradeColor(item.grade),
        }}
      >
        {item.grade}
      </Text>
    </View>

    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 12,
      }}
    >
      <View>
        <Text
          style={{
            fontSize: 9,
            fontWeight: "800",
            color: "#a5928a",
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        >
          Term
        </Text>
        <Text
          style={{
            fontSize: 13,
            fontWeight: "700",
            color: "#2d2d2d",
            marginTop: 2,
          }}
        >
          {item.term}
        </Text>
      </View>
      <View style={{ alignItems: "flex-end" }}>
        <Text
          style={{
            fontSize: 9,
            fontWeight: "800",
            color: "#a5928a",
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        >
          Score
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "baseline",
            gap: 2,
            marginTop: 2,
          }}
        >
          <Text
            style={{
              fontSize: 26,
              fontWeight: "900",
              color: "#1a1a1a",
              lineHeight: 28,
            }}
          >
            {item.score}
          </Text>
          <Text style={{ fontSize: 12, color: "#a5928a", fontWeight: "600" }}>
            / {item.total}
          </Text>
        </View>
      </View>
    </View>
  </View>
);

// ─── Dropdown Component ───────────────────────────────────────────────────────

const Dropdown = ({
  label,
  value,
  options,
  open,
  onToggle,
  onSelect,
}: {
  label: string;
  value: string;
  options: string[];
  open: boolean;
  onToggle: () => void;
  onSelect: (opt: string) => void;
}) => (
  <View style={{ marginBottom: 16 }}>
    <Text
      style={{
        fontSize: 11,
        fontWeight: "800",
        color: "#6f5f5a",
        letterSpacing: 0.5,
        marginBottom: 8,
      }}
    >
      {label}
    </Text>
    <Pressable
      onPress={onToggle}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#f5f2ee",
        borderRadius: 16,
        paddingHorizontal: 16,
        height: 48,
      }}
    >
      <Text style={{ fontSize: 14, color: "#2d2d2d", fontWeight: "600" }}>
        {value}
      </Text>
      <Feather
        name={open ? "chevron-up" : "chevron-down"}
        size={16}
        color="#a5928a"
      />
    </Pressable>
    {open && (
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 16,
          marginTop: 4,
          overflow: "hidden",
          borderWidth: 0.5,
          borderColor: "#f0ebe6",
        }}
      >
        {options.map((opt, i) => (
          <Pressable
            key={opt}
            onPress={() => onSelect(opt)}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 12,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderTopWidth: i === 0 ? 0 : 0.5,
              borderColor: "#f0ebe6",
              backgroundColor: value === opt ? "#fdf0f0" : "#fff",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: value === opt ? "#8f140e" : "#2d2d2d",
                fontWeight: value === opt ? "700" : "400",
              }}
            >
              {opt}
            </Text>
            {value === opt && (
              <Feather name="check" size={14} color="#8f140e" />
            )}
          </Pressable>
        ))}
      </View>
    )}
  </View>
);

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function MarksScreen() {
  const router = useRouter();

  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [selectedTerm, setSelectedTerm] = useState("Fall 2024");
  const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);
  const [showTermDropdown, setShowTermDropdown] = useState(false);
  const [results, setResults] = useState<Subject[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleViewResults = () => {
    let filtered = ALL_SUBJECTS;
    if (selectedSubject !== "All Subjects") {
      filtered = filtered.filter((s) =>
        s.department.toLowerCase().includes(selectedSubject.toLowerCase())
      );
    }
    filtered = filtered.filter((s) => s.term === selectedTerm);
    setResults(filtered);
    setHasSearched(true);
    setShowSubjectDropdown(false);
    setShowTermDropdown(false);
  };

  const handleBack = () => {
    setResults([]);
    setHasSearched(false);
    setSelectedSubject("All Subjects");
    setSelectedTerm("Fall 2024");
  };

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

        {/* ── Filter Card ── */}
        <View
          style={{
            marginHorizontal: 16,
            backgroundColor: "#fff",
            borderRadius: 22,
            padding: 20,
            marginBottom: 16,
            borderWidth: 0.5,
            borderColor: "#f0ebe6",
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "800",
              color: "#1a1a1a",
              marginBottom: 16,
            }}
          >
            Filter Results
          </Text>

          <Dropdown
            label="Subject"
            value={selectedSubject}
            options={SUBJECT_OPTIONS}
            open={showSubjectDropdown}
            onToggle={() => {
              setShowSubjectDropdown(!showSubjectDropdown);
              setShowTermDropdown(false);
            }}
            onSelect={(opt) => {
              setSelectedSubject(opt);
              setShowSubjectDropdown(false);
            }}
          />

          <Dropdown
            label="Term"
            value={selectedTerm}
            options={TERM_OPTIONS}
            open={showTermDropdown}
            onToggle={() => {
              setShowTermDropdown(!showTermDropdown);
              setShowSubjectDropdown(false);
            }}
            onSelect={(opt) => {
              setSelectedTerm(opt);
              setShowTermDropdown(false);
            }}
          />

          <View style={{ flexDirection: "row", gap: 12, marginTop: 4 }}>
            <Pressable
              onPress={handleBack}
              style={({ pressed }) => ({
                flex: 1,
                height: 52,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 50,
                backgroundColor: "#e7e4e0",
                opacity: pressed ? 0.8 : 1,
              })}
            >
              <Text
                style={{ fontSize: 15, fontWeight: "700", color: "#3a3a3a" }}
              >
                Back
              </Text>
            </Pressable>

            <Pressable
              onPress={handleViewResults}
              style={({ pressed }) => ({
                flex: 1,
                height: 52,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 50,
                backgroundColor: "#8f140e",
                opacity: pressed ? 0.85 : 1,
              })}
            >
              <Text
                style={{ fontSize: 15, fontWeight: "700", color: "#fff" }}
              >
                View Results
              </Text>
            </Pressable>
          </View>
        </View>

        {/* ── Results Section ── */}
        {hasSearched && (
          <View style={{ paddingHorizontal: 16 }}>

            {/* Results header */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <Text
                style={{ fontSize: 22, fontWeight: "900", color: "#1a1a1a" }}
              >
                Subject{"\n"}Performance
              </Text>
              <View style={{ alignItems: "flex-end" }}>
                <Text
                  style={{ fontSize: 12, fontWeight: "700", color: "#8f140e" }}
                >
                  {results.length} records
                </Text>
                <Text style={{ fontSize: 11, color: "#a5928a" }}>found</Text>
              </View>
            </View>

            {/* Empty state */}
            {results.length === 0 ? (
              <View
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 16,
                  padding: 32,
                  alignItems: "center",
                  marginBottom: 16,
                  borderWidth: 0.5,
                  borderColor: "#f0ebe6",
                }}
              >
                <Ionicons name="search-outline" size={40} color="#c0b4af" />
                <Text
                  style={{
                    fontSize: 14,
                    color: "#a5928a",
                    marginTop: 12,
                    fontWeight: "600",
                  }}
                >
                  No results found
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: "#c0b4af",
                    marginTop: 4,
                    textAlign: "center",
                  }}
                >
                  Try adjusting your filters.
                </Text>
              </View>
            ) : (
              results.map((item) => (
                <SubjectCard key={item.id} item={item} />
              ))
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}