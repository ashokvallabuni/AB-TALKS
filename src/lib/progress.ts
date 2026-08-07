import { useCallback, useEffect, useState } from "react";

const KEY = "abtalks:progress:v1";
const SAVED_KEY = "abtalks:saved:v1";

type ProgressMap = Record<string, string[]>; // slug -> completed lesson ids

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

const listeners = new Set<() => void>();
function emit() {
  listeners.forEach((l) => l());
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressMap>({});
  const [saved, setSaved] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const sync = useCallback(() => {
    setProgress(read<ProgressMap>(KEY, {}));
    setSaved(read<string[]>(SAVED_KEY, []));
  }, []);

  useEffect(() => {
    sync();
    setHydrated(true);
    listeners.add(sync);
    return () => {
      listeners.delete(sync);
    };
  }, [sync]);

  const toggleLesson = useCallback((slug: string, lessonId: string) => {
    const current = read<ProgressMap>(KEY, {});
    const done = new Set(current[slug] ?? []);
    if (done.has(lessonId)) done.delete(lessonId);
    else done.add(lessonId);
    const next = { ...current, [slug]: [...done] };
    window.localStorage.setItem(KEY, JSON.stringify(next));
    emit();
  }, []);

  const toggleSaved = useCallback((slug: string) => {
    const current = read<string[]>(SAVED_KEY, []);
    const next = current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug];
    window.localStorage.setItem(SAVED_KEY, JSON.stringify(next));
    emit();
  }, []);

  const completedFor = useCallback((slug: string) => progress[slug] ?? [], [progress]);

  const percentFor = useCallback(
    (slug: string, total: number) =>
      total === 0 ? 0 : Math.round(((progress[slug]?.length ?? 0) / total) * 100),
    [progress],
  );

  return { hydrated, progress, saved, toggleLesson, toggleSaved, completedFor, percentFor };
}
