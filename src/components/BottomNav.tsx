import { Link } from "@tanstack/react-router";
import { Home, LayoutDashboard, CheckSquare, BookOpen, Briefcase } from "lucide-react";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/task/1", label: "Daily Task", icon: CheckSquare },
  { to: "/courses", label: "Courses", icon: BookOpen },
  { to: "/jobs", label: "Jobs", icon: Briefcase },
] as const;

export function BottomNav() {
  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-purple-500/20 bg-[#0B0F19]/90 backdrop-blur-xl md:hidden"
    >
      <ul className="mx-auto grid grid-cols-5 py-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <Link
              to={to}
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
