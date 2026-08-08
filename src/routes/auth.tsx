import { useEffect, useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/abt-logo.png";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in to ABTalks – Track Your 60-Day Streak" },
      {
        name: "description",
        content:
          "Sign in to ABTalks to continue your 60-day coding challenge, submit daily proof-of-work, and track synergy points.",
      },
      { property: "og:title", content: "Sign in to ABTalks" },
      {
        property: "og:description",
        content: "Access your ABTalks dashboard, daily tasks, streak and synergy points.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate({ to: "/dashboard", replace: true });
  }, [loading, user, navigate]);

  const handleGoogle = async () => {
    setMessage(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setMessage("Google sign-in failed. Please try again.");
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/dashboard", replace: true });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMessage(null);
    if (mode === "signup") {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
          data: { full_name: fullName },
        },
      });
      setBusy(false);
      if (error) return setMessage(error.message);
      if (!data.session) return setMessage("Check your email to confirm your account.");
      navigate({ to: "/dashboard", replace: true });
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) return setMessage(error.message);
    navigate({ to: "/dashboard", replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#07090E] px-4 py-16 pb-28 text-white">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0C0F1D] p-6 sm:p-8"
      >
        <div className="flex items-center gap-3">
          <img src={logo} alt="ABTalks logo" width={40} height={40} className="h-10 w-10 rounded-xl" />
          <div>
            <h1 className="font-display text-xl font-black">
              {mode === "signin" ? "Welcome back" : "Create your account"}
            </h1>
            <p className="text-xs text-gray-400">Track your streak, synergy and submissions.</p>
          </div>
        </div>

        <button
          onClick={handleGoogle}
          className="mt-6 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-xs font-bold transition-colors hover:bg-white/10"
        >
          Continue with Google
        </button>

        <div className="my-5 flex items-center gap-3 text-[10px] uppercase tracking-widest text-gray-500">
          <span className="h-px flex-1 bg-white/10" /> or <span className="h-px flex-1 bg-white/10" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full name"
              className="w-full rounded-xl border border-white/10 bg-[#121629] px-4 py-3 text-xs placeholder-gray-500 focus:border-purple-500 focus:outline-none"
            />
          )}
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full rounded-xl border border-white/10 bg-[#121629] px-4 py-3 text-xs placeholder-gray-500 focus:border-purple-500 focus:outline-none"
          />
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-xl border border-white/10 bg-[#121629] px-4 py-3 text-xs placeholder-gray-500 focus:border-purple-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-xl bg-[#6366F1] py-3 text-xs font-bold text-white transition-colors hover:bg-[#4F46E5] disabled:opacity-60"
          >
            {mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>

        {message && <p className="mt-4 text-xs text-amber-300">{message}</p>}

        <p className="mt-6 text-center text-xs text-gray-400">
          {mode === "signin" ? "New to ABTalks?" : "Already a builder?"}{" "}
          <button
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="font-bold text-purple-300 hover:text-purple-200"
          >
            {mode === "signin" ? "Create an account" : "Sign in"}
          </button>
        </p>

        <p className="mt-4 text-center text-[11px] text-gray-500">
          <Link to="/" className="hover:text-gray-300">
            ← Back to home
          </Link>
        </p>
      </motion.div>
    </div>
  );
}