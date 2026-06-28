import AsyncStorage from "@react-native-async-storage/async-storage";

export type ClassTeacherProfile = {
  teacherName: string;
  className: string;
};

const CLASS_TEACHER_PROFILE_KEY = "classTeacherProfile";

export const DEFAULT_CLASS_NAME = "Grade 10 - A";
export const DEFAULT_TEACHER_NAME = "Username";

export async function getClassTeacherProfile() {
  const rawValue = await AsyncStorage.getItem(CLASS_TEACHER_PROFILE_KEY);

  if (!rawValue) {
    return {
      teacherName: DEFAULT_TEACHER_NAME,
      className: DEFAULT_CLASS_NAME,
    } satisfies ClassTeacherProfile;
  }

  try {
    const parsedValue = JSON.parse(rawValue) as Partial<ClassTeacherProfile>;

    return {
      teacherName: parsedValue.teacherName?.trim() || DEFAULT_TEACHER_NAME,
      className: parsedValue.className?.trim() || DEFAULT_CLASS_NAME,
    } satisfies ClassTeacherProfile;
  } catch {
    return {
      teacherName: DEFAULT_TEACHER_NAME,
      className: DEFAULT_CLASS_NAME,
    } satisfies ClassTeacherProfile;
  }
}

export async function saveClassTeacherProfile(profile: ClassTeacherProfile) {
  await AsyncStorage.setItem(
    CLASS_TEACHER_PROFILE_KEY,
    JSON.stringify(profile),
  );
}
