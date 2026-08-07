import webImg from "@/assets/course-web.jpg";
import pythonImg from "@/assets/course-python.jpg";
import designImg from "@/assets/course-design.jpg";
import dsaImg from "@/assets/course-dsa.jpg";

export type Lesson = {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
};

export type Course = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: "Web Development" | "Programming" | "Design";
  level: "Beginner" | "Intermediate" | "Advanced";
  hours: number;
  rating: number;
  learners: string;
  image: string;
  lessons: Lesson[];
};

const SAMPLE_VIDEO = "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";

function lessons(titles: [string, string][]): Lesson[] {
  return titles.map(([title, duration], i) => ({
    id: `l${i + 1}`,
    title,
    duration,
    videoUrl: SAMPLE_VIDEO,
  }));
}

export const courses: Course[] = [
  {
    slug: "full-stack-web-development",
    title: "Full Stack Web Development",
    tagline: "HTML, CSS, JavaScript, React and Node — build real products.",
    description:
      "Go from zero to deploying full stack apps. You will build a portfolio site, a REST API and a production React dashboard, with projects after every module.",
    category: "Web Development",
    level: "Beginner",
    hours: 42,
    rating: 4.8,
    learners: "12,400",
    image: webImg,
    lessons: lessons([
      ["How the web actually works", "08:12"],
      ["HTML structure and semantics", "14:05"],
      ["CSS layout: flexbox and grid", "18:40"],
      ["JavaScript fundamentals", "22:10"],
      ["Your first React component", "16:33"],
      ["State, props and hooks", "24:18"],
      ["Building a REST API with Node", "27:02"],
      ["Deploying to production", "11:47"],
    ]),
  },
  {
    slug: "python-programming-masterclass",
    title: "Python Programming Masterclass",
    tagline: "Learn Python from basics to automation and data handling.",
    description:
      "A practical Python course for absolute beginners. Master syntax, files, APIs and automation scripts you can use at work from day one.",
    category: "Programming",
    level: "Beginner",
    hours: 28,
    rating: 4.7,
    learners: "9,180",
    image: pythonImg,
    lessons: lessons([
      ["Installing Python and your editor", "07:24"],
      ["Variables, types and input", "13:19"],
      ["Conditions and loops", "17:56"],
      ["Functions and modules", "15:32"],
      ["Working with files and JSON", "19:11"],
      ["Calling APIs with requests", "21:04"],
      ["Automating boring tasks", "23:48"],
    ]),
  },
  {
    slug: "ui-ux-design-essentials",
    title: "UI/UX Design Essentials",
    tagline: "Design clean, modern interfaces people love to use.",
    description:
      "Learn layout, spacing, colour and type systems, then design a complete mobile app in Figma with a handoff-ready design system.",
    category: "Design",
    level: "Intermediate",
    hours: 19,
    rating: 4.9,
    learners: "6,720",
    image: designImg,
    lessons: lessons([
      ["What good design really means", "09:40"],
      ["Spacing and visual rhythm", "14:22"],
      ["Colour systems that scale", "16:08"],
      ["Typography for interfaces", "12:55"],
      ["Designing a mobile app screen", "25:30"],
      ["Prototyping and handoff", "18:02"],
    ]),
  },
  {
    slug: "dsa-for-interviews",
    title: "Data Structures & Algorithms",
    tagline: "Crack coding interviews with patterns, not memorisation.",
    description:
      "Arrays, hashing, trees, graphs and dynamic programming — taught as reusable patterns with 120+ solved problems and mock interview rounds.",
    category: "Programming",
    level: "Advanced",
    hours: 36,
    rating: 4.8,
    learners: "15,930",
    image: dsaImg,
    lessons: lessons([
      ["Big-O without the maths panic", "11:15"],
      ["Arrays and two pointers", "20:41"],
      ["Hashing patterns", "18:26"],
      ["Recursion and backtracking", "24:53"],
      ["Trees and traversals", "22:37"],
      ["Graphs: BFS and DFS", "26:09"],
      ["Dynamic programming basics", "29:44"],
    ]),
  },
];

export const categories = [
  { name: "Web Development", emoji: "🌐", blurb: "HTML, CSS, React, Node" },
  { name: "Programming", emoji: "💻", blurb: "Python, DSA, interviews" },
  { name: "Design", emoji: "🎨", blurb: "UI, UX, Figma systems" },
] as const;

export function getCourse(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}
