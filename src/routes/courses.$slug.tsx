import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CheckCircle2, Circle, Bookmark, Clock, Star, Users } from "lucide-react";
import { useState } from "react";
import { getCourse, type Lesson } from "@/lib/courses";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/courses/$slug")({
  loader: ({ params }) => {
    const course = getCourse(params.slug);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Course unavailable | ABTalks" }, { name: "robots", content: "noindex" }],
      };
    }
    const { course } = loaderData;
    return {
      meta: [
        { title: `${course.title} — Online Course | ABTalks` },
        { name: "description", content: course.description.slice(0, 155) },
        { property: "og:title", content: `${course.title} | ABTalks` },
        { property: "og:description", content: course.tagline },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/courses/${params.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/courses/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: course.title,
            description: course.description,
            provider: { "@type": "Organization", name: "ABTalks" },
          }),
        },
      ],
    };
  },
  component: CourseDetail,
});

function CourseDetail() {
  const { course } = Route.useLoaderData();
  const { completedFor, percentFor, toggleLesson, toggleSaved, saved, hydrated } = useProgress();
  const [active, setActive] = useState(0);
  const done = new Set(completedFor(course.slug));
  const percent = hydrated ? percentFor(course.slug, course.lessons.length) : 0;
  const lesson = course.lessons[active] ?? course.lessons[0]!;
  const isSaved = saved.includes(course.slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <Link to="/courses" className="text-sm text-muted-foreground hover:text-foreground">
        ← All courses
      </Link>

      <div className="mt-4 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <div className="overflow-hidden rounded-2xl border border-border bg-black">
            <video
              key={lesson.id}
              controls
              playsInline
              poster={course.image}
              preload="none"
              className="aspect-video w-full"
              src={lesson.videoUrl}
            />
          </div>

          <h1 className="mt-5 text-2xl font-extrabold sm:text-3xl">{course.title}</h1>
          <p className="mt-2 text-muted-foreground">{course.description}</p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-current text-chart-5" /> {course.rating}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users className="h-4 w-4" /> {course.learners} learners
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" /> {course.hours}h · {course.level}
            </span>
          </div>

          <button
            onClick={() => toggleSaved(course.slug)}
            className="mt-5 inline-flex items-center gap-2 rounded-xl border border-border bg-secondary px-4 py-2 text-sm font-semibold transition-colors hover:bg-muted"
          >
            <Bookmark className={`h-4 w-4 ${isSaved ? "fill-current text-primary-glow" : ""}`} />
            {isSaved ? "Saved" : "Save course"}
          </button>
        </div>

        <aside className="surface-card rounded-2xl p-4">
          <h2 className="text-lg font-bold">Lessons</h2>
          <div className="mt-3 space-y-1.5">
            <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full transition-[width] duration-500"
                style={{ width: `${percent}%`, background: "var(--gradient-brand)" }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {done.size} of {course.lessons.length} lessons complete · {percent}%
            </p>
          </div>

          <ul className="mt-4 space-y-1">
            {course.lessons.map((l: Lesson, i: number) => (
              <li key={l.id}>
                <div
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ${
                    i === active ? "bg-secondary" : "hover:bg-secondary/60"
                  }`}
                >
                  <button
                    aria-label={done.has(l.id) ? "Mark incomplete" : "Mark complete"}
                    onClick={() => toggleLesson(course.slug, l.id)}
                    className="shrink-0"
                  >
                    {done.has(l.id) ? (
                      <CheckCircle2 className="h-5 w-5 text-success" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground" />
                    )}
                  </button>
                  <button onClick={() => setActive(i)} className="min-w-0 flex-1 text-left">
                    <span className="block truncate text-sm font-medium">{l.title}</span>
                    <span className="text-xs text-muted-foreground">{l.duration}</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
