import { Feather } from "@expo/vector-icons";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AdminGradeRecord,
  AdminSubjectRecord,
  AdminUserRecord,
  changeAdminUserPassword,
  createAdminStudent,
  createAdminTeacher,
  deleteAdminUser,
  getAdminGradeSubjects,
  getAdminGrades,
  getAdminUserDetails,
  getAdminUsers,
  updateAdminStudent,
  updateAdminTeacher,
} from "../lib/adminUsers";

type FilterKey = "all" | "student" | "teacher";

type ModalMode =
  | "create-student"
  | "edit-student"
  | "create-teacher"
  | "edit-teacher";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "student", label: "Students" },
  { key: "teacher", label: "Teachers" },
];

function safeArray<T>(value: T[] | undefined | null) {
  return Array.isArray(value) ? value : [];
}

function extractTeacherRoleFlags(user: AdminUserRecord) {
  const roleTokens = user.teacherRoles.map((role) => role.toLowerCase());
  return {
    classTeacher:
      roleTokens.some((role) => role.includes("class")) ||
      user.raw?.teacher_status === 1 ||
      user.raw?.teacher_status === "1",
    subjectTeacher:
      roleTokens.some((role) => role.includes("subject")) ||
      user.raw?.teacher_status === 0 ||
      user.raw?.teacher_status === "0",
  };
}

function badgeTone(role: string) {
  const normalized = role.toLowerCase();

  if (normalized.includes("student")) {
    return "bg-[#ecfdf3] text-[#027a48] border-[#abefc6]";
  }

  if (normalized.includes("teacher")) {
    return "bg-[#fceeed] text-[#8f140e] border-[#f5c3bd]";
  }

  if (normalized.includes("admin")) {
    return "bg-[#eff6ff] text-[#1d4ed8] border-[#bfdbfe]";
  }

  return "bg-[#f3efeb] text-[#6f5f5a] border-[#e6ded8]";
}

function normalizeSearchText(value: string) {
  return value.trim().toLowerCase();
}

export default function AdminUserManagement() {
  const [users, setUsers] = useState<AdminUserRecord[]>([]);
  const [grades, setGrades] = useState<AdminGradeRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterKey, setFilterKey] = useState<FilterKey>("all");
  const [activeUser, setActiveUser] = useState<AdminUserRecord | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode | null>(null);
  const [passwordTarget, setPasswordTarget] = useState<AdminUserRecord | null>(
    null,
  );
  const [refreshing, setRefreshing] = useState(false);

  const loadInitialData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [userRecords, gradeRecords] = await Promise.all([
        getAdminUsers(),
        getAdminGrades(),
      ]);

      setUsers(userRecords);
      setGrades(gradeRecords);
    } catch (err: any) {
      setError(err?.message ?? "Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  const filteredUsers = useMemo(() => {
    const query = normalizeSearchText(searchQuery);

    return users.filter((user) => {
      const isStudent = user.role.includes("student");
      const isTeacher = user.role.includes("teacher");
      const teacherFlags = extractTeacherRoleFlags(user);

      const matchesFilter = (() => {
        if (filterKey === "all") return true;
        if (filterKey === "student") return isStudent;
        if (filterKey === "teacher") return isTeacher;
        return true;
      })();

      if (!matchesFilter) return false;
      if (!query) return true;

      const searchable = [
        user.name,
        user.username,
        user.role,
        user.gradeName,
        user.subjectNames.join(" "),
        user.classAssignments.join(" "),
        user.teacherRoles.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      return searchable.includes(query);
    });
  }, [filterKey, searchQuery, users]);

  const counts = useMemo(() => {
    const studentCount = users.filter((user) =>
      user.role.includes("student"),
    ).length;
    const teacherCount = users.filter((user) =>
      user.role.includes("teacher"),
    ).length;

    return {
      total: users.length,
      students: studentCount,
      teachers: teacherCount,
    };
  }, [users]);

  const openUserDetails = async (user: AdminUserRecord) => {
    setDetailsLoading(true);
    setActiveUser(user);

    try {
      const details = await getAdminUserDetails(user.id);
      setActiveUser(details);
    } catch {
      setActiveUser(user);
    } finally {
      setDetailsLoading(false);
    }
  };

  const refreshList = async () => {
    setRefreshing(true);
    try {
      const userRecords = await getAdminUsers();
      setUsers(userRecords);
    } catch (err: any) {
      Alert.alert(
        "Refresh failed",
        err?.message ?? "Unable to refresh the user list.",
      );
    } finally {
      setRefreshing(false);
    }
  };

  const openCreateStudent = () => setModalMode("create-student");
  const openCreateTeacher = () => setModalMode("create-teacher");

  const openEditUser = (user: AdminUserRecord) => {
    if (user.role.includes("student")) {
      setActiveUser(user);
      setModalMode("edit-student");
      return;
    }

    if (user.role.includes("teacher")) {
      setActiveUser(user);
      setModalMode("edit-teacher");
    }
  };

  const openPasswordModal = (user: AdminUserRecord) => {
    setPasswordTarget(user);
  };

  const handleDelete = async (user: AdminUserRecord) => {
    Alert.alert(
      "Delete User",
      `Delete ${user.name}? This action cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteAdminUser(user.id, user.role);
              setUsers((currentUsers) =>
                currentUsers.filter((item) => item.id !== user.id),
              );
              setActiveUser(null);
              Alert.alert("Deleted", "The user was deleted successfully.");
            } catch (err: any) {
              Alert.alert(
                "Delete unavailable",
                err?.message ?? "Delete is not supported for this user.",
              );
            }
          },
        },
      ],
    );
  };

  const closeAllModals = () => {
    setActiveUser(null);
    setModalMode(null);
    setPasswordTarget(null);
  };

  return (
    <SafeAreaView
      className="flex-1 bg-[#efeae4]"
      edges={["top", "left", "right"]}
    >
      <View className="flex-1">
        <ScrollView
          className="flex-1 px-4"
          contentContainerStyle={{ paddingBottom: 128 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="mt-3 mb-5">
            <Text className="text-3xl font-bold text-[#8f140e]">
              User Management
            </Text>
            <Text className="mt-1 text-zinc-600 text-sm leading-relaxed font-medium">
              Manage students, teachers, profiles, assignments, and account
              access.
            </Text>
          </View>

          <View className="flex-row gap-3 mb-4">
            <SummaryCard label="Users" value={counts.total} />
            <SummaryCard label="Students" value={counts.students} />
            <SummaryCard label="Teachers" value={counts.teachers} />
          </View>

          <View className="flex-row flex-wrap gap-2 mb-4">
            {FILTERS.map((filter) => {
              const active = filter.key === filterKey;
              return (
                <Pressable
                  key={filter.key}
                  onPress={() => setFilterKey(filter.key)}
                  className={`rounded-full border px-4 py-2 ${
                    active
                      ? "bg-[#8f140e] border-[#8f140e]"
                      : "bg-white border-zinc-200"
                  }`}
                >
                  <Text
                    className={`text-xs font-bold ${active ? "text-white" : "text-zinc-600"}`}
                  >
                    {filter.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View className="flex-row items-center gap-3 mb-3">
            <View className="flex-1 flex-row items-center bg-white rounded-full px-4 py-3 border border-zinc-200/60 shadow-sm">
              <Feather name="search" size={18} color="#888" />
              <TextInput
                placeholder="Search by name, username, class, subject..."
                placeholderTextColor="#999"
                className="flex-1 text-sm text-zinc-800 ml-2 font-medium"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            <TouchableOpacity
              onPress={refreshList}
              className="h-12 w-12 items-center justify-center rounded-full bg-white border border-zinc-200 shadow-sm"
            >
              {refreshing ? (
                <ActivityIndicator size="small" color="#8f140e" />
              ) : (
                <Feather name="refresh-cw" size={18} color="#8f140e" />
              )}
            </TouchableOpacity>
          </View>

          <View className="flex-row gap-3 mb-6">
            <Pressable
              onPress={openCreateStudent}
              className="flex-1 bg-[#8f140e] py-3.5 rounded-2xl items-center justify-center shadow-sm active:opacity-90"
            >
              <Text className="text-white font-bold text-sm">Add Student</Text>
            </Pressable>
            <Pressable
              onPress={openCreateTeacher}
              className="flex-1 bg-zinc-900 py-3.5 rounded-2xl items-center justify-center shadow-sm active:opacity-90"
            >
              <Text className="text-white font-bold text-sm">Add Teacher</Text>
            </Pressable>
          </View>

          {loading ? (
            <View className="py-20 items-center justify-center">
              <ActivityIndicator size="large" color="#8f140e" />
              <Text className="mt-3 text-zinc-500 text-sm">
                Loading users...
              </Text>
            </View>
          ) : error ? (
            <View className="bg-white rounded-[28px] p-6 shadow-sm border border-zinc-100">
              <Text className="text-[#8f140e] font-bold text-base mb-2">
                Unable to load users
              </Text>
              <Text className="text-zinc-600 text-sm leading-relaxed">
                {error}
              </Text>
              <Pressable
                onPress={loadInitialData}
                className="mt-4 self-start rounded-full bg-[#8f140e] px-4 py-3"
              >
                <Text className="text-white font-bold text-sm">Try Again</Text>
              </Pressable>
            </View>
          ) : filteredUsers.length === 0 ? (
            <View className="bg-white rounded-[28px] p-8 shadow-sm border border-zinc-100 items-center justify-center">
              <Feather name="users" size={28} color="#8f140e" />
              <Text className="mt-3 text-base font-bold text-zinc-900">
                No users found
              </Text>
              <Text className="mt-1 text-sm text-zinc-500 text-center">
                Adjust the filters or create a new account.
              </Text>
            </View>
          ) : (
            <View className="gap-4">
              {filteredUsers.map((user) => {
                const teacherFlags = extractTeacherRoleFlags(user);
                return (
                  <View
                    key={user.id}
                    className="bg-white rounded-[28px] p-5 shadow-sm border border-zinc-100"
                  >
                    <View className="flex-row items-start gap-4">
                      <View className="h-14 w-14 rounded-2xl bg-[#fceeed] items-center justify-center border border-[#f5c3bd]">
                        <Feather
                          name={
                            user.role.includes("teacher") ? "briefcase" : "user"
                          }
                          size={22}
                          color="#8f140e"
                        />
                      </View>

                      <View className="flex-1 pr-2">
                        <View className="flex-row items-center justify-between gap-2">
                          <Text
                            className="text-base font-bold text-zinc-900 flex-1"
                            numberOfLines={1}
                          >
                            {user.name}
                          </Text>
                          <View
                            className={`px-3 py-1 rounded-full border ${badgeTone(user.role)}`}
                          >
                            <Text className="text-[10px] font-bold uppercase tracking-wide">
                              {user.role}
                            </Text>
                          </View>
                        </View>
                        <Text className="text-xs text-zinc-500 mt-0.5">
                          @{user.username}
                        </Text>
                        {user.gradeName ? (
                          <Text
                            className="text-xs font-semibold text-zinc-700 mt-2"
                            numberOfLines={1}
                          >
                            Class: {user.gradeName}
                          </Text>
                        ) : null}
                        {user.subjectNames.length > 0 ? (
                          <Text
                            className="text-xs text-zinc-500 mt-1"
                            numberOfLines={2}
                          >
                            Subjects: {user.subjectNames.join(", ")}
                          </Text>
                        ) : null}
                        {user.teacherRoles.length > 0 ? (
                          <Text
                            className="text-xs text-zinc-500 mt-1"
                            numberOfLines={2}
                          >
                            Roles: {user.teacherRoles.join(", ")}
                          </Text>
                        ) : null}
                        {teacherFlags.classTeacher &&
                        user.classAssignments.length > 0 ? (
                          <Text
                            className="text-xs text-zinc-500 mt-1"
                            numberOfLines={2}
                          >
                            Class assignment: {user.classAssignments.join(", ")}
                          </Text>
                        ) : null}
                      </View>
                    </View>

                    <View className="mt-4 flex-row flex-wrap gap-2">
                      <ActionChip
                        label="Details"
                        icon="eye"
                        onPress={() => openUserDetails(user)}
                      />
                      <ActionChip
                        label="Edit"
                        icon="edit-2"
                        onPress={() => openEditUser(user)}
                      />
                      <ActionChip
                        label="Password"
                        icon="key"
                        onPress={() => openPasswordModal(user)}
                      />
                      <ActionChip
                        label="Delete"
                        icon="trash-2"
                        danger
                        onPress={() => handleDelete(user)}
                      />
                    </View>
                  </View>
                );
              })}
            </View>
          )}
        </ScrollView>
      </View>

      <UserDetailsModal
        visible={!!activeUser && !modalMode && !passwordTarget}
        user={activeUser}
        loading={detailsLoading}
        onClose={() => setActiveUser(null)}
        onEdit={() => activeUser && openEditUser(activeUser)}
        onPassword={() => activeUser && openPasswordModal(activeUser)}
        onDelete={() => activeUser && handleDelete(activeUser)}
      />

      <StudentFormModal
        visible={modalMode === "create-student" || modalMode === "edit-student"}
        grades={grades}
        mode={modalMode === "edit-student" ? "edit" : "create"}
        initialUser={modalMode === "edit-student" ? activeUser : null}
        onClose={closeAllModals}
        onSaved={async () => {
          closeAllModals();
          await loadInitialData();
        }}
      />

      <TeacherFormModal
        visible={modalMode === "create-teacher" || modalMode === "edit-teacher"}
        grades={grades}
        mode={modalMode === "edit-teacher" ? "edit" : "create"}
        initialUser={modalMode === "edit-teacher" ? activeUser : null}
        onClose={closeAllModals}
        onSaved={async () => {
          closeAllModals();
          await loadInitialData();
        }}
      />

      <PasswordModal
        visible={!!passwordTarget}
        user={passwordTarget}
        onClose={() => setPasswordTarget(null)}
        onSaved={async () => {
          setPasswordTarget(null);
          await loadInitialData();
        }}
      />
    </SafeAreaView>
  );
}

function SummaryCard({ label, value }: { label: string; value: number }) {
  return (
    <View className="flex-1 bg-white rounded-3xl p-4 border border-zinc-100 shadow-sm">
      <Text className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
        {label}
      </Text>
      <Text className="text-2xl font-black text-[#8f140e] mt-3">{value}</Text>
    </View>
  );
}

function ActionChip({
  label,
  icon,
  onPress,
  danger = false,
}: {
  label: string;
  icon: keyof typeof Feather.glyphMap;
  onPress: () => void;
  danger?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center rounded-full border px-3.5 py-2 ${
        danger ? "bg-red-50 border-red-200" : "bg-[#f7f5f2] border-zinc-200"
      }`}
    >
      <Feather name={icon} size={13} color={danger ? "#b42318" : "#6f5f5a"} />
      <Text
        className={`ml-1.5 text-[11px] font-bold ${danger ? "text-[#b42318]" : "text-[#6f5f5a]"}`}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <Text className="mt-1.5 text-[11px] font-medium text-[#b42318]">
      {message}
    </Text>
  );
}

function FormLabel({ children }: { children: string }) {
  return (
    <Text className="mb-2 text-[11px] font-bold uppercase tracking-[2px] text-[#8e847f]">
      {children}
    </Text>
  );
}

function FormInput({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
}: {
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "number-pad" | "phone-pad";
}) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#a5928a"
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      className="h-12 rounded-2xl bg-[#f7f5f2] px-4 text-[14px] text-[#212121]"
    />
  );
}

function PickerButton({
  value,
  placeholder,
  onPress,
}: {
  value?: string;
  placeholder: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="h-12 flex-row items-center justify-between rounded-2xl bg-[#f7f5f2] px-4"
    >
      <Text
        className={`text-[14px] ${value ? "text-[#212121] font-semibold" : "text-[#9c8b84]"}`}
        numberOfLines={1}
      >
        {value ?? placeholder}
      </Text>
      <Feather name="chevron-down" size={18} color="#8e847f" />
    </Pressable>
  );
}

function CheckboxRow({
  checked,
  label,
  onPress,
  subtitle,
}: {
  checked: boolean;
  label: string;
  onPress: () => void;
  subtitle?: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center justify-between rounded-2xl border border-zinc-200 bg-white px-4 py-3"
    >
      <View className="flex-1 pr-3">
        <Text
          className="text-[14px] font-semibold text-[#212121]"
          numberOfLines={1}
        >
          {label}
        </Text>
        {subtitle ? (
          <Text className="mt-0.5 text-[11px] text-zinc-500">{subtitle}</Text>
        ) : null}
      </View>
      <View
        className={`h-5 w-5 rounded-[6px] items-center justify-center ${checked ? "bg-[#8f140e]" : "bg-white border border-zinc-300"}`}
      >
        {checked ? <Feather name="check" size={13} color="#fff" /> : null}
      </View>
    </Pressable>
  );
}

function ModalShell({
  visible,
  title,
  onClose,
  children,
  footer,
}: {
  visible: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const scrollViewRef = useRef<ScrollView | null>(null);

  useEffect(() => {
    if (!visible) return;

    const timer = setTimeout(() => {
      scrollViewRef.current?.scrollTo({ y: 0, animated: false });
    }, 0);

    return () => clearTimeout(timer);
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/40 justify-end">
        <Pressable className="flex-1" onPress={onClose} />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View className="bg-[#efeae4] rounded-t-[32px] px-5 pt-5 pb-6 max-h-[92%] flex-1 overflow-hidden">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-[22px] font-extrabold text-[#212121]">
                {title}
              </Text>
              <Pressable
                onPress={onClose}
                className="h-9 w-9 rounded-full bg-white items-center justify-center"
              >
                <Feather name="x" size={18} color="#8f140e" />
              </Pressable>
            </View>
            <ScrollView
              ref={scrollViewRef}
              className="flex-1"
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              nestedScrollEnabled
              contentContainerStyle={{
                paddingBottom: footer ? 32 : 24,
              }}
            >
              {children}
            </ScrollView>
            {footer ? <View className="pt-4 shrink-0">{footer}</View> : null}
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

function UserDetailsModal({
  visible,
  user,
  loading,
  onClose,
  onEdit,
  onPassword,
  onDelete,
}: {
  visible: boolean;
  user: AdminUserRecord | null;
  loading: boolean;
  onClose: () => void;
  onEdit: () => void;
  onPassword: () => void;
  onDelete: () => void;
}) {
  if (!user) return null;

  const isStudent = user.role.includes("student");
  const isTeacher = user.role.includes("teacher");

  return (
    <ModalShell
      visible={visible && !!user}
      title="User Details"
      onClose={onClose}
    >
      {loading ? (
        <View className="py-12 items-center justify-center">
          <ActivityIndicator size="large" color="#8f140e" />
        </View>
      ) : (
        <View className="gap-4">
          <View className="bg-white rounded-[28px] p-5 shadow-sm border border-zinc-100">
            <Text className="text-[11px] font-bold uppercase tracking-[2px] text-zinc-400">
              Personal Information
            </Text>
            <DetailRow label="Full Name" value={user.name} />
            <DetailRow label="Username" value={user.username} />
            {user.email ? <DetailRow label="Email" value={user.email} /> : null}
            {user.phone ? <DetailRow label="Phone" value={user.phone} /> : null}
            <DetailRow label="Role" value={user.role} noBorder />
          </View>

          {isStudent ? (
            <View className="bg-white rounded-[28px] p-5 shadow-sm border border-zinc-100">
              <Text className="text-[11px] font-bold uppercase tracking-[2px] text-zinc-400">
                Student Assignment
              </Text>
              <DetailRow
                label="Class"
                value={user.gradeName || "Not assigned"}
              />
              <View>
                <Text className="text-[12px] font-bold uppercase tracking-[1.5px] text-zinc-500 mb-2">
                  Subjects
                </Text>
                <View className="flex-row flex-wrap gap-2">
                  {safeArray(user.subjectNames).length > 0 ? (
                    Array.from(new Set(safeArray(user.subjectNames))).map((subject) => (
                      <View
                        key={subject}
                        className="rounded-full bg-[#fceeed] px-3 py-2 border border-[#f5c3bd]"
                      >
                        <Text className="text-[11px] font-bold text-[#8f140e]">
                          {subject}
                        </Text>
                      </View>
                    ))
                  ) : (
                    <Text className="text-sm text-zinc-500">
                      No subjects assigned.
                    </Text>
                  )}
                </View>
              </View>
            </View>
          ) : null}

          {isTeacher ? (
            <View className="bg-white rounded-[28px] p-5 shadow-sm border border-zinc-100">
              <Text className="text-[11px] font-bold uppercase tracking-[2px] text-zinc-400">
                Teacher Assignments
              </Text>
              <DetailRow
                label="Teacher Roles"
                value={
                  user.teacherRoles.length > 0
                    ? user.teacherRoles.join(", ")
                    : "Not assigned"
                }
              />
              <DetailRow
                label="Class Teacher"
                value={
                  user.classAssignments.length > 0
                    ? user.classAssignments.join(", ")
                    : "None"
                }
              />
              <View>
                <Text className="text-[12px] font-bold uppercase tracking-[1.5px] text-zinc-500 mb-2">
                  Subject Teacher
                </Text>
                {user.subjectAssignments.length > 0 ? (
                  <View className="gap-2">
                    {user.subjectAssignments.map((assignment) => (
                      <View
                        key={`${assignment.subjectId}-${assignment.subjectName}`}
                        className="rounded-2xl bg-[#f7f5f2] p-3 border border-zinc-200"
                      >
                        <Text className="text-[13px] font-bold text-[#212121]">
                          {assignment.subjectName || "Subject"}
                        </Text>
                        <Text className="mt-1 text-[11px] text-zinc-500">
                          Classes:{" "}
                          {assignment.classNames.length > 0
                            ? assignment.classNames.join(", ")
                            : assignment.classIds.join(", ") || "None"}
                        </Text>
                      </View>
                    ))}
                  </View>
                ) : (
                  <Text className="text-sm text-zinc-500">
                    No subject assignments.
                  </Text>
                )}
              </View>
            </View>
          ) : null}

          <View className="flex-row flex-wrap gap-2">
            <ActionChip
              label="Manage Assignments"
              icon="layers"
              onPress={onEdit}
            />
            <ActionChip
              label="Change Password"
              icon="key"
              onPress={onPassword}
            />
            <ActionChip
              label="Delete"
              icon="trash-2"
              danger
              onPress={onDelete}
            />
          </View>
        </View>
      )}
    </ModalShell>
  );
}

function DetailRow({
  label,
  value,
  noBorder = false,
}: {
  label: string;
  value: string;
  noBorder?: boolean;
}) {
  return (
    <View className={`py-3 ${!noBorder ? "border-b border-zinc-100" : ""}`}>
      <Text className="text-[11px] font-bold uppercase tracking-[1.5px] text-zinc-400">
        {label}
      </Text>
      <Text className="mt-1 text-[14px] font-semibold text-[#212121]">
        {value}
      </Text>
    </View>
  );
}

function StudentFormModal({
  visible,
  mode,
  grades,
  initialUser,
  onClose,
  onSaved,
}: {
  visible: boolean;
  mode: "create" | "edit";
  grades: AdminGradeRecord[];
  initialUser: AdminUserRecord | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedGradeId, setSelectedGradeId] = useState("");
  const [availableSubjects, setAvailableSubjects] = useState<
    AdminSubjectRecord[]
  >([]);
  const [selectedSubjectIds, setSelectedSubjectIds] = useState<string[]>([]);
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [saving, setSaving] = useState(false);
  const [subjectError, setSubjectError] = useState<string | null>(null);
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [showGradePicker, setShowGradePicker] = useState(false);

  useEffect(() => {
    if (!visible) return;

    const user = initialUser;
    setFullName(user?.name ?? "");
    setUsername(user?.username ?? "");
    setPassword("");
    setSelectedGradeId(user?.gradeId ?? "");
    setSelectedSubjectIds(safeArray(user?.subjectIds));
    setAvailableSubjects([]);
    setSubjectError(null);
    setFieldError(null);
  }, [initialUser, visible]);

  useEffect(() => {
    if (!visible || !selectedGradeId) return;

    let active = true;
    const load = async () => {
      setLoadingSubjects(true);
      setSubjectError(null);
      try {
        const subjects = await getAdminGradeSubjects(selectedGradeId);
        if (!active) return;
        setAvailableSubjects(subjects);

        setSelectedSubjectIds((current) => {
          if (current.length > 0) {
            const allowedIds = new Set(subjects.map((subject) => subject.id));
            const next = current.filter((subjectId) =>
              allowedIds.has(subjectId),
            );
            return next.length > 0 ? next : current;
          }
          return current;
        });
      } catch (err: any) {
        if (active) {
          setSubjectError(
            err?.message ?? "Failed to load subjects for the selected class.",
          );
        }
      } finally {
        if (active) {
          setLoadingSubjects(false);
        }
      }
    };

    load();

    return () => {
      active = false;
    };
  }, [selectedGradeId, visible]);

  const selectedGradeName =
    grades.find((grade) => grade.id === selectedGradeId)?.name ?? "";

  const toggleSubject = (subjectId: string) => {
    setSelectedSubjectIds((current) =>
      current.includes(subjectId)
        ? current.filter((item) => item !== subjectId)
        : [...current, subjectId],
    );
  };

  const submit = async () => {
    const trimmedName = fullName.trim();
    const trimmedRegNo = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedName || !trimmedRegNo || !selectedGradeId) {
      setFieldError("Full name, registration number, and class are required.");
      return;
    }

    if (mode === "create" && !trimmedPassword) {
      setFieldError("Password is required for new students.");
      return;
    }

    const payload: Record<string, any> = {
      full_name: trimmedName,
      name: trimmedName,
      reg_no: trimmedRegNo,
      grade_id: selectedGradeId,
      class_id: selectedGradeId,
      class_name: selectedGradeName,
      subject_ids: selectedSubjectIds,
      subject_names: availableSubjects
        .filter((subject) => selectedSubjectIds.includes(subject.id))
        .map((subject) => subject.name),
    };

    if (trimmedPassword) {
      payload.password = trimmedPassword;
    }

    setSaving(true);
    setFieldError(null);

    try {
      if (mode === "create") {
        await createAdminStudent(payload);
      } else if (initialUser?.id) {
        await updateAdminStudent(initialUser.id, payload);
      }
      onSaved();
    } catch (err: any) {
      setFieldError(err?.message ?? "Unable to save student.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <ModalShell
      visible={visible}
      title={mode === "create" ? "Add Student" : "Edit Student"}
      onClose={onClose}
      footer={
        <Pressable
          onPress={submit}
          disabled={saving}
          className="h-14 items-center justify-center rounded-full bg-[#8f140e] shadow-lg shadow-[#8f140e]/30"
          style={{ opacity: saving ? 0.7 : 1 }}
        >
          {saving ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-[16px] font-bold text-white">
              {mode === "create" ? "Create Student" : "Save Changes"}
            </Text>
          )}
        </Pressable>
      }
    >
      <View className="gap-4 pb-2">
        {fieldError ? (
          <View className="rounded-2xl bg-red-50 px-4 py-3">
            <Text className="text-sm font-semibold text-[#b42318]">
              {fieldError}
            </Text>
          </View>
        ) : null}
        <View className="bg-white rounded-[28px] p-4 shadow-sm border border-zinc-100 gap-4">
          <View>
            <FormLabel>Full Name</FormLabel>
            <FormInput
              value={fullName}
              onChangeText={setFullName}
              placeholder="Enter full name"
            />
          </View>
          <View>
            <FormLabel>Username</FormLabel>
            <FormInput
              value={username}
              onChangeText={setUsername}
              placeholder="Enter username"
            />
          </View>
          <View>
            <FormLabel>
              {mode === "create" ? "Password" : "New Password"}
            </FormLabel>
            <FormInput
              value={password}
              onChangeText={setPassword}
              placeholder={
                mode === "create"
                  ? "Enter password"
                  : "Leave blank to keep current password"
              }
              secureTextEntry
            />
          </View>
          <View>
            <FormLabel>Class</FormLabel>
            <PickerButton
              value={selectedGradeName || undefined}
              placeholder="Select class"
              onPress={() => setShowGradePicker(true)}
            />
          </View>
        </View>

        <View className="bg-white rounded-[28px] p-4 shadow-sm border border-zinc-100 gap-3">
          <View className="flex-row items-center justify-between">
            <FormLabel>Subjects</FormLabel>
            {loadingSubjects ? (
              <ActivityIndicator size="small" color="#8f140e" />
            ) : null}
          </View>
          {subjectError ? <FieldError message={subjectError} /> : null}
          {!selectedGradeId ? (
            <Text className="text-sm text-zinc-500">
              Select a class to load available subjects.
            </Text>
          ) : availableSubjects.length === 0 && !loadingSubjects ? (
            <Text className="text-sm text-zinc-500">
              No subjects found for this class.
            </Text>
          ) : null}
          <View className="gap-2">
            {availableSubjects.map((subject) => (
              <CheckboxRow
                key={subject.id}
                checked={selectedSubjectIds.includes(subject.id)}
                label={subject.name}
                subtitle={subject.code || undefined}
                onPress={() => toggleSubject(subject.id)}
              />
            ))}
          </View>
        </View>
      </View>

      <ModalShell
        visible={showGradePicker}
        title="Select Class"
        onClose={() => setShowGradePicker(false)}
      >
        <View className="gap-2 pb-4">
          {grades.map((grade) => (
            <Pressable
              key={grade.id}
              onPress={() => {
                setSelectedGradeId(grade.id);
                setSelectedSubjectIds([]);
                setAvailableSubjects([]);
                setShowGradePicker(false);
              }}
              className="rounded-2xl bg-white px-4 py-3 border border-zinc-200"
            >
              <Text
                className={`text-[14px] font-semibold ${selectedGradeId === grade.id ? "text-[#8f140e]" : "text-[#212121]"}`}
              >
                {grade.name}
              </Text>
            </Pressable>
          ))}
        </View>
      </ModalShell>
    </ModalShell>
  );
}

function TeacherFormModal({
  visible,
  mode,
  grades,
  initialUser,
  onClose,
  onSaved,
}: {
  visible: boolean;
  mode: "create" | "edit";
  grades: AdminGradeRecord[];
  initialUser: AdminUserRecord | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [classTeacher, setClassTeacher] = useState(false);
  const [subjectTeacher, setSubjectTeacher] = useState(false);
  const [classTeacherGradeId, setClassTeacherGradeId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [subjectClassIds, setSubjectClassIds] = useState<string[]>([]);
  const [subjectCatalog, setSubjectCatalog] = useState<AdminSubjectRecord[]>(
    [],
  );
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showClassPicker, setShowClassPicker] = useState(false);
  const [showSubjectPicker, setShowSubjectPicker] = useState(false);
  const [fieldError, setFieldError] = useState<string | null>(null);

  useEffect(() => {
    if (!visible) return;

    const user = initialUser;
    const flags = user
      ? extractTeacherRoleFlags(user)
      : { classTeacher: false, subjectTeacher: false };
    setFullName(user?.name ?? "");
    setUsername(user?.username ?? "");
    setEmail(user?.email ?? "");
    setPassword("");
    setClassTeacher(
      flags.classTeacher ||
        user?.teacherRoles?.some((role) =>
          role.toLowerCase().includes("class"),
        ) ||
        false,
    );
    setSubjectTeacher(
      flags.subjectTeacher ||
        user?.teacherRoles?.some((role) =>
          role.toLowerCase().includes("subject"),
        ) ||
        false,
    );
    setClassTeacherGradeId(user?.classAssignments[0] ?? user?.gradeId ?? "");
    setSubjectId(
      user?.subjectAssignments?.[0]?.subjectId ?? user?.subjectIds?.[0] ?? "",
    );
    setSubjectClassIds(user?.subjectAssignments?.[0]?.classIds ?? []);
    setSubjectCatalog([]);
    setFieldError(null);
  }, [initialUser, visible]);

  useEffect(() => {
    if (!visible || !subjectTeacher || grades.length === 0) return;

    let active = true;

    const loadSubjects = async () => {
      setLoadingSubjects(true);
      try {
        const results = await Promise.all(
          grades.map(async (grade) => {
            try {
              return await getAdminGradeSubjects(grade.id);
            } catch {
              return [] as AdminSubjectRecord[];
            }
          }),
        );

        if (!active) return;

        const unique = new Map<string, AdminSubjectRecord>();
        results.flat().forEach((subject) => {
          const key = `${subject.name.toLowerCase()}-${subject.code.toLowerCase()}`;
          if (!unique.has(key)) {
            unique.set(key, subject);
          }
        });

        setSubjectCatalog(
          Array.from(unique.values()).sort((left, right) =>
            left.name.localeCompare(right.name),
          ),
        );
      } finally {
        if (active) {
          setLoadingSubjects(false);
        }
      }
    };

    loadSubjects();

    return () => {
      active = false;
    };
  }, [grades, subjectTeacher, visible]);

  const selectedSubjectName =
    subjectCatalog.find((subject) => subject.id === subjectId)?.name ?? "";
  const classTeacherName =
    grades.find((grade) => grade.id === classTeacherGradeId)?.name ?? "";

  const toggleSubjectClass = (gradeId: string) => {
    setSubjectClassIds((current) =>
      current.includes(gradeId)
        ? current.filter((value) => value !== gradeId)
        : [...current, gradeId],
    );
  };

  const submit = async () => {
    const trimmedName = fullName.trim();
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedName || !trimmedUsername || !trimmedEmail) {
      setFieldError("Full name, username, and email are required.");
      return;
    }

    if (!emailPattern.test(trimmedEmail)) {
      setFieldError("Please enter a valid email address.");
      return;
    }

    if (!classTeacher && !subjectTeacher) {
      setFieldError("At least one teacher role must be selected.");
      return;
    }

    if (
      (mode === "create" || trimmedPassword) &&
      mode === "create" &&
      !trimmedPassword
    ) {
      setFieldError("Password is required for new teachers.");
      return;
    }

    if (classTeacher && !classTeacherGradeId) {
      setFieldError("Select a class for the class teacher role.");
      return;
    }

    if (subjectTeacher && !subjectId) {
      setFieldError("Select a subject for the subject teacher role.");
      return;
    }

    if (subjectTeacher && subjectClassIds.length === 0) {
      setFieldError("Select at least one class for the subject teacher role.");
      return;
    }

    const payload: Record<string, any> = {
      full_name: trimmedName,
      name: trimmedName,
      user_name: trimmedUsername,
      username: trimmedUsername,
      email: trimmedEmail,
      teacher_roles: [
        ...(classTeacher ? ["class_teacher"] : []),
        ...(subjectTeacher ? ["subject_teacher"] : []),
      ],
      is_class_teacher: classTeacher,
      is_subject_teacher: subjectTeacher,
      class_teacher_grade_id: classTeacher ? classTeacherGradeId : null,
      class_teacher_class_id: classTeacher ? classTeacherGradeId : null,
      class_id: classTeacher ? classTeacherGradeId : null,
      subject_teacher_subject_id: subjectTeacher ? subjectId : null,
      subject_teacher_class_ids: subjectTeacher ? subjectClassIds : [],
      subject_id: subjectTeacher ? subjectId : null,
      class_ids: subjectTeacher ? subjectClassIds : [],
      subject_assignments: subjectTeacher
        ? [
            {
              subject_id: subjectId,
              grade_ids: subjectClassIds,
            },
          ]
        : [],
      subject_teacher_class_names: subjectTeacher
        ? grades
            .filter((grade) => subjectClassIds.includes(grade.id))
            .map((grade) => grade.name)
        : [],
      class_teacher_class_name: classTeacher ? classTeacherName : null,
      subject_teacher_subject_name: subjectTeacher ? selectedSubjectName : null,
    };

    if (trimmedPassword) {
      payload.password = trimmedPassword;
    }

    setSaving(true);
    setFieldError(null);

    try {
      if (mode === "create") {
        await createAdminTeacher(payload);
      } else if (initialUser?.id) {
        await updateAdminTeacher(initialUser.id, payload);
      }
      onSaved();
    } catch (err: any) {
      setFieldError(err?.message ?? "Unable to save teacher.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <ModalShell
      visible={visible}
      title={mode === "create" ? "Add Teacher" : "Edit Teacher"}
      onClose={onClose}
      footer={
        <Pressable
          onPress={submit}
          disabled={saving}
          className="h-14 items-center justify-center rounded-full bg-[#8f140e] shadow-lg shadow-[#8f140e]/30"
          style={{ opacity: saving ? 0.7 : 1 }}
        >
          {saving ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-[16px] font-bold text-white">
              {mode === "create" ? "Create Teacher" : "Save Changes"}
            </Text>
          )}
        </Pressable>
      }
    >
      <View className="gap-4 pb-2">
        {fieldError ? (
          <View className="rounded-2xl bg-red-50 px-4 py-3">
            <Text className="text-sm font-semibold text-[#b42318]">
              {fieldError}
            </Text>
          </View>
        ) : null}

        <View className="bg-white rounded-[28px] p-4 shadow-sm border border-zinc-100 gap-4">
          <View>
            <FormLabel>Full Name</FormLabel>
            <FormInput
              value={fullName}
              onChangeText={setFullName}
              placeholder="Enter full name"
            />
          </View>
          <View>
            <FormLabel>Username</FormLabel>
            <FormInput
              value={username}
              onChangeText={setUsername}
              placeholder="Enter username"
            />
          </View>
          <View>
            <FormLabel>Email</FormLabel>
            <FormInput
              value={email}
              onChangeText={setEmail}
              placeholder="teacher@example.com"
              keyboardType="email-address"
            />
          </View>
          <View>
            <FormLabel>
              {mode === "create" ? "Password" : "New Password"}
            </FormLabel>
            <FormInput
              value={password}
              onChangeText={setPassword}
              placeholder={
                mode === "create"
                  ? "Enter password"
                  : "Leave blank to keep current password"
              }
              secureTextEntry
            />
          </View>
        </View>

        <View className="bg-white rounded-[28px] p-4 shadow-sm border border-zinc-100 gap-3">
          <Text className="text-[11px] font-bold uppercase tracking-[2px] text-[#8e847f]">
            Teacher Roles
          </Text>
          <CheckboxRow
            checked={classTeacher}
            label="Class Teacher"
            onPress={() => setClassTeacher((current) => !current)}
          />
          <CheckboxRow
            checked={subjectTeacher}
            label="Subject Teacher"
            onPress={() => setSubjectTeacher((current) => !current)}
          />
          <Text className="text-[12px] text-zinc-500">
            Select at least one role. Both roles can be active at the same time.
          </Text>
        </View>

        {classTeacher ? (
          <View className="bg-white rounded-[28px] p-4 shadow-sm border border-zinc-100 gap-3">
            <FormLabel>Class Teacher Assignment</FormLabel>
            <PickerButton
              value={classTeacherName || undefined}
              placeholder="Select one class"
              onPress={() => setShowClassPicker(true)}
            />
          </View>
        ) : null}

        {subjectTeacher ? (
          <View className="bg-white rounded-[28px] p-4 shadow-sm border border-zinc-100 gap-3">
            <View className="flex-row items-center justify-between">
              <FormLabel>Subject Teacher Assignment</FormLabel>
              {loadingSubjects ? (
                <ActivityIndicator size="small" color="#8f140e" />
              ) : null}
            </View>
            <PickerButton
              value={selectedSubjectName || undefined}
              placeholder="Select one subject"
              onPress={() => setShowSubjectPicker(true)}
            />
            <Text className="text-[12px] text-zinc-500">
              After choosing a subject, select the classes taught by this
              teacher.
            </Text>
            <View className="gap-2">
              {grades.map((grade) => (
                <CheckboxRow
                  key={grade.id}
                  checked={subjectClassIds.includes(grade.id)}
                  label={grade.name}
                  onPress={() => toggleSubjectClass(grade.id)}
                />
              ))}
            </View>
          </View>
        ) : null}
      </View>

      <ModalShell
        visible={showClassPicker}
        title="Select Class"
        onClose={() => setShowClassPicker(false)}
      >
        <View className="gap-2 pb-4">
          {grades.map((grade) => (
            <Pressable
              key={grade.id}
              onPress={() => {
                setClassTeacherGradeId(grade.id);
                setShowClassPicker(false);
              }}
              className="rounded-2xl bg-white px-4 py-3 border border-zinc-200"
            >
              <Text
                className={`text-[14px] font-semibold ${classTeacherGradeId === grade.id ? "text-[#8f140e]" : "text-[#212121]"}`}
              >
                {grade.name}
              </Text>
            </Pressable>
          ))}
        </View>
      </ModalShell>

      <ModalShell
        visible={showSubjectPicker}
        title="Select Subject"
        onClose={() => setShowSubjectPicker(false)}
      >
        <View className="gap-2 pb-4">
          {subjectCatalog.length === 0 ? (
            <View className="rounded-2xl bg-white p-4 border border-zinc-200">
              <Text className="text-sm text-zinc-500">
                No subjects available yet.
              </Text>
            </View>
          ) : null}
          {subjectCatalog.map((subject) => (
            <Pressable
              key={subject.id}
              onPress={() => {
                setSubjectId(subject.id);
                setShowSubjectPicker(false);
              }}
              className="rounded-2xl bg-white px-4 py-3 border border-zinc-200"
            >
              <Text
                className={`text-[14px] font-semibold ${subjectId === subject.id ? "text-[#8f140e]" : "text-[#212121]"}`}
              >
                {subject.name}
              </Text>
            </Pressable>
          ))}
        </View>
      </ModalShell>
    </ModalShell>
  );
}

function PasswordModal({
  visible,
  user,
  onClose,
  onSaved,
}: {
  visible: boolean;
  user: AdminUserRecord | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [fieldError, setFieldError] = useState<string | null>(null);

  useEffect(() => {
    if (!visible) return;
    setPassword("");
    setConfirmPassword("");
    setFieldError(null);
  }, [visible]);

  const submit = async () => {
    if (!user) return;
    if (!password.trim()) {
      setFieldError("New password is required.");
      return;
    }
    if (password !== confirmPassword) {
      setFieldError("Passwords do not match.");
      return;
    }

    setSaving(true);
    setFieldError(null);
    try {
      await changeAdminUserPassword(user.id, password.trim());
      onSaved();
    } catch (err: any) {
      setFieldError(err?.message ?? "Unable to change password.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <ModalShell
      visible={visible}
      title="Change Password"
      onClose={onClose}
      footer={
        <Pressable
          onPress={submit}
          disabled={saving}
          className="h-14 items-center justify-center rounded-full bg-zinc-900 shadow-lg shadow-black/20"
          style={{ opacity: saving ? 0.7 : 1 }}
        >
          {saving ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-[16px] font-bold text-white">
              Update Password
            </Text>
          )}
        </Pressable>
      }
    >
      <View className="gap-4 pb-2">
        <View className="bg-white rounded-[28px] p-4 shadow-sm border border-zinc-100 gap-4">
          <View>
            <FormLabel>User</FormLabel>
            <Text className="text-[14px] font-semibold text-[#212121]">
              {user?.name ?? "Unknown user"}
            </Text>
          </View>
          {fieldError ? (
            <View className="rounded-2xl bg-red-50 px-4 py-3">
              <Text className="text-sm font-semibold text-[#b42318]">
                {fieldError}
              </Text>
            </View>
          ) : null}
          <View>
            <FormLabel>New Password</FormLabel>
            <FormInput
              value={password}
              onChangeText={setPassword}
              placeholder="Enter new password"
              secureTextEntry
            />
          </View>
          <View>
            <FormLabel>Confirm Password</FormLabel>
            <FormInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm new password"
              secureTextEntry
            />
          </View>
        </View>
      </View>
    </ModalShell>
  );
}
