// app/(student)/(tabs)/dashboard.tsx

// ─── Types ───────────────────────────────────────────────────────────────────

type QuickAction = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  iconLib: "feather" | "material" | "ionicons";
  route: string;
};

type PerformanceItem = {
  id: string;
  subject: string;
  course: string;
  score: number;
  total: number;
  color: string;
  bgColor: string;
  symbol: string;
};

type NotificationItem = {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
};

// ─── Static Data ─────────────────────────────────────────────────────────────

const QUICK_ACTIONS: QuickAction[] = [
  {
    id: "marks",
    title: "View Marks",
    subtitle: "Detailed breakdown of current semester performance.",
    icon: "star",
    iconLib: "feather",
    route: "/(student)/(tabs)/marks",
  },
  {
    id: "profile",
    title: "My Profile",
    subtitle: "Manage your student credentials and preferences.",
    icon: "account-circle-outline",
    iconLib: "material",
    route: "/(student)/(tabs)/profile",
  },
  {
    id: "schedule",
    title: "Class Schedule",
    subtitle: "Check upcoming lectures, labs, and workshops.",
    icon: "calendar",
    iconLib: "feather",
    route: "/(student)/(tabs)/latest-results",
  },
];

const PERFORMANCE: PerformanceItem[] = [
  {
    id: "math",
    subject: "Mathematics",
    course: "Advanced Calculus II",
    score: 95,
    total: 100,
    color: "#1a73e8",
    bgColor: "#e8f0fe",
    symbol: "Σ",
  },
  {
    id: "chem",
    subject: "Chemistry",
    course: "Organic Chemistry Lab",
    score: 91,
    total: 100,
    color: "#d93025",
    bgColor: "#fce8e6",
    symbol: "⚗",
  },
  {
    id: "phys",
    subject: "Physics",
    course: "Quantum Mechanics",
    score: 88,
    total: 100,
    color: "#f9ab00",
    bgColor: "#fef7e0",
    symbol: "⚡",
  },
];

const NOTIFICATIONS: NotificationItem[] = [
  {
    id: "1",
    title: "Physics Quiz Results",
    body: 'Your results for "Weekly Quiz 08: Particle Physics" are now available. You scored higher than 83% of your peers.',
    time: "3h ago",
    read: false,
  },
  {
    id: "2",
    title: "School Holiday",
    body: "Please note that the campus will be closed next Friday for the Annual Faculty Symposium. No lectures scheduled.",
    time: "Yesterday",
    read: true,
  },
];

export default function DashboardScreen() {
  return null;
}