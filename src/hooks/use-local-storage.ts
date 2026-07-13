import { useEffect, useRef, useState } from "react";

export function useLocalStorage<T>(key: string, initial: () => T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initial();
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) return JSON.parse(raw) as T;
    } catch {
      // fall through
    }
    return initial();
  });

  const first = useRef(true);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (first.current) {
      first.current = false;
      // still persist initial so refreshes are deterministic
    }
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore quota
    }
  }, [key, value]);

  return [value, setValue] as const;
}