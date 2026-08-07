import { Link } from "@tanstack/react-router";
import logo from "@/assets/abt-logo.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },
  { to: "/dashboard", label: "Dashboard" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3">
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <img
            src={logo}
            alt="ABTalks logo"
            width={36}
            height={36}
            className="h-9 w-9 shrink-0 rounded-xl"
          />
          <span className="truncate font-display text-lg font-extrabold tracking-tight">
            ABTalks
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/courses"
            className="btn-gradient ml-2 rounded-xl px-4 py-2 text-sm font-semibold"
          >
            Start Learning
          </Link>
        </nav>
        <Link
          to="/courses"
          className="btn-gradient rounded-xl px-3 py-2 text-sm font-semibold md:hidden"
        >
          Start
        </Link>
      </div>
    </header>
  );
}