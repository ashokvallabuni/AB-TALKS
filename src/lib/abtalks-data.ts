export type TrackStatus = "Enrolling now" | "Registration closed" | "Applications open" | "New";

export type ChallengeTrack = {
  id: string;
  slug: string;
  title: string;
  status: TrackStatus;
  badgeType: "primary" | "secondary" | "accent" | "muted";
  description: string;
  duration: string;
  teamSize?: string;
  tags: string[];
  ctaText: string;
  totalDays: number;
};

export type DayStatus = "On time" | "Rejected" | "Missed" | "Missed - catch up" | "Future";

export type DailyTask = {
  day: number;
  trackId: string;
  title: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  estimatedTime: string;
  context: string;
  realWorldImpact: string;
  whatToDo: string[];
  submissionRequirements: string[];
  githubSynergy: number;
  linkedinSynergy: number;
};

export type JobListing = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Full-time" | "Internship" | "Contract";
  mode: "Remote" | "Work from Office" | "Hybrid";
  postedDate: string;
  description: string;
  requirements: string[];
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
};

export type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

export type Mission = {
  day: number;
  title: string;
  passed?: boolean;
  attempts?: number;
  skipped?: boolean;
};

export type Candidate = {
  member: {
    id: string;
    name: string;
    jobRole: string;
    yearsExperience: number;
    education: string;
    status: string;
  };
  missions: Mission[];
  signals: {
    commitDays: number;
    missionsCompleted: number;
    missionsFirstTry: number;
  };
};

export const TRACKS: ChallengeTrack[] = [
  {
    id: "claude-challenge",
    slug: "claude-challenge",
    title: "Claude Challenge",
    status: "New",
    badgeType: "accent",
    description: "Master Claude through focused prompt-engineering tasks and build practical AI workflows.",
    duration: "60 days",
    tags: ["60 days", "AI mastery"],
    ctaText: "Join the Claude track",
    totalDays: 60,
  },
  {
    id: "coding-challenge-60",
    slug: "60-day-coding",
    title: "60-Day Coding Challenge",
    status: "Enrolling now",
    badgeType: "primary",
    description: "One real task every day across AI, Data Science, or Software Engineering. Build a streak and a public portfolio.",
    duration: "60 days",
    tags: ["60 days", "Streak & Portfolio"],
    ctaText: "Start the challenge",
    totalDays: 60,
  },
  {
    id: "ai-cohort-31",
    slug: "31-days-ai",
    title: "31 Days AI Cohort",
    status: "Applications open",
    badgeType: "secondary",
    description: "Build and deploy a production AI chatbot in 31 days. Learn RAG, agents, MCP, and get in front of recruiters.",
    duration: "31 days",
    tags: ["31 days", "RAG & Agents"],
    ctaText: "Apply now",
    totalDays: 31,
  },
  {
    id: "vibe-hackathon",
    slug: "vibe-code-hackathon",
    title: "Vibe Code Hackathon",
    status: "Registration closed",
    badgeType: "muted",
    description: "Build anything using AI in 48 hours. Compete solo or with a team of up to three and ship something real.",
    duration: "48 hours",
    teamSize: "Teams of 1-3",
    tags: ["48 hours", "Teams of 1-3"],
    ctaText: "Explore ABTalks",
    totalDays: 2,
  },
];

export const DAILY_TASKS: DailyTask[] = [
  {
    day: 1,
    trackId: "claude-challenge",
    title: "Day 1: Claude Setup & Your AI Personality Profile",
    category: "AI Fundamentals",
    level: "Beginner",
    estimatedTime: "~40 min",
    context: "Before you can build AI systems, you need a clear mental picture of how they actually work - input flows in, processing happens, output comes out. No magic.",
    realWorldImpact: "Engineers who can decompose AI products into clear pipeline stages debug faster, communicate better with teams, and design more reliable systems.",
    whatToDo: [
      "Build a clear mental model of AI pipelines",
      "Map out a simple AI pipeline: input → processing → output",
      "Identify 3 real-world AI products (e.g. ChatGPT, Google Translate, Spotify recommendations) and sketch their components",
      "Write a 5-sentence explanation of how a chatbot works",
    ],
    submissionRequirements: [
      "A hand-drawn or digital AI pipeline diagram",
      "5-sentence chatbot explanation in README",
    ],
    githubSynergy: 5,
    linkedinSynergy: 8,
  },
  {
    day: 2,
    trackId: "claude-challenge",
    title: "Day 2: Mastering System Prompts & Context Windows",
    category: "Prompt Engineering",
    level: "Beginner",
    estimatedTime: "~45 min",
    context: "System prompts define the persona, constraints, and instructions for LLMs before user input is received.",
    realWorldImpact: "Custom system prompts prevent prompt injection attacks and enforce structured JSON responses in enterprise applications.",
    whatToDo: [
      "Create a customer support bot prompt with strict boundary rules",
      "Test context window retention with 2000-word input text",
      "Enforce JSON format responses using system instructions",
    ],
    submissionRequirements: [
      "GitHub gist or repo link with system prompt markdown",
      "LinkedIn post explaining your findings on prompt constraints",
    ],
    githubSynergy: 5,
    linkedinSynergy: 8,
  },
  {
    day: 3,
    trackId: "claude-challenge",
    title: "Day 3: Building a Simple RAG Knowledge Search",
    category: "AI Architecture",
    level: "Intermediate",
    estimatedTime: "~50 min",
    context: "Retrieval-Augmented Generation (RAG) grounds AI models on custom documents to eliminate hallucinations.",
    realWorldImpact: "Every modern enterprise AI tool uses RAG for searching internal wikis, documentation, and customer tickets.",
    whatToDo: [
      "Chunk a sample document into semantic text blocks",
      "Pass relevant context snippets into Claude API prompts",
      "Build a simple CLI search interface",
    ],
    submissionRequirements: [
      "Working code repository link",
      "Short screen recording or screenshot of CLI output",
    ],
    githubSynergy: 5,
    linkedinSynergy: 8,
  },
];

export const JOBS_LIST: JobListing[] = [
  {
    id: "job-1",
    title: "Java Developer",
    company: "MNC",
    location: "Remote",
    type: "Full-time",
    mode: "Remote",
    postedDate: "Posted 25 Jul 2026",
    description: "Looking for a backend Java Developer with strong Data Structures, REST API design, and Spring Boot experience.",
    requirements: [
      "3+ months internship or personal project proof-of-work",
      "Proficient in Java, Spring Boot, REST APIs",
      "Understanding of MySQL / PostgreSQL database indexing",
    ],
  },
  {
    id: "job-2",
    title: "Marketing Intern",
    company: "Ideacraft Eventures Pvt. Ltd.",
    location: "Gurugram, Haryana",
    type: "Internship",
    mode: "Hybrid",
    postedDate: "Posted 2 Jul 2026",
    description: "Join Ideacraft to manage digital growth campaigns, developer community events, and public product launches.",
    requirements: [
      "Active social presence on LinkedIn or Twitter/X",
      "Strong written communication and content creation skills",
      "Familiarity with community building for tech audiences",
    ],
  },
  {
    id: "job-3",
    title: "Management Trainee / Business Associate (MBA Fresher)",
    company: "ABTalks",
    location: "Ghaziabad, Uttar Pradesh",
    type: "Full-time",
    mode: "Work from Office",
    postedDate: "Posted 7 Jun 2026",
    description: "Work directly with ABTalks founders on partnership expansion, student placement ops, and hiring partner management.",
    requirements: [
      "MBA Fresher or final year graduate",
      "High energy, problem-solving mindset, public speaking ability",
      "Demonstrated consistency through community projects or hackathons",
    ],
  },
];

export const CANDIDATES_LIST: Candidate[] = [
  {
    member: { id: "CAND-001", name: "Sarah Johnson", jobRole: "Senior Data Engineer", yearsExperience: 9, education: "MS Computer Science", status: "COMPLETED" },
    missions: [
      { day: 7, title: "Embeddings Explained", passed: true, attempts: 1 },
      { day: 8, title: "Vector Databases Overview", passed: true, attempts: 1 },
      { day: 10, title: "Retrieval & Matching Engine", passed: true, attempts: 2 },
      { day: 12, title: "Prompt Engineering Fundamentals", passed: true, attempts: 4 },
      { day: 16, title: "Chatbot Backend & API Integration", passed: true, attempts: 1 },
      { day: 22, title: "Multi-Agent Orchestration", passed: true, attempts: 2 },
      { day: 23, title: "Model Context Protocol (MCP)", passed: true, attempts: 2 },
      { day: 28, title: "Docker & Kubernetes Deployment", passed: true, attempts: 3 },
      { day: 29, title: "Monitoring, Logging & Observability", skipped: true },
      { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 1 }
    ],
    signals: { commitDays: 28, missionsCompleted: 30, missionsFirstTry: 20 }
  },
  {
    member: { id: "CAND-002", name: "Alex Turner", jobRole: "Backend Software Engineer", yearsExperience: 5, education: "B.Tech Computer Science", status: "COMPLETED" },
    missions: [
      { day: 7, title: "Embeddings Explained", passed: true, attempts: 3 },
      { day: 8, title: "Vector Databases Overview", passed: true, attempts: 2 },
      { day: 10, title: "Retrieval & Matching Engine", passed: true, attempts: 4 },
      { day: 12, title: "Prompt Engineering Fundamentals", passed: true, attempts: 5 },
      { day: 13, title: "Function Calling & Structured Outputs", passed: true, attempts: 4 },
      { day: 16, title: "Chatbot Backend & API Integration", passed: true, attempts: 1 },
      { day: 18, title: "Streaming Responses", passed: true, attempts: 1 },
      { day: 22, title: "Multi-Agent Orchestration", passed: true, attempts: 3 },
      { day: 28, title: "Docker & Kubernetes Deployment", passed: true, attempts: 1 },
      { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 2 }
    ],
    signals: { commitDays: 22, missionsCompleted: 29, missionsFirstTry: 10 }
  },
  {
    member: { id: "CAND-003", name: "Emily Chen", jobRole: "AI Engineer", yearsExperience: 6, education: "MS Artificial Intelligence", status: "COMPLETED" },
    missions: [
      { day: 7, title: "Embeddings Explained", passed: true, attempts: 1 },
      { day: 8, title: "Vector Databases Overview", passed: true, attempts: 1 },
      { day: 10, title: "Retrieval & Matching Engine", passed: true, attempts: 1 },
      { day: 11, title: "RAG End-to-End & LLM API Basics", passed: true, attempts: 1 },
      { day: 12, title: "Prompt Engineering Fundamentals", passed: true, attempts: 1 },
      { day: 13, title: "Function Calling & Structured Outputs", passed: true, attempts: 1 },
      { day: 21, title: "LangChain Agents", passed: true, attempts: 1 },
      { day: 22, title: "Multi-Agent Orchestration", passed: true, attempts: 1 },
      { day: 23, title: "Model Context Protocol (MCP)", passed: true, attempts: 1 },
      { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 1 }
    ],
    signals: { commitDays: 31, missionsCompleted: 31, missionsFirstTry: 30 }
  },
  {
    member: { id: "CAND-004", name: "David Miller", jobRole: "Business Analyst", yearsExperience: 8, education: "MBA", status: "COMPLETED" },
    missions: [
      { day: 7, title: "Embeddings Explained", passed: true, attempts: 4 },
      { day: 8, title: "Vector Databases Overview", passed: true, attempts: 5 },
      { day: 10, title: "Retrieval & Matching Engine", passed: true, attempts: 5 },
      { day: 12, title: "Prompt Engineering Fundamentals", passed: true, attempts: 3 },
      { day: 16, title: "Chatbot Backend & API Integration", passed: true, attempts: 2 },
      { day: 20, title: "Conversation Memory & Context Management", passed: true, attempts: 3 },
      { day: 22, title: "Multi-Agent Orchestration", passed: true, attempts: 4 },
      { day: 23, title: "Model Context Protocol (MCP)", passed: true, attempts: 5 },
      { day: 28, title: "Docker & Kubernetes Deployment", skipped: true },
      { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 2 }
    ],
    signals: { commitDays: 18, missionsCompleted: 28, missionsFirstTry: 6 }
  },
  {
    member: { id: "CAND-005", name: "Michael Brown", jobRole: "DevOps Engineer", yearsExperience: 10, education: "B.Tech Information Technology", status: "COMPLETED" },
    missions: [
      { day: 7, title: "Embeddings Explained", passed: true, attempts: 2 },
      { day: 8, title: "Vector Databases Overview", passed: true, attempts: 2 },
      { day: 10, title: "Retrieval & Matching Engine", passed: true, attempts: 2 },
      { day: 12, title: "Prompt Engineering Fundamentals", passed: true, attempts: 4 },
      { day: 18, title: "Streaming Responses", passed: true, attempts: 1 },
      { day: 22, title: "Multi-Agent Orchestration", passed: true, attempts: 2 },
      { day: 23, title: "Model Context Protocol (MCP)", passed: true, attempts: 3 },
      { day: 28, title: "Docker & Kubernetes Deployment", passed: true, attempts: 1 },
      { day: 29, title: "Monitoring, Logging & Observability", passed: true, attempts: 1 },
      { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 1 }
    ],
    signals: { commitDays: 30, missionsCompleted: 31, missionsFirstTry: 22 }
  },
  {
    member: { id: "CAND-006", name: "Wendy Foster", jobRole: "Marketing Manager", yearsExperience: 12, education: "BA Marketing", status: "COMPLETED" },
    missions: [
      { day: 1, title: "VS Code & Python Environment Setup", passed: true, attempts: 3 },
      { day: 7, title: "Embeddings Explained", passed: true, attempts: 5 },
      { day: 8, title: "Vector Databases Overview", passed: true, attempts: 5 },
      { day: 12, title: "Prompt Engineering Fundamentals", passed: true, attempts: 4 },
      { day: 16, title: "Chatbot Backend & API Integration", passed: true, attempts: 4 },
      { day: 17, title: "Chatbot Frontend Development", passed: true, attempts: 2 },
      { day: 22, title: "Multi-Agent Orchestration", passed: true, attempts: 5 },
      { day: 27, title: "Security, Privacy & Guardrails", skipped: true },
      { day: 28, title: "Docker & Kubernetes Deployment", skipped: true },
      { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 3 }
    ],
    signals: { commitDays: 19, missionsCompleted: 24, missionsFirstTry: 2 }
  },
  {
    member: { id: "CAND-007", name: "Ethan Brooks", jobRole: "Computer Science Intern", yearsExperience: 0, education: "BS Computer Science (in progress)", status: "COMPLETED" },
    missions: [
      { day: 1, title: "VS Code & Python Environment Setup", passed: true, attempts: 1 },
      { day: 3, title: "First AI Project, React Frontend & GitHub", passed: true, attempts: 1 },
      { day: 7, title: "Embeddings Explained", passed: true, attempts: 2 },
      { day: 8, title: "Vector Databases Overview", passed: true, attempts: 1 },
      { day: 12, title: "Prompt Engineering Fundamentals", passed: true, attempts: 1 },
      { day: 16, title: "Chatbot Backend & API Integration", passed: true, attempts: 1 },
      { day: 22, title: "Multi-Agent Orchestration", passed: true, attempts: 1 },
      { day: 27, title: "Security, Privacy & Guardrails", skipped: true },
      { day: 28, title: "Docker & Kubernetes Deployment", skipped: true },
      { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 2 }
    ],
    signals: { commitDays: 26, missionsCompleted: 27, missionsFirstTry: 22 }
  },
  {
    member: { id: "CAND-008", name: "Harold Whitfield", jobRole: "Distinguished Engineer", yearsExperience: 28, education: "BS Computer Science", status: "COMPLETED" },
    missions: [
      { day: 1, title: "VS Code & Python Environment Setup", passed: true, attempts: 1 },
      { day: 4, title: "Reading & Processing Structured Data", passed: true, attempts: 1 },
      { day: 5, title: "Reading & Processing Unstructured Data", passed: true, attempts: 1 },
      { day: 14, title: "Fine-Tuning: Concepts & When to Use It", skipped: true },
      { day: 15, title: "Fine-Tuning: Hands-On with LoRA & QLoRA", skipped: true },
      { day: 21, title: "LangChain Agents", passed: true, attempts: 5 },
      { day: 22, title: "Multi-Agent Orchestration", passed: true, attempts: 4 },
      { day: 23, title: "Model Context Protocol (MCP)", passed: true, attempts: 5 },
      { day: 27, title: "Security, Privacy & Guardrails", passed: true, attempts: 1 },
      { day: 28, title: "Docker & Kubernetes Deployment", passed: true, attempts: 1 },
      { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 2 }
    ],
    signals: { commitDays: 25, missionsCompleted: 27, missionsFirstTry: 15 }
  },
  {
    member: { id: "CAND-009", name: "Zara Ahmadi", jobRole: "AI Engineer", yearsExperience: 1, education: "BS Computer Science", status: "COMPLETED" },
    missions: [
      { day: 7, title: "Embeddings Explained", passed: true, attempts: 1 },
      { day: 8, title: "Vector Databases Overview", passed: true, attempts: 1 },
      { day: 10, title: "Retrieval & Matching Engine", passed: true, attempts: 1 },
      { day: 12, title: "Prompt Engineering Fundamentals", passed: true, attempts: 1 },
      { day: 13, title: "Function Calling & Structured Outputs", passed: true, attempts: 1 },
      { day: 21, title: "LangChain Agents", passed: true, attempts: 1 },
      { day: 22, title: "Multi-Agent Orchestration", passed: true, attempts: 1 },
      { day: 23, title: "Model Context Protocol (MCP)", passed: true, attempts: 1 },
      { day: 27, title: "Security, Privacy & Guardrails", passed: true, attempts: 1 },
      { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 1 }
    ],
    signals: { commitDays: 31, missionsCompleted: 31, missionsFirstTry: 29 }
  },
  {
    member: { id: "CAND-010", name: "Gerald Combs", jobRole: "IT Support Specialist", yearsExperience: 20, education: "AAS Information Technology", status: "COMPLETED" },
    missions: [
      { day: 1, title: "VS Code & Python Environment Setup", passed: true, attempts: 2 },
      { day: 7, title: "Embeddings Explained", passed: true, attempts: 5 },
      { day: 8, title: "Vector Databases Overview", passed: false, attempts: 4 },
      { day: 10, title: "Retrieval & Matching Engine", passed: false, attempts: 3 },
      { day: 12, title: "Prompt Engineering Fundamentals", passed: true, attempts: 5 },
      { day: 16, title: "Chatbot Backend & API Integration", passed: true, attempts: 4 },
      { day: 22, title: "Multi-Agent Orchestration", passed: false, attempts: 3 },
      { day: 27, title: "Security, Privacy & Guardrails", skipped: true },
      { day: 28, title: "Docker & Kubernetes Deployment", skipped: true },
      { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 3 }
    ],
    signals: { commitDays: 22, missionsCompleted: 23, missionsFirstTry: 1 }
  },
  {
    member: { id: "CAND-011", name: "Mia Alvarez", jobRole: "UX Researcher", yearsExperience: 6, education: "MA Human-Computer Interaction", status: "COMPLETED" },
    missions: [
      { day: 1, title: "VS Code & Python Environment Setup", passed: true, attempts: 2 },
      { day: 2, title: "Local LLM & AI Coding Assistant Setup", passed: true, attempts: 1 },
      { day: 3, title: "First AI Project, React Frontend & GitHub", passed: true, attempts: 3 },
      { day: 4, title: "Reading & Processing Structured Data", passed: true, attempts: 2 },
      { day: 7, title: "Embeddings Explained", skipped: true },
      { day: 8, title: "Vector Databases Overview", skipped: true },
      { day: 12, title: "Prompt Engineering Fundamentals", skipped: true },
      { day: 16, title: "Chatbot Backend & API Integration", skipped: true },
      { day: 22, title: "Multi-Agent Orchestration", skipped: true },
      { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 4 }
    ],
    signals: { commitDays: 9, missionsCompleted: 14, missionsFirstTry: 5 }
  },
  {
    member: { id: "CAND-012", name: "Chen Wei", jobRole: "Mobile App Developer", yearsExperience: 7, education: "BS Computer Engineering", status: "COMPLETED" },
    missions: [
      { day: 7, title: "Embeddings Explained", passed: true, attempts: 4 },
      { day: 8, title: "Vector Databases Overview", passed: true, attempts: 5 },
      { day: 9, title: "Building & Populating the Vector Database", passed: true, attempts: 4 },
      { day: 10, title: "Retrieval & Matching Engine", passed: true, attempts: 4 },
      { day: 16, title: "Chatbot Backend & API Integration", passed: true, attempts: 1 },
      { day: 18, title: "Streaming Responses", passed: true, attempts: 1 },
      { day: 22, title: "Multi-Agent Orchestration", passed: true, attempts: 2 },
      { day: 28, title: "Docker & Kubernetes Deployment", passed: true, attempts: 1 },
      { day: 30, title: "Production Readiness & Final Testing", passed: true, attempts: 1 },
      { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 1 }
    ],
    signals: { commitDays: 27, missionsCompleted: 30, missionsFirstTry: 14 }
  },
  {
    member: { id: "CAND-013", name: "Ravi Patel", jobRole: "Software Engineer", yearsExperience: 15, education: "MS Computer Science", status: "COMPLETED" },
    missions: [
      { day: 1, title: "VS Code & Python Environment Setup", passed: true, attempts: 3 },
      { day: 4, title: "Reading & Processing Structured Data", passed: true, attempts: 2 },
      { day: 7, title: "Embeddings Explained", passed: true, attempts: 3 },
      { day: 8, title: "Vector Databases Overview", passed: true, attempts: 2 },
      { day: 12, title: "Prompt Engineering Fundamentals", passed: true, attempts: 3 },
      { day: 16, title: "Chatbot Backend & API Integration", passed: true, attempts: 2 },
      { day: 22, title: "Multi-Agent Orchestration", passed: true, attempts: 2 },
      { day: 27, title: "Security, Privacy & Guardrails", passed: true, attempts: 1 },
      { day: 28, title: "Docker & Kubernetes Deployment", passed: true, attempts: 1 },
      { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 1 }
    ],
    signals: { commitDays: 27, missionsCompleted: 30, missionsFirstTry: 13 }
  },
  {
    member: { id: "CAND-014", name: "Bethany Cole", jobRole: "HR Manager", yearsExperience: 10, education: "BA Human Resources", status: "COMPLETED" },
    missions: [
      { day: 1, title: "VS Code & Python Environment Setup", passed: true, attempts: 4 },
      { day: 7, title: "Embeddings Explained", passed: true, attempts: 5 },
      { day: 8, title: "Vector Databases Overview", skipped: true },
      { day: 12, title: "Prompt Engineering Fundamentals", passed: true, attempts: 5 },
      { day: 16, title: "Chatbot Backend & API Integration", passed: true, attempts: 4 },
      { day: 20, title: "Conversation Memory & Context Management", passed: true, attempts: 3 },
      { day: 22, title: "Multi-Agent Orchestration", skipped: true },
      { day: 27, title: "Security, Privacy & Guardrails", skipped: true },
      { day: 28, title: "Docker & Kubernetes Deployment", skipped: true },
      { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 4 }
    ],
    signals: { commitDays: 17, missionsCompleted: 20, missionsFirstTry: 1 }
  },
  {
    member: { id: "CAND-015", name: "Noah Kim", jobRole: "Principal Architect", yearsExperience: 20, education: "MS Computer Science", status: "COMPLETED" },
    missions: [
      { day: 1, title: "VS Code & Python Environment Setup", passed: true, attempts: 1 },
      { day: 7, title: "Embeddings Explained", passed: true, attempts: 1 },
      { day: 8, title: "Vector Databases Overview", passed: true, attempts: 1 },
      { day: 14, title: "Fine-Tuning: Concepts & When to Use It", skipped: true },
      { day: 15, title: "Fine-Tuning: Hands-On with LoRA & QLoRA", skipped: true },
      { day: 21, title: "LangChain Agents", passed: true, attempts: 1 },
      { day: 22, title: "Multi-Agent Orchestration", passed: true, attempts: 1 },
      { day: 23, title: "Model Context Protocol (MCP)", passed: true, attempts: 1 },
      { day: 27, title: "Security, Privacy & Guardrails", passed: true, attempts: 1 },
      { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 1 }
    ],
    signals: { commitDays: 29, missionsCompleted: 29, missionsFirstTry: 27 }
  },
  {
    member: { id: "CAND-016", name: "Isabella Rossi", jobRole: "Software Engineer", yearsExperience: 5, education: "BS Computer Science", status: "COMPLETED" },
    missions: [
      { day: 1, title: "VS Code & Python Environment Setup", passed: true, attempts: 2 },
      { day: 7, title: "Embeddings Explained", passed: false, attempts: 4 },
      { day: 8, title: "Vector Databases Overview", passed: true, attempts: 3 },
      { day: 12, title: "Prompt Engineering Fundamentals", passed: false, attempts: 5 },
      { day: 16, title: "Chatbot Backend & API Integration", passed: true, attempts: 2 },
      { day: 22, title: "Multi-Agent Orchestration", passed: false, attempts: 4 },
      { day: 27, title: "Security, Privacy & Guardrails", skipped: true },
      { day: 28, title: "Docker & Kubernetes Deployment", skipped: true },
      { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 2 }
    ],
    signals: { commitDays: 19, missionsCompleted: 21, missionsFirstTry: 2 }
  },
  {
    member: { id: "CAND-017", name: "Tyler Brooks", jobRole: "Junior Developer", yearsExperience: 0, education: "GED + Coding Bootcamp Certificate", status: "COMPLETED" },
    missions: [
      { day: 1, title: "VS Code & Python Environment Setup", passed: true, attempts: 3 },
      { day: 3, title: "First AI Project, React Frontend & GitHub", passed: true, attempts: 5 },
      { day: 7, title: "Embeddings Explained", passed: true, attempts: 5 },
      { day: 8, title: "Vector Databases Overview", passed: true, attempts: 5 },
      { day: 10, title: "Retrieval & Matching Engine", passed: true, attempts: 5 },
      { day: 12, title: "Prompt Engineering Fundamentals", passed: true, attempts: 5 },
      { day: 16, title: "Chatbot Backend & API Integration", passed: true, attempts: 4 },
      { day: 22, title: "Multi-Agent Orchestration", passed: true, attempts: 5 },
      { day: 28, title: "Docker & Kubernetes Deployment", passed: true, attempts: 4 },
      { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 3 }
    ],
    signals: { commitDays: 30, missionsCompleted: 31, missionsFirstTry: 1 }
  },
  {
    member: { id: "CAND-018", name: "Diane Foster", jobRole: "AI Engineer", yearsExperience: 4, education: "MS Computer Science", status: "COMPLETED" },
    missions: [
      { day: 7, title: "Embeddings Explained", passed: true, attempts: 1 },
      { day: 8, title: "Vector Databases Overview", passed: true, attempts: 1 },
      { day: 10, title: "Retrieval & Matching Engine", passed: true, attempts: 1 },
      { day: 12, title: "Prompt Engineering Fundamentals", passed: true, attempts: 1 },
      { day: 13, title: "Function Calling & Structured Outputs", passed: true, attempts: 1 },
      { day: 22, title: "Multi-Agent Orchestration", passed: true, attempts: 1 },
      { day: 23, title: "Model Context Protocol (MCP)", passed: true, attempts: 1 },
      { day: 27, title: "Security, Privacy & Guardrails", passed: true, attempts: 1 },
      { day: 28, title: "Docker & Kubernetes Deployment", passed: true, attempts: 1 },
      { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 1 }
    ],
    signals: { commitDays: 31, missionsCompleted: 31, missionsFirstTry: 31 }
  },
  {
    member: { id: "CAND-019", name: "Frank DeLuca", jobRole: "Legacy Systems Engineer", yearsExperience: 25, education: "BS Computer Science", status: "COMPLETED" },
    missions: [
      { day: 1, title: "VS Code & Python Environment Setup", passed: true, attempts: 2 },
      { day: 4, title: "Reading & Processing Structured Data", passed: true, attempts: 1 },
      { day: 7, title: "Embeddings Explained", passed: true, attempts: 4 },
      { day: 8, title: "Vector Databases Overview", passed: true, attempts: 3 },
      { day: 16, title: "Chatbot Backend & API Integration", passed: true, attempts: 1 },
      { day: 17, title: "Chatbot Frontend Development", passed: true, attempts: 5 },
      { day: 19, title: "Response Formatting & Rich Outputs", passed: true, attempts: 4 },
      { day: 22, title: "Multi-Agent Orchestration", passed: true, attempts: 3 },
      { day: 28, title: "Docker & Kubernetes Deployment", passed: true, attempts: 1 },
      { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 2 }
    ],
    signals: { commitDays: 26, missionsCompleted: 29, missionsFirstTry: 11 }
  },
  {
    member: { id: "CAND-020", name: "Priyanka Sharma", jobRole: "Software Engineer", yearsExperience: 5, education: "BS Computer Science", status: "COMPLETED" },
    missions: [
      { day: 1, title: "VS Code & Python Environment Setup", passed: true, attempts: 1 },
      { day: 3, title: "First AI Project, React Frontend & GitHub", passed: true, attempts: 1 },
      { day: 4, title: "Reading & Processing Structured Data", skipped: true },
      { day: 7, title: "Embeddings Explained", passed: false, attempts: 2 },
      { day: 8, title: "Vector Databases Overview", skipped: true },
      { day: 12, title: "Prompt Engineering Fundamentals", passed: true, attempts: 1 },
      { day: 16, title: "Chatbot Backend & API Integration", passed: true, attempts: 1 },
      { day: 22, title: "Multi-Agent Orchestration", passed: true, attempts: 1 },
      { day: 27, title: "Security, Privacy & Guardrails", passed: true, attempts: 1 },
      { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 1 }
    ],
    signals: { commitDays: 24, missionsCompleted: 27, missionsFirstTry: 19 }
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Vivek",
    role: "IT Leader · 20+ years of industry experience",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    quote: "I wasn't looking for another certificate. I was looking for a new way of thinking. With over 20 years in IT leadership, stepping into Generative AI made me feel like a beginner again, and honestly that was the best part. The challenge may have ended, but my AI journey has just begun.",
  },
  {
    id: "t2",
    name: "Lakshay",
    role: "Full Stack Builder & Student",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    quote: "60 days ago, I used AI mainly for everyday questions. Today I use it to build complete projects, craft professional resumes, automate workflows, and solve real-world problems. It completely changed the way I think about and use AI.",
  },
  {
    id: "t3",
    name: "Rida Khan",
    role: "AI Enthusiast",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    quote: "I joined with curiosity, but also with doubts about whether I could stay consistent for all 60 days. To my surprise, I did it. This wasn't just a 60-day challenge. It was a journey that taught me consistency can turn uncertainty into achievement.",
  },
  {
    id: "t4",
    name: "Devpal Singh Anand",
    role: "Software Engineering Student",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    quote: "From exploring AI concepts to building production-ready projects, every challenge strengthened my technical skills and encouraged me to think like an engineer. Today AI isn't just something I learn. It's a tool I use to solve meaningful problems.",
  },
];

export const FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "Is purchasing a Claude subscription mandatory for this challenge?",
    answer: "No, a paid subscription is not mandatory. You can participate using free tier access, API free credits, or alternative open-weights AI tools as specified in each task brief.",
  },
  {
    id: "faq-2",
    question: "Do I need to create a Claude account?",
    answer: "Yes, creating a free Claude account (or accessing Claude via Anthropic API console) is required to execute the daily prompts and hands-on exercises.",
  },
  {
    id: "faq-3",
    question: "Where can I find the daily task?",
    answer: "Daily tasks are published every day at 12:00 AM IST on your student dashboard under the 'Today's Task' card and emailed to registered participants.",
  },
  {
    id: "faq-4",
    question: "Will I receive daily tasks or teaching sessions?",
    answer: "You receive self-paced practical task briefs accompanied by reference code snippets, live Q&A community check-ins, and weekend review streams.",
  },
  {
    id: "faq-5",
    question: "What if I miss a day's task?",
    answer: "Don't panic! You can use 'Missed - Catch Up' mode to complete backlog tasks and maintain your streak progress.",
  },
  {
    id: "faq-6",
    question: "Will I receive goodies after completing the challenge?",
    answer: "Top consistency achievers receive official ABTalks builder badges, exclusive swag packages, and direct fast-track interviews with hiring partners.",
  },
  {
    id: "faq-7",
    question: "Who should I contact if I have an issue with a task?",
    answer: "You can post in the ABTalks Discord #help channel or reach out via our official WhatsApp builder community link in the dashboard footer.",
  },
  {
    id: "faq-8",
    question: "Is there any YouTube channel for the Claude Challenge?",
    answer: "Yes! Check out 'ABTalks on AI' YouTube channel for daily video walkthroughs and deep-dive solution explanations.",
  },
  {
    id: "faq-9",
    question: "Will we explore different AI tools during the challenge?",
    answer: "Yes! While Claude is the core focus, we also cover complementary tools like Cursor, ChatGPT, v0, Midjourney, and LangChain.",
  },
  {
    id: "faq-10",
    question: "Can I use tools other than Claude for the challenge?",
    answer: "Absolutely. As long as your submission fulfills the proof-of-work requirements, you are free to use any AI development environment.",
  },
];
