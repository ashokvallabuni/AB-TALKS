import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, MapPin, Building, Calendar, CheckCircle2, UserCheck, Flame, Award, ChevronDown, ChevronUp, Search, Filter } from "lucide-react";
import { JOBS_LIST, CANDIDATES_LIST, JobListing, Candidate } from "@/lib/abtalks-data";
import { useUserState } from "@/lib/user-store";

export const Route = createFileRoute("/jobs")({
  head: () => ({
    meta: [
      { title: "Partner Jobs & Proof-of-Work Candidate Directory | ABTalks" },
      { name: "description", content: "Discover open developer roles and explore verified candidate proof-of-work signals on ABTalks." },
    ],
  }),
  component: JobsPage,
});

function JobsPage() {
  const { state } = useUserState();
  const [activeTab, setActiveTab] = useState<"jobs" | "talent">("jobs");

  // Jobs filter state
  const [filterType, setFilterType] = useState<string>("All");
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [applied, setApplied] = useState(false);

  // Candidate Talent state
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  const filteredJobs = JOBS_LIST.filter((j) => {
    if (filterType === "Full-time") return j.type === "Full-time";
    if (filterType === "Internship") return j.type === "Internship";
    if (filterType === "Remote") return j.mode === "Remote";
    return true;
  });

  const filteredCandidates = CANDIDATES_LIST.filter((c) => {
    const matchesSearch = c.member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.member.jobRole.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "All" || c.member.jobRole.toLowerCase().includes(roleFilter.toLowerCase());
    return matchesSearch && matchesRole;
  });

  const handleApply = () => {
    setApplied(true);
    setTimeout(() => {
      setApplied(false);
      setSelectedJob(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#07090E] pb-24 text-white">
      <div className="mx-auto max-w-6xl px-4 pt-8 space-y-8">
        
        {/* Header Title & Top Navigation Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h1 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
              Career & Talent Hub
            </h1>
            <p className="mt-1 text-xs text-gray-400">
              Verified proof-of-work hiring network for builders and hiring partners.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-white/5 p-1 border border-white/10 self-start sm:self-auto">
            <button
              onClick={() => setActiveTab("jobs")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                activeTab === "jobs"
                  ? "bg-purple-600 text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Briefcase className="h-4 w-4" />
              <span>Open Roles ({JOBS_LIST.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("talent")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                activeTab === "talent"
                  ? "bg-purple-600 text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <UserCheck className="h-4 w-4" />
              <span>Verified Candidates ({CANDIDATES_LIST.length})</span>
            </button>
          </div>
        </div>

        {/* TAB 1: OPEN POSITIONS */}
        {activeTab === "jobs" && (
          <div className="space-y-6 animate-rise">
            {/* Filter Pills */}
            <div className="flex items-center gap-2">
              {["All", "Full-time", "Internship", "Remote"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilterType(f)}
                  className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                    filterType === f
                      ? "bg-purple-600 text-white"
                      : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Job Listings Cards Stack */}
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0F1422] p-6 transition-all hover:border-purple-500/40 hover:shadow-xl sm:flex-row sm:items-center"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <h3 className="font-display text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                        {job.title}
                      </h3>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          job.type === "Full-time"
                            ? "bg-purple-950 text-purple-300 border border-purple-500/30"
                            : "bg-indigo-950 text-indigo-300 border border-indigo-500/30"
                        }`}
                      >
                        {job.type}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Building className="h-3.5 w-3.5 text-gray-500" />
                        {job.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-gray-500" />
                        {job.location} ({job.mode})
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-gray-500" />
                        {job.postedDate}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 sm:mt-0">
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="rounded-xl border border-purple-500/30 bg-purple-950/40 px-5 py-2.5 text-xs font-bold text-purple-200 transition-colors hover:bg-purple-600 hover:text-white"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: VERIFIED CANDIDATES DIRECTORY */}
        {activeTab === "talent" && (
          <div className="space-y-6 animate-rise">
            {/* Candidate Search & Role Filters */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3.5 top-3 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by candidate name or role..."
                  className="w-full rounded-xl border border-white/10 bg-[#0F1422] pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <Filter className="h-4 w-4 text-gray-500" />
                {["All", "AI Engineer", "Software Engineer", "Data Engineer", "DevOps"].map((r) => (
                  <button
                    key={r}
                    onClick={() => setRoleFilter(r)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                      roleFilter === r
                        ? "bg-purple-600 text-white"
                        : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Candidate Cards Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCandidates.map((cand) => (
                <div
                  key={cand.member.id}
                  onClick={() => setSelectedCandidate(cand)}
                  className="group cursor-pointer rounded-2xl border border-white/10 bg-[#0F1422] p-5 transition-all hover:-translate-y-1 hover:border-purple-500/50 hover:shadow-xl space-y-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                        {cand.member.name}
                      </h3>
                      <p className="text-xs text-purple-400 font-medium">{cand.member.jobRole}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">
                        {cand.member.yearsExperience} yrs exp · {cand.member.education}
                      </p>
                    </div>
                    <span className="rounded bg-emerald-950 border border-emerald-500/40 px-2 py-0.5 text-[9px] font-bold text-emerald-300">
                      {cand.member.status}
                    </span>
                  </div>

                  {/* Signals Bar */}
                  <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-3 text-center">
                    <div className="rounded-lg bg-white/5 p-2">
                      <p className="font-display text-base font-black text-amber-400">{cand.signals.commitDays}</p>
                      <p className="text-[9px] text-gray-400">Commit Days</p>
                    </div>
                    <div className="rounded-lg bg-white/5 p-2">
                      <p className="font-display text-base font-black text-purple-300">{cand.signals.missionsCompleted}</p>
                      <p className="text-[9px] text-gray-400">Missions</p>
                    </div>
                    <div className="rounded-lg bg-white/5 p-2">
                      <p className="font-display text-base font-black text-emerald-400">{cand.signals.missionsFirstTry}</p>
                      <p className="text-[9px] text-gray-400">First Try</p>
                    </div>
                  </div>

                  <button className="w-full rounded-xl bg-purple-950/60 border border-purple-500/30 py-2 text-[11px] font-bold text-purple-200 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                    View Proof-of-Work →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Quick Apply Modal for Job Listings */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-rise">
          <div className="max-w-lg w-full rounded-2xl border border-white/10 bg-[#0F1422] p-6 space-y-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-display text-xl font-bold text-white">{selectedJob.title}</h3>
                <p className="text-xs text-purple-300 font-semibold">{selectedJob.company} · {selectedJob.location}</p>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="text-gray-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed">{selectedJob.description}</p>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Requirements</h4>
              <ul className="space-y-1 text-xs text-gray-400 list-disc list-inside">
                {selectedJob.requirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-purple-500/30 bg-purple-950/40 p-4 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">Your ABTalks Proof-of-Work Profile</span>
                <span className="text-purple-300 font-mono font-bold">{state.synergyPoints} Synergy</span>
              </div>
              <p className="text-[11px] text-gray-400">
                Your 60-day challenge streak ({state.completedDays.length} days completed) will be automatically attached to your application.
              </p>
            </div>

            <button
              onClick={handleApply}
              disabled={applied}
              className="w-full rounded-xl bg-purple-600 py-3 text-xs font-bold text-white hover:bg-purple-500 flex items-center justify-center gap-2"
            >
              {applied ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Application Submitted!</span>
                </>
              ) : (
                <span>Apply with ABTalks Proof-of-Work</span>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Detailed Candidate Proof-of-Work Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-rise">
          <div className="max-w-2xl w-full max-h-[85vh] overflow-y-auto rounded-2xl border border-purple-500/40 bg-[#0F1422] p-6 space-y-6 shadow-2xl">
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-display text-2xl font-black text-white">{selectedCandidate.member.name}</h3>
                  <span className="rounded bg-purple-950 text-purple-300 border border-purple-500/30 px-2 py-0.5 text-xs font-bold">
                    {selectedCandidate.member.id}
                  </span>
                </div>
                <p className="text-xs text-purple-400 font-bold mt-1">
                  {selectedCandidate.member.jobRole} · {selectedCandidate.member.yearsExperience} yrs experience
                </p>
                <p className="text-[11px] text-gray-400">{selectedCandidate.member.education}</p>
              </div>

              <button
                onClick={() => setSelectedCandidate(null)}
                className="text-gray-400 hover:text-white text-xl font-bold"
              >
                ✕
              </button>
            </div>

            {/* Candidate Signals Grid */}
            <div className="grid grid-cols-3 gap-3 rounded-xl border border-white/10 bg-black/40 p-4 text-center">
              <div>
                <p className="font-display text-2xl font-black text-amber-400">{selectedCandidate.signals.commitDays}</p>
                <p className="text-[10px] text-gray-400">Total Commit Days</p>
              </div>
              <div>
                <p className="font-display text-2xl font-black text-purple-300">{selectedCandidate.signals.missionsCompleted}</p>
                <p className="text-[10px] text-gray-400">Missions Completed</p>
              </div>
              <div>
                <p className="font-display text-2xl font-black text-emerald-400">{selectedCandidate.signals.missionsFirstTry}</p>
                <p className="text-[10px] text-gray-400">First-Try Passes</p>
              </div>
            </div>

            {/* Mission Log */}
            <div>
              <h4 className="font-display text-sm font-bold text-white mb-3">
                Mission Execution Breakdown ({selectedCandidate.missions.length} Missions Logged)
              </h4>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {selectedCandidate.missions.map((m, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-xl bg-white/5 px-3.5 py-2.5 text-xs"
                  >
                    <div>
                      <span className="font-mono text-purple-300 font-bold mr-2">Day {m.day}</span>
                      <span className="text-gray-200 font-medium">{m.title}</span>
                    </div>
                    {m.skipped ? (
                      <span className="rounded bg-gray-800 px-2 py-0.5 text-[10px] text-gray-400 font-semibold">Skipped</span>
                    ) : m.passed ? (
                      <span className="rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold">
                        Passed ({m.attempts} {m.attempts === 1 ? "try" : "attempts"})
                      </span>
                    ) : (
                      <span className="rounded bg-rose-950 text-rose-300 border border-rose-500/30 px-2 py-0.5 text-[10px] font-bold">
                        Failed ({m.attempts} attempts)
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-4">
              <button
                onClick={() => setSelectedCandidate(null)}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-bold text-gray-300 hover:bg-white/10"
              >
                Close
              </button>
              <button
                onClick={() => alert(`Interview request sent for candidate ${selectedCandidate.member.name} (${selectedCandidate.member.id})!`)}
                className="rounded-xl bg-purple-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-purple-500"
              >
                Request Fast-Track Interview
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
