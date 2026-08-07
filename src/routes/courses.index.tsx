import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CourseCard } from "@/components/CourseCard";
import { categories, courses } from "@/lib/courses";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/courses/")({
  head: () => ({
    meta: [
      { title: "All Courses — Coding, Python & Design | ABTalks" },
      {
        name: "description",
        content:
          "Browse ABTalks courses in web development, Python programming, DSA interviews and UI/UX design. Track your progress lesson by lesson.",
      },
      { property: "og:title", content: "All Courses | ABTalks" },
      {
        property: "og:description",
        content: "Web development, Python, DSA and design courses with progress tracking.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/courses" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/courses" }],
  }),
  component: CoursesPage,
});

function CoursesPage() {
  const [filter, setFilter] = useState<string>("All");
  const { percentFor, hydrated } = useProgress();
  const list = filter === "All" ? courses : courses.filter((c) => c.category === filter);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-extrabold">Courses</h1>
      <p className="mt-2 text-muted-foreground">
        Pick a track and start today. Every lesson is short, practical and project-based.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {["All", ...categories.map((c) => c.name)].map((name) => (
          <button
            key={name}
            onClick={() => setFilter(name)}
            className={`rounded-full border border-border px-4 py-2 text-sm transition-colors ${
              filter === name
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((course) => {
          const p = hydrated ? percentFor(course.slug, course.lessons.length) : 0;
          return (
            <CourseCard
              key={course.slug}
              course={course}
              percent={p > 0 ? p : undefined}
            />
          );
        })}
      </div>
    </div>
  );
}