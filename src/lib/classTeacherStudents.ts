import AsyncStorage from "@react-native-async-storage/async-storage";

export type ClassTeacherStudent = {
  name: string;
  grade: string;
  roll: string;
};

const CLASS_TEACHER_STUDENTS_KEY = "classTeacherStudents";

export async function getClassTeacherStudents() {
  const rawValue = await AsyncStorage.getItem(CLASS_TEACHER_STUDENTS_KEY);

  if (!rawValue) {
    return [] as ClassTeacherStudent[];
  }

  try {
    const parsedValue = JSON.parse(rawValue) as ClassTeacherStudent[];
    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch {
    return [] as ClassTeacherStudent[];
  }
}

export async function saveClassTeacherStudents(
  students: ClassTeacherStudent[],
) {
  await AsyncStorage.setItem(
    CLASS_TEACHER_STUDENTS_KEY,
    JSON.stringify(students),
  );
}
