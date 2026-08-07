import React, { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Users,
  Calendar,
  Flame,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  HelpCircle,
} from "lucide-react";
import { useUserState } from "@/lib/user-store";
import { FAQS, TRACKS, DAILY_TASKS, DayStatus } from "@/lib/abtalks-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Your 60-Day Journey | ABTalks Dashboard" },
      {
        name: "description",
        content:
          "Track your daily 60-day challenge progress, submit proof-of-work, and build your consistency streak.",
      },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { state } = useUserState();
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [selectedTileDay, setSelectedTileDay] = useState<number | null>(null);

  const activeTrack = TRACKS.find((t) => t.id === state.selectedTrack) || TRACKS[0];

  // Find current day task for active track
  const todayTask =
    DAILY_TASKS.find((t) => t.trackId === activeTrack.id && t.day === 1) || DAILY_TASKS[0];

  // Build array of 60 tiles matching the exact 6x10 grid in screenshots
  const tiles: Array<{ day: number; status: DayStatus }> = Array.from({ length: 60 }, (_, i) => {
    const day = i + 1;
    let status: DayStatus = "Future";
    if (state.completedDays.includes(day)) {
      status = "On time";
    } else if (day === 1) {
      status = "On time";
    }
    return { day, status };
  });

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[#07090E] pb-24 text-white">
      {/* Campus Ambassador Announcement Bar */}
      <div className="border-b border-purple-500/20 bg-[#16122C] px-4 py-2.5 text-center text-xs font-semibold text-purple-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-purple-400 shrink-0" />
            <span>Want to be a campus ambassador for your college?</span>
          </div>
          <a
            href="https://abtalks.in/ambassador"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-purple-300 hover:text-white underline font-normal"
          >
            Learn More
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pt-8 space-y-8">
        {/* Module 1: Your 60-Day Journey Contribution Matrix */}
        <section className="rounded-2xl border border-white/10 bg-[#0C0F1D] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4">
            <div>
              <h1 className="font-display text-2xl font-black text-white sm:text-3xl">
                Your 60-Day Journey
              </h1>
              <p className="mt-1 text-xs text-gray-400">
                {state.completedDays.length} days complete · Day 1 of {activeTrack?.totalDays || 60}
              </p>
            </div>
          </div>

          {/* 60 Tile Grid (6 rows x 10 cols) */}
          <div className="mt-6 flex justify-center sm:justify-start">
            <div className="grid grid-cols-10 gap-2.5 sm:gap-3 max-w-2xl">
              {tiles.map(({ day, status }) => (
                <button
                  key={day}
                  onClick={() => setSelectedTileDay(day)}
                  title={`Day ${day}: ${status}`}
                  className={`h-7 w-7 sm:h-9 sm:w-9 rounded-lg border transition-all hover:scale-105 flex items-center justify-center text-[10px] font-bold ${
                    status === "On time"
                      ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
                      : status === "Rejected"
                        ? "bg-purple-600/30 border-purple-500/50 text-purple-200"
                        : status === "Missed"
                          ? "bg-rose-500/20 border-rose-500/50 text-rose-300"
                          : status === "Missed - catch up"
                            ? "bg-amber-500/20 border-amber-500/50 text-amber-300"
                            : "bg-[#141829] border-white/10 text-transparent"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Selected Tile Detail Drawer */}
          {selectedTileDay && (
            <div className="mt-6 rounded-xl border border-purple-500/30 bg-purple-950/40 p-4 flex items-center justify-between text-xs animate-rise">
              <div>
                <span className="font-bold text-purple-300">Selected Day {selectedTileDay}:</span>{" "}
                <span className="text-gray-300">
                  {selectedTileDay === 1
                    ? todayTask.title
                    : `Day ${selectedTileDay} Challenge Brief`}
                </span>
              </div>
              <Link
                to={`/task/${selectedTileDay}`}
                className="rounded bg-purple-600 px-3 py-1.5 text-[11px] font-bold text-white hover:bg-purple-500"
              >
                Start Challenge →
              </Link>
            </div>
          )}

          {/* Status Color Legend */}
          <div className="mt-8 flex flex-wrap items-center gap-5 border-t border-white/10 pt-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#10B981]" />
              <span className="text-gray-300 text-xs">On time</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#8B5CF6]" />
              <span className="text-gray-300 text-xs">Rejected</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#EF4444]" />
              <span className="text-gray-300 text-xs">Missed</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#F59E0B]" />
              <span className="text-gray-300 text-xs">Missed - catch up</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#1E293B] border border-white/20" />
              <span className="text-gray-300 text-xs">Future</span>
            </div>
          </div>
        </section>

        {/* Module 2: Today's Task Hero Banner */}
        {todayTask && (
          <section className="rounded-2xl border border-white/10 bg-[#0C0F1D] p-6 sm:p-8">
            <div className="text-xs text-gray-400">
              <span className="font-bold text-white">Today's Task</span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">{todayTask.challengeLabel} · IST day 1</p>

            <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-6">
                <div className="flex flex-col items-center justify-center rounded-xl bg-purple-950/40 border border-purple-500/30 px-6 py-4">
                  <span className="font-display text-4xl font-black text-purple-300 leading-none">
                    1
                  </span>
                  <span className="text-[10px] font-extrabold uppercase text-purple-400 tracking-wider mt-1">
                    DAY
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300">
                      {todayTask.level}
                    </span>
                    <span className="text-xs text-gray-400">⏱️ {todayTask.estimatedTime}</span>
                  </div>

                  <h2 className="mt-3 font-display text-xl font-bold text-white sm:text-2xl">
                    {todayTask.title}
                  </h2>
                </div>
              </div>

              <Link
                to="/task/1"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#6366F1] px-6 py-3.5 text-xs font-bold text-white transition-all hover:bg-[#4F46E5] shrink-0 shadow-lg shadow-indigo-900/30"
              >
                <span>Start Today's Challenge</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        )}

        {/* Module 3: 4 Key Stat Cards matching screenshot 100% */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-[#0C0F1D] p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between text-gray-400">
              <span className="font-display text-4xl font-black text-white">1</span>
              <Calendar className="h-4 w-4 text-gray-400" />
            </div>
            <div className="mt-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                DAY 1 OF 60
              </p>
              <div className="mt-2 flex items-center justify-between">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                <div className="h-[2px] w-full bg-gray-800" />
                <span className="h-1.5 w-1.5 rounded-full bg-gray-700" />
              </div>
              <p className="mt-3 text-[10px] text-gray-500 leading-tight">
                Calendar progress (IST) from your start date
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0C0F1D] p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between text-gray-400">
              <span className="font-display text-4xl font-black text-white">
                {state.currentStreak}
              </span>
              <Flame className="h-4 w-4 text-amber-500" />
            </div>
            <div className="mt-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                CURRENT STREAK
              </p>
              <p className="mt-3 text-[10px] text-gray-500">Longest: {state.longestStreak}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0C0F1D] p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between text-gray-400">
              <span className="font-display text-4xl font-black text-white">
                {state.completedDays.length}
              </span>
              <CheckCircle className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="mt-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                DAYS COMPLETED
              </p>
              <p className="mt-3 text-[10px] text-gray-500">
                Out of {activeTrack?.totalDays || 60} challenge days
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0C0F1D] p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between text-gray-400">
              <span className="font-display text-4xl font-black text-white">0</span>
              <Users className="h-4 w-4 text-purple-400" />
            </div>
            <div className="mt-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                REFERRALS
              </p>
              <p className="mt-3 text-[10px] text-gray-500">
                Your code:{" "}
                <span className="font-mono text-gray-300 font-bold">{state.referralCode}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Module 4: Recent Activity Feed */}
        <section className="rounded-2xl border border-white/10 bg-[#0C0F1D] p-6">
          <h3 className="font-display text-base font-bold text-white">Recent activity</h3>
          <p className="text-xs text-gray-400 mt-0.5">Last 7 submissions</p>

          <div className="mt-4 border-t border-white/10 pt-4">
            {Object.keys(state.submissions).length === 0 ? (
              <p className="text-xs text-gray-400 py-1">
                No submissions yet. Complete Day 1 to get started.
              </p>
            ) : (
              <div className="space-y-3">
                {Object.values(state.submissions).map((sub) => (
                  <div
                    key={sub.day}
                    className="flex items-center justify-between rounded-xl bg-white/5 p-3 text-xs"
                  >
                    <div>
                      <span className="font-bold text-purple-300">Day {sub.day} Submission</span>
                      <span className="ml-2 text-gray-400">({sub.completedAt.slice(0, 10)})</span>
                    </div>
                    <span className="rounded bg-emerald-950 px-2.5 py-0.5 text-emerald-300 font-bold border border-emerald-500/30">
                      +{sub.synergyEarned} Synergy
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Module 5: Frequently Asked Questions Accordion Drawer */}
        <section className="rounded-2xl border border-white/10 bg-[#0C0F1D] p-6 sm:p-8">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <HelpCircle className="h-6 w-6 text-purple-400" />
            <div>
              <h3 className="font-display text-lg font-bold text-white">
                Frequently Asked Questions
              </h3>
              <p className="text-xs text-gray-400">Everything you need to know</p>
            </div>
          </div>

          <div className="mt-6 divide-y divide-white/10">
            {FAQS.map((faq) => (
              <div key={faq.id} className="py-4">
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="flex w-full items-center justify-between text-left text-xs font-semibold text-gray-200 hover:text-purple-300"
                >
                  <span>{faq.question}</span>
                  {openFaq === faq.id ? (
                    <ChevronUp className="h-4 w-4 text-purple-400 shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-500 shrink-0" />
                  )}
                </button>
                {openFaq === faq.id && (
                  <p className="mt-3 text-xs leading-relaxed text-gray-400 pl-2 border-l-2 border-purple-500/40">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 text-center text-xs text-gray-500 border-t border-white/10 pt-4">
            Still have questions? Reach out via the{" "}
            <a
              href="https://whatsapp.com"
              target="_blank"
              rel="noreferrer"
              className="text-purple-400 hover:underline"
            >
              WhatsApp community
            </a>{" "}
            or check the{" "}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="text-purple-400 hover:underline"
            >
              ABTalks on AI YouTube channel
            </a>
            .
          </div>
        </section>
      </div>
    </div>
  );
}
