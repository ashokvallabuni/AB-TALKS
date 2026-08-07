import React, { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Users, Calendar, Flame, CheckCircle, ChevronDown, ChevronUp, ArrowRight, HelpCircle } from "lucide-react";
import { useUserState } from "@/lib/user-store";
import { FAQS, TRACKS, DAILY_TASKS, DayStatus } from "@/lib/abtalks-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Your 60-Day Journey | ABTalks Dashboard" },
      {
        name: "description",
        content: "Track your daily 60-day challenge progress, submit proof-of-work, and build your consistency streak.",
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
  const todayTask = DAILY_TASKS[0];

  // Build array of 60 tiles with explicit DayStatus type
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
      <div className="border-b border-purple-500/20 bg-purple-950/50 px-4 py-2.5 text-center text-xs font-semibold text-purple-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-purple-400 shrink-0" />
            <span>Want to be a campus ambassador for your college?</span>
          </div>
          <a
            href="https://abtalks.in/ambassador"
            target="_blank"
            rel="noreferrer"
            className="rounded bg-purple-600/60 px-3 py-1 text-[11px] font-bold text-white transition-colors hover:bg-purple-600"
          >
            Learn More
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pt-8 space-y-8">
        
        {/* Module 1: 60-Day Journey Contribution Matrix */}
        <section className="rounded-2xl border border-white/10 bg-[#0F1422] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
            <div>
              <h1 className="font-display text-2xl font-extrabold text-white sm:text-3xl">
                Your 60-Day Journey
              </h1>
              <p className="mt-1 text-xs text-gray-400">
                {state.completedDays.length} days complete · Day 1 of {activeTrack?.totalDays || 60}
              </p>
            </div>
          </div>

          {/* 60 Tile Heatmap Grid */}
          <div className="mt-6 grid grid-cols-6 sm:grid-cols-10 gap-2 sm:gap-2.5">
            {tiles.map(({ day, status }) => (
              <button
                key={day}
                onClick={() => setSelectedTileDay(day)}
                title={`Day ${day}: ${status}`}
                className={`aspect-square rounded-lg border transition-all hover:scale-110 flex items-center justify-center text-[10px] font-bold ${
                  status === "On time"
                    ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
                    : status === "Rejected"
                    ? "bg-purple-600/30 border-purple-500/50 text-purple-200"
                    : status === "Missed"
                    ? "bg-rose-500/20 border-rose-500/50 text-rose-300"
                    : status === "Missed - catch up"
                    ? "bg-amber-500/20 border-amber-500/50 text-amber-300"
                    : "bg-gray-900/60 border-white/10 text-gray-600"
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Heatmap Tile Detail Modal / Popup */}
          {selectedTileDay && (
            <div className="mt-4 rounded-xl border border-purple-500/30 bg-purple-950/40 p-4 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-purple-300">Selected Day {selectedTileDay}:</span>{" "}
                <span className="text-gray-300">
                  {selectedTileDay === 1
                    ? "Day 1: Claude Setup & Your AI Personality Profile"
                    : `Upcoming Challenge Task for Day ${selectedTileDay}`}
                </span>
              </div>
              <Link
                to={`/task/${selectedTileDay}`}
                className="rounded bg-purple-600 px-3 py-1 text-[11px] font-bold text-white hover:bg-purple-500"
              >
                Open Task →
              </Link>
            </div>
          )}

          {/* Status Color Legend */}
          <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-white/10 pt-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded bg-emerald-500" />
              <span className="text-gray-400">On time</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded bg-purple-600" />
              <span className="text-gray-400">Rejected</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded bg-rose-500" />
              <span className="text-gray-400">Missed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded bg-amber-500" />
              <span className="text-gray-400">Missed - catch up</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded bg-gray-800 border border-white/10" />
              <span className="text-gray-400">Future</span>
            </div>
          </div>
        </section>

        {/* Module 2: Today's Task Hero Banner */}
        {todayTask && (
          <section className="rounded-2xl border border-purple-500/30 bg-[#0F1422] p-6 sm:p-8">
            <div className="text-xs text-gray-400">
              <span className="font-bold text-white uppercase">Today's Task</span> · {activeTrack?.title || "Claude Challenge"} · IST day 1
            </div>

            <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-6">
                <div className="flex flex-col items-center justify-center rounded-2xl border border-purple-500/40 bg-purple-950/60 px-6 py-4">
                  <span className="font-display text-4xl font-black text-purple-300">1</span>
                  <span className="text-[10px] font-bold uppercase text-purple-400">DAY</span>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                      {todayTask.level}
                    </span>
                    <span className="text-xs text-gray-400">⏱️ {todayTask.estimatedTime}</span>
                  </div>

                  <h2 className="mt-2 font-display text-xl font-bold text-white sm:text-2xl">
                    {todayTask.title}
                  </h2>
                </div>
              </div>

              <Link
                to="/task/1"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 py-3.5 text-sm font-bold text-white transition-transform hover:scale-105 hover:bg-purple-500 shrink-0"
              >
                <span>Start Today's Challenge</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        )}

        {/* Module 3: 4 Key Stat Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          
          <div className="rounded-2xl border border-white/10 bg-[#0F1422] p-5">
            <div className="flex items-center justify-between text-gray-400">
              <span className="text-[10px] font-bold uppercase tracking-wider">DAY 1 OF 60</span>
              <Calendar className="h-4 w-4 text-purple-400" />
            </div>
            <p className="mt-3 font-display text-3xl font-black text-white">1</p>
            <div className="mt-3 h-1.5 w-full rounded-full bg-gray-800">
              <div className="h-full w-[2%] rounded-full bg-purple-500" />
            </div>
            <p className="mt-2 text-[10px] text-gray-400">Calendar progress (IST) from your start date</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0F1422] p-5">
            <div className="flex items-center justify-between text-gray-400">
              <span className="text-[10px] font-bold uppercase tracking-wider">CURRENT STREAK</span>
              <Flame className="h-4 w-4 text-amber-500 fill-amber-500" />
            </div>
            <p className="mt-3 font-display text-3xl font-black text-white">{state.currentStreak}</p>
            <p className="mt-4 text-[10px] text-gray-400">Longest: {state.longestStreak}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0F1422] p-5">
            <div className="flex items-center justify-between text-gray-400">
              <span className="text-[10px] font-bold uppercase tracking-wider">DAYS COMPLETED</span>
              <CheckCircle className="h-4 w-4 text-emerald-400" />
            </div>
            <p className="mt-3 font-display text-3xl font-black text-white">{state.completedDays.length}</p>
            <p className="mt-4 text-[10px] text-gray-400">Out of {activeTrack?.totalDays || 60} challenge days</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0F1422] p-5">
            <div className="flex items-center justify-between text-gray-400">
              <span className="text-[10px] font-bold uppercase tracking-wider">REFERRALS</span>
              <Users className="h-4 w-4 text-indigo-400" />
            </div>
            <p className="mt-3 font-display text-3xl font-black text-white">0</p>
            <p className="mt-4 text-[10px] text-gray-400">Your code: <span className="font-mono text-purple-300 font-bold">{state.referralCode}</span></p>
          </div>

        </div>

        {/* Module 4: Recent Activity Feed */}
        <section className="rounded-2xl border border-white/10 bg-[#0F1422] p-6">
          <h3 className="font-display text-base font-bold text-white">Recent activity</h3>
          <p className="text-xs text-gray-400">Last 7 submissions</p>

          <div className="mt-4 border-t border-white/10 pt-4">
            {Object.keys(state.submissions).length === 0 ? (
              <p className="text-xs text-gray-500 py-2">
                No submissions yet. Complete Day 1 to get started.
              </p>
            ) : (
              <div className="space-y-3">
                {Object.values(state.submissions).map((sub) => (
                  <div key={sub.day} className="flex items-center justify-between rounded-xl bg-white/5 p-3 text-xs">
                    <div>
                      <span className="font-bold text-purple-300">Day {sub.day} Submission</span>
                      <span className="ml-2 text-gray-400">({sub.completedAt.slice(0, 10)})</span>
                    </div>
                    <span className="rounded bg-emerald-950 px-2 py-0.5 text-emerald-300 font-bold">
                      +{sub.synergyEarned} Synergy
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Module 5: Frequently Asked Questions Accordion Drawer */}
        <section className="rounded-2xl border border-white/10 bg-[#0F1422] p-6 sm:p-8">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <HelpCircle className="h-6 w-6 text-purple-400" />
            <div>
              <h3 className="font-display text-lg font-bold text-white">Frequently Asked Questions</h3>
              <p className="text-xs text-gray-400">Everything you need to know</p>
            </div>
          </div>

          <div className="mt-6 divide-y divide-white/10">
            {FAQS.map((faq) => (
              <div key={faq.id} className="py-4">
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="flex w-full items-center justify-between text-left text-sm font-semibold text-gray-200 hover:text-purple-300"
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
            Still have questions? Reach out via the <a href="https://whatsapp.com" target="_blank" rel="noreferrer" className="text-purple-400 hover:underline">WhatsApp community</a> or check the <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-purple-400 hover:underline">ABTalks on AI YouTube channel</a>.
          </div>
        </section>

      </div>
    </div>
  );
}