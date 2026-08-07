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
  prefixBadge: string;
  challengeLabel: string;
};

export type DayStatus = "On time" | "Rejected" | "Missed" | "Missed - catch up" | "Future";

export type DailyTask = {
  day: number;
  trackId: string;
  title: string;
  challengeLabel: string;
  category: string;
  level: "Easy" | "Beginner" | "Intermediate" | "Advanced";
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

export const TRACKS: ChallengeTrack[] = [
  {
    id: "ai-challenge",
    slug: "artificial-intelligence",
    title: "Artificial Intelligence",
    status: "Applications open",
    badgeType: "secondary",
    description:
      "Build and deploy production AI systems in 60 days. Learn RAG, agents, MCP, and get in front of recruiters.",
    duration: "60 days",
    tags: ["60 days", "AI Systems"],
    ctaText: "Start AI Challenge",
    totalDays: 60,
    prefixBadge: "AI",
    challengeLabel: "AI challenge",
  },
  {
    id: "claude-challenge",
    slug: "claude-challenge",
    title: "Claude AI",
    status: "New",
    badgeType: "accent",
    description:
      "Master Claude through focused prompt-engineering tasks and build practical AI workflows.",
    duration: "60 days",
    tags: ["60 days", "AI mastery"],
    ctaText: "Join the Claude track",
    totalDays: 60,
    prefixBadge: "CLAUDE",
    challengeLabel: "CLAUDE challenge",
  },
  {
    id: "coding-challenge-60",
    slug: "60-day-coding",
    title: "60-Day Coding Challenge",
    status: "Enrolling now",
    badgeType: "primary",
    description:
      "One real task every day across AI, Data Science, or Software Engineering. Build a streak and a public portfolio.",
    duration: "60 days",
    tags: ["60 days", "Streak & Portfolio"],
    ctaText: "Start the challenge",
    totalDays: 60,
    prefixBadge: "CODE",
    challengeLabel: "60-day challenge",
  },
  {
    id: "vibe-hackathon",
    slug: "vibe-code-hackathon",
    title: "Vibe Code Hackathon",
    status: "Registration closed",
    badgeType: "muted",
    description:
      "Build anything using AI in 48 hours. Compete solo or with a team of up to three and ship something real.",
    duration: "48 hours",
    teamSize: "Teams of 1-3",
    tags: ["48 hours", "Teams of 1-3"],
    ctaText: "Explore ABTalks",
    totalDays: 2,
    prefixBadge: "HACK",
    challengeLabel: "Vibe Hackathon",
  },
];

export const DAILY_TASKS: DailyTask[] = [
  {
    day: 1,
    trackId: "ai-challenge",
    title: "What Does an AI System Actually Do?",
    challengeLabel: "AI challenge",
    category: "AI",
    level: "Easy",
    estimatedTime: "~45 min",
    context:
      "Before you can build AI systems, you need a clear mental picture of how they actually work - input flows in, processing happens, output comes out. No magic.",
    realWorldImpact:
      "Engineers who can decompose AI products into clear pipeline stages debug faster, communicate better with teams, and design more reliable systems.",
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
    day: 1,
    trackId: "claude-challenge",
    title: "Day 1: Claude Setup & Your AI Personality Profile",
    challengeLabel: "CLAUDE challenge",
    category: "Claude AI",
    level: "Beginner",
    estimatedTime: "~40 min",
    context:
      "Before you can build AI systems with Claude, you need a clear mental picture of how system prompts and context windows shape AI personalities.",
    realWorldImpact:
      "Engineers who master Claude prompt engineering design more reliable AI agents and customer assistant workflows.",
    whatToDo: [
      "Set up your Claude account and Anthropic API environment",
      "Create a custom system prompt defining an AI mentor persona",
      "Test context window memory retention with multi-turn conversations",
      "Write a 5-sentence summary of your custom persona configuration",
    ],
    submissionRequirements: [
      "System prompt configuration markdown snippet",
      "5-sentence AI personality profile in README",
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
    description:
      "Looking for a backend Java Developer with strong Data Structures, REST API design, and Spring Boot experience.",
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
    description:
      "Join Ideacraft to manage digital growth campaigns, developer community events, and public product launches.",
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
    description:
      "Work directly with ABTalks founders on partnership expansion, student placement ops, and hiring partner management.",
    requirements: [
      "MBA Fresher or final year graduate",
      "High energy, problem-solving mindset, public speaking ability",
      "Demonstrated consistency through community projects or hackathons",
    ],
  },
];

export type Candidate = {
  member: {
    id: string;
    name: string;
    jobRole: string;
    yearsExperience: number;
    education: string;
    status: string;
  };
  signals: {
    commitDays: number;
    missionsCompleted: number;
    missionsFirstTry: number;
  };
  missions: Array<{
    day: number;
    title: string;
    passed: boolean;
    skipped?: boolean;
    attempts: number;
  }>;
};

export const CANDIDATES_LIST: Candidate[] = [
  {
    member: {
      id: "C-101",
      name: "Aarav Sharma",
      jobRole: "AI Engineer",
      yearsExperience: 2,
      education: "B.Tech Computer Science",
      status: "Available",
    },
    signals: {
      commitDays: 58,
      missionsCompleted: 50,
      missionsFirstTry: 44,
    },
    missions: [
      { day: 1, title: "AI system pipeline mapping", passed: true, attempts: 1 },
      { day: 5, title: "Claude prompt engineering", passed: true, attempts: 1 },
      { day: 12, title: "RAG-based assistant prototype", passed: true, attempts: 2 },
    ],
  },
  {
    member: {
      id: "C-102",
      name: "Neha Singh",
      jobRole: "Software Engineer",
      yearsExperience: 3,
      education: "MCA",
      status: "Interviewing",
    },
    signals: {
      commitDays: 60,
      missionsCompleted: 57,
      missionsFirstTry: 52,
    },
    missions: [
      { day: 2, title: "Full-stack feature build", passed: true, attempts: 1 },
      { day: 8, title: "API design and testing", passed: true, attempts: 1 },
      { day: 18, title: "Deployment automation", passed: true, attempts: 1 },
    ],
  },
  {
    member: {
      id: "C-103",
      name: "Riya Patel",
      jobRole: "Data Engineer",
      yearsExperience: 4,
      education: "B.Sc. Data Science",
      status: "Available",
    },
    signals: {
      commitDays: 54,
      missionsCompleted: 49,
      missionsFirstTry: 46,
    },
    missions: [
      { day: 3, title: "Data pipeline design", passed: true, attempts: 1 },
      { day: 14, title: "ETL integration", passed: true, attempts: 2 },
      { day: 22, title: "Analytics dashboard", passed: true, attempts: 1 },
    ],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Vivek",
    role: "IT Leader · 20+ years of industry experience",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    quote:
      "I wasn't looking for another certificate. I was looking for a new way of thinking. With over 20 years in IT leadership, stepping into Generative AI made me feel like a beginner again, and honestly that was the best part. The challenge may have ended, but my AI journey has just begun.",
  },
  {
    id: "t2",
    name: "Lakshay",
    role: "Full Stack Builder & Student",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    quote:
      "60 days ago, I used AI mainly for everyday questions. Today I use it to build complete projects, craft professional resumes, automate workflows, and solve real-world problems. It completely changed the way I think about and use AI.",
  },
  {
    id: "t3",
    name: "Rida Khan",
    role: "AI Enthusiast",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    quote:
      "I joined with curiosity, but also with doubts about whether I could stay consistent for all 60 days. To my surprise, I did it. This wasn't just a 60-day challenge. It was a journey that taught me consistency can turn uncertainty into achievement.",
  },
  {
    id: "t4",
    name: "Devpal Singh Anand",
    role: "Software Engineering Student",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    quote:
      "From exploring AI concepts to building production-ready projects, every challenge strengthened my technical skills and encouraged me to think like an engineer. Today AI isn't just something I learn. It's a tool I use to solve meaningful problems.",
  },
];

export const FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "Is purchasing a Claude subscription mandatory for this challenge?",
    answer:
      "No, a paid subscription is not mandatory. You can participate using free tier access, API free credits, or alternative open-weights AI tools as specified in each task brief.",
  },
  {
    id: "faq-2",
    question: "Do I need to create a Claude account?",
    answer:
      "Yes, creating a free Claude account (or accessing Claude via Anthropic API console) is required to execute the daily prompts and hands-on exercises.",
  },
  {
    id: "faq-3",
    question: "Where can I find the daily task?",
    answer:
      "Daily tasks are published every day at 12:00 AM IST on your student dashboard under the 'Today's Task' card and emailed to registered participants.",
  },
  {
    id: "faq-4",
    question: "Will I receive daily tasks or teaching sessions?",
    answer:
      "You receive self-paced practical task briefs accompanied by reference code snippets, live Q&A community check-ins, and weekend review streams.",
  },
  {
    id: "faq-5",
    question: "What if I miss a day's task?",
    answer:
      "Don't panic! You can use 'Missed - Catch Up' mode to complete backlog tasks and maintain your streak progress.",
  },
  {
    id: "faq-6",
    question: "Will I receive goodies after completing the challenge?",
    answer:
      "Top consistency achievers receive official ABTalks builder badges, exclusive swag packages, and direct fast-track interviews with hiring partners.",
  },
  {
    id: "faq-7",
    question: "Who should I contact if I have an issue with a task?",
    answer:
      "You can post in the ABTalks Discord #help channel or reach out via our official WhatsApp builder community link in the dashboard footer.",
  },
  {
    id: "faq-8",
    question: "Is there any YouTube channel for the Claude Challenge?",
    answer:
      "Yes! Check out 'ABTalks on AI' YouTube channel for daily video walkthroughs and deep-dive solution explanations.",
  },
  {
    id: "faq-9",
    question: "Will we explore different AI tools during the challenge?",
    answer:
      "Yes! While Claude is the core focus, we also cover complementary tools like Cursor, ChatGPT, v0, Midjourney, and LangChain.",
  },
  {
    id: "faq-10",
    question: "Can I use tools other than Claude for the challenge?",
    answer:
      "Absolutely. As long as your submission fulfills the proof-of-work requirements, you are free to use any AI development environment.",
  },
];
