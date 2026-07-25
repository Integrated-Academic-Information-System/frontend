import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE = (process.env.EXPO_PUBLIC_API_URL ?? "").replace(/\/$/, "");
const ADMIN_API_BASE = `${API_BASE}/api`;

export interface AdminGradeRecord {
  id: string;
  name: string;
  code: string;
  raw: any;
}

export interface AdminSubjectRecord {
  id: string;
  name: string;
  code: string;
  raw: any;
}

export interface AdminUserRecord {
  id: string;
  name: string;
  username: string;
  role: string;
  status: string;
  gradeId: string;
  gradeName: string;
  subjectIds: string[];
  subjectNames: string[];
  teacherRoles: string[];
  classAssignments: string[];
  subjectAssignments: {
    subjectId: string;
    subjectName: string;
    classIds: string[];
    classNames: string[];
  }[];
  email: string;
  phone: string;
  raw: any;
}

export type AdminApiError = Error & {
  status?: number;
  data?: any;
};

function getAuthToken() {
  return AsyncStorage.getItem("authToken");
}

function buildHeaders(token?: string) {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

function getErrorMessage(payload: any, fallback: string) {
  if (!payload) return fallback;

  if (typeof payload === "string") {
    return payload;
  }

  if (payload.message) {
    return String(payload.message);
  }

  if (payload.error) {
    return String(payload.error);
  }

  if (payload.errors && typeof payload.errors === "object") {
    const firstError = Object.values(payload.errors)[0];
    if (Array.isArray(firstError) && firstError.length > 0) {
      return String(firstError[0]);
    }
    if (typeof firstError === "string") {
      return firstError;
    }
  }

  return fallback;
}

async function requestAdmin(path: string, options: RequestInit = {}) {
  const token = await getAuthToken();
  const response = await fetch(`${ADMIN_API_BASE}${path}`, {
    ...options,
    headers: {
      ...buildHeaders(token ?? undefined),
      ...(options.headers ?? {}),
    },
  });

  let payload: any = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const error = new Error(
      getErrorMessage(payload, `Request failed with status ${response.status}`),
    ) as AdminApiError;
    error.status = response.status;
    error.data = payload;
    throw error;
  }

  return payload;
}

function asArray(value: any): any[] {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.data)) return value.data;
  if (Array.isArray(value?.items)) return value.items;
  if (Array.isArray(value?.results)) return value.results;
  if (Array.isArray(value?.users)) return value.users;
  if (Array.isArray(value?.grades)) return value.grades;
  if (Array.isArray(value?.subjects)) return value.subjects;
  return [];
}

function toStringValue(value: any, fallback = "") {
  if (value === null || value === undefined) return fallback;
  return String(value);
}

function toStringArray(value: any): string[] {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === "string" || typeof item === "number") {
          return String(item);
        }
        return (
          item?.name ??
          item?.title ??
          item?.subject_name ??
          item?.class_name ??
          item?.grade_name ??
          item?.label ??
          ""
        );
      })
      .filter(Boolean);
  }

  if (typeof value === "string" || typeof value === "number") {
    return [String(value)];
  }

  return [];
}

function pickId(item: any) {
  return toStringValue(
    item?.id ??
      item?.user_id ??
      item?.student_id ??
      item?.teacher_id ??
      item?.uuid ??
      item?.userName ??
      item?.user_name ??
      item?.username ??
      item?.name,
  );
}

export function normalizeAdminGrade(item: any): AdminGradeRecord {
  return {
    id: pickId(item),
    name: toStringValue(
      item?.name ?? item?.grade_name ?? item?.class_name ?? item?.title,
      "Unknown Grade",
    ),
    code: toStringValue(item?.code ?? item?.grade_code ?? item?.class_code),
    raw: item,
  };
}

export function normalizeAdminSubject(item: any): AdminSubjectRecord {
  return {
    id: pickId(item),
    name: toStringValue(
      item?.name ?? item?.subject_name ?? item?.title,
      "Unknown Subject",
    ),
    code: toStringValue(item?.code ?? item?.subject_code),
    raw: item,
  };
}

export function normalizeAdminUser(item: any): AdminUserRecord {
  const teacherRoles = toStringArray(
    item?.teacher_roles ??
      item?.roles ??
      item?.role_names ??
      item?.assigned_roles,
  );

  const subjectAssignments = asArray(
    item?.subject_assignments ?? item?.assigned_subjects ?? item?.subjects,
  ).map((subject) => ({
    subjectId: toStringValue(
      subject?.id ?? subject?.subject_id ?? subject?.value,
    ),
    subjectName: toStringValue(
      subject?.name ?? subject?.subject_name ?? subject?.title,
    ),
    classIds: toStringArray(
      subject?.class_ids ?? subject?.classes ?? subject?.grade_ids,
    ),
    classNames: toStringArray(
      subject?.class_names ?? subject?.grade_names ?? subject?.class_list,
    ),
  }));

  return {
    id: pickId(item),
    name: toStringValue(
      item?.full_name ?? item?.name ?? item?.student_name ?? item?.teacher_name,
      "Unknown User",
    ),
    username: toStringValue(
      item?.username ?? item?.user_name ?? item?.login ?? item?.email,
    ),
    role: toStringValue(
      item?.role ??
        item?.user_role ??
        item?.account_type ??
        item?.type ??
        item?.kind,
      "user",
    ).toLowerCase(),
    status: toStringValue(
      item?.status ?? item?.active_status ?? item?.is_active ?? "active",
    ),
    gradeId: toStringValue(
      item?.grade_id ?? item?.class_id ?? item?.current_grade_id,
    ),
    gradeName: toStringValue(
      item?.grade_name ??
        item?.class_name ??
        item?.grade ??
        item?.class ??
        item?.current_grade,
    ),
    subjectIds: toStringArray(
      item?.subject_ids ?? item?.assigned_subject_ids ?? item?.subjectIdList,
    ),
    subjectNames: toStringArray(
      item?.subject_names ??
        item?.assigned_subject_names ??
        item?.subjectNameList,
    ),
    teacherRoles,
    classAssignments: toStringArray(
      item?.class_assignments ??
        item?.assigned_classes ??
        item?.class_names ??
        item?.grade_names,
    ),
    subjectAssignments,
    email: toStringValue(item?.email),
    phone: toStringValue(
      item?.mobile_number ?? item?.phone ?? item?.contact_number,
    ),
    raw: item,
  };
}

export async function getAdminUsers() {
  const payload = await requestAdmin("/admin/users");
  return asArray(payload).map(normalizeAdminUser);
}

export async function getAdminGrades() {
  const payload = await requestAdmin("/admin/grades");
  return asArray(payload).map(normalizeAdminGrade);
}

export async function getAdminGradeSubjects(gradeId: string) {
  const payload = await requestAdmin(
    `/admin/grades/${encodeURIComponent(gradeId)}/subjects`,
  );
  return asArray(payload).map(normalizeAdminSubject);
}

export async function getAdminUserDetails(userId: string) {
  const payload = await requestAdmin(
    `/admin/users/${encodeURIComponent(userId)}`,
  );
  const rawUser = Array.isArray(payload)
    ? payload[0]
    : (payload?.data ?? payload?.user ?? payload);
  return normalizeAdminUser(rawUser);
}

export async function createAdminStudent(payload: Record<string, any>) {
  return requestAdmin("/admin/students", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateAdminStudent(
  userId: string,
  payload: Record<string, any>,
) {
  return requestAdmin(`/admin/students/${encodeURIComponent(userId)}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function createAdminTeacher(payload: Record<string, any>) {
  return requestAdmin("/admin/teachers", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateAdminTeacher(
  userId: string,
  payload: Record<string, any>,
) {
  return requestAdmin(`/admin/teachers/${encodeURIComponent(userId)}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteAdminUser(userId: string) {
  return requestAdmin(`/admin/users/${encodeURIComponent(userId)}`, {
    method: "DELETE",
  });
}

export async function changeAdminUserPassword(
  userId: string,
  password: string,
) {
  return requestAdmin(`/admin/users/${encodeURIComponent(userId)}/password`, {
    method: "PUT",
    body: JSON.stringify({ password }),
  });
}

export async function exportMarksReport(params: Record<string, string>) {
  const query = new URLSearchParams(params).toString();
  const token = await getAuthToken();
  const response = await fetch(
    `${ADMIN_API_BASE}/reports/marks/export?${query}`,
    {
      method: "GET",
      headers: {
        ...buildHeaders(token ?? undefined),
      },
    },
  );

  if (!response.ok) {
    let payload: any = null;
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }

    const error = new Error(
      getErrorMessage(payload, `Export failed with status ${response.status}`),
    ) as AdminApiError;
    error.status = response.status;
    error.data = payload;
    throw error;
  }

  return response;
}
