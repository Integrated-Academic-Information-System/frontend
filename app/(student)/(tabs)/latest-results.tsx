import { getStudentResultsApi } from "../../../src/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Result {
  subject: string;
  term: string;
  academic_year: string;
  marks: number;
  status: string;
}

export default function LatestResultsScreen() {
  const [results, setResults] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [studentName, setStudentName] = useState("");

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    try {
      setIsLoading(true);
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) return;

      const user = JSON.parse(userData);
      setStudentName(user.name);

      // Get student ID from API
      const { getStudentsApi } = await import("../../../src/services/api");
      const studentsRes = await getStudentsApi();
      const student = studentsRes.data.find((s: any) => s.email === user.email);

      if (student) {
        const res = await getStudentResultsApi(student.id);
        setResults(res.data);
      }
    } catch (error) {
      console.error("Failed to load results");
    } finally {
      setIsLoading(false);
    }
  };

  const getGradeColor = (marks: number) => {
    if (marks >= 75) return "#047857"; // green
    if (marks >= 50) return "#b45309"; // orange
    return "#8f140e"; // red
  };

  const getGradeLetter = (marks: number) => {
    if (marks >= 75) return "A";
    if (marks >= 65) return "B";
    if (marks >= 50) return "C";
    if (marks >= 35) return "S";
    return "F";
  };

  // Group results by term
  const groupedResults = results.reduce(
    (acc, result) => {
      const key = `${result.term} - ${result.academic_year}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push(result);
      return acc;
    },
    {} as Record<string, Result[]>,
  );

  return (
    <SafeAreaView className="flex-1 bg-[#efeae4]" edges={["top"]}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 pb-12 pt-4"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="mb-6 px-1">
          <Text className="text-[28px] font-extrabold text-[#212121]">
            My Results
          </Text>
          {studentName ? (
            <Text className="text-[14px] text-[#6d615c] font-medium mt-1">
              {studentName}
            </Text>
          ) : null}
        </View>

        {/* Loading */}
        {isLoading ? (
          <View className="items-center justify-center py-20">
            <ActivityIndicator size="large" color="#8f140e" />
            <Text className="mt-4 text-[#8f140e] font-bold">
              Loading results...
            </Text>
          </View>
        ) : results.length === 0 ? (
          // Empty State
          <View className="items-center justify-center py-20">
            <MaterialCommunityIcons
              name="book-open-outline"
              size={64}
              color="#c9b8b2"
            />
            <Text className="mt-4 text-[18px] font-bold text-[#6d615c]">
              No results yet
            </Text>
            <Text className="mt-2 text-[14px] text-[#a5928a] text-center">
              Your results will appear here once marks are submitted
            </Text>
          </View>
        ) : (
          // Results grouped by term
          <View className="gap-6">
            {Object.entries(groupedResults).map(([termKey, termResults]) => (
              <View key={termKey}>
                {/* Term Header */}
                <View className="flex-row items-center mb-3">
                  <View className="h-px flex-1 bg-[#ddd6d0]" />
                  <Text className="mx-3 text-[12px] font-bold text-[#8e847f] uppercase tracking-[1px]">
                    {termKey}
                  </Text>
                  <View className="h-px flex-1 bg-[#ddd6d0]" />
                </View>

                {/* Subject Results */}
                <View className="gap-3">
                  {termResults.map((result, index) => (
                    <View
                      key={index}
                      className="bg-white rounded-[24px] p-4 shadow-sm shadow-black/5 flex-row items-center"
                    >
                      {/* Subject Icon */}
                      <View className="h-12 w-12 rounded-2xl bg-[#fceeed] items-center justify-center mr-3">
                        <MaterialCommunityIcons
                          name="book-open-variant"
                          size={22}
                          color="#8f140e"
                        />
                      </View>

                      {/* Subject Info */}
                      <View className="flex-1">
                        <Text className="text-[15px] font-bold text-[#212121]">
                          {result.subject}
                        </Text>
                        <Text className="text-[12px] text-[#8e847f] mt-0.5">
                          Status: {result.status}
                        </Text>
                      </View>

                      {/* Marks & Grade */}
                      <View className="items-center">
                        <Text
                          className="text-[22px] font-extrabold"
                          style={{ color: getGradeColor(result.marks) }}
                        >
                          {result.marks}
                        </Text>
                        <View
                          className="px-2 py-0.5 rounded-full mt-0.5"
                          style={{
                            backgroundColor: getGradeColor(result.marks) + "20",
                          }}
                        >
                          <Text
                            className="text-[11px] font-bold"
                            style={{ color: getGradeColor(result.marks) }}
                          >
                            Grade {getGradeLetter(result.marks)}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>

                {/* Term Average */}
                <View className="mt-3 bg-[#212121] rounded-2xl p-4 flex-row items-center justify-between">
                  <Text className="text-[14px] font-bold text-white">
                    Term Average
                  </Text>
                  <Text className="text-[18px] font-extrabold text-white">
                    {Math.round(
                      termResults.reduce((sum, r) => sum + r.marks, 0) /
                        termResults.length,
                    )}
                    %
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
