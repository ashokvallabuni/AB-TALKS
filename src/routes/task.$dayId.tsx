import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Github, Linkedin, Sparkles, Award } from "lucide-react";
import { useState } from "react";
import { useUserState } from "@/lib/user-store";
import { DAILY_TASKS } from "@/lib/abtalks-data";

export const Route = createFileRoute("/task/$dayId")({
  head: () => ({
    meta: [
      { title: "Day 1 Task Workspace | ABTalks" },
      { name: "description", content: "Submit your solution for Day 1 AI challenge task." },
    ],
  }),
  component: TaskWorkspacePage,
});

function TaskWorkspacePage() {
  const { dayId } = Route.useParams();
  const dayNumber = parseInt(dayId || "1", 10);
  const navigate = useNavigate();
  const { state, submitDayTask } = useUserState();

  const task = DAILY_TASKS.find((t) => t.day === dayNumber) || DAILY_TASKS[0];

  const existingSubmission = state.submissions[dayNumber];
  const [confirmed, setConfirmed] = useState(Boolean(existingSubmission));
  const [githubUrl, setGithubUrl] = useState(existingSubmission?.githubUrl || "");
  const [linkedinUrl, setLinkedinUrl] = useState(existingSubmission?.linkedinUrl || "");
  const [showCelebration, setShowCelebration] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmed) return;

    submitDayTask(dayNumber, githubUrl, linkedinUrl);
    setShowCelebration(true);
  };

  return (
    <div className="min-h-screen bg-[#07090E] pb-24 text-white">
      
      {/* Top Header Breadcrumb bar */}
      <div className="border-b border-white/10 bg-[#0F1422]/80 backdrop-blur-xl px-4 py-3">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>

          <span className="text-xs font-mono font-semibold text-purple-300">
            Today (IST): day {dayNumber}
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 pt-8 space-y-8">
        
        {/* Task Brief Container */}
        <div className="rounded-2xl border border-white/10 bg-[#0F1422] p-6 sm:p-10 space-y-6">
          <div>
            <h1 className="font-display text-2xl font-extrabold text-white sm:text-3xl">
              {task.title.split(":")[1] || task.title}
            </h1>
            <p className="mt-1 text-xs text-purple-400 font-semibold uppercase tracking-wider">
              Day {task.day} · {task.category}
            </p>
          </div>

          <div className="space-y-4 text-sm leading-relaxed text-gray-300 border-t border-white/10 pt-6">
            <div>
              <h3 className="font-bold text-white text-base">Welcome to Day {task.day} 🚀</h3>
            </div>

            <div>
              <h4 className="font-bold text-white">Context:</h4>
              <p className="mt-1 text-gray-400">{task.context}</p>
            </div>

            <div>
              <h4 className="font-bold text-white">Real-World Impact:</h4>
              <p className="mt-1 text-gray-400">{task.realWorldImpact}</p>
            </div>

            <div>
              <h4 className="font-bold text-white">What to do:</h4>
              <ul className="mt-2 space-y-1.5 list-disc list-inside text-gray-300">
                {task.whatToDo.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white">Submission:</h4>
              <ul className="mt-2 space-y-1.5 list-disc list-inside text-gray-300">
                {task.submissionRequirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Interactive Solution Submission Container */}
        <div className="rounded-2xl border border-purple-500/30 bg-[#0F1422] p-6 sm:p-8">
          <h2 className="font-display text-xl font-bold text-white">Submit your solution</h2>
          <p className="mt-1 text-xs text-gray-400">
            Confirm you completed today's task. GitHub and LinkedIn are optional proof for bonus synergy.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            
            {/* Confirmation Checkbox */}
            <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 cursor-pointer hover:bg-white/10 transition-colors">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="h-5 w-5 rounded border-gray-600 bg-gray-900 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-xs font-semibold text-gray-200">
                I confirm I have completed today's task.
              </span>
            </label>

            {/* Optional GitHub Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-gray-300 flex items-center gap-1.5">
                  <Github className="h-4 w-4 text-purple-400" /> GitHub URL
                </span>
                <span className="text-[10px] text-purple-400 font-bold">Optional · +5 synergy</span>
              </div>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="GitHub commit or repo URL"
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-xs text-white placeholder-gray-600 focus:border-purple-500 focus:outline-none"
              />
            </div>

            {/* Optional LinkedIn Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-gray-300 flex items-center gap-1.5">
                  <Linkedin className="h-4 w-4 text-indigo-400" /> LinkedIn URL
                </span>
                <span className="text-[10px] text-purple-400 font-bold">Optional · +8 synergy</span>
              </div>
              <input
                type="url"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                placeholder="https://www.linkedin.com/posts/..."
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-xs text-white placeholder-gray-600 focus:border-purple-500 focus:outline-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!confirmed}
              className={`w-full rounded-xl py-3.5 text-xs font-bold transition-all ${
                confirmed
                  ? "bg-purple-600 text-white hover:bg-purple-500 shadow-lg shadow-purple-900/40 cursor-pointer"
                  : "bg-gray-800 text-gray-500 cursor-not-allowed"
              }`}
            >
              Submit Day {dayNumber}
            </button>
          </form>
        </div>

      </div>

      {/* Celebratory Completion Modal */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-rise">
          <div className="max-w-md w-full rounded-2xl border border-purple-500/40 bg-[#0F1422] p-6 text-center space-y-4 shadow-2xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple-950/80 border border-purple-500/50 text-purple-300">
              <Sparkles className="h-8 w-8 animate-pulse" />
            </div>

            <h3 className="font-display text-2xl font-black text-white">Day {dayNumber} Completed! 🎉</h3>
            <p className="text-xs text-gray-300">
              Awesome work! Your proof-of-work submission has been recorded on ABTalks.
            </p>

            <div className="flex items-center justify-center gap-2 rounded-xl bg-purple-950/40 border border-purple-500/30 p-3 text-xs font-bold text-purple-200">
              <Award className="h-5 w-5 text-amber-400" />
              <span>Synergy points updated! Streak +1</span>
            </div>

            <button
              onClick={() => {
                setShowCelebration(false);
                navigate({ to: "/dashboard" });
              }}
              className="w-full rounded-xl bg-purple-600 py-3 text-xs font-bold text-white hover:bg-purple-500"
            >
              Back to Dashboard →
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
