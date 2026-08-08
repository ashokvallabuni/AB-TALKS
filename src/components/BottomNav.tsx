import { Link } from "@tanstack/react-router";
import { Home, LayoutDashboard, CheckSquare, BookOpen, Briefcase } from "lucide-react";

const navItems = [
  { to: "/", label: "Home", icon: Home, params: undefined },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, params: undefined },
  { to: "/task/$dayId", label: "Daily Task", icon: CheckSquare, params: { dayId: "1" } },
  { to: "/courses", label: "Courses", icon: BookOpen, params: undefined },
  { to: "/jobs", label: "Jobs", icon: Briefcase, params: undefined },
] as const;

export function BottomNav() {
  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-purple-500/20 bg-[#0B0F19]/90 backdrop-blur-xl md:hidden"
    >
      <ul className="mx-auto grid grid-cols-5 py-1">
        {navItems.map(({ to, label, icon: Icon, params }) => (
          <li key={to}>
            <Link
              to={to}
              params={params as never}
              activeOptions={{ exact: to === "/" }}
              className="flex flex-col items-center gap-1 py-2 text-[10px] font-medium text-gray-400 transition-colors"
              activeProps={{ className: "text-purple-400 font-bold" }}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
