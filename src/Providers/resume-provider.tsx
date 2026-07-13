import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { emptyProfile, seedState, uid } from "@/shared/lib/resume-seed";
import type { AppState, ResumeProfile } from "@/shared/lib/resume-types";

interface Ctx {
  state: AppState;
  active: ResumeProfile;
  setActive: (id: string) => void;
  updateActive: (patch: Partial<ResumeProfile> | ((p: ResumeProfile) => ResumeProfile)) => void;
  createProfile: (name?: string) => void;
  cloneProfile: (id: string) => void;
  deleteProfile: (id: string) => void;
  renameProfile: (id: string, name: string) => void;
}

const ResumeCtx = createContext<Ctx | null>(null);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useLocalStorage<AppState>("resume-builder:v1", seedState);

  const active =
    state.profiles.find((p) => p.id === state.activeProfileId) ?? state.profiles[0];

  const setActive = useCallback(
    (id: string) => setState((s) => ({ ...s, activeProfileId: id })),
    [setState],
  );

  const updateActive: Ctx["updateActive"] = useCallback(
    (patch) =>
      setState((s) => ({
        ...s,
        profiles: s.profiles.map((p) =>
          p.id === s.activeProfileId
            ? typeof patch === "function"
              ? patch(p)
              : { ...p, ...patch }
            : p,
        ),
      })),
    [setState],
  );

  const createProfile = useCallback(
    (name = "New Resume") => {
      const np = emptyProfile(name);
      setState((s) => ({ profiles: [...s.profiles, np], activeProfileId: np.id }));
    },
    [setState],
  );

  const cloneProfile = useCallback(
    (id: string) => {
      setState((s) => {
        const src = s.profiles.find((p) => p.id === id);
        if (!src) return s;
        const copy: ResumeProfile = JSON.parse(JSON.stringify(src));
        copy.id = uid();
        copy.profileName = `${src.profileName} (Copy)`;
        // re-id nested arrays
        copy.experience = copy.experience.map((e) => ({ ...e, id: uid() }));
        copy.projects = copy.projects.map((e) => ({ ...e, id: uid() }));
        copy.education = copy.education.map((e) => ({ ...e, id: uid() }));
        return { profiles: [...s.profiles, copy], activeProfileId: copy.id };
      });
    },
    [setState],
  );

  const deleteProfile = useCallback(
    (id: string) => {
      setState((s) => {
        const rest = s.profiles.filter((p) => p.id !== id);
        const next = rest.length ? rest : [emptyProfile("Untitled")];
        return {
          profiles: next,
          activeProfileId: s.activeProfileId === id ? next[0].id : s.activeProfileId,
        };
      });
    },
    [setState],
  );

  const renameProfile = useCallback(
    (id: string, name: string) =>
      setState((s) => ({
        ...s,
        profiles: s.profiles.map((p) => (p.id === id ? { ...p, profileName: name } : p)),
      })),
    [setState],
  );

  const value = useMemo<Ctx>(
    () => ({
      state,
      active,
      setActive,
      updateActive,
      createProfile,
      cloneProfile,
      deleteProfile,
      renameProfile,
    }),
    [state, active, setActive, updateActive, createProfile, cloneProfile, deleteProfile, renameProfile],
  );

  return <ResumeCtx.Provider value={value}> {children} </ResumeCtx.Provider>;
}

export function useResume() {
  const ctx = useContext(ResumeCtx);
  if (!ctx) throw new Error("useResume must be used inside ResumeProvider");
  return ctx;
}