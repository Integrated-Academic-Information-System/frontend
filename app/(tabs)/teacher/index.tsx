import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TeacherDashboard() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Teacher Dashboard</Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/teacher/class-incharge")}
      >
        <Text style={styles.cardTitle}>Class Incharge</Text>
        <Text style={styles.cardDesc}>Manage your classes and students</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/teacher/subject-teacher")}
      >
        <Text style={styles.cardTitle}>Subject Teacher</Text>
        <Text style={styles.cardDesc}>Manage your subjects and marks</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 8,
  },
  cardDesc: {
    fontSize: 14,
    color: "#666",
  },
});
