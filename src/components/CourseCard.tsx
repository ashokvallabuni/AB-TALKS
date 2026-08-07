import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import type { Course } from "@/lib/courses";

export function CourseCard({
  course,
  percent,
}: {
  course: Course;
  percent?: number | undefined;
}) {
  return (
    <Link
      to="/courses/$slug"
      params={{ slug: course.slug }}
      className="surface-card group block overflow-hidden rounded-2xl transition-transform duration-200 hover:-translate-y-1"
    >
      <img
        src={course.image}
        alt={`${course.title} course cover`}
        loading="lazy"
        width={896}
        height={512}
        className="aspect-[16/9] w-full object-cover"
      />
      <div className="space-y-3 p-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="rounded-full bg-secondary px-2 py-0.5">{course.category}</span>
          <span className="inline-flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-current text-chart-5" />
            {course.rating}
          </span>
        </div>
        <h3 className="text-base font-bold leading-snug">{course.title}</h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{course.tagline}</p>
        {typeof percent === "number" ? (
          <div className="space-y-1.5 pt-1">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full transition-[width] duration-500"
                style={{ width: `${percent}%`, background: "var(--gradient-brand)" }}
              />
            </div>
            <p className="text-xs text-muted-foreground">{percent}% complete</p>
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">
            {course.lessons.length} lessons · {course.hours}h · {course.level}
          </p>
        )}
      </div>
    </Link>
  );
}