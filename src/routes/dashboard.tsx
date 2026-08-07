import { createFileRoute, Link } from "@tanstack/react-router";
import { CourseCard } from "@/components/CourseCard";
import { courses } from "@/lib/courses";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "My Learning Dashboard | ABTalks" },
      {
        name: "description",
        content:
          "Continue where you left off, track lesson progress and open your saved ABTalks courses in one place.",
      },
      { property: "og:title", content: "My Learning Dashboard | ABTalks" },
      {
        property: "og:description",
        content: "Continue learning, track progress and revisit saved courses.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/dashboard" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/dashboard" }],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { percentFor, saved, hydrated } = useProgress();

  const inProgress = courses.filter((c) => {
    const p = percentFor(c.slug, c.lessons.length);
    return p > 0 && p < 100;
  });
  const completed = courses.filter((c) => percentFor(c.slug, c.lessons.length) === 100);
  const savedCourses = courses.filter((c) => saved.includes(c.slug));
  const totalLessonsDone = courses.reduce(
    (n, c) => n + Math.round((percentFor(c.slug, c.lessons.length) / 100) * c.lessons.length),
    0,
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-extrabold">My learning</h1>
      <p className="mt-2 text-muted-foreground">Your progress across every ABTalks course.</p>

      <div className="mt-6 grid grid-cols-3 gap-3">
        {[
          { label: "In progress", value: inProgress.length },
          { label: "Lessons done", value: totalLessonsDone },
          { label: "Completed", value: completed.length },
        ].map((s) => (
          <div key={s.label} className="surface-card rounded-2xl p-4 text-center">
            <p className="gradient-text text-2xl font-extrabold">{s.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-bold">Continue learning</h2>
        {hydrated && inProgress.length === 0 ? (
          <div className="surface-card mt-4 rounded-2xl p-6 text-center">
            <p className="text-sm text-muted-foreground">
              You haven't started a course yet.
            </p>
            <Link
              to="/courses"
              className="btn-gradient mt-4 inline-block rounded-xl px-5 py-2.5 text-sm font-semibold"
            >
              Browse courses
            </Link>
          </div>
        ) : (
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {inProgress.map((c) => (
              <CourseCard
                key={c.slug}
                course={c}
                percent={percentFor(c.slug, c.lessons.length)}
              />
            ))}
          </div>
        )}
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold">Saved courses</h2>
        {savedCourses.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">
            Tap “Save course” on any course to keep it here.
          </p>
        ) : (
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {savedCourses.map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}