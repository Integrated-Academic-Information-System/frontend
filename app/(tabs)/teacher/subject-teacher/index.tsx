import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SubjectTeacherDashboard() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subject Teacher</Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/teacher/subject-teacher/subjects")}
      >
        <Text style={styles.cardTitle}>My Subjects</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/teacher/subject-teacher/marks-entry")}
      >
        <Text style={styles.cardTitle}>Marks Entry</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#34C759",
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
