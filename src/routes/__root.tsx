import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "@/components/SiteHeader";
import { BottomNav } from "@/components/BottomNav";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#07090E] px-4 text-white">
      <div className="max-w-md text-center space-y-4">
        <h1 className="text-7xl font-extrabold text-purple-400">404</h1>
        <h2 className="text-xl font-semibold text-white">Page not found</h2>
        <p className="text-xs text-gray-400">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl bg-purple-600 px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-purple-500"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#07090E] px-4 text-white">
      <div className="max-w-md text-center space-y-4">
        <h1 className="text-xl font-semibold tracking-tight text-white">This page didn't load</h1>
        <p className="text-xs text-gray-400">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-xl bg-purple-600 px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-purple-500"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-bold text-gray-300 transition-colors hover:bg-white/10"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ABTalks | 60-Day Coding Challenge, AI Cohorts & Hackathons" },
      {
        name: "description",
        content:
          "Join ABTalks to build daily coding habits, deploy AI projects, compete in 48-hour hackathons, and connect with top hiring partners.",
      },
      {
        name: "keywords",
        content:
          "ABTalks, coding challenge, AI cohort, 60 day coding challenge, hackathon, proof of work, recruiter hiring, learn AI, RAG, MCP, Claude AI, prompt engineering",
      },
      { name: "author", content: "ABTalks Community" },
      { name: "theme-color", content: "#07090E" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { property: "og:site_name", content: "ABTalks" },
      {
        property: "og:title",
        content: "ABTalks | 60-Day Coding Challenge, AI Cohorts & Hackathons",
      },
      {
        property: "og:description",
        content:
          "Join ABTalks to build daily coding habits, deploy AI projects, compete in 48-hour hackathons, and connect with top hiring partners.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.abtalks.in" },
      { property: "og:image", content: "https://www.abtalks.in/favicon.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@abtalks_ai" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Manrope:wght@400;500;600;700&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          name: "ABTalks",
          url: "https://www.abtalks.in",
          logo: "https://www.abtalks.in/favicon.png",
          description:
            "India's coding community for students to learn, build, and accelerate careers through visible proof of work.",
          sameAs: [
            "https://linkedin.com",
            "https://youtube.com",
            "https://twitter.com",
            "https://discord.gg",
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-[#07090E] text-white">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen pb-20 md:pb-0 bg-[#07090E]">
        <SiteHeader />
        <main>
          <Outlet />
        </main>
        <BottomNav />
      </div>
    </QueryClientProvider>
  );
}
