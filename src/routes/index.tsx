import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Users, FolderGit2, Briefcase, GraduationCap, Code2, Trophy, MessageSquare, ChevronLeft, ChevronRight, Instagram, Linkedin, Youtube, Twitter, Disc as Discord } from "lucide-react";
import React, { useState } from "react";
import { TRACKS, TESTIMONIALS } from "@/lib/abtalks-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ABTalks | 60-Day Coding Challenge, AI Cohorts & Hackathons" },
      {
        name: "description",
        content: "Join ABTalks to build daily coding habits, deploy AI projects, compete in 48-hour hackathons, and connect with top hiring partners.",
      },
      { property: "og:title", content: "ABTalks | 60-Day Coding Challenge, AI Cohorts & Hackathons" },
      {
        property: "og:description",
        content: "Join ABTalks to build daily coding habits, deploy AI projects, compete in 48-hour hackathons, and connect with top hiring partners.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.abtalks.in" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.abtalks.in" }],
  }),
  component: IndexPage,
});

function IndexPage() {
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);

  const prevTestimonial = () => {
    setActiveTestimonialIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setActiveTestimonialIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-white">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-[#07090E] to-[#07090E] pointer-events-none" />
        
        <div className="relative mx-auto max-w-5xl px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-950/40 px-4 py-1.5 text-xs font-semibold text-purple-300 backdrop-blur-md">
            Build in public. Grow together.
          </div>

          <h1 className="mt-8 font-display text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.1]">
            Code consistently. <br />
            Post publicly. <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
              Get noticed.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base text-gray-400 sm:text-lg">
            Join India's coding community for college students to learn, build, and accelerate their careers through visible proof of work.
          </p>
        </div>

        {/* 4 Cohort / Track Cards Grid */}
        <div className="mx-auto mt-16 max-w-6xl px-4">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TRACKS.map((track) => (
              <div
                key={track.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0F1422] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-900/20"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`inline-flex rounded-md px-2.5 py-1 text-[11px] font-semibold ${
                        track.badgeType === "primary"
                          ? "bg-purple-900/60 text-purple-200 border border-purple-500/40"
                          : track.badgeType === "secondary"
                          ? "bg-indigo-900/60 text-indigo-200 border border-indigo-500/40"
                          : track.badgeType === "accent"
                          ? "bg-amber-900/60 text-amber-200 border border-amber-500/40"
                          : "bg-gray-800 text-gray-400"
                      }`}
                    >
                      {track.status}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-gray-500 group-hover:text-purple-400 transition-colors" />
                  </div>

                  <h3 className="mt-5 font-display text-xl font-bold text-white group-hover:text-purple-200 transition-colors">
                    {track.title}
                  </h3>

                  <p className="mt-3 text-xs leading-relaxed text-gray-400">
                    {track.description}
                  </p>
                </div>

                <div className="mt-8">
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {track.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-medium text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    to="/dashboard"
                    className={`block w-full rounded-xl py-3 text-center text-xs font-bold transition-all ${
                      track.badgeType === "accent"
                        ? "bg-amber-500 text-black hover:bg-amber-400"
                        : track.badgeType === "muted"
                        ? "bg-purple-600/30 text-purple-200 hover:bg-purple-600/50"
                        : "bg-purple-600 text-white hover:bg-purple-500"
                    }`}
                  >
                    {track.ctaText}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Stats Banner */}
      <section className="mx-auto max-w-5xl px-4 py-8">
        <div className="rounded-2xl border border-white/10 bg-[#0F1422]/80 backdrop-blur-xl p-8">
          <div className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
            
            <div className="flex items-center justify-center gap-4 py-4 sm:py-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-400">
                <Users className="h-6 w-6" />
              </div>
              <div className="text-left">
                <p className="font-display text-2xl font-black text-white">10,000+</p>
                <p className="text-xs text-gray-400">members</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 py-4 sm:py-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-950/60 border border-indigo-500/30 text-indigo-400">
                <FolderGit2 className="h-6 w-6" />
              </div>
              <div className="text-left">
                <p className="font-display text-2xl font-black text-white">500+</p>
                <p className="text-xs text-gray-400">projects</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 py-4 sm:py-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-950/60 border border-pink-500/30 text-pink-400">
                <Briefcase className="h-6 w-6" />
              </div>
              <div className="text-left">
                <p className="font-display text-2xl font-black text-white">100+</p>
                <p className="text-xs text-gray-400">hiring partners</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* How ABTalks Works Section */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-center font-display text-3xl font-extrabold text-white sm:text-4xl">
          How ABTalks works
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          
          <div className="rounded-2xl border border-white/10 bg-[#0F1422] p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-950/50 border border-purple-500/30 text-purple-400">
              <GraduationCap className="h-6 w-6" />
            </div>
            <h3 className="mt-6 font-display text-lg font-bold text-white">1. Learn Daily</h3>
            <p className="mt-2 text-xs leading-relaxed text-gray-400">
              Choose your track and build practical skills through focused challenges and live sessions.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0F1422] p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-950/50 border border-indigo-500/30 text-indigo-400">
              <Code2 className="h-6 w-6" />
            </div>
            <h3 className="mt-6 font-display text-lg font-bold text-white">2. Build & Showcase</h3>
            <p className="mt-2 text-xs leading-relaxed text-gray-400">
              Ship real work, publish your progress, and turn consistent effort into a visible portfolio.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0F1422] p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-950/50 border border-pink-500/30 text-pink-400">
              <Trophy className="h-6 w-6" />
            </div>
            <h3 className="mt-6 font-display text-lg font-bold text-white">3. Get Hired</h3>
            <p className="mt-2 text-xs leading-relaxed text-gray-400">
              Stand out through proof of work and become discoverable to recruiters in the ABTalks network.
            </p>
          </div>

        </div>
      </section>

      {/* Community Callout Banner */}
      <section className="mx-auto max-w-5xl px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl border border-emerald-500/30 bg-emerald-950/40 p-6 backdrop-blur-xl">
          <div className="flex items-center gap-4 text-left">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-900/60 border border-emerald-500/40 text-emerald-400">
              <MessageSquare className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-white">Join our community for instant updates</h3>
              <p className="text-xs text-emerald-200/80">Meet builders, get event alerts, and stay accountable.</p>
            </div>
          </div>
          <a
            href="https://discord.gg"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-xl bg-emerald-500 px-6 py-3 text-xs font-bold text-black transition-transform hover:scale-105 hover:bg-emerald-400"
          >
            Join now
          </a>
        </div>
      </section>

      {/* Testimonials Carousel Section */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="text-center">
          <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
            What our builders say
          </h2>
          <p className="mt-2 text-xs text-gray-400">
            Real stories from students and professionals who finished the 60-Day Claude Challenge.
          </p>
        </div>

        <div className="relative mt-12 overflow-hidden rounded-2xl border border-white/10 bg-[#0F1422] p-8 sm:p-12">
          <div className="text-purple-400 text-4xl font-serif">“</div>
          <p className="mt-2 text-base sm:text-lg leading-relaxed text-gray-200 italic">
            {TESTIMONIALS[activeTestimonialIndex].quote}
          </p>

          <div className="mt-8 flex items-center justify-between pt-6 border-t border-white/10">
            <div className="flex items-center gap-3">
              <img
                src={TESTIMONIALS[activeTestimonialIndex].avatar}
                alt={TESTIMONIALS[activeTestimonialIndex].name}
                className="h-10 w-10 rounded-full object-cover border border-purple-500/40"
              />
              <div>
                <p className="font-display text-sm font-bold text-white">{TESTIMONIALS[activeTestimonialIndex].name}</p>
                <p className="text-xs text-gray-400">{TESTIMONIALS[activeTestimonialIndex].role}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevTestimonial}
                aria-label="Previous testimonial"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextTestimonial}
                aria-label="Next testimonial"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#07090E] py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="font-display text-lg font-black text-white">ABTalks</span>
          </div>

          <div className="flex items-center gap-4 text-gray-400 text-sm">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-purple-400 transition-colors">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-purple-400 transition-colors">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-purple-400 transition-colors">
              <Youtube className="h-4 w-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-purple-400 transition-colors">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="https://discord.gg" target="_blank" rel="noreferrer" className="hover:text-purple-400 transition-colors">
              <Discord className="h-4 w-4" />
            </a>
          </div>

          <p className="text-xs text-gray-400">
            For any issue or enquiry: <a href="mailto:team@abtalks.in" className="text-purple-400 hover:underline">team@abtalks.in</a>
          </p>
        </div>
      </footer>

    </div>
  );
}
