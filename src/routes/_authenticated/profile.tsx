import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Flame, Award, LogOut, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { TRACKS } from "@/lib/abtalks-data";

export const Route = createFileRoute("/_authenticated/profile")({
  head: () => ({
    meta: [
      { title: "Your Profile – ABTalks Builder Account" },
      {
        name: "description",
        content:
          "Manage your ABTalks builder profile: active challenge track, referral code, synergy points and submitted daily tasks.",
      },
      { property: "og:title", content: "Your ABTalks Profile" },
      {
        property: "og:description",
        content: "Active track, referral code, synergy points and daily submissions.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ProfilePage,
});

type ProfileRow = {
  full_name: string | null;
  avatar_url: string | null;
  selected_track: string;
  referral_code: string;
};

type SubmissionRow = {
  id: string;
  day: number;
  track_id: string;
  github_url: string | null;
  linkedin_url: string | null;
  synergy_earned: number;
};

function ProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [submissions, setSubmissions] = useState<SubmissionRow[]>([]);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    if (!user) return;
    void (async () => {
      const { data } = await supabase
        .from("profiles")
        .select("full_name, avatar_url, selected_track, referral_code")
        .eq("id", user.id)
        .maybeSingle();
      if (data) {
        setProfile(data);
        setName(data.full_name ?? "");
      }
      const { data: subs } = await supabase
        .from("submissions")
        .select("id, day, track_id, github_url, linkedin_url, synergy_earned")
        .order("day", { ascending: true });
      setSubmissions(subs ?? []);
    })();
  }, [user]);

  const synergy = submissions.reduce((sum, s) => sum + s.synergy_earned, 0);

  const save = async (patch: Partial<ProfileRow>) => {
    if (!user) return;
    setSaving(true);
    await supabase.from("profiles").update(patch).eq("id", user.id);
    setProfile((prev) => (prev ? { ...prev, ...patch } : prev));
    setSaving(false);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  const initials = (name || user?.email || "AB").slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-[#07090E] pb-28 text-white">
      <div className="mx-auto max-w-3xl space-y-6 px-4 pt-8">
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-white/10 bg-[#0C0F1D] p-6 sm:p-8"
        >
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 font-display text-lg font-black">
                {initials}
              </div>
              <div className="min-w-0">
                <h1 className="truncate font-display text-xl font-black">
                  {profile?.full_name || "ABTalks builder"}
                </h1>
                <p className="truncate text-xs text-gray-400">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={signOut}
              className="flex shrink-0 items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold hover:bg-white/10"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <Stat icon={<Flame className="h-4 w-4 text-amber-400" />} label="Synergy" value={synergy} />
            <Stat
              icon={<CheckCircle2 className="h-4 w-4 text-emerald-400" />}
              label="Days completed"
              value={submissions.length}
            />
            <Stat
              icon={<Award className="h-4 w-4 text-purple-300" />}
              label="Referral code"
              value={profile?.referral_code ?? "—"}
            />
          </div>
        </motion.section>

        <section className="rounded-2xl border border-white/10 bg-[#0C0F1D] p-6 sm:p-8">
          <h2 className="font-display text-lg font-bold">Account details</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wide text-gray-400">
                Display name
              </label>
              <div className="mt-1.5 flex gap-2">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#121629] px-4 py-3 text-xs focus:border-purple-500 focus:outline-none"
                />
                <button
                  onClick={() => void save({ full_name: name })}
                  disabled={saving}
                  className="shrink-0 rounded-xl bg-[#6366F1] px-4 text-xs font-bold hover:bg-[#4F46E5] disabled:opacity-60"
                >
                  Save
                </button>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wide text-gray-400">
                Active track
              </label>
              <select
                value={profile?.selected_track ?? "claude-challenge"}
                onChange={(e) => void save({ selected_track: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#121629] px-4 py-3 text-xs focus:border-purple-500 focus:outline-none"
              >
                {TRACKS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-[#0C0F1D] p-6 sm:p-8">
          <h2 className="font-display text-lg font-bold">Your submissions</h2>
          {submissions.length === 0 ? (
            <p className="mt-3 text-xs text-gray-400">
              No submissions yet. Complete today&apos;s task to start your streak.
            </p>
          ) : (
            <ul className="mt-4 space-y-2">
              {submissions.map((s) => (
                <li
                  key={s.id}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-[#121629] px-4 py-3 text-xs"
                >
                  <span className="font-bold">Day {s.day}</span>
                  <span className="text-gray-400">+{s.synergy_earned} synergy</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#121629] p-4">
      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-gray-400">
        {icon}
        {label}
      </div>
      <p className="mt-1.5 font-display text-xl font-black">{value}</p>
    </div>
  );
}