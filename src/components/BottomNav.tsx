import { Link } from "@tanstack/react-router";
import { Home, LayoutGrid, User } from "lucide-react";

const items = [
  { to: "/", label: "Home", icon: Home },
  { to: "/courses", label: "Courses", icon: LayoutGrid },
  { to: "/dashboard", label: "Profile", icon: User },
] as const;

export function BottomNav() {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/85 backdrop-blur-xl md:hidden"
    >
      <ul className="mx-auto grid max-w-md grid-cols-3">
        {items.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <Link
              to={to}
              activeOptions={{ exact: to === "/" }}
              className="flex flex-col items-center gap-1 py-3 text-xs text-muted-foreground transition-colors"
              activeProps={{ className: "text-primary-glow" }}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}