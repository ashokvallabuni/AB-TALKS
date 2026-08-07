import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, PlayCircle } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { CourseCard } from "@/components/CourseCard";
import { categories, courses } from "@/lib/courses";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ABTalks — Learn Coding Online with Practical Courses" },
      {
        name: "description",
        content:
          "Learn coding, programming, design and interview skills with ABTalks. Short practical lessons, real projects and progress tracking — start free today.",
      },
      { property: "og:title", content: "ABTalks — Learn Coding Online" },
      {
        property: "og:description",
        content:
          "Practical web development, Python, DSA and design courses with lesson-by-lesson progress tracking.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          name: "ABTalks",
          description: "Online learning platform for coding, programming and design skills.",
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-border">
        <img
          src={heroBg}
          alt=""
          aria-hidden="true"
          width={1536}
          height={1024}
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <div className="animate-rise max-w-2xl">
            <span className="inline-flex rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
              Trusted by 40,000+ learners in India
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] sm:text-6xl">
              Learn Skills That <span className="gradient-text">Matter</span> 🚀
            </h1>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Short, practical lessons in coding, programming and design. Build real projects
              and track every lesson you finish.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/courses"
                className="btn-gradient inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 text-base font-bold"
              >
                Start Learning <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-2xl border border-border bg-card/70 px-6 py-3.5 text-base font-semibold backdrop-blur transition-colors hover:bg-secondary"
              >
                <PlayCircle className="h-5 w-5" /> My learning
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-bold sm:text-3xl">Browse categories</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {categories.map((c) => (
            <Link
              key={c.name}
              to="/courses"
              className="surface-card rounded-2xl p-5 transition-transform hover:-translate-y-1"
            >
              <span className="text-2xl">{c.emoji}</span>
              <h3 className="mt-3 text-lg font-bold">{c.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold sm:text-3xl">Featured courses</h2>
          <Link to="/courses" className="text-sm text-muted-foreground hover:text-foreground">
            View all
          </Link>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.slice(0, 3).map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-14 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Ready to start today?</h2>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            Pick one course, finish one lesson a day. That's how careers change.
          </p>
          <Link
            to="/courses"
            className="btn-gradient mt-7 inline-block rounded-2xl px-7 py-3.5 text-base font-bold"
          >
            Start Learning
          </Link>
        </div>
      </section>
    </div>
  );
}
