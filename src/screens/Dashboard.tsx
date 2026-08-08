import { useMemo } from 'react';
import { motion } from 'framer-motion';
import data from '@/data.json';
import AnimatedButton from '@/components/AnimatedButton';

const buttonGlow =
  'relative overflow-hidden rounded-3xl bg-[#11131A] px-5 py-3 font-semibold text-white shadow-button-glow transition duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(99,102,241,0.35)]';

const cellStyles = {
  complete: 'bg-[#6D28D9] shadow-[0_0_20px_rgba(99,102,241,0.3)]',
  today: 'bg-[#06B6D4] shadow-[0_0_20px_rgba(6,182,212,0.35)]',
  upcoming: 'bg-white/5 border border-white/10',
};

type HeatmapCell = {
  day: number;
  status: 'complete' | 'today' | 'upcoming';
};

function Heatmap() {
  const cells = useMemo(() => data.heatmap.cells, []);

  return (
    <div className="grid grid-cols-10 gap-2 rounded-[32px] border border-white/10 bg-[rgba(255,255,255,0.04)] p-3 backdrop-blur-[16px] shadow-glass-soft">
      {cells.map((cell: HeatmapCell) => (
        <button
          key={cell.day}
          type="button"
          className={`h-9 w-9 rounded-2xl transition duration-300 ${cellStyles[cell.status]}`}
          aria-label={`Day ${cell.day} ${cell.status}`}
        >
          {cell.status === 'today' ? (
            <span className="flex h-full w-full items-center justify-center rounded-2xl border border-cyan-300/40 text-[10px] font-semibold text-cyan-100">
              {cell.day}
            </span>
          ) : null}
        </button>
      ))}
    </div>
  );
}

function ProgressRing({ value }: { value: number }) {
  const radius = 44;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <svg className="h-28 w-28" viewBox={`0 0 ${radius * 2} ${radius * 2}`}>
      <defs>
        <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
      <circle
        stroke="rgba(255,255,255,0.08)"
        fill="transparent"
        strokeWidth={stroke}
        cx={radius}
        cy={radius}
        r={normalizedRadius}
      />
      <circle
        stroke="url(#ringGradient)"
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={strokeDashoffset}
        cx={radius}
        cy={radius}
        r={normalizedRadius}
        transform={`rotate(-90 ${radius} ${radius})`}
      />
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="text-sm font-semibold fill-white">
        {value}%
      </text>
    </svg>
  );
}

export default function Dashboard() {
  const dashboard = data.dashboard;

  return (
    <div className="min-h-screen bg-canvas px-4 pb-24 text-white">
      <div className="mx-auto max-w-[390px] pt-6">
        <header className="rounded-[36px] border border-white/10 bg-[rgba(255,255,255,0.04)] p-5 shadow-glass-soft backdrop-blur-[16px]">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-300/70">ABTalks</p>
              <h1 className="mt-3 text-2xl font-semibold leading-tight text-white">
                Talent isn’t the problem.
                <span className="block bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent">
                  Proof is.
                </span>
              </h1>
            </div>
            <div className="rounded-3xl bg-white/5 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200 shadow-neon-glow">
              Live Builders
            </div>
          </div>
          <p className="text-xs leading-5 text-gray-400">
            60 days of building in public, daily proof posts, and recruiter visibility designed for Indian college students.
          </p>
        </header>

        <section className="mt-5 rounded-[36px] border border-white/10 bg-[rgba(255,255,255,0.05)] p-5 shadow-glass-soft backdrop-blur-[16px]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-gray-400">Streak tracker</p>
              <h2 className="mt-2 text-xl font-semibold text-white">Day {dashboard.currentDay}</h2>
            </div>
            <div className="rounded-3xl bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-100 ring-1 ring-cyan-300/20">
              {dashboard.stats.synergyPoints} SP
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-[1.05fr_1fr]">
            <div className="rounded-[28px] border border-white/10 bg-[rgba(255,255,255,0.05)] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-[#11131A] shadow-[0_0_20px_rgba(99,102,241,0.22)]">
                  <span className="text-lg font-semibold text-cyan-200">{dashboard.stats.currentStreak}</span>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-gray-400">Current streak</p>
                  <p className="mt-1 text-sm font-medium text-white">{dashboard.stats.currentStreak} days</p>
                </div>
              </div>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-[rgba(255,255,255,0.05)] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-[#11131A] shadow-[0_0_20px_rgba(99,102,241,0.22)]">
                  <span className="text-lg font-semibold text-violet-300">{dashboard.stats.completedDays}</span>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-gray-400">Days completed</p>
                  <p className="mt-1 text-sm font-medium text-white">{dashboard.stats.completedDays} / 60</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-[32px] border border-white/10 bg-[rgba(255,255,255,0.04)] p-4 shadow-neon-glow">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-gray-400">Today’s task</p>
                <h3 className="mt-2 text-lg font-semibold text-white">{dashboard.currentTask.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-400">{dashboard.currentTask.completionText}</p>
              </div>
              <div className="rounded-3xl bg-white/5 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-cyan-100">
                {dashboard.currentTask.difficulty}
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center">
              <div className="flex items-center justify-center rounded-[28px] bg-[#08090C] p-4 shadow-[0_0_28px_rgba(6,182,212,0.15)]">
                <ProgressRing value={dashboard.currentTask.progress} />
              </div>
              <div className="flex-1 space-y-3">
                <div className="rounded-3xl border border-white/10 bg-[#11131A]/70 p-3">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-gray-400">Estimated time</p>
                  <p className="mt-2 text-sm font-medium text-white">{dashboard.currentTask.estimatedTime}</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-[#11131A]/70 p-3">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-gray-400">Tags</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {dashboard.currentTask.tags.map((tag) => (
                      <span key={tag} className="rounded-2xl bg-white/5 px-3 py-1 text-[11px] text-cyan-100">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <AnimatedButton className="w-full">Record proof</AnimatedButton>
                  <AnimatedButton className="w-full bg-transparent text-cyan-200 ring-1 ring-cyan-300/20 shadow-none hover:bg-white/5">
                    View streak shield
                  </AnimatedButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-5 rounded-[36px] border border-white/10 bg-[rgba(255,255,255,0.05)] p-5 shadow-glass-soft backdrop-blur-[16px]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-gray-400">Streak Shield</p>
              <h3 className="mt-2 text-lg font-semibold text-white">Emergency protection</h3>
            </div>
            <div className="rounded-3xl bg-[#11131A] px-3 py-2 text-[11px] text-cyan-200 ring-1 ring-cyan-300/20">
              {dashboard.shield.health}% health
            </div>
          </div>

          <div className="mt-4 grid gap-3">
            {dashboard.shield.inventory.map((item) => (
              <div key={item.id} className="rounded-3xl border border-white/10 bg-[#11131A]/80 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">{item.name}</p>
                    <p className="mt-1 text-xs text-gray-400">{item.description}</p>
                  </div>
                  <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold text-cyan-100">
                    {item.count} left
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-5 rounded-[36px] border border-white/10 bg-[rgba(255,255,255,0.05)] p-5 shadow-glass-soft backdrop-blur-[16px]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-gray-400">60-day heatmap</p>
              <h2 className="mt-2 text-lg font-semibold text-white">Proof cadence</h2>
            </div>
            <div className="rounded-3xl bg-white/5 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-cyan-100">
              {dashboard.currentDay} / 60
            </div>
          </div>
          <div className="mt-4">
            <Heatmap />
          </div>
        </section>
      </div>
    </div>
  );
}
