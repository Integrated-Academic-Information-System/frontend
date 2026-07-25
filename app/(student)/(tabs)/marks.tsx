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

export default function MarksScreen() {
  return null;
}