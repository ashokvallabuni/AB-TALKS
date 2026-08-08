import React, { useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Briefcase, Flame, ChevronDown, Sun, User } from "lucide-react";
import logo from "@/assets/abt-logo.png";
import { useUserState } from "@/lib/user-store";
import { TRACKS } from "@/lib/abtalks-data";
import { useAuth } from "@/hooks/useAuth";

export function SiteHeader() {
  const location = useLocation();
  const { state, selectTrack } = useUserState();
  const [trackOpen, setTrackOpen] = useState(false);
  const { user } = useAuth();

  const isDashboardArea =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/task") ||
    location.pathname.startsWith("/jobs");
  const currentTrack = TRACKS.find((t) => t.id === state.selectedTrack) || TRACKS[0];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-[#0B0F19]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src={logo}
              alt="ABTalks logo"
              width={36}
              height={36}
              className="h-9 w-9 shrink-0 rounded-xl transition-transform group-hover:scale-105"
            />
            <span className="font-display text-xl font-black tracking-tight text-white">
              AB TALKS
            </span>
          </Link>

          {/* Track Selector Dropdown (Shown in Dashboard Context) */}
          {isDashboardArea && currentTrack && (
            <div className="relative ml-2 hidden sm:block">
              <button
                onClick={() => setTrackOpen(!trackOpen)}
                className="flex items-center gap-2 rounded-lg border border-purple-500/30 bg-purple-950/40 px-3 py-1.5 text-xs font-semibold text-purple-200 transition-colors hover:bg-purple-900/50"
              >
                <span className="rounded bg-purple-600/60 px-1.5 py-0.5 text-[10px] uppercase font-bold text-white">
                  {currentTrack.id.includes("claude") ? "CLAUDE" : "AI"}
                </span>
                <span className="truncate max-w-[140px]">{currentTrack.title}</span>
                <ChevronDown className="h-3.5 w-3.5 text-purple-400" />
              </button>

              {trackOpen && (
                <div className="absolute left-0 top-full mt-2 w-56 rounded-xl border border-border bg-[#131927] p-1.5 shadow-2xl z-50">
                  <div className="px-2 py-1 text-[10px] font-bold text-muted-foreground uppercase">
                    Select Active Track
                  </div>
                  {TRACKS.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        selectTrack(t.id);
                        setTrackOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-xs font-medium transition-colors ${
                        state.selectedTrack === t.id
                          ? "bg-purple-600/30 text-purple-200 font-bold"
                          : "text-gray-300 hover:bg-white/5"
                      }`}
                    >
                      <span className="truncate">{t.title}</span>
                      <span className="text-[10px] text-muted-foreground">{t.duration}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Navigation Controls */}
        <nav className="flex items-center gap-2 sm:gap-4">
          <Link
            to="/courses"
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-gray-200 transition-colors hover:bg-white/10"
          >
            Courses
          </Link>

          <Link
            to="/dashboard"
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-gray-200 transition-colors hover:bg-white/10"
          >
            Dashboard
          </Link>

          <Link
            to="/jobs"
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-gray-200 transition-colors hover:bg-white/10"
          >
            <Briefcase className="h-4 w-4 text-purple-400" />
            <span>Jobs</span>
          </Link>

          {/* Synergy Counter */}
          <div className="flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-950/40 px-3 py-1.5 text-xs font-bold text-amber-300">
            <Flame className="h-4 w-4 text-amber-500 fill-amber-500" />
            <span>{state.synergyPoints}</span>
          </div>

          {/* Theme Toggle Icon */}
          <button
            aria-label="Toggle theme"
            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Sun className="h-4 w-4" />
          </button>

          {/* User Profile Pill */}
          {user ? (
            <Link
              to="/profile"
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 pl-1.5 pr-3 py-1 text-xs text-gray-200 transition-colors hover:bg-white/10"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 text-[10px] font-bold text-white">
                <User className="h-3.5 w-3.5" />
              </div>
              <div className="hidden text-left md:block">
                <p className="font-bold leading-tight text-white text-[11px]">
                  {(user.user_metadata?.["full_name"] as string) || "My profile"}
                </p>
                <p className="text-[9px] text-gray-400 leading-none">{user.email}</p>
              </div>
            </Link>
          ) : (
            <Link
              to="/auth"
              className="rounded-full bg-[#6366F1] px-4 py-1.5 text-xs font-bold text-white transition-colors hover:bg-[#4F46E5]"
            >
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
